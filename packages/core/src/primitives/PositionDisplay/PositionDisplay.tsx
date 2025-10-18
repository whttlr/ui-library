import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const positionDisplayVariants = cva(
  'relative flex flex-col',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        detailed: '',
        inline: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      orientation: 'vertical',
    },
  }
);

export interface Position {
  x?: number;
  y?: number;
  z?: number;
  a?: number;
  b?: number;
  c?: number;
}

export interface PositionDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof positionDisplayVariants> {
  position: Position;
  precision?: number;
  unit?: string;
  showLabels?: boolean;
  axes?: Array<'x' | 'y' | 'z' | 'a' | 'b' | 'c'>;
  loading?: boolean;
  highlightAxis?: 'x' | 'y' | 'z' | 'a' | 'b' | 'c';
}

// Container styles
const getContainerStyles = (
  variant: string = 'default',
  orientation: string = 'vertical'
): React.CSSProperties => {
  const variantStyles = {
    default: {
      padding: tokens.spacing.sm,
      backgroundColor: 'transparent',
    },
    compact: {
      padding: tokens.spacing.xs,
      backgroundColor: 'transparent',
    },
    detailed: {
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.bg.secondary,
      borderRadius: tokens.radius.md,
      border: `1px solid ${tokens.colors.border.default}`,
    },
    inline: {
      padding: 0,
      backgroundColor: 'transparent',
    },
  };

  const orientationStyles = {
    vertical: {
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.xs,
    },
    horizontal: {
      display: 'flex',
      flexDirection: 'row',
      gap: tokens.spacing.md,
      alignItems: 'center',
    },
  };

  const baseVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;
  const baseOrientation = orientationStyles[orientation as keyof typeof orientationStyles] || orientationStyles.vertical;

  return {
    ...baseVariant,
    ...baseOrientation,
    fontFamily: tokens.text.family.mono.join(', '),
  };
};

// Axis item styles
const getAxisItemStyles = (
  size: string = 'md',
  orientation: string = 'vertical',
  highlight: boolean = false
): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      fontSize: tokens.text.size.xs[0],
      lineHeight: tokens.text.lineHeight.tight,
    },
    md: {
      fontSize: tokens.text.size.sm[0],
      lineHeight: tokens.text.lineHeight.normal,
    },
    lg: {
      fontSize: tokens.text.size.base[0],
      lineHeight: tokens.text.lineHeight.relaxed,
    },
  };

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    color: highlight ? tokens.colors.primary.main : tokens.colors.text.primary,
    fontWeight: highlight ? tokens.text.weight.bold : tokens.text.weight.medium,
    fontFamily: tokens.text.family.mono.join(', '),
    display: orientation === 'horizontal' ? 'inline-block' : 'block',
    margin: 0,
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

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    color: tokens.colors.text.secondary,
    fontWeight: tokens.text.weight.semibold,
    fontFamily: tokens.text.family.sans.join(', '),
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
  };
};

// Loading skeleton styles
const getLoadingSkeletonStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      height: '0.875rem',
      width: '4rem',
    },
    md: {
      height: '1rem',
      width: '5rem',
    },
    lg: {
      height: '1.25rem',
      width: '6rem',
    },
  };

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    backgroundColor: tokens.colors.bg.tertiary,
    borderRadius: tokens.radius.sm,
    animation: 'pulse 1.5s ease-in-out infinite',
  };
};

// Format axis value
const formatAxisValue = (
  value: number | undefined,
  precision: number = 3,
  unit: string = 'mm'
): string => {
  if (value === undefined) return '---';
  return `${value.toFixed(precision)} ${unit}`;
};

// Get axis separator
const getAxisSeparator = (
  orientation: string = 'vertical',
  variant: string = 'default'
): string => {
  if (orientation === 'horizontal') {
    return variant === 'inline' ? ' / ' : ' | ';
  }
  return '';
};

const PositionDisplay = React.forwardRef<HTMLDivElement, PositionDisplayProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    orientation = 'vertical',
    style,
    position,
    precision = 3,
    unit = 'mm',
    showLabels = true,
    axes = ['x', 'y', 'z'],
    loading = false,
    highlightAxis,
    ...props 
  }, ref) => {
    const axisLabels = {
      x: 'X',
      y: 'Y', 
      z: 'Z',
      a: 'A',
      b: 'B',
      c: 'C',
    };

    const renderAxisValue = (axis: string, index: number) => {
      const value = position[axis as keyof Position];
      const isHighlighted = highlightAxis === axis;
      const separator = getAxisSeparator(orientation, variant);
      const showSeparator = orientation === 'horizontal' && index < axes.length - 1;

      if (loading) {
        return (
          <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            {showLabels && (
              <span style={getLabelStyles(size)}>
                {axisLabels[axis as keyof typeof axisLabels]}:
              </span>
            )}
            <div style={getLoadingSkeletonStyles(size)} />
            {showSeparator && <span style={{ color: tokens.colors.text.tertiary }}>{separator}</span>}
          </div>
        );
      }

      const formattedValue = formatAxisValue(value, precision, unit);

      if (variant === 'inline') {
        return (
          <span key={axis} style={getAxisItemStyles(size, orientation, isHighlighted)}>
            {showLabels && `${axisLabels[axis as keyof typeof axisLabels]}: `}
            {formattedValue}
            {showSeparator && separator}
          </span>
        );
      }

      return (
        <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
          {showLabels && (
            <span style={getLabelStyles(size)}>
              {axisLabels[axis as keyof typeof axisLabels]}:
            </span>
          )}
          <span style={getAxisItemStyles(size, orientation, isHighlighted)}>
            {formattedValue}
          </span>
          {showSeparator && <span style={{ color: tokens.colors.text.tertiary }}>{separator}</span>}
        </div>
      );
    };

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
          className={cn(positionDisplayVariants({ variant, size, orientation }), className)}
          style={{
            ...getContainerStyles(variant, orientation),
            ...style,
          }}
          {...props}
        >
          {axes.map((axis, index) => renderAxisValue(axis, index))}
        </div>
      </div>
    );
  }
);

PositionDisplay.displayName = 'PositionDisplay';

export { PositionDisplay, positionDisplayVariants };