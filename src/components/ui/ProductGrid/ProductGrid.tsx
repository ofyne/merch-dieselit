import { ProductCard } from '@/components/ui/ProductCard'
import type { Product } from '@/shared/types'
import styles from './ProductGrid.module.css'

type Props = {
	products: Product[]
}

export const ProductGrid = ({ products }: Props) => (
	<div className={styles.grid}>
		{products.map(p => (
			<ProductCard key={p.id} product={p} />
		))}
	</div>
)
