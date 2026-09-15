import { cn } from '@/shared/lib/cn'
import type { ButtonHTMLAttributes } from 'react'
import styles from './Badge.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	active?: boolean
}

export const Badge = ({ active, className, ...rest }: Props) => (
	<button
		type="button"
		className={cn(styles.badge, active && styles.active, className)}
		{...rest}
	/>
)
