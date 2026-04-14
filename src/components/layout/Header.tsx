import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/',          label: 'Главная'  },
  { to: '/catalog',   label: 'Каталог'  },
  { to: '/knowledge', label: 'Термины'  },
  { to: '/links',     label: 'Ресурсы'  },
  { to: '/about',     label: 'О проекте'},
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-canvas/90 backdrop-blur-md shadow-nav' : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-heading font-extrabold text-base text-ink hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
          >
            <span className="w-7 h-7 rounded-xl bg-accent flex items-center justify-center text-white text-xs font-heading font-extrabold">
              Р
            </span>
            РСВ Платформа
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-layer/80 backdrop-blur rounded-pill px-1.5 py-1.5 border border-border">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-pill-active' : 'nav-pill-inactive'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 p-2 -mr-1 rounded-xl text-ink-muted hover:text-ink hover:bg-accent-pale transition-colors"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <X size={20} />
            </span>
            <span className={`flex items-center justify-center transition-all duration-200 ${menuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
              <Menu size={20} />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden
                    bg-canvas/97 backdrop-blur-xl transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-2 w-full px-8">
          {navLinks.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
              className={({ isActive }) => `
                w-full text-center py-4 font-heading font-black text-2xl rounded-2xl
                transition-all duration-300
                ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${isActive
                  ? 'text-accent bg-accent-pale'
                  : 'text-ink hover:text-accent hover:bg-raised'
                }
              `}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <p className="absolute bottom-8 text-xs text-ink-faint font-body">
          © 2026 РСВ Платформа
        </p>
      </div>
    </>
  )
}
