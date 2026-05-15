import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ChevronRight, Trophy, Sparkles } from 'lucide-react'
import { Section } from '../components/layout/Section'
import { Modal } from '../components/ui/Modal'
import { opportunities } from '../data/opportunities'
import { stages, tracks } from '../data/tracks'
import { TYPE_LABELS, TYPE_COLORS, AUDIENCE_LABELS, AUDIENCE_COLORS } from '../types'
import type { Opportunity } from '../types'

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

export function CareerTrackPage() {
  const [activeStageId, setActiveStageId] = useState('school-high')
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)

  const activeTrack = tracks.find((t) => t.stageId === activeStageId)!
  const activeStage = stages.find((s) => s.id === activeStageId)!

  return (
    <div className="page-enter">
      {/* Hide scrollbar on stage selector cross-browser */}
      <style>{`.stage-scroller::-webkit-scrollbar { display: none; }`}</style>

      <Section className="pt-24 pb-20 px-5">
        <div className="max-w-3xl mx-auto">

          {/* Page header */}
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

          {/* Stage selector with gradient fade edges */}
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

          {/* Active stage callout */}
          <div className="flex items-start gap-3 bg-accent-pale border border-accent/20 rounded-2xl px-4 py-3.5 mb-10">
            <span className="text-xl leading-none mt-0.5 flex-shrink-0">{activeStage.emoji}</span>
            <div>
              <p className="font-heading font-bold text-sm text-ink mb-0.5">{activeStage.label}</p>
              <p className="font-body text-sm text-ink-muted leading-relaxed">{activeStage.description}</p>
            </div>
          </div>

          {/* Timeline — key resets entrance animations on stage switch */}
          <div key={activeStageId} className="relative">
            {/* Vertical connecting line — behind dots via z-index */}
            <div
              className="absolute bg-border"
              style={{ left: '15px', width: '1px', top: '34px', bottom: '34px' }}
              aria-hidden="true"
            />

            <div className="space-y-5">
              {activeTrack.steps.map((step, index) => {
                const opp = opportunities.find((o) => o.id === step.opportunityId)
                if (!opp) return null

                return (
                  <div
                    key={step.opportunityId}
                    className="relative flex gap-5"
                    style={{
                      animation: 'pageIn 0.35s ease both',
                      animationDelay: `${index * 65}ms`,
                    }}
                  >
                    {/* Dot — ring-canvas cuts it visually from the line */}
                    <div className="relative z-10 flex-shrink-0 pt-[5px]">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${TYPE_DOT[opp.type]} ring-4 ring-canvas
                      `}>
                        <span className="text-white text-xs font-heading font-black drop-shadow-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`
                      flex-1 bg-layer border ${TYPE_BORDER[opp.type]} rounded-card shadow-card
                      hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 p-5
                    `}>
                      {/* Badges + timing */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <span className={`tag-badge ${TYPE_COLORS[opp.type]}`}>
                          {TYPE_LABELS[opp.type]}
                        </span>
                        {opp.audience.map((a) => (
                          <span key={a} className={`tag-badge ${AUDIENCE_COLORS[a]}`}>
                            {AUDIENCE_LABELS[a]}
                          </span>
                        ))}
                        <span className="ml-auto flex items-center gap-1 text-xs text-ink-faint font-body flex-shrink-0">
                          <Clock size={11} />
                          {step.timing}
                        </span>
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
