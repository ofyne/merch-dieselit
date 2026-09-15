import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/components/ui/Seo'
import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => (
	<>
		<Seo
			title="404 — Not Found"
			description="This page doesn’t exist."
			noIndex
		/>

		<Container>
			<section className={styles.root}>
				<span className={styles.code}>404</span>
				<h1 className={styles.title}>This page took a wrong turn.</h1>
				<p className={styles.subtitle}>
					The link is broken or the page moved. Let’s get you back on track.
				</p>
				<div className={styles.actions}>
					<Button to="/">Home</Button>
					<Button variant="secondary" to="/merch">
						Browse merch
					</Button>
				</div>
			</section>
		</Container>
	</>
)

// MADE BY SOCIA
