import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('badge-default');

    rerender(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('badge-primary');

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass('badge-secondary');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('badge-success');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('badge-warning');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('badge-error');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('badge-sm');

    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('badge-md');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('badge-lg');
  });

  it('renders as dot variant', () => {
    render(<Badge dot />);
    const badge = screen.getByTestId('badge-dot');
    expect(badge).toHaveClass('badge-dot');
  });

  it('renders with count', () => {
    render(<Badge count={5}>Notifications</Badge>);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('shows zero when showZero is true', () => {
    render(<Badge count={0} showZero>No items</Badge>);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('hides zero when showZero is false', () => {
    render(<Badge count={0}>No items</Badge>);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows overflow count correctly', () => {
    render(<Badge count={150} overflowCount={99}>Messages</Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<Badge color="#ff0000">Custom Color</Badge>);
    const badge = screen.getByText('Custom Color');
    expect(badge).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-badge');
  });

  // CNC-specific variants
  it('renders StatusBadge variant', () => {
    render(<Badge variant="status" status="online">Machine Status</Badge>);
    const badge = screen.getByText('Machine Status');
    expect(badge).toHaveClass('badge-status', 'badge-status-online');
  });

  it('renders PrecisionBadge variant', () => {
    render(<Badge variant="precision" precision={3}>±0.001</Badge>);
    const badge = screen.getByText('±0.001');
    expect(badge).toHaveClass('badge-precision');
  });

  it('renders with icon', () => {
    const icon = <span data-testid="icon">⚠</span>;
    render(<Badge icon={icon}>With Icon</Badge>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders pulsing status badge', () => {
    render(
      <Badge variant="status" status="running" pulse>
        Running
      </Badge>
    );
    const badge = screen.getByText('Running');
    expect(badge).toHaveClass('badge-pulse');
  });
});