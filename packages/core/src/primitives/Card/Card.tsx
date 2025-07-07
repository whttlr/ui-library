import * as React from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { cn } from '../../utils';
import { 
  tokens, 
  getCardVariantStyles, 
  getCardSizeStyles, 
  getCardBaseStyles 
} from '../../utils/tokens';

// Card variant types
export type CardVariant = 'default' | 'outline' | 'cnc' | 'metric' | 'settings' | 'activity' | 'dashboard';
export type CardSize = 'sm' | 'default' | 'lg';

// Token-based inline styles for Card variants
const getCardInlineStyles = (variant: CardVariant = 'default', size: CardSize = 'default', noPadding?: boolean) => {
  const paddingStyle = noPadding ? {} : { 
    padding: size === 'sm' ? tokens.card.padding.sm : size === 'lg' ? tokens.card.padding.lg : tokens.card.padding.md
  };

  return {
    ...getCardBaseStyles(),
    ...getCardSizeStyles(size),
    ...getCardVariantStyles(variant),
    ...paddingStyle,
  };
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  noPadding?: boolean;
  interactive?: boolean;
  loading?: boolean;
  loadingLines?: number;
  loadingHeight?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    style, 
    variant = 'default', 
    size = 'default',
    noPadding = false, 
    interactive = false, 
    loading = false,
    loadingLines = 3,
    loadingHeight = '6rem',
    children,
    ...props 
  }, ref) => {
    const inlineStyles = getCardInlineStyles(variant, size, noPadding);
    
    const interactiveStyles: React.CSSProperties = interactive ? {
      cursor: 'pointer',
      transition: tokens.transition.default,
    } : {};

    // If loading, show skeleton content
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn('rounded-lg', className)}
          style={{ 
            ...inlineStyles, 
            ...style 
          }}
          {...props}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            <Skeleton variant="text" lines={loadingLines} />
            <Skeleton variant="rounded" height={loadingHeight} />
          </div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          className,
        )}
        style={{ 
          ...inlineStyles, 
          ...interactiveStyles,
          ...style 
        }}
        onMouseEnter={(e) => {
          if (interactive) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = tokens.shadows.lg;
          }
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (interactive) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = inlineStyles.boxShadow || '';
          }
          props.onMouseLeave?.(e);
        }}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.sm,
      padding: tokens.card.padding.md,
      ...style
    }}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, style, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('', className)}
    style={{
      fontSize: '1.125rem', // tokens.text.size.lg[0] would be array
      fontWeight: tokens.text.weight.semibold,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
      color: tokens.colors.text.primary,
      margin: 0,
      fontFamily: tokens.text.family.sans.join(', '),
      ...style
    }}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, style, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('', className)}
    style={{
      fontSize: '0.875rem', // 14px
      color: tokens.colors.text.secondary,
      margin: 0,
      fontFamily: tokens.text.family.sans.join(', '),
      ...style
    }}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('', className)} 
    style={{
      padding: tokens.card.padding.md,
      paddingTop: 0,
      ...style
    }}
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: tokens.card.padding.md,
      paddingTop: 0,
      ...style
    }}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// CNC-specific card variants
const StatusCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status?: 'connected' | 'disconnected' | 'idle' | 'running' | 'error'
  }
>(({ className, status = 'idle', ...props }, ref) => {
  const statusColors = {
    connected: 'border-success-500 bg-success-50 text-success-900',
    disconnected: 'border-danger-500 bg-danger-50 text-danger-900',
    idle: 'border-warning-500 bg-warning-50 text-warning-900',
    running: 'border-primary-500 bg-primary-50 text-primary-900',
    error: 'border-danger-600 bg-danger-100 text-danger-900',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border-2 shadow-cnc transition-all duration-200',
        statusColors[status],
        className,
      )}
      {...props}
    />
  );
});
StatusCard.displayName = 'StatusCard';

const DashboardCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean
  }
>(({ className, interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 overflow-hidden',
      interactive && 'hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:bg-card/80 hover:border-primary/50',
      className,
    )}
    {...props}
  />
));
DashboardCard.displayName = 'DashboardCard';

// New compound components for metric cards
const CardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '3rem',
      height: '3rem',
      borderRadius: tokens.radius.lg,
      backgroundColor: `${tokens.colors.primary.main}10`, // 10% opacity
      color: tokens.colors.primary.main,
      ...style
    }}
    {...props}
  />
));
CardIcon.displayName = 'CardIcon';

const CardValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      fontSize: '2rem', // Large display size
      fontWeight: tokens.text.weight.bold,
      fontFamily: tokens.text.family.mono.join(', '),
      letterSpacing: '-0.05em',
      lineHeight: 1,
      color: tokens.colors.text.primary,
      margin: `${tokens.spacing.sm} 0`,
      ...style
    }}
    {...props}
  />
));
CardValue.displayName = 'CardValue';

const CardChange = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'positive' | 'negative' | 'neutral';
  }
>(({ className, style, variant = 'neutral', ...props }, ref) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    positive: {
      color: tokens.colors.status.success,
    },
    negative: {
      color: tokens.colors.status.error,
    },
    neutral: {
      color: tokens.colors.text.secondary,
    },
  };

  return (
    <div
      ref={ref}
      className={cn('', className)}
      style={{
        fontSize: '0.875rem', // 14px
        fontWeight: tokens.text.weight.medium,
        fontFamily: tokens.text.family.mono.join(', '),
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    />
  );
});
CardChange.displayName = 'CardChange';

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      marginLeft: 'auto',
      ...style
    }}
    {...props}
  />
));
CardActions.displayName = 'CardActions';

// Attach compound components to Card
export const CardCompound = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Icon: CardIcon,
  Value: CardValue,
  Change: CardChange,
  Actions: CardActions,
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardIcon,
  CardValue,
  CardChange,
  CardActions,
  StatusCard,
  DashboardCard,
};