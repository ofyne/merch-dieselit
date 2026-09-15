export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'merch-theme'

export const getInitialTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light'

	// 1. Явный выбор пользователя — приоритет
	const saved = localStorage.getItem(STORAGE_KEY)
	if (saved === 'light' || saved === 'dark') return saved

	// 2. Системная настройка
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

export const applyTheme = (theme: Theme) => {
	document.documentElement.dataset.theme = theme
}
