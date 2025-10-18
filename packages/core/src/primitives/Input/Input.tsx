import * as React from 'react';
import { cn } from '../../utils';
import { 
  tokens, 
  getInputVariantStyles, 
  getInputSizeStyles, 
  getInputBaseStyles,
  getInputFocusStyles,
  getInputDisabledStyles
} from '../../utils/tokens';
import { FormFieldContext } from '../FormField/FormField';

export type InputVariant = 'default' | 'search' | 'password' | 'number' | 'cnc';
export type InputSize = 'sm' | 'default' | 'lg';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helpText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  step?: number
  variant?: InputVariant
  inputSize?: InputSize
  showPasswordToggle?: boolean
  onPasswordToggle?: (visible: boolean) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className, 
    type = 'text', 
    error, 
    label, 
    helpText, 
    startIcon, 
    endIcon, 
    leftAddon,
    rightAddon,
    disabled, 
    style, 
    step = 1, 
    value, 
    onChange, 
    min, 
    max, 
    variant = 'default',
    inputSize = 'default',
    showPasswordToggle = false,
    onPasswordToggle,
    ...props
  }, ref) => {
    const inputId = React.useId();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const formFieldContext = React.useContext(FormFieldContext);
    
    // Icon components
    const SearchIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    );
    
    const PasswordToggleIcon = ({ visible }: { visible: boolean }) => (
      <button
        type="button"
        onClick={handlePasswordToggle}
        style={{
          background: 'none',
          border: 'none',
          color: tokens.colors.text.secondary,
          cursor: 'pointer',
          padding: tokens.spacing.xs,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = tokens.colors.text.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = tokens.colors.text.secondary;
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {visible ? (
            <>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </>
          ) : (
            <>
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </>
          )}
        </svg>
      </button>
    );
    
    // Determine final type based on variant and password visibility
    const finalType = React.useMemo(() => {
      if (variant === 'password') {
        return passwordVisible ? 'text' : 'password';
      }
      if (variant === 'search') return 'search';
      if (variant === 'number') return 'number';
      return type;
    }, [variant, type, passwordVisible]);
    
    // Auto-configure for variants
    const variantConfig = React.useMemo(() => {
      const configs = {
        search: {
          startIcon: startIcon || <SearchIcon />,
          placeholder: 'Search...',
        },
        password: {
          endIcon: showPasswordToggle ? <PasswordToggleIcon visible={passwordVisible} /> : endIcon,
        },
        number: {
          style: { fontFamily: tokens.text.family.mono.join(', ') },
        },
        cnc: {
          style: { fontFamily: tokens.text.family.mono.join(', '), textAlign: 'center' as const },
        },
        default: {},
      };
      
      return configs[variant] || configs.default;
    }, [variant, startIcon, endIcon, showPasswordToggle, passwordVisible]);

    // Determine if we should show number arrows
    const showNumberArrows = (finalType === 'number' || variant === 'number') && !disabled && !endIcon && !variantConfig.endIcon;
    
    // Get token-based styles
    const baseStyles = getInputBaseStyles();
    const sizeStyles = getInputSizeStyles(inputSize);
    const variantStyles = getInputVariantStyles(variant, !!error);
    const disabledStyles = disabled ? getInputDisabledStyles() : {};
    const focusStyles = isFocused ? getInputFocusStyles(variant, !!error) : {};
    
    // Calculate padding based on what elements are present
    const getPadding = () => {
      const base = sizeStyles.padding as string;
      const [vertical, horizontal] = base.split(' ');
      const v = parseInt(vertical);
      const h = parseInt(horizontal);
      
      const hasLeftIcon = startIcon || variantConfig.startIcon || leftAddon;
      const hasRightIcon = endIcon || variantConfig.endIcon || rightAddon || showNumberArrows;
      
      const leftPadding = hasLeftIcon ? h + (leftAddon ? 40 : 28) : h;
      const rightPadding = hasRightIcon ? h + (rightAddon ? 40 : showNumberArrows ? 34 : 28) : h;
      
      return `${v}px ${rightPadding}px ${v}px ${leftPadding}px`;
    };

    const inputStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...disabledStyles,
      padding: getPadding(),
      borderRadius: variant === 'cnc' ? tokens.radius.lg : tokens.radius.default,
      ...variantConfig.style,
      ...style,
    };

    // Focus styles are already computed above

    const containerStyle: React.CSSProperties = {
      width: '100%',
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      fontSize: '0.875rem', // 14px
      fontWeight: tokens.text.weight.medium,
      color: tokens.colors.text.primary,
      marginBottom: tokens.spacing.sm,
    };

    const iconContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: tokens.colors.text.secondary,
      pointerEvents: 'none',
    };

    const startIconStyle: React.CSSProperties = {
      ...iconContainerStyle,
      left: tokens.spacing.sm,
    };

    const endIconStyle: React.CSSProperties = {
      ...iconContainerStyle,
      right: tokens.spacing.sm,
    };

    // Number input arrow styles
    const arrowContainerStyles: React.CSSProperties = {
      position: 'absolute',
      right: tokens.spacing.xs,
      top: tokens.spacing.xs,
      bottom: tokens.spacing.xs,
      width: '30px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: `0 ${tokens.radius.sm} ${tokens.radius.sm} 0`,
      overflow: 'hidden',
      opacity: isHovered || isFocused ? 1 : 0.7,
      transform: isHovered || isFocused ? 'translateX(0)' : 'translateX(2px)',
      transition: tokens.transition.default,
    };

    const arrowButtonStyles: React.CSSProperties = {
      flex: 1,
      border: 'none',
      backgroundColor: tokens.colors.bg.quaternary,
      color: tokens.colors.text.primary,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem', // 12px
      transition: tokens.transition.smooth,
      borderLeft: `1px solid ${tokens.colors.border.primary}`,
      transformOrigin: 'center',
    };

    const handleNumberChange = (increment: boolean) => {
      if (!onChange || disabled) return;
      
      const currentValue = typeof value === 'string' ? parseFloat(value) : (value as number) || 0;
      const newValue = increment ? currentValue + step : currentValue - step;
      
      // Check min/max constraints
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;
      
      // Create synthetic event
      const syntheticEvent = {
        target: { value: newValue.toString() },
        currentTarget: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    };
    
    const handlePasswordToggle = () => {
      const newVisible = !passwordVisible;
      setPasswordVisible(newVisible);
      onPasswordToggle?.(newVisible);
    };

    return (
      <>
        {/* CSS to hide browser default number spinners */}
        {finalType === 'number' && (
          <style>{`
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
            
            input[type="number"]::-ms-clear,
            input[type="number"]::-ms-reveal {
              display: none !important;
            }
          `}</style>
        )}
        
        <div style={containerStyle}>
          {label && (
            <label htmlFor={inputId} style={labelStyle}>
              {label}
            </label>
          )}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {leftAddon && (
              <div style={{
                position: 'absolute',
                left: '1px',
                top: '1px',
                bottom: '1px',
                display: 'flex',
                alignItems: 'center',
                padding: `0 ${tokens.spacing.sm}`,
                backgroundColor: tokens.colors.bg.quaternary,
                borderRadius: `${tokens.radius.sm} 0 0 ${tokens.radius.sm}`,
                borderRight: `1px solid ${tokens.colors.border.primary}`,
                fontSize: '0.75rem', // 12px
                color: tokens.colors.text.secondary,
              }}>
                {leftAddon}
              </div>
            )}
            {(startIcon || variantConfig.startIcon) && (
              <div style={startIconStyle}>
                {startIcon || variantConfig.startIcon}
              </div>
            )}
            <input
              id={inputId}
              type={finalType}
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              step={step}
              placeholder={variantConfig.placeholder || props.placeholder}
              style={{ ...inputStyles, ...focusStyles }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className={className}
              ref={ref}
              {...props}
            />
            {(endIcon || variantConfig.endIcon) && !showNumberArrows && (
              <div style={endIconStyle}>
                {endIcon || variantConfig.endIcon}
              </div>
            )}
            {rightAddon && !showNumberArrows && (
              <div style={{
                position: 'absolute',
                right: '1px',
                top: '1px',
                bottom: '1px',
                display: 'flex',
                alignItems: 'center',
                padding: `0 ${tokens.spacing.sm}`,
                backgroundColor: tokens.colors.bg.quaternary,
                borderRadius: `0 ${tokens.radius.sm} ${tokens.radius.sm} 0`,
                borderLeft: `1px solid ${tokens.colors.border.primary}`,
                fontSize: '0.75rem', // 12px
                color: tokens.colors.text.secondary,
              }}>
                {rightAddon}
              </div>
            )}
            {showNumberArrows && (
              <div style={arrowContainerStyles}>
                <button
                  type="button"
                  style={arrowButtonStyles}
                  onClick={() => handleNumberChange(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                    e.currentTarget.style.color = tokens.colors.text.primary;
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = tokens.shadows.sm;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.colors.bg.quaternary;
                    e.currentTarget.style.color = tokens.colors.text.primary;
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  style={{...arrowButtonStyles, borderTop: `1px solid ${tokens.colors.border.primary}`}}
                  onClick={() => handleNumberChange(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                    e.currentTarget.style.color = tokens.colors.text.primary;
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = tokens.shadows.sm;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.colors.bg.quaternary;
                    e.currentTarget.style.color = tokens.colors.text.primary;
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                >
                  ▼
                </button>
              </div>
            )}
          </div>
          {error && !formFieldContext.handlesError && (
            <p style={{ 
              fontSize: '0.75rem', // 12px
              color: tokens.colors.status.error, 
              marginTop: tokens.spacing.xs,
              margin: `${tokens.spacing.xs} 0 0 0`
            }}>
              {error}
            </p>
          )}
          {helpText && !error && (
            <p style={{ 
              fontSize: '0.75rem', // 12px
              color: tokens.colors.text.secondary, 
              marginTop: tokens.spacing.xs,
              margin: `${tokens.spacing.xs} 0 0 0`
            }}>
              {helpText}
            </p>
          )}
        </div>
      </>
    );
  },
);
Input.displayName = 'Input';

// CNC-specific input variants
const CoordinateInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'> & {
  precision?: number
}>(
  ({ className, precision = 3, value, onChange, style, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Handle empty input
      if (inputValue === '' || inputValue === '-') {
        onChange?.(e);
        return;
      }
      
      const val = parseFloat(inputValue);
      if (!isNaN(val)) {
        onChange?.(e);
      }
    };

    const coordinateStyles: React.CSSProperties = {
      textAlign: 'center',
      fontSize: '1.125rem', // 18px
      fontWeight: tokens.text.weight.semibold,
      fontFamily: tokens.text.family.mono.join(', '),
      letterSpacing: '0.5px',
      ...style,
    };

    return (
      <Input
        ref={ref}
        type="number"
        step={Number(`0.${'0'.repeat(precision - 1)}1`)}
        value={value}
        onChange={handleChange}
        style={coordinateStyles}
        className={className}
        {...props}
      />
    );
  },
);
CoordinateInput.displayName = 'CoordinateInput';

const PrecisionInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'> & {
  precision?: number
}>(
  ({ className, precision = 3, value, onChange, style, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Handle empty input
      if (inputValue === '' || inputValue === '-') {
        onChange?.(e);
        return;
      }
      
      const val = parseFloat(inputValue);
      if (!isNaN(val)) {
        const rounded = Number(val.toFixed(precision));
        const event = { ...e, target: { ...e.target, value: rounded.toString() } };
        onChange?.(event as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const precisionStyles: React.CSSProperties = {
      textAlign: 'right',
      fontFamily: tokens.text.family.mono.join(', '),
      fontWeight: tokens.text.weight.medium,
      ...style,
    };

    return (
      <Input
        ref={ref}
        type="number"
        step={Number(`0.${'0'.repeat(precision - 1)}1`)}
        value={value}
        onChange={handleChange}
        style={precisionStyles}
        className={className}
        {...props}
      />
    );
  },
);
PrecisionInput.displayName = 'PrecisionInput';

export { Input, CoordinateInput, PrecisionInput, type InputProps };