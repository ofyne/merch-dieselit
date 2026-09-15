import type { Product } from '@/shared/types'
import { api } from './client'

export type ProductInput = {
	title: string
	slug?: string
	description: string
	price: number
	images: string[]
	sizes: string[]
	inStock: boolean
}

export const fetchAdminProducts = async (): Promise<Product[]> => {
	const { data } = await api.get<{ items: Product[] }>('/api/admin/products')
	return data.items
}

export const fetchAdminProduct = async (id: string): Promise<Product> => {
	const all = await fetchAdminProducts()
	const found = all.find(p => p.id === id)
	if (!found) throw new Error('Product not found')
	return found
}

export const createProduct = async (input: ProductInput): Promise<Product> => {
	const { data } = await api.post<Product>('/api/admin/products', input)
	return data
}

export const updateProduct = async (
	id: string,
	input: ProductInput,
): Promise<Product> => {
	const { data } = await api.put<Product>(`/api/admin/products/${id}`, input)
	return data
}

export const deleteProduct = async (id: string): Promise<void> => {
	await api.delete(`/api/admin/products/${id}`)
}

export const uploadImage = async (file: File): Promise<{ url: string }> => {
	const form = new FormData()
	form.append('file', file)
	const { data } = await api.post<{ url: string }>('/api/admin/upload', form, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
	return data
}
