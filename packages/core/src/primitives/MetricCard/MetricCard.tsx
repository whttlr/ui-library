import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Card, CardHeader, CardTitle, CardValue, CardChange, CardIcon } from '../Card/Card';

const metricCardVariants = cva(
  'relative w-full',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface MetricCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  change?: {
    value: string;
    variant: 'positive' | 'negative' | 'neutral';
  };
  icon?: React.ReactNode;
  iconColor?: string;
  iconBackgroundColor?: string;
  loading?: boolean;
}

// Get variant color styles using tokens
const getMetricCardVariantStyles = (variant: string = 'default') => {
  const variantColors = {
    default: {
      iconColor: tokens.colors.primary.main,
      iconBg: 'transparent',
    },
    success: {
      iconColor: tokens.colors.status.success,
      iconBg: 'transparent',
    },
    warning: {
      iconColor: tokens.colors.status.warning,
      iconBg: 'transparent',
    },
    error: {
      iconColor: tokens.colors.status.error,
      iconBg: 'transparent',
    },
    info: {
      iconColor: tokens.colors.status.info,
      iconBg: 'transparent',
    },
  };
  
  return variantColors[variant as keyof typeof variantColors] || variantColors.default;
};

// Get size-based styles using tokens
const getMetricCardSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      iconSize: 20,
      titleSize: tokens.text.size.sm[0],
      valueSize: tokens.text.size.lg[0],
    },
    md: {
      iconSize: 24,
      titleSize: tokens.text.size.base[0],
      valueSize: tokens.text.size.xl[0],
    },
    lg: {
      iconSize: 28,
      titleSize: tokens.text.size.lg[0],
      valueSize: tokens.text.size['2xl'][0],
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Container styles
const getContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.md,
});

// Content styles
const getContentStyles = (): React.CSSProperties => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
});

// Loading skeleton styles
const getLoadingStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.bg.tertiary,
  borderRadius: tokens.radius.sm,
  animation: 'pulse 1.5s ease-in-out infinite',
});

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    title,
    value,
    change,
    icon,
    iconColor,
    iconBackgroundColor,
    loading = false,
    ...props 
  }, ref) => {
    const variantStyles = getMetricCardVariantStyles(variant);
    const sizeStyles = getMetricCardSizeStyles(size);
    
    const finalIconColor = iconColor || variantStyles.iconColor;
    const finalIconBg = iconBackgroundColor || variantStyles.iconBg;
    
    if (loading) {
      return (
        <Card variant="metric" noPadding ref={ref} className={cn(metricCardVariants({ variant, size }), className)} style={style} {...props}>
          <CardHeader style={getContainerStyles()}>
            <div style={getContentStyles()}>
              <div style={{ ...getLoadingStyles(), height: '1rem', width: '60%' }} />
              <div style={{ ...getLoadingStyles(), height: '1.5rem', width: '40%' }} />
              <div style={{ ...getLoadingStyles(), height: '0.875rem', width: '30%' }} />
            </div>
            <div style={{ 
              ...getLoadingStyles(), 
              width: '48px', 
              height: '48px',
              borderRadius: tokens.radius.md,
            }} />
          </CardHeader>
        </Card>
      );
    }
    
    return (
      <Card 
        variant="metric" 
        noPadding 
        ref={ref}
        className={cn(metricCardVariants({ variant, size }), className)}
        style={style}
        {...props}
      >
        <CardHeader style={getContainerStyles()}>
          <div style={getContentStyles()}>
            <CardTitle style={{ fontSize: sizeStyles.titleSize }}>
              {title}
            </CardTitle>
            <CardValue style={{ fontSize: sizeStyles.valueSize }}>
              {value}
            </CardValue>
            {change && (
              <CardChange variant={change.variant}>
                {change.value}
              </CardChange>
            )}
          </div>
          {icon && (
            <CardIcon 
              style={{ 
                backgroundColor: finalIconBg,
                color: finalIconColor,
                width: size === 'sm' ? '40px' : size === 'lg' ? '56px' : '48px',
                height: size === 'sm' ? '40px' : size === 'lg' ? '56px' : '48px',
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                size: sizeStyles.iconSize,
                color: finalIconColor,
                strokeWidth: 2,
              })}
            </CardIcon>
          )}
        </CardHeader>
      </Card>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export { MetricCard, metricCardVariants };