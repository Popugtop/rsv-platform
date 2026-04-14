import type { Opportunity } from '../../types'
import { AUDIENCE_LABELS, TYPE_LABELS, TYPE_COLORS, AUDIENCE_COLORS } from '../../types'
import { ArrowRight } from 'lucide-react'

interface OpportunityCardProps {
  opportunity: Opportunity
  onOpen: (opportunity: Opportunity) => void
}

const TYPE_BAR: Record<string, string> = {
  grant:      'bg-type-grant',
  contest:    'bg-type-contest',
  education:  'bg-type-education',
  internship: 'bg-type-internship',
  forum:      'bg-type-forum',
}

export function OpportunityCard({ opportunity, onOpen }: OpportunityCardProps) {
  const { name, description, importance, organizer, audience, type } = opportunity

  return (
    <article
      className="bg-layer border border-border rounded-card shadow-card hover:shadow-card-hover
                 hover:-translate-y-1 hover:border-accent/40 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Colored top bar */}
      <div className={`h-1.5 w-full flex-shrink-0 rounded-t-card ${TYPE_BAR[type]}`} />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`tag-badge ${TYPE_COLORS[type]}`}>
            {TYPE_LABELS[type]}
          </span>
          {audience.map((a) => (
            <span key={a} className={`tag-badge ${AUDIENCE_COLORS[a]}`}>
              {AUDIENCE_LABELS[a]}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-ink text-base leading-snug">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink-muted leading-relaxed font-body flex-1 line-clamp-3">
          {description}
        </p>

        {/* Importance */}
        <div className="bg-accent-pale border border-accent/20 rounded-2xl px-3 py-2.5">
          <p className="text-xs text-accent font-body font-semibold uppercase tracking-wide mb-0.5">
            Почему важно
          </p>
          <p className="text-xs text-ink-muted italic font-body leading-snug">
            {importance}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border mt-1">
          <p className="text-xs text-ink-faint font-body truncate mr-2">
            {organizer}
          </p>
          <button
            onClick={() => onOpen(opportunity)}
            className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-body font-semibold
                       text-accent hover:text-accent-hover transition-colors duration-150"
          >
            Подробнее
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </article>
  )
}
