import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Outlet } from 'react-router'
import styles from './Layout.module.css'

export const Layout = () => (
	<div className={styles.root}>
		<Header />
		<main className={styles.main}>
			<Outlet />
		</main>
		<Footer />
	</div>
)
