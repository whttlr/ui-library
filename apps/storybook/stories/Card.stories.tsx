import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@whttlr/ui-core';

const meta: Meta<typeof Card> = {
  title: 'Core/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content with optional headers, footers, and CNC-specific variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'status', 'dashboard'],
      description: 'Card variant style',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding size',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card shadow intensity',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3>Card Title</h3>
        <p>This is the card content. It can contain any React elements.</p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3>Outlined Card</h3>
        <p>This card has a border instead of a shadow.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    shadow: 'lg',
    children: (
      <div>
        <h3>Elevated Card</h3>
        <p>This card has enhanced elevation with a larger shadow.</p>
      </div>
    ),
  },
};

export const StatusCard: Story = {
  args: {
    variant: 'status',
    children: (
      <div>
        <h3>Machine Status</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <span>Status:</span>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>Running</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Position:</span>
          <span>X: 100.5 Y: 50.2 Z: 10.0</span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Status variant designed for displaying machine status and real-time information.',
      },
    },
  },
};

export const DashboardCard: Story = {
  args: {
    variant: 'dashboard',
    children: (
      <div>
        <h3>Dashboard Widget</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>42</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Jobs Complete</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>98%</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Success Rate</div>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard variant optimized for displaying metrics and key performance indicators.',
      },
    },
  },
};

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '600px' }}>
      <Card padding="none">
        <div style={{ padding: '1rem', background: '#f3f4f6' }}>No Padding</div>
      </Card>
      <Card padding="sm">
        <div style={{ background: '#f3f4f6' }}>Small Padding</div>
      </Card>
      <Card padding="md">
        <div style={{ background: '#f3f4f6' }}>Medium Padding</div>
      </Card>
      <Card padding="lg">
        <div style={{ background: '#f3f4f6' }}>Large Padding</div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding options for cards.',
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div>
        <h3>Card with Actions</h3>
        <p>This card demonstrates how to include action buttons.</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button style={{ padding: '0.5rem 1rem', border: 'none', background: '#3b82f6', color: 'white', borderRadius: '4px' }}>
            Primary Action
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', background: 'transparent', borderRadius: '4px' }}>
            Secondary
          </button>
        </div>
      </div>
    ),
  },
};