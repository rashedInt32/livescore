export const theme = {
  colors: {
    background:   '#1a1a1a',
    surface:      '#2d2d2d',
    surfaceHover: '#4a4a4a',

    textPrimary:   '#f5f5f5',
    textSecondary: '#a0a0a0',
    textTertiary:  '#707070',

    live:       '#ef4444',
    liveBg:     'rgba(239, 68, 68, 0.12)',
    success:    '#22c55e',
    successBg:  'rgba(34, 197, 94, 0.12)',
    warning:    '#eab308',
    warningBg:  'rgba(234, 179, 8, 0.12)',
    textMuted:  'rgba(255, 255, 255, 0.8)',
    muted:      '#707070',
    mutedBg:    'rgba(112, 112, 112, 0.12)',

    winner:  '#22c55e',
    card:    '#3d3d3d',
    border:  '#4a4a4a',

    filterActive:          '#3b82f6',
    filterActiveBg:        'rgba(59, 130, 246, 0.12)',
    filterBadgeActive:     '#3b82f6',
    filterBadgeInactive:   '#4a4a4a',
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
    '2xl': '3rem',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },

  layout: {
    maxWidth: '1440px',
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
    sticky:    '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
} as const

export type Theme = typeof theme
