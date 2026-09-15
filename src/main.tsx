import { QueryProvider } from '@/app/providers'
import '@/app/styles/index.css'
import { applyTheme, getInitialTheme } from '@/shared/lib/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryProvider>
	</StrictMode>,
)

const hideSplash = async () => {
	const splash = document.getElementById('splash')
	if (!splash) return

	try {
		await document.fonts?.ready
	} catch {
		// ignore
	}

	// MADE BY SOCIA

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			splash.classList.add('hide')
			document.documentElement.classList.add('ready')
			setTimeout(() => splash.remove(), 700)
		})
	})
}

hideSplash()
