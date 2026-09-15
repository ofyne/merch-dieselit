import type { ProductSize } from '@/shared/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
	key: string
	productId: string
	slug: string
	title: string
	price: number
	image: string
	size?: ProductSize
	quantity: number
}

type CartState = {
	items: CartItem[]
	add: (item: Omit<CartItem, 'key' | 'quantity'>, qty?: number) => void
	remove: (key: string) => void
	setQty: (key: string, qty: number) => void
	clear: () => void
}

const makeKey = (productId: string, size?: string) =>
	size ? `${productId}-${size}` : productId

export const useCart = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			add: (item, qty = 1) => {
				const key = makeKey(item.productId, item.size)
				const existing = get().items.find(i => i.key === key)

				if (existing) {
					set({
						items: get().items.map(i =>
							i.key === key ? { ...i, quantity: i.quantity + qty } : i,
						),
					})
					return
				}

				set({ items: [...get().items, { ...item, key, quantity: qty }] })
			},

			remove: key => set({ items: get().items.filter(i => i.key !== key) }),

			setQty: (key, qty) =>
				set({
					items: get()
						.items.map(i => (i.key === key ? { ...i, quantity: qty } : i))
						.filter(i => i.quantity > 0),
				}),

			clear: () => set({ items: [] }),
		}),
		{ name: 'dieselit-cart' },
	),
)

export const selectCartCount = (s: CartState) =>
	s.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectCartTotal = (s: CartState) =>
	s.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
