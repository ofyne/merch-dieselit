type IconProps = {
	size?: number
	className?: string
}

export const TelegramIcon = ({ size = 16, className }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
		aria-hidden="true"
	>
		<path d="M21.9 4.6 18.6 19.3c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.8c.4-.3-.1-.5-.6-.2L6.6 13l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.5.2 1.2 1.4z" />
	</svg>
)

export const TwitterIcon = ({ size = 16, className }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
		aria-hidden="true"
	>
		<path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8-9.2L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z" />
	</svg>
)

export const InstagramIcon = ({ size = 16, className }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
	>
		<rect x="2" y="2" width="20" height="20" rx="5" />
		<circle cx="12" cy="12" r="4" />
		<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
	</svg>
)

export const WhatsAppIcon = ({ size = 16, className }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
		aria-hidden="true"
	>
		<path d="M20.5 3.5A11.5 11.5 0 0 0 3.1 17.7L2 22l4.4-1.1A11.5 11.5 0 1 0 20.5 3.5zm-8.5 19a9.5 9.5 0 0 1-4.8-1.3l-.3-.2-3 .8.8-2.9-.2-.3A9.5 9.5 0 1 1 12 22.5zm5.5-7.1c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 3.1 1.3 3.1.9 3.7.8.6 0 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z" />
	</svg>
)
