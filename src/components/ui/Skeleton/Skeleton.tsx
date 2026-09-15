import { cn } from '@/shared/lib/cn'
import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

type Props = {
	className?: string
	width?: string | number
	height?: string | number
	rounded?: boolean
}

export const Skeleton = ({ className, width, height, rounded }: Props) => {
	const style: CSSProperties = {
		width,
		height,
	}

	return (
		<div
			className={cn(styles.root, rounded && styles.rounded, className)}
			style={style}
			aria-hidden="true"
		/>
	)
}
