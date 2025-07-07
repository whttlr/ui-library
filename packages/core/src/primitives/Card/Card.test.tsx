import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card.parentElement).toHaveClass('card');
  });

  it('renders with title', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toHaveClass('card-title');
  });

  it('renders with extra content', () => {
    const extra = <button>Action</button>;
    render(<Card title="Title" extra={extra}>Content</Card>);
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default').parentElement).toHaveClass('card-default');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined').parentElement).toHaveClass('card-outlined');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated').parentElement).toHaveClass('card-elevated');
  });

  it('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding').parentElement).toHaveClass('card-padding-none');

    rerender(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText('Small padding').parentElement).toHaveClass('card-padding-sm');

    rerender(<Card padding="md">Medium padding</Card>);
    expect(screen.getByText('Medium padding').parentElement).toHaveClass('card-padding-md');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText('Large padding').parentElement).toHaveClass('card-padding-lg');
  });

  it('renders as hoverable', () => {
    render(<Card hoverable>Hoverable card</Card>);
    expect(screen.getByText('Hoverable card').parentElement).toHaveClass('card-hoverable');
  });

  it('renders with loading state', () => {
    render(<Card loading>Content</Card>);
    const card = screen.getByTestId('card-loading');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card-loading');
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('custom-card');
  });

  // CNC-specific card variants
  it('renders StatusCard variant', () => {
    render(
      <Card variant="status" status="connected">
        Status content
      </Card>
    );
    const card = screen.getByText('Status content').parentElement;
    expect(card).toHaveClass('card-status', 'card-status-connected');
  });

  it('renders DashboardCard variant', () => {
    render(
      <Card variant="dashboard" metric="123" label="Count">
        Dashboard content
      </Card>
    );
    expect(screen.getByText('123')).toHaveClass('card-metric');
    expect(screen.getByText('Count')).toHaveClass('card-label');
  });

  it('renders with actions', () => {
    const actions = [
      <button key="1">Edit</button>,
      <button key="2">Delete</button>
    ];
    render(<Card actions={actions}>Content</Card>);
    
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('renders with cover image', () => {
    const cover = <img src="test.jpg" alt="Cover" />;
    render(<Card cover={cover}>Content</Card>);
    
    const image = screen.getByAltText('Cover');
    expect(image).toBeInTheDocument();
    expect(image.parentElement).toHaveClass('card-cover');
  });

  it('renders full width', () => {
    render(<Card fullWidth>Full width card</Card>);
    expect(screen.getByText('Full width card').parentElement).toHaveClass('card-full');
  });
});