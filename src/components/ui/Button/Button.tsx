import { cn } from '@/shared/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
	variant?: Variant
	size?: Size
	className?: string
	children?: ReactNode
}

type ButtonAsButton = CommonProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
		to?: undefined
	}

type ButtonAsLink = CommonProps &
	Omit<LinkProps, 'className' | 'children'> & {
		to: string
	}

type Props = ButtonAsButton | ButtonAsLink

export const Button = ({
	variant = 'primary',
	size = 'md',
	className,
	...rest
}: Props) => {
	const classes = cn(styles.btn, styles[variant], styles[size], className)

	if ('to' in rest && rest.to) {
		const { to, ...linkProps } = rest
		return <Link to={to} className={classes} {...linkProps} />
	}

	return <button className={classes} {...(rest as ButtonAsButton)} />
}
