import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof ProgressBar> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A progress bar component for displaying completion status with various styles and animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showValue: {
      control: 'boolean',
    },
    showPercentage: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    showValue: true,
    showPercentage: true,
    animated: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: '300px',
    }}>
      <ProgressBar
        label="Default"
        value={65}
        variant="default"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Success"
        value={100}
        variant="success"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Warning"
        value={75}
        variant="warning"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Error"
        value={25}
        variant="error"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Info"
        value={50}
        variant="info"
        showValue={true}
        showPercentage={true}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: '300px',
    }}>
      <ProgressBar
        label="Small"
        value={65}
        size="sm"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Medium"
        value={65}
        size="md"
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="Large"
        value={65}
        size="lg"
        showValue={true}
        showPercentage={true}
      />
    </div>
  ),
};

export const WithoutValue: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: '300px',
    }}>
      <ProgressBar
        label="No Value Display"
        value={65}
        showValue={false}
      />
      <ProgressBar
        label="With Percentage"
        value={65}
        showValue={true}
        showPercentage={true}
      />
      <ProgressBar
        label="With Raw Value"
        value={65}
        showValue={true}
        showPercentage={false}
      />
    </div>
  ),
};

export const CustomMax: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: '300px',
    }}>
      <ProgressBar
        label="Out of 200"
        value={150}
        max={200}
        showValue={true}
        showPercentage={false}
      />
      <ProgressBar
        label="Temperature (°C)"
        value={75}
        max={100}
        showValue={true}
        showPercentage={false}
        unit="°C"
        variant="warning"
      />
      <ProgressBar
        label="Memory Usage"
        value={6.4}
        max={16}
        showValue={true}
        showPercentage={false}
        unit="GB"
        variant="info"
      />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        width: '300px',
      }}>
        <ProgressBar
          label="Animated Progress"
          value={progress}
          showValue={true}
          showPercentage={true}
          animated={true}
        />
        <ProgressBar
          label="Striped Progress"
          value={progress}
          showValue={true}
          showPercentage={true}
          animated={true}
          striped={true}
        />
        <ProgressBar
          label="Pulsing Progress"
          value={progress}
          showValue={true}
          showPercentage={true}
          animated={true}
          pulse={true}
        />
      </div>
    );
  },
};

export const CNCProgressBars: Story = {
  render: () => {
    const [machineProgress, setMachineProgress] = useState({
      job1: 85,
      job2: 45,
      job3: 100,
      job4: 0,
      job5: 67,
    });
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        width: '400px',
      }}>
        <ProgressBar
          label="Job #1001 - Aluminum Part"
          value={machineProgress.job1}
          showValue={true}
          showPercentage={true}
          variant="default"
        />
        <ProgressBar
          label="Job #1002 - Steel Bracket"
          value={machineProgress.job2}
          showValue={true}
          showPercentage={true}
          variant="info"
        />
        <ProgressBar
          label="Job #1003 - Brass Fitting"
          value={machineProgress.job3}
          showValue={true}
          showPercentage={true}
          variant="success"
        />
        <ProgressBar
          label="Job #1004 - Titanium Component"
          value={machineProgress.job4}
          showValue={true}
          showPercentage={true}
          variant="default"
        />
        <ProgressBar
          label="Job #1005 - Plastic Housing"
          value={machineProgress.job5}
          showValue={true}
          showPercentage={true}
          variant="warning"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bars showing CNC job completion status with realistic manufacturing scenarios.',
      },
    },
  },
};

export const MachineStatus: Story = {
  render: () => {
    const [status, setStatus] = useState({
      spindleLoad: 65,
      temperature: 75,
      toolLife: 85,
      vibration: 25,
      coolantLevel: 90,
      airPressure: 95,
    });
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        borderRadius: '8px',
        maxWidth: '600px',
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1.5rem',
          color: 'hsl(0, 0%, 98%)'
        }}>
          Machine Status Dashboard
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1rem' 
        }}>
          <Card style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Performance
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ProgressBar
                label="Spindle Load"
                value={status.spindleLoad}
                showValue={true}
                showPercentage={true}
                variant="info"
              />
              <ProgressBar
                label="Tool Life Remaining"
                value={status.toolLife}
                showValue={true}
                showPercentage={true}
                variant="success"
              />
              <ProgressBar
                label="Vibration Level"
                value={status.vibration}
                showValue={true}
                showPercentage={true}
                variant="warning"
              />
            </div>
          </Card>
          
          <Card style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Systems
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ProgressBar
                label="Temperature"
                value={status.temperature}
                max={100}
                showValue={true}
                showPercentage={false}
                unit="°C"
                variant="warning"
              />
              <ProgressBar
                label="Coolant Level"
                value={status.coolantLevel}
                showValue={true}
                showPercentage={true}
                variant="info"
              />
              <ProgressBar
                label="Air Pressure"
                value={status.airPressure}
                showValue={true}
                showPercentage={true}
                variant="success"
              />
            </div>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Machine status dashboard showing various system metrics using progress bars.',
      },
    },
  },
};