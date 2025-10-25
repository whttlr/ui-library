import * as React from 'react';
import { tokens } from '../../utils/tokens';

export type Grid12Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Grid12Gap = 'none' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl';

/**
 * Grid12 - 12-Column Grid System Component
 *
 * A flexible 12-column grid layout system with responsive breakpoints
 * and token-based spacing.
 *
 * @example
 * ```tsx
 * <Grid12 gap="md" padding>
 *   <Grid12.Item span={6} spanMd={4} spanLg={3}>
 *     <Card>Content</Card>
 *   </Grid12.Item>
 *   <Grid12.Item span={6} spanMd={8} spanLg={9}>
 *     <Card>Content</Card>
 *   </Grid12.Item>
 * </Grid12>
 * ```
 */
export interface Grid12Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between all items (both row and column) */
  gap?: Grid12Gap;
  /** Gap between rows only (overrides gap) */
  rowGap?: Grid12Gap;
  /** Gap between columns only (overrides gap) */
  columnGap?: Grid12Gap;
  /** Add container padding */
  padding?: boolean;
  /** Custom padding size */
  paddingSize?: Grid12Gap;
}

const Grid12 = React.forwardRef<HTMLDivElement, Grid12Props>(
  ({
    className,
    gap = 'md',
    rowGap,
    columnGap,
    padding = false,
    paddingSize = 'base',
    style,
    children,
    ...props
  }, ref) => {
    // Map gap sizes to token values
    const gapMap: Record<Grid12Gap, string> = {
      'none': tokens.spacing.none,
      'xs': tokens.spacing.xs,
      'sm': tokens.spacing.sm,
      'md': tokens.spacing.md,
      'base': tokens.spacing.base,
      'lg': tokens.spacing.lg,
      'xl': tokens.spacing.xl,
    };

    const gridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: gapMap[gap],
      ...(rowGap && { rowGap: gapMap[rowGap] }),
      ...(columnGap && { columnGap: gapMap[columnGap] }),
      ...(padding && { padding: gapMap[paddingSize] }),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={gridStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid12.displayName = 'Grid12';

/**
 * Grid12.Item - Grid Item Component
 *
 * Child component for Grid12 that spans a specified number of columns.
 * Supports responsive span values at different breakpoints.
 *
 * @example
 * ```tsx
 * <Grid12.Item span={12} spanMd={6} spanLg={4}>
 *   <Card>Responsive content</Card>
 * </Grid12.Item>
 * ```
 */
export interface Grid12ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span (default breakpoint) */
  span?: Grid12Span;
  /** Number of columns to span at sm breakpoint (640px) */
  spanSm?: Grid12Span;
  /** Number of columns to span at md breakpoint (768px) */
  spanMd?: Grid12Span;
  /** Number of columns to span at lg breakpoint (1024px) */
  spanLg?: Grid12Span;
  /** Number of columns to span at xl breakpoint (1280px) */
  spanXl?: Grid12Span;
  /** Number of columns to span at 2xl breakpoint (1536px) */
  span2xl?: Grid12Span;
}

const Grid12Item = React.forwardRef<HTMLDivElement, Grid12ItemProps>(
  ({
    className,
    span = 12,
    spanSm,
    spanMd,
    spanLg,
    spanXl,
    span2xl,
    style,
    children,
    ...props
  }, ref) => {
    // Build responsive grid-column styles
    const buildMediaQueries = () => {
      const mediaQueries: string[] = [];

      // Generate CSS for responsive spans
      const generateSpanCSS = (breakpoint: string, spanValue: Grid12Span) => {
        return `
          @media (min-width: ${tokens.breakpoints[breakpoint as keyof typeof tokens.breakpoints]}) {
            grid-column: span ${spanValue};
          }
        `;
      };

      if (spanSm !== undefined) mediaQueries.push(generateSpanCSS('sm', spanSm));
      if (spanMd !== undefined) mediaQueries.push(generateSpanCSS('md', spanMd));
      if (spanLg !== undefined) mediaQueries.push(generateSpanCSS('lg', spanLg));
      if (spanXl !== undefined) mediaQueries.push(generateSpanCSS('xl', spanXl));
      if (span2xl !== undefined) mediaQueries.push(generateSpanCSS('2xl', span2xl));

      return mediaQueries.join('\n');
    };

    const itemStyles: React.CSSProperties = {
      gridColumn: `span ${span}`,
      minWidth: 0, // Prevent grid blowout
      ...style,
    };

    // For responsive breakpoints, we'll use a className approach
    // Generate a unique style tag if responsive props are provided
    const hasResponsive = spanSm || spanMd || spanLg || spanXl || span2xl;
    const uniqueId = React.useId();
    const responsiveClass = hasResponsive ? `grid12-item-${uniqueId.replace(/:/g, '')}` : '';

    return (
      <>
        {hasResponsive && (
          <style>
            {`.${responsiveClass} {
              grid-column: span ${span};
            }
            ${spanSm !== undefined ? `
              @media (min-width: ${tokens.breakpoints.sm}) {
                .${responsiveClass} {
                  grid-column: span ${spanSm};
                }
              }
            ` : ''}
            ${spanMd !== undefined ? `
              @media (min-width: ${tokens.breakpoints.md}) {
                .${responsiveClass} {
                  grid-column: span ${spanMd};
                }
              }
            ` : ''}
            ${spanLg !== undefined ? `
              @media (min-width: ${tokens.breakpoints.lg}) {
                .${responsiveClass} {
                  grid-column: span ${spanLg};
                }
              }
            ` : ''}
            ${spanXl !== undefined ? `
              @media (min-width: ${tokens.breakpoints.xl}) {
                .${responsiveClass} {
                  grid-column: span ${spanXl};
                }
              }
            ` : ''}
            ${span2xl !== undefined ? `
              @media (min-width: ${tokens.breakpoints['2xl']}) {
                .${responsiveClass} {
                  grid-column: span ${span2xl};
                }
              }
            ` : ''}`}
          </style>
        )}
        <div
          ref={ref}
          className={`${responsiveClass} ${className || ''}`.trim()}
          style={itemStyles}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
Grid12Item.displayName = 'Grid12.Item';

// Attach Item as a compound component
export const Grid12Compound = Object.assign(Grid12, {
  Item: Grid12Item,
});

export { Grid12, Grid12Item };
