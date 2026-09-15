export {
	createProduct,
	deleteProduct,
	fetchAdminProduct,
	fetchAdminProducts,
	updateProduct,
	uploadImage,
	type ProductInput,
} from './admin'
export { fetchMe, login } from './auth'
export { api, TOKEN_KEY } from './client'
export {
	productKeys,
	useAdminProduct,
	useAdminProducts,
	useCreateProduct,
	useDeleteProduct,
	useProduct,
	useProducts,
	useUpdateProduct,
} from './hooks'
export { fetchProductBySlug, fetchProducts } from './products'
