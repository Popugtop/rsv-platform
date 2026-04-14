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
      {/* Audience row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-body font-semibold uppercase tracking-widest text-ink-faint mr-1">
          Аудитория
        </span>
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

      {/* Type row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-body font-semibold uppercase tracking-widest text-ink-faint mr-1">
          Тип
        </span>
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

      {/* Controls row */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-ink-muted font-body">
          Найдено:{' '}
          <span className="font-semibold text-ink">{resultCount}</span>
        </p>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-accent font-body font-medium hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  )
}
