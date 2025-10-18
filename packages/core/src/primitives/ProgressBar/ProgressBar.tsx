import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const progressBarVariants = cva(
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

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  showValue?: boolean;
  showPercentage?: boolean;
  label?: string;
  unit?: string;
  animated?: boolean;
  striped?: boolean;
  pulse?: boolean;
}

// Get variant color styles using tokens
const getProgressBarVariantStyles = (variant: string = 'default', value: number = 0) => {
  const variantColors = {
    default: tokens.colors.primary.main,
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    info: tokens.colors.status.info,
  };
  
  // Auto-select color based on value for default variant
  if (variant === 'default') {
    if (value === 100) return tokens.colors.status.success;
    if (value === 0) return tokens.colors.text.secondary;
    return tokens.colors.primary.main;
  }
  
  return variantColors[variant as keyof typeof variantColors] || variantColors.default;
};

// Get size-based styles using tokens
const getProgressBarSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      height: '4px',
      fontSize: tokens.text.size.xs[0],
      borderRadius: tokens.radius.sm,
    },
    md: {
      height: '6px',
      fontSize: tokens.text.size.sm[0],
      borderRadius: tokens.radius.sm,
    },
    lg: {
      height: '8px',
      fontSize: tokens.text.size.base[0],
      borderRadius: tokens.radius.md,
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Container styles
const getContainerStyles = (showValue: boolean = false): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: showValue ? tokens.spacing.sm : 0,
  width: '100%',
});

// Track styles
const getTrackStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = getProgressBarSizeStyles(size);
  
  return {
    flex: 1,
    height: sizeStyles.height,
    backgroundColor: tokens.colors.bg.tertiary,
    borderRadius: sizeStyles.borderRadius,
    overflow: 'hidden',
    position: 'relative',
  };
};

// Fill styles
const getFillStyles = (
  value: number = 0,
  variant: string = 'default',
  animated: boolean = false,
  striped: boolean = false,
  pulse: boolean = false
): React.CSSProperties => {
  const color = getProgressBarVariantStyles(variant, value);
  const percentage = Math.min(Math.max(value, 0), 100);
  
  const baseStyles: React.CSSProperties = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: color,
    transition: animated ? 'width 0.3s ease' : 'none',
    position: 'relative',
  };
  
  if (striped) {
    baseStyles.backgroundImage = `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 75%,
      transparent
    )`;
    baseStyles.backgroundSize = '1rem 1rem';
  }
  
  if (pulse) {
    baseStyles.animation = 'pulse 1.5s ease-in-out infinite';
  }
  
  return baseStyles;
};

// Value display styles
const getValueStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = getProgressBarSizeStyles(size);
  
  return {
    fontSize: sizeStyles.fontSize,
    fontFamily: tokens.text.family.mono.join(', '),
    color: tokens.colors.text.primary,
    fontWeight: tokens.text.weight.medium,
    minWidth: 'fit-content',
  };
};

// Label styles
const getLabelStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
});

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    value = 0,
    max = 100,
    showValue = false,
    showPercentage = false,
    label,
    unit = '',
    animated = true,
    striped = false,
    pulse = false,
    ...props 
  }, ref) => {
    // Calculate percentage based on max value
    const percentage = max > 0 ? (value / max) * 100 : 0;
    
    // Format display value
    const displayValue = React.useMemo(() => {
      if (showPercentage) {
        return `${Math.round(percentage)}%`;
      }
      return `${value}${unit}`;
    }, [value, percentage, unit, showPercentage]);
    
    return (
      <div style={{ width: '100%' }}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
        
        {label && (
          <div style={getLabelStyles()}>
            {label}
          </div>
        )}
        
        <div 
          ref={ref}
          className={cn(progressBarVariants({ variant, size }), className)}
          style={{
            ...getContainerStyles(showValue),
            ...style,
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          {...props}
        >
          <div style={getTrackStyles(size)}>
            <div style={getFillStyles(percentage, variant, animated, striped, pulse)} />
          </div>
          
          {showValue && (
            <div style={getValueStyles(size)}>
              {displayValue}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants };