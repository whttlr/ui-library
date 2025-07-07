import * as React from 'react';
import { cn } from '../../utils';
import {
  tokens,
  getTypographyColorStyles,
  getTypographyVariantStyles,
  getTypographyGradientStyles,
} from '../../utils/tokens';

export type TypographyColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'cnc' | 'muted' | 'accent';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'button' | 'link' | 'monospace';
  color?: TypographyColor;
  gradient?: boolean | 'primary' | 'blue' | 'green' | 'orange' | 'pink' | 'cyan';
  strikethrough?: boolean;
  bold?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body', color = 'default', gradient, strikethrough, bold, as, children, style, ...props }, ref) => {
    const getElement = () => {
      if (as) return as;
      switch (variant) {
        case 'h1': return 'h1';
        case 'h2': return 'h2';
        case 'h3': return 'h3';
        case 'h4': return 'h4';
        case 'h5': return 'h5';
        case 'h6': return 'h6';
        case 'link': return 'a';
        default: return 'p';
      }
    };

    const getStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        margin: 0,
        fontFamily: tokens.text.family.sans.join(', '),
        ...getTypographyColorStyles(color),
      };

      let computedStyles = { ...baseStyles, ...getTypographyVariantStyles(variant) };

      if (gradient) {
        computedStyles = {
          ...computedStyles,
          ...getTypographyGradientStyles(gradient),
        };
      }

      if (strikethrough) {
        computedStyles.textDecoration = 'line-through';
      }

      if (bold) {
        computedStyles.fontWeight = tokens.text.weight.bold;
      }

      return computedStyles;
    };

    const Element = getElement() as any;

    return (
      <Element
        ref={ref}
        className={cn(className)}
        style={{ ...getStyles(), ...style }}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';

// Pre-configured heading components
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
);
H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
);
H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
);
H3.displayName = 'H3';

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h4" {...props} />
);
H4.displayName = 'H4';

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h5" {...props} />
);
H5.displayName = 'H5';

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(  
  (props, ref) => <Typography ref={ref} variant="h6" {...props} />
);
H6.displayName = 'H6';

export const Body = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="body" {...props} />
);
Body.displayName = 'Body';

export const Caption = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="caption" {...props} />
);
Caption.displayName = 'Caption';

export const Link = React.forwardRef<HTMLAnchorElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="link" {...props} />
);
Link.displayName = 'Link';

export const Monospace = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="monospace" {...props} />
);
Monospace.displayName = 'Monospace';