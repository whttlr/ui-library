import * as React from 'react';
import {
  tokens,
  getSkeletonVariantStyles,
  getSkeletonSizeStyles,
  getSkeletonCardStyles,
  getSkeletonTableStyles,
  getSkeletonTableHeaderStyles,
  getSkeletonTableRowStyles,
  getSkeletonShimmerGradient,
} from '../../utils/tokens';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonSize = 'sm' | 'default' | 'lg';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  lines?: number; // For text variant
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    variant = 'text',
    size = 'default',
    width,
    height,
    className,
    style,
    animate = true,
    lines = 1,
    ...props 
  }, ref) => {
    const config = getSkeletonSizeStyles(variant, size);

    // Base skeleton styles
    const getSkeletonStyles = (): React.CSSProperties => {
      return {
        ...getSkeletonVariantStyles(variant),
        width: width || config.width,
        height: height || config.height,
        ...style,
      };
    };

    // Animation styles
    const animationStyles: React.CSSProperties = animate ? {
      animation: 'skeleton-pulse 2s ease-in-out infinite',
    } : {};

    // Multi-line text skeleton
    if (variant === 'text' && lines > 1) {
      return (
        <>
          {/* CSS for pulse animation */}
          {animate && (
            <style>
              {`
                @keyframes skeleton-pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.4;
                  }
                }
                
                @keyframes skeleton-shimmer {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }
              `}
            </style>
          )}
          
          <div
            ref={ref}
            className={className}
            style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs, ...style }}
            {...props}
          >
            {Array.from({ length: lines }, (_, index) => (
              <div
                key={index}
                style={{
                  ...getSkeletonStyles(),
                  ...animationStyles,
                  width: index === lines - 1 && lines > 1 ? '75%' : config.width, // Last line shorter
                  animationDelay: animate ? `${index * 0.1}s` : undefined,
                }}
              />
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        {/* CSS for animations */}
        {animate && (
          <style>
            {`
              @keyframes skeleton-pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.4;
                }
              }
              
              @keyframes skeleton-shimmer {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              
              .skeleton-shimmer::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${getSkeletonShimmerGradient()};
                animation: skeleton-shimmer 1.5s infinite;
              }
            `}
          </style>
        )}
        
        <div
          ref={ref}
          className={`${animate ? 'skeleton-shimmer' : ''} ${className || ''}`}
          style={{
            ...getSkeletonStyles(),
            ...animationStyles,
          }}
          {...props}
        />
      </>
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Compound components for common patterns
export const SkeletonText = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'> & {
  lines?: number;
}>(({ lines = 3, ...props }, ref) => (
  <Skeleton ref={ref} variant="text" lines={lines} {...props} />
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  (props, ref) => (
    <Skeleton ref={ref} variant="circular" {...props} />
  )
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

export const SkeletonCard = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'> & {
  showAvatar?: boolean;
  showActions?: boolean;
}>(({ showAvatar = false, showActions = false, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...getSkeletonCardStyles(),
    }}
  >
    {showAvatar && (
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <SkeletonAvatar size="default" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" size="sm" style={{ marginTop: tokens.spacing.xs }} />
        </div>
      </div>
    )}
    
    <div>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" style={{ marginTop: tokens.spacing.sm }} />
      <Skeleton variant="text" width="85%" style={{ marginTop: tokens.spacing.sm }} />
    </div>
    
    <Skeleton variant="rounded" height="8rem" />
    
    {showActions && (
      <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
        <Skeleton variant="rounded" width="5rem" height="2rem" />
        <Skeleton variant="rounded" width="4rem" height="2rem" />
      </div>
    )}
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonTable = React.forwardRef<HTMLDivElement, {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
}>(({ rows = 5, columns = 4, showHeader = true, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    style={{
      ...getSkeletonTableStyles(),
      ...style,
    }}
    {...props}
  >
    {showHeader && (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: tokens.spacing.lg,
        padding: tokens.spacing.md,
        ...getSkeletonTableHeaderStyles(),
      }}>
        {Array.from({ length: columns }, (_, index) => (
          <Skeleton
            key={`header-${index}`}
            variant="text"
            width="80%"
            size="sm"
          />
        ))}
      </div>
    )}
    
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: tokens.spacing.lg,
          padding: tokens.spacing.md,
          ...getSkeletonTableRowStyles(rowIndex >= rows - 1),
        }}
      >
        {Array.from({ length: columns }, (_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            variant="text"
            width={`${Math.random() * 40 + 60}%`} // Random width for variety
            size="sm"
          />
        ))}
      </div>
    ))}
  </div>
));

SkeletonTable.displayName = 'SkeletonTable';

// Compound object for easier imports
export const SkeletonCompound = Object.assign(Skeleton, {
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Card: SkeletonCard,
  Table: SkeletonTable,
});