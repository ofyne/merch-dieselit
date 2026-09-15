import '@/app/styles/index.css'
import { applyTheme, getInitialTheme } from '@/shared/lib/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
)

// Плавное появление: ждём загрузки шрифтов + первого кадра
const hideSplash = async () => {
	const splash = document.getElementById('splash')
	if (!splash) return

	// ждём шрифты (если поддерживается API)
	try {
		await document.fonts?.ready
	} catch {
		// игнорируем — старые браузеры
	}

	// ждём ещё один кадр, чтобы всё отрисовалось с финальными шрифтами
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			splash.classList.add('hide')
			document.documentElement.classList.add('ready')
			setTimeout(() => splash.remove(), 700)
		})
	})
}

hideSplash()
