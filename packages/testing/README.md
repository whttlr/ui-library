# @whttlr/ui-testing

Comprehensive testing utilities for Whttlr UI components, providing everything needed to test React components with a focus on accessibility, mobile compatibility, and visual regression.

## Features

- 🧪 **Component Testing**: Enhanced testing utilities with providers and helpers
- ♿ **Accessibility Testing**: Automated a11y testing with axe-core integration
- 📱 **Mobile Testing**: Touch event simulation and responsive design testing
- 👁️ **Visual Regression**: Screenshot comparison and visual testing framework
- ⚡ **Performance Testing**: Render time and memory usage measurement
- 🎭 **Mock Data**: Comprehensive mock data generators

## Installation

```bash
npm install --save-dev @whttlr/ui-testing
```

### Peer Dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/user-event jest
```

## Quick Start

### Basic Component Testing

```jsx
import { renderWithProviders, screen } from '@whttlr/ui-testing';
import { Button } from '@whttlr/ui-core';

test('renders button with correct text', () => {
  renderWithProviders(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Accessibility Testing

```jsx
import { renderWithProviders, axeTestHelpers } from '@whttlr/ui-testing';

test('button meets accessibility standards', async () => {
  const { container } = renderWithProviders(<Button>Accessible Button</Button>);
  await axeTestHelpers.runAxeTest(container);
});
```

### Mobile Testing

```jsx
import { TouchEventSimulator, ResponsiveTestUtils } from '@whttlr/ui-testing';

test('handles touch interactions', () => {
  const { getByRole } = renderWithProviders(<TouchButton />);
  const button = getByRole('button');
  
  TouchEventSimulator.tap(button);
  expect(button).toHaveBeenClicked();
});
```

### Visual Regression Testing

```jsx
import { VisualRegressionTester } from '@whttlr/ui-testing';

test('component visual appearance', async () => {
  const tester = new VisualRegressionTester();
  const result = await tester.runTest({
    name: 'button-primary',
    selector: '[data-testid="button"]',
    viewport: { width: 1024, height: 768 },
    theme: 'dark',
    // ... other config options
  });
  
  expect(result.passed).toBe(true);
});
```

## API Reference

### Component Testing

#### `renderWithProviders(ui, options)`

Enhanced render function that wraps components with necessary providers.

**Options:**
- `initialRoute` - Router initial route
- `theme` - Theme variant ('light' | 'dark')
- `withErrorBoundary` - Include error boundary
- `withAnimation` - Enable animation wrapper

```jsx
renderWithProviders(<MyComponent />, {
  theme: 'dark',
  initialRoute: '/dashboard',
  withErrorBoundary: true,
});
```

#### Component Helpers

```jsx
import { componentHelpers } from '@whttlr/ui-testing';

// Wait for animations
await componentHelpers.waitForAnimation(500);

// Simulate typing
await componentHelpers.simulateTyping(input, 'Hello world');

// Simulate file upload
await componentHelpers.simulateFileUpload(input, mockFile);
```

### Accessibility Testing

#### `axeTestHelpers`

```jsx
// Run complete accessibility audit
await axeTestHelpers.runAxeTest(container);

// Test color contrast specifically
await axeTestHelpers.testColorContrast(element, 4.5);

// Test with custom rules
await axeTestHelpers.testWithCustomRules(container, customRules);
```

#### `keyboardTestHelpers`

```jsx
// Test tab navigation
await keyboardTestHelpers.testTabNavigation(container);

// Test enter key activation
await keyboardTestHelpers.testEnterKey(button, expectClick);

// Test escape key handling
await keyboardTestHelpers.testEscapeKey(expectClose);
```

#### `screenReaderHelpers`

```jsx
// Verify ARIA labels
screenReaderHelpers.expectAriaLabel(button, 'Save document');

// Check live regions
screenReaderHelpers.expectAriaLive(region, 'polite');

// Test focus management
screenReaderHelpers.expectAriaExpanded(dropdown, true);
```

### Mobile Testing

#### `TouchEventSimulator`

```jsx
// Simple tap
TouchEventSimulator.tap(element);

// Long press
await TouchEventSimulator.longPress(element, 1000);

// Swipe gesture
await TouchEventSimulator.swipe(
  element,
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  300
);

// Pinch gesture
await TouchEventSimulator.pinch(element, 100, 200, 300);
```

#### `ResponsiveTestUtils`

```jsx
// Set viewport size
ResponsiveTestUtils.setViewportSize(768, 1024);

// Change orientation
ResponsiveTestUtils.setOrientation('landscape');

// Mock touch device
ResponsiveTestUtils.mockTouchDevice(true);

// Setup complete mobile environment
ResponsiveTestUtils.setupMobileEnvironment(tabletContext);
```

#### Device Contexts

```jsx
import { 
  defaultMobileContext,
  tabletContext,
  desktopContext,
  offlineContext 
} from '@whttlr/ui-testing';

// Use predefined contexts
ResponsiveTestUtils.setupMobileEnvironment(tabletContext);
```

### Visual Regression Testing

#### `VisualRegressionTester`

```jsx
const tester = new VisualRegressionTester();

const config = {
  name: 'component-test',
  description: 'Test component appearance',
  viewport: { width: 1024, height: 768 },
  deviceType: 'desktop',
  orientation: 'landscape',
  theme: 'dark',
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  },
  selector: '[data-testid="component"]',
  threshold: 0.1,
};

const result = await tester.runTest(config);
```

#### React Hook

```jsx
import { useVisualTesting } from '@whttlr/ui-testing';

function TestComponent() {
  const { runTest, results, isRunning } = useVisualTesting();
  
  const handleTest = () => {
    runTest(visualConfig);
  };
  
  return (
    <div>
      <button onClick={handleTest} disabled={isRunning}>
        Run Visual Test
      </button>
      {results.map(result => (
        <div key={result.testName}>
          {result.testName}: {result.passed ? 'PASS' : 'FAIL'}
        </div>
      ))}
    </div>
  );
}
```

### Performance Testing

#### `PerformanceTestUtils`

```jsx
// Measure render time
const { result, duration } = PerformanceTestUtils.measureRenderTime(() => {
  return renderWithProviders(<ExpensiveComponent />);
});

// Measure memory usage
const { result, memoryUsed } = PerformanceTestUtils.measureMemoryUsage(() => {
  return processLargeDataset(data);
});

// Stress testing
const stressResult = await PerformanceTestUtils.stressTest(
  () => updateComponent(),
  1000, // iterations
  5000  // max duration ms
);
```

### Mock Data

```jsx
import { 
  mockFile,
  mockImageFile,
  mockUser,
  mockComponentProps 
} from '@whttlr/ui-testing';

// Create mock file
const file = mockFile('test.txt', 'content', 'text/plain');

// Create mock image
const image = await mockImageFile('test.png');

// Mock user data
const user = mockUser({ role: 'admin' });

// Mock component props
const props = mockComponentProps({ className: 'test' });
```

## Best Practices

### 1. Test Structure

```jsx
describe('Button Component', () => {
  test('renders correctly', () => {
    renderWithProviders(<Button>Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  test('meets accessibility standards', async () => {
    const { container } = renderWithProviders(<Button>Test</Button>);
    await axeTestHelpers.runAxeTest(container);
  });
  
  test('handles interactions', async () => {
    const handleClick = jest.fn();
    renderWithProviders(<Button onClick={handleClick}>Test</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 2. Mobile Testing

```jsx
describe('Mobile Component', () => {
  beforeEach(() => {
    ResponsiveTestUtils.setupMobileEnvironment(defaultMobileContext);
  });
  
  test('responds to touch events', () => {
    renderWithProviders(<TouchButton />);
    const button = screen.getByRole('button');
    
    TouchEventSimulator.tap(button);
    expect(button).toHaveClass('active');
  });
});
```

### 3. Visual Testing

```jsx
describe('Visual Regression', () => {
  const tester = new VisualRegressionTester();
  
  test('component appearance across themes', async () => {
    const configs = [
      { ...baseConfig, theme: 'light' },
      { ...baseConfig, theme: 'dark' },
    ];
    
    for (const config of configs) {
      const result = await tester.runTest(config);
      expect(result.passed).toBe(true);
    }
  });
});
```

## Configuration

### Jest Setup

Add to your `jest.config.js`:

```javascript
module.exports = {
  setupFilesAfterEnv: ['@whttlr/ui-testing/setup'],
  testEnvironment: 'jsdom',
  // ... other config
};
```

### TypeScript

The package includes full TypeScript definitions. Import types as needed:

```typescript
import type { 
  VisualTestConfig,
  MockResponsiveContext,
  PerformanceTestResult 
} from '@whttlr/ui-testing';
```

## Examples

See the `examples/` directory for complete testing examples including:

- Component testing workflows
- Accessibility testing patterns
- Mobile testing scenarios
- Visual regression test suites
- Performance testing strategies

## Contributing

When adding new testing utilities:

1. Follow existing patterns for organization
2. Include comprehensive TypeScript types
3. Add documentation and examples
4. Ensure compatibility with React Testing Library
5. Test utilities should be framework-agnostic where possible