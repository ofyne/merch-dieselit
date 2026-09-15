import { TOKEN_KEY } from '@/shared/api'
import { create } from 'zustand'

type AuthState = {
	token: string | null
	username: string | null
	setAuth: (token: string, username: string) => void
	logout: () => void
}

const readStored = () => {
	try {
		const token = localStorage.getItem(TOKEN_KEY)
		const username = localStorage.getItem('dieselit-admin-username')
		return { token, username }
	} catch {
		return { token: null, username: null }
	}
}

const initial = readStored()

export const useAuth = create<AuthState>(set => ({
	token: initial.token,
	username: initial.username,

	setAuth: (token, username) => {
		localStorage.setItem(TOKEN_KEY, token)
		localStorage.setItem('dieselit-admin-username', username)
		set({ token, username })
	},

	logout: () => {
		localStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem('dieselit-admin-username')
		set({ token: null, username: null })
	},
}))

// MADE BY SOCIA
