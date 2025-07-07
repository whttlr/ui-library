// Border radius tokens (from analysis - repeated border radius values)
export const borderRadius = {
  none: '0px',
  sm: '2px',           // Small elements
  md: '4px',           // Default radius - used 10+ times
  default: '6px',      // Default component radius - used 30+ times
  lg: '8px',           // Cards, modals - used 20+ times
  xl: '12px',          // Large cards - used 8+ times
  '2xl': '16px',       // Extra large elements
  '3xl': '24px',       // Very large elements
  full: '9999px',      // Fully rounded (badges, pills) - used 15+ times
};

// Border width tokens (from analysis - repeated border widths)
export const borderWidth = {
  none: '0px',
  thin: '1px',         // Default border width - used 40+ times
  medium: '2px',       // Medium borders
  thick: '3px',        // Thick borders (focus rings)
  thicker: '4px',      // Extra thick borders
};

// Border style tokens
export const borderStyle = {
  none: 'none',
  solid: 'solid',      // Default border style - used in most components
  dashed: 'dashed',    // Dashed borders
  dotted: 'dotted',    // Dotted borders
};

// Combined border tokens for common patterns
export const border = {
  // Most common border pattern found in components
  default: '1px solid hsl(240, 3.7%, 15.9%)',  // Used 40+ times
  
  // Focus states (from analysis)
  focus: '2px solid hsl(262, 83%, 58%)',        // Focus ring
  
  // Subtle borders
  subtle: '1px solid hsl(240, 3.7%, 12%)',     // Subtle border
  
  // Status borders (using semantic colors)
  success: '1px solid rgba(22, 163, 74, 0.3)',
  warning: '1px solid rgba(217, 119, 6, 0.3)',
  error: '1px solid rgba(220, 38, 38, 0.3)',
  info: '1px solid rgba(59, 130, 246, 0.3)',
  
  // No border
  none: 'none',
};