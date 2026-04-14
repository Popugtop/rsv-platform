import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { SearchBar } from '../components/catalog/SearchBar'
import { FilterTags } from '../components/catalog/FilterTags'
import { OpportunityCard } from '../components/catalog/OpportunityCard'
import { Modal } from '../components/ui/Modal'
import { useFilter } from '../hooks/useFilter'
import { opportunities } from '../data/opportunities'
import type { AudienceTag, OpportunityType, Category, Opportunity } from '../types'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeAudience, setActiveAudience] = useState<AudienceTag[]>([])
  const [activeTypes, setActiveTypes] = useState<OpportunityType[]>([])
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [selected, setSelected] = useState<Opportunity | null>(null)

  // Read category from URL param (set from HomePage)
  useEffect(() => {
    const cat = searchParams.get('category') as Category | null
    if (cat) {
      setActiveCategory(cat)
      setSearchParams({}, { replace: true })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useFilter({ opportunities, searchQuery: search, activeAudience, activeTypes, activeCategory })

  const toggleAudience = (tag: AudienceTag) =>
    setActiveAudience((p) => p.includes(tag) ? p.filter((a) => a !== tag) : [...p, tag])

  const toggleType = (type: OpportunityType) =>
    setActiveTypes((p) => p.includes(type) ? p.filter((t) => t !== type) : [...p, type])

  const resetFilters = () => {
    setActiveAudience([])
    setActiveTypes([])
    setActiveCategory(null)
    setSearch('')
  }

  return (
    <div className="page-enter">
      <Section className="pt-24 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-2">
              Каталог возможностей
            </h1>
            <p className="text-sm text-ink-muted font-body">
              13 программ · гранты, конкурсы, стажировки, обучение, форумы
            </p>
          </div>

          {/* Search */}
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Поиск по названию или описанию..."
          />

          {/* Active category badge */}
          {activeCategory && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-ink-muted font-body">Категория:</span>
              <button
                onClick={() => setActiveCategory(null)}
                className="chip-active text-xs py-1 flex items-center gap-1.5"
              >
                {activeCategory === 'science'   && 'Наука и IT'}
                {activeCategory === 'volunteer' && 'Волонтёрство'}
                {activeCategory === 'business'  && 'Бизнес и управление'}
                {activeCategory === 'creative'  && 'Творчество'}
                <span className="opacity-70">×</span>
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="mt-5 bg-layer rounded-2xl border border-border p-5">
            <FilterTags
              activeAudience={activeAudience}
              activeTypes={activeTypes}
              onAudienceToggle={toggleAudience}
              onTypeToggle={toggleType}
              onReset={resetFilters}
              resultCount={filtered.length}
            />
          </div>

          {/* Grid */}
          <div className="mt-6">
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} onOpen={setSelected} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-layer rounded-card border border-border">
                <p className="font-heading font-bold text-xl text-ink-muted mb-2">Ничего не найдено</p>
                <p className="text-sm text-ink-faint font-body mb-5">
                  Попробуйте изменить запрос или сбросить фильтры
                </p>
                <button onClick={resetFilters} className="btn-ghost">
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Modal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
