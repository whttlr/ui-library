import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/Button';

const buttonGridVariants = cva(
  'grid w-full',
  {
    variants: {
      variant: {
        default: 'gap-2',
        compact: 'gap-1',
        spacious: 'gap-4',
      },
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        auto: 'grid-cols-[repeat(auto-fit,_minmax(min(100%,_8rem),_1fr))]',
      },
      responsive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        responsive: true,
        columns: 2,
        className: 'grid-cols-1 sm:grid-cols-2',
      },
      {
        responsive: true,
        columns: 3,
        className: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      },
      {
        responsive: true,
        columns: 4,
        className: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      },
      {
        responsive: true,
        columns: 5,
        className: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
      },
      {
        responsive: true,
        columns: 6,
        className: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
      },
    ],
    defaultVariants: {
      variant: 'default',
      columns: 3,
      responsive: true,
    },
  }
);

export interface ButtonGridItem {
  label: string;
  value?: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonProps['variant'];
  active?: boolean;
  tooltip?: string;
}

export interface ButtonGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGridVariants> {
  items: ButtonGridItem[];
  buttonSize?: ButtonProps['size'];
  buttonVariant?: ButtonProps['variant'];
  onItemClick?: (item: ButtonGridItem, index: number) => void;
  activeIndex?: number;
  multiSelect?: boolean;
  selectedIndices?: number[];
}

// Container styles
const getContainerStyles = (): React.CSSProperties => ({
  width: '100%',
});

// Get button variant based on state
const getButtonVariant = (
  item: ButtonGridItem,
  index: number,
  activeIndex?: number,
  selectedIndices?: number[],
  defaultVariant?: ButtonProps['variant']
): ButtonProps['variant'] => {
  if (item.variant) return item.variant;
  
  const isActive = activeIndex === index || selectedIndices?.includes(index);
  if (isActive) return 'default';
  
  return defaultVariant || 'outline';
};

const ButtonGrid = React.forwardRef<HTMLDivElement, ButtonGridProps>(
  ({ 
    className, 
    variant, 
    columns,
    responsive,
    style,
    items,
    buttonSize = 'default',
    buttonVariant = 'outline',
    onItemClick,
    activeIndex,
    multiSelect = false,
    selectedIndices = [],
    ...props 
  }, ref) => {
    const handleClick = (item: ButtonGridItem, index: number) => {
      if (!item.disabled) {
        item.onClick?.();
        onItemClick?.(item, index);
      }
    };

    return (
      <div 
        ref={ref}
        className={cn(buttonGridVariants({ variant, columns, responsive }), className)}
        style={{
          ...getContainerStyles(),
          ...style,
        }}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = multiSelect 
            ? selectedIndices.includes(index)
            : activeIndex === index;
          
          const buttonVar = getButtonVariant(
            item, 
            index, 
            activeIndex, 
            selectedIndices, 
            buttonVariant
          );

          return (
            <Button
              key={index}
              size={buttonSize}
              variant={buttonVar}
              onClick={() => handleClick(item, index)}
              disabled={item.disabled}
              title={item.tooltip}
              className={cn(
                'w-full justify-center',
                isActive && 'ring-2 ring-offset-2'
              )}
              style={{
                ringColor: isActive ? tokens.colors.primary.main : undefined,
                ringOffsetColor: tokens.colors.bg.primary,
              }}
            >
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span className="truncate">{item.label}</span>
              {item.value !== undefined && (
                <span 
                  className="ml-auto flex-shrink-0 text-xs opacity-70"
                  style={{ fontFamily: tokens.text.family.mono.join(', ') }}
                >
                  {item.value}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    );
  }
);

ButtonGrid.displayName = 'ButtonGrid';

export { ButtonGrid, buttonGridVariants };