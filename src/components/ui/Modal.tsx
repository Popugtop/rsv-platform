import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  X, ExternalLink, Building2,
  CheckCircle2, Circle, RotateCcw,
  Calendar, Clock, FileText, Lightbulb, ChevronDown,
} from 'lucide-react'
import type { Opportunity } from '../../types'
import { TYPE_LABELS, AUDIENCE_LABELS, TYPE_COLORS, AUDIENCE_COLORS } from '../../types'
import { applicationGuides } from '../../data/applicationGuides'

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

function useChecklist(opportunityId: number, stepCount: number) {
  const key = `checklist-${opportunityId}`

  const load = useCallback((): Set<number> => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? new Set(JSON.parse(raw) as number[]) : new Set()
    } catch {
      return new Set()
    }
  }, [key])

  const [checked, setChecked] = useState<Set<number>>(load)

  useEffect(() => { setChecked(load()) }, [load, opportunityId])

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify([...checked])) } catch { /* ignore */ }
  }, [key, checked])

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  const reset = () => {
    setChecked(new Set())
    try { localStorage.removeItem(key) } catch { /* ignore */ }
  }

  const progress = stepCount > 0 ? Math.round((checked.size / stepCount) * 100) : 0

  return { checked, toggle, reset, progress }
}

export function Modal({ opportunity, onClose }: ModalProps) {
  const [guideOpen, setGuideOpen] = useState(false)

  const guide = opportunity ? applicationGuides[opportunity.id] : null
  const { checked, toggle, reset, progress } = useChecklist(
    opportunity?.id ?? 0,
    guide?.steps.length ?? 0,
  )

  useEffect(() => {
    if (!opportunity) return
    setGuideOpen(false)
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
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-layer border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease_both] sm:animate-[fadeScale_0.25s_ease_both]">

        {/* Color bar */}
        <div className={`h-1.5 w-full ${TYPE_BAR[opportunity.type]}`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
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

        {/* Scrollable body */}
        <div className="px-6 pb-6 space-y-4 max-h-[82vh] overflow-y-auto">

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
            <p className="text-sm text-ink-muted font-body italic leading-relaxed">
              {opportunity.importance}
            </p>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-2 text-sm text-ink-muted font-body">
            <Building2 size={14} className="text-ink-faint flex-shrink-0" />
            {opportunity.organizer}
          </div>

          {/* Application guide accordion */}
          {guide && (
            <div className="border border-border rounded-2xl overflow-hidden">

              {/* Toggle button */}
              <button
                onClick={() => setGuideOpen((v) => !v)}
                aria-expanded={guideOpen}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-raised hover:bg-canvas transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-accent flex-shrink-0" />
                  <span className="font-heading font-bold text-sm text-ink">
                    Конструктор заявки
                  </span>
                  {checked.size > 0 && (
                    <span className="bg-accent text-white font-body font-semibold text-xs px-2 py-0.5 rounded-full leading-none">
                      {checked.size}/{guide.steps.length}
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={15}
                  className={`text-ink-faint flex-shrink-0 transition-transform duration-200 ${guideOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Smooth accordion via CSS grid transition */}
              <div className={`accordion-inner ${guideOpen ? 'open' : ''}`}>
                <div className="overflow-hidden">
                  <div className="px-4 pt-4 pb-5 space-y-5">

                    {/* Deadline + duration */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-start gap-2 bg-canvas rounded-xl px-3 py-2.5">
                        <Calendar size={13} className="text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-body font-semibold text-ink-faint uppercase tracking-wide mb-0.5">Дедлайн</p>
                          <p className="text-xs text-ink font-body leading-snug">{guide.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-canvas rounded-xl px-3 py-2.5">
                        <Clock size={13} className="text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-body font-semibold text-ink-faint uppercase tracking-wide mb-0.5">Длительность</p>
                          <p className="text-xs text-ink font-body leading-snug">{guide.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-body font-semibold text-ink">
                          Шаги подачи заявки
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-ink-faint font-body tabular-nums">
                            {checked.size} из {guide.steps.length}
                          </span>
                          {checked.size > 0 && (
                            <button
                              onClick={reset}
                              title="Сбросить прогресс"
                              className="text-ink-faint hover:text-ink-muted transition-colors"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="h-1.5 bg-canvas rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-1.5">
                      {guide.steps.map((step, i) => (
                        <li key={i}>
                          <button
                            onClick={() => toggle(i)}
                            className={`w-full flex items-start gap-3 text-left rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                              checked.has(i)
                                ? 'bg-accent-pale'
                                : 'bg-canvas hover:bg-raised'
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5">
                              {checked.has(i)
                                ? <CheckCircle2 size={16} className="text-accent" />
                                : <Circle size={16} className="text-ink-faint" />
                              }
                            </span>
                            <div className="min-w-0">
                              <p className={`font-body text-sm font-semibold leading-snug transition-colors ${
                                checked.has(i) ? 'text-ink-faint line-through' : 'text-ink'
                              }`}>
                                {step.title}
                              </p>
                              {step.description && (
                                <p className="font-body text-xs text-ink-faint leading-snug mt-0.5">
                                  {step.description}
                                </p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Documents */}
                    <div>
                      <p className="text-xs font-body font-semibold text-ink mb-2.5 flex items-center gap-1.5">
                        <FileText size={12} className="text-ink-faint" />
                        Необходимые документы
                      </p>
                      <ul className="space-y-1.5">
                        {guide.documents.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-ink-muted font-body leading-snug">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-border-strong flex-shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div className="bg-amber-950/50 border border-amber-800/30 rounded-xl px-4 py-3.5">
                      <p className="text-xs font-body font-semibold text-amber-400 flex items-center gap-1.5 mb-2.5">
                        <Lightbulb size={12} />
                        Советы
                      </p>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-ink-muted font-body leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500/50 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          {opportunity.website && (
            <a
              href={opportunity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
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
    document.body,
  )
}
