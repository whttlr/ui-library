import * as React from 'react';
import { tokens } from '../../utils/tokens';

export type ButtonGroupGap = 'none' | 'xs' | 'sm' | 'md' | 'base';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupAlign = 'left' | 'center' | 'right' | 'space-between';

/**
 * ButtonGroup - Button Layout Manager Component
 *
 * Manages layout and spacing for groups of buttons with support for
 * various alignments, orientations, and sizing options.
 *
 * @example
 * ```tsx
 * <ButtonGroup align="right" gap="sm">
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </ButtonGroup>
 * ```
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction */
  orientation?: ButtonGroupOrientation;
  /** Make all buttons span full width */
  fullWidth?: boolean;
  /** Make buttons split available space equally */
  split?: boolean;
  /** Alignment of buttons within the container */
  align?: ButtonGroupAlign;
  /** Gap between buttons */
  gap?: ButtonGroupGap;
  /** Attach buttons together (no gap, shared borders) */
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({
    className,
    orientation = 'horizontal',
    fullWidth = false,
    split = false,
    align = 'left',
    gap = 'sm',
    attached = false,
    style,
    children,
    ...props
  }, ref) => {
    // Map gap sizes to token values
    const gapMap: Record<ButtonGroupGap, string> = {
      'none': tokens.spacing.none,
      'xs': tokens.spacing.xs,
      'sm': tokens.spacing.sm,
      'md': tokens.spacing.md,
      'base': tokens.spacing.base,
    };

    // Map align to justify-content values
    const alignMap: Record<ButtonGroupAlign, React.CSSProperties['justifyContent']> = {
      'left': 'flex-start',
      'center': 'center',
      'right': 'flex-end',
      'space-between': 'space-between',
    };

    const baseStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: attached ? '0' : gapMap[gap],
      justifyContent: alignMap[align],
      alignItems: orientation === 'vertical' ? 'stretch' : 'center',
      flexWrap: 'wrap',
      ...style,
    };

    // Clone children to apply consistent sizing
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const childStyles: React.CSSProperties = {
        ...((fullWidth || split) && {
          flex: split ? 1 : undefined,
          width: fullWidth ? '100%' : undefined,
          minWidth: 0, // Prevent flex blowout
        }),
      };

      // Handle attached buttons (shared borders)
      if (attached) {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        if (orientation === 'horizontal') {
          Object.assign(childStyles, {
            borderRadius: 0,
            ...(isFirst && {
              borderTopLeftRadius: tokens.radius.base,
              borderBottomLeftRadius: tokens.radius.base,
            }),
            ...(isLast && {
              borderTopRightRadius: tokens.radius.base,
              borderBottomRightRadius: tokens.radius.base,
            }),
            ...(!isLast && {
              borderRight: 'none',
            }),
          });
        } else {
          Object.assign(childStyles, {
            borderRadius: 0,
            ...(isFirst && {
              borderTopLeftRadius: tokens.radius.base,
              borderTopRightRadius: tokens.radius.base,
            }),
            ...(isLast && {
              borderBottomLeftRadius: tokens.radius.base,
              borderBottomRightRadius: tokens.radius.base,
            }),
            ...(!isLast && {
              borderBottom: 'none',
            }),
          });
        }
      }

      return React.cloneElement(child, {
        style: {
          ...childStyles,
          ...((child.props as any).style || {}),
        },
      } as any);
    });

    return (
      <div
        ref={ref}
        className={className}
        style={baseStyles}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

/**
 * ButtonGroup.Section - Section within a ButtonGroup
 *
 * Creates a logical section within a button group, useful for
 * organizing buttons into semantic groups.
 *
 * @example
 * ```tsx
 * <ButtonGroup align="space-between">
 *   <ButtonGroup.Section>
 *     <Button>Action 1</Button>
 *     <Button>Action 2</Button>
 *   </ButtonGroup.Section>
 *   <ButtonGroup.Section>
 *     <Button variant="primary">Submit</Button>
 *   </ButtonGroup.Section>
 * </ButtonGroup>
 * ```
 */
export interface ButtonGroupSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between buttons in this section */
  gap?: ButtonGroupGap;
}

const ButtonGroupSection = React.forwardRef<HTMLDivElement, ButtonGroupSectionProps>(
  ({
    className,
    gap = 'sm',
    style,
    children,
    ...props
  }, ref) => {
    const gapMap: Record<ButtonGroupGap, string> = {
      'none': tokens.spacing.none,
      'xs': tokens.spacing.xs,
      'sm': tokens.spacing.sm,
      'md': tokens.spacing.md,
      'base': tokens.spacing.base,
    };

    const sectionStyles: React.CSSProperties = {
      display: 'flex',
      gap: gapMap[gap],
      alignItems: 'center',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={sectionStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroupSection.displayName = 'ButtonGroup.Section';

// Attach Section as compound component
export const ButtonGroupCompound = Object.assign(ButtonGroup, {
  Section: ButtonGroupSection,
});

export { ButtonGroup, ButtonGroupSection };
