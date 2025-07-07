import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { 
  tokens, 
  getButtonVariantStyles, 
  getButtonSizeStyles, 
  getButtonBaseStyles 
} from '../../utils/tokens';
import '../../../../theme/src/css/global.css';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition transform-gpu ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95 group select-none',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        destructive: 'emergency-button text-white',
        outline: 'border border-gray-500 bg-transparent text-white hover:bg-gray-800',
        secondary: 'btn-secondary',
        tertiary: 'bg-gray-700 text-white hover:bg-gray-600',
        subtle: 'border border-gray-600 bg-gray-800/20 text-white hover:bg-gray-700/50',
        ghost: 'text-white hover:bg-gray-800',
        link: 'text-blue-400 underline-offset-4 hover:underline bg-transparent',
        white: 'bg-white text-black hover:bg-gray-200',
        cnc: 'cnc-panel text-white border-2 border-gray-600',
        emergency: 'emergency-button text-white',
        success: 'machine-ready text-white',
        warning: 'machine-warning text-white',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm rounded-md',
        sm: 'h-8 px-3 text-xs rounded',
        lg: 'h-10 px-8 text-base rounded-lg',
        xl: 'h-12 px-10 text-lg rounded-lg',
        icon: 'h-8 w-8 p-0 rounded',
        iconlg: 'h-10 w-10 p-0 rounded-md',
        jog: 'h-9 w-9 p-2 rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  iconl?: React.ReactNode;
  iconr?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

// Token-based inline styles using design system
const getInlineStyles = (variant: string = 'default', size: string = 'default') => {
  return {
    ...getButtonBaseStyles(),
    ...getButtonSizeStyles(size),
    ...getButtonVariantStyles(variant),
  };
};

// Token-based loading spinner component
const LoadingSpinner = ({ size }: { size?: string }) => {
  // Use design tokens for spinner sizes
  const spinnerSizes = {
    sm: '0.75rem',       // 12px
    default: '1rem',     // 16px
    lg: '1.25rem',       // 20px
    xl: '1.5rem',        // 24px
  };
  
  const spinnerSize = spinnerSizes[size as keyof typeof spinnerSizes] || spinnerSizes.default;
  
  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: tokens.radius.full,
        animation: tokens.animation.spin,
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    iconl, 
    iconr, 
    leftIcon,
    rightIcon,
    loading = false,
    loadingText,
    className, 
    variant, 
    size, 
    asChild = false, 
    children, 
    style, 
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const inlineStyles = getInlineStyles(variant, size);
    
    // Use new props if provided, fallback to legacy props
    const finalLeftIcon = leftIcon || iconl;
    const finalRightIcon = rightIcon || iconr;
    
    // Determine button content when loading
    const buttonContent = loading ? (loadingText || children || 'Loading') : children;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...inlineStyles, ...style }}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span style={{ marginRight: tokens.spacing.sm, display: 'inline-flex', alignItems: 'center' }}>
            <LoadingSpinner size={size} />
          </span>
        )}
        {!loading && finalLeftIcon && (
          <span style={{ marginRight: tokens.spacing.sm, display: 'inline-flex', alignItems: 'center' }}>
            {finalLeftIcon}
          </span>
        )}
        {buttonContent}
        {!loading && finalRightIcon && (
          <span style={{ marginLeft: tokens.spacing.sm, display: 'inline-flex', alignItems: 'center' }}>
            {finalRightIcon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };