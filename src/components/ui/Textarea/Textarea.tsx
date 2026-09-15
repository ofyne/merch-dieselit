import { cn } from '@/shared/lib/cn'
import type { TextareaHTMLAttributes } from 'react'
import styles from './Textarea.module.css'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	error?: string
}

export const Textarea = ({ label, error, className, id, ...rest }: Props) => {
	const inputId = id ?? rest.name

	return (
		<label className={styles.wrap} htmlFor={inputId}>
			{label && <span className={styles.label}>{label}</span>}
			<textarea
				id={inputId}
				className={cn(styles.input, error && styles.hasError, className)}
				{...rest}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	)
}
