import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import {
  tokens,
  getAlertVariantStyles,
  getAlertSizeStyles,
  getAlertLayoutStyles,
  getAlertBaseStyles,
} from '../../utils/tokens';

// Alert variant types
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info' | 'cnc';
export type AlertLayout = 'simple' | 'detailed' | 'banner';
export type AlertSize = 'sm' | 'default' | 'lg';

// Inline styles for Alert variants using design tokens
const getAlertInlineStyles = (variant: AlertVariant = 'default', layout: AlertLayout = 'simple', size: AlertSize = 'default') => {
  return { 
    ...getAlertBaseStyles(layout),
    ...getAlertSizeStyles(size),
    ...getAlertLayoutStyles(layout, size), 
    ...getAlertVariantStyles(variant),
  };
};

const alertVariants = cva(
  'relative w-full rounded-lg border [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-red-500 bg-red-500/10 text-red-300',
        success: 'border-green-500 bg-green-500/10 text-green-300',
        warning: 'border-amber-500 bg-amber-500/10 text-amber-300',
        info: 'border-blue-500 bg-blue-500/10 text-blue-300',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        default: 'px-4 py-3 text-sm',
        lg: 'px-5 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  layout?: AlertLayout;
  showIcon?: boolean;
  variant?: AlertVariant;
  size?: AlertSize;
}

// Default icons for variants
const getDefaultIcon = (variant: AlertVariant): React.ReactNode => {
  const iconProps = { size: 18, strokeWidth: 2 };
  switch (variant) {
    case 'success':
      return <div style={{ color: 'currentColor' }}>✓</div>;
    case 'warning':
      return <div style={{ color: 'currentColor' }}>⚠</div>;
    case 'destructive':
      return <div style={{ color: 'currentColor' }}>✕</div>;
    case 'info':
      return <div style={{ color: 'currentColor' }}>ℹ</div>;
    case 'cnc':
      return <div style={{ color: 'currentColor' }}>⚡</div>;
    default:
      return <div style={{ color: 'currentColor' }}>ℹ</div>;
  }
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default',
    style, 
    title, 
    description, 
    icon, 
    dismissible, 
    onDismiss, 
    actions,
    layout = 'simple',
    showIcon = true,
    children, 
    ...props 
  }, ref) => {
    const inlineStyles = getAlertInlineStyles(variant, layout, size);
    const finalIcon = icon || (showIcon && variant !== 'default' ? getDefaultIcon(variant) : null);
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        style={{ ...inlineStyles, ...style }}
        {...props}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: layout === 'banner' ? 'center' : 'flex-start', 
          gap: tokens.spacing.sm 
        }}>
          {finalIcon && (
            <div style={{ 
              flexShrink: 0, 
              marginTop: layout === 'banner' ? '0' : '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {finalIcon}
            </div>
          )}
          
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div style={{ 
                fontWeight: tokens.text.weight.semibold, 
                fontSize: layout === 'detailed' ? '1rem' : '0.875rem',
                lineHeight: '1.25rem',
                margin: `0 0 ${tokens.spacing.xs} 0`,
                color: 'inherit',
                fontFamily: tokens.text.family.sans.join(', '),
              }}>
                {title}
              </div>
            )}
            {description && (
              <div style={{ 
                fontSize: layout === 'detailed' ? '0.875rem' : '0.8rem',
                lineHeight: '1.25rem',
                opacity: 0.9,
                margin: actions ? '0 0 1rem 0' : '0',
                color: 'inherit'
              }}>
                {description}
              </div>
            )}
            {children}
            
            {actions && (
              <div style={{
                marginTop: (title || description) ? '1rem' : '0',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                {actions}
              </div>
            )}
          </div>
          
          {(dismissible || onDismiss) && (
            <button
              onClick={onDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: 'currentColor',
                opacity: 0.6,
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'all 0.2s ease-in-out',
                marginTop: layout === 'banner' ? '0' : '2px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.backgroundColor = 'currentColor';
                e.currentTarget.style.color = variant === 'default' ? tokens.colors.bg.primary : tokens.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'currentColor';
              }}
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, style, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('', className)}
    style={{
      margin: '0 0 4px 0',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.025em',
      color: 'inherit',
      ...style
    }}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      color: 'inherit',
      opacity: 0.9,
      margin: 0,
      ...style
    }}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Actions component for alert buttons
const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      marginTop: '1rem',
      ...style
    }}
    {...props}
  />
));
AlertActions.displayName = 'AlertActions';

// Banner-style alert for notifications
const AlertBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    onDismiss?: () => void;
    title?: string;
  }
>(({ className, type, message, onDismiss, title, ...props }, ref) => {
  const variantMap = {
    info: 'info',
    success: 'success', 
    warning: 'warning',
    error: 'destructive',
  } as const;

  const iconMap = {
    info: '🛈',
    success: '✓',
    warning: '⚠',
    error: '✕',
  };

  return (
    <Alert
      ref={ref}
      variant={variantMap[type]}
      className={className}
      showIcon={false}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.spacing.sm,
        position: 'relative'
      }}
      {...props}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
        flex: 1
      }}>
        <span style={{ fontSize: '1.125rem', lineHeight: 1 }}>{iconMap[type]}</span>
        <div style={{ flex: 1 }}>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'currentColor',
            opacity: 0.6,
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            lineHeight: 1,
            flexShrink: 0,
            transition: 'all 0.2s ease-in-out',
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </Alert>
  );
});
AlertBanner.displayName = 'AlertBanner';

// Compound component
export const AlertCompound = Object.assign(Alert, {
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
});

export { Alert, AlertTitle, AlertDescription, AlertActions, AlertBanner, alertVariants };