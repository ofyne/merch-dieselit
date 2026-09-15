import { formatPrice } from '@/shared/lib/formatPrice'
import type { CartItem } from '@/shared/store/cart'
import type { Product, ProductSize } from '@/shared/types'

const TELEGRAM_USERNAME = 'VersoX23'

type SingleOrder = {
	product: Product
	size?: ProductSize
	info?: string
}

type CartOrder = {
	items: CartItem[]
	total: number
	info?: string
}

export const buildOrderUrl = ({ product, size, info }: SingleOrder) => {
	const lines = [
		'ɴᴇᴡ ᴏʀᴅᴇʀ',
		'',
		`├ ɪᴛᴇᴍ:   ${product.title}`,
		size ? `├ ꜱɪᴢᴇ:   ${size}` : null,
		`├ ᴘʀɪᴄᴇ:  ${formatPrice(product.price)}`,
		`└ ɪɴꜰᴏ:   ${info?.trim() || '—'}`,
	]
		.filter(Boolean)
		.join('\n')

	return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(lines)}`
}

export const openOrder = (params: SingleOrder) => {
	window.open(buildOrderUrl(params), '_blank', 'noopener,noreferrer')
}

export const buildCartOrderUrl = ({ items, total, info }: CartOrder) => {
	const itemsBlock = items
		.map((i, idx) => {
			const isLast = idx === items.length - 1
			const branch = isLast ? '└' : '├'
			const size = i.size ? ` · ${i.size}` : ''
			const pad = isLast ? '   ' : '│  '

			return [
				`│  ${branch} ${idx + 1}. ${i.title}${size}`,
				`${pad}   ${formatPrice(i.price)} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`,
			].join('\n')
		})
		.join('\n')

	const lines = [
		'ɴᴇᴡ ᴏʀᴅᴇʀ',
		'',
		`├ ɪᴛᴇᴍꜱ (${items.length}):`,
		itemsBlock,
		'│',
		`├ ᴛᴏᴛᴀʟ:  ${formatPrice(total)}`,
		`└ ɪɴꜰᴏ:   ${info?.trim() || '—'}`,
	].join('\n')

	return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(lines)}`
}

export const openCartOrder = (params: CartOrder) => {
	window.open(buildCartOrderUrl(params), '_blank', 'noopener,noreferrer')
}
