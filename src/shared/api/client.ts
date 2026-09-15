import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const TOKEN_KEY = 'dieselit-admin-token'

export const api = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(config => {
	const token = localStorage.getItem(TOKEN_KEY)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	res => res,
	err => {
		if (err.response?.status === 401) {
			localStorage.removeItem(TOKEN_KEY)
			if (window.location.pathname.startsWith('/admin')) {
				window.location.href = '/admin/login'
			}
		}
		return Promise.reject(err)
	},
)
