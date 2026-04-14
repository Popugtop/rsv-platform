import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Term } from '../../types'

interface TermCardProps {
  term: Term
  index: number
}

export function TermCard({ term, index }: TermCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`bg-layer border border-border rounded-2xl shadow-card overflow-hidden transition-all duration-300 ${
        open ? 'shadow-card-hover border-accent/40' : ''
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3.5 px-5 py-4 text-left hover:bg-raised transition-colors duration-150"
        aria-expanded={open}
      >
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-body font-bold transition-all duration-200 ${
            open
              ? 'bg-accent text-white'
              : 'bg-raised text-ink-faint'
          }`}
        >
          {index}
        </span>

        <span className="flex-1 font-heading font-bold text-ink text-sm sm:text-base">
          {term.name}
        </span>

        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-ink-faint transition-transform duration-300 ${
            open ? 'rotate-180 text-accent' : ''
          }`}
        />
      </button>

      <div className={`accordion-inner ${open ? 'open' : ''}`}>
        <div>
          <div className="px-5 pb-5 pt-1">
            <div className="pl-[calc(1.75rem+0.875rem)] text-sm text-ink-muted font-body leading-relaxed">
              {term.definition}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
