import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import {
	Arrow,
	Circle,
	Sparkle,
	Squiggle,
	Star,
	Underline,
} from '@/components/ui/Doodles'
import { ProductCard } from '@/components/ui/ProductCard'
import { Seo } from '@/components/ui/Seo'
import { mockProducts } from '@/shared/config'
import styles from './HomePage.module.css'

export const HomePage = () => {
	const featured = mockProducts.slice(0, 3)

	return (
		<>
			<Seo
				title="DIESELit"
				description="Official DIESELit merch — limited drops of hoodies, tees, caps and stickers for the DIESEL crypto family. Order via Telegram."
				url="/"
			/>

			<Container>
				<section className={styles.hero}>
					<Circle className={styles.decoCircle} size={280} />
					<Star className={styles.decoStar1} size={36} />
					<Sparkle className={styles.decoSparkle1} size={22} />
					<Sparkle className={styles.decoSparkle2} size={18} />
					<Squiggle className={styles.decoSquiggle} size={70} />

					<span className={styles.badge}>New drop · 2026</span>

					<h1 className={styles.title}>
						Fuel prices are <span className={styles.accent}>rising</span>, but
						our incomes are not.
					</h1>

					<Underline className={styles.titleUnderline} size={280} />

					<p className={styles.subtitle}>
						Helping regular people fuel their cars for less. Honest merch for
						people who drive.
					</p>

					<div className={styles.actions}>
						<Button size="lg" to="/merch">
							Shop merch
						</Button>
						<Button variant="secondary" size="lg" to="/about">
							Learn more
						</Button>
					</div>

					<Arrow className={styles.decoArrow} size={70} />
				</section>

				<section className={styles.featured}>
					<div className={styles.featuredHead}>
						<div className={styles.featuredTitleWrap}>
							<Sparkle className={styles.featuredSparkle} size={22} />
							<h2 className={styles.featuredTitle}>Featured</h2>
						</div>
						<Button variant="ghost" to="/merch">
							See all →
						</Button>
					</div>

					<div className={styles.featuredGrid}>
						{featured.map(p => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
				</section>
			</Container>
		</>
	)
}
