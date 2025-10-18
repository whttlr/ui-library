import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const notificationItemVariants = cva(
  'relative flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200',
  {
    variants: {
      type: {
        info: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
        warning: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100',
        error: 'border-red-200 bg-red-50 hover:bg-red-100',
        success: 'border-green-200 bg-green-50 hover:bg-green-100',
      },
      read: {
        true: 'opacity-70',
        false: '',
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
    },
    defaultVariants: {
      type: 'info',
      read: false,
      size: 'md',
    },
  }
);

export interface NotificationItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof notificationItemVariants> {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date | string;
  read?: boolean;
  showUnreadIndicator?: boolean;
  icon?: React.ReactNode;
  onMarkAsRead?: (id: string) => void;
  onClick?: (id: string, notification: NotificationItemProps) => void;
}

// Get notification type color using tokens
const getNotificationTypeColor = (type: string) => {
  const colors = {
    info: tokens.colors.status.info,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    success: tokens.colors.status.success,
  };
  return colors[type as keyof typeof colors] || colors.info;
};

// Get notification icon
const getNotificationIcon = (type: string, customIcon?: React.ReactNode) => {
  if (customIcon) return customIcon;
  
  const iconSize = 20;
  const icons = {
    info: <Info size={iconSize} />,
    warning: <AlertTriangle size={iconSize} />,
    error: <AlertCircle size={iconSize} />,
    success: <CheckCircle size={iconSize} />,
  };
  return icons[type as keyof typeof icons] || icons.info;
};

// Container styles
const getContainerStyles = (
  type: string = 'info',
  read: boolean = false,
  size: string = 'md'
): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      padding: tokens.spacing.sm,
      fontSize: tokens.text.size.sm[0],
    },
    md: {
      padding: tokens.spacing.md,
      fontSize: tokens.text.size.base[0],
    },
    lg: {
      padding: tokens.spacing.lg,
      fontSize: tokens.text.size.lg[0],
    },
  };

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
    ...baseSize,
    backgroundColor: read ? tokens.colors.bg.secondary : tokens.colors.bg.tertiary,
    border: `1px solid ${tokens.colors.border.default}`,
    borderRadius: tokens.radius.lg,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    opacity: read ? 0.7 : 1,
    borderLeftWidth: '4px',
    borderLeftColor: getNotificationTypeColor(type),
  };
};

// Icon container styles
const getIconContainerStyles = (type: string = 'info'): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: getNotificationTypeColor(type),
  marginTop: tokens.spacing.xs,
});

// Content styles
const getContentStyles = (): React.CSSProperties => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
});

// Title styles
const getTitleStyles = (read: boolean = false, size: string = 'md'): React.CSSProperties => {
  const sizeStyles = {
    sm: {
      fontSize: tokens.text.size.sm[0],
    },
    md: {
      fontSize: tokens.text.size.base[0],
    },
    lg: {
      fontSize: tokens.text.size.lg[0],
    },
  };

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    fontWeight: read ? tokens.text.weight.medium : tokens.text.weight.semibold,
    color: read ? tokens.colors.text.secondary : tokens.colors.text.primary,
    margin: 0,
    lineHeight: tokens.text.lineHeight.tight,
    fontFamily: tokens.text.family.sans.join(', '),
  };
};

// Message styles
const getMessageStyles = (size: string = 'md'): React.CSSProperties => {
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

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    color: tokens.colors.text.secondary,
    margin: 0,
    lineHeight: tokens.text.lineHeight.relaxed,
    fontFamily: tokens.text.family.sans.join(', '),
  };
};

// Timestamp styles
const getTimestampStyles = (size: string = 'md'): React.CSSProperties => {
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

  const baseSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return {
    ...baseSize,
    color: tokens.colors.text.tertiary,
    fontFamily: tokens.text.family.sans.join(', '),
    fontWeight: tokens.text.weight.normal,
  };
};

// Unread indicator styles
const getUnreadIndicatorStyles = (size: string = 'md'): React.CSSProperties => {
  const indicatorSizes = {
    sm: {
      width: '6px',
      height: '6px',
    },
    md: {
      width: '8px',
      height: '8px',
    },
    lg: {
      width: '10px',
      height: '10px',
    },
  };

  const indicatorSize = indicatorSizes[size as keyof typeof indicatorSizes] || indicatorSizes.md;

  return {
    ...indicatorSize,
    borderRadius: '50%',
    backgroundColor: tokens.colors.primary.main,
    flexShrink: 0,
    marginTop: tokens.spacing.xs,
  };
};

// Hover styles
const getHoverStyles = (read: boolean = false): React.CSSProperties => ({
  backgroundColor: read ? tokens.colors.bg.tertiary : tokens.colors.bg.hover,
});

// Format timestamp
const formatTimestamp = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const NotificationItem = React.forwardRef<HTMLDivElement, NotificationItemProps>(
  ({ 
    className, 
    type = 'info', 
    read = false,
    size = 'md',
    style,
    id,
    title,
    message,
    timestamp,
    showUnreadIndicator = true,
    icon,
    onMarkAsRead,
    onClick,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClick = () => {
      if (!read && onMarkAsRead) {
        onMarkAsRead(id);
      }
      if (onClick) {
        onClick(id, { id, title, message, type, timestamp, read });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const baseStyles = getContainerStyles(type, read, size);
    const hoverStyles = isHovered ? getHoverStyles(read) : {};

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...hoverStyles,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cn(notificationItemVariants({ type, read, size }), className)}
        style={combinedStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-read={read}
        {...props}
      >
        {/* Icon */}
        <div style={getIconContainerStyles(type)}>
          {getNotificationIcon(type, icon)}
        </div>
        
        {/* Content */}
        <div style={getContentStyles()}>
          <h4 style={getTitleStyles(read, size)}>
            {title}
          </h4>
          <p style={getMessageStyles(size)}>
            {message}
          </p>
          <span style={getTimestampStyles(size)}>
            {formatTimestamp(timestamp)}
          </span>
        </div>
        
        {/* Unread indicator */}
        {!read && showUnreadIndicator && (
          <div style={getUnreadIndicatorStyles(size)} />
        )}
      </div>
    );
  }
);

NotificationItem.displayName = 'NotificationItem';

export { NotificationItem, notificationItemVariants };