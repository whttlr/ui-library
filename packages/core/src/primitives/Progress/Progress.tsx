import * as React from 'react';
import { cn } from '../../utils';
import {
  tokens,
  getProgressVariantStyles,
  getProgressSizeStyles,
  getProgressTrackStyles,
  getProgressFillStyles,
  getProgressStripedPattern,
} from '../../utils/tokens';

export type ProgressColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'cnc';
export type ProgressSize = 'sm' | 'default' | 'lg';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  size?: ProgressSize;
  color?: ProgressColor;
  animated?: boolean;
  striped?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    value, 
    max = 100, 
    className, 
    showPercentage = true, 
    size = 'default', 
    color = 'default',
    animated = false,
    striped = false,
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);


    const containerStyle: React.CSSProperties = {
      width: '100%',
      ...(className ? {} : {}),
    };

    const trackStyle: React.CSSProperties = {
      ...getProgressTrackStyles(),
      ...getProgressSizeStyles(size),
    };

    const fillStyle: React.CSSProperties = {
      ...getProgressFillStyles(color, percentage),
    };

    // Add striped pattern if enabled
    if (striped) {
      fillStyle.backgroundImage = getProgressStripedPattern();
      fillStyle.backgroundSize = tokens.spacing.sm;
    }

    // Add animation if enabled
    if (animated && striped) {
      fillStyle.animation = 'progress-bar-stripes 1s linear infinite';
    }

    const textStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      color: tokens.colors.text.secondary,
      marginTop: tokens.spacing.xs,
      fontFamily: tokens.text.family.sans.join(', '),
    };

    return (
      <div ref={ref} style={containerStyle}>
        <style>
          {`
            @keyframes progress-bar-stripes {
              0% {
                background-position: ${tokens.spacing.sm} 0;
              }
              100% {
                background-position: 0 0;
              }
            }
          `}
        </style>
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
        {showPercentage && (
          <div style={textStyle}>
            <span>{Math.round(percentage)}%</span>
            <span>{value} / {max}</span>
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  color?: ProgressColor;
}

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    className,
    showPercentage = true,
    color = 'default',
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorMap: Record<ProgressColor, string> = {
      default: tokens.colors.primary.main,
      primary: tokens.colors.primary.main,
      secondary: tokens.colors.text.secondary,
      success: tokens.colors.status.success,
      warning: tokens.colors.status.warning,
      error: tokens.colors.status.error,
      info: tokens.colors.status.info,
      cnc: tokens.colors.primary.main,
    };

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: size,
      height: size,
    };

    const svgStyle: React.CSSProperties = {
      transform: 'rotate(-90deg)',
    };

    const backgroundCircleStyle: React.CSSProperties = {
      stroke: tokens.colors.bg.secondary,
      fill: 'transparent',
    };

    const progressCircleStyle: React.CSSProperties = {
      stroke: colorMap[color],
      fill: 'transparent',
      strokeLinecap: 'round',
      transition: tokens.transition.smooth,
    };

    const textContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const textStyle: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: tokens.text.weight.medium,
      color: tokens.colors.text.primary,
      fontFamily: tokens.text.family.sans.join(', '),
    };

    return (
      <div ref={ref} style={containerStyle}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={svgStyle}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            style={backgroundCircleStyle}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={progressCircleStyle}
          />
        </svg>
        {showPercentage && (
          <div style={textContainerStyle}>
            <span style={textStyle}>{Math.round(percentage)}%</span>
          </div>
        )}
      </div>
    );
  },
);
CircularProgress.displayName = 'CircularProgress';