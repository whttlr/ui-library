// Transition tokens (from analysis - repeated transition values)

// Duration tokens (most common durations found in components)
export const transitionDuration = {
  fast: '150ms',       // Quick transitions
  default: '200ms',    // Default transition - used 30+ times
  slow: '300ms',       // Slower transitions
  slower: '500ms',     // Very slow transitions
};

// Easing tokens (from analysis - common easing functions)
export const transitionEasing = {
  // Most common easing - used 30+ times
  default: 'ease-in-out',
  
  // Cubic bezier easings
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Smooth easing - used 5+ times
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Standard easings
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

// Property tokens (common properties that transition)
export const transitionProperty = {
  all: 'all',                    // Most common - used 30+ times
  colors: 'color, background-color, border-color',
  opacity: 'opacity',
  transform: 'transform',
  shadow: 'box-shadow',
  size: 'width, height',
  spacing: 'margin, padding',
};

// Complete transition tokens (ready-to-use combinations)
export const transition = {
  // Most common pattern found in components
  default: 'all 200ms ease-in-out',           // Used 30+ times
  
  // Quick transitions
  fast: 'all 150ms ease-in-out',              // Used 10+ times
  
  // Slow transitions
  slow: 'all 300ms ease-in-out',              // Used 8+ times
  
  // Smooth transitions (cubic-bezier)
  smooth: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',  // Used 5+ times
  
  // Specific property transitions
  colors: 'color, background-color, border-color 200ms ease-in-out',
  opacity: 'opacity 200ms ease-in-out',
  transform: 'transform 200ms ease-in-out',
  shadow: 'box-shadow 200ms ease-in-out',
  
  // No transition
  none: 'none',
};

// Animation tokens (for more complex animations)
export const animation = {
  // Loading animations
  spin: 'spin 1s linear infinite',
  ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
  
  // Fade animations
  fadeIn: 'fadeIn 200ms ease-in-out',
  fadeOut: 'fadeOut 200ms ease-in-out',
  
  // Slide animations
  slideIn: 'slideIn 300ms ease-in-out',
  slideOut: 'slideOut 300ms ease-in-out',
  
  // Scale animations
  scaleIn: 'scaleIn 200ms ease-in-out',
  scaleOut: 'scaleOut 200ms ease-in-out',
};

// Keyframes (for custom animations)
export const keyframes = {
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  
  ping: {
    '75%, 100%': { 
      transform: 'scale(2)', 
      opacity: '0' 
    },
  },
  
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  
  bounce: {
    '0%, 100%': { 
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': { 
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  
  slideIn: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  
  slideOut: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
  
  scaleIn: {
    '0%': { transform: 'scale(0)' },
    '100%': { transform: 'scale(1)' },
  },
  
  scaleOut: {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0)' },
  },
};