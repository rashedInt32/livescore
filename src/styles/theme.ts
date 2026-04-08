export const theme = {
  colors: {
    background:   '#0f172a',
    surface:      '#1e293b',
    surfaceHover: '#334155',

    textPrimary:   '#f8fafc',
    textSecondary: '#94a3b8',
    textTertiary:  '#64748b',

    live:       '#ef4444',
    liveBg:     'rgba(239, 68, 68, 0.12)',
    success:    '#22c55e',
    successBg:  'rgba(34, 197, 94, 0.12)',
    warning:    '#eab308',
    warningBg:  'rgba(234, 179, 8, 0.12)',
    muted:      '#64748b',
    mutedBg:    'rgba(100, 116, 139, 0.12)',

    winner:  '#22c55e',
    border:  '#334155',

    filterActive:          '#3b82f6',
    filterActiveBg:        'rgba(59, 130, 246, 0.12)',
    filterBadgeActive:     '#3b82f6',
    filterBadgeInactive:   '#334155',
  },

  fonts: {
    primary: 'var(--font-barlow), sans-serif',
  },

  fontSizes: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    base: '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '3rem',
    '5xl': '3.5rem',
  },

  spacing: {
    xs:   '0.25rem',
    sm:   '0.5rem',
    md:   '1rem',
    lg:   '1.5rem',
    xl:   '2rem',
    '2xl':'3rem',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },

  borderRadius: {
    sm:   '4px',
    md:   '8px',
    lg:   '12px',
    full: '9999px',
  },

  transitions: {
    fast:   '150ms ease',
    normal: '250ms ease',
  },

  shadows: {
    card:      '0 2px 8px rgba(0,0,0,0.3)',
    cardHover: '0 8px 24px rgba(0,0,0,0.5)',
  },
} as const

export type Theme = typeof theme
