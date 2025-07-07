import * as React from 'react';
import { cn } from '../../utils';
import {
  tokens,
  getTooltipVariantStyles,
  getTooltipSizeStyles,
  getTooltipBaseStyles,
  getTooltipPositionStyles,
} from '../../utils/tokens';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'sm' | 'default' | 'lg';
export type TooltipVariant = 'default' | 'info' | 'success' | 'warning' | 'error' | 'cnc';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: TooltipPosition;
  size?: TooltipSize;
  variant?: TooltipVariant;
  disabled?: boolean;
  delayShow?: number;
  delayHide?: number;
  showArrow?: boolean;
  maxWidth?: string;
  className?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({
    children,
    content,
    position = 'top',
    size = 'default',
    variant = 'default',
    disabled = false,
    delayShow = 500,
    delayHide = 0,
    showArrow = true,
    maxWidth = '200px',
    className,
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [showTimeout, setShowTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [hideTimeout, setHideTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLElement>(null);


    const getPositionStyles = (): React.CSSProperties => {
      return {
        maxWidth,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        ...getTooltipPositionStyles(position, showArrow),
      };
    };

    const getArrowStyles = (): React.CSSProperties => {
      const arrowSize = tokens.spacing.xs;
      const baseStyles: React.CSSProperties = {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      };

      const arrowColor = getTooltipVariantStyles(variant).backgroundColor as string;

      switch (position) {
        case 'top':
          return {
            ...baseStyles,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: `${arrowSize} solid transparent`,
            borderRight: `${arrowSize} solid transparent`,
            borderTop: `${arrowSize} solid ${arrowColor}`,
          };
        case 'bottom':
          return {
            ...baseStyles,
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: `${arrowSize} solid transparent`,
            borderRight: `${arrowSize} solid transparent`,
            borderBottom: `${arrowSize} solid ${arrowColor}`,
          };
        case 'left':
          return {
            ...baseStyles,
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            borderTop: `${arrowSize} solid transparent`,
            borderBottom: `${arrowSize} solid transparent`,
            borderLeft: `${arrowSize} solid ${arrowColor}`,
          };
        case 'right':
          return {
            ...baseStyles,
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            borderTop: `${arrowSize} solid transparent`,
            borderBottom: `${arrowSize} solid transparent`,
            borderRight: `${arrowSize} solid ${arrowColor}`,
          };
        default:
          return baseStyles;
      }
    };

    const handleMouseEnter = () => {
      if (disabled) return;

      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }

      if (delayShow > 0) {
        const timeout = setTimeout(() => {
          setIsVisible(true);
          setShowTimeout(null);
        }, delayShow);
        setShowTimeout(timeout);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (disabled) return;

      if (showTimeout) {
        clearTimeout(showTimeout);
        setShowTimeout(null);
      }

      if (delayHide > 0) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
          setHideTimeout(null);
        }, delayHide);
        setHideTimeout(timeout);
      } else {
        setIsVisible(false);
      }
    };

    React.useEffect(() => {
      return () => {
        if (showTimeout) clearTimeout(showTimeout);
        if (hideTimeout) clearTimeout(hideTimeout);
      };
    }, [showTimeout, hideTimeout]);

    const tooltipStyle: React.CSSProperties = {
      ...getTooltipBaseStyles(),
      ...getTooltipSizeStyles(size),
      ...getTooltipVariantStyles(variant),
      ...getPositionStyles(),
    };

    // Clone the child element to add event handlers
    const clonedChild = React.cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        children.props.onMouseEnter?.(e);
        handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        children.props.onMouseLeave?.(e);
        handleMouseLeave();
      },
      style: {
        ...children.props.style,
        position: 'relative',
        display: 'inline-block',
      },
    });

    return (
      <>
        {clonedChild}
        <div
          ref={ref}
          className={cn(className)}
          style={tooltipStyle}
        >
          {content}
          {showArrow && <div style={getArrowStyles()} />}
        </div>
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// Convenience components for common tooltip variants
export const InfoTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'variant'>>(
  (props, ref) => <Tooltip ref={ref} variant="info" {...props} />
);
InfoTooltip.displayName = 'InfoTooltip';

export const SuccessTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'variant'>>(
  (props, ref) => <Tooltip ref={ref} variant="success" {...props} />
);
SuccessTooltip.displayName = 'SuccessTooltip';

export const WarningTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'variant'>>(
  (props, ref) => <Tooltip ref={ref} variant="warning" {...props} />
);
WarningTooltip.displayName = 'WarningTooltip';

export const ErrorTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'variant'>>(
  (props, ref) => <Tooltip ref={ref} variant="error" {...props} />
);
ErrorTooltip.displayName = 'ErrorTooltip';

export const CNCTooltip = React.forwardRef<HTMLDivElement, Omit<TooltipProps, 'variant'>>(
  (props, ref) => <Tooltip ref={ref} variant="cnc" {...props} />
);
CNCTooltip.displayName = 'CNCTooltip';