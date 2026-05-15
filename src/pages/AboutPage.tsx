import { Star, Users, MapPin, Award, ExternalLink, Globe, GraduationCap, BookOpen, BarChart3 } from 'lucide-react'
import { Section } from '../components/layout/Section'

const stats = [
  { icon: Star,   value: '26+',     label: 'Проектов РСВ',       color: 'bg-blue-950/60 text-blue-400'       },
  { icon: Users,  value: '20 млн+', label: 'Участников',         color: 'bg-emerald-950/60 text-emerald-400' },
  { icon: MapPin, value: '89',      label: 'Регионов России',    color: 'bg-amber-950/60 text-amber-400'     },
  { icon: Award,  value: '500+',    label: 'Грантовых проектов', color: 'bg-violet-950/60 text-violet-400'   },
]

interface Article {
  title: string
  description: string
  source: string
  sourceBadge: string
  badgeColor: string
  url: string
}

const articles: Article[] = [
  {
    title: '«Россия — страна возможностей» как экосистема создания равных стартовых возможностей для граждан',
    description: 'Исследует платформу РСВ как механизм обеспечения равных возможностей. Разбирается структура экосистемы, проекты и принципы вовлечения молодёжи.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/rossiya-strana-vozmozhnostey-kak-ekosistema-sozdaniya-ravnyh-startovyh-vozmozhnostey-dlya-grazhdan',
  },
  {
    title: 'Молодёжь современной России как ключевой ресурс модернизации социума',
    description: 'Анализируется роль молодёжи в развитии российского общества, её потенциал и значение для модернизации страны.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/molodezh-sovremennoy-rossii-kak-klyuchevoy-resurs-modernizatsii-sotsiuma',
  },
  {
    title: 'Молодёжь как элемент человеческого капитала и стратегический ресурс развития современного российского общества',
    description: 'Исследование позиции молодёжи в структуре человеческого капитала, анализ тенденций и перспектив развития молодёжного ресурса страны.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/molodezh-kak-element-chelovecheskogo-kapitala-i-strategicheskiy-resurs-razvitiya-sovremennogo-rossiyskogo-obschestva-sostoyanie',
  },
  {
    title: 'Государственная молодёжная политика Российской Федерации: практика формирования и новые законодательные парадигмы',
    description: 'Рассматривается нормативно-правовая база молодёжной политики России и практики её реализации на федеральном уровне.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/gosudarstvennaya-molodezhnaya-politika-rossiyskoy-federatsii-praktika-formirovaniya-i-novye-zakonodatelnye-paradigmy',
  },
  {
    title: 'Проблема стимулирования творческой активности молодых исследователей в России',
    description: 'Анализируются барьеры и инструменты поддержки молодых учёных: гранты, конкурсы и программы поддержки инноваций.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/problema-stimulirovaniya-tvorcheskoy-aktivnosti-molodyh-issledovateley-v-rossii',
  },
  {
    title: 'Молодёжная политика в условиях цифровизации: постановка проблемы',
    description: 'Исследует трансформацию государственной молодёжной политики в эпоху цифровых технологий и её адаптацию к новым форматам.',
    source: 'КиберЛенинка',
    sourceBadge: 'CyberLeninka',
    badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-800/30',
    url: 'https://cyberleninka.ru/article/n/molodezhnaya-politika-v-usloviyah-tsifrovizatsii-postanovka-problemy',
  },
  {
    title: 'Россия — страна возможностей',
    description: 'Аналитический обзор ВЦИОМ о восприятии программ РСВ и возможностей для самореализации: данные социологических опросов по всей России.',
    source: 'ВЦИОМ',
    sourceBadge: 'ВЦИОМ',
    badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/30',
    url: 'https://wciom.ru/analytical-reviews/analiticheskii-obzor/rossija-strana-vozmozhnostei',
  },
]

const foreignStats = [
  { value: '350 000+', label: 'иностранных студентов обучается в России' },
  { value: '116',      label: 'стран представлено в российских вузах'    },
  { value: '45%',      label: 'хотят остаться в России после учёбы'      },
  { value: '84%',      label: 'отмечают высокий уровень сервиса и комфорта' },
]

const foreignQuotes = [
  {
    quote: 'Россия предоставляет уникальные возможности для получения образования мирового уровня при значительно меньших затратах, чем в западных странах.',
    country: '🇨🇳 Китай',
  },
  {
    quote: 'Государственные программы поддержки молодёжи в России — одни из самых масштабных в мире. Подобного охвата нет почти нигде.',
    country: '🇮🇳 Индия',
  },
  {
    quote: 'Научные лаборатории и возможности для исследовательской работы здесь произвели на меня огромное впечатление. Поддержка государства реально ощущается.',
    country: '🇪🇬 Египет',
  },
]

export function AboutPage() {
  return (
    <div className="page-enter">
      <Section className="pt-24 pb-20 px-5">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Page header */}
          <div className="max-w-2xl">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-4">
              О проекте
            </h1>
            <p className="text-sm text-ink-muted font-body leading-relaxed">
              Образовательный лендинг-каталог, созданный для курса «Основы российской государственности».
            </p>
          </div>

          {/* Mission */}
          <div className="bg-layer border border-border rounded-card shadow-card p-6 sm:p-8">
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

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="bg-layer border border-border rounded-card p-5">
                <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <p className="font-heading font-black text-2xl text-ink leading-none mb-1">{value}</p>
                <p className="text-xs text-ink-muted font-body leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Scientific articles ─────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-2xl bg-accent-pale flex items-center justify-center flex-shrink-0">
                <BookOpen size={16} className="text-accent" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-ink leading-none">
                  Научные публикации
                </h2>
                <p className="text-xs text-ink-muted font-body mt-0.5">
                  Рецензируемые статьи и аналитика об РСВ и молодёжной политике России
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {articles.map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-layer border border-border rounded-card p-5 hover:border-accent/40 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  {/* Source badge */}
                  <span className={`self-start inline-flex items-center gap-1.5 tag-badge border ${article.badgeColor} mb-3`}>
                    <GraduationCap size={10} />
                    {article.sourceBadge}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-sm text-ink leading-snug mb-2 flex-1 group-hover:text-accent transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-ink-muted font-body leading-relaxed mb-4">
                    {article.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-xs font-body font-semibold text-accent group-hover:text-accent-hover transition-colors mt-auto">
                    Открыть статью
                    <ExternalLink size={11} />
                  </div>
                </a>
              ))}
            </div>

            <p className="text-xs text-ink-faint font-body mt-4 text-center">
              Все статьи размещены в открытом доступе и доступны для бесплатного чтения
            </p>
          </div>

          {/* ── Foreign citizens survey ─────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-2xl bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                <Globe size={16} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-ink leading-none">
                  Россия глазами иностранных граждан
                </h2>
                <p className="text-xs text-ink-muted font-body mt-0.5">
                  Данные опросов и исследований зарубежных студентов и специалистов в России
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {foreignStats.map(({ value, label }) => (
                <div key={label} className="bg-layer border border-border rounded-card px-4 py-4 text-center">
                  <p className="font-heading font-black text-2xl text-emerald-400 leading-none mb-1">
                    {value}
                  </p>
                  <p className="text-xs text-ink-muted font-body leading-snug">{label}</p>
                </div>
              ))}
            </div>

            {/* Quote cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {foreignQuotes.map(({ quote, country }) => (
                <div key={country} className="bg-layer border border-border rounded-card p-4">
                  <p className="text-xs text-ink-muted font-body leading-relaxed italic mb-3">
                    «{quote}»
                  </p>
                  <p className="text-xs font-body font-semibold text-ink-faint">{country}</p>
                </div>
              ))}
            </div>

            {/* Source link */}
            <a
              href="https://www.vedomosti.ru/press_releases/2025/07/02/kazhdii-vtoroi-oproshennii-inostrannii-student-hochet-ostatsya-v-rossii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-accent font-body transition-colors duration-150"
            >
              <BarChart3 size={12} />
              Источник: исследование АСИ «Россия глазами иностранных студентов», Ведомости, 2025
              <ExternalLink size={10} />
            </a>
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
