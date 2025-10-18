import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { MonospaceText } from '../MonospaceText/MonospaceText';

const coordinateAxisVariants = cva(
  'relative flex flex-col items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        highlight: '',
        warning: '',
        error: '',
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

export interface CoordinateAxisProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof coordinateAxisVariants> {
  label: string;
  value: number;
  precision?: number;
  unit?: string;
  highlight?: boolean;
  loading?: boolean;
}

// Container styles
const getContainerStyles = (size: string = 'md', highlight: boolean = false): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      padding: tokens.spacing.sm,
      borderRadius: tokens.radius.sm,
    },
    md: {
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.md,
    },
    lg: {
      padding: tokens.spacing.lg,
      borderRadius: tokens.radius.md,
    },
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    backgroundColor: tokens.colors.bg.tertiary,
    border: `1px solid ${highlight ? tokens.colors.primary.main : tokens.colors.border.default}`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.xs,
    minWidth: '100px',
    transition: 'border-color 0.2s ease',
  };
};

// Label styles
const getLabelStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      fontSize: tokens.text.size.xs[0],
    },
    md: {
      fontSize: tokens.text.size.sm[0],
    },
    lg: {
      fontSize: tokens.text.size.base[0],
    },
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    color: tokens.colors.text.secondary,
    fontWeight: tokens.text.weight.medium,
    fontFamily: tokens.text.family.sans.join(', '),
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
  };
};

// Value styles
const getValueStyles = (size: string = 'md', variant: string = 'default'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      fontSize: tokens.text.size.lg[0],
    },
    md: {
      fontSize: tokens.text.size.xl[0],
    },
    lg: {
      fontSize: tokens.text.size['2xl'][0],
    },
  };

  const variantColors = {
    default: tokens.colors.text.primary,
    highlight: tokens.colors.primary.main,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;
  const color = variantColors[variant as keyof typeof variantColors] || variantColors.default;

  return {
    ...baseStyles,
    color,
    fontWeight: tokens.text.weight.bold,
    fontFamily: tokens.text.family.mono.join(', '),
    lineHeight: 1,
    margin: 0,
  };
};

// Loading skeleton styles
const getLoadingStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      height: '1.5rem',
      width: '4rem',
    },
    md: {
      height: '1.75rem',
      width: '5rem',
    },
    lg: {
      height: '2rem',
      width: '6rem',
    },
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.sm,
    animation: 'pulse 1.5s ease-in-out infinite',
  };
};

const CoordinateAxis = React.forwardRef<HTMLDivElement, CoordinateAxisProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    label,
    value,
    precision = 3,
    unit = 'mm',
    highlight = false,
    loading = false,
    ...props 
  }, ref) => {
    // Format the value with precision
    const formattedValue = React.useMemo(() => {
      if (loading) return '';
      return value.toFixed(precision);
    }, [value, precision, loading]);

    return (
      <div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        
        <div 
          ref={ref}
          className={cn(coordinateAxisVariants({ variant, size }), className)}
          style={{
            ...getContainerStyles(size, highlight),
            ...style,
          }}
          {...props}
        >
          <div style={getLabelStyles(size)}>
            {label}
          </div>
          
          {loading ? (
            <div style={getLoadingStyles(size)} />
          ) : (
            <MonospaceText 
              variant="coordinate" 
              size={size} 
              precision={precision} 
              unit={unit}
              highlight={highlight}
              style={getValueStyles(size, highlight ? 'highlight' : variant)}
            >
              {formattedValue}
            </MonospaceText>
          )}
        </div>
      </div>
    );
  }
);

CoordinateAxis.displayName = 'CoordinateAxis';

export { CoordinateAxis, coordinateAxisVariants };