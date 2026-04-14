import type { AudienceTag, OpportunityType } from '../../types'
import { AUDIENCE_LABELS, TYPE_LABELS } from '../../types'

interface FilterTagsProps {
  activeAudience: AudienceTag[]
  activeTypes: OpportunityType[]
  onAudienceToggle: (tag: AudienceTag) => void
  onTypeToggle: (type: OpportunityType) => void
  onReset: () => void
  resultCount: number
}

const audiences: AudienceTag[] = ['school', 'student', 'specialist', 'all']
const types: OpportunityType[] = ['grant', 'contest', 'education', 'internship', 'forum']

export function FilterTags({
  activeAudience,
  activeTypes,
  onAudienceToggle,
  onTypeToggle,
  onReset,
  resultCount,
}: FilterTagsProps) {
  const hasFilters = activeAudience.length > 0 || activeTypes.length > 0

  return (
    <div className="space-y-4">
      {/* Audience */}
      <div className="space-y-2">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink-faint">
          Аудитория
        </p>
        <div className="flex flex-wrap gap-2">
          {audiences.map((a) => (
            <button
              key={a}
              onClick={() => onAudienceToggle(a)}
              className={activeAudience.includes(a) ? 'chip-active' : 'chip-inactive'}
            >
              {AUDIENCE_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink-faint">
          Тип
        </p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => onTypeToggle(t)}
              className={activeTypes.includes(t) ? 'chip-active' : 'chip-inactive'}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <p className="text-sm text-ink-muted font-body">
          Найдено: <span className="font-semibold text-ink">{resultCount}</span>
        </p>
        {hasFilters && (
          <button onClick={onReset} className="text-xs text-accent font-body font-medium hover:underline">
            Сбросить
          </button>
        )}
      </div>
    </div>
  )
}
