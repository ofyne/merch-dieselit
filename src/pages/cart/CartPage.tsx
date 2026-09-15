import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { Seo } from '@/components/ui/Seo'
import { formatPrice } from '@/shared/lib/formatPrice'
import { openCartOrder } from '@/shared/lib/telegramOrder'
import { selectCartTotal, useCart } from '@/shared/store/cart'
import { Minus, Plus, Trash2 } from 'lucide-react'
import styles from './CartPage.module.css'

export const CartPage = () => {
	const items = useCart(s => s.items)
	const total = useCart(selectCartTotal)
	const setQty = useCart(s => s.setQty)
	const remove = useCart(s => s.remove)
	const clear = useCart(s => s.clear)

	const handleOrder = () => {
		openCartOrder({ items, total })
	}

	if (items.length === 0) {
		return (
			<>
				<Seo title="Cart" description="Your cart is empty." noIndex />
				<Container>
					<section className={styles.empty}>
						<h1 className={styles.title}>Your cart is empty</h1>
						<p className={styles.subtitle}>
							Check the catalog — there’s something for you.
						</p>
						<Button to="/merch">Browse merch</Button>
					</section>
				</Container>
			</>
		)
	}

	return (
		<>
			<Seo title="Cart" description="Your DIESELit order." noIndex />
			<Container>
				<section className={styles.root}>
					<header className={styles.header}>
						<h1 className={styles.title}>Cart</h1>
						<button className={styles.clear} onClick={clear}>
							Clear
						</button>
					</header>

					<ul className={styles.list}>
						{items.map(item => (
							<li key={item.key} className={styles.item}>
								<div className={styles.media}>
									<SafeImage src={item.image} alt={item.title} loading="lazy" />
								</div>

								<div className={styles.info}>
									<h3 className={styles.itemTitle}>{item.title}</h3>
									{item.size && (
										<span className={styles.size}>Size: {item.size}</span>
									)}
									<span className={styles.itemPrice}>
										{formatPrice(item.price)}
									</span>
								</div>

								<div className={styles.qty}>
									<button
										className={styles.qtyBtn}
										onClick={() => setQty(item.key, item.quantity - 1)}
										aria-label="Decrease"
									>
										<Minus size={14} />
									</button>
									<span className={styles.qtyValue}>{item.quantity}</span>
									<button
										className={styles.qtyBtn}
										onClick={() => setQty(item.key, item.quantity + 1)}
										aria-label="Increase"
									>
										<Plus size={14} />
									</button>
								</div>

								<span className={styles.itemTotal}>
									{formatPrice(item.price * item.quantity)}
								</span>

								<button
									className={styles.remove}
									onClick={() => remove(item.key)}
									aria-label="Remove"
								>
									<Trash2 size={18} />
								</button>
							</li>
						))}
					</ul>

					<div className={styles.summary}>
						<span className={styles.summaryLabel}>Total</span>
						<span className={styles.summaryTotal}>{formatPrice(total)}</span>
					</div>

					<Button size="lg" className={styles.orderBtn} onClick={handleOrder}>
						Order via Telegram
					</Button>
				</section>
			</Container>
		</>
	)
}
