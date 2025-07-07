import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  getPopoverBaseStyles,
  getPopoverArrowColors,
} from '../../utils/tokens';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  triggerType?: 'click' | 'hover';
  arrow?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = 'bottom',
  triggerType = 'click',
  arrow = false,
  onVisibilityChange,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    // Keep popover within viewport
    if (left < 8) left = 8;
    if (left + popoverRect.width > viewportWidth - 8) left = viewportWidth - popoverRect.width - 8;
    if (top < 8) top = 8;
    if (top + popoverRect.height > viewportHeight - 8) top = viewportHeight - popoverRect.height - 8;

    setPosition({ top, left });
  };

  const showPopover = () => {
    setIsVisible(true);
    onVisibilityChange?.(true);
  };

  const hidePopover = () => {
    setIsVisible(false);
    onVisibilityChange?.(false);
  };

  const togglePopover = () => {
    if (isVisible) {
      hidePopover();
    } else {
      showPopover();
    }
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, placement]);

  useEffect(() => {
    if (triggerType === 'click' && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          popoverRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          hidePopover();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, triggerType]);

  const getArrowStyles = (): { arrow: React.CSSProperties; arrowBorder: React.CSSProperties } => {
    const arrowSize = 8;
    const { borderColor, bgColor } = getPopoverArrowColors();
    
    const baseArrowStyles: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    const arrowBorderStyles: React.CSSProperties = { ...baseArrowStyles };
    const arrowStyles: React.CSSProperties = { ...baseArrowStyles };

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        // Border arrow (slightly larger, positioned behind)
        arrowBorderStyles.top = '100%';
        arrowBorderStyles.borderTopColor = borderColor;
        arrowBorderStyles.borderLeftColor = 'transparent';
        arrowBorderStyles.borderRightColor = 'transparent';
        arrowBorderStyles.borderBottomColor = 'transparent';
        arrowBorderStyles.borderWidth = `${arrowSize + 1}px ${arrowSize + 1}px 0 ${arrowSize + 1}px`;
        
        // Fill arrow (positioned on top)
        arrowStyles.top = '100%';
        arrowStyles.borderTopColor = bgColor;
        arrowStyles.borderLeftColor = 'transparent';
        arrowStyles.borderRightColor = 'transparent';
        arrowStyles.borderBottomColor = 'transparent';
        arrowStyles.borderWidth = `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`;
        arrowStyles.marginTop = '-1px'; // Offset to cover border
        
        if (placement === 'top') {
          arrowBorderStyles.left = '50%';
          arrowBorderStyles.transform = 'translateX(-50%)';
          arrowStyles.left = '50%';
          arrowStyles.transform = 'translateX(-50%)';
        }
        if (placement === 'top-start') {
          arrowBorderStyles.left = '16px';
          arrowStyles.left = '16px';
        }
        if (placement === 'top-end') {
          arrowBorderStyles.right = '16px';
          arrowStyles.right = '16px';
        }
        break;
        
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        // Border arrow
        arrowBorderStyles.bottom = '100%';
        arrowBorderStyles.borderBottomColor = borderColor;
        arrowBorderStyles.borderLeftColor = 'transparent';
        arrowBorderStyles.borderRightColor = 'transparent';
        arrowBorderStyles.borderTopColor = 'transparent';
        arrowBorderStyles.borderWidth = `0 ${arrowSize + 1}px ${arrowSize + 1}px ${arrowSize + 1}px`;
        
        // Fill arrow
        arrowStyles.bottom = '100%';
        arrowStyles.borderBottomColor = bgColor;
        arrowStyles.borderLeftColor = 'transparent';
        arrowStyles.borderRightColor = 'transparent';
        arrowStyles.borderTopColor = 'transparent';
        arrowStyles.borderWidth = `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`;
        arrowStyles.marginBottom = '-1px';
        
        if (placement === 'bottom') {
          arrowBorderStyles.left = '50%';
          arrowBorderStyles.transform = 'translateX(-50%)';
          arrowStyles.left = '50%';
          arrowStyles.transform = 'translateX(-50%)';
        }
        if (placement === 'bottom-start') {
          arrowBorderStyles.left = '16px';
          arrowStyles.left = '16px';
        }
        if (placement === 'bottom-end') {
          arrowBorderStyles.right = '16px';
          arrowStyles.right = '16px';
        }
        break;
        
      case 'left':
        // Border arrow
        arrowBorderStyles.left = '100%';
        arrowBorderStyles.top = '50%';
        arrowBorderStyles.borderLeftColor = borderColor;
        arrowBorderStyles.borderTopColor = 'transparent';
        arrowBorderStyles.borderBottomColor = 'transparent';
        arrowBorderStyles.borderRightColor = 'transparent';
        arrowBorderStyles.borderWidth = `${arrowSize + 1}px 0 ${arrowSize + 1}px ${arrowSize + 1}px`;
        arrowBorderStyles.transform = 'translateY(-50%)';
        
        // Fill arrow
        arrowStyles.left = '100%';
        arrowStyles.top = '50%';
        arrowStyles.borderLeftColor = bgColor;
        arrowStyles.borderTopColor = 'transparent';
        arrowStyles.borderBottomColor = 'transparent';
        arrowStyles.borderRightColor = 'transparent';
        arrowStyles.borderWidth = `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`;
        arrowStyles.transform = 'translateY(-50%)';
        arrowStyles.marginLeft = '-1px';
        break;
        
      case 'right':
        // Border arrow
        arrowBorderStyles.right = '100%';
        arrowBorderStyles.top = '50%';
        arrowBorderStyles.borderRightColor = borderColor;
        arrowBorderStyles.borderTopColor = 'transparent';
        arrowBorderStyles.borderBottomColor = 'transparent';
        arrowBorderStyles.borderLeftColor = 'transparent';
        arrowBorderStyles.borderWidth = `${arrowSize + 1}px ${arrowSize + 1}px ${arrowSize + 1}px 0`;
        arrowBorderStyles.transform = 'translateY(-50%)';
        
        // Fill arrow
        arrowStyles.right = '100%';
        arrowStyles.top = '50%';
        arrowStyles.borderRightColor = bgColor;
        arrowStyles.borderTopColor = 'transparent';
        arrowStyles.borderBottomColor = 'transparent';
        arrowStyles.borderLeftColor = 'transparent';
        arrowStyles.borderWidth = `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`;
        arrowStyles.transform = 'translateY(-50%)';
        arrowStyles.marginRight = '-1px';
        break;
    }

    return { arrow: arrowStyles, arrowBorder: arrowBorderStyles };
  };

  const triggerProps = triggerType === 'click' 
    ? { onClick: togglePopover }
    : { 
        onMouseEnter: showPopover,
        onMouseLeave: hidePopover 
      };

  const popoverProps = triggerType === 'hover'
    ? {
        onMouseEnter: showPopover,
        onMouseLeave: hidePopover
      }
    : {};

  return (
    <>
      <div ref={triggerRef} {...triggerProps} style={{ display: 'inline-block' }}>
        {trigger}
      </div>
      
      {isVisible && (
        <div
          ref={popoverRef}
          {...popoverProps}
          className={className}
          style={{
            ...getPopoverBaseStyles(),
            top: position.top,
            left: position.left,
          }}
        >
          {arrow && (
            <>
              <div style={getArrowStyles().arrowBorder} />
              <div style={getArrowStyles().arrow} />
            </>
          )}
          {content}
        </div>
      )}
      
      <style jsx>{`
        @keyframes popoverFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};