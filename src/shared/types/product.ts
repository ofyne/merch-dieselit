export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Product = {
	id: string
	slug: string
	title: string
	description: string
	price: number
	images: string[]
	sizes: ProductSize[]
	inStock: boolean
	createdAt: string
	updatedAt: string
}
