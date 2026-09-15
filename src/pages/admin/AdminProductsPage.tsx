import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { Seo } from '@/components/ui/Seo'
import { useAdminProducts, useDeleteProduct } from '@/shared/api'
import { formatPrice } from '@/shared/lib/formatPrice'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import styles from './AdminProductsPage.module.css'

export const AdminProductsPage = () => {
	const { data: products, isLoading, isError } = useAdminProducts()
	const del = useDeleteProduct()

	const handleDelete = (id: string, title: string) => {
		if (!confirm(`Delete "${title}"? This can't be undone.`)) return
		del.mutate(id)
	}

	return (
		<>
			<Seo title="Admin · Products" noIndex />

			<Container>
				<header className={styles.header}>
					<div>
						<h1 className={styles.title}>Products</h1>
						<p className={styles.subtitle}>
							{products?.length ?? 0} item
							{(products?.length ?? 0) === 1 ? '' : 's'} in catalog
						</p>
					</div>
					<Button to="/admin/products/new" size="lg">
						<Plus size={18} strokeWidth={2.5} />
						New product
					</Button>
				</header>

				{isLoading && <div className={styles.state}>Loading…</div>}

				{isError && (
					<div className={styles.state}>Failed to load products.</div>
				)}

				{products && products.length === 0 && (
					<div className={styles.state}>
						No products yet. Create the first one.
					</div>
				)}

				{products && products.length > 0 && (
					<ul className={styles.list}>
						{products.map(p => (
							<li key={p.id} className={styles.item}>
								<div className={styles.media}>
									<SafeImage src={p.images[0]} alt={p.title} />
								</div>

								<div className={styles.info}>
									<h3 className={styles.itemTitle}>{p.title}</h3>
									<p className={styles.itemSlug}>/{p.slug}</p>
									<p className={styles.itemMeta}>
										{formatPrice(p.price)} ·{' '}
										{p.sizes.length ? p.sizes.join(', ') : 'no sizes'} ·{' '}
										{p.inStock ? 'in stock' : 'out'}
									</p>
								</div>

								<div className={styles.actions}>
									<Link
										to={`/admin/products/${p.id}/edit`}
										className={styles.iconBtn}
										aria-label="Edit"
										title="Edit"
									>
										<Pencil size={18} />
									</Link>
									<button
										type="button"
										onClick={() => handleDelete(p.id, p.title)}
										className={styles.iconBtn}
										aria-label="Delete"
										title="Delete"
										disabled={del.isPending}
									>
										<Trash2 size={18} />
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</Container>
		</>
	)
}
