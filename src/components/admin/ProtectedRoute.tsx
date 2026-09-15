import { useAuth } from '@/shared/store/auth'
import { Navigate, Outlet, useLocation } from 'react-router'

export const ProtectedRoute = () => {
	const token = useAuth(s => s.token)
	const location = useLocation()

	if (!token) {
		return <Navigate to="/admin/login" state={{ from: location }} replace />
	}

	return <Outlet />
}
