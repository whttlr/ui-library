import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { SpindleSpeedControl, CompactSpindleControl } from './SpindleSpeedControl';
import { Card } from '@whttlr/ui-core';

const meta: Meta<typeof SpindleSpeedControl> = {
  title: 'CNC/Controls/SpindleSpeedControl',
  component: SpindleSpeedControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive spindle speed control component for CNC machines, featuring speed adjustment, override control, and real-time status monitoring.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentSpeed: {
      control: { type: 'number', min: 0, max: 24000, step: 100 },
    },
    targetSpeed: {
      control: { type: 'number', min: 0, max: 24000, step: 100 },
    },
    minSpeed: {
      control: { type: 'number', min: 0, max: 1000, step: 100 },
    },
    maxSpeed: {
      control: { type: 'number', min: 1000, max: 30000, step: 1000 },
    },
    unit: {
      control: 'select',
      options: ['RPM', 'SFM'],
    },
    isRunning: {
      control: 'boolean',
    },
    showOverride: {
      control: 'boolean',
    },
    overridePercentage: {
      control: { type: 'number', min: 0, max: 200, step: 5 },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [targetSpeed, setTargetSpeed] = useState(6000);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [overridePercentage, setOverridePercentage] = useState(100);

    // Simulate spindle ramping
    useEffect(() => {
      if (isRunning) {
        const interval = setInterval(() => {
          setCurrentSpeed(prev => {
            const target = targetSpeed * (overridePercentage / 100);
            const diff = target - prev;
            if (Math.abs(diff) < 50) return target;
            return prev + (diff > 0 ? 200 : -200);
          });
        }, 100);
        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => {
          setCurrentSpeed(prev => {
            if (prev <= 0) return 0;
            return Math.max(0, prev - 300);
          });
        }, 100);
        return () => clearInterval(interval);
      }
    }, [isRunning, targetSpeed, overridePercentage]);

    return (
      <div style={{ width: '400px' }}>
        <SpindleSpeedControl
          currentSpeed={currentSpeed}
          targetSpeed={targetSpeed}
          onSpeedChange={setTargetSpeed}
          onStart={() => setIsRunning(true)}
          onStop={() => setIsRunning(false)}
          isRunning={isRunning}
          overridePercentage={overridePercentage}
          onOverrideChange={setOverridePercentage}
        />
      </div>
    );
  },
};

export const WithoutOverride: Story = {
  render: () => {
    const [targetSpeed, setTargetSpeed] = useState(12000);
    const [currentSpeed, setCurrentSpeed] = useState(12000);
    const [isRunning, setIsRunning] = useState(true);

    return (
      <div style={{ width: '400px' }}>
        <SpindleSpeedControl
          currentSpeed={currentSpeed}
          targetSpeed={targetSpeed}
          onSpeedChange={setTargetSpeed}
          onStart={() => setIsRunning(true)}
          onStop={() => setIsRunning(false)}
          isRunning={isRunning}
          showOverride={false}
        />
      </div>
    );
  },
};

export const CustomPresets: Story = {
  render: () => {
    const [targetSpeed, setTargetSpeed] = useState(800);
    const [currentSpeed, setCurrentSpeed] = useState(800);
    const [isRunning, setIsRunning] = useState(true);

    return (
      <div style={{ width: '400px' }}>
        <SpindleSpeedControl
          currentSpeed={currentSpeed}
          targetSpeed={targetSpeed}
          onSpeedChange={setTargetSpeed}
          onStart={() => setIsRunning(true)}
          onStop={() => setIsRunning(false)}
          isRunning={isRunning}
          minSpeed={100}
          maxSpeed={3000}
          presets={[100, 400, 800, 1200, 2000, 3000]}
          showOverride={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Spindle control configured for a lathe with lower speed ranges.',
      },
    },
  },
};

export const SurfaceSpeedMode: Story = {
  render: () => {
    const [targetSpeed, setTargetSpeed] = useState(400);
    const [currentSpeed, setCurrentSpeed] = useState(400);
    const [isRunning, setIsRunning] = useState(true);
    const [overridePercentage, setOverridePercentage] = useState(100);

    return (
      <div style={{ width: '400px' }}>
        <SpindleSpeedControl
          currentSpeed={currentSpeed}
          targetSpeed={targetSpeed}
          onSpeedChange={setTargetSpeed}
          onStart={() => setIsRunning(true)}
          onStop={() => setIsRunning(false)}
          isRunning={isRunning}
          unit="SFM"
          minSpeed={50}
          maxSpeed={1000}
          presets={[100, 200, 300, 400, 600, 800]}
          overridePercentage={overridePercentage}
          onOverrideChange={setOverridePercentage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Spindle control in Surface Feet per Minute mode for constant surface speed operations.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(0);

    // Simulate spindle behavior
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSpeed(prev => {
          if (isRunning) {
            return Math.min(6000, prev + 200);
          } else {
            return Math.max(0, prev - 300);
          }
        });
      }, 100);
      return () => clearInterval(interval);
    }, [isRunning]);

    return (
      <div style={{ width: '350px' }}>
        <CompactSpindleControl
          currentSpeed={currentSpeed}
          isRunning={isRunning}
          onToggle={() => setIsRunning(!isRunning)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact version suitable for space-constrained layouts or status panels.',
      },
    },
  },
};

export const ControlPanel: Story = {
  render: () => {
    const [machines, setMachines] = useState([
      { id: 1, name: 'Mill 1', targetSpeed: 6000, currentSpeed: 6000, isRunning: true, override: 100 },
      { id: 2, name: 'Mill 2', targetSpeed: 12000, currentSpeed: 8000, isRunning: true, override: 75 },
      { id: 3, name: 'Lathe 1', targetSpeed: 800, currentSpeed: 0, isRunning: false, override: 100 },
    ]);

    const updateMachine = (id: number, updates: any) => {
      setMachines(prev => prev.map(m => 
        m.id === id ? { ...m, ...updates } : m
      ));
    };

    // Simulate spindle speeds
    useEffect(() => {
      const interval = setInterval(() => {
        setMachines(prev => prev.map(machine => {
          if (machine.isRunning) {
            const target = machine.targetSpeed * (machine.override / 100);
            const diff = target - machine.currentSpeed;
            if (Math.abs(diff) < 50) {
              return { ...machine, currentSpeed: target };
            }
            return {
              ...machine,
              currentSpeed: machine.currentSpeed + (diff > 0 ? 200 : -200),
            };
          } else {
            if (machine.currentSpeed <= 0) return machine;
            return {
              ...machine,
              currentSpeed: Math.max(0, machine.currentSpeed - 300),
            };
          }
        }));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <h3 style={{ 
          margin: 0, 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Multi-Machine Spindle Control Panel
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          {machines.map(machine => (
            <Card key={machine.id} style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                {machine.name}
              </h4>
              <SpindleSpeedControl
                currentSpeed={machine.currentSpeed}
                targetSpeed={machine.targetSpeed}
                onSpeedChange={(speed) => updateMachine(machine.id, { targetSpeed: speed })}
                onStart={() => updateMachine(machine.id, { isRunning: true })}
                onStop={() => updateMachine(machine.id, { isRunning: false })}
                isRunning={machine.isRunning}
                overridePercentage={machine.override}
                onOverrideChange={(override) => updateMachine(machine.id, { override })}
                maxSpeed={machine.name.includes('Lathe') ? 3000 : 24000}
                presets={machine.name.includes('Lathe') ? 
                  [100, 400, 800, 1200, 2000, 3000] : 
                  [1000, 3000, 6000, 12000, 18000, 24000]
                }
              />
            </Card>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple spindle controls in a machine monitoring dashboard.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    currentSpeed: 0,
    targetSpeed: 6000,
    isRunning: false,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SpindleSpeedControl {...args} />
    </div>
  ),
};