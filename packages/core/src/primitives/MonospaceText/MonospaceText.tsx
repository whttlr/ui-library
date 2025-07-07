import * as React from 'react';
import {
  getMonospaceTextSizeStyles,
  getMonospaceTextVariantStyles,
  getMonospaceTextBaseStyles,
  getMonospaceTextUnitStyles,
} from '../../utils/tokens';

export type MonospaceTextVariant = 'coordinate' | 'code' | 'numeric' | 'gcode' | 'default';
export type MonospaceTextSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';

export interface MonospaceTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: MonospaceTextVariant;
  size?: MonospaceTextSize;
  precision?: number;
  unit?: string;
  highlight?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MonospaceText = React.forwardRef<HTMLSpanElement, MonospaceTextProps>(
  ({ 
    variant = 'default',
    size = 'default',
    precision,
    unit,
    highlight = false,
    className,
    children,
    style,
    ...props 
  }, ref) => {
    // Size configurations using design tokens
    const sizeStyle = getMonospaceTextSizeStyles(size);

    // Variant configurations using design tokens
    const variantStyle = getMonospaceTextVariantStyles(variant, highlight);

    // Format numeric values with precision
    const formatValue = (value: React.ReactNode): React.ReactNode => {
      if (precision && typeof value === 'number') {
        return value.toFixed(precision);
      }
      if (precision && typeof value === 'string') {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          return num.toFixed(precision);
        }
      }
      return value;
    };

    const textStyles: React.CSSProperties = {
      ...getMonospaceTextBaseStyles(),
      ...sizeStyle,
      ...variantStyle,
      ...style,
    };

    const formattedChildren = formatValue(children);

    return (
      <span
        ref={ref}
        style={textStyles}
        className={className}
        {...props}
      >
        {formattedChildren}
        {unit && (
          <span style={getMonospaceTextUnitStyles()}>
            {unit}
          </span>
        )}
      </span>
    );
  }
);

MonospaceText.displayName = 'MonospaceText';