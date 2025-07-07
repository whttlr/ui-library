import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils';
import {
  getAccordionItemStyles,
  getAccordionHeaderStyles,
  getAccordionTitleStyles,
  getAccordionIconStyles,
  getAccordionContentStyles,
} from '../../utils/tokens';

export interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  multiple?: boolean;
  defaultOpen?: string[];
  onOpenChange?: (openItems: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'ghost' | 'bordered' | 'cnc';
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  multiple = false,
  defaultOpen = [],
  onOpenChange,
  className,
  style,
  variant = 'default',
}, ref) => {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultOpen);

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];
    
    if (multiple) {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter(id => id !== itemId)
        : [...openItems, itemId];
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }
    
    setOpenItems(newOpenItems);
    onOpenChange?.(newOpenItems);
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    ...style,
  };

  const getItemStyle = (isOpen: boolean, disabled: boolean): React.CSSProperties => {
    return getAccordionItemStyles(variant, isOpen, disabled);
  };

  const getHeaderStyle = (isOpen: boolean, disabled: boolean): React.CSSProperties => {
    return getAccordionHeaderStyles(isOpen, disabled);
  };

  const titleStyle = getAccordionTitleStyles();

  const iconStyle = getAccordionIconStyles();

  const contentStyle = getAccordionContentStyles();

  return (
    <div ref={ref} style={containerStyle} className={className}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const disabled = item.disabled || false;
        
        return (
          <div key={item.id} style={getItemStyle(isOpen, disabled)}>
            <div
              style={getHeaderStyle(isOpen, disabled)}
              onClick={() => !disabled && handleToggle(item.id)}
            >
              <h3 style={titleStyle}>{item.title}</h3>
              <ChevronDown 
                style={{
                  ...iconStyle,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
            
            {isOpen && (
              <div style={contentStyle}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

Accordion.displayName = 'Accordion';