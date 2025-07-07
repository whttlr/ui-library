# Card Component

A flexible container component that groups related content and actions. Includes CNC-specific variants for status displays and dashboard metrics.

## Usage

```tsx
import { Card } from '@whttlr/ui-core';

// Basic usage
<Card>
  <p>Basic card content</p>
</Card>

// With title and extra content
<Card 
  title="Settings" 
  extra={<Button size="sm">Edit</Button>}
>
  <p>Configuration options</p>
</Card>

// Different variants
<Card variant="default">Default card</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="elevated">Elevated card</Card>

// CNC-specific variants
<Card variant="status" status="connected">
  Machine Status: Online
</Card>

<Card variant="dashboard" metric="42.5°C" label="Temperature">
  Current machine temperature
</Card>

// With actions
<Card 
  title="Job #1234"
  actions={[
    <Button key="start">Start</Button>,
    <Button key="pause">Pause</Button>
  ]}
>
  Job details and controls
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'status' \| 'dashboard'` | `'default'` | Card style variant |
| `title` | `ReactNode` | - | Card title in header |
| `extra` | `ReactNode` | - | Extra content in header (usually actions) |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding size |
| `hoverable` | `boolean` | `false` | Adds hover effects |
| `loading` | `boolean` | `false` | Shows loading skeleton |
| `actions` | `ReactNode[]` | - | Action buttons in footer |
| `cover` | `ReactNode` | - | Cover image or media |
| `fullWidth` | `boolean` | `false` | Makes card full width |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### CNC-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'connected' \| 'disconnected' \| 'error' \| 'warning'` | - | Status indicator for status variant |
| `metric` | `string` | - | Metric value for dashboard variant |
| `label` | `string` | - | Metric label for dashboard variant |

## Variants

### Standard Variants
- **Default**: Basic card with subtle border
- **Outlined**: Card with prominent border
- **Elevated**: Card with shadow elevation

### CNC-Specific Variants
- **Status**: Displays machine/connection status with color indicators
- **Dashboard**: Shows metrics and KPIs with large numbers

## Examples

### Status Card for Machine Monitoring
```tsx
<Card 
  variant="status" 
  status="connected"
  title="CNC Machine #1"
  extra={<Badge status="success">Online</Badge>}
>
  <div>
    <p>Last update: 2 seconds ago</p>
    <p>Position: X: 120.5, Y: 85.2, Z: 15.0</p>
  </div>
</Card>
```

### Dashboard Metric Card
```tsx
<Card 
  variant="dashboard"
  metric="1,247"
  label="Parts Completed"
  hoverable
  onClick={() => showDetails()}
>
  <div className="metric-details">
    <span className="trend">↑ 12% from yesterday</span>
  </div>
</Card>
```

### Card with Complex Content
```tsx
<Card 
  title="Job Queue"
  extra={
    <ButtonGroup>
      <Button size="sm">Refresh</Button>
      <Button size="sm">Settings</Button>
    </ButtonGroup>
  }
  actions={[
    <Button key="clear" variant="danger">Clear All</Button>,
    <Button key="start" variant="primary">Start Queue</Button>
  ]}
>
  <JobList jobs={jobs} />
</Card>
```

### Loading State
```tsx
<Card title="Loading Data..." loading>
  {/* Content will be replaced with skeleton */}
</Card>
```

### Card Grid Layout
```tsx
<div className="card-grid">
  <Card variant="dashboard" metric="98.5%" label="Uptime" />
  <Card variant="dashboard" metric="42°C" label="Temperature" />
  <Card variant="dashboard" metric="1,247" label="Parts Made" />
  <Card variant="status" status="connected" title="Machine Status" />
</div>
```

## Accessibility

- Proper heading hierarchy with card titles
- Focus management for interactive cards
- Keyboard navigation support
- Screen reader friendly with semantic structure
- High contrast mode support

## Design Tokens

The Card component uses the following design tokens:

- Colors: `surface`, `border`, `shadow`
- Spacing: `xs`, `sm`, `md`, `lg`, `xl`
- Border radius: `md`, `lg`
- Shadows: `sm`, `md`, `lg`
- Typography: `heading` for titles, `body` for content

## Related Components

- [Badge](../Badge/README.md) - Status indicators
- [Button](../Button/README.md) - Action buttons
- [Grid](../Grid/README.md) - Layout for card arrangements
- [Modal](../../complex/Modal/README.md) - Overlay cards