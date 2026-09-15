import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { SafeImage } from '@/components/ui/SafeImage'
import { Seo } from '@/components/ui/Seo'
import { Textarea } from '@/components/ui/Textarea'
import {
	uploadImage,
	useAdminProduct,
	useCreateProduct,
	useUpdateProduct,
	type ProductInput,
} from '@/shared/api'
import { Trash2, Upload } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './AdminProductFormPage.module.css'

type FormState = {
	title: string
	slug: string
	description: string
	price: string
	sizes: string
	inStock: boolean
	images: string[]
}

const EMPTY: FormState = {
	title: '',
	slug: '',
	description: '',
	price: '',
	sizes: 'S, M, L, XL',
	inStock: true,
	images: [],
}

const MAX_IMAGES = 5

export const AdminProductFormPage = () => {
	const { id } = useParams<{ id: string }>()
	const isEdit = !!id
	const navigate = useNavigate()

	const { data: product, isLoading } = useAdminProduct(id ?? '')
	const create = useCreateProduct()
	const update = useUpdateProduct(id ?? '')

	const [form, setForm] = useState<FormState>(EMPTY)
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const fileRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!product) return
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setForm({
			title: product.title,
			slug: product.slug,
			description: product.description,
			price: String(product.price),
			sizes: product.sizes.join(', '),
			inStock: product.inStock,
			images: product.images,
		})
	}, [product])

	const updateField = <K extends keyof FormState>(k: K, v: FormState[K]) => {
		setForm(prev => ({ ...prev, [k]: v }))
	}

	const handleFiles = async (files: FileList | null) => {
		if (!files) return

		const remaining = MAX_IMAGES - form.images.length
		if (remaining <= 0) {
			setError(`Max ${MAX_IMAGES} images`)
			return
		}

		setError(null)
		setUploading(true)

		try {
			const selected = Array.from(files).slice(0, remaining)
			const uploaded: string[] = []

			for (const file of selected) {
				const { url } = await uploadImage(file)
				uploaded.push(url)
			}

			setForm(prev => ({ ...prev, images: [...prev.images, ...uploaded] }))
		} catch {
			setError('Upload failed. Try smaller files.')
		} finally {
			setUploading(false)
			if (fileRef.current) fileRef.current.value = ''
		}
	}

	const removeImage = (url: string) => {
		setForm(prev => ({
			...prev,
			images: prev.images.filter(i => i !== url),
		}))
	}

	const moveImage = (from: number, to: number) => {
		setForm(prev => {
			const arr = [...prev.images]
			const [item] = arr.splice(from, 1)
			arr.splice(to, 0, item)
			return { ...prev, images: arr }
		})
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)

		const price = Number(form.price)
		if (!Number.isFinite(price) || price < 0) {
			setError('Price must be a valid number')
			return
		}

		if (form.images.length === 0) {
			setError('Add at least one image')
			return
		}

		const input: ProductInput = {
			title: form.title.trim(),
			slug: form.slug.trim() || undefined,
			description: form.description.trim(),
			price,
			images: form.images,
			sizes: form.sizes
				.split(',')
				.map(s => s.trim().toUpperCase())
				.filter(Boolean),
			inStock: form.inStock,
		}

		try {
			if (isEdit) {
				await update.mutateAsync(input)
			} else {
				await create.mutateAsync(input)
			}
			navigate('/admin')
		} catch (err: any) {
			setError(
				err?.response?.data?.error ??
					'Save failed. Check fields and try again.',
			)
		}
	}

	if (isEdit && isLoading) {
		return (
			<Container>
				<div className={styles.state}>Loading product…</div>
			</Container>
		)
	}

	return (
		<>
			<Seo title={isEdit ? 'Edit product' : 'New product'} noIndex />

			<Container>
				<header className={styles.header}>
					<h1 className={styles.title}>
						{isEdit ? 'Edit product' : 'New product'}
					</h1>
					<Button variant="ghost" onClick={() => navigate('/admin')}>
						← Back to list
					</Button>
				</header>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.fields}>
						<Input
							name="title"
							label="Title"
							value={form.title}
							onChange={e => updateField('title', e.target.value)}
							required
						/>
						<Input
							name="slug"
							label="Slug (optional)"
							placeholder="auto from title"
							value={form.slug}
							onChange={e => updateField('slug', e.target.value)}
						/>
						<Textarea
							name="description"
							label="Description"
							value={form.description}
							onChange={e => updateField('description', e.target.value)}
							required
						/>
						<Input
							name="price"
							label="Price"
							type="number"
							min={0}
							value={form.price}
							onChange={e => updateField('price', e.target.value)}
							required
						/>
						<Input
							name="sizes"
							label="Sizes (comma separated)"
							placeholder="S, M, L, XL"
							value={form.sizes}
							onChange={e => updateField('sizes', e.target.value)}
						/>

						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={form.inStock}
								onChange={e => updateField('inStock', e.target.checked)}
							/>
							<span>In stock</span>
						</label>
					</div>

					<div className={styles.images}>
						<div className={styles.imagesHead}>
							<span className={styles.imagesLabel}>
								Images ({form.images.length}/{MAX_IMAGES})
							</span>
							<Button
								type="button"
								variant="secondary"
								size="sm"
								onClick={() => fileRef.current?.click()}
								disabled={uploading || form.images.length >= MAX_IMAGES}
							>
								<Upload size={16} />
								{uploading ? 'Uploading…' : 'Add photo'}
							</Button>
						</div>

						<input
							ref={fileRef}
							type="file"
							accept="image/*"
							multiple
							hidden
							onChange={e => handleFiles(e.target.files)}
						/>

						{form.images.length === 0 && (
							<div className={styles.dropzone}>
								<p>No images yet.</p>
								<p className={styles.dropzoneHint}>
									Add up to {MAX_IMAGES} photos. First is the cover.
								</p>
							</div>
						)}

						<ul className={styles.imageList}>
							{form.images.map((url, idx) => (
								<li key={url} className={styles.imageItem}>
									<div className={styles.imageThumb}>
										<SafeImage src={url} alt={`Image ${idx + 1}`} />
									</div>

									<div className={styles.imageMeta}>
										<span className={styles.imageIdx}>
											{idx === 0 ? 'Cover' : `#${idx + 1}`}
										</span>
									</div>

									<div className={styles.imageActions}>
										{idx > 0 && (
											<button
												type="button"
												onClick={() => moveImage(idx, idx - 1)}
												className={styles.imageBtn}
												title="Move up"
											>
												↑
											</button>
										)}
										{idx < form.images.length - 1 && (
											<button
												type="button"
												onClick={() => moveImage(idx, idx + 1)}
												className={styles.imageBtn}
												title="Move down"
											>
												↓
											</button>
										)}
										<button
											type="button"
											onClick={() => removeImage(url)}
											className={styles.imageBtn}
											title="Remove"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
					{/* /* <<<<<<- MАDЕ ВY SОСIА ->>>>>> *\ */}
					{error && <div className={styles.error}>{error}</div>}

					<div className={styles.submit}>
						<Button
							type="submit"
							size="lg"
							disabled={create.isPending || update.isPending}
						>
							{create.isPending || update.isPending
								? 'Saving…'
								: isEdit
									? 'Save changes'
									: 'Create product'}
						</Button>
						<Button
							type="button"
							variant="secondary"
							size="lg"
							onClick={() => navigate('/admin')}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Container>
		</>
	)
}
