import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Sparkle } from '@/components/ui/Doodles'
import { Seo } from '@/components/ui/Seo'
import styles from './AboutPage.module.css'

const SOCIALS = [
	{
		label: 'Telegram channel',
		href: 'https://t.me/+IpLNl8Ih0URhYjNk',
	},
	{
		label: 'X / Twitter',
		href: 'https://x.com/DIESEL_COIN25',
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/diesel_coin25',
	},
	{
		label: 'WhatsApp community',
		href: 'https://chat.whatsapp.com/BCQAiVjhDNr3ioSXkozWUp',
	},
	{
		label: 'Buy on x1000',
		href: 'https://x1000.finance/@vx_dislit/tokens/EQAOR0FLw265Hc0eMjPtEdw3u1UqkrFYhYLd_lBOM9LqMzaA',
	},
]

export const AboutPage = () => (
	<>
		<Seo
			title="About"
			description="The story behind DIESELit merch — honest gear for the DIESEL crypto family. Six months of community, transparency and going up."
			url="/about"
		/>

		<Container>
			<article className={styles.root}>
				<header className={styles.hero}>
					<span className={styles.badge}>
						<Sparkle size={16} />
						About us
					</span>

					<h1 className={styles.title}>
						More than merch. <br />
						It’s a crypto-family.
					</h1>

					<p className={styles.lead}>
						We make gear for people who drive, hodl and believe that fuel
						doesn’t have to break the bank.
					</p>
				</header>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>How it started</h2>
					<p className={styles.text}>
						Anyone who drives has noticed how the events in the Middle East hit
						our wallets. Fuel prices went into outer space, diesel broke all
						records — and salaries stayed the same. At 14 of November we
						decided: enough just looking at the gas station price tags and
						sighing.
					</p>
					<p className={styles.text}>
						That’s how the <strong>DIESEL ITALY</strong> project on the TON
						blockchain was born — and its merch arm, <strong>DIESELit</strong>.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Our idea</h2>
					<p className={styles.text}>
						Simple and honest: to help regular people offset the crazy expenses
						of fueling their cars. We don’t promise mountains of gold — we’re
						building a community where everyone can hedge their risks and earn
						enough to cover gas. And potentially much more.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Why people trust us</h2>

					<ul className={styles.list}>
						<li className={styles.listItem}>
							<strong>Proven by time.</strong>
							We’re not a one-day fly.
						</li>
						<li className={styles.listItem}>
							<strong>Transparency, 24/7.</strong> Our DMs are open to everyone.
							Questions? Write directly — we’re in the chat daily.
						</li>
						<li className={styles.listItem}>
							<strong>On the verge of a big step.</strong> Right now we’re
							preparing a full-scale transition to the DeDust decentralized
							exchange. Those who join now get the best price before the big
							launch.
						</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Join the family</h2>
					<p className={styles.text}>
						Stop working just to fill up your tank. Head over to our channel,
						explore the project, and let’s fill up together — thanks to charts
						that go up.
					</p>

					<ul className={styles.socials}>
						{SOCIALS.map(s => (
							<li key={s.href}>
								<a
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.socialLink}
								>
									{s.label} →
								</a>
							</li>
						))}
					</ul>

					<div className={styles.cta}>
						<Button to="/merch" size="lg">
							Shop merch
						</Button>
						<Button variant="secondary" size="lg" to="/">
							Back home
						</Button>
					</div>
				</section>
			</article>
		</Container>
	</>
)
