import { Container } from '@/components/ui/Container'
import { ProductGrid } from '@/components/ui/ProductGrid'
import { Seo } from '@/components/ui/Seo'
import { useProducts } from '@/shared/api'
import styles from './MerchPage.module.css'

export const MerchPage = () => {
	const { data: products, isLoading, isError } = useProducts()

	return (
		<>
			<Seo
				title="Merch"
				description="All DIESELit merch — hoodies, tees, longsleeves, caps and sticker packs. Limited drops, order via Telegram."
				url="/merch"
			/>

			<Container>
				<section className={styles.root}>
					<header className={styles.header}>
						<h1 className={styles.title}>Merch</h1>
						<p className={styles.subtitle}>
							Limited drops. Orders via Telegram.
						</p>
					</header>

					{isLoading && <div className={styles.state}>Loading…</div>}

					{isError && (
						<div className={styles.state}>
							Failed to load products. Please try again.
						</div>
					)}

					{products && <ProductGrid products={products} />}
				</section>
			</Container>
		</>
	)
}
