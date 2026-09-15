export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Product = {
	id: string
	slug: string
	title: string
	description: string
	price: number
	images: string[] // 1–5 фото, первое — обложка
	sizes: ProductSize[]
	inStock: boolean
	createdAt: string
}
