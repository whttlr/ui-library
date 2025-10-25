/**
 * HoverActionMenu Component
 * A menu that appears on hover over a row, positioned on the right side
 */

import * as React from 'react';
import { MoreVertical } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from '../Button';

export interface HoverActionMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

export interface HoverActionMenuProps {
  items: HoverActionMenuItem[];
  className?: string;
}

export const HoverActionMenu = React.forwardRef<HTMLDivElement, HoverActionMenuProps>(
  ({ items, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('relative', className)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>

        {isOpen && (
          <div
            ref={menuRef}
            className={cn(
              'absolute right-0 top-full mt-1 z-50',
              'w-48 rounded-md border border-border bg-background shadow-lg',
              'py-1'
            )}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                disabled={item.disabled}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm',
                  'flex items-center gap-2',
                  'transition-colors',
                  item.variant === 'destructive'
                    ? 'text-destructive hover:bg-destructive/10'
                    : 'hover:bg-muted',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
HoverActionMenu.displayName = 'HoverActionMenu';
