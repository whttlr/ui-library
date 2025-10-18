import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Eye, EyeOff } from 'lucide-react';

const textInputVariants = cva(
  'relative w-full transition-all duration-200 ease-in-out',
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

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textInputVariants> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
}

// Get size-based styles using tokens
const getTextInputSizeStyles = (size: string = 'md', hasIcon: boolean = false): React.CSSProperties => {
  const iconPadding = hasIcon ? tokens.spacing.xl : tokens.spacing.md;
  
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      height: tokens.input.height.sm,
      fontSize: tokens.text.size.sm[0],
      padding: `${tokens.spacing.xs} ${tokens.spacing.md} ${tokens.spacing.xs} ${iconPadding}`,
    },
    md: {
      height: tokens.input.height.md,
      fontSize: tokens.text.size.base[0],
      padding: `${tokens.spacing.sm} ${tokens.spacing.md} ${tokens.spacing.sm} ${iconPadding}`,
    },
    lg: {
      height: tokens.input.height.lg,
      fontSize: tokens.text.size.lg[0],
      padding: `${tokens.spacing.md} ${tokens.spacing.lg} ${tokens.spacing.md} ${iconPadding}`,
    },
  };
  
  return styles[size] || styles.md;
};

// Get variant-based styles using tokens
const getTextInputVariantStyles = (variant: string = 'default', error?: string): React.CSSProperties => {
  const isError = variant === 'error' || !!error;
  
  return {
    backgroundColor: tokens.colors.bg.secondary,
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${isError ? tokens.colors.status.error : tokens.colors.border.primary}`,
    fontFamily: tokens.text.family.sans.join(', '),
    outline: 'none',
    transition: tokens.transition.default,
    width: '100%',
  };
};

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

// Icon styles
const getIconStyles = (size: string = 'md'): React.CSSProperties => ({
  position: 'absolute',
  left: tokens.spacing.md,
  top: '50%',
  transform: 'translateY(-50%)',
  color: tokens.colors.text.secondary,
  pointerEvents: 'none',
  fontSize: size === 'sm' ? tokens.text.size.sm[0] : tokens.text.size.base[0],
});

// Password toggle button styles
const getPasswordToggleStyles = (size: string = 'md'): React.CSSProperties => ({
  position: 'absolute',
  right: tokens.spacing.md,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: tokens.colors.text.secondary,
  cursor: 'pointer',
  padding: tokens.spacing.xs,
  borderRadius: tokens.radius.sm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: tokens.transition.default,
});

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    className, 
    variant, 
    size = 'md', 
    style,
    label,
    error,
    icon,
    type = 'text',
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const hasIcon = !!icon;
    const hasPasswordToggle = isPassword;
    
    // Adjust padding for password toggle
    const inputPadding = hasPasswordToggle ? 
      `${tokens.spacing.sm} 40px ${tokens.spacing.sm} ${hasIcon ? tokens.spacing.xl : tokens.spacing.md}` :
      undefined;
    
    const inputStyles: React.CSSProperties = {
      ...getTextInputSizeStyles(size, hasIcon),
      ...getTextInputVariantStyles(variant, error),
      ...(inputPadding && { padding: inputPadding }),
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    };
    
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
    };
    
    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label style={getLabelStyles()}>
            {label}
          </label>
        )}
        
        <div style={containerStyles}>
          {hasIcon && (
            <div style={getIconStyles(size)}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(textInputVariants({ variant, size }), className)}
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
          
          {hasPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={getPasswordToggleStyles(size)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                e.currentTarget.style.color = tokens.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = tokens.colors.text.secondary;
              }}
              disabled={disabled}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        
        {error && (
          <p style={getErrorStyles()}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput, textInputVariants };