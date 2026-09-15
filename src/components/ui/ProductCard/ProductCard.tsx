import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SafeImage } from '@/components/ui/SafeImage'
import { formatPrice } from '@/shared/lib/formatPrice'
import { openOrder } from '@/shared/lib/telegramOrder'
import { useCart } from '@/shared/store/cart'
import type { Product, ProductSize } from '@/shared/types'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import styles from './ProductCard.module.css'

type Props = {
	product: Product
}

export const ProductCard = ({ product }: Props) => {
	const [size, setSize] = useState<ProductSize | undefined>(product.sizes[0])
	const addToCart = useCart(s => s.add)

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
		<article className={styles.card}>
			<div className={styles.media}>
				<Link to={`/product/${product.slug}`} className={styles.imageLink}>
					<SafeImage
						src={product.images[0]}
						alt={product.title}
						loading="lazy"
					/>
				</Link>
			</div>

			<div className={styles.body}>
				<Link to={`/product/${product.slug}`} className={styles.titleLink}>
					<h3 className={styles.title}>{product.title}</h3>
				</Link>

				<p className={styles.description}>{product.description}</p>

				{product.sizes.length > 0 && (
					<div className={styles.sizes} role="radiogroup" aria-label="Size">
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
				)}

				<div className={styles.footer}>
					<div className={styles.priceTag}>
						<span className={styles.price}>{formatPrice(product.price)}</span>
					</div>

					<div className={styles.footerActions}>
						<Button
							variant="secondary"
							onClick={handleAddToCart}
							disabled={!product.inStock}
							className={styles.cartBtn}
							aria-label="Add to cart"
							title="Add to cart"
						>
							<ShoppingBag size={18} strokeWidth={2.2} />
						</Button>
						<Button
							onClick={handleOrder}
							disabled={!product.inStock}
							className={styles.orderBtn}
						>
							{product.inStock ? 'Order' : 'Out of stock'}
						</Button>
					</div>
				</div>
			</div>
		</article>
	)
}
