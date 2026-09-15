import { api } from './client'

type LoginResponse = {
	token: string
	username: string
}

export const login = async (
	username: string,
	password: string,
): Promise<LoginResponse> => {
	const { data } = await api.post<LoginResponse>('/api/auth/login', {
		username,
		password,
	})
	return data
}

export const fetchMe = async (): Promise<{ user: { username: string } }> => {
	const { data } = await api.get('/api/auth/me')
	return data
}
