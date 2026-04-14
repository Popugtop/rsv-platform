import { useState, useMemo } from 'react'
import { Section } from '../components/layout/Section'
import { SearchBar } from '../components/catalog/SearchBar'
import { TermCard } from '../components/knowledge/TermCard'
import { terms } from '../data/terms'

export function KnowledgePage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return terms
    return terms.filter(
      (t) => t.name.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    )
  }, [search])

  // Split into two columns for desktop
  const mid = Math.ceil(filtered.length / 2)
  const col1 = filtered.slice(0, mid)
  const col2 = filtered.slice(mid)

  return (
    <div className="page-enter">
      <Section className="pt-24 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-2">
              База знаний
            </h1>
            <p className="text-sm text-ink-muted font-body">
              Полезные термины и понятия в сфере молодёжных возможностей
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex-1 max-w-md">
              <SearchBar value={search} onChange={setSearch} placeholder="Найти термин..." />
            </div>
            <p className="text-sm text-ink-muted font-body whitespace-nowrap">
              Найдено: <span className="font-semibold text-ink">{filtered.length}</span> из {terms.length}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-x-5 gap-y-2.5 items-start">
              {/* Column 1 */}
              <div className="space-y-2.5">
                {col1.map((term, idx) => (
                  <TermCard key={term.id} term={term} index={idx + 1} />
                ))}
              </div>
              {/* Column 2 */}
              <div className="space-y-2.5">
                {col2.map((term, idx) => (
                  <TermCard key={term.id} term={term} index={mid + idx + 1} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-muted font-body py-6">
              Термин не найден. Попробуйте другой запрос.
            </p>
          )}
        </div>
      </Section>
    </div>
  )
}
