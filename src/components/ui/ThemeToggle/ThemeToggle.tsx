import { useTheme } from '@/shared/lib/useTheme'
import { Moon, Sun } from 'lucide-react'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
	const { theme, toggle } = useTheme()
	const isDark = theme === 'dark'

	return (
		<button
			type="button"
			className={styles.root}
			onClick={toggle}
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			title={isDark ? 'Light theme' : 'Dark theme'}
		>
			<span className={styles.icon} key={theme}>
				{isDark ? (
					<Sun size={20} strokeWidth={2.5} />
				) : (
					<Moon size={20} strokeWidth={2.5} />
				)}
			</span>
		</button>
	)
}
