import * as React from 'react';
import {
  tokens,
  getTabsSizeStyles,
  getTabsListStyles,
  getTabsButtonStyles,
  getTabsBadgeStyles,
  getTabsContentStyles,
} from '../../utils/tokens';

export type TabsVariant = 'default' | 'pills' | 'underline' | 'cnc' | 'segmented';
export type TabsSize = 'sm' | 'default' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    items,
    defaultValue,
    value: controlledValue,
    onValueChange,
    variant = 'default',
    size = 'default',
    orientation = 'horizontal',
    className,
    style,
    disabled = false,
    fullWidth = false,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || controlledValue || items[0]?.value || ''
    );

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleTabChange = (tabValue: string) => {
      if (disabled) return;
      
      const tab = items.find(item => item.value === tabValue);
      if (tab?.disabled) return;

      if (controlledValue === undefined) {
        setInternalValue(tabValue);
      }
      onValueChange?.(tabValue);
    };

    // Size configurations using design tokens
    const config = getTabsSizeStyles(size);

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'row' : 'column',
      width: '100%',
      ...style,
    };

    // Tab list styles using design tokens
    const tabListStyles = getTabsListStyles(variant, orientation);

    // Tab button styles using design tokens
    const getTabStyles = (tab: TabItem, isActive: boolean): React.CSSProperties => {
      return {
        ...getTabsButtonStyles(variant, isActive, tab.disabled || disabled),
        gap: config.gap,
        padding: config.padding,
        fontSize: config.fontSize,
        flex: fullWidth && orientation === 'horizontal' ? 1 : 'none',
      };
    };

    // Badge styles using design tokens
    const badgeStyles: React.CSSProperties = {
      ...getTabsBadgeStyles(),
      minWidth: config.badgeSize,
      height: config.badgeSize,
    };

    // Content styles using design tokens
    const contentStyles = getTabsContentStyles(orientation);

    const activeTab = items.find(item => item.value === value);

    return (
      <div ref={ref} style={containerStyles} className={className} {...props}>
        {/* Tab List */}
        <div style={tabListStyles} role="tablist">
          {items.map((tab) => {
            const isActive = tab.value === value;
            
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.value}`}
                style={getTabStyles(tab, isActive)}
                onClick={() => handleTabChange(tab.value)}
                // Hover/focus effects are now handled by CSS transitions in getTabsButtonStyles
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span style={{ 
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {tab.label}
                </span>
                {tab.badge && (
                  <span style={badgeStyles}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={contentStyles}>
          {activeTab && (
            <div
              role="tabpanel"
              id={`tabpanel-${activeTab.value}`}
              aria-labelledby={`tab-${activeTab.value}`}
            >
              {activeTab.content}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

// Compound components for advanced usage
export const TabsList = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  className?: string;
  style?: React.CSSProperties;
}>(({ children, variant = 'default', orientation = 'horizontal', className, style, ...props }, ref) => {
  const listStyles: React.CSSProperties = {
    ...getTabsListStyles(variant, orientation),
    ...style,
  };

  return (
    <div ref={ref} style={listStyles} className={className} role="tablist" {...props}>
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<HTMLButtonElement, {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}>(({ value, children, disabled = false, className, style, ...props }, ref) => {
  const triggerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${tokens.spacing.md} ${tokens.spacing.base}`,
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.medium,
    border: 'none',
    background: 'none',
    color: tokens.colors.text.secondary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: tokens.radius.md,
    transition: tokens.transitions.all,
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    ...style,
  };

  return (
    <button
      ref={ref}
      style={triggerStyles}
      className={className}
      role="tab"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<HTMLDivElement, {
  value: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>(({ value, children, className, style, ...props }, ref) => {
  const contentStyles: React.CSSProperties = {
    padding: `${tokens.spacing.base} 0`,
    outline: 'none',
    ...style,
  };

  return (
    <div
      ref={ref}
      style={contentStyles}
      className={className}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  );
});

TabsContent.displayName = 'TabsContent';

// Compound object for easier imports
export const TabsCompound = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});