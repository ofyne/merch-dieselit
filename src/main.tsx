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
