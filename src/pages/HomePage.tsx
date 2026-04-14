import { useNavigate } from 'react-router-dom'
import { ArrowRight, Users, MapPin, Award, Star } from 'lucide-react'
import { Section } from '../components/layout/Section'
import type { Category } from '../types'
import { CATEGORY_LABELS } from '../types'

const categories: { key: Category; emoji: string; color: string }[] = [
  { key: 'science',   emoji: '🔬', color: 'bg-blue-950/50 border-blue-800/50' },
  { key: 'volunteer', emoji: '🤝', color: 'bg-emerald-950/50 border-emerald-800/50' },
  { key: 'business',  emoji: '💼', color: 'bg-amber-950/50 border-amber-800/50' },
  { key: 'creative',  emoji: '🎨', color: 'bg-violet-950/50 border-violet-800/50' },
]

const stats = [
  { icon: Star,   value: '26+',     label: 'Проектов РСВ'   },
  { icon: Users,  value: '20 млн+', label: 'Участников'     },
  { icon: MapPin, value: '89',      label: 'Регионов'       },
  { icon: Award,  value: '500+',    label: 'Грантов выдано' },
]

export function HomePage() {
  const navigate = useNavigate()

  const goToCatalog = (category?: Category) => {
    if (category) {
      navigate(`/catalog?category=${category}`)
    } else {
      navigate('/catalog')
    }
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <Section className="pt-28 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-body font-semibold text-xs px-3.5 py-1.5 rounded-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Образовательный справочник · 2026
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1] mb-5">
              Россия —
              <br />
              <span className="text-accent">страна</span>
              {' '}возможностей
            </h1>

            <p className="text-base sm:text-lg text-ink-muted font-body leading-relaxed mb-8 max-w-lg">
              Гранты, конкурсы, стажировки и образовательные программы для школьников, студентов и молодых специалистов.
            </p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => goToCatalog()} className="btn-primary">
                Открыть каталог
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/knowledge')}
                className="btn-ghost"
              >
                База знаний
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="py-8 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-layer border border-border rounded-card shadow-card px-5 py-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-2xl bg-accent-pale flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-heading font-black text-xl text-ink leading-none">{value}</p>
                  <p className="text-xs text-ink-muted font-body mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section className="py-12 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="font-heading font-bold text-2xl text-ink mb-1">Направления</h2>
            <p className="text-sm text-ink-muted font-body">Нажмите на карточку, чтобы сразу открыть каталог с фильтром</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map(({ key, emoji, color }) => (
              <button
                key={key}
                onClick={() => goToCatalog(key)}
                className={`group ${color} border rounded-card p-5 text-left
                            hover:shadow-card hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="text-3xl block mb-3">{emoji}</span>
                <p className="font-heading font-bold text-ink text-sm">
                  {CATEGORY_LABELS[key]}
                </p>
                <p className="text-xs text-ink-muted font-body mt-1 flex items-center gap-1 group-hover:text-accent transition-colors duration-200">
                  Смотреть <ArrowRight size={10} />
                </p>
              </button>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
