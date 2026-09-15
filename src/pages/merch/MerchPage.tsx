import { Container } from '@/components/ui/Container'
import { ProductGrid } from '@/components/ui/ProductGrid'
import { Seo } from '@/components/ui/Seo'
import { mockProducts } from '@/shared/config'
import styles from './MerchPage.module.css'

export const MerchPage = () => (
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
					<p className={styles.subtitle}>Limited drops. Orders via Telegram.</p>
				</header>

				<ProductGrid products={mockProducts} />
			</section>
		</Container>
	</>
)
