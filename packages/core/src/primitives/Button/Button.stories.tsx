import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Settings, Download, Trash2, Play, Pause, Power } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Designed for both general use and CNC-specific applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'cnc', 'emergency', 'success', 'warning'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// CNC-specific variants
export const CNC: Story = {
  args: {
    variant: 'cnc',
    children: 'CNC Action',
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific styling for industrial applications',
      },
    },
  },
};

export const Emergency: Story = {
  args: {
    variant: 'emergency',
    children: 'EMERGENCY STOP',
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency stop button with high-visibility styling',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Start Operation',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Caution',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const IconButton: Story = {
  args: {
    size: 'icon',
    children: <Settings />,
  },
};

// With icons - NEW API
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Download size={16} />,
    children: 'Download',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with left icon using the new leftIcon prop',
      },
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Settings size={16} />,
    children: 'Settings',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with right icon using the new rightIcon prop',
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Play size={16} />,
    rightIcon: <Settings size={16} />,
    children: 'Play',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with both left and right icons',
      },
    },
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Loading states - NEW API
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Save Changes',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with built-in loading state',
      },
    },
  },
};

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: 'Saving...',
    children: 'Save Changes',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom loading text',
      },
    },
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
      <Button loading size="sm">Small</Button>
      <Button loading>Default</Button>
      <Button loading size="lg">Large</Button>
      <Button loading variant="secondary">Secondary</Button>
      <Button loading variant="destructive">Destructive</Button>
      <Button loading variant="outline">Outline</Button>
      <Button loading variant="success" loadingText="Starting...">Start</Button>
      <Button loading variant="cnc" loadingText="Processing...">Process</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state across different button variants and sizes',
      },
    },
  },
};

// CNC Control Examples
export const CNCControlPanel: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '1rem', 
      padding: '1rem', 
      backgroundColor: 'hsl(240, 10%, 8%)', 
      borderRadius: '8px' 
    }}>
      <Button variant="success" size="lg" leftIcon={<Play size={16} />}>
        Start
      </Button>
      <Button variant="warning" size="lg" leftIcon={<Pause size={16} />}>
        Pause
      </Button>
      <Button variant="emergency" size="lg" leftIcon={<Power size={16} />}>
        E-STOP
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of CNC control panel using the new leftIcon prop for cleaner implementation',
      },
    },
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="cnc">CNC</Button>
      <Button variant="emergency">Emergency</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together',
      },
    },
  },
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together',
      },
    },
  },
};