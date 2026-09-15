import type { Product } from '@/shared/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createProduct,
	deleteProduct,
	fetchAdminProduct,
	fetchAdminProducts,
	updateProduct,
	type ProductInput,
} from './admin'
import { fetchProductBySlug, fetchProducts } from './products'

export const productKeys = {
	all: ['products'] as const,
	list: () => [...productKeys.all, 'list'] as const,
	detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
	admin: () => [...productKeys.all, 'admin'] as const,
	adminDetail: (id: string) => [...productKeys.all, 'admin', id] as const,
}

export const useProducts = () =>
	useQuery({ queryKey: productKeys.list(), queryFn: fetchProducts })

export const useProduct = (slug: string) =>
	useQuery({
		queryKey: productKeys.detail(slug),
		queryFn: () => fetchProductBySlug(slug),
		enabled: !!slug,
	})

export const useAdminProducts = () =>
	useQuery({ queryKey: productKeys.admin(), queryFn: fetchAdminProducts })

export const useAdminProduct = (id: string) =>
	useQuery({
		queryKey: productKeys.adminDetail(id),
		queryFn: () => fetchAdminProduct(id),
		enabled: !!id,
	})

export const useCreateProduct = () => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (input: ProductInput) => createProduct(input),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: productKeys.admin() })
			await qc.invalidateQueries({ queryKey: productKeys.list() })
		},
	})
}

export const useUpdateProduct = (id: string) => {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (input: ProductInput) => updateProduct(id, input),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: productKeys.admin() })
			await qc.invalidateQueries({ queryKey: productKeys.adminDetail(id) })
			await qc.invalidateQueries({ queryKey: productKeys.list() })
		},
	})
}

export const useDeleteProduct = () => {
	const qc = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => deleteProduct(id),

		onMutate: async (id: string) => {
			await qc.cancelQueries({ queryKey: productKeys.admin() })

			const previous = qc.getQueryData<Product[]>(productKeys.admin()) ?? []

			qc.setQueryData<Product[]>(
				productKeys.admin(),
				previous.filter(p => p.id !== id),
			)

			return { previous }
		},

		onError: (_err, _id, ctx) => {
			if (ctx?.previous) {
				qc.setQueryData(productKeys.admin(), ctx.previous)
			}
		},

		onSettled: async () => {
			await qc.invalidateQueries({ queryKey: productKeys.admin() })
			await qc.invalidateQueries({ queryKey: productKeys.list() })
		},
	})
}
