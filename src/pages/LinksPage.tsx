import { ExternalLink } from 'lucide-react'
import { Section } from '../components/layout/Section'
import { links } from '../data/links'
import type { UsefulLink } from '../types'

const GROUP_LABELS: Record<UsefulLink['group'], string> = {
  main:      'Основные порталы',
  volunteer: 'Волонтёрство',
  education: 'Наука и образование',
}
const GROUP_EMOJI: Record<UsefulLink['group'], string> = {
  main:      '🏛️',
  volunteer: '🤝',
  education: '📚',
}
const groups: UsefulLink['group'][] = ['main', 'volunteer', 'education']

export function LinksPage() {
  return (
    <div className="page-enter">
      <Section className="pt-24 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink mb-2">
              Полезные ресурсы
            </h1>
            <p className="text-sm text-ink-muted font-body">
              Официальные платформы и порталы для поиска возможностей
            </p>
          </div>

          <div className="space-y-10">
            {groups.map((group) => {
              const groupLinks = links.filter((l) => l.group === group)
              return (
                <div key={group}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl">{GROUP_EMOJI[group]}</span>
                    <h2 className="font-heading font-bold text-lg text-ink">
                      {GROUP_LABELS[group]}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {groupLinks.map((link) => (
                      <a
                        key={link.id}
                        href={`https://${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-layer border border-border rounded-card shadow-card hover:shadow-card-hover
                                   hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading font-bold text-ink text-sm">
                            {link.name}
                          </p>
                          <ExternalLink
                            size={14}
                            className="flex-shrink-0 text-ink-faint group-hover:text-accent transition-colors mt-0.5"
                          />
                        </div>
                        <p className="text-xs text-ink-muted font-body leading-relaxed flex-1">
                          {link.description}
                        </p>
                        <p className="text-xs font-body font-semibold text-accent">
                          {link.url}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>
    </div>
  )
}
