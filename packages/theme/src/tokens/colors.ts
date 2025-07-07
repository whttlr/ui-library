export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  industrial: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  accent: {
    orange: '#f97316',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#eab308',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

// Dark theme semantic colors (most commonly used hardcoded values)
export const darkThemeColors = {
  // Background levels (from analysis - most used hardcoded values)
  background: {
    primary: 'hsl(240, 10%, 3.9%)',     // Main background - used 30+ times
    secondary: 'hsl(240, 10%, 6%)',     // Card background - used 20+ times
    tertiary: 'hsl(240, 10%, 8%)',      // Elevated surfaces - used 15+ times
    quaternary: 'hsl(240, 3.7%, 15.9%)', // Subtle contrast - used 40+ times
  },
  
  // Text colors (from analysis)
  text: {
    primary: 'hsl(0, 0%, 98%)',         // Main text - used 60+ times
    secondary: 'hsl(240, 5%, 64.9%)',   // Muted text - used 30+ times
    tertiary: 'hsl(240, 5%, 45%)',      // Subtle text
    disabled: 'hsl(240, 5%, 35%)',      // Disabled text
  },
  
  // Border colors (from analysis)
  border: {
    primary: 'hsl(240, 3.7%, 15.9%)',   // Default border - used 40+ times
    secondary: 'hsl(240, 3.7%, 20%)',   // Subtle border
    focus: 'hsl(262, 83%, 58%)',        // Focus rings - primary color
    hover: 'hsl(240, 3.7%, 25%)',       // Hover state borders
  },
  
  // Interactive states (from analysis - rgba values used frequently)
  interactive: {
    hover: 'rgba(255, 255, 255, 0.1)',  // White 10% opacity - used 15+ times
    active: 'rgba(255, 255, 255, 0.2)', // White 20% opacity - used 10+ times
    disabled: 'rgba(255, 255, 255, 0.05)', // Disabled state
    overlay: 'rgba(0, 0, 0, 0.5)',      // Modal overlays
    subtle: 'rgba(0, 0, 0, 0.1)',       // Subtle overlays
  },
  
  // Primary color system (most used hardcoded color)
  primary: {
    main: 'hsl(262, 83%, 58%)',         // Primary purple - used 50+ times
    hover: 'hsl(262, 83%, 62%)',        // Hover state
    active: 'hsl(262, 83%, 54%)',       // Active state
    disabled: 'hsl(262, 30%, 40%)',     // Disabled state
    foreground: 'hsl(0, 0%, 98%)',      // Text on primary
  },
  
  // Status colors (specific hex values found in components)
  status: {
    success: {
      main: '#16a34a',                  // rgb(22, 163, 74) - used in components
      background: 'rgba(22, 163, 74, 0.1)',
      border: 'rgba(22, 163, 74, 0.3)',
    },
    warning: {
      main: '#d97706',                  // rgb(217, 119, 6) - used in components
      background: 'rgba(217, 119, 6, 0.1)',
      border: 'rgba(217, 119, 6, 0.3)',
    },
    error: {
      main: '#dc2626',                  // rgb(220, 38, 38) - used in components
      background: 'rgba(220, 38, 38, 0.1)',
      border: 'rgba(220, 38, 38, 0.3)',
    },
    info: {
      main: '#3b82f6',                  // rgb(59, 130, 246) - used in components
      background: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.3)',
    },
  },
};

// CNC-specific design tokens
export const cncTokens = {
  // Machine status colors
  status: {
    connected: colors.success[500],
    disconnected: colors.danger[500],
    idle: colors.warning[500],
    running: colors.primary[500],
    error: colors.danger[600],
    warning: colors.warning[600],
  },
  // Precision and measurement
  precision: {
    high: colors.success[600],
    medium: colors.warning[600],
    low: colors.danger[600],
  },
  // Control zones
  controls: {
    emergency: colors.danger[600],
    caution: colors.warning[500],
    normal: colors.primary[500],
    safe: colors.success[500],
  },
  // Visualization
  visualization: {
    workspace: colors.industrial[100],
    tool: colors.primary[500],
    origin: colors.industrial[600],
    grid: colors.industrial[200],
    path: colors.accent.orange,
  },
};