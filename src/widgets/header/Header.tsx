import { CartButton } from '@/components/ui/CartButton'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/shared/lib/cn'
import { Link, NavLink } from 'react-router'
import styles from './Header.module.css'

const nav = [
	{ to: '/', label: 'Home', end: true },
	{ to: '/merch', label: 'Merch' },
]

export const Header = () => (
	<header className={styles.root}>
		<Container className={styles.inner}>
			<Link to="/" className={styles.logo}>
				DIESELit.
			</Link>
			<nav className={styles.nav}>
				{nav.map(({ to, label, end }) => (
					<NavLink
						key={to}
						to={to}
						end={end}
						className={({ isActive }) =>
							cn(styles.link, isActive && styles.active)
						}
					>
						{label}
					</NavLink>
				))}
			</nav>
			<div className={styles.actions}>
				<CartButton />
				<ThemeToggle />
			</div>
		</Container>
	</header>
)
