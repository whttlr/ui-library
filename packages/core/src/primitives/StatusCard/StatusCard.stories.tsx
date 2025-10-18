import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { StatusCard } from './StatusCard';
import { Button } from '../Button/Button';

const meta: Meta<typeof StatusCard> = {
  title: 'Primitives/StatusCard',
  component: StatusCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A status card component for displaying machine status, data values, and action buttons in a structured format.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Machine Status',
    status: {
      label: 'Online',
      variant: 'success',
    },
    values: [
      { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
      { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
    ],
    actions: [
      { label: 'Start', variant: 'success' },
      { label: 'Pause', variant: 'warning' },
      { label: 'Stop', variant: 'emergency' },
    ],
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Default Variant"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Start', variant: 'success' },
          { label: 'Pause', variant: 'warning' },
        ]}
        variant="default"
      />
      
      <StatusCard
        title="Compact Variant"
        status={{ label: 'Running', variant: 'info' }}
        values={[
          { label: 'X', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y', value: 67.230, precision: 3, unit: 'mm' },
          { label: 'Z', value: -10.125, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Stop', variant: 'error' },
        ]}
        variant="compact"
      />
      
      <StatusCard
        title="Detailed Variant"
        status={{ label: 'Operational', variant: 'success', pulse: true }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
          { label: 'Feed Rate', value: 1500, unit: 'mm/min' },
          { label: 'Spindle Speed', value: 12000, unit: 'RPM' },
        ]}
        actions={[
          { label: 'Start Job', variant: 'success' },
          { label: 'Pause', variant: 'warning' },
          { label: 'Emergency Stop', variant: 'emergency' },
        ]}
        variant="detailed"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Small Size"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Start', variant: 'success' },
          { label: 'Stop', variant: 'error' },
        ]}
        size="sm"
      />
      
      <StatusCard
        title="Medium Size"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Start', variant: 'success' },
          { label: 'Stop', variant: 'error' },
        ]}
        size="md"
      />
      
      <StatusCard
        title="Large Size"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Start', variant: 'success' },
          { label: 'Stop', variant: 'error' },
        ]}
        size="lg"
      />
    </div>
  ),
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Machine A1"
        status={{ label: 'Online', variant: 'success', pulse: true }}
        values={[
          { label: 'Uptime', value: '247.5', unit: 'hrs' },
          { label: 'Temperature', value: 68.5, precision: 1, unit: '°C' },
        ]}
        actions={[
          { label: 'Start Job', variant: 'success' },
        ]}
      />
      
      <StatusCard
        title="Machine B2"
        status={{ label: 'Warning', variant: 'warning', pulse: true }}
        values={[
          { label: 'Coolant Level', value: 25, unit: '%' },
          { label: 'Temperature', value: 85.2, precision: 1, unit: '°C' },
        ]}
        actions={[
          { label: 'Check System', variant: 'warning' },
        ]}
      />
      
      <StatusCard
        title="Machine C3"
        status={{ label: 'Error', variant: 'error', pulse: true }}
        values={[
          { label: 'Last Error', value: 'E001' },
          { label: 'Downtime', value: '0.5', unit: 'hrs' },
        ]}
        actions={[
          { label: 'Reset', variant: 'error' },
          { label: 'Diagnose', variant: 'secondary' },
        ]}
      />
      
      <StatusCard
        title="Machine D4"
        status={{ label: 'Maintenance', variant: 'info' }}
        values={[
          { label: 'Next Service', value: '24', unit: 'hrs' },
          { label: 'Tool Life', value: 85, unit: '%' },
        ]}
        actions={[
          { label: 'Schedule', variant: 'info' },
        ]}
      />
      
      <StatusCard
        title="Machine E5"
        status={{ label: 'Offline', variant: 'secondary' }}
        values={[
          { label: 'Last Seen', value: '2', unit: 'hrs ago' },
          { label: 'Status', value: 'Disconnected' },
        ]}
        actions={[
          { label: 'Reconnect', variant: 'default' },
        ]}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Loading Machine"
        status={{ label: 'Connecting', variant: 'info' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Cancel', variant: 'secondary' },
        ]}
        loading={true}
      />
      
      <StatusCard
        title="Normal Machine"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
        ]}
        actions={[
          { label: 'Start', variant: 'success' },
        ]}
        loading={false}
      />
    </div>
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Monitor Only"
        status={{ label: 'Online', variant: 'success' }}
        values={[
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
          { label: 'Z Position', value: -10.125, precision: 3, unit: 'mm' },
        ]}
      />
      
      <StatusCard
        title="Status Display"
        status={{ label: 'Running', variant: 'info', pulse: true }}
        values={[
          { label: 'Progress', value: 67, unit: '%' },
          { label: 'ETA', value: '2.5', unit: 'hrs' },
        ]}
      />
    </div>
  ),
};

export const WithoutValues: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <StatusCard
        title="Simple Status"
        status={{ label: 'Online', variant: 'success' }}
        actions={[
          { label: 'Start', variant: 'success' },
          { label: 'Stop', variant: 'error' },
        ]}
      />
      
      <StatusCard
        title="Emergency Control"
        status={{ label: 'Emergency', variant: 'error', pulse: true }}
        actions={[
          { label: 'Reset System', variant: 'emergency' },
          { label: 'Call Support', variant: 'secondary' },
        ]}
      />
    </div>
  ),
};

export const CNCProductionDashboard: Story = {
  render: () => {
    const [machines, setMachines] = useState([
      {
        id: 'A1',
        title: 'Haas VF-3 (A1)',
        status: { label: 'Running', variant: 'success' as const, pulse: true },
        values: [
          { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
          { label: 'Feed Rate', value: 1500, unit: 'mm/min' },
          { label: 'Spindle Speed', value: 12000, unit: 'RPM' },
        ],
        actions: [
          { label: 'Pause', variant: 'warning' as const },
          { label: 'Stop', variant: 'error' as const },
        ],
      },
      {
        id: 'B2',
        title: 'Mazak i-400 (B2)',
        status: { label: 'Idle', variant: 'info' as const },
        values: [
          { label: 'X Position', value: 0.000, precision: 3, unit: 'mm' },
          { label: 'Y Position', value: 0.000, precision: 3, unit: 'mm' },
          { label: 'Tool Life', value: 85, unit: '%' },
          { label: 'Coolant Level', value: 92, unit: '%' },
        ],
        actions: [
          { label: 'Start Job', variant: 'success' as const },
          { label: 'Setup', variant: 'secondary' as const },
        ],
      },
      {
        id: 'C3',
        title: 'DMG Mori DMU 50 (C3)',
        status: { label: 'Warning', variant: 'warning' as const, pulse: true },
        values: [
          { label: 'Temperature', value: 85.2, precision: 1, unit: '°C' },
          { label: 'Coolant Level', value: 15, unit: '%' },
          { label: 'Tool Life', value: 12, unit: '%' },
          { label: 'Vibration', value: 'High' },
        ],
        actions: [
          { label: 'Check System', variant: 'warning' as const },
          { label: 'Maintenance', variant: 'secondary' as const },
        ],
      },
    ]);

    const [isUpdating, setIsUpdating] = useState(false);

    const simulateUpdate = () => {
      setIsUpdating(true);
      
      setTimeout(() => {
        setMachines(prev => prev.map(machine => {
          if (machine.id === 'A1') {
            return {
              ...machine,
              values: machine.values.map(val => {
                if (val.label.includes('Position')) {
                  return { ...val, value: Number(val.value) + (Math.random() - 0.5) * 0.1 };
                }
                return val;
              })
            };
          }
          return machine;
        }));
        setIsUpdating(false);
      }, 1000);
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}>
            CNC Production Dashboard
          </h3>
          <Button 
            size="sm" 
            variant="outline"
            onClick={simulateUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Positions'}
          </Button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {machines.map(machine => (
            <StatusCard
              key={machine.id}
              title={machine.title}
              status={machine.status}
              values={machine.values}
              actions={machine.actions}
              loading={isUpdating && machine.id === 'A1'}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC production dashboard with real-time machine status monitoring.',
      },
    },
  },
};

export const ComparisonStory: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '900px',
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)',
        fontSize: '1.25rem',
        fontWeight: 600,
      }}>
        Before vs After: StatusCard Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <div style={{ 
            padding: '1rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '8px',
            border: '1px solid hsl(240, 3.7%, 25%)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)', margin: 0 }}>
                  Machine Status
                </h3>
                <div style={{ 
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'hsl(142, 76%, 36%)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: 'white'
                }}>
                  Online
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'hsl(0, 0%, 98%)' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)', margin: '0 0 0.25rem 0' }}>X Position</p>
                  <p style={{ fontSize: '1.125rem', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>125.450</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)', margin: '0 0 0.25rem 0' }}>Y Position</p>
                  <p style={{ fontSize: '1.125rem', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>67.230</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: StatusCard Component
          </h4>
          <StatusCard
            title="Machine Status"
            status={{ label: 'Online', variant: 'success' }}
            values={[
              { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
              { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
            ]}
            actions={[
              { label: 'Start', variant: 'success' },
              { label: 'Stop', variant: 'error' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the StatusCard component vs inline implementation.',
      },
    },
  },
};