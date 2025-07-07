# How to Create a Component the Right Way

> **The Complete Guide to Building Design Token-Based Components**
> 
> This guide shows you how to create components that are consistent, maintainable, and follow the Whttlr UI Library design system patterns.

## 📋 Table of Contents

1. [Philosophy & Principles](#philosophy--principles)
2. [Before You Start](#before-you-start)
3. [Step-by-Step Component Creation](#step-by-step-component-creation)
4. [Design Token Usage](#design-token-usage)
5. [Component Anatomy](#component-anatomy)
6. [Testing & Documentation](#testing--documentation)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Philosophy & Principles

### **The Token-First Approach**
- **Never use hardcoded values** (colors, spacing, fonts, etc.)
- **Always use design tokens** from `@whttlr/ui-theme`
- **Create reusable patterns** that other components can follow
- **Maintain visual consistency** across the entire library

### **Core Principles**
1. **Consistency**: All components use the same design language
2. **Maintainability**: Change tokens in one place, affects all components
3. **Accessibility**: Built-in contrast ratios and accessible patterns
4. **Performance**: Optimized bundle sizes and efficient styling
5. **Developer Experience**: Clear APIs and intuitive usage

---

## 🛠 Before You Start

### **Required Tools**
- Latest Node.js and npm/pnpm
- TypeScript knowledge
- Understanding of React patterns
- Familiarity with design tokens concept

### **Project Setup Check**
```bash
# Ensure you're in the project root
cd /path/to/ui-library

# Install dependencies
npm install

# Build theme package (required for tokens)
npx turbo run build --filter=@whttlr/ui-theme
```

### **Understanding the Architecture**
```
packages/
├── theme/                  # Design tokens and theme system
│   ├── tokens/            # All design tokens live here
│   └── utils.ts          # Theme utilities (cn function)
├── core/                  # Core UI components
│   ├── primitives/       # Basic components (Button, Input, etc.)
│   ├── complex/          # Advanced components (DataTable, etc.)
│   └── utils/tokens.ts   # Token access utilities
```

---

## 🏗 Step-by-Step Component Creation

### **Step 1: Plan Your Component**

**Ask yourself:**
- What variants will this component have? (size, color, state)
- What props does it need?
- How should it behave on mobile?
- Does it need CNC-specific variants?

**Example: Creating a `StatusCard` component**
- Variants: `default`, `success`, `warning`, `error`, `cnc`
- Sizes: `sm`, `md`, `lg`
- Props: `title`, `value`, `icon`, `variant`, `size`

### **Step 2: Create the Component File Structure**

```bash
# Navigate to the appropriate package
cd packages/core/src/primitives

# Create component directory
mkdir StatusCard
cd StatusCard

# Create required files
touch StatusCard.tsx
touch StatusCard.stories.tsx
touch index.ts
```

### **Step 3: Import Required Dependencies**

```typescript
// StatusCard.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { 
  tokens, 
  getCardVariantStyles, 
  getCardSizeStyles 
} from '../../utils/tokens';
```

### **Step 4: Define Your Component Variants (CVA)**

```typescript
const statusCardVariants = cva(
  // Base classes - use CSS classes for complex styles
  'rounded-lg border transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        success: 'border-green-500 bg-green-50',
        warning: 'border-yellow-500 bg-yellow-50', 
        error: 'border-red-500 bg-red-50',
        cnc: 'cnc-panel border-blue-500',
      },
      size: {
        sm: 'p-3',
        md: 'p-4', 
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### **Step 5: Create Token-Based Style Functions**

```typescript
// Use tokens for all hardcoded values
const getStatusCardInlineStyles = (variant: string = 'default', size: string = 'md') => {
  return {
    ...getCardBaseStyles(),
    ...getCardSizeStyles(size),
    ...getStatusCardVariantStyles(variant),
  };
};

// Define variant-specific styles using tokens
const getStatusCardVariantStyles = (variant: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: tokens.colors.bg.secondary,
      borderColor: tokens.colors.border.primary,
      color: tokens.colors.text.primary,
    },
    success: {
      backgroundColor: tokens.colors.statusBg.success,
      borderColor: tokens.colors.status.success,
      color: tokens.colors.text.primary,
    },
    warning: {
      backgroundColor: tokens.colors.statusBg.warning,
      borderColor: tokens.colors.status.warning,
      color: tokens.colors.text.primary,
    },
    error: {
      backgroundColor: tokens.colors.statusBg.error,
      borderColor: tokens.colors.status.error,
      color: tokens.colors.text.primary,
    },
    cnc: {
      backgroundColor: tokens.colors.status.info,
      borderColor: tokens.colors.border.focus,
      color: tokens.colors.text.primary,
    },
  };
  
  return styles[variant] || styles.default;
};

// Size styles using component tokens
const getCardSizeStyles = (size: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    sm: {
      padding: tokens.card.padding.sm,
      fontSize: tokens.text.size.sm[0],
    },
    md: {
      padding: tokens.card.padding.md,
      fontSize: tokens.text.size.base[0],
    },
    lg: {
      padding: tokens.card.padding.lg,
      fontSize: tokens.text.size.lg[0],
    },
  };
  
  return styles[size] || styles.md;
};

// Base styles using design tokens
const getCardBaseStyles = (): React.CSSProperties => ({
  borderRadius: tokens.radius.lg,
  border: `1px solid ${tokens.colors.border.primary}`,
  transition: tokens.transition.default,
  fontFamily: tokens.text.family.sans.join(', '),
});
```

### **Step 6: Define TypeScript Interface**

```typescript
export interface StatusCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}
```

### **Step 7: Implement the Component**

```typescript
const StatusCard = React.forwardRef<HTMLDivElement, StatusCardProps>(
  ({ 
    title,
    value,
    icon,
    loading = false,
    className, 
    variant, 
    size, 
    style,
    onClick,
    ...props 
  }, ref) => {
    const inlineStyles = getStatusCardInlineStyles(variant, size);
    
    return (
      <div
        ref={ref}
        className={cn(statusCardVariants({ variant, size }), className)}
        style={{ ...inlineStyles, ...style }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...props}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          {icon && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              color: variant === 'default' ? tokens.colors.text.secondary : 'currentColor'
            }}>
              {icon}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: tokens.text.size.sm[0],
              fontWeight: tokens.text.weight.medium,
              color: tokens.colors.text.secondary,
              marginBottom: tokens.spacing.xs,
            }}>
              {title}
            </div>
            <div style={{ 
              fontSize: size === 'sm' ? tokens.text.size.lg[0] : tokens.text.size['2xl'][0],
              fontWeight: tokens.text.weight.bold,
              color: tokens.colors.text.primary,
              fontFamily: tokens.text.family.mono.join(', '), // Monospace for numbers
            }}>
              {loading ? '...' : value}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StatusCard.displayName = 'StatusCard';

export { StatusCard, statusCardVariants };
```

### **Step 8: Create the Index File**

```typescript
// index.ts
export { StatusCard, statusCardVariants } from './StatusCard';
export type { StatusCardProps } from './StatusCard';
```

### **Step 9: Add to Parent Index**

```typescript
// packages/core/src/primitives/index.ts
export * from './StatusCard';
```

---

## 🎨 Design Token Usage

### **Available Token Categories**

```typescript
import { tokens } from '../../utils/tokens';

// Colors
tokens.colors.bg.primary           // Background colors
tokens.colors.text.primary         // Text colors  
tokens.colors.border.primary       // Border colors
tokens.colors.primary.main         // Brand colors
tokens.colors.status.success       // Status colors

// Layout
tokens.spacing.sm                  // Spacing scale
tokens.radius.lg                   // Border radius
tokens.card.padding.md            // Component-specific spacing

// Typography  
tokens.text.size.base[0]          // Font sizes (use [0] for string value)
tokens.text.weight.medium         // Font weights
tokens.text.family.sans           // Font families

// Visual Effects
tokens.transition.default         // Transitions
tokens.shadows.lg                 // Box shadows
tokens.animation.spin             // Animations
```

### **When to Use Each Token Type**

| Use Case | Token Category | Example |
|----------|---------------|---------|
| **Background colors** | `tokens.colors.bg.*` | `backgroundColor: tokens.colors.bg.primary` |
| **Text colors** | `tokens.colors.text.*` | `color: tokens.colors.text.secondary` |
| **Component spacing** | `tokens.spacing.*` | `margin: tokens.spacing.md` |
| **Component-specific sizes** | `tokens.[component].*` | `height: tokens.button.height.lg` |
| **Interactive states** | `tokens.colors.interactive.*` | `backgroundColor: tokens.colors.interactive.hover` |
| **Status indicators** | `tokens.colors.status.*` | `borderColor: tokens.colors.status.error` |

### **Common Patterns**

```typescript
// Interactive hover states
'&:hover': {
  backgroundColor: tokens.colors.interactive.hover,
  transform: 'translateY(-1px)',
}

// Focus states
'&:focus-visible': {
  outline: `2px solid ${tokens.colors.border.focus}`,
  outlineOffset: '2px',
}

// Disabled states
'&:disabled': {
  opacity: 0.5,
  cursor: 'not-allowed',
  backgroundColor: tokens.colors.interactive.disabled,
}
```

---

## 🧬 Component Anatomy

### **Standard Component Structure**

```typescript
// 1. Imports
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';

// 2. CVA Variants (for CSS classes)
const componentVariants = cva(/* base classes */, {
  variants: { /* variant definitions */ },
  defaultVariants: { /* defaults */ },
});

// 3. TypeScript Interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Component-specific props
}

// 4. Token-based Style Functions
const getComponentStyles = (variant: string, size: string) => { /* ... */ };

// 5. Component Implementation
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ /* props */ }, ref) => {
    // Logic and rendering
  }
);

// 6. Export
Component.displayName = 'Component';
export { Component, componentVariants };
```

### **Required Elements**

✅ **React.forwardRef** - For ref forwarding  
✅ **VariantProps** - For variant type safety  
✅ **Design tokens** - No hardcoded values  
✅ **DisplayName** - For debugging  
✅ **Proper exports** - Component and variants  
✅ **TypeScript types** - Full type safety  

---

## 📚 Testing & Documentation

### **Create Storybook Stories**

```typescript
// StatusCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StatusCard } from './StatusCard';
import { Activity, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const meta: Meta<typeof StatusCard> = {
  title: 'Primitives/StatusCard',
  component: StatusCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status card component for displaying key metrics and values with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'cnc'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {
  args: {
    title: 'Active Jobs',
    value: '24',
    icon: <Activity size={20} />,
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      <StatusCard title="Default" value="100" icon={<Activity size={20} />} />
      <StatusCard title="Success" value="98%" variant="success" icon={<CheckCircle size={20} />} />
      <StatusCard title="Warning" value="75°C" variant="warning" icon={<AlertTriangle size={20} />} />
      <StatusCard title="Error" value="3" variant="error" icon={<XCircle size={20} />} />
      <StatusCard title="CNC Status" value="Running" variant="cnc" icon={<Zap size={20} />} />
    </div>
  ),
};

// Size variants  
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <StatusCard title="Small" value="42" size="sm" icon={<Activity size={16} />} />
      <StatusCard title="Medium" value="42" size="md" icon={<Activity size={20} />} />
      <StatusCard title="Large" value="42" size="lg" icon={<Activity size={24} />} />
    </div>
  ),
};
```

### **Testing Checklist**

- [ ] Component renders without errors
- [ ] All variants display correctly
- [ ] All sizes work properly
- [ ] Props are properly typed
- [ ] Responsive behavior works
- [ ] Accessibility features work
- [ ] Hover/focus states work
- [ ] Storybook stories are comprehensive

---

## 🔧 Common Patterns

### **Conditional Styling with Tokens**

```typescript
// Conditional styles based on props
const getConditionalStyles = (isActive: boolean, variant: string) => ({
  backgroundColor: isActive 
    ? tokens.colors.primary.main 
    : tokens.colors.bg.secondary,
  borderColor: variant === 'error' 
    ? tokens.colors.status.error 
    : tokens.colors.border.primary,
});
```

### **Responsive Styling**

```typescript
// Mobile-first approach using tokens
const getResponsiveStyles = (): React.CSSProperties => ({
  padding: tokens.spacing.sm,
  fontSize: tokens.text.size.sm[0],
  
  // Use CSS media queries for responsive behavior
  '@media (min-width: 768px)': {
    padding: tokens.spacing.md,
    fontSize: tokens.text.size.base[0],
  },
});
```

### **Animation & Transitions**

```typescript
// Use token-based animations
const getAnimatedStyles = (): React.CSSProperties => ({
  transition: tokens.transition.smooth,
  transform: 'translateZ(0)', // Hardware acceleration
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: tokens.shadows.lg,
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
});
```

### **CNC-Specific Components**

```typescript
// CNC components should use specialized tokens
const getCNCStyles = (): React.CSSProperties => ({
  backgroundColor: tokens.colors.status.info,
  color: tokens.colors.text.primary,
  fontFamily: tokens.text.family.mono.join(', '), // Monospace for precision
  fontSize: tokens.cnc.displayFontSize.lg,
  padding: tokens.cnc.coordinatePadding,
});
```

---

## 🔍 Troubleshooting

### **Common Issues & Solutions**

#### **Issue: "Cannot find module '@whttlr/ui-theme'"**
```bash
# Solution: Build the theme package first
npx turbo run build --filter=@whttlr/ui-theme
```

#### **Issue: "Property does not exist on type 'tokens'"**
```typescript
// Solution: Check if you're importing the right tokens
import { tokens } from '../../utils/tokens'; // ✅ Correct
import { tokens } from '@whttlr/ui-theme'; // ❌ Wrong
```

#### **Issue: "Hardcoded values detected"**
```typescript
// ❌ Don't do this
backgroundColor: '#3b82f6',
padding: '8px 16px',

// ✅ Do this instead  
backgroundColor: tokens.colors.primary.main,
padding: tokens.button.padding.md,
```

#### **Issue: "Component doesn't match designs"**
1. Check if you're using the right variant tokens
2. Verify design token values match expected values
3. Ensure you're not overriding tokens with hardcoded values

### **Debugging Tips**

```typescript
// Add debug logging to see which tokens are being used
console.log('Current tokens:', {
  bg: tokens.colors.bg.primary,
  text: tokens.colors.text.primary,
  spacing: tokens.spacing.md,
});
```

---

## 📋 Checklist: Ready to Ship

Before considering your component complete:

### **Code Quality**
- [ ] No hardcoded colors, spacing, or typography values
- [ ] All styles use design tokens from `tokens.*`
- [ ] TypeScript interfaces are properly defined
- [ ] Component is properly exported
- [ ] Proper error handling for edge cases

### **Design System Compliance**
- [ ] Follows established variant patterns
- [ ] Uses consistent naming conventions
- [ ] Supports dark theme (via tokens)
- [ ] Mobile-responsive design
- [ ] Accessibility features included

### **Documentation**
- [ ] Comprehensive Storybook stories
- [ ] All variants demonstrated
- [ ] Props documented with examples
- [ ] Usage guidelines included

### **Testing**
- [ ] Component renders correctly
- [ ] All variants work as expected  
- [ ] Responsive behavior verified
- [ ] Accessibility tested
- [ ] No console errors

### **Performance**
- [ ] No unnecessary re-renders
- [ ] Efficient style calculations
- [ ] Proper memoization if needed
- [ ] Bundle size impact considered

---

## 🎓 Advanced Topics

### **Creating Custom Token Utilities**

If you need component-specific tokens not covered by existing utilities:

```typescript
// Add to packages/core/src/utils/tokens.ts
export const getMyComponentStyles = (variant: string): React.CSSProperties => {
  // Your custom token logic here
};
```

### **Extending the Token System**

To add new tokens:

1. Add to appropriate file in `packages/theme/src/tokens/`
2. Export from `packages/theme/src/tokens/index.ts`
3. Add to token utilities in `packages/core/src/utils/tokens.ts`

### **Theme Variants**

For components that need theme-specific behavior:

```typescript
// Use theme-aware token access
const getThemeVariantStyles = (theme: 'dark' | 'light' = 'dark') => {
  const themeTokens = theme === 'dark' ? tokens.colors : lightThemeTokens.colors;
  return {
    backgroundColor: themeTokens.bg.primary,
    color: themeTokens.text.primary,
  };
};
```

---

## 🔗 Related Resources

- **[Button Component Example](./packages/core/src/primitives/Button/Button.tsx)** - Reference implementation
- **[Design Tokens Documentation](./packages/theme/src/tokens/)** - All available tokens
- **[Storybook Examples](./packages/core/src/primitives/Button/Button.stories.tsx)** - Story patterns
- **[CLAUDE.md](./CLAUDE.md)** - Project architecture overview

---

## 💡 Tips for Success

1. **Start with tokens** - Import tokens first, then build your component
2. **Follow the Button pattern** - It's the gold standard reference
3. **Test early and often** - Use Storybook for rapid iteration
4. **Think mobile-first** - Ensure responsive behavior from the start
5. **Document as you go** - Write Storybook stories alongside development
6. **Ask for review** - Get feedback before finalizing your component

---

**Remember: The goal is consistency, maintainability, and an excellent developer experience. When in doubt, follow the established patterns and use design tokens for everything!** 🎯