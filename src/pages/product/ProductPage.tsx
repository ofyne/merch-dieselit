import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { Seo } from '@/components/ui/Seo'
import { mockProducts } from '@/shared/config'
import { formatPrice } from '@/shared/lib/formatPrice'
import { buildProductJsonLd } from '@/shared/lib/seo'
import { openOrder } from '@/shared/lib/telegramOrder'
import { useCart } from '@/shared/store/cart'
import type { ProductSize } from '@/shared/types'
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import styles from './ProductPage.module.css'

export const ProductPage = () => {
	const { slug } = useParams<{ slug: string }>()
	const product = mockProducts.find(p => p.slug === slug)

	const [size, setSize] = useState<ProductSize | undefined>(product?.sizes[0])
	const [activeIdx, setActiveIdx] = useState(0)
	const addToCart = useCart(s => s.add)

	if (!product) return <Navigate to="/merch" replace />

	const total = product.images.length
	const activeImage = product.images[activeIdx] ?? product.images[0]
	const hasMultiple = total > 1

	const goPrev = () => setActiveIdx(i => (i - 1 + total) % total)
	const goNext = () => setActiveIdx(i => (i + 1) % total)

	const handleAddToCart = () => {
		addToCart({
			productId: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			image: product.images[0],
			size,
		})
	}

	const handleOrder = () => {
		openOrder({ product, size })
	}

	return (
		<>
			<Seo
				title={product.title}
				description={product.description}
				image={product.images[0]}
				url={`/product/${product.slug}`}
				type="product"
				jsonLd={buildProductJsonLd({
					slug: product.slug,
					title: product.title,
					description: product.description,
					image: product.images[0],
					price: product.price,
					inStock: product.inStock,
				})}
			/>

			<Container>
				<Link to="/merch" className={styles.back}>
					<ArrowLeft size={16} strokeWidth={2.5} />
					Back to catalog
				</Link>

				<article className={styles.root}>
					<div className={styles.media}>
						<SafeImage
							src={activeImage}
							alt={`${product.title} — DIESELit merch`}
							className={styles.image}
						/>

						{product.inStock && (
							<span className={styles.sticker}>in stock</span>
						)}

						{hasMultiple && (
							<>
								<button
									type="button"
									className={`${styles.navBtn} ${styles.navPrev}`}
									onClick={goPrev}
									aria-label="Previous photo"
								>
									<ChevronLeft size={22} strokeWidth={2.5} />
								</button>
								<button
									type="button"
									className={`${styles.navBtn} ${styles.navNext}`}
									onClick={goNext}
									aria-label="Next photo"
								>
									<ChevronRight size={22} strokeWidth={2.5} />
								</button>
							</>
						)}
					</div>

					<div className={styles.infoCard}>
						<span className={styles.kicker}>merch / {product.slug}</span>

						<h1 className={styles.title}>{product.title}</h1>

						<div className={styles.priceTag}>
							<span className={styles.price}>{formatPrice(product.price)}</span>
						</div>

						<p className={styles.description}>{product.description}</p>

						{product.sizes.length > 0 && (
							<div className={styles.sizesBlock}>
								<div className={styles.sizesHead}>
									<span className={styles.sizesLabel}>Size</span>
									{size && <span className={styles.sizeValue}>— {size}</span>}
								</div>
								<div
									className={styles.sizes}
									role="radiogroup"
									aria-label="Size"
								>
									{product.sizes.map(s => (
										<Badge
											key={s}
											active={s === size}
											aria-pressed={s === size}
											onClick={() => setSize(s)}
										>
											{s}
										</Badge>
									))}
								</div>
							</div>
						)}

						{hasMultiple && (
							<div className={styles.thumbs} role="tablist" aria-label="Photos">
								{product.images.map((src, idx) => (
									<button
										key={`${src}-${idx}`}
										type="button"
										role="tab"
										aria-selected={idx === activeIdx}
										className={`${styles.thumb} ${idx === activeIdx ? styles.thumbActive : ''}`}
										onClick={() => setActiveIdx(idx)}
									>
										<SafeImage
											src={src}
											alt={`${product.title} — ${idx + 1}`}
											loading="lazy"
										/>
									</button>
								))}
							</div>
						)}

						<div className={styles.actions}>
							<Button
								size="lg"
								onClick={handleOrder}
								disabled={!product.inStock}
								className={styles.orderBtn}
							>
								<Zap size={18} strokeWidth={2.5} />
								{product.inStock ? 'Order via Telegram' : 'Out of stock'}
							</Button>

							<Button
								variant="secondary"
								size="lg"
								onClick={handleAddToCart}
								disabled={!product.inStock}
								className={styles.cartBtn}
							>
								<ShoppingBag size={18} strokeWidth={2.5} />
								Add to cart
							</Button>
						</div>

						<p className={styles.note}>
							Orders are placed via Telegram — we’ll discuss the details and
							delivery personally.
						</p>
					</div>
				</article>
			</Container>
		</>
	)
}
