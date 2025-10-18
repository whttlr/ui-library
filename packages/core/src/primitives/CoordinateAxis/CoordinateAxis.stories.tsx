import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { CoordinateAxis } from './CoordinateAxis';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const meta: Meta<typeof CoordinateAxis> = {
  title: 'Primitives/CoordinateAxis',
  component: CoordinateAxis,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A coordinate axis display component for showing precise machine positions with proper formatting and visual emphasis.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    precision: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
    },
    value: {
      control: { type: 'number', min: -1000, max: 1000, step: 0.001 },
    },
    highlight: {
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
    label: 'X Axis',
    value: 125.750,
    precision: 3,
    unit: 'mm',
  },
  render: (args) => (
    <div style={{ width: '150px' }}>
      <CoordinateAxis {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
    }}>
      <CoordinateAxis
        label="X Axis"
        value={125.750}
        variant="default"
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="Y Axis"
        value={-45.120}
        variant="highlight"
        precision={3}
        unit="mm"
        highlight
      />
      <CoordinateAxis
        label="Z Axis"
        value={2.000}
        variant="warning"
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="A Axis"
        value={-180.000}
        variant="error"
        precision={3}
        unit="°"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      alignItems: 'end',
    }}>
      <CoordinateAxis
        label="Small"
        value={125.750}
        size="sm"
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="Medium"
        value={125.750}
        size="md"
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="Large"
        value={125.750}
        size="lg"
        precision={3}
        unit="mm"
      />
    </div>
  ),
};

export const Precision: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
    }}>
      <CoordinateAxis
        label="Low Precision"
        value={125.7896}
        precision={1}
        unit="mm"
      />
      <CoordinateAxis
        label="Standard"
        value={125.7896}
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="High Precision"
        value={125.7896}
        precision={6}
        unit="mm"
      />
    </div>
  ),
};

export const DifferentUnits: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      flexWrap: 'wrap',
    }}>
      <CoordinateAxis
        label="Position"
        value={125.750}
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="Position"
        value={4.952}
        precision={3}
        unit="in"
      />
      <CoordinateAxis
        label="Angle"
        value={45.0}
        precision={1}
        unit="°"
      />
      <CoordinateAxis
        label="Speed"
        value={1200}
        precision={0}
        unit="RPM"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
    }}>
      <CoordinateAxis
        label="X Axis"
        value={125.750}
        loading={true}
        precision={3}
        unit="mm"
      />
      <CoordinateAxis
        label="Y Axis"
        value={-45.120}
        loading={true}
        precision={3}
        unit="mm"
        size="lg"
      />
    </div>
  ),
};

export const MachinePositionGrid: Story = {
  render: () => {
    const [coordinates, setCoordinates] = useState({
      x: 125.750,
      y: -45.120,
      z: 2.000,
    });

    const [isMoving, setIsMoving] = useState(false);

    const simulateMovement = () => {
      setIsMoving(true);
      const interval = setInterval(() => {
        setCoordinates(prev => ({
          x: prev.x + (Math.random() - 0.5) * 0.1,
          y: prev.y + (Math.random() - 0.5) * 0.1,
          z: prev.z + (Math.random() - 0.5) * 0.05,
        }));
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setIsMoving(false);
      }, 3000);
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Machine Position
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <CoordinateAxis
            label="X Axis"
            value={coordinates.x}
            precision={3}
            unit="mm"
            loading={isMoving}
          />
          <CoordinateAxis
            label="Y Axis"
            value={coordinates.y}
            precision={3}
            unit="mm"
            loading={isMoving}
          />
          <CoordinateAxis
            label="Z Axis"
            value={coordinates.z}
            precision={3}
            unit="mm"
            highlight
            loading={isMoving}
          />
        </div>
        
        <Button 
          onClick={simulateMovement}
          disabled={isMoving}
          style={{ width: '100%' }}
        >
          {isMoving ? 'Moving...' : 'Simulate Movement'}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive machine position grid with simulated movement and loading states.',
      },
    },
  },
};

export const CNCStatusDashboard: Story = {
  render: () => {
    const [machineData, setMachineData] = useState({
      position: { x: 125.750, y: -45.120, z: 2.000 },
      workOffset: { x: 0.000, y: 0.000, z: 0.000 },
      toolOffset: { x: 0.000, y: 0.000, z: 25.400 },
      spindle: { speed: 12000, load: 65.5 },
      feedRate: 1500,
    });

    const [isConnected, setIsConnected] = useState(true);

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
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
            CNC Status Dashboard
          </h3>
          <Button 
            size="sm" 
            variant={isConnected ? 'success' : 'outline'}
            onClick={() => setIsConnected(!isConnected)}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </Button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}>
              Machine Position
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <CoordinateAxis
                label="X"
                value={machineData.position.x}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Y"
                value={machineData.position.y}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Z"
                value={machineData.position.z}
                precision={3}
                unit="mm"
                size="sm"
                highlight
                loading={!isConnected}
              />
            </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <CoordinateAxis
                label="X"
                value={machineData.workOffset.x}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Y"
                value={machineData.workOffset.y}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Z"
                value={machineData.workOffset.z}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
            </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <CoordinateAxis
                label="X"
                value={machineData.toolOffset.x}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Y"
                value={machineData.toolOffset.y}
                precision={3}
                unit="mm"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Z"
                value={machineData.toolOffset.z}
                precision={3}
                unit="mm"
                size="sm"
                variant="warning"
                loading={!isConnected}
              />
            </div>
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}>
              System Parameters
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <CoordinateAxis
                label="Spindle"
                value={machineData.spindle.speed}
                precision={0}
                unit="RPM"
                size="sm"
                loading={!isConnected}
              />
              <CoordinateAxis
                label="Feed Rate"
                value={machineData.feedRate}
                precision={0}
                unit="mm/min"
                size="sm"
                loading={!isConnected}
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
        story: 'Complete CNC status dashboard showing machine position, work offsets, tool offsets, and system parameters.',
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
        Before vs After: CoordinateAxis Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {/* Legacy inline implementation */}
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)',
              textAlign: 'center'
            }}>
              <div style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                X Axis
              </div>
              <div style={{ 
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'hsl(0, 0%, 98%)',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
                lineHeight: 1
              }}>
                125.750 mm
              </div>
            </div>
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)',
              textAlign: 'center'
            }}>
              <div style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Y Axis
              </div>
              <div style={{ 
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'hsl(0, 0%, 98%)',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
                lineHeight: 1
              }}>
                -45.120 mm
              </div>
            </div>
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(262, 83%, 58%)',
              textAlign: 'center'
            }}>
              <div style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Z Axis
              </div>
              <div style={{ 
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'hsl(262, 83%, 58%)',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
                lineHeight: 1
              }}>
                2.000 mm
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: CoordinateAxis Component
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <CoordinateAxis
              label="X Axis"
              value={125.750}
              precision={3}
              unit="mm"
            />
            <CoordinateAxis
              label="Y Axis"
              value={-45.120}
              precision={3}
              unit="mm"
            />
            <CoordinateAxis
              label="Z Axis"
              value={2.000}
              precision={3}
              unit="mm"
              highlight
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the CoordinateAxis component vs inline implementation.',
      },
    },
  },
};