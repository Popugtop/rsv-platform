import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas:  '#0B0E1A',
        layer:   '#141828',
        raised:  '#1C2240',
        ink:     '#DDE2FF',
        'ink-muted': '#7A84BB',
        'ink-faint': '#3E4570',
        accent: {
          DEFAULT: '#5272F2',
          hover:   '#6882FF',
          light:   '#1A2360',
          pale:    '#111840',
        },
        surface: '#141828',
        'surface-tint': '#1C2240',
        border:        '#252D5C',
        'border-strong':'#3340A0',
        // card top bars — vivid enough to pop on dark
        type: {
          grant:      '#34C47C',
          contest:    '#F0A030',
          education:  '#35B8D8',
          internship: '#9B6FE8',
          forum:      '#5080F0',
        },
      },
      fontFamily: {
        heading: ['"Nunito"',   'system-ui', 'sans-serif'],
        body:    ['"DM Sans"',  'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        pill: '9999px',
        btn:  '0.875rem',
      },
      boxShadow: {
        card:        '0 1px 3px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.4)',
        'card-hover':'0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(82,114,242,0.25)',
        nav:         '0 1px 0 rgba(255,255,255,0.05)',
        drawer:      '-4px 0 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config
