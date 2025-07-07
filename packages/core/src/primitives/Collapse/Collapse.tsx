import * as React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  getCollapseHeaderStyles,
  getCollapseContentStyles,
  getCollapseIconStyles,
  getCollapseTitleStyles,
} from '../../utils/tokens';

export interface CollapseProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  title?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'ghost' | 'bordered' | 'cnc';
  size?: 'sm' | 'default' | 'lg';
  iconPosition?: 'left' | 'right';
  animationDuration?: number;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(({
  isOpen: controlledOpen,
  onToggle,
  title,
  children,
  disabled = false,
  className,
  style,
  variant = 'default',
  size = 'default',
  iconPosition = 'left',
  animationDuration = 200,
}, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (disabled || isAnimating) return;
    
    const newOpen = !isOpen;
    
    if (isControlled) {
      onToggle?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  React.useEffect(() => {
    if (!contentRef.current) return;
    
    setIsAnimating(true);
    
    const content = contentRef.current;
    const scrollHeight = content.scrollHeight;
    
    if (isOpen) {
      content.style.height = '0px';
      content.style.opacity = '0';
      
      requestAnimationFrame(() => {
        content.style.height = `${scrollHeight}px`;
        content.style.opacity = '1';
      });
    } else {
      content.style.height = `${scrollHeight}px`;
      content.style.opacity = '1';
      
      requestAnimationFrame(() => {
        content.style.height = '0px';
        content.style.opacity = '0';
      });
    }
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (isOpen) {
        content.style.height = 'auto';
      }
    }, animationDuration);
    
    return () => clearTimeout(timer);
  }, [isOpen, animationDuration]);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
    ...style,
  };

  const getHeaderStyle = (): React.CSSProperties => {
    return getCollapseHeaderStyles(variant, size, isOpen, disabled);
  };

  const getContentStyle = (): React.CSSProperties => {
    return getCollapseContentStyles(variant, size, animationDuration);
  };

  const iconStyle = getCollapseIconStyles(size, isOpen);

  const titleStyle = getCollapseTitleStyles();

  const Icon = iconPosition === 'left' ? ChevronRight : ChevronDown;

  return (
    <div ref={ref} style={containerStyle} className={className}>
      <button
        style={getHeaderStyle()}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls="collapse-content"
      >
        {iconPosition === 'left' && (
          <Icon style={{ ...iconStyle, marginRight: '0.5rem' }} />
        )}
        
        {title && (
          <span style={titleStyle}>
            {title}
          </span>
        )}
        
        {iconPosition === 'right' && (
          <Icon style={{ ...iconStyle, marginLeft: '0.5rem' }} />
        )}
      </button>
      
      <div
        ref={contentRef}
        style={getContentStyle()}
        id="collapse-content"
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
});

Collapse.displayName = 'Collapse';