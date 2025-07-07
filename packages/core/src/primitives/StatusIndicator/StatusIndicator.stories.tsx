import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator, StatusIndicatorGroup, StatusIndicatorCard, StatusIndicatorCompound } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'StatusIndicator component for displaying system status, machine states, and operational indicators with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'connecting', 'error', 'warning', 'success', 'idle', 'running', 'paused', 'stopped'],
      description: 'Status type',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['dot', 'badge', 'pill', 'cnc'],
      description: 'Visual style variant',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
    description: {
      control: 'text',
      description: 'Custom description for tooltip',
    },
    pulse: {
      control: 'boolean',
      description: 'Whether to animate with pulse effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <StatusIndicator status="online" />
    </div>
  ),
};

export const DotVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StatusIndicator status="online" variant="dot" />
        <StatusIndicator status="offline" variant="dot" />
        <StatusIndicator status="connecting" variant="dot" pulse />
        <StatusIndicator status="error" variant="dot" />
        <StatusIndicator status="warning" variant="dot" />
        <StatusIndicator status="success" variant="dot" />
        <StatusIndicator status="idle" variant="dot" />
        <StatusIndicator status="running" variant="dot" pulse />
        <StatusIndicator status="paused" variant="dot" />
        <StatusIndicator status="stopped" variant="dot" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple dot indicator with text label',
      },
    },
  },
};

export const BadgeVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StatusIndicator status="online" variant="badge" />
        <StatusIndicator status="offline" variant="badge" />
        <StatusIndicator status="connecting" variant="badge" pulse />
        <StatusIndicator status="error" variant="badge" />
        <StatusIndicator status="warning" variant="badge" />
        <StatusIndicator status="success" variant="badge" />
        <StatusIndicator status="idle" variant="badge" />
        <StatusIndicator status="running" variant="badge" pulse />
        <StatusIndicator status="paused" variant="badge" />
        <StatusIndicator status="stopped" variant="badge" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge-style indicator with background and border',
      },
    },
  },
};

export const PillVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StatusIndicator status="online" variant="pill" />
        <StatusIndicator status="offline" variant="pill" />
        <StatusIndicator status="connecting" variant="pill" pulse />
        <StatusIndicator status="error" variant="pill" />
        <StatusIndicator status="warning" variant="pill" />
        <StatusIndicator status="success" variant="pill" />
        <StatusIndicator status="idle" variant="pill" />
        <StatusIndicator status="running" variant="pill" pulse />
        <StatusIndicator status="paused" variant="pill" />
        <StatusIndicator status="stopped" variant="pill" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pill-style indicator with rounded corners',
      },
    },
  },
};

export const CNCVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StatusIndicator status="online" variant="cnc" />
        <StatusIndicator status="offline" variant="cnc" />
        <StatusIndicator status="connecting" variant="cnc" pulse />
        <StatusIndicator status="error" variant="cnc" />
        <StatusIndicator status="warning" variant="cnc" />
        <StatusIndicator status="success" variant="cnc" />
        <StatusIndicator status="idle" variant="cnc" />
        <StatusIndicator status="running" variant="cnc" pulse />
        <StatusIndicator status="paused" variant="cnc" />
        <StatusIndicator status="stopped" variant="cnc" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC-style indicator with industrial design and glowing effects',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '60px', fontSize: '0.875rem' }}>Small:</span>
          <StatusIndicator status="running" variant="badge" size="sm" pulse />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '60px', fontSize: '0.875rem' }}>Default:</span>
          <StatusIndicator status="running" variant="badge" size="default" pulse />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '60px', fontSize: '0.875rem' }}>Large:</span>
          <StatusIndicator status="running" variant="badge" size="lg" pulse />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes for different use cases',
      },
    },
  },
};

export const WithCustomLabels: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StatusIndicator 
          status="online" 
          variant="badge" 
          label="Machine Connected" 
          description="CNC machine is connected and operational"
        />
        <StatusIndicator 
          status="running" 
          variant="badge" 
          label="Job in Progress" 
          description="Currently processing part A-123"
          pulse
        />
        <StatusIndicator 
          status="warning" 
          variant="badge" 
          label="Low Coolant" 
          description="Coolant level is below 30%"
        />
        <StatusIndicator 
          status="error" 
          variant="badge" 
          label="Emergency Stop" 
          description="Machine stopped due to emergency condition"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom labels and descriptions for specific contexts',
      },
    },
  },
};

export const CNCMachineStatus: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)', 
        fontSize: '1.25rem',
        fontWeight: 600
      }}>
        CNC Machine Status
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <StatusIndicatorCard title="Machine Connection">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="online" variant="cnc" label="Connected" pulse />
            <div style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Port: COM3 (115200 baud)
            </div>
          </div>
        </StatusIndicatorCard>
        
        <StatusIndicatorCard title="Operation Status">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="running" variant="cnc" label="Processing" pulse />
            <div style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Job: Part_A_v2.nc (Progress: 65%)
            </div>
          </div>
        </StatusIndicatorCard>
        
        <StatusIndicatorCard title="System Health">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="warning" variant="cnc" label="Attention" />
            <div style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Coolant level: 25% remaining
            </div>
          </div>
        </StatusIndicatorCard>
        
        <StatusIndicatorCard title="Safety Status">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="success" variant="cnc" label="Safe" />
            <div style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
              All safety systems operational
            </div>
          </div>
        </StatusIndicatorCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC machine status display with cards and multiple indicators',
      },
    },
  },
};

export const StatusIndicatorGroupExample: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)', 
        fontSize: '1.25rem',
        fontWeight: 600
      }}>
        System Overview
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h4 style={{ 
            margin: '0 0 0.5rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            Machine Systems
          </h4>
          <StatusIndicatorGroup>
            <StatusIndicator status="online" variant="pill" label="Controller" />
            <StatusIndicator status="running" variant="pill" label="Spindle" pulse />
            <StatusIndicator status="warning" variant="pill" label="Coolant" />
            <StatusIndicator status="success" variant="pill" label="Safety" />
          </StatusIndicatorGroup>
        </div>
        
        <div>
          <h4 style={{ 
            margin: '0 0 0.5rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            Network & Communication
          </h4>
          <StatusIndicatorGroup>
            <StatusIndicator status="online" variant="badge" label="Ethernet" />
            <StatusIndicator status="connecting" variant="badge" label="WiFi" pulse />
            <StatusIndicator status="offline" variant="badge" label="USB" />
          </StatusIndicatorGroup>
        </div>
        
        <div>
          <h4 style={{ 
            margin: '0 0 0.5rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1rem',
            fontWeight: 500
          }}>
          Job Queue
          </h4>
          <StatusIndicatorGroup>
            <StatusIndicator status="running" variant="cnc" label="Current Job" size="sm" pulse />
            <StatusIndicator status="idle" variant="cnc" label="Queue (3)" size="sm" />
            <StatusIndicator status="success" variant="cnc" label="Completed (12)" size="sm" />
          </StatusIndicatorGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using StatusIndicatorGroup to organize multiple related indicators',
      },
    },
  },
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Before (Inline Styles)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'hsl(142, 71%, 45%)',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>
                Online
              </span>
            </div>
            
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              fontSize: '0.875rem',
              color: 'hsl(38, 92%, 50%)',
              backgroundColor: 'hsl(38, 92%, 50% / 0.1)',
              border: '1px solid hsl(38, 92%, 50% / 0.3)',
              borderRadius: '0.375rem',
              fontWeight: 500
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'hsl(38, 92%, 50%)'
              }} />
              <span>Warning</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>After (StatusIndicator)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <StatusIndicator status="online" variant="dot" pulse />
            <StatusIndicator status="warning" variant="badge" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using StatusIndicator vs inline styles',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        fontSize: '1.125rem', 
        fontWeight: 600,
        color: 'hsl(0, 0%, 98%)'
      }}>
        StatusIndicator System
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Dot Variant</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="online" variant="dot" />
            <StatusIndicator status="running" variant="dot" pulse />
            <StatusIndicator status="warning" variant="dot" />
            <StatusIndicator status="error" variant="dot" />
          </div>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Badge Variant</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="online" variant="badge" />
            <StatusIndicator status="running" variant="badge" pulse />
            <StatusIndicator status="warning" variant="badge" />
            <StatusIndicator status="error" variant="badge" />
          </div>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Pill Variant</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="online" variant="pill" />
            <StatusIndicator status="running" variant="pill" pulse />
            <StatusIndicator status="warning" variant="pill" />
            <StatusIndicator status="error" variant="pill" />
          </div>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>CNC Variant</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <StatusIndicator status="online" variant="cnc" />
            <StatusIndicator status="running" variant="cnc" pulse />
            <StatusIndicator status="warning" variant="cnc" />
            <StatusIndicator status="error" variant="cnc" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available StatusIndicator variants displayed together',
      },
    },
  },
};