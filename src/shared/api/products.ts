import type { Product } from '@/shared/types'
import { api } from './client'

type ProductsResponse = {
	items: Product[]
}

export const fetchProducts = async (): Promise<Product[]> => {
	const { data } = await api.get<ProductsResponse>('/api/products')
	return data.items
}

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
	const { data } = await api.get<Product>(`/api/products/${slug}`)
	return data
}
