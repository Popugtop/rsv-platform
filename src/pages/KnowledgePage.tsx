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

          <div className="max-w-lg mb-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Найти термин..."
            />
          </div>

          <p className="text-sm text-ink-muted font-body mb-6">
            Найдено:{' '}
            <span className="font-semibold text-ink">{filtered.length}</span>
            {' '}из {terms.length}
          </p>

          <div className="max-w-2xl space-y-2.5">
            {filtered.length > 0 ? (
              filtered.map((term, idx) => (
                <TermCard key={term.id} term={term} index={idx + 1} />
              ))
            ) : (
              <p className="text-sm text-ink-faint font-body py-6">
                Термин не найден. Попробуйте другой запрос.
              </p>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
