import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const sliderInputVariants = cva(
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

export interface SliderInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof sliderInputVariants> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  unit?: string;
  onValueChange?: (value: number) => void;
}

// Get variant color styles using tokens
const getSliderVariantStyles = (variant: string = 'default') => {
  const variantColors = {
    default: tokens.colors.primary.main,
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    info: tokens.colors.status.info,
  };
  
  return variantColors[variant as keyof typeof variantColors] || variantColors.default;
};

// Get size-based styles using tokens
const getSliderSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      height: '6px',
      thumbSize: '16px',
      fontSize: tokens.text.size.sm[0],
    },
    md: {
      height: '8px',
      thumbSize: '20px',
      fontSize: tokens.text.size.base[0],
    },
    lg: {
      height: '10px',
      thumbSize: '24px',
      fontSize: tokens.text.size.lg[0],
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Label styles
const getLabelStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Value display styles
const getValueStyles = (activeColor: string): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  color: activeColor,
  fontFamily: tokens.text.family.mono.join(', '),
  fontWeight: tokens.text.weight.semibold,
});

// Min/Max label styles
const getMinMaxStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.xs[0],
  color: tokens.colors.text.secondary,
  fontFamily: tokens.text.family.mono.join(', '),
});

const SliderInput = React.forwardRef<HTMLInputElement, SliderInputProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    label,
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    showValue = true,
    unit = '',
    disabled,
    onValueChange,
    onChange,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    
    const numericValue = Number(value);
    const percentage = ((numericValue - min) / (max - min)) * 100;
    const activeColor = getSliderVariantStyles(variant);
    const sizeStyles = getSliderSizeStyles(size);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      onValueChange?.(newValue);
      onChange?.(e);
    };
    
    const containerStyles: React.CSSProperties = {
      width: '100%',
      position: 'relative',
    };
    
    const trackStyles: React.CSSProperties = {
      width: '100%',
      height: sizeStyles.height,
      borderRadius: tokens.radius.sm,
      backgroundColor: tokens.colors.bg.tertiary,
      position: 'relative',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: tokens.transition.default,
    };
    
    const fillStyles: React.CSSProperties = {
      height: '100%',
      borderRadius: tokens.radius.sm,
      background: `linear-gradient(90deg, ${activeColor} 0%, ${activeColor} 100%)`,
      width: `${percentage}%`,
      transition: tokens.transition.smooth,
      boxShadow: `0 0 8px ${activeColor}40`,
    };
    
    const thumbStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: `${percentage}%`,
      transform: 'translate(-50%, -50%)',
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: '50%',
      backgroundColor: activeColor,
      border: `3px solid ${tokens.colors.bg.secondary}`,
      boxShadow: `0 0 0 1px ${tokens.colors.border.primary}, 0 2px 4px rgba(0,0,0,0.3), 0 0 8px ${activeColor}60`,
      cursor: disabled ? 'not-allowed' : 'grab',
      transition: tokens.transition.default,
      transform: isHovered || isDragging ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)',
    };
    
    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: 0,
    };
    
    const headerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: tokens.spacing.md,
    };
    
    const footerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: tokens.spacing.sm,
    };
    
    return (
      <div style={{ width: '100%' }}>
        <div style={headerStyles}>
          {label && (
            <label style={getLabelStyles()}>
              {label}
            </label>
          )}
          {showValue && (
            <span style={getValueStyles(activeColor)}>
              {numericValue}{unit}
            </span>
          )}
        </div>
        
        <div style={containerStyles}>
          <div 
            style={trackStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div style={fillStyles} />
            <div 
              style={thumbStyles}
              onMouseDown={() => setIsDragging(true)}
            />
          </div>
          
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={numericValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(sliderInputVariants({ variant, size }), className)}
            style={{
              ...inputStyles,
              ...style,
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            {...props}
          />
        </div>
        
        <div style={footerStyles}>
          <span style={getMinMaxStyles()}>{min}{unit}</span>
          <span style={getMinMaxStyles()}>{max}{unit}</span>
        </div>
      </div>
    );
  }
);

SliderInput.displayName = 'SliderInput';

export { SliderInput, sliderInputVariants };