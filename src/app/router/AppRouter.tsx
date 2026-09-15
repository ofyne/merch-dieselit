import { Layout } from '@/app/router/Layout'
import { AboutPage } from '@/pages/about'
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
	</Routes>
)
