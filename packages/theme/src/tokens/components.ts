// Component-specific design tokens
// These tokens capture repeated patterns found across components

export const componentTokens = {
  // Button component tokens (from analysis - most varied component)
  button: {
    // Heights found in components
    height: {
      sm: '32px',      // Small buttons
      md: '36px',      // Default buttons  
      lg: '40px',      // Large buttons
      xl: '48px',      // Extra large buttons
    },
    
    // Padding patterns found in components
    padding: {
      sm: '6px 10px',      // Small buttons
      md: '8px 16px',      // Default buttons - used 20+ times
      lg: '12px 16px',     // Large buttons
      xl: '16px 24px',     // Extra large buttons
    },
    
    // Icon button dimensions (square buttons)
    iconButton: {
      sm: '32px',
      md: '36px',
      lg: '40px',
      xl: '48px',
    },
    
    // Font sizes for buttons
    fontSize: {
      sm: '0.875rem',    // 14px
      md: '1rem',        // 16px  
      lg: '1.125rem',    // 18px
    },
  },
  
  // Input component tokens (from analysis - complex states)
  input: {
    // Heights found in components
    height: {
      sm: '32px',      // Small inputs
      md: '40px',      // Default inputs - used 15+ times
      lg: '48px',      // Large inputs
    },
    
    // Padding patterns
    padding: {
      sm: '6px 12px',      // Small inputs
      md: '8px 12px',      // Default inputs - used 10+ times
      lg: '12px 16px',     // Large inputs
    },
    
    // Font sizes
    fontSize: {
      sm: '0.8125rem',     // 13px - found in components
      md: '0.875rem',      // 14px - default
      lg: '1rem',          // 16px - large
    },
  },
  
  // Card component tokens (from analysis - foundation component)
  card: {
    // Padding patterns found in components
    padding: {
      sm: '1rem',          // Small cards - used 10+ times
      md: '1.5rem',        // Default cards - used 15+ times
      lg: '2rem',          // Large cards - used 8+ times
      xl: '3rem',          // Extra large cards
    },
    
    // Gap patterns for card content
    gap: {
      sm: '0.5rem',        // Small gaps
      md: '1rem',          // Default gaps - used 20+ times
      lg: '1.5rem',        // Large gaps
      xl: '2rem',          // Extra large gaps
    },
  },
  
  // Badge component tokens (from analysis - many variants)
  badge: {
    // Padding patterns
    padding: {
      sm: '2px 8px',       // Small badges
      md: '2px 10px',      // Default badges - used 10+ times
      lg: '4px 12px',      // Large badges
    },
    
    // Font sizes
    fontSize: {
      sm: '0.75rem',       // 12px - used 15+ times
      md: '0.875rem',      // 14px
      lg: '1rem',          // 16px
    },
    
    // Heights
    height: {
      sm: '20px',
      md: '24px',
      lg: '28px',
    },
  },
  
  // Modal component tokens (from analysis - complex overlays)
  modal: {
    // Z-index values found in components
    zIndex: {
      overlay: 50,         // Modal overlay
      content: 51,         // Modal content
    },
    
    // Padding for modal content
    padding: {
      sm: '1rem',
      md: '1.5rem',        // Default modal padding
      lg: '2rem',
    },
    
    // Max widths
    maxWidth: {
      sm: '400px',
      md: '600px',         // Default modal width
      lg: '800px',
      xl: '1200px',
    },
  },
  
  // Tooltip component tokens (from analysis - multiple variants)
  tooltip: {
    // Padding patterns
    padding: {
      sm: '4px 8px',       // Small tooltips
      md: '8px 12px',      // Default tooltips - used 10+ times
      lg: '12px 16px',     // Large tooltips
    },
    
    // Font sizes
    fontSize: {
      sm: '0.75rem',       // 12px - used 15+ times
      md: '0.875rem',      // 14px
      lg: '1rem',          // 16px
    },
    
    // Max width values found in components
    maxWidth: {
      sm: '160px',
      md: '200px',         // Default tooltip width
      lg: '240px',
      xl: '320px',
    },
  },
  
  // Dropdown component tokens (from analysis - interactive states)
  dropdown: {
    // Z-index for dropdown content
    zIndex: 10,
    
    // Padding for dropdown items
    itemPadding: '8px 12px',     // Used consistently
    
    // Font size for dropdown items
    fontSize: '0.875rem',        // 14px
    
    // Max height for scrollable dropdowns
    maxHeight: '200px',
  },
  
  // Progress component tokens (from analysis - consistent heights)
  progress: {
    // Heights found in components
    height: {
      sm: '4px',
      md: '8px',           // Default progress height - used 5+ times
      lg: '12px',
    },
    
    // Border radius for progress bars
    borderRadius: '4px',
  },
  
  // Slider component tokens (from analysis - track and thumb sizes)
  slider: {
    // Track height
    trackHeight: '4px',
    
    // Thumb size
    thumbSize: '16px',
    
    // Active thumb size
    activeThumbSize: '20px',
  },
  
  // Skeleton component tokens (from analysis - consistent heights)
  skeleton: {
    // Common skeleton heights
    height: {
      text: '1rem',        // Text line height
      button: '40px',      // Button skeleton
      card: '200px',       // Card skeleton
    },
    
    // Border radius
    borderRadius: '4px',
  },
  
  // Form component tokens (from analysis - consistent spacing)
  form: {
    // Spacing between form elements
    spacing: {
      sm: '0.5rem',        // Small form spacing
      md: '1rem',          // Default form spacing - used 15+ times
      lg: '1.5rem',        // Large form spacing
    },
    
    // Label margins
    labelMargin: '0 0 0.5rem 0',   // Used consistently
    
    // Error text margins
    errorMargin: '0.25rem 0 0 0',  // Used consistently
  },
  
  // CNC-specific component tokens (from analysis - specialized components)
  cnc: {
    // Control button sizes (found in CNC components)
    controlButton: {
      sm: '32px',
      md: '40px',          // Default CNC control size
      lg: '48px',
      xl: '56px',          // Large CNC controls
    },
    
    // Display font sizes (monospace values)
    displayFontSize: {
      sm: '0.875rem',      // 14px
      md: '1rem',          // 16px
      lg: '1.125rem',      // 18px - used in coordinate displays
      xl: '1.25rem',       // 20px - large displays
    },
    
    // Emergency button specific sizes
    emergencyButton: {
      size: '64px',        // Large emergency stop button
      fontSize: '0.875rem',
    },
    
    // Coordinate display padding
    coordinatePadding: '8px 12px',
    
    // Status indicator sizes
    statusIndicator: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
  },
};