import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { PositionDisplay } from './PositionDisplay';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof PositionDisplay> = {
  title: 'Primitives/PositionDisplay',
  component: PositionDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A position display component for showing CNC machine coordinates with customizable formatting, precision, and layout options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'inline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    precision: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
    },
    showLabels: {
      control: 'boolean',
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
    position: { x: 125.750, y: 67.230, z: -10.125 },
    precision: 3,
    unit: 'mm',
    showLabels: true,
  },
  render: (args) => (
    <div style={{ width: '200px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
      <PositionDisplay {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      width: '800px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Default</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          variant="default"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Compact</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          variant="compact"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Detailed</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          variant="detailed"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Inline</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          variant="inline"
          orientation="horizontal"
        />
      </div>
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
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Small</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          size="sm"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Medium</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          size="md"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Large</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Vertical</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          orientation="vertical"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Horizontal</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          orientation="horizontal"
        />
      </div>
    </div>
  ),
};

export const Precision: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Low Precision (1 decimal)</h4>
        <PositionDisplay
          position={{ x: 125.7896, y: 67.2347, z: -10.1256 }}
          precision={1}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Standard Precision (3 decimals)</h4>
        <PositionDisplay
          position={{ x: 125.7896, y: 67.2347, z: -10.1256 }}
          precision={3}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>High Precision (6 decimals)</h4>
        <PositionDisplay
          position={{ x: 125.7896, y: 67.2347, z: -10.1256 }}
          precision={6}
        />
      </div>
    </div>
  ),
};

export const DifferentUnits: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Millimeters</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          unit="mm"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Inches</h4>
        <PositionDisplay
          position={{ x: 4.952, y: 2.646, z: -0.399 }}
          unit="in"
          precision={3}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Degrees (for rotary axes)</h4>
        <PositionDisplay
          position={{ a: 45.0, b: 0.0, c: -90.0 }}
          axes={['a', 'b', 'c']}
          unit="°"
          precision={1}
        />
      </div>
    </div>
  ),
};

export const WithoutLabels: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>With Labels</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          showLabels={true}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Without Labels</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          showLabels={false}
        />
      </div>
    </div>
  ),
};

export const CustomAxes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>3-Axis Mill (X, Y, Z)</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          axes={['x', 'y', 'z']}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>2-Axis Lathe (X, Z)</h4>
        <PositionDisplay
          position={{ x: 45.250, z: 125.750 }}
          axes={['x', 'z']}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>5-Axis Machine (X, Y, Z, A, C)</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125, a: 45.0, c: -90.0 }}
          axes={['x', 'y', 'z', 'a', 'c']}
        />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Loading State</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          loading={true}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Normal State</h4>
        <PositionDisplay
          position={{ x: 125.750, y: 67.230, z: -10.125 }}
          loading={false}
        />
      </div>
    </div>
  ),
};

export const HighlightAxis: Story = {
  render: () => {
    const [highlightedAxis, setHighlightedAxis] = useState<'x' | 'y' | 'z' | undefined>('z');

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Highlight Active Axis</h4>
          <PositionDisplay
            position={{ x: 125.750, y: 67.230, z: -10.125 }}
            highlightAxis={highlightedAxis}
            variant="detailed"
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['x', 'y', 'z'].map((axis) => (
            <Button
              key={axis}
              size="sm"
              variant={highlightedAxis === axis ? 'default' : 'outline'}
              onClick={() => setHighlightedAxis(axis as 'x' | 'y' | 'z')}
            >
              {axis.toUpperCase()}
            </Button>
          ))}
          <Button
            size="sm"
            variant={!highlightedAxis ? 'default' : 'outline'}
            onClick={() => setHighlightedAxis(undefined)}
          >
            None
          </Button>
        </div>
      </div>
    );
  },
};

export const MachinePositionDashboard: Story = {
  render: () => {
    const [machineData, setMachineData] = useState({
      machine: { x: 125.750, y: 67.230, z: -10.125 },
      work: { x: 0.000, y: 0.000, z: 0.000 },
      tool: { x: 0.000, y: 0.000, z: 25.400 },
    });

    const [isMoving, setIsMoving] = useState(false);

    const simulateMovement = () => {
      setIsMoving(true);
      const interval = setInterval(() => {
        setMachineData(prev => ({
          ...prev,
          machine: {
            x: prev.machine.x + (Math.random() - 0.5) * 0.1,
            y: prev.machine.y + (Math.random() - 0.5) * 0.1,
            z: prev.machine.z + (Math.random() - 0.5) * 0.05,
          }
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setIsMoving(false);
      }, 3000);
    };

    return (
      <div style={{ 
        width: '700px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1.5rem',
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
            Machine Position Dashboard
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {isMoving && (
              <Badge variant="bright-info" showIndicator pulse>
                Moving
              </Badge>
            )}
            <Button 
              size="sm" 
              onClick={simulateMovement}
              disabled={isMoving}
            >
              {isMoving ? 'Moving...' : 'Simulate Movement'}
            </Button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}>
              Machine Position
            </h4>
            <PositionDisplay
              position={machineData.machine}
              precision={3}
              unit="mm"
              variant="detailed"
              loading={isMoving}
              highlightAxis="z"
            />
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}>
              Work Offset (G54)
            </h4>
            <PositionDisplay
              position={machineData.work}
              precision={3}
              unit="mm"
              variant="detailed"
            />
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}>
              Tool Offset (T1)
            </h4>
            <PositionDisplay
              position={machineData.tool}
              precision={3}
              unit="mm"
              variant="detailed"
              highlightAxis="z"
            />
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete machine position dashboard with real-time updates and different coordinate systems.',
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
      maxWidth: '800px',
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)',
        fontSize: '1.25rem',
        fontWeight: 600,
      }}>
        Before vs After: PositionDisplay Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            {/* Legacy inline implementation */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'hsl(0, 0%, 98%)' }}>
              X: 125.750<br/>
              Y: 67.230<br/>
              Z: -10.125
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: PositionDisplay Component
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            <PositionDisplay
              position={{ x: 125.750, y: 67.230, z: -10.125 }}
              precision={3}
              unit="mm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the PositionDisplay component vs inline implementation.',
      },
    },
  },
};