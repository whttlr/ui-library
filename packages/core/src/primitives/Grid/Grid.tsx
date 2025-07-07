import * as React from 'react';
import {
  tokens,
  getGridGapStyles,
  getFlexGapStyles,
  getContainerSizeStyles,
  getContainerPaddingStyles,
  getStackSpacingStyles,
} from '../../utils/tokens';

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

export {
  Grid, GridItem, DashboardGrid, ControlGrid, JogGrid,
  Flex, Container, Stack,
};