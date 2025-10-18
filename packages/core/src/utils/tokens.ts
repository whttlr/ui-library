// Design token utilities for easy access across components
import { 
  darkThemeColors, 
  componentTokens, 
  fontSize, 
  fontWeight,
  fontFamily,
  lineHeight,
  borderRadius,
  transition,
  shadows,
  spacing,
  animation
} from '@whttlr/ui-theme';

/**
 * Token access utilities for components
 * Provides easy access to design tokens with TypeScript safety
 */

// Color token utilities
export const tokens = {
  colors: {
    // Background colors
    bg: {
      primary: darkThemeColors.background.primary,
      secondary: darkThemeColors.background.secondary, 
      tertiary: darkThemeColors.background.tertiary,
      quaternary: darkThemeColors.background.quaternary,
    },
    
    // Text colors
    text: {
      primary: darkThemeColors.text.primary,
      secondary: darkThemeColors.text.secondary,
      disabled: darkThemeColors.text.disabled,
    },
    
    // Border colors
    border: {
      primary: darkThemeColors.border.primary,
      focus: darkThemeColors.border.focus,
      hover: darkThemeColors.border.hover,
    },
    
    // Interactive states
    interactive: {
      hover: darkThemeColors.interactive.hover,
      active: darkThemeColors.interactive.active,
      disabled: darkThemeColors.interactive.disabled,
      overlay: darkThemeColors.interactive.overlay,
    },
    
    // Primary color system
    primary: {
      main: darkThemeColors.primary.main,
      hover: darkThemeColors.primary.hover,
      active: darkThemeColors.primary.active,
      disabled: darkThemeColors.primary.disabled,
      foreground: darkThemeColors.primary.foreground,
    },
    
    // Status colors
    status: {
      success: darkThemeColors.status.success.main,
      warning: darkThemeColors.status.warning.main,
      error: darkThemeColors.status.error.main,
      info: darkThemeColors.status.info.main,
    },
    
    // Status backgrounds
    statusBg: {
      success: darkThemeColors.status.success.background,
      warning: darkThemeColors.status.warning.background,
      error: darkThemeColors.status.error.background,
      info: darkThemeColors.status.info.background,
    },
  },
  
  // Component tokens
  button: componentTokens.button,
  input: componentTokens.input,
  card: componentTokens.card,
  badge: componentTokens.badge,
  modal: componentTokens.modal,
  tooltip: componentTokens.tooltip,
  cnc: componentTokens.cnc,
  
  // Typography tokens
  text: {
    size: fontSize,
    weight: fontWeight,
    family: fontFamily,
    lineHeight: lineHeight,
  },
  
  // Layout tokens
  spacing: spacing,
  
  // Visual tokens
  radius: borderRadius,
  transition: transition,
  shadows: shadows,
  animation: animation,
};

/**
 * Get button variant styles using design tokens
 */
export const getButtonVariantStyles = (variant: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      color: tokens.colors.primary.foreground,
      backgroundColor: tokens.colors.primary.main,
      backgroundImage: 'radial-gradient(circle farthest-side at 30% 0, rgba(255, 255, 255, .12), transparent)',
      boxShadow: `
        inset 1px 1px 2px rgba(255, 255, 255, .24),
        0 1px 3px ${tokens.colors.primary.main}24,
        0 2px 6px ${tokens.colors.primary.main}24,
        0 4px 8px rgba(96, 10, 255, 0.12),
        0 16px 32px -8px ${tokens.colors.primary.main}48
      `,
    },
    
    secondary: {
      backgroundColor: `${tokens.colors.bg.primary}04`,
      color: tokens.colors.text.primary,
      backgroundImage: 'radial-gradient(circle farthest-side at 35% -50%, rgba(255, 255, 255, .08), rgba(255, 255, 255, 0))',
      boxShadow: `
        0 8px 40px -20px ${tokens.colors.interactive.hover},
        inset 1px 1px ${tokens.colors.interactive.hover}08,
        inset 0 0 0 1px ${tokens.colors.interactive.hover}06
      `,
    },
    
    destructive: {
      backgroundColor: tokens.colors.status.error,
      color: tokens.colors.text.primary,
    },
    
    outline: {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.border.primary}`,
      color: tokens.colors.text.primary,
    },
    
    tertiary: {
      backgroundColor: tokens.colors.bg.quaternary,
      color: tokens.colors.text.primary,
    },
    
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.colors.text.primary,
    },
    
    link: {
      backgroundColor: 'transparent',
      color: tokens.colors.primary.main,
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
    
    white: {
      backgroundColor: tokens.colors.text.primary,
      color: tokens.colors.bg.primary,
    },
    
    cnc: {
      backgroundColor: tokens.colors.status.info,
      color: tokens.colors.text.primary,
    },
    
    emergency: {
      backgroundColor: tokens.colors.status.error,
      color: tokens.colors.text.primary,
      border: `2px solid ${tokens.colors.status.error}`,
      boxShadow: `0 0 20px ${tokens.colors.status.error}30`,
    },
    
    success: {
      backgroundColor: tokens.colors.status.success,
      color: tokens.colors.text.primary,
    },
    
    warning: {
      backgroundColor: tokens.colors.status.warning,
      color: tokens.colors.text.primary,
    },
  };
  
  return styles[variant] || styles.default;
};

/**
 * Get button size styles using component tokens
 */
export const getButtonSizeStyles = (size: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: { 
      height: tokens.button.height.sm, 
      padding: tokens.button.padding.sm,
      fontSize: '0.875rem', // 14px
    },
    default: { 
      height: tokens.button.height.md, 
      padding: tokens.button.padding.md,
      fontSize: '0.875rem', // 14px
    },
    lg: { 
      height: tokens.button.height.lg, 
      padding: tokens.button.padding.lg,
      fontSize: '1rem', // 16px
    },
    xl: { 
      height: tokens.button.height.xl, 
      padding: tokens.button.padding.xl,
      fontSize: '1.125rem', // 18px
    },
    icon: { 
      height: tokens.button.iconButton.sm, 
      width: tokens.button.iconButton.sm, 
      padding: '0',
    },
    iconlg: { 
      height: tokens.button.iconButton.lg, 
      width: tokens.button.iconButton.lg, 
      padding: '0',
    },
    jog: { 
      height: tokens.button.iconButton.md, 
      width: tokens.button.iconButton.md, 
      padding: '8px',
    },
  };
  
  return styles[size] || styles.default;
};

/**
 * Get base button styles using design tokens
 */
export const getButtonBaseStyles = (): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: tokens.radius.default,
  fontWeight: tokens.text.weight.medium,
  fontFamily: tokens.text.family.sans.join(', '),
  cursor: 'pointer',
  transition: tokens.transition.smooth,
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  transform: 'translateZ(0)',
  userSelect: 'none',
});

/**
 * Helper function to create consistent hover/focus states
 */
export const getInteractiveStates = (baseColor: string, variant: string = 'default') => {
  const isTransparent = variant === 'ghost' || variant === 'link' || variant === 'outline';
  
  return {
    '&:hover:not(:disabled)': {
      backgroundColor: isTransparent 
        ? tokens.colors.interactive.hover 
        : `${baseColor}CC`, // 80% opacity
      transform: 'translateY(-1px)',
    },
    '&:active:not(:disabled)': {
      backgroundColor: isTransparent 
        ? tokens.colors.interactive.active 
        : `${baseColor}B3`, // 70% opacity
      transform: 'translateY(0)',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.border.focus}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
    },
  };
};

/**
 * Get card variant styles using design tokens
 */
export const getCardVariantStyles = (variant: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.tertiary,
      color: tokens.colors.text.primary,
      boxShadow: tokens.shadows.sm,
    },
    outline: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: 'transparent',
      color: tokens.colors.text.primary,
    },
    cnc: {
      border: `2px solid ${tokens.colors.primary.main}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      boxShadow: `0 0 20px ${tokens.colors.primary.main}10`,
    },
    metric: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      minHeight: '120px',
    },
    settings: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.tertiary,
      color: tokens.colors.text.primary,
    },
    activity: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
    },
    dashboard: {
      border: `1px solid ${tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.tertiary,
      color: tokens.colors.text.primary,
      boxShadow: tokens.shadows.md,
    },
  };
  
  return styles[variant] || styles.default;
};

/**
 * Get card size styles using component tokens
 */
export const getCardSizeStyles = (size: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem',
      borderRadius: tokens.radius.default,
    },
    default: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem',
      borderRadius: tokens.radius.lg,
    },
    lg: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.75rem',
      borderRadius: tokens.radius.xl,
    },
  };
  
  return styles[size] || styles.default;
};

/**
 * Get base card styles using design tokens
 */
export const getCardBaseStyles = (): React.CSSProperties => ({
  overflow: 'hidden',
  position: 'relative',
  transition: tokens.transition.default,
  fontFamily: tokens.text.family.sans.join(', '),
});

/**
 * Get input variant styles using design tokens
 */
export const getInputVariantStyles = (variant: string, error?: boolean): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      border: `1px solid ${error ? tokens.colors.status.error : tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.sans.join(', '),
    },
    search: {
      border: `1px solid ${error ? tokens.colors.status.error : tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.sans.join(', '),
    },
    password: {
      border: `1px solid ${error ? tokens.colors.status.error : tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.sans.join(', '),
    },
    number: {
      border: `1px solid ${error ? tokens.colors.status.error : tokens.colors.border.primary}`,
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.mono.join(', '),
    },
    cnc: {
      border: `1px solid ${error ? tokens.colors.status.error : tokens.colors.primary.main}`,
      backgroundColor: tokens.colors.bg.primary,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.mono.join(', '),
      textAlign: 'center',
    },
  };
  
  return styles[variant] || styles.default;
};

/**
 * Get input size styles using component tokens
 */
export const getInputSizeStyles = (size: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      height: tokens.input.height.sm,
      padding: tokens.input.padding.sm,
      fontSize: '0.8125rem', // 13px
    },
    default: {
      height: tokens.input.height.md,
      padding: tokens.input.padding.md,
      fontSize: '0.875rem', // 14px
    },
    lg: {
      height: tokens.input.height.lg,
      padding: tokens.input.padding.lg,
      fontSize: '1rem', // 16px
    },
  };
  
  return styles[size] || styles.default;
};

/**
 * Get base input styles using design tokens
 */
export const getInputBaseStyles = (): React.CSSProperties => ({
  width: '100%',
  borderRadius: tokens.radius.default,
  outline: 'none',
  transition: tokens.transition.default,
  WebkitAppearance: 'none',
  MozAppearance: 'textfield',
  appearance: 'none',
});

/**
 * Get input focus styles using design tokens
 */
export const getInputFocusStyles = (variant: string, error?: boolean): React.CSSProperties => {
  const focusColor = error 
    ? tokens.colors.status.error 
    : variant === 'cnc' 
      ? tokens.colors.primary.main 
      : tokens.colors.border.focus;
      
  return {
    borderColor: focusColor,
    boxShadow: error 
      ? `0 0 0 3px ${tokens.colors.status.error}20` 
      : variant === 'cnc'
        ? `0 0 0 3px ${tokens.colors.primary.main}32, 0 0 20px ${tokens.colors.primary.main}16`
        : `0 0 0 3px ${tokens.colors.border.focus}20`,
  };
};

/**
 * Get input disabled styles using design tokens
 */
export const getInputDisabledStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.interactive.disabled,
  color: tokens.colors.text.disabled,
  cursor: 'not-allowed',
  opacity: 0.6,
});

/**
 * Get badge variant styles using design tokens
 */
export const getBadgeVariantStyles = (variant: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.primary.foreground,
      border: '1px solid transparent',
    },
    secondary: {
      backgroundColor: `${tokens.colors.text.secondary}32`, // 20% opacity
      color: tokens.colors.text.secondary,
      border: '1px solid transparent',
    },
    success: {
      backgroundColor: tokens.colors.statusBg.success,
      color: tokens.colors.status.success,
      border: '1px solid transparent',
    },
    warning: {
      backgroundColor: tokens.colors.statusBg.warning,
      color: tokens.colors.status.warning,
      border: '1px solid transparent',
    },
    error: {
      backgroundColor: tokens.colors.statusBg.error,
      color: tokens.colors.status.error,
      border: '1px solid transparent',
    },
    danger: {
      backgroundColor: tokens.colors.statusBg.error,
      color: tokens.colors.status.error,
      border: '1px solid transparent',
    },
    info: {
      backgroundColor: tokens.colors.statusBg.info,
      color: tokens.colors.status.info,
      border: '1px solid transparent',
    },
    destructive: {
      backgroundColor: tokens.colors.statusBg.error,
      color: tokens.colors.status.error,
      border: '1px solid transparent',
    },
    // Outline variants
    'outline-default': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.primary.main}`,
      color: tokens.colors.primary.main,
    },
    'outline-secondary': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.text.secondary}`,
      color: tokens.colors.text.secondary,
    },
    'outline-success': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.status.success}`,
      color: tokens.colors.status.success,
    },
    'outline-warning': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.status.warning}`,
      color: tokens.colors.status.warning,
    },
    'outline-danger': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.status.error}`,
      color: tokens.colors.status.error,
    },
    'outline-info': {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.status.info}`,
      color: tokens.colors.status.info,
    },
    // Bright variants - bright outline with low opacity background
    'bright-default': {
      backgroundColor: `${tokens.colors.primary.main}20`, // 12% opacity
      border: `1px solid ${tokens.colors.primary.main}`,
      color: tokens.colors.primary.main,
    },
    'bright-secondary': {
      backgroundColor: `${tokens.colors.text.secondary}20`,
      border: `1px solid ${tokens.colors.text.secondary}`,
      color: tokens.colors.text.secondary,
    },
    'bright-success': {
      backgroundColor: `${tokens.colors.status.success}20`,
      border: `1px solid ${tokens.colors.status.success}`,
      color: tokens.colors.status.success,
    },
    'bright-warning': {
      backgroundColor: `${tokens.colors.status.warning}20`,
      border: `1px solid ${tokens.colors.status.warning}`,
      color: tokens.colors.status.warning,
    },
    'bright-danger': {
      backgroundColor: `${tokens.colors.status.error}20`,
      border: `1px solid ${tokens.colors.status.error}`,
      color: tokens.colors.status.error,
    },
    'bright-info': {
      backgroundColor: `${tokens.colors.status.info}20`,
      border: `1px solid ${tokens.colors.status.info}`,
      color: tokens.colors.status.info,
    },
  };
  
  return styles[variant] || styles.default;
};

/**
 * Get badge size styles using component tokens
 */
export const getBadgeSizeStyles = (size: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      padding: tokens.badge.padding.sm,
      fontSize: '0.6875rem', // 11px
    },
    default: {
      padding: tokens.badge.padding.md,
      fontSize: '0.75rem', // 12px
    },
    lg: {
      padding: tokens.badge.padding.lg,
      fontSize: '0.8125rem', // 13px
    },
  };
  
  return styles[size] || styles.default;
};

/**
 * Get base badge styles using design tokens
 */
export const getBadgeBaseStyles = (): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: tokens.radius.full,
  fontWeight: tokens.text.weight.semibold,
  cursor: 'default',
  transition: tokens.transition.default,
  fontFamily: tokens.text.family.sans.join(', '),
});

/**
 * Get badge indicator color based on variant
 */
export const getBadgeIndicatorColor = (variant?: string | null): string => {
  if (!variant) return tokens.colors.primary.main;
  
  if (variant.includes('success') || variant.includes('green')) return tokens.colors.status.success;
  if (variant.includes('warning') || variant.includes('amber')) return tokens.colors.status.warning;
  if (variant.includes('danger') || variant.includes('red') || variant.includes('error')) return tokens.colors.status.error;
  if (variant.includes('info') || variant.includes('blue')) return tokens.colors.status.info;
  if (variant.includes('secondary') || variant.includes('gray')) return tokens.colors.text.secondary;
  
  return tokens.colors.primary.main; // default
};

/**
 * Get grid gap styles using spacing tokens
 */
export const getGridGapStyles = (gap: string): React.CSSProperties => {
  const gapMap: Record<string, string> = {
    'none': '0',
    'sm': tokens.spacing.xs,
    'md': tokens.spacing.sm,
    'lg': tokens.spacing.md,
    'xl': tokens.spacing.lg,
  };
  
  return {
    gap: gapMap[gap] || gapMap.md,
  };
};

/**
 * Get flex gap styles using spacing tokens
 */
export const getFlexGapStyles = (gap: string): React.CSSProperties => {
  const gapMap: Record<string, string> = {
    'none': '0',
    'sm': tokens.spacing.xs,
    'md': tokens.spacing.sm,
    'lg': tokens.spacing.md,
    'xl': tokens.spacing.lg,
  };
  
  return {
    gap: gapMap[gap] || '0',
  };
};

/**
 * Get container size styles using spacing tokens
 */
export const getContainerSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, string> = {
    'sm': '24rem',
    'md': '28rem',
    'lg': '56rem',
    'xl': '72rem',
    'full': '100%',
  };
  
  return {
    maxWidth: sizeMap[size] || sizeMap.lg,
  };
};

/**
 * Get container padding styles using spacing tokens
 */
export const getContainerPaddingStyles = (padding: string): React.CSSProperties => {
  const paddingMap: Record<string, string> = {
    'none': '0',
    'sm': tokens.spacing.xs,
    'md': tokens.spacing.sm,
    'lg': tokens.spacing.md,
    'xl': tokens.spacing.lg,
  };
  
  return {
    padding: paddingMap[padding] || paddingMap.md,
  };
};

/**
 * Get stack spacing styles using spacing tokens
 */
export const getStackSpacingStyles = (spacing: string): React.CSSProperties => {
  const spacingMap: Record<string, string> = {
    'none': '0',
    'sm': tokens.spacing.xs,
    'md': tokens.spacing.sm,
    'lg': tokens.spacing.md,
    'xl': tokens.spacing.lg,
  };
  
  return {
    gap: spacingMap[spacing] || spacingMap.md,
  };
};

/**
 * Get typography color styles using design tokens
 */
export const getTypographyColorStyles = (color: string): React.CSSProperties => {
  const colorMap: Record<string, string> = {
    'default': tokens.colors.text.primary,
    'primary': tokens.colors.primary.main,
    'secondary': tokens.colors.text.secondary,
    'success': tokens.colors.status.success,
    'warning': tokens.colors.status.warning,
    'error': tokens.colors.status.error,
    'info': tokens.colors.status.info,
    'cnc': tokens.colors.primary.main,
    'muted': tokens.colors.text.disabled,
    'accent': tokens.colors.status.success,
  };
  
  return {
    color: colorMap[color] || colorMap.default,
  };
};

/**
 * Get typography variant styles using design tokens
 */
export const getTypographyVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, React.CSSProperties> = {
    h1: {
      fontSize: '2.25rem',
      fontWeight: tokens.text.weight.bold,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.4,
    },
    body: {
      fontSize: '0.875rem',
      fontWeight: tokens.text.weight.normal,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: tokens.text.weight.normal,
      lineHeight: 1.4,
      color: tokens.colors.text.secondary,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: tokens.text.weight.medium,
      lineHeight: 1,
      letterSpacing: '0.025em',
    },
    link: {
      fontSize: '0.875rem',
      fontWeight: tokens.text.weight.medium,
      color: tokens.colors.primary.main,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    monospace: {
      fontSize: '0.875rem',
      fontWeight: tokens.text.weight.normal,
      fontFamily: tokens.text.family.mono.join(', '),
      lineHeight: 1.4,
    },
  };
  
  return variantMap[variant] || variantMap.body;
};

/**
 * Get typography gradient styles using design tokens
 */
export const getTypographyGradientStyles = (gradient: string | boolean): React.CSSProperties => {
  const gradientMap: Record<string, string> = {
    'primary': `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.hover} 100%)`,
    'blue': `linear-gradient(135deg, ${tokens.colors.status.info} 0%, ${tokens.colors.status.info}CC 100%)`,
    'green': `linear-gradient(135deg, ${tokens.colors.status.success} 0%, ${tokens.colors.status.success}CC 100%)`,
    'orange': `linear-gradient(135deg, ${tokens.colors.status.warning} 0%, ${tokens.colors.status.warning}CC 100%)`,
    'pink': `linear-gradient(135deg, hsl(330, 81%, 60%) 0%, hsl(330, 81%, 75%) 100%)`,
    'cyan': `linear-gradient(135deg, hsl(189, 94%, 43%) 0%, hsl(189, 94%, 60%) 100%)`,
  };
  
  const gradientKey = typeof gradient === 'string' ? gradient : 'primary';
  
  return {
    background: gradientMap[gradientKey] || gradientMap.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
  };
};

/**
 * Get progress variant styles using design tokens
 */
export const getProgressVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, string> = {
    'default': tokens.colors.primary.main,
    'primary': tokens.colors.primary.main,
    'secondary': tokens.colors.text.secondary,
    'success': tokens.colors.status.success,
    'warning': tokens.colors.status.warning,
    'error': tokens.colors.status.error,
    'info': tokens.colors.status.info,
    'cnc': tokens.colors.primary.main,
  };
  
  return {
    backgroundColor: variantMap[variant] || variantMap.default,
  };
};

/**
 * Get progress size styles using design tokens
 */
export const getProgressSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, string> = {
    'sm': tokens.spacing.xs,
    'default': tokens.spacing.sm,
    'lg': tokens.spacing.md,
  };
  
  return {
    height: sizeMap[size] || sizeMap.default,
  };
};

/**
 * Get progress track styles using design tokens
 */
export const getProgressTrackStyles = (): React.CSSProperties => ({
  width: '100%',
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.full,
  overflow: 'hidden',
});

/**
 * Get progress fill styles using design tokens
 */
export const getProgressFillStyles = (variant: string, percentage: number): React.CSSProperties => ({
  height: '100%',
  borderRadius: tokens.radius.full,
  transition: tokens.transition.smooth,
  width: `${percentage}%`,
  ...getProgressVariantStyles(variant),
});

/**
 * Get skeleton variant styles using design tokens
 */
export const getSkeletonVariantStyles = (variant: string): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
  };

  const variantMap: Record<string, React.CSSProperties> = {
    'text': {
      ...baseStyles,
      borderRadius: tokens.radius.sm,
    },
    'circular': {
      ...baseStyles,
      borderRadius: tokens.radius.full,
    },
    'rectangular': {
      ...baseStyles,
      borderRadius: '0',
    },
    'rounded': {
      ...baseStyles,
      borderRadius: tokens.radius.md,
    },
  };
  
  return variantMap[variant] || variantMap.text;
};

/**
 * Get skeleton size styles using design tokens
 */
export const getSkeletonSizeStyles = (variant: string, size: string): Record<string, string> => {
  const sizeConfig = {
    text: {
      sm: { height: '0.875rem', width: '100%' },
      default: { height: '1rem', width: '100%' },
      lg: { height: '1.25rem', width: '100%' },
    },
    circular: {
      sm: { height: tokens.spacing.lg, width: tokens.spacing.lg },
      default: { height: tokens.spacing.xl, width: tokens.spacing.xl },
      lg: { height: tokens.spacing['2xl'], width: tokens.spacing['2xl'] },
    },
    rectangular: {
      sm: { height: '4rem', width: '100%' },
      default: { height: '6rem', width: '100%' },
      lg: { height: '8rem', width: '100%' },
    },
    rounded: {
      sm: { height: '4rem', width: '100%' },
      default: { height: '6rem', width: '100%' },
      lg: { height: '8rem', width: '100%' },
    },
  };
  
  return sizeConfig[variant]?.[size] || sizeConfig.text.default;
};

/**
 * Get alert variant styles using design tokens
 */
export const getAlertVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, React.CSSProperties> = {
    'default': {
      backgroundColor: tokens.colors.bg.primary,
      color: tokens.colors.text.primary,
      borderColor: tokens.colors.border.primary,
    },
    'destructive': {
      borderColor: tokens.colors.status.error,
      backgroundColor: `${tokens.colors.status.error}1A`, // 10% opacity
      color: tokens.colors.status.error,
    },
    'success': {
      borderColor: tokens.colors.status.success,
      backgroundColor: `${tokens.colors.status.success}1A`, // 10% opacity
      color: tokens.colors.status.success,
    },
    'warning': {
      borderColor: tokens.colors.status.warning,
      backgroundColor: `${tokens.colors.status.warning}1A`, // 10% opacity
      color: tokens.colors.status.warning,
    },
    'info': {
      borderColor: tokens.colors.status.info,
      backgroundColor: `${tokens.colors.status.info}1A`, // 10% opacity
      color: tokens.colors.status.info,
    },
    'cnc': {
      borderColor: tokens.colors.primary.main,
      backgroundColor: `${tokens.colors.primary.main}1A`, // 10% opacity
      color: tokens.colors.primary.main,
      boxShadow: `0 0 20px ${tokens.colors.primary.main}1A`,
    },
  };
  
  return variantMap[variant] || variantMap.default;
};

/**
 * Get alert size styles using design tokens
 */
export const getAlertSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    'default': {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    'lg': {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get alert layout styles using design tokens
 */
export const getAlertLayoutStyles = (layout: string, size: string): React.CSSProperties => {
  const paddingMap = {
    sm: { simple: tokens.spacing.xs, detailed: tokens.spacing.sm, banner: tokens.spacing.xs },
    default: { simple: tokens.spacing.sm, detailed: tokens.spacing.md, banner: tokens.spacing.sm },
    lg: { simple: tokens.spacing.md, detailed: tokens.spacing.lg, banner: tokens.spacing.md },
  };
  
  const layoutMap: Record<string, React.CSSProperties> = {
    'simple': {
      padding: paddingMap[size]?.simple || paddingMap.default.simple,
    },
    'detailed': {
      padding: paddingMap[size]?.detailed || paddingMap.default.detailed,
    },
    'banner': {
      padding: paddingMap[size]?.banner || paddingMap.default.banner,
      borderRadius: '0',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      borderTop: `3px solid`,
    },
  };
  
  return layoutMap[layout] || layoutMap.simple;
};

/**
 * Get alert base styles using design tokens
 */
export const getAlertBaseStyles = (layout: string): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  borderRadius: layout === 'banner' ? tokens.radius.sm : tokens.radius.md,
  border: '1px solid',
  transition: tokens.transition.default,
  fontFamily: tokens.text.family.sans.join(', '),
});

/**
 * Get tooltip variant styles using design tokens
 */
export const getTooltipVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, React.CSSProperties> = {
    'default': {
      backgroundColor: tokens.colors.bg.secondary,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.border.primary}`,
    },
    'info': {
      backgroundColor: tokens.colors.status.info,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.status.info}`,
    },
    'success': {
      backgroundColor: tokens.colors.status.success,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.status.success}`,
    },
    'warning': {
      backgroundColor: tokens.colors.status.warning,
      color: tokens.colors.bg.primary,
      border: `1px solid ${tokens.colors.status.warning}`,
    },
    'error': {
      backgroundColor: tokens.colors.status.error,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.status.error}`,
    },
    'cnc': {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.primary.main}`,
    },
  };
  
  return variantMap[variant] || variantMap.default;
};

/**
 * Get tooltip size styles using design tokens
 */
export const getTooltipSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      fontSize: '0.75rem',
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      borderRadius: tokens.radius.sm,
    },
    'default': {
      fontSize: '0.875rem',
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      borderRadius: tokens.radius.default,
    },
    'lg': {
      fontSize: '0.875rem',
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      borderRadius: tokens.radius.md,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get tooltip base styles using design tokens
 */
export const getTooltipBaseStyles = (): React.CSSProperties => ({
  position: 'absolute',
  zIndex: 50,
  pointerEvents: 'none',
  transition: tokens.transition.default,
  lineHeight: 1.4,
  fontWeight: tokens.text.weight.medium,
  boxShadow: tokens.shadows.md,
  whiteSpace: 'nowrap',
  wordWrap: 'break-word',
  textAlign: 'center',
  fontFamily: tokens.text.family.sans.join(', '),
});

/**
 * Get tooltip position styles using spacing tokens
 */
export const getTooltipPositionStyles = (position: string, showArrow: boolean): React.CSSProperties => {
  const arrowSpacing = showArrow ? tokens.spacing.sm : tokens.spacing.xs;
  
  const baseStyles: React.CSSProperties = {
    transform: 'translateX(-50%)',
  };

  const positionMap: Record<string, React.CSSProperties> = {
    'top': {
      ...baseStyles,
      bottom: '100%',
      left: '50%',
      marginBottom: arrowSpacing,
    },
    'bottom': {
      ...baseStyles,
      top: '100%',
      left: '50%',
      marginTop: arrowSpacing,
    },
    'left': {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: arrowSpacing,
    },
    'right': {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: arrowSpacing,
    },
  };
  
  return positionMap[position] || positionMap.top;
};

/**
 * Get modal size styles using design tokens
 */
export const getModalSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': { width: '90%', maxWidth: '400px' },
    'md': { width: '90%', maxWidth: '500px' },
    'lg': { width: '90%', maxWidth: '700px' },
    'xl': { width: '90%', maxWidth: '900px' },
    'full': { width: '95%', height: '95%', maxWidth: 'none', maxHeight: 'none' },
  };
  
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get modal base styles using design tokens
 */
export const getModalBaseStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  boxShadow: tokens.shadows.xl,
  color: tokens.colors.text.primary,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: tokens.text.family.sans.join(', '),
});

/**
 * Get modal overlay styles using design tokens
 */
export const getModalOverlayStyles = (): React.CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: tokens.colors.interactive.overlay,
  padding: tokens.spacing.md,
});

/**
 * Get modal header styles using design tokens
 */
export const getModalHeaderStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  flexShrink: 0,
});

/**
 * Get modal content styles using design tokens
 */
export const getModalContentStyles = (): React.CSSProperties => ({
  flex: 1,
  overflow: 'auto',
  padding: tokens.spacing.lg,
});

/**
 * Get slider variant styles using design tokens
 */
export const getSliderVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, string> = {
    'default': tokens.colors.primary.main,
    'success': tokens.colors.status.success,
    'warning': tokens.colors.status.warning,
    'info': tokens.colors.status.info,
  };
  return { backgroundColor: variantMap[variant] || variantMap.default };
};

/**
 * Get slider track styles using design tokens
 */
export const getSliderTrackStyles = (): React.CSSProperties => ({
  width: '100%',
  height: tokens.spacing.xs,
  borderRadius: tokens.radius.sm,
  backgroundColor: tokens.colors.bg.secondary,
  position: 'relative',
  transition: tokens.transition.default,
});

/**
 * Get slider thumb styles using design tokens
 */
export const getSliderThumbStyles = (variant: string): React.CSSProperties => {
  const variantColor = getSliderVariantStyles(variant).backgroundColor as string;
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: tokens.spacing.lg,
    height: tokens.spacing.lg,
    borderRadius: '50%',
    backgroundColor: variantColor,
    border: `3px solid ${tokens.colors.bg.primary}`,
    boxShadow: `0 0 0 1px ${tokens.colors.border.primary}, 0 2px 4px rgba(0,0,0,0.3)`,
    transition: tokens.transition.default,
    cursor: 'grab',
  };
};

/**
 * Get slider fill styles using design tokens
 */
export const getSliderFillStyles = (variant: string): React.CSSProperties => {
  const variantColor = getSliderVariantStyles(variant).backgroundColor as string;
  return {
    height: '100%',
    borderRadius: tokens.radius.sm,
    background: `linear-gradient(90deg, ${variantColor} 0%, ${variantColor} 100%)`,
    transition: 'width 0.3s ease',
    boxShadow: `0 0 8px ${variantColor}40`,
  };
};

// =============================================================================
// CNC-SPECIFIC UTILITY FUNCTIONS
// =============================================================================

/**
 * CNC axis color system - Standard across all CNC components
 */
export const getCNCAxisColor = (axis: 'x' | 'y' | 'z'): string => {
  const axisColorMap: Record<string, string> = {
    'x': '#ef4444', // Red-500 for X axis
    'y': '#22c55e', // Green-500 for Y axis
    'z': '#3b82f6', // Blue-500 for Z axis
  };
  return axisColorMap[axis.toLowerCase()] || axisColorMap.x;
};

/**
 * CNC axis color system - Sleek variant with lighter colors
 */
export const getCNCAxisColorSleek = (axis: 'x' | 'y' | 'z'): string => {
  const axisColorMap: Record<string, string> = {
    'x': '#4ade80', // Green-400 for X axis (sleek variant)
    'y': '#60a5fa', // Blue-400 for Y axis (sleek variant)  
    'z': '#fbbf24', // Yellow-400 for Z axis (sleek variant)
  };
  return axisColorMap[axis.toLowerCase()] || axisColorMap.x;
};

/**
 * CNC status colors for safety-critical components
 */
export const getCNCStatusColor = (status: 'danger' | 'warning' | 'success' | 'info'): string => {
  const statusColorMap: Record<string, string> = {
    'danger': '#dc2626',   // Red-600 for emergency/stop
    'warning': '#f59e0b',  // Amber-500 for warnings
    'success': '#16a34a',  // Green-600 for safe/go
    'info': '#2563eb',     // Blue-600 for information
  };
  return statusColorMap[status] || statusColorMap.info;
};

/**
 * CNC precision badge styles based on precision level
 */
export const getCNCPrecisionBadgeStyles = (precision: 'high' | 'medium' | 'low'): React.CSSProperties => {
  const precisionStyleMap: Record<string, React.CSSProperties> = {
    'high': {
      backgroundColor: '#dcfce7', // Green-100
      color: '#166534',           // Green-800
    },
    'medium': {
      backgroundColor: '#fef3c7', // Yellow-100
      color: '#92400e',           // Yellow-800
    },
    'low': {
      backgroundColor: '#dbeafe', // Blue-100
      color: '#1e40af',           // Blue-800
    },
  };
  return precisionStyleMap[precision] || precisionStyleMap.medium;
};

/**
 * Get coordinate display variant styles using design tokens
 */
export const getCoordinateDisplayVariantStyles = (variant: string): React.CSSProperties => {
  const variantMap: Record<string, React.CSSProperties> = {
    'full': {
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.bg.primary,
      border: `1px solid ${tokens.colors.border.primary}`,
    },
    'compact': {
      padding: tokens.spacing.sm,
      borderRadius: tokens.radius.sm,
      backgroundColor: tokens.colors.bg.secondary,
    },
    'sleek': {
      padding: tokens.spacing.sm,
      borderRadius: tokens.radius.md,
      backgroundColor: `${tokens.colors.bg.primary}CC`, // 80% opacity
      backdropFilter: 'blur(8px)',
      border: `1px solid ${tokens.colors.border.primary}40`,
    },
    'live': {
      padding: tokens.spacing.sm,
      borderRadius: tokens.radius.sm,
      backgroundColor: tokens.colors.bg.primary,
      border: `2px solid ${tokens.colors.primary.main}`,
      boxShadow: `0 0 20px ${tokens.colors.primary.main}20`,
    },
  };
  
  return variantMap[variant] || variantMap.full;
};

/**
 * Get coordinate input size styles using design tokens
 */
export const getCoordinateInputSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      height: '32px',
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
      padding: `0 ${tokens.spacing.xs}`,
    },
    'default': {
      height: '40px',
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
      padding: `0 ${tokens.spacing.sm}`,
    },
    'lg': {
      height: '48px',
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
      padding: `0 ${tokens.spacing.md}`,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get CNC input base styles using design tokens
 */
export const getCNCInputBaseStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  color: tokens.colors.text.primary,
  fontFamily: tokens.text.family.mono.join(', '),
  fontWeight: tokens.text.weight.medium,
  textAlign: 'center',
  transition: tokens.transition.default,
  outline: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'textfield',
  appearance: 'none',
});

/**
 * Get CNC locked input styles using design tokens
 */
export const getCNCLockedInputStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.interactive.disabled,
  cursor: 'not-allowed',
  opacity: 0.6,
  pointerEvents: 'none',
});

/**
 * Get jog controls button variant styles using design tokens
 */
export const getJogControlsVariantStyles = (variant: string, axis?: 'x' | 'y' | 'z'): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    border: `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.md,
    color: tokens.colors.text.primary,
    transition: tokens.transition.default,
  };

  const variantMap: Record<string, React.CSSProperties> = {
    'direction': {
      ...baseStyles,
      minWidth: '60px',
      minHeight: '60px',
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
      fontWeight: tokens.text.weight.semibold,
    },
    'axis': {
      ...baseStyles,
      backgroundColor: axis ? getCNCAxisColor(axis) : tokens.colors.primary.main,
      color: tokens.colors.text.primary,
      fontWeight: tokens.text.weight.bold,
    },
    'home': {
      ...baseStyles,
      backgroundColor: tokens.colors.status.success,
      color: tokens.colors.text.primary,
      fontWeight: tokens.text.weight.semibold,
    },
    'step': {
      ...baseStyles,
      minWidth: '50px',
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    },
  };
  
  return variantMap[variant] || baseStyles;
};

/**
 * Get emergency stop size styles using design tokens
 */
export const getEmergencyStopSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      width: '3rem',
      height: '3rem',
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    },
    'default': {
      width: '4rem', 
      height: '4rem',
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
    },
    'lg': {
      width: '5rem',
      height: '5rem', 
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
    },
    'xl': {
      width: '6rem',
      height: '6rem',
      fontSize: Array.isArray(tokens.text.size.xl) ? tokens.text.size.xl[0] : tokens.text.size.xl,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get emergency stop state styles using design tokens
 */
export const getEmergencyStopStateStyles = (state: 'normal' | 'pressed' | 'stopped'): React.CSSProperties => {
  const stateMap: Record<string, React.CSSProperties> = {
    'normal': {
      backgroundColor: getCNCStatusColor('danger'),
      transform: 'scale(1)',
      boxShadow: `0 0 20px ${getCNCStatusColor('danger')}40`,
    },
    'pressed': {
      backgroundColor: '#b91c1c', // Darker red
      transform: 'scale(0.95)',
      boxShadow: `0 0 30px ${getCNCStatusColor('danger')}60`,
    },
    'stopped': {
      backgroundColor: '#991b1b', // Even darker red
      transform: 'scale(0.93)',
      boxShadow: `inset 0 4px 8px rgba(0,0,0,0.3), 0 0 20px ${getCNCStatusColor('danger')}80`,
    },
  };
  
  return stateMap[state] || stateMap.normal;
};

/**
 * Get emergency stop base styles using design tokens
 */
export const getEmergencyStopBaseStyles = (): React.CSSProperties => ({
  borderRadius: '50%',
  border: 'none',
  color: tokens.colors.text.primary,
  fontWeight: tokens.text.weight.bold,
  textTransform: 'uppercase',
  lineHeight: 1.2,
  transition: tokens.transition.default,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  outline: 'none',
  userSelect: 'none',
  position: 'relative',
});

/**
 * Get status indicator status color using design tokens
 */
export const getStatusIndicatorStatusColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    'online': tokens.colors.status.success,
    'offline': tokens.colors.text.secondary,
    'connecting': tokens.colors.status.info,
    'error': tokens.colors.status.error,
    'warning': tokens.colors.status.warning,
    'success': tokens.colors.status.success,
    'idle': tokens.colors.text.secondary,
    'running': tokens.colors.status.success,
    'paused': tokens.colors.status.warning,
    'stopped': tokens.colors.status.error,
  };
  
  return statusColorMap[status] || tokens.colors.text.secondary;
};

/**
 * Get status indicator background color using design tokens
 */
export const getStatusIndicatorBackgroundColor = (status: string): string => {
  const color = getStatusIndicatorStatusColor(status);
  // Add 10% opacity (1A in hex)
  return `${color}1A`;
};

/**
 * Get status indicator border color using design tokens
 */
export const getStatusIndicatorBorderColor = (status: string): string => {
  const color = getStatusIndicatorStatusColor(status);
  // Add 30% opacity (4D in hex)
  return `${color}4D`;
};

/**
 * Get status indicator size styles using design tokens
 */
export const getStatusIndicatorSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      dot: tokens.spacing.xs, // 6px equivalent
      fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      gap: tokens.spacing.xs,
    },
    'default': {
      dot: tokens.spacing.sm, // 8px equivalent
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      gap: tokens.spacing.sm,
    },
    'lg': {
      dot: tokens.spacing.md, // 10px equivalent  
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
      padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
      gap: tokens.spacing.sm,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get status indicator variant styles using design tokens
 */
export const getStatusIndicatorVariantStyles = (variant: string, status: string): React.CSSProperties => {
  const color = getStatusIndicatorStatusColor(status);
  const backgroundColor = getStatusIndicatorBackgroundColor(status);
  const borderColor = getStatusIndicatorBorderColor(status);
  
  const variantMap: Record<string, React.CSSProperties> = {
    'dot': {
      display: 'inline-flex',
      alignItems: 'center',
      color: tokens.colors.text.primary,
    },
    'badge': {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: tokens.radius.md,
      fontWeight: tokens.text.weight.medium,
    },
    'pill': {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: tokens.radius.full,
      fontWeight: tokens.text.weight.medium,
    },
    'cnc': {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: tokens.radius.lg,
      fontWeight: tokens.text.weight.semibold,
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
      boxShadow: color === tokens.colors.status.success ? `0 0 12px ${color}20` : 'none',
    },
  };
  
  return variantMap[variant] || variantMap.dot;
};

/**
 * Get status indicator dot styles using design tokens
 */
export const getStatusIndicatorDotStyles = (status: string, size: string): React.CSSProperties => {
  const sizeConfig = getStatusIndicatorSizeStyles(size);
  const color = getStatusIndicatorStatusColor(status);
  
  return {
    width: sizeConfig.dot,
    height: sizeConfig.dot,
    borderRadius: '50%',
    backgroundColor: color,
    flexShrink: 0,
  };
};

/**
 * Get status indicator group styles using design tokens
 */
export const getStatusIndicatorGroupStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.lg,
});

/**
 * Get status indicator card styles using design tokens
 */
export const getStatusIndicatorCardStyles = (): React.CSSProperties => ({
  padding: tokens.spacing.lg,
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.lg,
  border: `1px solid ${tokens.colors.border.primary}`,
});

/**
 * Get status indicator card title styles using design tokens
 */
export const getStatusIndicatorCardTitleStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.md,
});

/**
 * Get monospace text size styles using design tokens
 */
export const getMonospaceTextSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'xs': {
      fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
      lineHeight: Array.isArray(tokens.text.size.xs) && typeof tokens.text.size.xs[1] === 'object' 
        ? tokens.text.size.xs[1].lineHeight 
        : '1rem',
    },
    'sm': {
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
      lineHeight: Array.isArray(tokens.text.size.sm) && typeof tokens.text.size.sm[1] === 'object' 
        ? tokens.text.size.sm[1].lineHeight 
        : '1.25rem',
    },
    'default': {
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
      lineHeight: Array.isArray(tokens.text.size.base) && typeof tokens.text.size.base[1] === 'object' 
        ? tokens.text.size.base[1].lineHeight 
        : '1.5rem',
    },
    'lg': {
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
      lineHeight: Array.isArray(tokens.text.size.lg) && typeof tokens.text.size.lg[1] === 'object' 
        ? tokens.text.size.lg[1].lineHeight 
        : '1.75rem',
    },
    'xl': {
      fontSize: Array.isArray(tokens.text.size.xl) ? tokens.text.size.xl[0] : tokens.text.size.xl,
      lineHeight: Array.isArray(tokens.text.size.xl) && typeof tokens.text.size.xl[1] === 'object' 
        ? tokens.text.size.xl[1].lineHeight 
        : '1.75rem',
    },
    '2xl': {
      fontSize: Array.isArray(tokens.text.size['2xl']) ? tokens.text.size['2xl'][0] : tokens.text.size['2xl'],
      lineHeight: Array.isArray(tokens.text.size['2xl']) && typeof tokens.text.size['2xl'][1] === 'object' 
        ? tokens.text.size['2xl'][1].lineHeight 
        : '2rem',
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get monospace text variant styles using design tokens
 */
export const getMonospaceTextVariantStyles = (variant: string, highlight: boolean = false): React.CSSProperties => {
  const variantMap: Record<string, React.CSSProperties> = {
    'coordinate': {
      fontWeight: tokens.text.weight.semibold,
      letterSpacing: '0.025em',
      color: highlight ? tokens.colors.primary.main : tokens.colors.text.primary,
      backgroundColor: highlight ? `${tokens.colors.primary.main}1A` : 'transparent',
      padding: highlight ? `${tokens.spacing.xs} ${tokens.spacing.sm}` : '0',
      borderRadius: tokens.radius.sm,
      border: highlight ? `1px solid ${tokens.colors.primary.main}4D` : 'none',
    },
    'code': {
      fontWeight: tokens.text.weight.normal,
      letterSpacing: '0.025em',
      color: tokens.colors.status.success,
      backgroundColor: tokens.colors.bg.secondary,
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      borderRadius: tokens.radius.sm,
      border: `1px solid ${tokens.colors.border.primary}`,
    },
    'numeric': {
      fontWeight: tokens.text.weight.medium,
      letterSpacing: '0.05em',
      color: tokens.colors.text.primary,
      textAlign: 'right',
    },
    'gcode': {
      fontWeight: tokens.text.weight.normal,
      letterSpacing: '0.025em',
      color: tokens.colors.status.warning,
      backgroundColor: tokens.colors.bg.secondary,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      borderRadius: tokens.radius.md,
      border: `1px solid ${tokens.colors.border.primary}`,
    },
    'default': {
      fontWeight: tokens.text.weight.normal,
      letterSpacing: '0.025em',
      color: tokens.colors.text.primary,
    },
  };
  
  return variantMap[variant] || variantMap.default;
};

/**
 * Get monospace text base styles using design tokens
 */
export const getMonospaceTextBaseStyles = (): React.CSSProperties => ({
  fontFamily: tokens.text.family.mono.join(', '),
  display: 'inline-block',
});

/**
 * Get monospace text unit styles using design tokens
 */
export const getMonospaceTextUnitStyles = (): React.CSSProperties => ({
  marginLeft: tokens.spacing.xs,
  fontSize: '0.875em',
  opacity: 0.7,
  fontWeight: tokens.text.weight.normal,
});

/**
 * Get tabs size styles using design tokens
 */
export const getTabsSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      gap: tokens.spacing.xs,
      badgeSize: tokens.spacing.md,
    },
    'default': {
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      gap: tokens.spacing.sm,
      badgeSize: tokens.spacing.lg,
    },
    'lg': {
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
      padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
      gap: tokens.spacing.md,
      badgeSize: tokens.spacing.xl,
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get tabs list styles using design tokens
 */
export const getTabsListStyles = (variant: string, orientation: string): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    alignItems: 'stretch',
    position: 'relative',
  };

  const variantMap: Record<string, React.CSSProperties> = {
    'pills': {
      ...baseStyles,
      gap: tokens.spacing.xs,
      padding: tokens.spacing.xs,
      backgroundColor: tokens.colors.bg.secondary,
      borderRadius: tokens.radius.lg,
    },
    'underline': {
      ...baseStyles,
      borderBottom: `1px solid ${tokens.colors.border.primary}`,
    },
    'cnc': {
      ...baseStyles,
      gap: tokens.spacing.xs,
      padding: tokens.spacing.xs,
      backgroundColor: tokens.colors.bg.primary,
      borderRadius: tokens.radius.lg,
      border: `1px solid ${tokens.colors.primary.main}4D`,
      boxShadow: `0 0 20px ${tokens.colors.primary.main}1A`,
    },
    'segmented': {
      ...baseStyles,
      backgroundColor: tokens.colors.bg.secondary,
      borderRadius: tokens.radius.md,
      padding: tokens.spacing.xs,
    },
    'default': {
      ...baseStyles,
      gap: tokens.spacing.xs,
    },
  };
  
  return variantMap[variant] || variantMap.default;
};

/**
 * Get tabs button styles using design tokens
 */
export const getTabsButtonStyles = (variant: string, isActive: boolean, isDisabled: boolean): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: isActive ? tokens.text.weight.semibold : tokens.text.weight.medium,
    border: 'none',
    background: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: tokens.transition.default,
    position: 'relative',
    minWidth: 0,
    opacity: isDisabled ? 0.5 : 1,
    outline: 'none',
  };

  const variantMap: Record<string, React.CSSProperties> = {
    'pills': {
      ...baseStyles,
      color: isActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
      backgroundColor: isActive ? tokens.colors.text.primary : 'transparent',
      borderRadius: tokens.radius.md,
      ...(isActive && { color: tokens.colors.bg.primary }),
    },
    'underline': {
      ...baseStyles,
      color: isActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
      borderBottom: isActive ? `2px solid ${tokens.colors.text.primary}` : '2px solid transparent',
      borderRadius: '0',
      marginBottom: '-1px',
    },
    'cnc': {
      ...baseStyles,
      color: isActive ? tokens.colors.primary.main : tokens.colors.text.secondary,
      backgroundColor: isActive ? `${tokens.colors.primary.main}1A` : 'transparent',
      borderRadius: tokens.radius.md,
      border: isActive ? `1px solid ${tokens.colors.primary.main}80` : '1px solid transparent',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      boxShadow: isActive ? `0 0 12px ${tokens.colors.primary.main}33` : 'none',
    },
    'segmented': {
      ...baseStyles,
      color: isActive ? tokens.colors.bg.primary : tokens.colors.text.secondary,
      backgroundColor: isActive ? tokens.colors.text.primary : 'transparent',
      borderRadius: tokens.radius.sm,
      ...(isActive && { 
        boxShadow: tokens.shadows.sm,
      }),
    },
    'default': {
      ...baseStyles,
      color: isActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
      backgroundColor: isActive ? tokens.colors.border.primary : 'transparent',
      borderRadius: tokens.radius.md,
      border: '1px solid',
      borderColor: isActive ? tokens.colors.border.hover : tokens.colors.border.primary,
    },
  };
  
  return variantMap[variant] || variantMap.default;
};

/**
 * Get tabs badge styles using design tokens
 */
export const getTabsBadgeStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  fontWeight: tokens.text.weight.semibold,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.full,
  backgroundColor: tokens.colors.status.error,
  color: tokens.colors.text.primary,
  marginLeft: tokens.spacing.xs,
  padding: `0 ${tokens.spacing.xs}`,
});

/**
 * Get tabs content styles using design tokens
 */
export const getTabsContentStyles = (orientation: string): React.CSSProperties => ({
  flex: 1,
  padding: orientation === 'vertical' ? `0 0 0 ${tokens.spacing.lg}` : `${tokens.spacing.lg} 0 0 0`,
  minWidth: 0,
});

/**
 * Get toggle size styles using design tokens
 */
export const getToggleSizeStyles = (size: string): Record<string, React.CSSProperties> => {
  const sizeMap: Record<string, Record<string, React.CSSProperties>> = {
    'sm': {
      container: { gap: tokens.spacing.sm },
      track: { width: '2.25rem', height: '1.25rem', padding: tokens.spacing.xs },
      thumb: { width: '1rem', height: '1rem' },
      label: { fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm },
      description: { fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs },
    },
    'default': {
      container: { gap: tokens.spacing.md },
      track: { width: '2.75rem', height: '1.5rem', padding: tokens.spacing.xs },
      thumb: { width: '1.25rem', height: '1.25rem' },
      label: { fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm },
      description: { fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs },
    },
    'lg': {
      container: { gap: tokens.spacing.lg },
      track: { width: '3.25rem', height: '1.75rem', padding: tokens.spacing.xs },
      thumb: { width: '1.5rem', height: '1.5rem' },
      label: { fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base },
      description: { fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm },
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get toggle color styles using design tokens
 */
export const getToggleColorStyles = (color: string): Record<string, React.CSSProperties> => {
  const colorMap: Record<string, Record<string, React.CSSProperties>> = {
    'default': {
      trackActive: { backgroundColor: tokens.colors.primary.main },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'primary': {
      trackActive: { backgroundColor: tokens.colors.primary.main },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'secondary': {
      trackActive: { backgroundColor: tokens.colors.text.secondary },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'success': {
      trackActive: { backgroundColor: tokens.colors.status.success },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'warning': {
      trackActive: { backgroundColor: tokens.colors.status.warning },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'error': {
      trackActive: { backgroundColor: tokens.colors.status.error },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'info': {
      trackActive: { backgroundColor: tokens.colors.status.info },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
    'cnc': {
      trackActive: { backgroundColor: tokens.colors.primary.main },
      trackInactive: { backgroundColor: tokens.colors.bg.secondary },
      thumb: { backgroundColor: tokens.colors.text.primary },
    },
  };
  
  return colorMap[color] || colorMap.default;
};

/**
 * Get toggle button styles using design tokens
 */
export const getToggleButtonStyles = (size: string, checked: boolean, disabled: boolean, loading: boolean): React.CSSProperties => {
  const sizeStyles = getToggleSizeStyles(size);
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
    padding: size === 'sm' ? `${tokens.spacing.sm} ${tokens.spacing.md}` : 
             size === 'lg' ? `${tokens.spacing.md} ${tokens.spacing.xl}` : 
             `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.md,
    border: '1px solid',
    borderColor: checked ? tokens.colors.primary.main : tokens.colors.border.primary,
    backgroundColor: checked ? tokens.colors.primary.main : 'transparent',
    color: checked ? tokens.colors.text.primary : tokens.colors.text.secondary,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: tokens.transition.default,
    fontSize: sizeStyles.label.fontSize,
    fontWeight: tokens.text.weight.medium,
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
  };
};

/**
 * Get toggle track styles using design tokens
 */
export const getToggleTrackStyles = (color: string, checked: boolean, size: string, disabled: boolean, loading: boolean): React.CSSProperties => {
  const colorStyles = getToggleColorStyles(color);
  const sizeStyles = getToggleSizeStyles(size);
  
  return {
    position: 'relative',
    borderRadius: tokens.radius.full,
    transition: tokens.transition.default,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    outline: 'none',
    border: `1px solid ${tokens.colors.border.primary}`,
    flexShrink: 0,
    ...(checked ? colorStyles.trackActive : colorStyles.trackInactive),
    ...sizeStyles.track,
  };
};

/**
 * Get toggle thumb styles using design tokens
 */
export const getToggleThumbStyles = (color: string, checked: boolean, size: string): React.CSSProperties => {
  const colorStyles = getToggleColorStyles(color);
  const sizeStyles = getToggleSizeStyles(size);
  
  return {
    position: 'absolute',
    top: '50%',
    transform: `translate(${checked ? 'calc(100% + 0.125rem)' : '0.125rem'}, -50%)`,
    borderRadius: '50%',
    transition: tokens.transition.default,
    boxShadow: tokens.shadows.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...colorStyles.thumb,
    ...sizeStyles.thumb,
  };
};

/**
 * Get toggle label styles using design tokens
 */
export const getToggleLabelStyles = (size: string): React.CSSProperties => {
  const sizeStyles = getToggleSizeStyles(size);
  
  return {
    color: tokens.colors.text.primary,
    fontWeight: tokens.text.weight.medium,
    lineHeight: 1.5,
    ...sizeStyles.label,
  };
};

/**
 * Get toggle description styles using design tokens
 */
export const getToggleDescriptionStyles = (size: string): React.CSSProperties => {
  const sizeStyles = getToggleSizeStyles(size);
  
  return {
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.xs,
    lineHeight: 1.4,
    ...sizeStyles.description,
  };
};

/**
 * Get accordion item styles using design tokens
 */
export const getAccordionItemStyles = (variant: string, isOpen: boolean, disabled: boolean): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    border: `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.md,
    marginBottom: tokens.spacing.sm,
    overflow: 'hidden',
    transition: tokens.transition.default,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    'default': {
      backgroundColor: tokens.colors.bg.primary,
    },
    'ghost': {
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${tokens.colors.border.primary}`,
      borderRadius: '0',
      marginBottom: '0',
    },
    'bordered': {
      backgroundColor: tokens.colors.bg.primary,
      border: `2px solid ${tokens.colors.border.primary}`,
    },
    'cnc': {
      backgroundColor: tokens.colors.bg.secondary,
      border: `2px solid ${tokens.colors.primary.main}`,
      boxShadow: isOpen ? `0 0 20px ${tokens.colors.primary.main}33` : 'none',
    },
  };

  return {
    ...baseStyle,
    ...variantStyles[variant],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
};

/**
 * Get accordion header styles using design tokens
 */
export const getAccordionHeaderStyles = (isOpen: boolean, disabled: boolean): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacing.lg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isOpen ? tokens.colors.bg.secondary : 'transparent',
    transition: tokens.transition.default,
  };
};

/**
 * Get accordion title styles using design tokens
 */
export const getAccordionTitleStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  margin: 0,
});

/**
 * Get accordion icon styles using design tokens
 */
export const getAccordionIconStyles = (): React.CSSProperties => ({
  width: tokens.spacing.lg,
  height: tokens.spacing.lg,
  color: tokens.colors.text.secondary,
  transition: tokens.transition.default,
});

/**
 * Get accordion content styles using design tokens
 */
export const getAccordionContentStyles = (): React.CSSProperties => ({
  padding: tokens.spacing.lg,
  borderTop: `1px solid ${tokens.colors.border.primary}`,
  backgroundColor: tokens.colors.bg.primary,
  color: tokens.colors.text.secondary,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  lineHeight: 1.5,
});

/**
 * Get collapse header styles using design tokens
 */
export const getCollapseHeaderStyles = (variant: string, size: string, isOpen: boolean, disabled: boolean): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: tokens.transition.default,
    outline: 'none',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    'sm': { 
      padding: tokens.spacing.sm, 
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm 
    },
    'default': { 
      padding: tokens.spacing.md, 
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm 
    },
    'lg': { 
      padding: tokens.spacing.lg, 
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base 
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    'default': {
      backgroundColor: 'transparent',
      color: tokens.colors.text.primary,
    },
    'ghost': {
      backgroundColor: 'transparent',
      color: tokens.colors.text.secondary,
    },
    'bordered': {
      backgroundColor: tokens.colors.bg.primary,
      border: `1px solid ${tokens.colors.border.primary}`,
      borderRadius: tokens.radius.md,
      color: tokens.colors.text.primary,
    },
    'cnc': {
      backgroundColor: tokens.colors.bg.secondary,
      border: `2px solid ${tokens.colors.primary.main}`,
      borderRadius: tokens.radius.md,
      color: tokens.colors.text.primary,
      boxShadow: isOpen ? `0 0 10px ${tokens.colors.primary.main}4D` : 'none',
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    opacity: disabled ? 0.5 : 1,
  };
};

/**
 * Get collapse content styles using design tokens
 */
export const getCollapseContentStyles = (variant: string, size: string, animationDuration: number): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    overflow: 'hidden',
    transition: `height ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`,
    height: '0px',
    opacity: '0',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    'sm': { padding: `${tokens.spacing.sm} ${tokens.spacing.sm} ${tokens.spacing.sm} 0` },
    'default': { padding: `${tokens.spacing.md} ${tokens.spacing.md} ${tokens.spacing.md} 0` },
    'lg': { padding: `${tokens.spacing.lg} ${tokens.spacing.lg} ${tokens.spacing.lg} 0` },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    'default': {
      color: tokens.colors.text.secondary,
      backgroundColor: 'transparent',
    },
    'ghost': {
      color: tokens.colors.text.secondary,
      backgroundColor: 'transparent',
    },
    'bordered': {
      color: tokens.colors.text.secondary,
      backgroundColor: tokens.colors.bg.primary,
      borderTop: `1px solid ${tokens.colors.border.primary}`,
      margin: '0 1px',
    },
    'cnc': {
      color: tokens.colors.text.secondary,
      backgroundColor: tokens.colors.bg.primary,
      borderTop: `1px solid ${tokens.colors.primary.main}`,
      margin: '0 2px',
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

/**
 * Get collapse icon styles using design tokens
 */
export const getCollapseIconStyles = (size: string, isOpen: boolean): React.CSSProperties => ({
  width: size === 'sm' ? tokens.spacing.lg : tokens.spacing.xl,
  height: size === 'sm' ? tokens.spacing.lg : tokens.spacing.xl,
  color: tokens.colors.text.secondary,
  transition: tokens.transition.default,
  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
  flexShrink: 0,
});

/**
 * Get collapse title styles using design tokens
 */
export const getCollapseTitleStyles = (): React.CSSProperties => ({
  fontWeight: tokens.text.weight.semibold,
  margin: 0,
  flex: 1,
});

/**
 * Get form field label styles using design tokens
 */
export const getFormFieldLabelStyles = (error: boolean, layout: string, labelWidth: string): React.CSSProperties => ({
  display: 'block',
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  fontWeight: tokens.text.weight.medium,
  color: error ? tokens.colors.status.error : tokens.colors.text.primary,
  marginBottom: layout === 'vertical' ? tokens.spacing.sm : '0',
  width: layout === 'horizontal' ? labelWidth : 'auto',
  flexShrink: 0,
  lineHeight: layout === 'horizontal' ? '2.5rem' : '1.25rem',
});

/**
 * Get form field help text styles using design tokens
 */
export const getFormFieldHelpTextStyles = (error: boolean): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  color: error ? tokens.colors.status.error : tokens.colors.text.secondary,
  marginTop: tokens.spacing.xs,
  margin: `${tokens.spacing.xs} 0 0 0`,
  lineHeight: '1.4',
});

/**
 * Get form field required indicator styles using design tokens
 */
export const getFormFieldRequiredStyles = (): React.CSSProperties => ({
  color: tokens.colors.status.error,
  marginLeft: tokens.spacing.xs,
});

/**
 * Get select size styles using design tokens
 */
export const getSelectSizeStyles = (size: string): Record<string, any> => {
  const sizeMap: Record<string, Record<string, any>> = {
    'sm': {
      height: '32px',
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
      iconSize: '14px',
    },
    'default': {
      height: '40px',
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
      iconSize: '16px',
    },
    'lg': {
      height: '48px',
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
      iconSize: '18px',
    },
  };
  
  return sizeMap[size] || sizeMap.default;
};

/**
 * Get select trigger styles using design tokens
 */
export const getSelectTriggerStyles = (variant: string, error: boolean, disabled: boolean): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: error ? `1px solid ${tokens.colors.status.error}` : `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.md,
    backgroundColor: disabled ? tokens.colors.interactive.disabled : tokens.colors.bg.primary,
    color: tokens.colors.text.primary,
    outline: 'none',
    transition: tokens.transition.fast,
    position: 'relative',
  };

  switch (variant) {
    case 'cnc':
      return {
        ...baseStyles,
        border: error ? `1px solid ${tokens.colors.status.error}` : `1px solid ${tokens.colors.primary.main}`,
        backgroundColor: disabled ? tokens.colors.interactive.disabled : tokens.colors.bg.secondary,
        borderRadius: tokens.radius.lg,
      };
    case 'minimal':
      return {
        ...baseStyles,
        border: 'none',
        borderBottom: error ? `2px solid ${tokens.colors.status.error}` : `1px solid ${tokens.colors.border.primary}`,
        borderRadius: '0',
        backgroundColor: 'transparent',
        paddingLeft: '0',
      };
    default:
      return baseStyles;
  }
};

/**
 * Get select focus styles using design tokens
 */
export const getSelectFocusStyles = (variant: string, error: boolean, isOpen: boolean): React.CSSProperties => {
  if (!isOpen) return {};
  
  return {
    borderColor: error 
      ? tokens.colors.status.error
      : variant === 'cnc' 
        ? tokens.colors.primary.main
        : tokens.colors.text.primary,
    boxShadow: error 
      ? `0 0 0 3px ${tokens.colors.status.error}1A`
      : variant === 'cnc'
        ? `0 0 0 3px ${tokens.colors.primary.main}33, 0 0 20px ${tokens.colors.primary.main}1A`
        : `0 0 0 3px ${tokens.colors.text.primary}1A`,
  };
};

/**
 * Get select dropdown styles using design tokens
 */
export const getSelectDropdownStyles = (maxHeight: string): React.CSSProperties => {
  return {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: tokens.colors.bg.primary,
    border: `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.md,
    marginTop: tokens.spacing.xs,
    maxHeight,
    overflowY: 'auto',
    boxShadow: tokens.shadows.lg,
  };
};

/**
 * Get select option styles using design tokens
 */
export const getSelectOptionStyles = (
  isSelected: boolean, 
  isFocused: boolean, 
  disabled: boolean, 
  variant: string
): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isFocused 
      ? tokens.colors.interactive.hover
      : isSelected 
        ? tokens.colors.interactive.active
        : 'transparent',
    color: disabled 
      ? tokens.colors.text.disabled
      : isSelected 
        ? variant === 'cnc' ? tokens.colors.primary.main : tokens.colors.text.primary
        : tokens.colors.text.secondary,
    opacity: disabled ? 0.5 : 1,
    borderLeft: isSelected && variant === 'cnc' ? `3px solid ${tokens.colors.primary.main}` : 'none',
  };
};

/**
 * Get select search input styles using design tokens
 */
export const getSelectSearchStyles = (): React.CSSProperties => {
  return {
    width: '100%',
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    border: `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.colors.bg.secondary,
    color: tokens.colors.text.primary,
    outline: 'none',
  };
};

/**
 * Get select placeholder styles using design tokens
 */
export const getSelectPlaceholderStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.disabled,
});

/**
 * Get select clear button styles using design tokens
 */
export const getSelectClearButtonStyles = (): React.CSSProperties => ({
  background: 'none',
  border: 'none',
  color: tokens.colors.text.disabled,
  cursor: 'pointer',
  padding: '2px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: tokens.radius.xs,
});

/**
 * Get select error text styles using design tokens
 */
export const getSelectErrorTextStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  color: tokens.colors.status.error,
  marginTop: tokens.spacing.xs,
  margin: `${tokens.spacing.xs} 0 0 0`,
});

/**
 * Get select no options styles using design tokens
 */
export const getSelectNoOptionsStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.disabled,
  textAlign: 'center',
  fontStyle: 'italic',
});

/**
 * Get select search container styles using design tokens
 */
export const getSelectSearchContainerStyles = (): React.CSSProperties => ({
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  position: 'sticky',
  top: 0,
  backgroundColor: tokens.colors.bg.primary,
  zIndex: 1,
});

/**
 * Get drawer base styles using design tokens
 */
export const getDrawerBaseStyles = (): React.CSSProperties => ({
  position: 'fixed',
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  color: tokens.colors.text.primary,
  zIndex: 10001,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: tokens.shadows.xl,
});

/**
 * Get drawer overlay styles using design tokens
 */
export const getDrawerOverlayStyles = (): React.CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10000,
  backgroundColor: tokens.colors.interactive.overlay,
  animation: 'drawerOverlayFadeIn 0.2s ease-out',
});

/**
 * Get drawer size styles using design tokens
 */
export const getDrawerSizeStyles = (size: string): string => {
  const sizeMap: Record<string, string> = {
    'sm': '300px',
    'md': '400px',
    'lg': '500px',
    'xl': '600px',
    'full': '100%',
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get drawer position styles using design tokens
 */
export const getDrawerPositionStyles = (position: string, sizeValue: string): React.CSSProperties => {
  const baseRadius = tokens.radius.lg;
  
  const positionMap: Record<string, React.CSSProperties> = {
    'left': {
      top: 0,
      left: 0,
      bottom: 0,
      width: sizeValue,
      borderLeft: 'none',
      borderRadius: `0 ${baseRadius} ${baseRadius} 0`,
      animation: 'drawerSlideInLeft 0.25s ease-out',
    },
    'right': {
      top: 0,
      right: 0,
      bottom: 0,
      width: sizeValue,
      borderRight: 'none',
      borderRadius: `${baseRadius} 0 0 ${baseRadius}`,
      animation: 'drawerSlideInRight 0.25s ease-out',
    },
    'top': {
      top: 0,
      left: 0,
      right: 0,
      height: sizeValue,
      borderTop: 'none',
      borderRadius: `0 0 ${baseRadius} ${baseRadius}`,
      animation: 'drawerSlideInTop 0.25s ease-out',
    },
    'bottom': {
      bottom: 0,
      left: 0,
      right: 0,
      height: sizeValue,
      borderBottom: 'none',
      borderRadius: `${baseRadius} ${baseRadius} 0 0`,
      animation: 'drawerSlideInBottom 0.25s ease-out',
    },
  };
  
  return positionMap[position] || positionMap.right;
};

/**
 * Get drawer header styles using design tokens
 */
export const getDrawerHeaderStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  flexShrink: 0,
});

/**
 * Get drawer title styles using design tokens
 */
export const getDrawerTitleStyles = (): React.CSSProperties => ({
  margin: 0,
  fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
});

/**
 * Get drawer close button styles using design tokens
 */
export const getDrawerCloseButtonStyles = (): React.CSSProperties => ({
  background: 'none',
  border: 'none',
  color: tokens.colors.text.disabled,
  cursor: 'pointer',
  padding: tokens.spacing.xs,
  borderRadius: tokens.radius.sm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: tokens.transition.default,
  marginLeft: 'auto',
});

/**
 * Get drawer content styles using design tokens
 */
export const getDrawerContentStyles = (): React.CSSProperties => ({
  flex: 1,
  overflow: 'auto',
  padding: tokens.spacing.xl,
});

/**
 * Get notification type color using design tokens
 */
export const getNotificationTypeColor = (type: string): string => {
  const typeColorMap: Record<string, string> = {
    'info': tokens.colors.status.info,
    'warning': tokens.colors.status.warning,
    'error': tokens.colors.status.error,
    'success': tokens.colors.status.success,
  };
  return typeColorMap[type] || tokens.colors.text.disabled;
};

/**
 * Get notification item styles using design tokens
 */
export const getNotificationItemStyles = (isRead: boolean, type: string): React.CSSProperties => ({
  padding: tokens.spacing.lg,
  backgroundColor: isRead ? tokens.colors.bg.secondary : tokens.colors.bg.tertiary,
  borderRadius: tokens.radius.md,
  border: `1px solid ${getNotificationTypeColor(type)}`,
  cursor: 'pointer',
  transition: tokens.transition.default,
  position: 'relative',
});

/**
 * Get notification text styles using design tokens
 */
export const getNotificationTextStyles = (isRead: boolean): React.CSSProperties => ({
  color: isRead ? tokens.colors.text.disabled : tokens.colors.text.primary,
});

/**
 * Get skeleton card styles using design tokens
 */
export const getSkeletonCardStyles = (): React.CSSProperties => ({
  padding: tokens.spacing.lg,
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.lg,
  border: `1px solid ${tokens.colors.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
});

/**
 * Get skeleton table styles using design tokens
 */
export const getSkeletonTableStyles = (): React.CSSProperties => ({
  width: '100%',
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.lg,
  overflow: 'hidden',
});

/**
 * Get skeleton table header styles using design tokens
 */
export const getSkeletonTableHeaderStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.bg.tertiary,
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
});

/**
 * Get skeleton table row styles using design tokens
 */
export const getSkeletonTableRowStyles = (isLast: boolean): React.CSSProperties => ({
  borderBottom: isLast ? 'none' : `1px solid ${tokens.colors.border.primary}`,
});

/**
 * Get skeleton shimmer gradient using design tokens
 */
export const getSkeletonShimmerGradient = (): string => {
  return `linear-gradient(90deg, transparent, ${tokens.colors.text.primary}1A, transparent)`; // 10% opacity
};

/**
 * Get progress bar striped pattern using design tokens
 */
export const getProgressStripedPattern = (): string => {
  return `linear-gradient(45deg, ${tokens.colors.text.primary}26 25%, transparent 25%, transparent 50%, ${tokens.colors.text.primary}26 50%, ${tokens.colors.text.primary}26 75%, transparent 75%, transparent)`; // 15% opacity
};

/**
 * Get slider thumb hover shadow using design tokens
 */
export const getSliderThumbHoverShadow = (activeColor: string): string => {
  return `0 0 0 1px ${tokens.colors.border.primary}, 0 4px 8px ${tokens.colors.interactive.overlay}66, 0 0 12px ${activeColor}80`; // 40% and 50% opacity
};

/**
 * Get slider thumb active shadow using design tokens
 */
export const getSliderThumbActiveShadow = (activeColor: string): string => {
  return `0 0 0 1px ${tokens.colors.border.primary}, 0 2px 4px ${tokens.colors.interactive.overlay}4D, 0 0 8px ${activeColor}60`; // 30% and 38% opacity
};

/**
 * Get popover base styles using design tokens
 */
export const getPopoverBaseStyles = (): React.CSSProperties => ({
  position: 'fixed',
  zIndex: 9999,
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  boxShadow: tokens.shadows.xl,
  color: tokens.colors.text.primary,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  maxWidth: '320px',
  animation: 'popoverFadeIn 0.15s ease-out',
});

/**
 * Get popover arrow colors using design tokens
 */
export const getPopoverArrowColors = (): { borderColor: string; bgColor: string } => ({
  borderColor: tokens.colors.border.primary,
  bgColor: tokens.colors.bg.primary,
});

/**
 * Get upload dropzone styles using design tokens
 */
export const getUploadDropzoneStyles = (isDragOver: boolean, disabled: boolean, variant: string): React.CSSProperties => ({
  border: `2px dashed ${isDragOver ? tokens.colors.primary.main : disabled ? tokens.colors.border.primary : tokens.colors.border.hover}`,
  borderRadius: tokens.radius.lg,
  padding: variant === 'compact' ? tokens.spacing.lg : tokens.spacing['2xl'],
  textAlign: 'center',
  backgroundColor: isDragOver 
    ? `${tokens.colors.primary.main}0D` // 5% opacity
    : disabled 
      ? tokens.colors.interactive.disabled 
      : tokens.colors.bg.secondary,
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: tokens.transition.default,
  opacity: disabled ? 0.6 : 1,
});

/**
 * Get upload icon styles using design tokens
 */
export const getUploadIconStyles = (isDragOver: boolean, variant: string): React.CSSProperties => ({
  width: variant === 'compact' ? tokens.spacing['2xl'] : tokens.spacing['3xl'],
  height: variant === 'compact' ? tokens.spacing['2xl'] : tokens.spacing['3xl'],
  color: isDragOver ? tokens.colors.primary.main : tokens.colors.text.disabled,
  margin: `0 auto ${tokens.spacing.md} auto`,
});

/**
 * Get upload title styles using design tokens
 */
export const getUploadTitleStyles = (variant: string): React.CSSProperties => ({
  fontSize: variant === 'compact' 
    ? Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm
    : Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  margin: `0 0 ${tokens.spacing.sm} 0`,
});

/**
 * Get upload description styles using design tokens
 */
export const getUploadDescriptionStyles = (variant: string): React.CSSProperties => ({
  fontSize: variant === 'compact' 
    ? Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs
    : Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  color: tokens.colors.text.disabled,
  margin: `0 0 ${tokens.spacing.lg} 0`,
  lineHeight: 1.4,
});

/**
 * Get upload file item styles using design tokens
 */
export const getUploadFileItemStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: tokens.spacing.md,
  backgroundColor: tokens.colors.bg.secondary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
});

/**
 * Get upload file info styles using design tokens
 */
export const getUploadFileInfoStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  flex: 1,
  minWidth: 0,
});

// ============================================================================
// CNC VISUALIZATION UTILITIES
// ============================================================================

/**
 * Get CNC grid line color for minor grid lines
 */
export const getCNCMinorGridColor = (): string => {
  return tokens.colors.border.primary; // Light gray for minor grid
};

/**
 * Get CNC grid line color for major grid lines
 */
export const getCNCMajorGridColor = (): string => {
  return tokens.colors.border.hover; // Slightly darker gray for major grid
};

/**
 * Get CNC work area boundary color
 */
export const getCNCWorkAreaBoundaryColor = (): string => {
  return tokens.colors.primary.main; // Primary blue for work area boundary
};

/**
 * Get CNC coordinate axis color
 */
export const getCNCCoordinateAxisColor = (): string => {
  return tokens.colors.text.secondary; // Medium gray for axes
};

/**
 * Get CNC origin marker color
 */
export const getCNCOriginMarkerColor = (): string => {
  return tokens.colors.status.error; // Red for origin point
};

/**
 * Get CNC tool trail color
 */
export const getCNCToolTrailColor = (): string => {
  return tokens.colors.status.success; // Green for tool movement trail
};

/**
 * Get CNC current tool position color
 */
export const getCNCCurrentToolColor = (): string => {
  return tokens.colors.primary.main; // Primary blue for current tool position
};

/**
 * Get CNC position label color
 */
export const getCNCPositionLabelColor = (): string => {
  return tokens.colors.text.primary; // Dark text for labels
};

/**
 * Get CNC axis label color
 */
export const getCNCAxisLabelColor = (): string => {
  return tokens.colors.text.secondary; // Medium gray for axis labels
};

/**
 * Get CNC canvas background color
 */
export const getCNCCanvasBackgroundColor = (): string => {
  return tokens.colors.bg.tertiary; // Light background for canvas
};

/**
 * Get CNC Three.js mesh colors for 3D visualization
 */
export const getCNCMeshColors = () => ({
  toolHolder: tokens.colors.text.secondary, // Gray for tool holder
  toolBit: tokens.colors.text.primary, // Dark gray for tool bit
  positionIndicator: tokens.colors.status.error, // Red for position indicator
  workSurface: tokens.colors.bg.quaternary, // Very light gray for work surface
  workAreaOutline: tokens.colors.primary.main, // Primary blue for work area outline
  xAxis: tokens.colors.status.error, // Red for X axis
  yAxis: tokens.colors.status.success, // Green for Y axis
  zAxis: tokens.colors.primary.main, // Blue for Z axis
  gridCellColor: tokens.colors.border.primary, // Light gray for grid cells
  gridSectionColor: tokens.colors.border.hover, // Darker gray for grid sections
});

/**
 * Get CNC canvas font styles
 */
export const getCNCCanvasFontStyles = () => ({
  labelFont: `12px ${tokens.text.family.sans.join(', ')}`,
  axisFont: `14px ${tokens.text.family.sans.join(', ')}`,
});

/**
 * Get CNC checkbox styles for controls
 */
export const getCNCCheckboxStyles = (): React.CSSProperties => ({
  width: '1rem',
  height: '1rem',
  accentColor: tokens.colors.primary.main,
  backgroundColor: tokens.colors.bg.secondary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.sm,
});

/**
 * Get CNC slider styles for zoom control
 */
export const getCNCSliderStyles = (): React.CSSProperties => ({
  flex: 1,
  height: '0.5rem',
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.lg,
  appearance: 'none',
  cursor: 'pointer',
});

// ============================================================================
// CHART UTILITIES
// ============================================================================

/**
 * Get chart loading styles using design tokens
 */
export const getChartLoadingStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

/**
 * Get chart loading spinner styles using design tokens
 */
export const getChartLoadingSpinnerStyles = (): React.CSSProperties => ({
  animation: 'spin 1s linear infinite',
  borderRadius: '50%',
  height: '2rem',
  width: '2rem',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderBottomColor: tokens.colors.primary.main,
});

/**
 * Get chart loading text styles using design tokens
 */
export const getChartLoadingTextStyles = (): React.CSSProperties => ({
  marginTop: tokens.spacing.sm,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  color: tokens.colors.text.secondary,
});

/**
 * Get chart error container styles using design tokens
 */
export const getChartErrorContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  padding: tokens.spacing.lg,
  color: tokens.colors.status.error,
  backgroundColor: `${tokens.colors.status.error}0D`, // 5% opacity
  border: `1px solid ${tokens.colors.status.error}`,
  borderRadius: tokens.radius.md,
});

/**
 * Get chart error icon styles using design tokens
 */
export const getChartErrorIconStyles = (): React.CSSProperties => ({
  width: '1.25rem',
  height: '1.25rem',
  marginRight: tokens.spacing.sm,
});

/**
 * Get chart error title styles using design tokens
 */
export const getChartErrorTitleStyles = (): React.CSSProperties => ({
  fontWeight: tokens.text.weight.medium,
});

/**
 * Get chart error text styles using design tokens
 */
export const getChartErrorTextStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
});

/**
 * Get chart empty state container styles using design tokens
 */
export const getChartEmptyStateContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: tokens.spacing['3xl'],
  paddingBottom: tokens.spacing['3xl'],
});

/**
 * Get chart empty state icon styles using design tokens
 */
export const getChartEmptyStateIconStyles = (): React.CSSProperties => ({
  width: '3rem',
  height: '3rem',
  color: tokens.colors.text.disabled,
  marginBottom: tokens.spacing.lg,
});

/**
 * Get chart empty state text styles using design tokens
 */
export const getChartEmptyStateTextStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.disabled,
});

/**
 * Get chart title styles using design tokens
 */
export const getChartTitleStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.xs,
});

/**
 * Get chart subtitle styles using design tokens
 */
export const getChartSubtitleStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  color: tokens.colors.text.secondary,
});

/**
 * Get chart tooltip styles using design tokens
 */
export const getChartTooltipStyles = () => ({
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  boxShadow: tokens.shadows.lg,
});

/**
 * Get chart grid color using design tokens
 */
export const getChartGridColor = (): string => {
  return tokens.colors.border.primary;
};

/**
 * Get chart axis color using design tokens
 */
export const getChartAxisColor = (): string => {
  return tokens.colors.border.hover;
};

/**
 * Get chart primary color using design tokens
 */
export const getChartPrimaryColor = (): string => {
  return tokens.colors.primary.main;
};

/**
 * Get chart font size for chart elements
 */
export const getChartFontSize = (): number => {
  const size = tokens.text.size.xs;
  return Array.isArray(size) ? parseFloat(size[0]) : parseFloat(size);
};

// ============================================================================
// COMPONENT PROVIDER UTILITIES
// ============================================================================

/**
 * Get placeholder component styles using design tokens
 */
export const getPlaceholderComponentStyles = (): React.CSSProperties => ({
  border: `2px dashed ${tokens.colors.border.primary}`,
  padding: tokens.spacing.sm,
  margin: tokens.spacing.xs,
});

/**
 * Get placeholder component text styles using design tokens
 */
export const getPlaceholderComponentTextStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.secondary,
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
});

/**
 * Get debug badge styles using design tokens
 */
export const getDebugBadgeStyles = (): React.CSSProperties => ({
  position: 'fixed',
  top: '10px',
  right: '10px',
  backgroundColor: tokens.colors.text.primary,
  color: tokens.colors.bg.primary,
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radius.sm,
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  zIndex: 9999,
  fontFamily: tokens.text.family.mono.join(', '),
});

/**
 * Get upload file name styles using design tokens
 */
export const getUploadFileNameStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Get upload file size styles using design tokens
 */
export const getUploadFileSizeStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  color: tokens.colors.text.disabled,
  fontFamily: tokens.text.family.mono.join(', '),
});

/**
 * Get upload progress bar styles using design tokens
 */
export const getUploadProgressBarStyles = (): React.CSSProperties => ({
  width: '100%',
  height: '4px',
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.xs,
  overflow: 'hidden',
  marginTop: tokens.spacing.xs,
});

/**
 * Get upload progress bar color using design tokens
 */
export const getUploadProgressBarColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    'success': tokens.colors.status.success,
    'error': tokens.colors.status.error,
    'uploading': tokens.colors.primary.main,
  };
  return statusColorMap[status] || tokens.colors.text.disabled;
};

/**
 * Get upload status icon color using design tokens
 */
export const getUploadStatusIconColor = (status: string): string => {
  return getUploadProgressBarColor(status);
};

/**
 * Get upload info text styles using design tokens
 */
export const getUploadInfoTextStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  color: tokens.colors.text.disabled,
});

// ============================
// DataTable Component Utilities
// ============================

/**
 * Get data table base styles using design tokens
 */
export const getDataTableBaseStyles = (): React.CSSProperties => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: tokens.colors.bg.primary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.lg,
  overflow: 'hidden',
});

/**
 * Get data table header cell styles using design tokens
 */
export const getDataTableHeaderCellStyles = (align: string = 'left'): React.CSSProperties => ({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  backgroundColor: tokens.colors.bg.secondary,
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  textAlign: align as any,
});

/**
 * Get data table cell styles using design tokens
 */
export const getDataTableCellStyles = (align: string = 'left'): React.CSSProperties => ({
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  color: tokens.colors.text.primary,
  textAlign: align as any,
});

/**
 * Get data table row styles using design tokens
 */
export const getDataTableRowStyles = (isSelected: boolean = false, isHoverable: boolean = true): React.CSSProperties => ({
  backgroundColor: isSelected ? `${tokens.colors.primary.main}1A` : tokens.colors.bg.primary,
  transition: tokens.transition.fast,
  cursor: isHoverable ? 'pointer' : 'default',
});

/**
 * Get data table row hover styles using design tokens
 */
export const getDataTableRowHoverStyles = (isSelected: boolean = false): React.CSSProperties => ({
  backgroundColor: isSelected ? `${tokens.colors.primary.main}1A` : tokens.colors.bg.secondary,
});

/**
 * Get data table search input styles using design tokens
 */
export const getDataTableSearchInputStyles = (): React.CSSProperties => ({
  width: '100%',
  height: '40px',
  padding: `0 ${tokens.spacing.md} 0 40px`,
  backgroundColor: tokens.colors.bg.secondary,
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  color: tokens.colors.text.primary,
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  outline: 'none',
  transition: tokens.transition.fast,
});

/**
 * Get data table search input focus styles using design tokens
 */
export const getDataTableSearchInputFocusStyles = (): React.CSSProperties => ({
  borderColor: tokens.colors.primary.main,
});

/**
 * Get data table search icon styles using design tokens
 */
export const getDataTableSearchIconStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.disabled,
});

/**
 * Get data table checkbox styles using design tokens
 */
export const getDataTableCheckboxStyles = (isChecked: boolean = false): React.CSSProperties => ({
  width: '16px',
  height: '16px',
  borderRadius: tokens.radius.xs,
  border: `2px solid ${tokens.colors.border.primary}`,
  backgroundColor: isChecked ? tokens.colors.primary.main : 'transparent',
  borderColor: isChecked ? tokens.colors.primary.main : tokens.colors.border.primary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: tokens.transition.fast,
});

/**
 * Get data table checkbox hover styles using design tokens
 */
export const getDataTableCheckboxHoverStyles = (isChecked: boolean = false): React.CSSProperties => ({
  borderColor: isChecked ? tokens.colors.primary.main : tokens.colors.primary.main,
});

/**
 * Get data table sort icon styles using design tokens
 */
export const getSortIconStyles = (isActive: boolean, opacity: number = 0.3): React.CSSProperties => ({
  opacity: isActive ? 1 : opacity,
  marginBottom: '-2px',
  color: tokens.colors.text.secondary,
});

/**
 * Get data table empty state styles using design tokens
 */
export const getDataTableEmptyStateStyles = (): React.CSSProperties => ({
  textAlign: 'center',
  padding: tokens.spacing['2xl'],
  color: tokens.colors.text.disabled,
});

/**
 * Get data table pagination info styles using design tokens
 */
export const getDataTablePaginationInfoStyles = (): React.CSSProperties => ({
  fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  color: tokens.colors.text.disabled,
});

/**
 * Get data table filter container styles using design tokens
 */
export const getDataTableFilterContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  gap: tokens.spacing.lg,
  alignItems: 'center',
});

/**
 * Get data table search container styles using design tokens
 */
export const getDataTableSearchContainerStyles = (): React.CSSProperties => ({
  flex: 1,
  maxWidth: '300px',
  position: 'relative',
});

/**
 * Get data table search icon container styles using design tokens
 */
export const getDataTableSearchIconContainerStyles = (): React.CSSProperties => ({
  position: 'absolute',
  left: tokens.spacing.md,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
});

/**
 * Get data table actions cell styles using design tokens
 */
export const getDataTableActionsCellStyles = (): React.CSSProperties => ({
  width: '40px',
  textAlign: 'center',
});

/**
 * Get data table header container styles using design tokens
 */
export const getDataTableHeaderContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
});

/**
 * Get data table sort container styles using design tokens
 */
export const getDataTableSortContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
});

/**
 * Get data table pagination container styles using design tokens
 */
export const getDataTablePaginationContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${tokens.spacing.lg} 0`,
});

/**
 * Get data table pagination button group styles using design tokens
 */
export const getDataTablePaginationButtonGroupStyles = (): React.CSSProperties => ({
  display: 'flex',
  gap: tokens.spacing.sm,
});

// ============================
// Animated Component Utilities
// ============================

/**
 * Get animated card shadow styles using design tokens
 */
export const getAnimatedCardShadowStyles = (variant: string, isHovered: boolean) => {
  const shadowMap = {
    initial: `0 1px 3px ${tokens.colors.interactive.overlay}1A`, // 10% opacity
    hover: isHovered 
      ? `0 10px 25px ${tokens.colors.interactive.overlay}26` // 15% opacity
      : `0 4px 12px ${tokens.colors.interactive.overlay}1A`, // 10% opacity
  };
  
  return shadowMap[variant as keyof typeof shadowMap] || shadowMap.initial;
};

/**
 * Get animated card glow animation keyframes using design tokens
 */
export const getAnimatedCardGlowKeyframes = () => [
  `0 0 0 0 ${tokens.colors.primary.main}66`, // 40% opacity start
  `0 0 0 10px ${tokens.colors.primary.main}00`, // 0% opacity middle
  `0 0 0 0 ${tokens.colors.primary.main}00`, // 0% opacity end
];

/**
 * Get animated card container styles using design tokens
 */
export const getAnimatedCardContainerStyles = (disabled: boolean): React.CSSProperties => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  opacity: disabled ? 0.5 : 1,
});

/**
 * Get floating action button size styles using design tokens
 */
export const getFABSizeStyles = (size: string): React.CSSProperties => {
  const sizeMap: Record<string, React.CSSProperties> = {
    'sm': {
      width: '3rem', // 48px
      height: '3rem',
      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    },
    'md': {
      width: '3.5rem', // 56px
      height: '3.5rem',
      fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base,
    },
    'lg': {
      width: '4rem', // 64px
      height: '4rem',
      fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
    },
  };
  
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get floating action button color styles using design tokens
 */
export const getFABColorStyles = (color: string): React.CSSProperties => {
  const colorMap: Record<string, React.CSSProperties> = {
    'primary': {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.text.primary,
    },
    'success': {
      backgroundColor: tokens.colors.status.success,
      color: tokens.colors.text.primary,
    },
    'warning': {
      backgroundColor: tokens.colors.status.warning,
      color: tokens.colors.text.primary,
    },
    'danger': {
      backgroundColor: tokens.colors.status.error,
      color: tokens.colors.text.primary,
    },
  };
  
  return colorMap[color] || colorMap.primary;
};

/**
 * Get floating action button position styles using design tokens
 */
export const getFABPositionStyles = (position: string): React.CSSProperties => {
  const positionMap: Record<string, React.CSSProperties> = {
    'bottom-right': {
      position: 'fixed',
      bottom: tokens.spacing['6xl'], // 24px
      right: tokens.spacing['6xl'],
    },
    'bottom-left': {
      position: 'fixed',
      bottom: tokens.spacing['6xl'],
      left: tokens.spacing['6xl'],
    },
    'top-right': {
      position: 'fixed',
      top: tokens.spacing['6xl'],
      right: tokens.spacing['6xl'],
    },
    'top-left': {
      position: 'fixed',
      top: tokens.spacing['6xl'],
      left: tokens.spacing['6xl'],
    },
  };
  
  return positionMap[position] || positionMap['bottom-right'];
};

/**
 * Get floating action button shadow styles using design tokens
 */
export const getFABShadowStyles = (isHovered: boolean) => {
  return isHovered 
    ? `0 8px 25px ${tokens.colors.interactive.overlay}40` // 25% opacity
    : `0 4px 12px ${tokens.colors.interactive.overlay}26`; // 15% opacity
};

/**
 * Get floating action button base styles using design tokens
 */
export const getFABBaseStyles = (disabled: boolean): React.CSSProperties => ({
  zIndex: 50,
  borderRadius: tokens.radius.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  border: 'none',
  transition: tokens.transition.default,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.5 : 1,
});

/**
 * Get floating action button badge styles using design tokens
 */
export const getFABBadgeStyles = (): React.CSSProperties => ({
  position: 'absolute',
  top: '-0.5rem',
  right: '-0.5rem',
  backgroundColor: tokens.colors.status.error,
  color: tokens.colors.text.primary,
  fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
  borderRadius: tokens.radius.full,
  minWidth: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${tokens.spacing.xs}`,
});