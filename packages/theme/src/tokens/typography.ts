export const fontSize = {
  // Added missing sizes found in component analysis
  '3xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px - found in help icons
  '2xs': ['0.6875rem', { lineHeight: '1rem' }],     // 11px - found in small badges
  xs: ['0.75rem', { lineHeight: '1rem' }],          // 12px - badges, tooltips (used 15+ times)
  '13': ['0.8125rem', { lineHeight: '1.125rem' }],  // 13px - input small (found in components)
  sm: ['0.875rem', { lineHeight: '1.25rem' }],      // 14px - default text (used 25+ times)
  base: ['1rem', { lineHeight: '1.5rem' }],         // 16px - base size
  lg: ['1.125rem', { lineHeight: '1.75rem' }],      // 18px - CNC displays (used 10+ times)
  xl: ['1.25rem', { lineHeight: '1.75rem' }],       // 20px - large displays
  '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px - card values (used 8+ times)
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px - headings
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px - large headings
  '5xl': ['3rem', { lineHeight: '1' }],             // 48px - display headings
};

// Font family tokens (from analysis - specific families used)
export const fontFamily = {
  // System font stack (used in most components)
  sans: [
    'Inter', 
    '-apple-system', 
    'BlinkMacSystemFont', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'sans-serif'
  ],
  
  // Monospace for numeric displays (used 20+ times in CNC components)
  mono: [
    'JetBrains Mono',    // Primary monospace - used in all CNC displays
    'Menlo',
    'Monaco', 
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace'
  ],
  
  // Serif (rarely used but included for completeness)
  serif: [
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif'
  ],
};

// Font weight tokens (from analysis - specific weights used)
export const fontWeight = {
  normal: '400',      // Regular text
  medium: '500',      // Medium weight - used 30+ times across components
  semibold: '600',    // Semi-bold headings - used 20+ times
  bold: '700',        // Bold emphasis - used 15+ times
  extrabold: '800',   // Extra bold (rarely used)
};

// Line height tokens (for better typography control)
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',      // Default line height
  relaxed: '1.625',
  loose: '2',
};

// Letter spacing tokens (for typography fine-tuning)
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};