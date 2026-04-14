import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink, Building2 } from 'lucide-react'
import type { Opportunity } from '../../types'
import { TYPE_LABELS, AUDIENCE_LABELS, TYPE_COLORS, AUDIENCE_COLORS } from '../../types'

interface ModalProps {
  opportunity: Opportunity | null
  onClose: () => void
}

const TYPE_BAR: Record<string, string> = {
  grant:      'bg-type-grant',
  contest:    'bg-type-contest',
  education:  'bg-type-education',
  internship: 'bg-type-internship',
  forum:      'bg-type-forum',
}

export function Modal({ opportunity, onClose }: ModalProps) {
  useEffect(() => {
    if (!opportunity) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [opportunity, onClose])

  if (!opportunity) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-layer border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden
                      animate-[slideUp_0.3s_ease_both] sm:animate-[fadeScale_0.25s_ease_both]">
        {/* Color bar */}
        <div className={`h-1.5 w-full rounded-t-3xl ${TYPE_BAR[opportunity.type]}`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
          <div className="flex flex-wrap gap-1.5">
            <span className={`tag-badge ${TYPE_COLORS[opportunity.type]}`}>
              {TYPE_LABELS[opportunity.type]}
            </span>
            {opportunity.audience.map((a) => (
              <span key={a} className={`tag-badge ${AUDIENCE_COLORS[a]}`}>
                {AUDIENCE_LABELS[a]}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-full text-ink-faint hover:text-ink hover:bg-canvas transition-colors"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <h2 className="font-heading font-bold text-xl text-ink leading-snug">
            {opportunity.name}
          </h2>

          <p className="text-sm text-ink-muted font-body leading-relaxed">
            {opportunity.description}
          </p>

          {/* Importance */}
          <div className="bg-accent-pale border border-accent/30 rounded-2xl px-4 py-3">
            <p className="text-xs font-body font-semibold text-accent uppercase tracking-wide mb-1">
              Почему важно
            </p>
            <p className="text-sm text-ink-muted font-body italic">
              {opportunity.importance}
            </p>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-2 text-sm text-ink-muted font-body">
            <Building2 size={14} className="text-ink-faint flex-shrink-0" />
            {opportunity.organizer}
          </div>

          {/* CTA */}
          {opportunity.website && (
            <a
              href={opportunity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center mt-2"
            >
              Перейти на сайт
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp   { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>,
    document.body
  )
}
