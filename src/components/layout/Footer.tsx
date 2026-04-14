import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/',          label: 'Главная'   },
  { to: '/catalog',   label: 'Каталог'   },
  { to: '/knowledge', label: 'Термины'   },
  { to: '/links',     label: 'Ресурсы'   },
  { to: '/about',     label: 'О проекте' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-layer mt-auto">
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-7 h-7 rounded-xl bg-accent flex items-center justify-center text-white text-xs font-heading font-extrabold">
                Р
              </span>
              <span className="font-heading font-extrabold text-ink text-sm">РСВ Платформа</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Интерактивный справочник возможностей для самореализации молодёжи в России.
            </p>
          </div>

          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink-muted mb-4">
              Разделы
            </p>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink-muted mb-4">
              Масштаб
            </p>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              <li>26+ проектов РСВ</li>
              <li>20 млн+ участников</li>
              <li>89 регионов</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-ink-faint">© 2026 РСВ Платформа</p>
          <p className="text-xs text-ink-faint">
            Курс «Основы российской государственности», ТюмГУ
          </p>
        </div>
      </div>
    </footer>
  )
}
