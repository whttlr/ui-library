import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { ChevronRight } from 'lucide-react';

const activityItemVariants = cva(
  'flex items-center gap-4 transition-colors duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'hover:bg-slate-800/50',
        subtle: 'hover:bg-slate-800/30',
        bordered: 'border-b border-slate-800 hover:bg-slate-800/50',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ActivityItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof activityItemVariants> {
  icon?: React.ReactNode;
  iconColor?: string;
  title: string;
  time: string;
  showChevron?: boolean;
  borderBottom?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Container styles
const getContainerStyles = (
  variant: string = 'default',
  size: string = 'md',
  borderBottom: boolean = false
): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    },
    md: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    },
    lg: {
      padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
    },
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: borderBottom ? `1px solid ${tokens.colors.border.default}` : 'none',
  };
};

// Icon container styles
const getIconContainerStyles = (iconColor?: string): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: iconColor || tokens.colors.text.primary,
});

// Content styles
const getContentStyles = (): React.CSSProperties => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
  minWidth: 0,
});

// Title styles
const getTitleStyles = (size: string = 'md'): React.CSSProperties => {
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

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    fontWeight: tokens.text.weight.medium,
    color: tokens.colors.text.primary,
    fontFamily: tokens.text.family.sans.join(', '),
    lineHeight: tokens.text.lineHeight.tight,
    margin: 0,
  };
};

// Time styles
const getTimeStyles = (size: string = 'md'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      fontSize: tokens.text.size.xs[0],
    },
    md: {
      fontSize: tokens.text.size.xs[0],
    },
    lg: {
      fontSize: tokens.text.size.sm[0],
    },
  };

  const baseStyles = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseStyles,
    color: tokens.colors.text.secondary,
    fontFamily: tokens.text.family.sans.join(', '),
    lineHeight: tokens.text.lineHeight.tight,
    margin: 0,
  };
};

// Chevron styles
const getChevronStyles = (): React.CSSProperties => ({
  color: tokens.colors.text.secondary,
  flexShrink: 0,
});

const ActivityItem = React.forwardRef<HTMLDivElement, ActivityItemProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    icon,
    iconColor,
    title,
    time,
    showChevron = true,
    borderBottom = false,
    onClick,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const hoverStyles: React.CSSProperties = {
      backgroundColor: isHovered ? tokens.colors.bg.hover : 'transparent',
    };

    return (
      <div 
        ref={ref}
        className={cn(activityItemVariants({ variant, size }), className)}
        style={{
          ...getContainerStyles(variant, size, borderBottom),
          ...hoverStyles,
          ...style,
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        {...props}
      >
        {icon && (
          <div style={getIconContainerStyles(iconColor)}>
            {icon}
          </div>
        )}
        
        <div style={getContentStyles()}>
          <div style={getTitleStyles(size)}>
            {title}
          </div>
          <div style={getTimeStyles(size)}>
            {time}
          </div>
        </div>
        
        {showChevron && (
          <div style={getChevronStyles()}>
            <ChevronRight size={16} />
          </div>
        )}
      </div>
    );
  }
);

ActivityItem.displayName = 'ActivityItem';

export { ActivityItem, activityItemVariants };