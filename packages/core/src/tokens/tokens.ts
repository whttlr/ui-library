/**
 * Design Tokens
 *
 * Centralized design system tokens for consistent styling across all components.
 * Based on analysis of 300+ hardcoded values across the UI Showcase.
 *
 * Usage:
 * import { tokens } from '@whttlr/ui-core';
 *
 * <div style={{ fontSize: tokens.typography.fontSize.base }}>
 */

export const tokens = {
  /**
   * Typography Tokens
   */
  typography: {
    /**
     * Font Sizes
     * Base (0.875rem / 14px) is the most commonly used size (40+ instances)
     */
    fontSize: {
      xs: '0.625rem',    // 10px - Icon labels, smallest text
      sm: '0.75rem',     // 12px - Captions, helper text (15+ instances)
      base: '0.875rem',  // 14px - Primary body text (40+ instances) ⭐ MOST USED
      md: '1rem',        // 16px - Larger body text
      lg: '1.25rem',     // 20px - Section headings
      xl: '1.5rem',      // 24px - Large headings, metrics
      '2xl': '2rem',     // 32px - Hero text
    },

    /**
     * Font Weights
     * Semibold (600) is used for most headings and emphasized text (19+ instances)
     */
    fontWeight: {
      normal: 400,
      medium: 500,      // Labels, emphasized text (5+ instances)
      semibold: 600,    // Headings, important text (19+ instances) ⭐ MOST USED
      bold: 700,        // Strong emphasis
    },

    /**
     * Font Families
     */
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, "SF Mono", "Consolas", "Liberation Mono", monospace',
    },

    /**
     * Line Heights
     */
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 2,
    },
  },

  /**
   * Color Tokens
   */
  colors: {
    /**
     * Text Colors
     * Secondary text color (muted) is used 47 times across the app! ⭐
     */
    text: {
      primary: 'hsl(0, 0%, 98%)',        // Main text
      secondary: 'hsl(240, 5%, 64.9%)',  // Muted text (47 instances!) ⭐ MOST USED
      tertiary: 'hsl(240, 5%, 50%)',     // Even more muted
      inverse: 'hsl(240, 5.9%, 10%)',    // Dark text on light backgrounds

      // State colors
      success: 'hsl(142, 76%, 36%)',     // Success states
      warning: 'hsl(48, 96%, 53%)',      // Warning states
      error: 'hsl(0, 72%, 51%)',         // Error states
      info: 'hsl(217, 91%, 60%)',        // Info states
    },

    /**
     * Background Colors
     */
    bg: {
      primary: 'hsl(240, 10%, 3.9%)',     // Main background
      secondary: 'hsl(240, 3.7%, 15.9%)', // Cards, elevated surfaces (20+ instances)
      tertiary: 'hsl(240, 10%, 10%)',     // Nested containers
      hover: 'hsl(240, 3.7%, 15.9%)',     // Hover states

      // State backgrounds
      success: 'hsl(142, 76%, 36%)',
      warning: 'hsl(48, 96%, 53%)',
      error: 'hsl(0, 72%, 51%)',
      info: 'hsl(217, 91%, 60%)',
    },

    /**
     * Border Colors
     * Default border is used 20+ times
     */
    border: {
      default: 'hsl(240, 3.7%, 15.9%)',  // Standard borders (20+ instances) ⭐
      hover: 'hsl(240, 3.8%, 46.1%)',    // Hover state borders
      focus: 'hsl(240, 4.9%, 83.9%)',    // Focus ring

      // State borders
      success: 'hsl(142, 76%, 36%)',
      warning: 'hsl(48, 96%, 53%)',
      error: 'hsl(0, 72%, 51%)',
      info: 'hsl(217, 91%, 60%)',
    },

    /**
     * CNC-Specific Colors
     */
    cnc: {
      primary: 'hsl(142, 76%, 36%)',      // CNC primary brand color
      secondary: 'hsl(217, 91%, 60%)',    // CNC secondary color
      emergency: 'hsl(0, 72%, 51%)',      // Emergency stop color
    },
  },

  /**
   * Spacing Tokens
   * Base (1rem) is the most commonly used for padding and gaps (24+ instances)
   * Small (0.5rem) is the most common for margins (27+ instances)
   */
  spacing: {
    none: '0',
    xs: '0.25rem',    // 4px - Tight spacing
    sm: '0.5rem',     // 8px - Compact elements (27+ margin instances) ⭐
    md: '0.75rem',    // 12px - Standard spacing (15+ instances)
    base: '1rem',     // 16px - Primary padding/gaps (24+ instances) ⭐ MOST USED
    lg: '1.5rem',     // 24px - Generous spacing (15+ instances)
    xl: '2rem',       // 32px - Large spacing
    '2xl': '3rem',    // 48px - Extra large spacing
    '3xl': '4rem',    // 64px - Maximum spacing
  },

  /**
   * Border Radius Tokens
   * Base (6px) is used 21+ times across the app ⭐
   */
  radius: {
    none: '0',
    sm: '4px',        // Small elements (4 instances)
    base: '6px',      // Standard radius (21 instances) ⭐ MOST USED
    md: '0.5rem',     // 8px - Medium rounding (5 instances)
    lg: '1rem',       // 16px - Large rounding (10 instances)
    xl: '1.5rem',     // 24px - Extra large
    '2xl': '2rem',    // 32px - Very large
    full: '9999px',   // Pills, circles
  },

  /**
   * Shadow Tokens
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  /**
   * Transition Tokens
   * Base (0.2s) is the standard duration used throughout
   */
  transitions: {
    duration: {
      fast: '0.1s',
      base: '0.2s',    // ⭐ Standard duration
      slow: '0.3s',
      slower: '0.5s',
    },
    timing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
    // Shorthand for common transitions
    all: 'all 0.2s ease',
    colors: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    transform: 'transform 0.2s ease',
  },

  /**
   * Icon Tokens
   */
  icons: {
    size: {
      xs: 16,
      sm: 20,
      base: 24,    // Standard size
      lg: 32,      // Icons showcase
      xl: 48,      // Empty states
      '2xl': 64,
    },
    strokeWidth: {
      thin: 1,
      base: 1.5,   // Standard
      thick: 2,
      bold: 2.5,
    },
  },

  /**
   * Z-Index Tokens
   */
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },

  /**
   * Breakpoint Tokens (for responsive design)
   */
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

/**
 * Type-safe token access
 */
export type Tokens = typeof tokens;

/**
 * Helper type for token paths
 */
export type TokenPath =
  | `typography.fontSize.${keyof typeof tokens.typography.fontSize}`
  | `typography.fontWeight.${keyof typeof tokens.typography.fontWeight}`
  | `colors.text.${keyof typeof tokens.colors.text}`
  | `colors.bg.${keyof typeof tokens.colors.bg}`
  | `colors.border.${keyof typeof tokens.colors.border}`
  | `spacing.${keyof typeof tokens.spacing}`
  | `radius.${keyof typeof tokens.radius}`;

/**
 * Helper function to get nested token values with type safety
 */
export function getToken(path: string): string | number {
  const parts = path.split('.');
  let value: any = tokens;

  for (const part of parts) {
    value = value[part];
    if (value === undefined) {
      console.warn(`Token path "${path}" not found`);
      return '';
    }
  }

  return value;
}

export default tokens;
