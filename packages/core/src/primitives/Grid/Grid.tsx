import * as React from 'react';
import {
  getGridGapStyles,
  getFlexGapStyles,
  getContainerSizeStyles,
  getContainerPaddingStyles,
  getStackSpacingStyles,
} from '../../utils/tokens';
import { tokens } from '../../tokens';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className, cols = 1, gap = 'md', responsive = false, style, ...props
  }, ref) => {
    const gridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      ...getGridGapStyles(gap),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={gridStyles}
        {...props}
      />
    );
  },
);
Grid.displayName = 'Grid';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({
    className, colSpan = 1, rowSpan = 1, style, ...props
  }, ref) => {
    const gridItemStyles: React.CSSProperties = {
      gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
      gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={gridItemStyles}
        {...props}
      />
    );
  },
);
GridItem.displayName = 'GridItem';

// CNC-specific grid variants
const DashboardGrid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className, cols = 4, gap = 'lg', style, ...props
  }, ref) => (
      <Grid
        ref={ref}
        cols={cols}
        gap={gap}
        className={className}
        style={{
          minHeight: '600px',
          gridAutoRows: '1fr',
          ...style,
        }}
        {...props}
      />
  ),
);
DashboardGrid.displayName = 'DashboardGrid';

const ControlGrid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className, cols = 3, gap = 'md', style, ...props
  }, ref) => (
      <Grid
        ref={ref}
        cols={cols}
        gap={gap}
        responsive={false}
        className={className}
        style={{
          height: '100%',
          ...style,
        }}
        {...props}
      />
  ),
);
ControlGrid.displayName = 'ControlGrid';

const JogGrid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className, cols = 3, gap = 'sm', style, ...props
  }, ref) => (
      <Grid
        ref={ref}
        cols={cols}
        gap={gap}
        responsive={false}
        className={className}
        style={{
          maxWidth: '20rem',
          margin: '0 auto',
          ...style,
        }}
        {...props}
      />
  ),
);
JogGrid.displayName = 'JogGrid';

// Flex Layout Components
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({
    className,
    direction = 'row',
    align = 'start',
    justify = 'start',
    wrap = false,
    gap = 'none',
    style,
    ...props
  }, ref) => {
    const getFlexDirection = (): React.CSSProperties['flexDirection'] => {
      switch (direction) {
        case 'row': return 'row';
        case 'column': return 'column';
        case 'row-reverse': return 'row-reverse';
        case 'column-reverse': return 'column-reverse';
        default: return 'row';
      }
    };

    const getAlignItems = (): React.CSSProperties['alignItems'] => {
      switch (align) {
        case 'start': return 'flex-start';
        case 'center': return 'center';
        case 'end': return 'flex-end';
        case 'stretch': return 'stretch';
        case 'baseline': return 'baseline';
        default: return 'flex-start';
      }
    };

    const getJustifyContent = (): React.CSSProperties['justifyContent'] => {
      switch (justify) {
        case 'start': return 'flex-start';
        case 'center': return 'center';
        case 'end': return 'flex-end';
        case 'between': return 'space-between';
        case 'around': return 'space-around';
        case 'evenly': return 'space-evenly';
        default: return 'flex-start';
      }
    };

    const flexStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: getFlexDirection(),
      alignItems: getAlignItems(),
      justifyContent: getJustifyContent(),
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...getFlexGapStyles(gap),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={flexStyles}
        {...props}
      />
    );
  },
);
Flex.displayName = 'Flex';

// Container Component
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({
    className,
    size = 'lg',
    center = true,
    padding = 'md',
    style,
    ...props
  }, ref) => {
    const containerStyles: React.CSSProperties = {
      width: '100%',
      ...getContainerSizeStyles(size),
      margin: center ? '0 auto' : undefined,
      ...getContainerPaddingStyles(padding),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        {...props}
      />
    );
  },
);
Container.displayName = 'Container';

// Stack Component for vertical layouts
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({
    className,
    spacing = 'md',
    align = 'start',
    style,
    ...props
  }, ref) => {
    const getAlign = (): React.CSSProperties['alignItems'] => {
      switch (align) {
        case 'start': return 'flex-start';
        case 'center': return 'center';
        case 'end': return 'flex-end';
        case 'stretch': return 'stretch';
        default: return 'flex-start';
      }
    };

    const stackStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...getStackSpacingStyles(spacing),
      alignItems: getAlign(),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={stackStyles}
        {...props}
      />
    );
  },
);
Stack.displayName = 'Stack';

// 12-Column Responsive Grid System
export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12; // Common divisors of 12
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean; // Auto-adjust columns on mobile
}

const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({
    className,
    cols = 1,
    gap = 'md',
    rowGap,
    padding = 'md',
    responsive = true,
    style,
    ...props
  }, ref) => {
    // Dynamic padding based on column count
    // More columns = more padding for visual breathing room
    const getPaddingForCols = (): string => {
      if (padding === 'none') return '0';

      const basePadding = {
        xs: tokens.spacing.xs,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.base,
        xl: tokens.spacing.lg,
      }[padding] || tokens.spacing.md;

      // Increase padding for multi-column layouts
      if (cols >= 3) {
        return tokens.spacing.xl; // More padding for 3+ columns (2rem)
      } else if (cols === 2) {
        return tokens.spacing.lg; // Medium padding for 2 columns (1.5rem)
      }
      return basePadding; // Base padding for single column
    };

    const getGapSize = (gapSize: string): string => {
      return {
        none: '0',
        xs: tokens.spacing.xs,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
        xl: tokens.spacing.xl,
      }[gapSize] || tokens.spacing.md;
    };

    const gridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: rowGap ? `${getGapSize(rowGap)} ${getGapSize(gap)}` : getGapSize(gap),
      padding: getPaddingForCols(),
      ...style,
    };

    // Note: Responsive behavior would require CSS classes or media queries
    // For now, using static grid columns. Consider adding className support.

    return (
      <div
        ref={ref}
        className={className}
        style={gridStyles}
        {...props}
      />
    );
  },
);
ResponsiveGrid.displayName = 'ResponsiveGrid';

// Grid Column Component (for 12-column system)
export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // How many columns to span
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // How many columns to offset
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Span on small screens
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Span on medium screens
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Span on large screens
}

const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({
    className,
    span = 12,
    offset = 0,
    sm,
    md,
    lg,
    style,
    ...props
  }, ref) => {
    const colStyles: React.CSSProperties = {
      gridColumn: `span ${span}`,
      gridColumnStart: offset > 0 ? offset + 1 : undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={colStyles}
        {...props}
      />
    );
  },
);
GridCol.displayName = 'GridCol';

// Button width utilities
export interface GridButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean; // 100% width minus card padding
  halfWidth?: boolean; // 50% width for side-by-side buttons
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

const GridButton = React.forwardRef<HTMLButtonElement, GridButtonProps>(
  ({
    className,
    fullWidth = false,
    halfWidth = false,
    variant = 'primary',
    style,
    ...props
  }, ref) => {
    const getVariantStyles = (): React.CSSProperties => {
      const variants = {
        primary: {
          backgroundColor: tokens.colors.cnc.primary,
          color: tokens.colors.text.primary,
          border: 'none',
        },
        secondary: {
          backgroundColor: tokens.colors.bg.secondary,
          color: tokens.colors.text.primary,
          border: `1px solid ${tokens.colors.border.default}`,
        },
        danger: {
          backgroundColor: tokens.colors.bg.error,
          color: tokens.colors.text.primary,
          border: 'none',
        },
        success: {
          backgroundColor: tokens.colors.bg.success,
          color: tokens.colors.text.primary,
          border: 'none',
        },
      };
      return variants[variant];
    };

    const buttonStyles: React.CSSProperties = {
      padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
      borderRadius: tokens.radius.base,
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: tokens.transitions.all,
      width: fullWidth ? '100%' : halfWidth ? 'calc(50% - 0.25rem)' : 'auto',
      ...getVariantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        className={className}
        style={buttonStyles}
        {...props}
      />
    );
  },
);
GridButton.displayName = 'GridButton';

// Card Footer Component (ignores card inner padding)
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean; // Stick to bottom of card
  borderTop?: boolean; // Add top border separator
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({
    className,
    sticky = false,
    borderTop = true,
    style,
    ...props
  }, ref) => {
    const footerStyles: React.CSSProperties = {
      // Negative margins to escape card padding (assuming card uses lg padding)
      marginLeft: `-${tokens.spacing.lg}`,
      marginRight: `-${tokens.spacing.lg}`,
      marginBottom: `-${tokens.spacing.lg}`,
      // Add back padding for content
      padding: tokens.spacing.lg,
      borderTop: borderTop ? `1px solid ${tokens.colors.border.default}` : 'none',
      backgroundColor: tokens.colors.bg.secondary,
      borderBottomLeftRadius: tokens.radius.base,
      borderBottomRightRadius: tokens.radius.base,
      // Sticky positioning if requested
      ...(sticky ? {
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
      } as React.CSSProperties : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={footerStyles}
        {...props}
      />
    );
  },
);
CardFooter.displayName = 'CardFooter';

export {
  Grid, GridItem, DashboardGrid, ControlGrid, JogGrid,
  Flex, Stack,
  ResponsiveGrid, GridCol, GridButton, CardFooter,
};

// Note: Container is exported from primitives/Container instead to avoid naming conflicts