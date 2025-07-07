/**
 * Component Testing Utilities and Helpers
 * 
 * Comprehensive testing utilities for React components and UI testing scenarios.
 * Extracted from Whttlr CNC application for reusable testing infrastructure.
 */

import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@whttlr/ui-theme';

// ============================================================================
// TEST PROVIDERS
// ============================================================================

interface TestProvidersProps {
  children: React.ReactNode;
  initialRoute?: string;
  theme?: 'light' | 'dark';
  withErrorBoundary?: boolean;
  withAnimation?: boolean;
}

/**
 * Basic Error Boundary for testing
 */
class TestErrorBoundary extends React.Component<
  { children: React.ReactNode; isolate?: boolean },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; isolate?: boolean }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Test Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary">
          <h2>Test Error</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const TestProviders: React.FC<TestProvidersProps> = ({
  children,
  initialRoute = '/',
  theme = 'dark',
  withErrorBoundary = true,
  withAnimation = false,
}) => {
  const providers = (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        {withAnimation ? (
          <div data-testid="animation-wrapper">
            {children}
          </div>
        ) : (
          children
        )}
      </MemoryRouter>
    </ThemeProvider>
  );
  
  if (withErrorBoundary) {
    return <TestErrorBoundary isolate>{providers}</TestErrorBoundary>;
  }
  
  return providers;
};

// ============================================================================
// CUSTOM RENDER FUNCTION
// ============================================================================

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  theme?: 'light' | 'dark';
  withErrorBoundary?: boolean;
  withAnimation?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const {
    initialRoute = '/',
    theme = 'dark',
    withErrorBoundary = true,
    withAnimation = false,
    ...renderOptions
  } = options;
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestProviders
      initialRoute={initialRoute}
      theme={theme}
      withErrorBoundary={withErrorBoundary}
      withAnimation={withAnimation}
    >
      {children}
    </TestProviders>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default TestProviders;