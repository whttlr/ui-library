import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@whttlr/ui-core';

const meta: Meta<typeof Button> = {
  title: 'Core/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes. Supports CNC-specific variants for industrial interfaces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'emergency', 'success', 'warning'],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Emergency: Story = {
  args: {
    variant: 'emergency',
    children: 'Emergency Stop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency variant for critical CNC operations. Features distinctive styling for safety.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes: small, medium, and large.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button states: normal, disabled, and loading.',
      },
    },
  },
};

export const CNCVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="emergency">Emergency Stop</Button>
      <Button variant="success">Start Machine</Button>
      <Button variant="warning">Pause Job</Button>
      <Button variant="danger">Reset</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific button variants designed for industrial control interfaces.',
      },
    },
  },
};