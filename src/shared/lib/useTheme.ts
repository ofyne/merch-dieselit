import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, type Theme } from './theme'

const STORAGE_KEY = 'merch-theme'

export const useTheme = () => {
	const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())

	useEffect(() => {
		applyTheme(theme)
		localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	const setTheme = useCallback((t: Theme) => setThemeState(t), [])
	const toggle = useCallback(
		() => setThemeState(t => (t === 'light' ? 'dark' : 'light')),
		[],
	)

	return { theme, setTheme, toggle }
}
