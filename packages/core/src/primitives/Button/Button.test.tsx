import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-ghost');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-md');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn-loading');
    expect(button).toBeDisabled();
  });

  it('renders with icon', () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<Button icon={icon}>With Icon</Button>);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="https://example.com">Link Button</Button>);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('custom-class');
  });

  it('renders fullWidth variant', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn-full');
  });

  // CNC-specific variants
  it('renders emergency variant correctly', () => {
    render(<Button variant="emergency">Emergency Stop</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn-emergency');
  });

  it('renders success variant correctly', () => {
    render(<Button variant="success">Success</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn-success');
  });

  it('renders warning variant correctly', () => {
    render(<Button variant="warning">Warning</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('btn-warning');
  });
});