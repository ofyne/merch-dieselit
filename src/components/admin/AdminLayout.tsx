import { Button } from '@/components/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useAuth } from '@/shared/store/auth'
import { LogOut } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import styles from './AdminLayout.module.css'

export const AdminLayout = () => {
	const username = useAuth(s => s.username)
	const logout = useAuth(s => s.logout)
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/admin/login', { replace: true })
	}

	return (
		<div className={styles.root}>
			<header className={styles.topbar}>
				<Link to="/admin" className={styles.brand}>
					DIESELit · admin
				</Link>

				<nav className={styles.nav}>
					<NavLink
						to="/admin"
						end
						className={({ isActive }) =>
							cn(styles.link, isActive && styles.active)
						}
					>
						Products
					</NavLink>
					<NavLink
						to="/admin/products/new"
						className={({ isActive }) =>
							cn(styles.link, isActive && styles.active)
						}
					>
						New
					</NavLink>
				</nav>

				<div className={styles.user}>
					<span className={styles.username}>{username}</span>
					<Button
						variant="secondary"
						size="sm"
						onClick={handleLogout}
						aria-label="Logout"
					>
						<LogOut size={16} />
						Logout
					</Button>
				</div>
			</header>

			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}
