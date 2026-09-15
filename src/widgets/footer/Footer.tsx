import {
	InstagramIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsAppIcon,
} from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import styles from './Footer.module.css'

const NAV = [
	{ to: '/', label: 'Home' },
	{ to: '/merch', label: 'Merch' },
	{ to: '/about', label: 'About' },
	{ to: '/cart', label: 'Cart' },
]

const SOCIALS = [
	{
		label: 'Telegram',
		href: 'https://t.me/+IpLNl8Ih0URhYjNk',
		Icon: TelegramIcon,
	},
	{
		label: 'Twitter / X',
		href: 'https://x.com/DIESEL_COIN25',
		Icon: TwitterIcon,
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/diesel_coin25',
		Icon: InstagramIcon,
	},
	{
		label: 'WhatsApp',
		href: 'https://chat.whatsapp.com/BCQAiVjhDNr3ioSXkozWUp',
		Icon: WhatsAppIcon,
	},
]

export const Footer = () => (
	<footer className={styles.root}>
		<Container className={styles.inner}>
			<div className={styles.top}>
				<div className={styles.brandCol}>
					<span className={styles.brand}>DIESELit.</span>
					<p className={styles.tagline}>
						<a
							href="https://t.me/socia"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.creditLink}
						>
							{' '}
							Made with <span className={styles.heart}>♥</span> by Socia team
						</a>{' '}
					</p>
				</div>

				<nav className={styles.navCol} aria-label="Footer">
					<span className={styles.colTitle}>Navigate</span>
					<ul className={styles.list}>
						{NAV.map(item => (
							<li key={item.to}>
								<a href={item.to} className={styles.link}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className={styles.navCol}>
					<span className={styles.colTitle}>Follow</span>
					<ul className={styles.list}>
						{SOCIALS.map(({ label, href, Icon }) => (
							<li key={href}>
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.social}
								>
									<Icon size={16} />
									{label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={styles.bottom}>
				<span className={styles.copy}>
					© {new Date().getFullYear()} DIESELit. All rights reserved.
				</span>
				<span className={styles.made}>Order via Telegram</span>
			</div>
		</Container>
	</footer>
)
