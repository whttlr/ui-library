import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const statusCardVariants = cva(
  'relative',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        detailed: '',
      },
      size: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface StatusValue {
  label: string;
  value: string | number;
  unit?: string;
  precision?: number;
}

export interface StatusAction {
  label: string;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export interface StatusCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof statusCardVariants> {
  title: string;
  status: {
    label: string;
    variant: 'success' | 'warning' | 'error' | 'info' | 'secondary';
    pulse?: boolean;
  };
  values?: StatusValue[];
  actions?: StatusAction[];
  loading?: boolean;
}

// Container styles
const getContainerStyles = (variant: string = 'default'): React.CSSProperties => {
  const variantStyles = {
    default: {
      padding: tokens.spacing.lg,
    },
    compact: {
      padding: tokens.spacing.md,
    },
    detailed: {
      padding: tokens.spacing.xl,
    },
  };

  return variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;
};

// Header styles
const getHeaderStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: tokens.spacing.lg,
});

// Title styles
const getTitleStyles = (variant: string = 'default'): React.CSSProperties => {
  const sizeStyles = {
    default: {
      fontSize: tokens.text.size.lg[0],
    },
    compact: {
      fontSize: tokens.text.size.base[0],
    },
    detailed: {
      fontSize: tokens.text.size.xl[0],
    },
  };

  const baseStyles = sizeStyles[variant as keyof typeof sizeStyles] || sizeStyles.default;

  return {
    ...baseStyles,
    fontWeight: tokens.text.weight.semibold,
    color: tokens.colors.text.primary,
    fontFamily: tokens.text.family.sans.join(', '),
    margin: 0,
  };
};

// Values grid styles
const getValuesGridStyles = (variant: string = 'default'): React.CSSProperties => {
  const gridStyles = {
    default: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: tokens.spacing.md,
    },
    compact: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: tokens.spacing.sm,
    },
    detailed: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: tokens.spacing.lg,
    },
  };

  const baseStyles = gridStyles[variant as keyof typeof gridStyles] || gridStyles.default;

  return {
    display: 'grid',
    ...baseStyles,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.lg,
  };
};

// Value item styles
const getValueItemStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
});

// Value label styles
const getValueLabelStyles = (variant: string = 'default'): React.CSSProperties => {
  const sizeStyles = {
    default: {
      fontSize: tokens.text.size.sm[0],
    },
    compact: {
      fontSize: tokens.text.size.xs[0],
    },
    detailed: {
      fontSize: tokens.text.size.base[0],
    },
  };

  const baseStyles = sizeStyles[variant as keyof typeof sizeStyles] || sizeStyles.default;

  return {
    ...baseStyles,
    color: tokens.colors.text.secondary,
    fontFamily: tokens.text.family.sans.join(', '),
    margin: '0 0 0.25rem 0',
  };
};

// Value display styles
const getValueDisplayStyles = (variant: string = 'default'): React.CSSProperties => {
  const sizeStyles = {
    default: {
      fontSize: tokens.text.size.lg[0],
    },
    compact: {
      fontSize: tokens.text.size.base[0],
    },
    detailed: {
      fontSize: tokens.text.size.xl[0],
    },
  };

  const baseStyles = sizeStyles[variant as keyof typeof sizeStyles] || sizeStyles.default;

  return {
    ...baseStyles,
    fontFamily: tokens.text.family.mono.join(', '),
    fontWeight: tokens.text.weight.medium,
    color: tokens.colors.text.primary,
    margin: 0,
  };
};

// Actions styles
const getActionsStyles = (): React.CSSProperties => ({
  display: 'flex',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
});

// Loading skeleton styles
const getLoadingSkeletonStyles = (): React.CSSProperties => ({
  height: '1rem',
  backgroundColor: tokens.colors.bg.secondary,
  borderRadius: tokens.radius.sm,
  animation: 'pulse 1.5s ease-in-out infinite',
});

const StatusCard = React.forwardRef<HTMLDivElement, StatusCardProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    title,
    status,
    values = [],
    actions = [],
    loading = false,
    ...props 
  }, ref) => {
    // Format value with precision and unit
    const formatValue = (value: string | number, precision?: number, unit?: string) => {
      if (loading) return '';
      
      let formatted = typeof value === 'number' && precision !== undefined 
        ? value.toFixed(precision) 
        : value.toString();
      
      return unit ? `${formatted} ${unit}` : formatted;
    };

    return (
      <div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        
        <Card 
          ref={ref}
          className={cn(statusCardVariants({ variant, size }), className)}
          style={{
            ...getContainerStyles(variant),
            ...style,
          }}
          {...props}
        >
          <div>
            {/* Header */}
            <div style={getHeaderStyles()}>
              <h3 style={getTitleStyles(variant)}>
                {title}
              </h3>
              
              {loading ? (
                <div style={{ 
                  ...getLoadingSkeletonStyles(), 
                  width: '4rem', 
                  height: '1.5rem' 
                }} />
              ) : (
                <Badge 
                  variant={status.variant}
                  showIndicator={status.pulse}
                  pulse={status.pulse}
                >
                  {status.label}
                </Badge>
              )}
            </div>

            {/* Values */}
            {values.length > 0 && (
              <div style={getValuesGridStyles(variant)}>
                {values.map((valueItem, index) => (
                  <div key={index} style={getValueItemStyles()}>
                    <p style={getValueLabelStyles(variant)}>
                      {valueItem.label}
                    </p>
                    {loading ? (
                      <div style={getLoadingSkeletonStyles()} />
                    ) : (
                      <p style={getValueDisplayStyles(variant)}>
                        {formatValue(valueItem.value, valueItem.precision, valueItem.unit)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <div style={getActionsStyles()}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'default'}
                    size={action.size || 'sm'}
                    onClick={action.onClick}
                    disabled={action.disabled || loading}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
);

StatusCard.displayName = 'StatusCard';

export { StatusCard, statusCardVariants };