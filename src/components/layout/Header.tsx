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
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

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
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 -mr-1 rounded-xl text-ink-muted hover:text-ink hover:bg-accent-pale transition-colors"
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setDrawerOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-layer shadow-drawer
                      flex flex-col transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)] ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-border">
            <span className="font-heading font-extrabold text-ink text-sm">Навигация</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-xl text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex flex-col gap-1 p-3 flex-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-3 px-4 py-3 rounded-2xl bg-accent text-white font-body font-semibold text-sm'
                    : 'flex items-center gap-3 px-4 py-3 rounded-2xl text-ink-muted hover:bg-raised font-body font-medium text-sm transition-colors'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="px-5 pb-8">
            <p className="text-xs text-ink-faint font-body">© 2026 РСВ Платформа</p>
          </div>
        </div>
      </div>
    </>
  )
}
