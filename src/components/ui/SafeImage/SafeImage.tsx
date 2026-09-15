import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/shared/lib/cn'
import { useState, type ImgHTMLAttributes } from 'react'
import styles from './SafeImage.module.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	className?: string
}

export const SafeImage = ({ className, alt = '', ...rest }: Props) => {
	const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
		'loading',
	)

	return (
		<div className={cn(styles.wrap, className)}>
			{status !== 'loaded' && <Skeleton className={styles.skeleton} />}

			{status === 'error' && (
				<div className={styles.error} aria-label="Image not available">
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<rect x="3" y="3" width="18" height="18" rx="2" />
						<circle cx="9" cy="9" r="2" />
						<path d="m21 15-3.5-3.5L9 20" />
					</svg>
				</div>
			)}

			<img
				{...rest}
				alt={alt}
				className={cn(styles.img, status === 'loaded' && styles.visible)}
				onLoad={() => setStatus('loaded')}
				onError={() => setStatus('error')}
				loading={rest.loading ?? 'lazy'}
			/>
		</div>
	)
}
