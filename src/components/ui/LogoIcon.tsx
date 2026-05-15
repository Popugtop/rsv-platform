interface LogoIconProps {
  size?: number
}

export function LogoIcon({ size = 28 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6882FF" />
          <stop offset="100%" stopColor="#4260E8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-bg)" />
      <circle cx="24.5" cy="6.5" r="2"   fill="white" opacity="0.80" />
      <circle cx="28"   cy="12"  r="1.2" fill="white" opacity="0.45" />
      <circle cx="21"   cy="4"   r="1"   fill="white" opacity="0.35" />
      <text
        x="14"
        y="24.5"
        fontFamily="system-ui,-apple-system,'Helvetica Neue',sans-serif"
        fontSize="21"
        fontWeight="900"
        fill="white"
      >
        Р
      </text>
    </svg>
  )
}
