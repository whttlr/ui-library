import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MachineCoordinateSystem, CompactCoordinateSystem, type WorkOffset } from './MachineCoordinateSystem';
import { Card } from '@whttlr/ui-core';

const meta: Meta<typeof MachineCoordinateSystem> = {
  title: 'CNC/Controls/MachineCoordinateSystem',
  component: MachineCoordinateSystem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A machine coordinate system component for managing work offsets and coordinate transformations in CNC operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    unit: {
      control: 'select',
      options: ['mm', 'inch'],
    },
    precision: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
    },
    showRotaryAxes: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample work offsets
const sampleOffsets: WorkOffset[] = [
  {
    id: 'G54',
    name: 'G54',
    x: 100.0,
    y: 50.0,
    z: 25.0,
    description: 'Main fixture position',
    isActive: true,
  },
  {
    id: 'G55',
    name: 'G55',
    x: 200.0,
    y: 75.0,
    z: 30.0,
    description: 'Secondary fixture position',
  },
  {
    id: 'G56',
    name: 'G56',
    x: 150.0,
    y: 100.0,
    z: 15.0,
    description: 'Third fixture position',
  },
  {
    id: 'G57',
    name: 'G57',
    x: 0.0,
    y: 0.0,
    z: 0.0,
    description: 'Temporary setup position',
  },
];

const machinePosition = { x: 250.5, y: 125.75, z: 45.25 };

export const Default: Story = {
  render: () => {
    const [offsets, setOffsets] = useState<WorkOffset[]>(sampleOffsets);
    const [activeOffset, setActiveOffset] = useState('G54');

    const handleOffsetChange = (offsetId: string) => {
      setActiveOffset(offsetId);
    };

    const handleOffsetSet = (offsetId: string, axis: string, value: number) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? { ...offset, [axis]: value }
          : offset
      ));
    };

    const handleOffsetZero = (offsetId: string, axis?: string) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? {
              ...offset,
              ...(axis ? { [axis]: 0 } : { x: 0, y: 0, z: 0 }),
            }
          : offset
      ));
    };

    const handleOffsetCopy = (fromId: string, toId: string) => {
      const fromOffset = offsets.find(o => o.id === fromId);
      if (fromOffset) {
        setOffsets(prev => prev.map(offset => 
          offset.id === toId 
            ? { ...offset, x: fromOffset.x, y: fromOffset.y, z: fromOffset.z }
            : offset
        ));
      }
    };

    return (
      <div style={{ width: '800px' }}>
        <MachineCoordinateSystem
          workOffsets={offsets}
          activeOffset={activeOffset}
          machinePosition={machinePosition}
          onOffsetChange={handleOffsetChange}
          onOffsetSet={handleOffsetSet}
          onOffsetZero={handleOffsetZero}
          onOffsetCopy={handleOffsetCopy}
          onOffsetSave={(offsetId) => console.log('Save offset:', offsetId)}
        />
      </div>
    );
  },
};

export const WithRotaryAxes: Story = {
  render: () => {
    const rotaryOffsets: WorkOffset[] = sampleOffsets.map(offset => ({
      ...offset,
      a: offset.id === 'G54' ? 45.0 : 0.0,
      b: offset.id === 'G54' ? 0.0 : 0.0,
      c: offset.id === 'G54' ? 90.0 : 0.0,
    }));

    const [offsets, setOffsets] = useState<WorkOffset[]>(rotaryOffsets);
    const [activeOffset, setActiveOffset] = useState('G54');

    const rotaryMachinePosition = { 
      ...machinePosition, 
      a: 45.0, 
      b: 0.0, 
      c: 90.0 
    };

    const handleOffsetChange = (offsetId: string) => {
      setActiveOffset(offsetId);
    };

    const handleOffsetSet = (offsetId: string, axis: string, value: number) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? { ...offset, [axis]: value }
          : offset
      ));
    };

    const handleOffsetZero = (offsetId: string, axis?: string) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? {
              ...offset,
              ...(axis ? { [axis]: 0 } : { x: 0, y: 0, z: 0, a: 0, b: 0, c: 0 }),
            }
          : offset
      ));
    };

    return (
      <div style={{ width: '900px' }}>
        <MachineCoordinateSystem
          workOffsets={offsets}
          activeOffset={activeOffset}
          machinePosition={rotaryMachinePosition}
          onOffsetChange={handleOffsetChange}
          onOffsetSet={handleOffsetSet}
          onOffsetZero={handleOffsetZero}
          showRotaryAxes={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Coordinate system with rotary axes (A, B, C) for multi-axis machining.',
      },
    },
  },
};

export const InchUnits: Story = {
  render: () => {
    const inchOffsets: WorkOffset[] = sampleOffsets.map(offset => ({
      ...offset,
      x: Number((offset.x / 25.4).toFixed(4)),
      y: Number((offset.y / 25.4).toFixed(4)),
      z: Number((offset.z / 25.4).toFixed(4)),
    }));

    const [offsets, setOffsets] = useState<WorkOffset[]>(inchOffsets);
    const [activeOffset, setActiveOffset] = useState('G54');

    const inchMachinePosition = {
      x: Number((machinePosition.x / 25.4).toFixed(4)),
      y: Number((machinePosition.y / 25.4).toFixed(4)),
      z: Number((machinePosition.z / 25.4).toFixed(4)),
    };

    const handleOffsetChange = (offsetId: string) => {
      setActiveOffset(offsetId);
    };

    const handleOffsetSet = (offsetId: string, axis: string, value: number) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? { ...offset, [axis]: value }
          : offset
      ));
    };

    const handleOffsetZero = (offsetId: string, axis?: string) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? {
              ...offset,
              ...(axis ? { [axis]: 0 } : { x: 0, y: 0, z: 0 }),
            }
          : offset
      ));
    };

    return (
      <div style={{ width: '800px' }}>
        <MachineCoordinateSystem
          workOffsets={offsets}
          activeOffset={activeOffset}
          machinePosition={inchMachinePosition}
          onOffsetChange={handleOffsetChange}
          onOffsetSet={handleOffsetSet}
          onOffsetZero={handleOffsetZero}
          unit="inch"
          precision={4}
        />
      </div>
    );
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [showSetup, setShowSetup] = useState(false);
    const activeOffsetData = sampleOffsets.find(o => o.id === 'G54');
    
    const workPosition = {
      x: machinePosition.x - (activeOffsetData?.x || 0),
      y: machinePosition.y - (activeOffsetData?.y || 0),
      z: machinePosition.z - (activeOffsetData?.z || 0),
    };

    return (
      <div style={{ width: 'auto' }}>
        <CompactCoordinateSystem
          activeOffset="G54"
          workPosition={workPosition}
          machinePosition={machinePosition}
          onOffsetClick={() => setShowSetup(!showSetup)}
        />
        {showSetup && (
          <div style={{ marginTop: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <p style={{ 
                margin: 0, 
                color: 'hsl(240, 5%, 64.9%)',
                fontSize: '0.875rem',
              }}>
                Full coordinate system setup would open here...
              </p>
            </Card>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact coordinate system display suitable for status bars and dashboards.',
      },
    },
  },
};

export const MultiFixtureSetup: Story = {
  render: () => {
    const multiFixtureOffsets: WorkOffset[] = [
      {
        id: 'G54',
        name: 'G54 - Fixture 1',
        x: 100.0,
        y: 50.0,
        z: 25.0,
        description: 'Left fixture - Part A',
        isActive: true,
      },
      {
        id: 'G55',
        name: 'G55 - Fixture 2',
        x: 300.0,
        y: 50.0,
        z: 25.0,
        description: 'Center fixture - Part B',
      },
      {
        id: 'G56',
        name: 'G56 - Fixture 3',
        x: 500.0,
        y: 50.0,
        z: 25.0,
        description: 'Right fixture - Part C',
      },
      {
        id: 'G57',
        name: 'G57 - Probe',
        x: 0.0,
        y: 0.0,
        z: 0.0,
        description: 'Probe reference position',
      },
    ];

    const [offsets, setOffsets] = useState<WorkOffset[]>(multiFixtureOffsets);
    const [activeOffset, setActiveOffset] = useState('G54');

    const handleOffsetChange = (offsetId: string) => {
      setActiveOffset(offsetId);
    };

    const handleOffsetSet = (offsetId: string, axis: string, value: number) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? { ...offset, [axis]: value }
          : offset
      ));
    };

    const handleOffsetZero = (offsetId: string, axis?: string) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? {
              ...offset,
              ...(axis ? { [axis]: 0 } : { x: 0, y: 0, z: 0 }),
            }
          : offset
      ));
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1000px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Multi-Fixture Setup
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
          {/* Main coordinate system */}
          <MachineCoordinateSystem
            workOffsets={offsets}
            activeOffset={activeOffset}
            machinePosition={machinePosition}
            onOffsetChange={handleOffsetChange}
            onOffsetSet={handleOffsetSet}
            onOffsetZero={handleOffsetZero}
          />
          
          {/* Fixture overview */}
          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Fixture Overview
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {offsets.map((offset) => (
                <div
                  key={offset.id}
                  onClick={() => setActiveOffset(offset.id)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: activeOffset === offset.id ? 
                      'hsl(262, 83%, 58%, 0.1)' : 'hsl(240, 10%, 12%)',
                    border: activeOffset === offset.id ? 
                      '1px solid hsl(262, 83%, 58%)' : '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ 
                    fontWeight: 600,
                    color: 'hsl(0, 0%, 98%)',
                    marginBottom: '0.25rem',
                  }}>
                    {offset.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: 'hsl(240, 5%, 64.9%)',
                    marginBottom: '0.25rem',
                  }}>
                    {offset.description}
                  </div>
                  <div style={{ 
                    fontSize: '0.625rem',
                    color: 'hsl(240, 5%, 64.9%)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    X:{offset.x.toFixed(1)} Y:{offset.y.toFixed(1)} Z:{offset.z.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-fixture setup with overview panel showing all work offsets.',
      },
    },
  },
};

export const ProbeIntegration: Story = {
  render: () => {
    const [offsets, setOffsets] = useState<WorkOffset[]>(sampleOffsets);
    const [activeOffset, setActiveOffset] = useState('G54');
    const [isProbing, setIsProbing] = useState(false);

    const handleOffsetChange = (offsetId: string) => {
      setActiveOffset(offsetId);
    };

    const handleOffsetSet = (offsetId: string, axis: string, value: number) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? { ...offset, [axis]: value }
          : offset
      ));
    };

    const handleOffsetZero = (offsetId: string, axis?: string) => {
      setOffsets(prev => prev.map(offset => 
        offset.id === offsetId 
          ? {
              ...offset,
              ...(axis ? { [axis]: 0 } : { x: 0, y: 0, z: 0 }),
            }
          : offset
      ));
    };

    const handleProbe = (axis: string) => {
      setIsProbing(true);
      // Simulate probing
      setTimeout(() => {
        const probeValue = machinePosition[axis as keyof typeof machinePosition] || 0;
        const selectedOffset = offsets.find(o => o.id === activeOffset);
        if (selectedOffset) {
          handleOffsetSet(selectedOffset.id, axis, probeValue);
        }
        setIsProbing(false);
      }, 2000);
    };

    return (
      <div style={{ width: '800px' }}>
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Coordinate System with Probing
          </h3>
          
          <MachineCoordinateSystem
            workOffsets={offsets}
            activeOffset={activeOffset}
            machinePosition={machinePosition}
            onOffsetChange={handleOffsetChange}
            onOffsetSet={handleOffsetSet}
            onOffsetZero={handleOffsetZero}
            disabled={isProbing}
          />
          
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'hsl(240, 10%, 12%)',
            borderRadius: '6px',
          }}>
            <h4 style={{ 
              margin: '0 0 0.5rem 0',
              color: 'hsl(0, 0%, 98%)',
              fontSize: '0.875rem',
            }}>
              Probing Controls
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['X', 'Y', 'Z'].map((axis) => (
                <button
                  key={axis}
                  onClick={() => handleProbe(axis.toLowerCase())}
                  disabled={isProbing}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: isProbing ? 'hsl(240, 5%, 64.9%)' : 'hsl(262, 83%, 58%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isProbing ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  {isProbing ? 'Probing...' : `Probe ${axis}`}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Coordinate system with integrated probing controls for automatic work offset setting.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    workOffsets: sampleOffsets,
    activeOffset: 'G54',
    machinePosition,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '800px' }}>
      <MachineCoordinateSystem
        {...args}
        onOffsetChange={() => {}}
        onOffsetSet={() => {}}
        onOffsetZero={() => {}}
      />
    </div>
  ),
};