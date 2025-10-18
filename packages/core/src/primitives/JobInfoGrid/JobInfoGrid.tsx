import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

const jobInfoGridVariants = cva(
  'grid gap-6',
  {
    variants: {
      variant: {
        default: '',
        compact: 'gap-4',
        detailed: 'gap-8',
      },
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      columns: 2,
    },
  }
);

export interface JobInfoItem {
  label: string;
  value: React.ReactNode;
  format?: 'text' | 'number' | 'time' | 'monospace' | 'custom';
  helperText?: string;
}

export interface JobInfoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof jobInfoGridVariants> {
  items: JobInfoItem[];
  title?: string;
}

// Container styles
const getContainerStyles = (): React.CSSProperties => ({
  width: '100%',
});

// Section styles
const getSectionStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.xs,
});

// Title styles
const getTitleStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.base[0],
  fontWeight: tokens.text.weight.semibold,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.md,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Label styles
const getLabelStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.secondary,
  fontFamily: tokens.text.family.sans.join(', '),
  lineHeight: tokens.text.lineHeight.tight,
});

// Value styles based on format
const getValueStyles = (format: string = 'text'): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontSize: tokens.text.size.sm[0],
    color: tokens.colors.text.primary,
    marginTop: tokens.spacing.xs,
    lineHeight: tokens.text.lineHeight.normal,
  };

  const formatStyles = {
    text: {
      fontFamily: tokens.text.family.sans.join(', '),
      fontWeight: tokens.text.weight.normal,
    },
    number: {
      fontFamily: tokens.text.family.mono.join(', '),
      fontWeight: tokens.text.weight.medium,
      fontVariantNumeric: 'tabular-nums',
    },
    time: {
      fontFamily: tokens.text.family.mono.join(', '),
      fontWeight: tokens.text.weight.medium,
      fontVariantNumeric: 'tabular-nums',
    },
    monospace: {
      fontFamily: tokens.text.family.mono.join(', '),
      fontWeight: tokens.text.weight.normal,
    },
    custom: {},
  };

  return {
    ...baseStyles,
    ...(formatStyles[format as keyof typeof formatStyles] || formatStyles.text),
  };
};

// Helper text styles
const getHelperTextStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.xs[0],
  color: tokens.colors.text.tertiary,
  marginTop: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
  lineHeight: tokens.text.lineHeight.tight,
});

const JobInfoGrid = React.forwardRef<HTMLDivElement, JobInfoGridProps>(
  ({ className, variant, columns, style, items, title, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(jobInfoGridVariants({ variant, columns }), className)}
        style={{
          ...getContainerStyles(),
          ...style,
        }}
        {...props}
      >
        {title && (
          <h4 style={getTitleStyles()}>{title}</h4>
        )}
        
        {items.map((item, index) => (
          <div key={index} style={getSectionStyles()}>
            <label style={getLabelStyles()}>
              {item.label}
            </label>
            
            {item.format === 'custom' ? (
              item.value
            ) : (
              <div style={getValueStyles(item.format)}>
                {item.value}
              </div>
            )}
            
            {item.helperText && (
              <p style={getHelperTextStyles()}>
                {item.helperText}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
);

JobInfoGrid.displayName = 'JobInfoGrid';

export { JobInfoGrid, jobInfoGridVariants };