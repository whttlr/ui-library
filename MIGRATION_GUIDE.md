# UI Library Migration Guide

## 🚀 Upgrading to the Optimized UI Library

This guide helps you migrate from the previous version to the new optimized UI library with enhanced components, standardized variants, and improved APIs.

---

## 📋 Migration Overview

### What Changed
- **Enhanced Components**: 20+ components with new variant systems
- **New Components**: 6 essential components added (FormField, StatusIndicator, Toggle, Tooltip, Skeleton, MonospaceText)
- **Standardized APIs**: Consistent prop patterns across all components
- **Reduced Inline Styles**: 80%+ reduction through variant systems
- **Improved TypeScript**: Better type safety and IDE support

### Migration Strategy
1. **Incremental Approach**: Migrate components one by one
2. **Backward Compatibility**: Most existing code continues to work
3. **Enhanced Features**: Leverage new variants for better functionality
4. **Style Consolidation**: Replace inline styles with component variants

---

## 🔄 Component-by-Component Migration

### Button Component

#### Before (Old API)
```tsx
<Button style={{ backgroundColor: 'red', color: 'white' }}>
  Emergency Stop
</Button>

<Button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Settings size={16} />
  Settings
</Button>
```

#### After (New API)
```tsx
<Button variant="emergency">
  Emergency Stop
</Button>

<Button leftIcon={<Settings size={16} />}>
  Settings
</Button>

// New loading capability
<Button loading variant="primary">
  Processing...
</Button>
```

#### Migration Steps
1. Replace custom emergency styling with `variant="emergency"`
2. Use `leftIcon` and `rightIcon` props instead of manual icon placement
3. Add `loading` prop for async operations
4. Remove inline styles and use appropriate variants

---

### Card Component

#### Before (Old API)
```tsx
<div style={{ 
  padding: '1rem', 
  backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
  borderRadius: '8px',
  border: '1px solid hsl(240, 3.7%, 25%)' 
}}>
  <h3>Machine Status</h3>
  <p>Online and ready</p>
</div>
```

#### After (New API)
```tsx
<Card>
  <CardHeader>
    <CardTitle>Machine Status</CardTitle>
    <CardDescription>Online and ready</CardDescription>
  </CardHeader>
</Card>

// Or for metrics
<Card variant="metric">
  <CardHeader>
    <CardTitle>Uptime</CardTitle>
    <CardValue>98.5%</CardValue>
    <CardChange variant="positive">+2.1% from last week</CardChange>
  </CardHeader>
</Card>

// Loading states
<Card loading loadingLines={3}>
  {/* Content will be replaced with skeleton */}
</Card>
```

#### Migration Steps
1. Replace div containers with `Card` component
2. Use compound components (`CardHeader`, `CardTitle`, etc.) for structure
3. Choose appropriate variants (`metric`, `settings`, `activity`, `dashboard`)
4. Add `loading` prop for dynamic content loading

---

### Alert Component

#### Before (Old API)
```tsx
<div style={{ 
  padding: '1rem',
  backgroundColor: 'rgba(0, 84.2%, 60.2%, 0.1)',
  border: '1px solid hsl(0, 84.2%, 60.2%)',
  borderRadius: '6px'
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <XCircle size={16} />
    Critical Error: Machine stopped
  </div>
</div>
```

#### After (New API)
```tsx
<Alert 
  variant="destructive" 
  title="Critical Error" 
  description="Machine stopped for protection"
  icon={<XCircle size={16} />}
  actions={
    <>
      <Button size="sm" variant="outline">View Diagnostics</Button>
      <Button size="sm" variant="emergency">Reset</Button>
    </>
  }
  dismissible
/>

// Or using compound components for complex layouts
<AlertCompound variant="error">
  <AlertTitle>Critical Error</AlertTitle>
  <AlertDescription>Machine stopped for protection</AlertDescription>
  <AlertActions>
    <Button size="sm">View Diagnostics</Button>
  </AlertActions>
</AlertCompound>
```

#### Migration Steps
1. Replace custom alert styling with `variant` prop
2. Use `title`, `description`, and `icon` props for content
3. Use `actions` prop or `AlertActions` compound component for buttons
4. Add `dismissible` prop for closeable alerts

---

### Input Component

#### Before (Old API)
```tsx
<div>
  <label>Feed Rate</label>
  <input 
    type="number"
    style={{ 
      padding: '8px', 
      border: '1px solid hsl(240, 3.7%, 15.9%)',
      borderRadius: '4px' 
    }}
  />
</div>
```

#### After (New API)
```tsx
<FormField 
  label="Feed Rate"
  description="Speed at which the cutting tool moves (mm/min)"
  error={error}
>
  <Input 
    type="number" 
    size="default"
    placeholder="1500"
    variant="default"
  />
</FormField>

// Or search input
<Input 
  variant="search" 
  placeholder="Search G-code files..."
  onSearch={handleSearch}
/>

// Password input with visibility toggle
<Input 
  variant="password" 
  placeholder="Machine access code"
/>
```

#### Migration Steps
1. Wrap inputs with `FormField` for complete form field functionality
2. Use `variant` prop for specialized input types
3. Remove inline styling and use `size` variants
4. Leverage built-in validation and error display

---

## 🆕 New Components Usage

### StatusIndicator (New Component)
```tsx
// Replace custom status displays
<StatusIndicator 
  variant="online" 
  label="Machine Status"
  pulse 
/>

<StatusIndicator 
  variant="error" 
  label="Coolant System"
  description="Requires attention"
/>
```

### MonospaceText (New Component)
```tsx
// Replace manual monospace styling
<MonospaceText variant="coordinate">
  X: 125.456
</MonospaceText>

<MonospaceText variant="code">
  G01 X10.5 Y20.3 F1500
</MonospaceText>
```

### Toggle/Switch (New Component)
```tsx
// Replace checkbox styling for settings
<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable Auto-Feed"
  description="Automatically adjust feed rate based on material"
  color="cnc"
/>

// Toggle button for quick settings
<ToggleButton
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  icon={<Settings size={16} />}
/>
```

### Tooltip (New Component)
```tsx
// Add contextual help to complex controls
<Tooltip 
  content="Spindle speed in revolutions per minute. Higher speeds for softer materials."
  position="top"
  variant="info"
>
  <Input label="Spindle RPM" />
</Tooltip>

// CNC-specific tooltips
<CNCTooltip content="Critical setting - incorrect values may damage workpiece">
  <Input label="Tool Offset" />
</CNCTooltip>
```

### Skeleton (New Component)
```tsx
// Loading states for dynamic content
<Skeleton variant="text" lines={3} />
<SkeletonCard />

// Integrated with Card loading
<Card loading loadingLines={4}>
  <CardContent>
    {/* This content shows when not loading */}
  </CardContent>
</Card>
```

---

## 🎨 Style Migration Patterns

### Color Migrations
```tsx
// Before: Manual color styling
style={{ color: 'hsl(142, 76%, 36%)' }}

// After: Semantic color variants
color="success"

// Before: Custom background colors
style={{ backgroundColor: 'hsl(0, 84.2%, 60.2%)' }}

// After: Component variants
variant="error"
```

### Size Migrations
```tsx
// Before: Manual sizing
style={{ fontSize: '0.875rem', padding: '0.5rem' }}

// After: Size variants
size="sm"

// Before: Custom dimensions
style={{ width: '200px', height: '100px' }}

// After: Standardized sizing
size="lg"
```

### State Migrations
```tsx
// Before: Manual disabled styling
style={{ opacity: 0.5, cursor: 'not-allowed' }}

// After: Component state props
disabled={true}

// Before: Manual loading styling
{loading && <Spinner />}

// After: Built-in loading states
loading={true}
```

---

## 🔧 Common Migration Scenarios

### Dashboard Cards
```tsx
// Before: Custom metric cards
<div className="metric-card">
  <div className="metric-header">
    <h3>Machine Uptime</h3>
    <TrendingUp className="metric-icon" />
  </div>
  <div className="metric-value">98.5%</div>
  <div className="metric-change positive">+2.1% from last week</div>
</div>

// After: Using Card compound components
<Card variant="metric" noPadding>
  <CardHeader>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <CardTitle>Machine Uptime</CardTitle>
        <CardValue>98.5%</CardValue>
        <CardChange variant="positive">+2.1% from last week</CardChange>
      </div>
      <CardIcon>
        <TrendingUp size={24} />
      </CardIcon>
    </div>
  </CardHeader>
</Card>
```

### Form Layouts
```tsx
// Before: Manual form styling
<div className="form-group">
  <label className="form-label">Feed Rate</label>
  <input className="form-input" type="number" />
  <div className="form-help">Speed in mm/min</div>
  {error && <div className="form-error">{error}</div>}
</div>

// After: Using FormField
<FormField
  label="Feed Rate"
  description="Speed in mm/min"
  error={error}
>
  <Input type="number" placeholder="1500" />
</FormField>
```

### Alert Systems
```tsx
// Before: Custom alert implementation
<div className={`alert alert-${type}`}>
  <div className="alert-icon">{getIcon(type)}</div>
  <div className="alert-content">
    <div className="alert-title">{title}</div>
    <div className="alert-message">{message}</div>
  </div>
  <div className="alert-actions">
    {actions.map(action => (
      <button key={action.id} onClick={action.handler}>
        {action.label}
      </button>
    ))}
  </div>
</div>

// After: Using Alert component
<Alert
  variant={type}
  title={title}
  description={message}
  icon={getIcon(type)}
  actions={
    <>
      {actions.map(action => (
        <Button key={action.id} size="sm" onClick={action.handler}>
          {action.label}
        </Button>
      ))}
    </>
  }
  dismissible
/>
```

---

## ⚠️ Breaking Changes

### Props Renamed
- `variant="danger"` → `variant="destructive"` (Alert component)
- `size="md"` → `size="default"` (all components)
- `showLabel` → `showPercentage` (Progress component)

### Removed Props
- Custom styling props replaced with variants
- Manual icon positioning replaced with `leftIcon`/`rightIcon`
- Direct style overrides discouraged in favor of variants

### New Required Props
- Some compound components require specific child components
- FormField expects Input as child component
- CardHeader, CardContent structure for Cards

---

## 🧪 Testing Migration

### Visual Regression Testing
1. Take screenshots of current implementation
2. Migrate components incrementally
3. Compare visual output for consistency
4. Adjust variants to match exact styling if needed

### Functional Testing
1. Test all interactive states (hover, focus, disabled)
2. Verify keyboard navigation continues to work
3. Test screen reader compatibility
4. Validate form submission and validation

### Performance Testing
1. Measure bundle size impact
2. Test rendering performance with new components
3. Validate memory usage patterns
4. Check for any performance regressions

---

## 📚 Resources

### Documentation
- **Storybook**: Live component examples and API documentation
- **TypeScript Definitions**: Full type safety and IntelliSense support
- **Migration Examples**: Complete before/after code samples

### Support
- **Component API Reference**: Detailed prop and variant documentation
- **Best Practices Guide**: When to use which component and variant
- **Troubleshooting**: Common migration issues and solutions

### Tools
- **ESLint Rules**: Automated detection of deprecated patterns
- **Codemod Scripts**: Automated migration for common patterns
- **Design Tokens**: Access to standardized colors, sizes, and spacing

---

## 🎯 Migration Checklist

### Pre-Migration
- [ ] Review current component usage patterns
- [ ] Identify components using heavy inline styling
- [ ] Plan migration order (least to most complex)
- [ ] Set up visual regression testing

### During Migration
- [ ] Migrate components incrementally
- [ ] Replace inline styles with variants
- [ ] Update TypeScript types
- [ ] Test each component after migration
- [ ] Document any custom styling needs

### Post-Migration
- [ ] Remove unused CSS/styling code
- [ ] Update team documentation
- [ ] Train team on new component APIs
- [ ] Establish component usage guidelines
- [ ] Set up automated testing for components

### Validation
- [ ] Visual consistency maintained
- [ ] All interactive features work
- [ ] Performance hasn't regressed
- [ ] Accessibility standards met
- [ ] TypeScript compilation successful

---

This migration guide provides a systematic approach to upgrading your UI library usage. Take it step by step, test thoroughly, and leverage the new component capabilities to build better interfaces more efficiently.