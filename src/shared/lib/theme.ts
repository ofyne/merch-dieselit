export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'merch-theme'

export const getInitialTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light'

	const saved = localStorage.getItem(STORAGE_KEY)
	if (saved === 'light' || saved === 'dark') return saved

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

// MADE BY SOCIA

export const applyTheme = (theme: Theme) => {
	document.documentElement.dataset.theme = theme
}
