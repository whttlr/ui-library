import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';
import { Wifi, WifiOff, Battery, BatteryLow, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator that can be used to show counts, status, or other metadata. Perfect for notifications, status indicators, and labeling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
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
    children: 'Large',
  },
};

// With numbers
export const Count: Story = {
  args: {
    variant: 'primary',
    children: '42',
  },
};

export const NewMessages: Story = {
  args: {
    variant: 'error',
    children: '3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Common use case for showing new message count',
      },
    },
  },
};

// Status indicators
export const OnlineStatus: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="success">
        <Wifi className="w-3 h-3 mr-1" />
        Connected
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status badge with icon for connection state',
      },
    },
  },
};

export const OfflineStatus: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="error">
        <WifiOff className="w-3 h-3 mr-1" />
        Disconnected
      </Badge>
    </div>
  ),
};

export const BatteryStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="success">
        <Battery className="w-3 h-3 mr-1" />
        85%
      </Badge>
      <Badge variant="warning">
        <BatteryLow className="w-3 h-3 mr-1" />
        15%
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Battery status indicators with different warning levels',
      },
    },
  },
};

// CNC Machine status examples
export const MachineStatus: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Machine States</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Idle
          </Badge>
          <Badge variant="primary">Running</Badge>
          <Badge variant="warning">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
          <Badge variant="error">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">System Status</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">v2.1.0</Badge>
          <Badge variant="secondary">CNC Pro</Badge>
          <Badge variant="success">Licensed</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC machine status dashboard with various status indicators',
      },
    },
  },
};

// Badges with buttons
export const BadgeWithButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="relative">
        Notifications
        <Badge variant="error" className="absolute -top-2 -right-2">
          5
        </Badge>
      </Button>
      <Button variant="outline" className="relative">
        Messages
        <Badge variant="primary" className="absolute -top-2 -right-2">
          12
        </Badge>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges positioned on buttons to show counts or status',
      },
    },
  },
};

// Job queue example
export const JobQueue: Story = {
  render: () => (
    <div className="space-y-3 p-4 border rounded-lg">
      <h4 className="text-lg font-semibold">Job Queue</h4>
      <div className="space-y-2">
        {[
          { name: 'Part_A_Production.nc', status: 'running', priority: 'high' },
          { name: 'Calibration_Routine.nc', status: 'queued', priority: 'medium' },
          { name: 'Test_Cut.nc', status: 'completed', priority: 'low' },
          { name: 'Emergency_Check.nc', status: 'failed', priority: 'high' },
        ].map((job, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm font-mono">{job.name}</span>
            <div className="flex gap-2">
              <Badge 
                variant={
                  job.status === 'running' ? 'primary' :
                  job.status === 'completed' ? 'success' :
                  job.status === 'failed' ? 'error' : 'secondary'
                }
              >
                {job.status}
              </Badge>
              <Badge 
                variant={
                  job.priority === 'high' ? 'error' :
                  job.priority === 'medium' ? 'warning' : 'info'
                }
                size="sm"
              >
                {job.priority}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Job queue interface showing multiple badges for status and priority',
      },
    },
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together',
      },
    },
  },
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="default" variant="primary">Default</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge sizes displayed together',
      },
    },
  },
};

// Bright variants showcase
export const BrightVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'hsl(240, 10%, 3.9%)', 
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h3 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
        Bright Badge Variants
      </h3>
      <p style={{ color: 'hsl(240, 5%, 64.9%)', margin: 0, fontSize: '0.875rem' }}>
        Bright outline badges with low opacity backgrounds, perfect for status indicators and highlights
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Badge variant="bright-default">Bright Default</Badge>
        <Badge variant="bright-secondary">Bright Secondary</Badge>
        <Badge variant="bright-success">Bright Success</Badge>
        <Badge variant="bright-warning">Bright Warning</Badge>
        <Badge variant="bright-danger">Bright Danger</Badge>
        <Badge variant="bright-info">Bright Info</Badge>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          CNC Status Examples
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Badge variant="bright-success" showIndicator>Machine Ready</Badge>
          <Badge variant="bright-info" showIndicator pulse>Program Loaded</Badge>
          <Badge variant="bright-warning" showIndicator pulse>Tool Change Required</Badge>
          <Badge variant="bright-danger" showIndicator pulse>Emergency Stop</Badge>
          <Badge variant="bright-secondary" showIndicator>Maintenance Mode</Badge>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          With Pulsing Indicators
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Badge variant="bright-success" showIndicator>Connected</Badge>
          <Badge variant="bright-info" showIndicator pulse>Processing</Badge>
          <Badge variant="bright-warning" showIndicator pulse>Attention</Badge>
          <Badge variant="bright-danger" showIndicator pulse>Critical</Badge>
          <Badge variant="outline-success" showIndicator>Online</Badge>
          <Badge variant="outline-info" showIndicator pulse>Live</Badge>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          Different Sizes
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Badge variant="bright-success" size="sm" showIndicator>Small</Badge>
          <Badge variant="bright-success" size="default" showIndicator>Default</Badge>
          <Badge variant="bright-success" size="lg" showIndicator>Large</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bright badge variants with vibrant borders and subtle background colors, ideal for modern CNC interfaces',
      },
    },
  },
};

// Pulsing indicator badges
export const PulsingIndicators: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'hsl(240, 10%, 3.9%)', 
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h3 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
        Status Indicators with Pulsing Circles
      </h3>
      <p style={{ color: 'hsl(240, 5%, 64.9%)', margin: 0, fontSize: '0.875rem' }}>
        Perfect for real-time status monitoring and alerts in CNC applications
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
            Static Indicators
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Badge variant="bright-success" showIndicator>Machine Idle</Badge>
            <Badge variant="bright-secondary" showIndicator>System Ready</Badge>
            <Badge variant="outline-success" showIndicator>Connection OK</Badge>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
            Pulsing Alerts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Badge variant="bright-info" showIndicator pulse>Program Running</Badge>
            <Badge variant="bright-warning" showIndicator pulse>Tool Wear Alert</Badge>
            <Badge variant="bright-danger" showIndicator pulse>Error Detected</Badge>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
            Live Status
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Badge variant="outline-info" showIndicator pulse>Data Streaming</Badge>
            <Badge variant="bright-info" showIndicator pulse>Real-time Monitor</Badge>
            <Badge variant="bright-success" showIndicator pulse>Active Job</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status indicators with optional pulsing circles for real-time feedback and alerts',
      },
    },
  },
};