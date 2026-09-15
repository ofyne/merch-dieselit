export type SeoProps = {
	title: string
	description?: string
	image?: string
	url?: string
	type?: 'website' | 'product' | 'article'
	noIndex?: boolean
	jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const SITE_NAME = 'DIESELit'
const SITE_URL = 'https://dieselit-merch.vip'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
	let el = document.head.querySelector<HTMLMetaElement>(
		`meta[${attr}="${key}"]`,
	)
	if (!el) {
		el = document.createElement('meta')
		el.setAttribute(attr, key)
		document.head.appendChild(el)
	}
	el.setAttribute('content', content)
}

const setCanonical = (href: string) => {
	let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
	if (!el) {
		el = document.createElement('link')
		el.rel = 'canonical'
		document.head.appendChild(el)
	}
	el.href = href
}

const setJsonLd = (
	data: Record<string, unknown> | Record<string, unknown>[] | undefined,
) => {
	const ID = 'seo-jsonld-page'
	const existing = document.getElementById(ID)

	if (!data) {
		existing?.remove()
		return
	}

	const script = existing ?? document.createElement('script')
	script.id = ID
	script.setAttribute('type', 'application/ld+json')
	script.textContent = JSON.stringify(data)

	if (!existing) document.head.appendChild(script)
}

export const applySeo = ({
	title,
	description,
	image = DEFAULT_IMAGE,
	url,
	type = 'website',
	noIndex,
	jsonLd,
}: SeoProps) => {
	const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
	const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
	const desc = description ?? ''

	document.title = fullTitle

	setMeta('name', 'description', desc)
	setMeta(
		'name',
		'robots',
		noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
	)

	setMeta('property', 'og:type', type)
	setMeta('property', 'og:site_name', SITE_NAME)
	setMeta('property', 'og:title', fullTitle)
	setMeta('property', 'og:description', desc)
	setMeta('property', 'og:image', image)
	setMeta('property', 'og:url', fullUrl)

	setMeta('name', 'twitter:card', 'summary_large_image')
	setMeta('name', 'twitter:title', fullTitle)
	setMeta('name', 'twitter:description', desc)
	setMeta('name', 'twitter:image', image)

	setCanonical(fullUrl)
	setJsonLd(jsonLd)
}

export const buildProductJsonLd = (p: {
	slug: string
	title: string
	description: string
	image: string
	price: number
	currency?: string
	inStock: boolean
}) => ({
	'@context': 'https://schema.org',
	'@type': 'Product',
	name: p.title,
	description: p.description,
	image: `${SITE_URL}${p.image}`,
	url: `${SITE_URL}/product/${p.slug}`,
	sku: p.slug,
	brand: {
		'@type': 'Brand',
		name: 'DIESELit',
	},
	offers: {
		'@type': 'Offer',
		url: `${SITE_URL}/product/${p.slug}`,
		priceCurrency: p.currency ?? 'RUB',
		price: p.price,
		availability: p.inStock
			? 'https://schema.org/InStock'
			: 'https://schema.org/OutOfStock',
	},
})
