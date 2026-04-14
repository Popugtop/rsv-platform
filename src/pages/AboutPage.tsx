import { Star, Users, MapPin, Award } from 'lucide-react'
import { Section } from '../components/layout/Section'

const stats = [
  { icon: Star,   value: '26+',     label: 'Проектов РСВ',       color: 'bg-blue-950/60 text-blue-400'    },
  { icon: Users,  value: '20 млн+', label: 'Участников',         color: 'bg-emerald-950/60 text-emerald-400' },
  { icon: MapPin, value: '89',      label: 'Регионов России',    color: 'bg-amber-950/60 text-amber-400'  },
  { icon: Award,  value: '500+',    label: 'Грантовых проектов', color: 'bg-violet-950/60 text-violet-400' },
]

export function AboutPage() {
  return (
    <div className="page-enter">
      <Section className="pt-24 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-4">
              О проекте
            </h1>
            <p className="text-sm text-ink-muted font-body leading-relaxed">
              Образовательный лендинг-каталог, созданный для курса «Основы российской государственности».
            </p>
          </div>

          {/* Mission */}
          <div className="bg-layer border border-border rounded-card shadow-card p-6 sm:p-8 mb-6">
            <h2 className="font-heading font-bold text-xl text-ink mb-4">Миссия платформы</h2>
            <div className="space-y-3 text-sm text-ink-muted font-body leading-relaxed">
              <p>
                Платформа «Россия — страна возможностей» создана, чтобы помочь каждому найти свой путь к самореализации, независимо от места жительства и стартовых условий.
              </p>
              <p>
                Здесь собраны проверенные программы, которые дают реальный результат: финансирование идей, карьерный рост, новые знания и связи. Мы убеждены, что информация — первый шаг к возможности.
              </p>
              <p>
                Наша цель — сделать этот шаг как можно короче для каждого студента, школьника и молодого специалиста в России.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="bg-layer border border-border rounded-card p-5">
                <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <p className="font-heading font-black text-2xl text-ink leading-none mb-1">
                  {value}
                </p>
                <p className="text-xs text-ink-muted font-body leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <div className="bg-accent-pale border border-accent/30 rounded-card p-5 text-center">
            <p className="text-sm text-ink-muted font-body">
              Проект подготовлен в рамках курса{' '}
              <span className="font-semibold text-ink">«Основы российской государственности»</span>
              , Тюменский государственный университет, 2026
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
