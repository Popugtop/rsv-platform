import { useState, useMemo } from 'react'
import { BookMarked, Lightbulb } from 'lucide-react'
import { Section } from '../components/layout/Section'
import { SearchBar } from '../components/catalog/SearchBar'
import { terms } from '../data/terms'

export function KnowledgePage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return terms
    return terms.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.example?.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <div className="page-enter">
      <Section className="pt-24 pb-20 px-5">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-body font-semibold text-xs px-3.5 py-1.5 rounded-pill mb-5">
              <BookMarked size={11} />
              {terms.length} терминов
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-3 leading-tight">
              База знаний
            </h1>
            <p className="text-base text-ink-muted font-body leading-relaxed">
              Ключевые термины и понятия в сфере молодёжных возможностей — с примерами из реальной жизни.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} placeholder="Найти термин или понятие..." />
            </div>
            {search && (
              <span className="text-xs text-ink-faint font-body whitespace-nowrap tabular-nums">
                {filtered.length} из {terms.length}
              </span>
            )}
          </div>

          {/* Terms list */}
          {filtered.length > 0 ? (
            <div className="space-y-px">
              {filtered.map((term, index) => (
                <article
                  key={term.id}
                  className="group relative bg-layer border border-border rounded-card p-6 sm:p-8 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                  style={{
                    animation: 'pageIn 0.4s ease both',
                    animationDelay: `${index * 55}ms`,
                  }}
                >
                  {/* Index + name row */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-accent/20 group-hover:text-accent/35 transition-colors duration-300 leading-none select-none tabular-nums w-10 text-right flex-shrink-0">
                      {String(term.id).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-ink leading-tight">
                      {term.name}
                    </h2>
                  </div>

                  {/* Definition */}
                  <div className="pl-14">
                    <p className="text-sm text-ink-muted font-body leading-relaxed mb-5">
                      {term.definition}
                    </p>

                    {/* Example */}
                    {term.example && (
                      <div className="border-l-2 border-accent/40 pl-4 group-hover:border-accent/70 transition-colors duration-300">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Lightbulb size={11} className="text-accent flex-shrink-0" />
                          <span className="font-body font-semibold text-xs text-accent uppercase tracking-wider">
                            Пример
                          </span>
                        </div>
                        <p className="text-sm text-ink-muted font-body leading-relaxed italic">
                          {term.example}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-layer rounded-card border border-border">
              <p className="font-heading font-bold text-xl text-ink-muted mb-2">Термин не найден</p>
              <p className="text-sm text-ink-muted font-body mb-5">
                Попробуйте другой запрос или&nbsp;
                <button
                  onClick={() => setSearch('')}
                  className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
                >
                  сбросьте поиск
                </button>
              </p>
            </div>
          )}

        </div>
      </Section>
    </div>
  )
}
