import { Layout } from '@/app/router/Layout'
import { AdminLayout, ProtectedRoute } from '@/components/admin'
import { AboutPage } from '@/pages/about'
import {
	AdminLoginPage,
	AdminProductFormPage,
	AdminProductsPage,
} from '@/pages/admin'
import { CartPage } from '@/pages/cart'
import { HomePage } from '@/pages/home'
import { MerchPage } from '@/pages/merch'
import { NotFoundPage } from '@/pages/not-found'
import { ProductPage } from '@/pages/product'
import { Route, Routes } from 'react-router'

export const AppRouter = () => (
	<Routes>
		<Route element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path="merch" element={<MerchPage />} />
			<Route path="product/:slug" element={<ProductPage />} />
			<Route path="about" element={<AboutPage />} />
			<Route path="cart" element={<CartPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>

		<Route path="/admin/login" element={<AdminLoginPage />} />

		{/* MADE BY SOCIA */}

		<Route element={<ProtectedRoute />}>
			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<AdminProductsPage />} />
				<Route path="products/new" element={<AdminProductFormPage />} />
				<Route path="products/:id/edit" element={<AdminProductFormPage />} />
			</Route>
		</Route>

		{/* MADE BY SOCIA */}
	</Routes>
)
