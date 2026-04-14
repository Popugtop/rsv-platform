import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Поиск...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-surface border border-border rounded-2xl
                   font-body text-sm text-ink placeholder:text-ink-faint
                   focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                   transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-ink-faint hover:text-ink hover:bg-canvas transition-colors"
          aria-label="Очистить"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
