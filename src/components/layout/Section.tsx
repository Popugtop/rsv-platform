import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  const [ref, inView] = useInView<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={`section-fade ${inView ? 'in-view' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
