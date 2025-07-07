import type { Meta, StoryObj } from '@storybook/react';
import { CoordinateDisplay, SleekCoordinateDisplay } from './CoordinateDisplay';
import { useState } from 'react';

const meta: Meta<typeof CoordinateDisplay> = {
  title: 'CNC/Controls/CoordinateDisplay',
  component: CoordinateDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Real-time coordinate display for CNC machines. Shows current machine position with high precision and supports both metric and imperial units.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    workPosition: {
      description: 'Current work position coordinates',
    },
    machinePosition: {
      description: 'Absolute machine position coordinates',
    },
    unit: {
      control: 'select',
      options: ['mm', 'inch'],
      description: 'Unit system (mm/inch)',
    },
    precision: {
      control: 'select',
      options: ['high', 'medium', 'low'],
      description: 'Display precision level',
    },
    onZero: {
      action: 'zero',
      description: 'Callback for zeroing axes',
    },
    onCopy: {
      action: 'copy',
      description: 'Callback for copying coordinates',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic display
export const Default: Story = {
  args: {
    workPosition: { x: 25.45, y: 17.23, z: 5.5 },
    machinePosition: { x: 125.45, y: 67.23, z: -10.5 },
    unit: 'mm',
    precision: 'high',
  },
};

export const AtOrigin: Story = {
  args: {
    workPosition: { x: 0, y: 0, z: 0 },
    machinePosition: { x: 100, y: 50, z: -16 },
    unit: 'mm',
    precision: 'high',
  },
};

export const Imperial: Story = {
  args: {
    workPosition: { x: 1.0020, y: 0.6783, z: 0.2165 },
    machinePosition: { x: 4.9390, y: 2.6465, z: -0.4134 },
    unit: 'inch',
    precision: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'Coordinate display using imperial units (inches)',
      },
    },
  },
};

// Different precision levels
export const LowPrecision: Story = {
  args: {
    workPosition: { x: 125.45678, y: 67.23456, z: -10.56789 },
    machinePosition: { x: 225.45678, y: 117.23456, z: -26.56789 },
    unit: 'mm',
    precision: 'low',
  },
};

export const MediumPrecision: Story = {
  args: {
    workPosition: { x: 125.45678, y: 67.23456, z: -10.56789 },
    machinePosition: { x: 225.45678, y: 117.23456, z: -26.56789 },
    unit: 'mm',
    precision: 'medium',
  },
};

export const HighPrecision: Story = {
  args: {
    workPosition: { x: 125.45678, y: 67.23456, z: -10.56789 },
    machinePosition: { x: 225.45678, y: 117.23456, z: -26.56789 },
    unit: 'mm',
    precision: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'High precision display for fine machining operations',
      },
    },
  },
};

// Large coordinates
export const LargeCoordinates: Story = {
  args: {
    workPosition: { x: 1234.567, y: -567.891, z: 89.123 },
    machinePosition: { x: 1334.567, y: -517.891, z: 73.123 },
    unit: 'mm',
    precision: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'Display with large coordinate values',
      },
    },
  },
};

// Negative coordinates
export const NegativeCoordinates: Story = {
  args: {
    workPosition: { x: -45.67, y: -123.89, z: -78.12 },
    machinePosition: { x: 54.33, y: -73.89, z: -94.12 },
    unit: 'mm',
    precision: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Display with negative coordinate values',
      },
    },
  },
};

// Showcase different precision levels
export const AllPrecisions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Low Precision
        </h4>
        <CoordinateDisplay
          workPosition={{ x: 125.45678, y: 67.23456, z: -10.56789 }}
          machinePosition={{ x: 225.45678, y: 117.23456, z: -26.56789 }}
          unit="mm"
          precision="low"
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Medium Precision
        </h4>
        <CoordinateDisplay
          workPosition={{ x: 125.45678, y: 67.23456, z: -10.56789 }}
          machinePosition={{ x: 225.45678, y: 117.23456, z: -26.56789 }}
          unit="mm"
          precision="medium"
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          High Precision
        </h4>
        <CoordinateDisplay
          workPosition={{ x: 125.45678, y: 67.23456, z: -10.56789 }}
          machinePosition={{ x: 225.45678, y: 117.23456, z: -26.56789 }}
          unit="mm"
          precision="high"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different precision levels for coordinate display',
      },
    },
  },
};

// Sleek variant matching old demo
export const SleekVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 600, 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Sleek Position Display
        </h3>
        <SleekCoordinateDisplay
          position={{ x: 125.456, y: 67.234, z: -10.125 }}
          unit="mm"
          precision={3}
          title="Current Position"
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <SleekCoordinateDisplay
          position={{ x: 0, y: 0, z: 0 }}
          unit="mm"
          precision={3}
          title="Work Zero"
        />
        <SleekCoordinateDisplay
          position={{ x: 200.000, y: 150.000, z: 50.000 }}
          unit="mm"
          precision={3}
          title="Machine Home"
        />
      </div>
      
      <div>
        <SleekCoordinateDisplay
          position={{ x: 1.0020, y: 0.6783, z: 0.2165 }}
          unit="inch"
          precision={4}
          title="Imperial Position"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sleek coordinate display variant matching the aesthetic from the original demo, with colorful axis indicators and clean typography.',
      },
    },
  },
};