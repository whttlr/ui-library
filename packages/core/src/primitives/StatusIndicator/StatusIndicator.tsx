import * as React from 'react';
import {
  tokens,
  getStatusIndicatorStatusColor,
  getStatusIndicatorBackgroundColor,
  getStatusIndicatorBorderColor,
  getStatusIndicatorSizeStyles,
  getStatusIndicatorVariantStyles,
  getStatusIndicatorDotStyles,
  getStatusIndicatorGroupStyles,
  getStatusIndicatorCardStyles,
  getStatusIndicatorCardTitleStyles,
} from '../../utils/tokens';

export type StatusIndicatorStatus = 'online' | 'offline' | 'connecting' | 'error' | 'warning' | 'success' | 'idle' | 'running' | 'paused' | 'stopped';
export type StatusIndicatorSize = 'sm' | 'default' | 'lg';
export type StatusIndicatorVariant = 'dot' | 'badge' | 'pill' | 'cnc';

export interface StatusIndicatorProps {
  status: StatusIndicatorStatus;
  size?: StatusIndicatorSize;
  variant?: StatusIndicatorVariant;
  label?: string;
  description?: string;
  pulse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ 
    status,
    size = 'default',
    variant = 'dot',
    label,
    description,
    pulse = false,
    className,
    style,
    ...props 
  }, ref) => {
    // Status configurations using design tokens
    const statusConfig = {
      online: {
        color: getStatusIndicatorStatusColor('online'),
        backgroundColor: getStatusIndicatorBackgroundColor('online'),
        borderColor: getStatusIndicatorBorderColor('online'),
        label: 'Online',
        description: 'System is connected and operational',
      },
      offline: {
        color: getStatusIndicatorStatusColor('offline'),
        backgroundColor: getStatusIndicatorBackgroundColor('offline'),
        borderColor: getStatusIndicatorBorderColor('offline'),
        label: 'Offline',
        description: 'System is disconnected',
      },
      connecting: {
        color: getStatusIndicatorStatusColor('connecting'),
        backgroundColor: getStatusIndicatorBackgroundColor('connecting'),
        borderColor: getStatusIndicatorBorderColor('connecting'),
        label: 'Connecting',
        description: 'Establishing connection...',
      },
      error: {
        color: getStatusIndicatorStatusColor('error'),
        backgroundColor: getStatusIndicatorBackgroundColor('error'),
        borderColor: getStatusIndicatorBorderColor('error'),
        label: 'Error',
        description: 'System error detected',
      },
      warning: {
        color: getStatusIndicatorStatusColor('warning'),
        backgroundColor: getStatusIndicatorBackgroundColor('warning'),
        borderColor: getStatusIndicatorBorderColor('warning'),
        label: 'Warning',
        description: 'Attention required',
      },
      success: {
        color: getStatusIndicatorStatusColor('success'),
        backgroundColor: getStatusIndicatorBackgroundColor('success'),
        borderColor: getStatusIndicatorBorderColor('success'),
        label: 'Success',
        description: 'Operation completed successfully',
      },
      idle: {
        color: getStatusIndicatorStatusColor('idle'),
        backgroundColor: getStatusIndicatorBackgroundColor('idle'),
        borderColor: getStatusIndicatorBorderColor('idle'),
        label: 'Idle',
        description: 'System is ready and waiting',
      },
      running: {
        color: getStatusIndicatorStatusColor('running'),
        backgroundColor: getStatusIndicatorBackgroundColor('running'),
        borderColor: getStatusIndicatorBorderColor('running'),
        label: 'Running',
        description: 'System is actively processing',
      },
      paused: {
        color: getStatusIndicatorStatusColor('paused'),
        backgroundColor: getStatusIndicatorBackgroundColor('paused'),
        borderColor: getStatusIndicatorBorderColor('paused'),
        label: 'Paused',
        description: 'Operation temporarily halted',
      },
      stopped: {
        color: getStatusIndicatorStatusColor('stopped'),
        backgroundColor: getStatusIndicatorBackgroundColor('stopped'),
        borderColor: getStatusIndicatorBorderColor('stopped'),
        label: 'Stopped',
        description: 'System has been stopped',
      },
    };

    // Size configurations using design tokens
    const sizeConfig = {
      sm: getStatusIndicatorSizeStyles('sm'),
      default: getStatusIndicatorSizeStyles('default'),
      lg: getStatusIndicatorSizeStyles('lg'),
    };

    const config = statusConfig[status];
    const sizeStyle = sizeConfig[size];
    const displayLabel = label || config.label;
    const displayDescription = description || config.description;

    // Pulse animation keyframes using design tokens
    const pulseAnimation = pulse ? {
      animation: 'status-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    } : {};

    // Variant-specific styles using design tokens
    const getVariantStyles = (): React.CSSProperties => {
      const baseVariantStyle = getStatusIndicatorVariantStyles(variant, status);
      
      return {
        ...baseVariantStyle,
        gap: sizeStyle.gap,
        fontSize: sizeStyle.fontSize,
        ...(variant !== 'dot' ? { padding: sizeStyle.padding } : {}),
      };
    };

    const dotStyles: React.CSSProperties = {
      ...getStatusIndicatorDotStyles(status, size),
      ...pulseAnimation,
    };

    const containerStyles: React.CSSProperties = {
      ...getVariantStyles(),
      ...style,
    };

    return (
      <>
        {/* CSS for pulse animation */}
        {pulse && (
          <style>
            {`
              @keyframes status-pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.5;
                }
              }
            `}
          </style>
        )}
        
        <div
          ref={ref}
          style={containerStyles}
          className={className}
          title={displayDescription}
          {...props}
        >
          <div style={dotStyles} />
          {displayLabel && <span>{displayLabel}</span>}
        </div>
      </>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

// Compound components for complex status displays
export const StatusIndicatorGroup = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>(({ children, className, style, ...props }, ref) => {
  const groupStyles: React.CSSProperties = {
    ...getStatusIndicatorGroupStyles(),
    ...style,
  };

  return (
    <div
      ref={ref}
      style={groupStyles}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
});

StatusIndicatorGroup.displayName = 'StatusIndicatorGroup';

export const StatusIndicatorCard = React.forwardRef<HTMLDivElement, {
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>(({ title, children, className, style, ...props }, ref) => {
  const cardStyles: React.CSSProperties = {
    ...getStatusIndicatorCardStyles(),
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    ...getStatusIndicatorCardTitleStyles(),
  };

  return (
    <div
      ref={ref}
      style={cardStyles}
      className={className}
      {...props}
    >
      {title && <div style={titleStyles}>{title}</div>}
      {children}
    </div>
  );
});

StatusIndicatorCard.displayName = 'StatusIndicatorCard';

// Compound object for easier imports
export const StatusIndicatorCompound = Object.assign(StatusIndicator, {
  Group: StatusIndicatorGroup,
  Card: StatusIndicatorCard,
});