import { cn } from '@/shared/lib/cn'
import type { HTMLAttributes } from 'react'
import styles from './Container.module.css'

export const Container = ({
	className,
	...rest
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles.root, className)} {...rest} />
)
