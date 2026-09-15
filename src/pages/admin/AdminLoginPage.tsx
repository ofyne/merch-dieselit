import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Seo } from '@/components/ui/Seo'
import { login } from '@/shared/api'
import { useAuth } from '@/shared/store/auth'
import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import styles from './AdminLoginPage.module.css'

export const AdminLoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [pending, setPending] = useState(false)

	const setAuth = useAuth(s => s.setAuth)
	const token = useAuth(s => s.token)
	const navigate = useNavigate()
	const location = useLocation()

	const from =
		(location.state as { from?: Location } | null)?.from?.pathname ?? '/admin'

	if (token) return <Navigate to="/admin" replace />

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setPending(true)

		try {
			const data = await login(username, password)
			setAuth(data.token, data.username)
			navigate(from, { replace: true })
		} catch (err) {
			setError('Invalid username or password')
		} finally {
			setPending(false)
		}
	}

	return (
		<>
			<Seo title="Admin login" noIndex />

			<div className={styles.root}>
				<form className={styles.card} onSubmit={handleSubmit}>
					<h1 className={styles.title}>Admin</h1>
					<p className={styles.subtitle}>Sign in to manage products</p>

					<div className={styles.fields}>
						<Input
							name="username"
							label="Username"
							autoComplete="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
						<Input
							name="password"
							type="password"
							label="Password"
							autoComplete="current-password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>

					{error && <div className={styles.error}>{error}</div>}

					<Button type="submit" size="lg" disabled={pending}>
						{pending ? 'Signing in…' : 'Sign in'}
					</Button>
				</form>
			</div>
		</>
	)
}
