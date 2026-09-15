type SvgProps = {
	className?: string
	size?: number
}

export const Star = ({ className, size = 32 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size}
		viewBox="0 0 32 32"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M16 3 L18.8 12.2 L28 14 L20 19.5 L23 29 L16 23.5 L9 29 L12 19.5 L4 14 L13.2 12.2 Z" />
	</svg>
)

export const Sparkle = ({ className, size = 24 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		aria-hidden="true"
	>
		<path d="M12 2 L12 8 M12 16 L12 22 M2 12 L8 12 M16 12 L22 12" />
		<circle cx="12" cy="12" r="2.2" fill="currentColor" />
	</svg>
)

export const Squiggle = ({ className, size = 60 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size * 0.3}
		viewBox="0 0 60 18"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		aria-hidden="true"
	>
		<path d="M2 12 Q10 2 18 10 T34 10 T50 10 T58 6" />
	</svg>
)

export const Arrow = ({ className, size = 60 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size * 0.6}
		viewBox="0 0 60 36"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M4 6 Q20 26 44 20 M36 14 L44 20 L36 28" />
	</svg>
)

export const Circle = ({ className, size = 120 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size}
		viewBox="0 0 120 120"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		aria-hidden="true"
	>
		<path d="M60 8 C88 8 112 30 112 60 C112 90 88 112 60 112 C32 112 8 90 8 60 C8 30 32 8 60 8 C74 8 86 12 95 20" />
	</svg>
)

export const Underline = ({ className, size = 200 }: SvgProps) => (
	<svg
		className={className}
		width={size}
		height={size * 0.1}
		viewBox="0 0 200 20"
		fill="none"
		stroke="currentColor"
		strokeWidth="3"
		strokeLinecap="round"
		aria-hidden="true"
	>
		<path d="M4 12 Q30 4 60 10 T120 10 T180 8 L196 12" />
	</svg>
)
