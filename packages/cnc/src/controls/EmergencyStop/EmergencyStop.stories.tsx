import type { Meta, StoryObj } from '@storybook/react';
import { EmergencyStop } from './EmergencyStop';
import { Power, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof EmergencyStop> = {
  title: 'CNC/Controls/EmergencyStop',
  component: EmergencyStop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Emergency stop button for CNC machines. Provides immediate halt functionality with high-visibility styling and safety confirmation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isEmergencyStopped: {
      control: 'boolean',
      description: 'Whether emergency stop is currently activated',
    },
    confirmationRequired: {
      control: 'boolean',
      description: 'Whether to require confirmation before activation',
    },
    onStop: {
      action: 'stop',
      description: 'Callback when emergency stop is activated',
    },
    onReset: {
      action: 'reset',
      description: 'Callback when emergency stop is reset',
    },
    showWarning: {
      control: 'boolean',
      description: 'Whether to show warning text above button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the emergency stop button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic states
export const Default: Story = {
  args: {
    isEmergencyStopped: false,
    confirmationRequired: false,
  },
};

export const Stopped: Story = {
  args: {
    isEmergencyStopped: true,
    confirmationRequired: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency stop in activated state - should show reset functionality',
      },
    },
  },
};

export const WithConfirmation: Story = {
  args: {
    isEmergencyStopped: false,
    confirmationRequired: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency stop requiring confirmation before activation for safety',
      },
    },
  },
};

// Different sizes
export const Small: Story = {
  args: {
    isEmergencyStopped: false,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    isEmergencyStopped: false,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    isEmergencyStopped: false,
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    isEmergencyStopped: false,
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large emergency stop for main control panels',
      },
    },
  },
};

// Safety scenarios
export const SafetyPanel: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem', 
      backgroundColor: 'hsl(240, 10%, 8%)', 
      borderRadius: '8px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
        <AlertTriangle size={20} style={{ color: 'hsl(48, 96%, 53%)' }} />
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Safety Controls</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <EmergencyStop
            size="lg"
            isEmergencyStopped={false}
            confirmationRequired={true}
            onStop={() => console.log('Emergency stop activated')}
          />
          <p style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 84%)', marginTop: '0.5rem' }}>Main E-Stop</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <EmergencyStop
            size="md"
            isEmergencyStopped={true}
            onReset={() => console.log('Emergency stop reset')}
            onStop={() => console.log('Emergency stop activated')}
          />
          <p style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 84%)', marginTop: '0.5rem' }}>Secondary E-Stop</p>
        </div>
      </div>
      
      <div style={{ 
        fontSize: '0.75rem', 
        color: 'hsl(240, 5%, 64.9%)', 
        marginTop: '1rem', 
        padding: '0.75rem', 
        border: '1px solid hsl(240, 3.7%, 15.9%)', 
        borderRadius: '6px' 
      }}>
        <strong>Safety Notice:</strong> Emergency stops immediately halt all machine operations. 
        Ensure workspace is clear before resetting.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Emergency stop buttons in a safety control panel context',
      },
    },
  },
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="sm" isEmergencyStopped={false} onStop={() => {}} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="md" isEmergencyStopped={false} onStop={() => {}} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="lg" isEmergencyStopped={false} onStop={() => {}} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Large</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="xl" isEmergencyStopped={false} onStop={() => {}} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Extra Large</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available emergency stop button sizes',
      },
    },
  },
};

// Showcase all states
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="lg" isEmergencyStopped={false} onStop={() => {}} />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Ready</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="lg" isEmergencyStopped={true} onStop={() => {}} onReset={() => {}} />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>Stopped</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="lg" isEmergencyStopped={false} confirmationRequired={true} onStop={() => {}} />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>With Confirmation</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EmergencyStop size="lg" isEmergencyStopped={false} showWarning={false} onStop={() => {}} />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(240, 5%, 84%)' }}>No Warning</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available emergency stop states and configurations',
      },
    },
  },
};