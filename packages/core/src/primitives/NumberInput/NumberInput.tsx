import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { FormFieldContext } from '../FormField/FormField';

const numberInputVariants = cva(
  'relative w-full font-mono transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
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

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>,
    VariantProps<typeof numberInputVariants> {
  label?: string;
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  showError?: boolean;
}

// Get size-based styles using tokens
const getNumberInputSizeStyles = (size: string = 'md'): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      height: tokens.input.height.sm,
      fontSize: tokens.text.size.sm[0],
      padding: `${tokens.spacing.xs} ${tokens.spacing.xl} ${tokens.spacing.xs} ${tokens.spacing.sm}`,
    },
    md: {
      height: tokens.input.height.md,
      fontSize: tokens.text.size.base[0],
      padding: `${tokens.spacing.sm} 36px ${tokens.spacing.sm} ${tokens.spacing.md}`,
    },
    lg: {
      height: tokens.input.height.lg,
      fontSize: tokens.text.size.lg[0],
      padding: `${tokens.spacing.md} 40px ${tokens.spacing.md} ${tokens.spacing.lg}`,
    },
  };
  
  return styles[size] || styles.md;
};

// Get variant-based styles using tokens
const getNumberInputVariantStyles = (variant: string = 'default', error?: string): React.CSSProperties => {
  const isError = variant === 'error' || !!error;
  
  return {
    backgroundColor: tokens.colors.bg.secondary,
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${isError ? tokens.colors.status.error : tokens.colors.border.primary}`,
    fontFamily: tokens.text.family.mono.join(', '),
    outline: 'none',
    transition: tokens.transition.default,
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    appearance: 'none',
  };
};

// Arrow button styles
const getArrowButtonStyles = (): React.CSSProperties => ({
  flex: 1,
  height: '50%',
  minHeight: 0,
  border: 'none',
  backgroundColor: tokens.colors.bg.tertiary,
  color: tokens.colors.text.primary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: tokens.text.size.xs[0],
  transition: tokens.transition.smooth,
  borderLeft: `1px solid ${tokens.colors.border.primary}`,
  transformOrigin: 'center',
  boxSizing: 'border-box',
});

// Label styles
const getLabelStyles = (): React.CSSProperties => ({
  display: 'block',
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.sm,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Error message styles
const getErrorStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.xs[0],
  color: tokens.colors.status.error,
  marginTop: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
});

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    className, 
    variant, 
    size = 'md', 
    style,
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    placeholder,
    disabled,
    error,
    showError = true,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const formFieldContext = React.useContext(FormFieldContext);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Handle empty input
      if (inputValue === '' || inputValue === '-') {
        onChange?.(undefined);
        return;
      }
      
      const val = parseFloat(inputValue);
      if (!isNaN(val)) {
        onChange?.(val);
      }
    };
    
    const handleIncrement = () => {
      if (disabled) return;
      const currentValue = value ?? 0;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        onChange?.(newValue);
      }
    };
    
    const handleDecrement = () => {
      if (disabled) return;
      const currentValue = value ?? 0;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        onChange?.(newValue);
      }
    };
    
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
    };
    
    const inputStyles: React.CSSProperties = {
      ...getNumberInputSizeStyles(size),
      ...getNumberInputVariantStyles(variant, error),
      width: '100%',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    };
    
    const arrowContainerStyles: React.CSSProperties = {
      position: 'absolute',
      right: '1px',
      top: '1px',
      bottom: '1px',
      width: size === 'sm' ? '28px' : size === 'lg' ? '36px' : '32px',
      height: 'calc(100% - 2px)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: `0 ${tokens.radius.sm} ${tokens.radius.sm} 0`,
      overflow: 'hidden',
      opacity: isHovered || isFocused ? 1 : 0.6,
      transform: isHovered || isFocused ? 'translateX(0)' : 'translateX(4px)',
      transition: tokens.transition.smooth,
      boxSizing: 'border-box',
    };
    
    const arrowButtonStyles = getArrowButtonStyles();
    
    return (
      <div style={{ width: '100%' }}>
        <style>{`
          /* Hide all browser default number input spinners */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            appearance: none !important;
            margin: 0 !important;
            display: none !important;
          }
          
          input[type="number"] {
            -moz-appearance: textfield !important;
            appearance: textfield !important;
          }
          
          /* Additional cross-browser spinner hiding */
          input[type="number"]::-ms-clear {
            display: none !important;
          }
          
          input[type="number"]::-ms-reveal {
            display: none !important;
          }
        `}</style>
        
        {label && (
          <label style={getLabelStyles()}>
            {label}
          </label>
        )}
        
        <div 
          style={containerStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            ref={ref}
            type="number"
            value={value !== undefined ? value : ''}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(numberInputVariants({ variant, size }), className)}
            style={{
              ...inputStyles,
              ...style,
            }}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.style.borderColor = tokens.colors.border.focus;
              e.target.style.boxShadow = `0 0 0 2px ${tokens.colors.border.focus}20`;
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              e.target.style.borderColor = error ? tokens.colors.status.error : tokens.colors.border.primary;
              e.target.style.boxShadow = 'none';
              props.onBlur?.(e);
            }}
            {...props}
          />
          
          <div style={arrowContainerStyles}>
            <button
              type="button"
              disabled={disabled}
              style={arrowButtonStyles}
              onClick={handleIncrement}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = `${tokens.colors.primary.main}15`;
                  e.currentTarget.style.color = tokens.colors.primary.main;
                  e.currentTarget.style.boxShadow = `0 2px 8px ${tokens.colors.primary.main}25`;
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = tokens.colors.bg.tertiary;
                  e.currentTarget.style.color = tokens.colors.text.primary;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
              onMouseDown={(e) => {
                if (!disabled) {
                  e.preventDefault();
                  e.currentTarget.style.opacity = '0.8';
                }
              }}
              onMouseUp={(e) => {
                if (!disabled) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              ▲
            </button>
            
            <button
              type="button"
              disabled={disabled}
              style={{
                ...arrowButtonStyles,
                borderTop: `1px solid ${tokens.colors.border.primary}`,
              }}
              onClick={handleDecrement}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = `${tokens.colors.primary.main}15`;
                  e.currentTarget.style.color = tokens.colors.primary.main;
                  e.currentTarget.style.boxShadow = `0 2px 8px ${tokens.colors.primary.main}25`;
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = tokens.colors.bg.tertiary;
                  e.currentTarget.style.color = tokens.colors.text.primary;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
              onMouseDown={(e) => {
                if (!disabled) {
                  e.preventDefault();
                  e.currentTarget.style.opacity = '0.8';
                }
              }}
              onMouseUp={(e) => {
                if (!disabled) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              ▼
            </button>
          </div>
        </div>
        
        {error && showError && !formFieldContext.handlesError && (
          <p style={getErrorStyles()} data-testid="number-input-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export { NumberInput, numberInputVariants };