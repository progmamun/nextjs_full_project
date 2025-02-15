export const theme = {
    colors: {
      primary: {
        main: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
        light: 'var(--color-primary-light)',
      },
      secondary: {
        main: 'var(--color-secondary)',
        dark: 'var(--color-secondary-dark)',
        light: 'var(--color-secondary-light)',
      },
      accent: {
        main: 'var(--color-accent)',
        dark: 'var(--color-accent-dark)',
        light: 'var(--color-accent-light)',
      },
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      text: {
        primary: 'var(--color-text)',
        secondary: 'var(--color-text-light)',
        tertiary: 'var(--color-text-lighter)',
      },
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
      '2xl': 'var(--spacing-2xl)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      full: 'var(--radius-full)',
    },
    shadows: {
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
    },
    transitions: {
      fast: 'var(--transition-fast)',
      normal: 'var(--transition-normal)',
      slow: 'var(--transition-slow)',
    },
    zIndex: {
      drawer: 'var(--z-drawer)',
      modal: 'var(--z-modal)',
      tooltip: 'var(--z-tooltip)',
    },
  } as const;
  
  // Type definitions for theme
  export type Theme = typeof theme;
  export type ThemeColor = keyof typeof theme.colors;
  export type ThemeSpacing = keyof typeof theme.spacing;
  export type ThemeRadius = keyof typeof theme.borderRadius;
  export type ThemeShadow = keyof typeof theme.shadows;
  export type ThemeTransition = keyof typeof theme.transitions;
  export type ThemeZIndex = keyof typeof theme.zIndex;