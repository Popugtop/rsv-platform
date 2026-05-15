import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ChevronRight, Trophy, Sparkles, CalendarClock } from 'lucide-react'
import { Section } from '../components/layout/Section'
import { Modal } from '../components/ui/Modal'
import { opportunities } from '../data/opportunities'
import { stages, tracks } from '../data/tracks'
import type { TrackStep } from '../data/tracks'
import { TYPE_LABELS, TYPE_COLORS, AUDIENCE_LABELS, AUDIENCE_COLORS } from '../types'
import type { Opportunity } from '../types'

// ─── Date helpers ────────────────────────────────────────────────────────────

const NOW_MONTH = new Date().getMonth() + 1 // 1–12

const MONTHS_PREP = [
  'январе','феврале','марте','апреле','мае','июне',
  'июле','августе','сентябре','октябре','ноябре','декабре',
]

const MONTHS_NOM = [
  'январь','февраль','март','апрель','май','июнь',
  'июль','август','сентябрь','октябрь','ноябрь','декабрь',
]

type StepStatus = 'open' | 'upcoming' | 'missed'

function getStatus(openMonths: number[]): StepStatus {
  if (openMonths.includes(NOW_MONTH)) return 'open'
  if (openMonths.some(m => m > NOW_MONTH)) return 'upcoming'
  return 'missed'
}

function getNextMonth(openMonths: number[]): number {
  const future = openMonths.filter(m => m > NOW_MONTH).sort((a, b) => a - b)
  return future.length ? future[0] : openMonths.sort((a, b) => a - b)[0]
}

type RankedStep = TrackStep & { status: StepStatus; nextMonth: number }

function rankSteps(steps: TrackStep[]): RankedStep[] {
  return steps
    .map(step => ({
      ...step,
      status: getStatus(step.openMonths),
      nextMonth: getNextMonth(step.openMonths),
    }))
    .sort((a, b) => {
      const order: Record<StepStatus, number> = { open: 0, upcoming: 1, missed: 2 }
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
      // within 'open': fewer months = more specific/urgent = first
      if (a.status === 'open') return a.openMonths.length - b.openMonths.length
      // within 'upcoming': soonest first
      if (a.status === 'upcoming') return a.nextMonth - b.nextMonth
      return 0
    })
}

// ─── Visual config ───────────────────────────────────────────────────────────

const TYPE_DOT: Record<string, string> = {
  grant:      'bg-type-grant',
  contest:    'bg-type-contest',
  education:  'bg-type-education',
  internship: 'bg-type-internship',
  forum:      'bg-type-forum',
}

const TYPE_BORDER: Record<string, string> = {
  grant:      'border-type-grant/25',
  contest:    'border-type-contest/25',
  education:  'border-type-education/25',
  internship: 'border-type-internship/25',
  forum:      'border-type-forum/25',
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CareerTrackPage() {
  const [activeStageId, setActiveStageId] = useState('school-high')
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)

  const activeTrack = tracks.find((t) => t.stageId === activeStageId)!
  const activeStage = stages.find((s) => s.id === activeStageId)!
  const ranked = rankSteps(activeTrack.steps)

  const openCount    = ranked.filter(s => s.status === 'open').length
  const upcomingCount = ranked.filter(s => s.status === 'upcoming').length
  const missedCount  = ranked.filter(s => s.status === 'missed').length

  return (
    <div className="page-enter">
      <style>{`.stage-scroller::-webkit-scrollbar { display: none; }`}</style>

      <Section className="pt-24 pb-20 px-5">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-body font-semibold text-xs px-3.5 py-1.5 rounded-pill mb-5">
              <Sparkles size={11} />
              Карьерный трек
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-3 leading-tight">
              Построй свой путь
            </h1>
            <p className="text-base text-ink-muted font-body leading-relaxed max-w-xl">
              Выбери статус — и получи персональную дорожную карту возможностей в правильном порядке.
            </p>
          </div>

          {/* Stage selector */}
          <div className="relative -mx-5 mb-10">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
            <div
              className="stage-scroller flex gap-2 overflow-x-auto pb-2 px-5"
              style={{ scrollbarWidth: 'none' } as React.CSSProperties}
            >
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`
                    flex-shrink-0 flex flex-col items-start gap-0.5 px-4 py-3 rounded-2xl border
                    transition-all duration-200 text-left
                    ${activeStageId === stage.id
                      ? 'bg-accent border-accent shadow-lg shadow-accent/20 text-white'
                      : 'bg-layer border-border text-ink-muted hover:border-accent/40 hover:text-ink'
                    }
                  `}
                >
                  <span className="text-xl leading-none mb-1">{stage.emoji}</span>
                  <span className="font-heading font-bold text-sm whitespace-nowrap leading-none">
                    {stage.label}
                  </span>
                  <span className={`font-body text-xs whitespace-nowrap mt-0.5 leading-none ${
                    activeStageId === stage.id ? 'text-white/60' : 'text-ink-faint'
                  }`}>
                    {stage.sublabel}
                  </span>
                </button>
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />
          </div>

          {/* Stage description */}
          <div className="flex items-start gap-3 bg-accent-pale border border-accent/20 rounded-2xl px-4 py-3.5 mb-4">
            <span className="text-xl leading-none mt-0.5 flex-shrink-0">{activeStage.emoji}</span>
            <div>
              <p className="font-heading font-bold text-sm text-ink mb-0.5">{activeStage.label}</p>
              <p className="font-body text-sm text-ink-muted leading-relaxed">{activeStage.description}</p>
            </div>
          </div>

          {/* Status summary */}
          <div className="flex flex-wrap items-center gap-2 mb-8 px-1">
            <CalendarClock size={13} className="text-ink-faint" />
            <span className="text-xs text-ink-faint font-body">
              Актуально для {MONTHS_NOM[NOW_MONTH - 1]}:
            </span>
            {openCount > 0 && (
              <span className="text-xs font-body font-semibold text-emerald-400">
                {openCount} открыто
              </span>
            )}
            {upcomingCount > 0 && (
              <span className="text-xs font-body font-semibold text-sky-400">
                {upcomingCount} скоро
              </span>
            )}
            {missedCount > 0 && (
              <span className="text-xs font-body font-semibold text-ink-faint">
                {missedCount} до следующего года
              </span>
            )}
          </div>

          {/* Timeline */}
          <div key={activeStageId} className="relative">
            <div
              className="absolute bg-border"
              style={{ left: '15px', width: '1px', top: '34px', bottom: '34px' }}
              aria-hidden="true"
            />

            <div className="space-y-5">
              {ranked.map((step, index) => {
                const opp = opportunities.find((o) => o.id === step.opportunityId)
                if (!opp) return null
                const isMissed = step.status === 'missed'

                return (
                  <div
                    key={step.opportunityId}
                    className="relative flex gap-5"
                    style={{
                      animation: 'pageIn 0.35s ease both',
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 pt-[5px]">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-canvas
                        ${isMissed ? 'bg-ink-faint' : TYPE_DOT[opp.type]}
                      `}>
                        <span className="text-white text-xs font-heading font-black drop-shadow-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`
                      flex-1 bg-layer rounded-card shadow-card p-5 border transition-all duration-300
                      ${isMissed
                        ? 'border-border opacity-55'
                        : `${TYPE_BORDER[opp.type]} hover:shadow-card-hover hover:-translate-y-0.5`
                      }
                    `}>
                      {/* Status badge + timing */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <StatusBadge step={step} />
                        <span className="flex items-center gap-1 text-xs text-ink-faint font-body flex-shrink-0">
                          <Clock size={11} />
                          {step.timing}
                        </span>
                      </div>

                      {/* Type + audience tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className={`tag-badge ${TYPE_COLORS[opp.type]}`}>
                          {TYPE_LABELS[opp.type]}
                        </span>
                        {opp.audience.map((a) => (
                          <span key={a} className={`tag-badge ${AUDIENCE_COLORS[a]}`}>
                            {AUDIENCE_LABELS[a]}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-base text-ink mb-2 leading-snug">
                        {opp.name}
                      </h3>

                      {/* Context */}
                      <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                        {step.context}
                      </p>

                      {/* Outcome chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {step.outcomes.map((outcome) => (
                          <span
                            key={outcome}
                            className="inline-flex items-center gap-1 bg-accent-pale text-accent font-body font-semibold text-xs px-2.5 py-1 rounded-full"
                          >
                            <Trophy size={10} />
                            {outcome}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <p className="text-xs text-ink-faint font-body truncate mr-3">
                          {opp.organizer}
                        </p>
                        <button
                          onClick={() => setSelectedOpp(opp)}
                          className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-body font-semibold text-accent hover:text-accent-hover transition-colors duration-150"
                        >
                          Подробнее и заявка
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 bg-layer border border-border rounded-card p-6 text-center">
            <p className="font-heading font-bold text-ink mb-1">Хочешь посмотреть все программы?</p>
            <p className="text-sm text-ink-muted font-body mb-5">
              В каталоге есть фильтры по типу, аудитории и направлению
            </p>
            <Link to="/catalog" className="btn-primary">
              Открыть каталог
              <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </Section>

      <Modal opportunity={selectedOpp} onClose={() => setSelectedOpp(null)} />
    </div>
  )
}

// ─── Status badge sub-component ──────────────────────────────────────────────

function StatusBadge({ step }: { step: RankedStep }) {
  if (step.status === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/30 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Открыто сейчас
      </span>
    )
  }
  if (step.status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-sky-300 bg-sky-950/60 border border-sky-800/30 px-2.5 py-1 rounded-full">
        Откроется в {MONTHS_PREP[step.nextMonth - 1]}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-ink-faint bg-canvas border border-border px-2.5 py-1 rounded-full">
      До следующего года
    </span>
  )
}
