import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const radioGroupVariants = cva(
  'flex flex-col gap-2',
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
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row flex-wrap',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      orientation: 'vertical',
    },
  }
);

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof radioGroupVariants> {
  label?: string;
  name?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Get variant color styles using tokens
const getRadioVariantStyles = (variant: string = 'default', selected: boolean = false) => {
  const variantColors = {
    default: tokens.colors.primary.main,
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    info: tokens.colors.status.info,
  };
  
  const activeColor = variantColors[variant as keyof typeof variantColors] || variantColors.default;
  
  return {
    borderColor: selected ? activeColor : tokens.colors.border.primary,
    color: activeColor,
  };
};

// Get size-based styles using tokens
const getRadioSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      width: '16px',
      height: '16px',
      dotSize: '6px',
      fontSize: tokens.text.size.sm[0],
      gap: tokens.spacing.sm,
    },
    md: {
      width: '18px',
      height: '18px',
      dotSize: '8px',
      fontSize: tokens.text.size.base[0],
      gap: tokens.spacing.sm,
    },
    lg: {
      width: '20px',
      height: '20px',
      dotSize: '10px',
      fontSize: tokens.text.size.lg[0],
      gap: tokens.spacing.md,
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Label styles
const getGroupLabelStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.sm,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Option label styles
const getOptionLabelStyles = (size: string = 'md', disabled: boolean = false): React.CSSProperties => ({
  fontSize: getRadioSizeStyles(size).fontSize,
  color: disabled ? tokens.colors.text.disabled : tokens.colors.text.primary,
  fontFamily: tokens.text.family.sans.join(', '),
  cursor: disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
});

// Description styles
const getDescriptionStyles = (disabled: boolean = false): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  color: disabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
  fontFamily: tokens.text.family.sans.join(', '),
  marginTop: tokens.spacing.xs,
  lineHeight: '1.4',
});

// Error message styles
const getErrorStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.xs[0],
  color: tokens.colors.status.error,
  marginTop: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    orientation = 'vertical',
    style,
    label,
    name,
    options,
    value,
    onChange,
    error,
    required,
    disabled,
    ...props 
  }, ref) => {
    const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);
    const [focusedOption, setFocusedOption] = React.useState<string | null>(null);
    
    const sizeStyles = getRadioSizeStyles(size);
    const groupName = name || `radio-group-${React.useId()}`;
    
    const handleOptionChange = (optionValue: string) => {
      if (disabled) return;
      onChange?.(optionValue);
    };
    
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: orientation === 'vertical' ? tokens.spacing.sm : tokens.spacing.md,
      flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
    };
    
    const getRadioStyles = (optionValue: string, isSelected: boolean, isDisabled: boolean): React.CSSProperties => {
      const variantStyles = getRadioVariantStyles(variant, isSelected);
      const isHovered = hoveredOption === optionValue;
      const isFocused = focusedOption === optionValue;
      
      return {
        width: sizeStyles.width,
        height: sizeStyles.height,
        borderRadius: '50%',
        border: `2px solid ${variantStyles.borderColor}`,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: tokens.transition.default,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        flexShrink: 0,
        position: 'relative',
        transform: isHovered && !isDisabled ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isFocused ? `0 0 0 2px ${variantStyles.color}20` : 'none',
      };
    };
    
    const getDotStyles = (isSelected: boolean, isDisabled: boolean): React.CSSProperties => {
      const variantStyles = getRadioVariantStyles(variant, isSelected);
      
      return {
        width: sizeStyles.dotSize,
        height: sizeStyles.dotSize,
        borderRadius: '50%',
        backgroundColor: variantStyles.color,
        opacity: isSelected && !isDisabled ? 1 : 0,
        transition: tokens.transition.default,
        transform: isSelected ? 'scale(1)' : 'scale(0.5)',
      };
    };
    
    const getOptionContainerStyles = (isDisabled: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'flex-start',
      gap: sizeStyles.gap,
      opacity: isDisabled ? 0.5 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    });
    
    const hiddenInputStyles: React.CSSProperties = {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        {label && (
          <label style={getGroupLabelStyles()}>
            {label}
            {required && <span style={{ color: tokens.colors.status.error }}> *</span>}
          </label>
        )}
        
        <div 
          ref={ref}
          role="radiogroup"
          aria-labelledby={label ? `${groupName}-label` : undefined}
          aria-invalid={!!error}
          className={cn(radioGroupVariants({ variant, size, orientation }), className)}
          style={{
            ...containerStyles,
            ...style,
          }}
          {...props}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            const isDisabled = disabled || option.disabled;
            const optionId = `${groupName}-${option.value}`;
            
            return (
              <label
                key={option.value}
                style={getOptionContainerStyles(isDisabled)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div style={getRadioStyles(option.value, isSelected, isDisabled)}>
                  <input
                    type="radio"
                    name={groupName}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleOptionChange(option.value)}
                    disabled={isDisabled}
                    style={hiddenInputStyles}
                    onFocus={() => setFocusedOption(option.value)}
                    onBlur={() => setFocusedOption(null)}
                    aria-describedby={option.description ? `${optionId}-description` : undefined}
                  />
                  <div style={getDotStyles(isSelected, isDisabled)} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={getOptionLabelStyles(size, isDisabled)}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div 
                      id={`${optionId}-description`}
                      style={getDescriptionStyles(isDisabled)}
                    >
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
        
        {error && (
          <p style={getErrorStyles()} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup, radioGroupVariants };