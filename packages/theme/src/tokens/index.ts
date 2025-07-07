// Export all token modules
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './breakpoints';
export * from './animation';
export * from './components';
export * from './borders';
export * from './transitions';

// Re-export for backward compatibility
export { colors, cncTokens, darkThemeColors } from './colors';
export { spacing } from './spacing';
export { fontSize, fontFamily, fontWeight, lineHeight, letterSpacing } from './typography';
export { shadows } from './shadows';
export { breakpoints } from './breakpoints';
export { borderRadius as animationBorderRadius, transitions as animationTransitions, zIndex } from './animation';
export { componentTokens } from './components';
export { borderRadius, borderWidth, borderStyle, border } from './borders';
export { transitionDuration, transitionEasing, transitionProperty, transition, animation, keyframes } from './transitions';

// Consolidated design tokens export
import { colors, cncTokens, darkThemeColors } from './colors';
import { spacing } from './spacing';
import { fontSize, fontFamily, fontWeight, lineHeight, letterSpacing } from './typography';
import { shadows } from './shadows';
import { breakpoints } from './breakpoints';
import { borderRadius as animationBorderRadius, transitions as animationTransitions, zIndex } from './animation';
import { componentTokens } from './components';
import { borderRadius, borderWidth, borderStyle, border } from './borders';
import { transitionDuration, transitionEasing, transitionProperty, transition, animation, keyframes } from './transitions';

export const designTokens = {
  // Core color system
  colors,
  darkThemeColors,
  cncTokens,
  
  // Layout and spacing
  spacing,
  breakpoints,
  
  // Typography
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  
  // Visual effects
  shadows,
  borderRadius,
  borderWidth,
  borderStyle,
  border,
  
  // Animation and transitions
  transitionDuration,
  transitionEasing,
  transitionProperty,
  transition,
  animation,
  keyframes,
  
  // Component-specific tokens
  componentTokens,
  
  // Legacy animation tokens (for backward compatibility)
  animationBorderRadius,
  animationTransitions,
  zIndex,
};