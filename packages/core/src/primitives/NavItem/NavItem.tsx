import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const navItemVariants = cva(
  'flex items-center gap-3 transition-all duration-200 cursor-pointer text-left w-full border-none',
  {
    variants: {
      variant: {
        default: '',
        subtle: '',
        bordered: '',
        pill: '',
      },
      size: {
        sm: 'px-2 py-1.5 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
      },
      state: {
        default: '',
        active: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface NavItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof navItemVariants> {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Base styles
const getBaseStyles = (
  variant: string = 'default',
  size: string = 'md',
  active: boolean = false,
  disabled: boolean = false
): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: tokens.text.size.xs[0],
      gap: tokens.spacing.sm,
    },
    md: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.text.size.sm[0],
      gap: tokens.spacing.sm,
    },
    lg: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      fontSize: tokens.text.size.base[0],
      gap: tokens.spacing.md,
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: active ? tokens.colors.primary.main : 'transparent',
      color: active ? tokens.colors.primary.contrast : tokens.colors.text.primary,
      borderRadius: tokens.radius.md,
    },
    subtle: {
      backgroundColor: active ? tokens.colors.bg.tertiary : 'transparent',
      color: active ? tokens.colors.text.primary : tokens.colors.text.secondary,
      borderRadius: tokens.radius.md,
    },
    bordered: {
      backgroundColor: active ? tokens.colors.primary.main : 'transparent',
      color: active ? tokens.colors.primary.contrast : tokens.colors.text.primary,
      border: `1px solid ${active ? tokens.colors.primary.main : tokens.colors.border.default}`,
      borderRadius: tokens.radius.md,
    },
    pill: {
      backgroundColor: active ? tokens.colors.primary.main : 'transparent',
      color: active ? tokens.colors.primary.contrast : tokens.colors.text.primary,
      borderRadius: tokens.radius.full,
    },
  };

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;
  const baseVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;

  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: tokens.text.weight.medium,
    fontFamily: tokens.text.family.sans.join(', '),
    textAlign: 'left',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.5 : 1,
    ...baseSize,
    ...baseVariant,
  };
};

// Hover styles
const getHoverStyles = (
  variant: string = 'default',
  active: boolean = false,
  disabled: boolean = false
): React.CSSProperties => {
  if (disabled || active) return {};

  const hoverStyles = {
    default: {
      backgroundColor: tokens.colors.bg.hover,
    },
    subtle: {
      backgroundColor: tokens.colors.bg.secondary,
    },
    bordered: {
      backgroundColor: tokens.colors.bg.hover,
      borderColor: tokens.colors.border.hover,
    },
    pill: {
      backgroundColor: tokens.colors.bg.hover,
    },
  };

  return hoverStyles[variant as keyof typeof hoverStyles] || hoverStyles.default;
};

// Icon styles
const getIconStyles = (size: string = 'md'): React.CSSProperties => {
  const iconSizes = {
    sm: { width: '14px', height: '14px' },
    md: { width: '18px', height: '18px' },
    lg: { width: '20px', height: '20px' },
  };

  const iconSize = iconSizes[size as keyof typeof iconSizes] || iconSizes.md;

  return {
    ...iconSize,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

// Badge styles
const getBadgeStyles = (size: string = 'md'): React.CSSProperties => {
  const badgeSizes = {
    sm: {
      fontSize: tokens.text.size.xs[0],
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      minWidth: '16px',
      height: '16px',
    },
    md: {
      fontSize: tokens.text.size.xs[0],
      padding: `2px ${tokens.spacing.sm}`,
      minWidth: '18px',
      height: '18px',
    },
    lg: {
      fontSize: tokens.text.size.sm[0],
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      minWidth: '20px',
      height: '20px',
    },
  };

  const badgeSize = badgeSizes[size as keyof typeof badgeSizes] || badgeSizes.md;

  return {
    ...badgeSize,
    backgroundColor: tokens.colors.status.error,
    color: tokens.colors.text.contrast,
    borderRadius: tokens.radius.full,
    fontWeight: tokens.text.weight.bold,
    fontFamily: tokens.text.family.mono.join(', '),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  };
};

// Label container styles
const getLabelContainerStyles = (): React.CSSProperties => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
});

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    state,
    style,
    label,
    icon,
    active = false,
    disabled = false,
    badge,
    href,
    onClick,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      if (!disabled && !active) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    };

    const baseStyles = getBaseStyles(variant, size, active, disabled);
    const hoverStyles = isHovered ? getHoverStyles(variant, active, disabled) : {};

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...hoverStyles,
      ...style,
    };

    return (
      <button
        ref={ref}
        className={cn(navItemVariants({ variant, size, state: disabled ? 'disabled' : active ? 'active' : 'default' }), className)}
        style={combinedStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {icon && (
          <div style={getIconStyles(size)}>
            {icon}
          </div>
        )}
        
        <div style={getLabelContainerStyles()}>
          {label}
        </div>
        
        {badge && (
          <div style={getBadgeStyles(size)}>
            {badge}
          </div>
        )}
      </button>
    );
  }
);

NavItem.displayName = 'NavItem';

export { NavItem, navItemVariants };