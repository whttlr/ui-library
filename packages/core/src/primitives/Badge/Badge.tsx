import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { 
  tokens, 
  getBadgeVariantStyles, 
  getBadgeSizeStyles, 
  getBadgeBaseStyles,
  getBadgeIndicatorColor
} from '../../utils/tokens';

// Token-based inline styles for Badge variants
const getBadgeInlineStyles = (variant: string = 'default', size: string = 'default') => {
  return {
    ...getBadgeBaseStyles(),
    ...getBadgeSizeStyles(size),
    ...getBadgeVariantStyles(variant),
  };
};

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default badge',
  {
    variants: {
      variant: {
        // Solid filled variants
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
        destructive: 'border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30',
        success: 'border-transparent bg-green-500/20 text-green-300 hover:bg-green-500/30',
        warning: 'border-transparent bg-amber-500/20 text-amber-300 hover:bg-amber-500/30',
        danger: 'border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30',
        info: 'border-transparent bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
        
        // Outline only variants
        'outline-default': 'border-primary bg-transparent text-primary hover:bg-primary/10',
        'outline-secondary': 'border-gray-500 bg-transparent text-gray-400 hover:bg-gray-500/10',
        'outline-success': 'border-green-500 bg-transparent text-green-400 hover:bg-green-500/10',
        'outline-warning': 'border-amber-500 bg-transparent text-amber-400 hover:bg-amber-500/10',
        'outline-danger': 'border-red-500 bg-transparent text-red-400 hover:bg-red-500/10',
        'outline-info': 'border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500/10',
        
        // Bright variants - bright outline with low opacity background
        'bright-default': 'border-primary bg-primary/12 text-primary hover:bg-primary/20',
        'bright-secondary': 'border-gray-400 bg-gray-400/12 text-gray-400 hover:bg-gray-400/20',
        'bright-success': 'border-green-500 bg-green-500/12 text-green-500 hover:bg-green-500/20',
        'bright-warning': 'border-amber-500 bg-amber-500/12 text-amber-500 hover:bg-amber-500/20',
        'bright-danger': 'border-red-500 bg-red-500/12 text-red-500 hover:bg-red-500/20',
        'bright-info': 'border-blue-500 bg-blue-500/12 text-blue-500 hover:bg-blue-500/20',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean
  showIndicator?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({
  className, variant, size, pulse, showIndicator, style, children, ...props
}, ref) => {
  const inlineStyles = getBadgeInlineStyles(variant, size);
  
  // Get indicator color based on variant using tokens
  const indicatorColor = getBadgeIndicatorColor(variant);

  const indicatorStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: indicatorColor,
    marginRight: tokens.spacing.xs,
    flexShrink: 0,
    animation: pulse ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : undefined,
  };

  const containerStyle: React.CSSProperties = {
    ...inlineStyles,
    display: 'inline-flex',
    alignItems: 'center',
    ...style,
  };
  
  return (
    <>
      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          className,
        )}
        style={containerStyle}
        {...props}
      >
        {showIndicator && <div style={indicatorStyle} />}
        {children}
      </div>
    </>
  );
});
Badge.displayName = 'Badge';

// CNC-specific badge variants
const StatusBadge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & {
    status: 'connected' | 'disconnected' | 'idle' | 'running' | 'error' | 'warning'
  }
>(({ status, className, ...props }, ref) => {
  const statusConfig = {
    connected: { variant: 'success' as const, text: 'Connected', pulse: false },
    disconnected: { variant: 'danger' as const, text: 'Disconnected', pulse: false },
    idle: { variant: 'outline-secondary' as const, text: 'Idle', pulse: false },
    running: { variant: 'info' as const, text: 'Running', pulse: true },
    error: { variant: 'danger' as const, text: 'Error', pulse: true },
    warning: { variant: 'warning' as const, text: 'Warning', pulse: true },
  };

  const config = statusConfig[status];

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      pulse={false}
      className={cn('font-medium', className)}
      {...props}
    >
      <div 
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          marginRight: tokens.spacing.xs,
          backgroundColor: getBadgeIndicatorColor(config.variant),
          animation: config.pulse ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
        }}
      />
      {config.text}
    </Badge>
  );
});
StatusBadge.displayName = 'StatusBadge';

const PrecisionBadge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & {
    precision: 'high' | 'medium' | 'low'
  }
>(({ precision, className, ...props }, ref) => {
  const precisionConfig = {
    high: { variant: 'success' as const, text: 'High Precision' },
    medium: { variant: 'warning' as const, text: 'Medium Precision' },
    low: { variant: 'danger' as const, text: 'Low Precision' },
  };

  const config = precisionConfig[precision];

  return (
    <Badge
      ref={ref}
      variant={config.variant}
      size="sm"
      className={cn('text-xs', className)}
      style={{
        fontFamily: tokens.text.family.mono.join(', '),
        ...props.style,
      }}
      {...props}
    >
      {config.text}
    </Badge>
  );
});
PrecisionBadge.displayName = 'PrecisionBadge';

export {
  Badge, badgeVariants, StatusBadge, PrecisionBadge,
};