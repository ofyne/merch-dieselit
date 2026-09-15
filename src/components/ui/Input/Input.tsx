import { cn } from '@/shared/lib/cn'
import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	error?: string
}

export const Input = ({ label, error, className, id, ...rest }: Props) => {
	const inputId = id ?? rest.name

	return (
		<label className={styles.wrap} htmlFor={inputId}>
			{label && <span className={styles.label}>{label}</span>}
			<input
				id={inputId}
				className={cn(styles.input, error && styles.hasError, className)}
				{...rest}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	)
}
