# Button Component

A versatile button component with multiple variants, sizes, and states. Includes CNC-specific variants for industrial applications.

## Usage

```tsx
import { Button } from '@whttlr/ui-core';

// Basic usage
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// CNC-specific variants
<Button variant="emergency">Emergency Stop</Button>
<Button variant="success">Start</Button>
<Button variant="warning">Caution</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With icon
<Button icon={<IconComponent />}>With Icon</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// As a link
<Button href="/dashboard">Go to Dashboard</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'emergency' \| 'success' \| 'warning'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading state and disables the button |
| `icon` | `ReactNode` | - | Icon to display in the button |
| `fullWidth` | `boolean` | `false` | Makes the button full width |
| `href` | `string` | - | Renders the button as a link |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

## Variants

### Standard Variants
- **Primary**: Main actions and CTAs
- **Secondary**: Secondary actions
- **Danger**: Destructive actions like delete
- **Ghost**: Subtle actions, often used in toolbars

### CNC-Specific Variants
- **Emergency**: Emergency stop and critical safety actions
- **Success**: Start operations, confirmations
- **Warning**: Caution actions, requires attention

## Accessibility

- Supports keyboard navigation (Tab, Enter, Space)
- Proper ARIA attributes for states (disabled, loading)
- Focus indicators for keyboard users
- Screen reader friendly with descriptive labels

## Examples

### Loading State with Async Action
```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  await saveData();
  setIsLoading(false);
};

<Button loading={isLoading} onClick={handleSubmit}>
  Save Changes
</Button>
```

### Emergency Stop Button
```tsx
<Button 
  variant="emergency" 
  size="lg"
  onClick={emergencyStop}
>
  EMERGENCY STOP
</Button>
```

### Button Group
```tsx
<div className="button-group">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</div>
```

## Design Tokens

The Button component uses the following design tokens from the theme:

- Colors: `primary`, `secondary`, `danger`, `success`, `warning`, `error`
- Spacing: `xs`, `sm`, `md`, `lg`
- Border radius: `sm`, `md`, `lg`
- Typography: `button` text style
- Shadows: `sm` for hover states

## Related Components

- [IconButton](../IconButton/README.md) - Button with only an icon
- [ButtonGroup](../ButtonGroup/README.md) - Group multiple buttons together
- [FloatingActionButton](../../mobile/FloatingActionButton/README.md) - Mobile-specific FAB