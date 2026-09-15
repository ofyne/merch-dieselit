import { selectCartCount, useCart } from '@/shared/store/cart'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import styles from './CartButton.module.css'

export const CartButton = () => {
	const count = useCart(selectCartCount)

	return (
		<Link to="/cart" className={styles.root} aria-label="Корзина">
			<ShoppingBag size={22} strokeWidth={2.2} />
			{count > 0 && <span className={styles.badge}>{count}</span>}
		</Link>
	)
}
