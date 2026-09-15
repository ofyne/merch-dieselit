import { applySeo, type SeoProps } from '@/shared/lib/seo'
import { useEffect } from 'react'

export const Seo = (props: SeoProps) => {
	useEffect(() => {
		applySeo(props)
	}, [
		props.title,
		props.description,
		props.image,
		props.url,
		props.type,
		props.noIndex,
		props.jsonLd,
	])

	return null
}
