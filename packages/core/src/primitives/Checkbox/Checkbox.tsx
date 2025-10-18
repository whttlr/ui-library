import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Check, Minus } from 'lucide-react';

const checkboxVariants = cva(
  'inline-flex items-center gap-2 cursor-pointer select-none transition-all duration-200 ease-in-out',
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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  description?: string;
  indeterminate?: boolean;
  error?: string;
  onCheckedChange?: (checked: boolean) => void;
}

// Get variant color styles using tokens
const getCheckboxVariantStyles = (variant: string = 'default', checked: boolean = false) => {
  const variantColors = {
    default: tokens.colors.primary.main,
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    info: tokens.colors.status.info,
  };
  
  const activeColor = variantColors[variant as keyof typeof variantColors] || variantColors.default;
  
  return {
    borderColor: checked ? activeColor : tokens.colors.border.primary,
    backgroundColor: checked ? activeColor : 'transparent',
    color: activeColor,
  };
};

// Get size-based styles using tokens
const getCheckboxSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      width: '16px',
      height: '16px',
      iconSize: 12,
      fontSize: tokens.text.size.sm[0],
    },
    md: {
      width: '18px',
      height: '18px',
      iconSize: 14,
      fontSize: tokens.text.size.base[0],
    },
    lg: {
      width: '20px',
      height: '20px',
      iconSize: 16,
      fontSize: tokens.text.size.lg[0],
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Label styles
const getLabelStyles = (size: string = 'md', disabled: boolean = false): React.CSSProperties => ({
  fontSize: getCheckboxSizeStyles(size).fontSize,
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

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    label,
    description,
    indeterminate = false,
    error,
    disabled,
    checked,
    onCheckedChange,
    onChange,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const sizeStyles = getCheckboxSizeStyles(size);
    const variantStyles = getCheckboxVariantStyles(variant, checked || indeterminate);
    const isChecked = checked || indeterminate;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };
    
    const checkboxStyles: React.CSSProperties = {
      width: sizeStyles.width,
      height: sizeStyles.height,
      borderRadius: tokens.radius.sm,
      border: `2px solid ${variantStyles.borderColor}`,
      backgroundColor: variantStyles.backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: tokens.transition.default,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      flexShrink: 0,
      position: 'relative',
      transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
      boxShadow: isFocused ? `0 0 0 2px ${variantStyles.color}20` : 'none',
    };
    
    const hiddenInputStyles: React.CSSProperties = {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };
    
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: tokens.spacing.sm,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        <label 
          style={containerStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={checkboxStyles}>
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className={cn(checkboxVariants({ variant, size }), className)}
              style={{
                ...hiddenInputStyles,
                ...style,
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            
            {isChecked && (
              <div style={{ 
                color: checked ? 'white' : variantStyles.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {indeterminate ? (
                  <Minus size={sizeStyles.iconSize} />
                ) : (
                  <Check size={sizeStyles.iconSize} />
                )}
              </div>
            )}
          </div>
          
          {label && (
            <div style={{ flex: 1 }}>
              <div style={getLabelStyles(size, disabled)}>
                {label}
              </div>
              {description && (
                <div style={getDescriptionStyles(disabled)}>
                  {description}
                </div>
              )}
            </div>
          )}
        </label>
        
        {error && (
          <p style={getErrorStyles()}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };