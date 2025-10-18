import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ProbeControl, CompactProbeControl, type ProbeSettings, type ProbeResult } from './ProbeControl';
import { Card, Button, Badge } from '@whttlr/ui-core';
import { Target, AlertCircle, CheckCircle, Play } from 'lucide-react';

const meta: Meta<typeof ProbeControl> = {
  title: 'CNC/Controls/ProbeControl',
  component: ProbeControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive probe control system for CNC machines with manual and automatic probing capabilities.',
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
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const initialProbeSettings: ProbeSettings = {
  feedRate: 50,
  probeDistance: 25,
  retractDistance: 2,
  repeatCount: 1,
  probeOffset: 0.5,
  safeHeight: 10,
};

const sampleProbeResults: ProbeResult[] = [
  {
    id: '1',
    type: 'surface',
    position: { x: 10.0, y: 20.0, z: -5.234 },
    timestamp: new Date(Date.now() - 300000),
    success: true,
  },
  {
    id: '2',
    type: 'edge',
    position: { x: 25.567, y: 20.0, z: -5.0 },
    timestamp: new Date(Date.now() - 180000),
    success: true,
  },
  {
    id: '3',
    type: 'hole',
    position: { x: 15.0, y: 25.0, z: -5.0 },
    timestamp: new Date(Date.now() - 120000),
    success: false,
    error: 'Probe failed to make contact within maximum distance',
  },
  {
    id: '4',
    type: 'corner',
    position: { x: 30.123, y: 30.456, z: -5.0 },
    timestamp: new Date(Date.now() - 60000),
    success: true,
  },
];

export const Default: Story = {
  render: () => {
    const [currentPosition, setCurrentPosition] = useState({ x: 10.0, y: 20.0, z: 5.0 });
    const [probeSettings, setProbeSettings] = useState<ProbeSettings>(initialProbeSettings);
    const [probeResults, setProbeResults] = useState<ProbeResult[]>(sampleProbeResults);
    const [isProbing, setIsProbing] = useState(false);

    const handleProbe = async (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => {
      setIsProbing(true);
      console.log('Probing direction:', direction);
      
      // Simulate probing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate probe result
      const newResult: ProbeResult = {
        id: `probe_${Date.now()}`,
        type: 'surface',
        position: {
          x: currentPosition.x + (Math.random() - 0.5) * 2,
          y: currentPosition.y + (Math.random() - 0.5) * 2,
          z: currentPosition.z - Math.random() * 10,
        },
        timestamp: new Date(),
        success: Math.random() > 0.2, // 80% success rate
        error: Math.random() > 0.2 ? undefined : 'Probe failed to make contact',
      };
      
      setProbeResults(prev => [...prev, newResult]);
      setIsProbing(false);
    };

    const handleProbeSequence = async (sequence: string) => {
      setIsProbing(true);
      console.log('Running probe sequence:', sequence);
      
      // Simulate sequence
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newResult: ProbeResult = {
        id: `seq_${Date.now()}`,
        type: sequence.includes('corner') ? 'corner' : sequence.includes('hole') ? 'hole' : 'surface',
        position: {
          x: currentPosition.x + (Math.random() - 0.5) * 5,
          y: currentPosition.y + (Math.random() - 0.5) * 5,
          z: currentPosition.z - Math.random() * 10,
        },
        timestamp: new Date(),
        success: Math.random() > 0.1, // 90% success rate for sequences
        error: Math.random() > 0.1 ? undefined : 'Sequence failed',
      };
      
      setProbeResults(prev => [...prev, newResult]);
      setIsProbing(false);
    };

    const handleUpdateSettings = (settings: Partial<ProbeSettings>) => {
      setProbeSettings(prev => ({ ...prev, ...settings }));
    };

    const handleSetZero = (axis?: 'x' | 'y' | 'z') => {
      if (axis) {
        setCurrentPosition(prev => ({ ...prev, [axis]: 0 }));
      } else {
        setCurrentPosition({ x: 0, y: 0, z: 0 });
      }
    };

    const handleRetract = () => {
      setCurrentPosition(prev => ({ ...prev, z: prev.z + probeSettings.safeHeight }));
    };

    const handleGoToPosition = (position: { x: number; y: number; z: number }) => {
      setCurrentPosition(position);
    };

    return (
      <div style={{ width: '800px', height: '800px' }}>
        <ProbeControl
          currentPosition={currentPosition}
          probeSettings={probeSettings}
          probeResults={probeResults}
          isProbing={isProbing}
          onProbe={handleProbe}
          onProbeSequence={handleProbeSequence}
          onUpdateSettings={handleUpdateSettings}
          onSetZero={handleSetZero}
          onRetract={handleRetract}
          onGoToPosition={handleGoToPosition}
        />
      </div>
    );
  },
};

export const WithActiveProbing: Story = {
  render: () => {
    const [currentPosition, setCurrentPosition] = useState({ x: 15.0, y: 25.0, z: 3.0 });
    const [probeSettings, setProbeSettings] = useState<ProbeSettings>(initialProbeSettings);
    const [probeResults, setProbeResults] = useState<ProbeResult[]>(sampleProbeResults);
    const [isProbing, setIsProbing] = useState(true);

    const handleProbe = async (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => {
      console.log('Probing direction:', direction);
    };

    const handleProbeSequence = async (sequence: string) => {
      console.log('Running probe sequence:', sequence);
    };

    const handleUpdateSettings = (settings: Partial<ProbeSettings>) => {
      setProbeSettings(prev => ({ ...prev, ...settings }));
    };

    const handleSetZero = (axis?: 'x' | 'y' | 'z') => {
      if (axis) {
        setCurrentPosition(prev => ({ ...prev, [axis]: 0 }));
      } else {
        setCurrentPosition({ x: 0, y: 0, z: 0 });
      }
    };

    const handleRetract = () => {
      setCurrentPosition(prev => ({ ...prev, z: prev.z + probeSettings.safeHeight }));
    };

    const handleGoToPosition = (position: { x: number; y: number; z: number }) => {
      setCurrentPosition(position);
    };

    return (
      <div style={{ width: '800px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <Target size={16} color="hsl(217, 91%, 60%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(217, 91%, 60%)',
              fontSize: '1rem',
            }}>
              Active Probing
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Probe control in active probing state with disabled controls.
          </p>
        </Card>

        <ProbeControl
          currentPosition={currentPosition}
          probeSettings={probeSettings}
          probeResults={probeResults}
          isProbing={isProbing}
          onProbe={handleProbe}
          onProbeSequence={handleProbeSequence}
          onUpdateSettings={handleUpdateSettings}
          onSetZero={handleSetZero}
          onRetract={handleRetract}
          onGoToPosition={handleGoToPosition}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Probe control during active probing operation with disabled controls.',
      },
    },
  },
};

export const InchUnits: Story = {
  render: () => {
    const [currentPosition, setCurrentPosition] = useState({ x: 0.394, y: 0.787, z: 0.197 });
    const [probeSettings, setProbeSettings] = useState<ProbeSettings>({
      feedRate: 2.0,
      probeDistance: 1.0,
      retractDistance: 0.08,
      repeatCount: 1,
      probeOffset: 0.02,
      safeHeight: 0.4,
    });
    const [probeResults, setProbeResults] = useState<ProbeResult[]>([
      {
        id: '1',
        type: 'surface',
        position: { x: 0.394, y: 0.787, z: -0.206 },
        timestamp: new Date(Date.now() - 120000),
        success: true,
      },
      {
        id: '2',
        type: 'edge',
        position: { x: 1.006, y: 0.787, z: -0.197 },
        timestamp: new Date(Date.now() - 60000),
        success: true,
      },
    ]);
    const [isProbing, setIsProbing] = useState(false);

    const handleProbe = async (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => {
      setIsProbing(true);
      console.log('Probing direction:', direction);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResult: ProbeResult = {
        id: `probe_${Date.now()}`,
        type: 'surface',
        position: {
          x: currentPosition.x + (Math.random() - 0.5) * 0.1,
          y: currentPosition.y + (Math.random() - 0.5) * 0.1,
          z: currentPosition.z - Math.random() * 0.4,
        },
        timestamp: new Date(),
        success: Math.random() > 0.2,
        error: Math.random() > 0.2 ? undefined : 'Probe failed to make contact',
      };
      
      setProbeResults(prev => [...prev, newResult]);
      setIsProbing(false);
    };

    const handleProbeSequence = async (sequence: string) => {
      console.log('Running probe sequence:', sequence);
    };

    const handleUpdateSettings = (settings: Partial<ProbeSettings>) => {
      setProbeSettings(prev => ({ ...prev, ...settings }));
    };

    const handleSetZero = (axis?: 'x' | 'y' | 'z') => {
      if (axis) {
        setCurrentPosition(prev => ({ ...prev, [axis]: 0 }));
      } else {
        setCurrentPosition({ x: 0, y: 0, z: 0 });
      }
    };

    const handleRetract = () => {
      setCurrentPosition(prev => ({ ...prev, z: prev.z + probeSettings.safeHeight }));
    };

    const handleGoToPosition = (position: { x: number; y: number; z: number }) => {
      setCurrentPosition(position);
    };

    return (
      <div style={{ width: '800px' }}>
        <ProbeControl
          currentPosition={currentPosition}
          probeSettings={probeSettings}
          probeResults={probeResults}
          isProbing={isProbing}
          onProbe={handleProbe}
          onProbeSequence={handleProbeSequence}
          onUpdateSettings={handleUpdateSettings}
          onSetZero={handleSetZero}
          onRetract={handleRetract}
          onGoToPosition={handleGoToPosition}
          unit="inch"
          precision={4}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Probe control configured for inch units with higher precision.',
      },
    },
  },
};

export const WithFailedProbes: Story = {
  render: () => {
    const [currentPosition, setCurrentPosition] = useState({ x: 10.0, y: 20.0, z: 5.0 });
    const [probeSettings, setProbeSettings] = useState<ProbeSettings>(initialProbeSettings);
    const [probeResults, setProbeResults] = useState<ProbeResult[]>([
      {
        id: '1',
        type: 'surface',
        position: { x: 10.0, y: 20.0, z: -5.234 },
        timestamp: new Date(Date.now() - 300000),
        success: true,
      },
      {
        id: '2',
        type: 'edge',
        position: { x: 0, y: 0, z: 0 },
        timestamp: new Date(Date.now() - 240000),
        success: false,
        error: 'Probe failed to make contact within maximum distance',
      },
      {
        id: '3',
        type: 'hole',
        position: { x: 0, y: 0, z: 0 },
        timestamp: new Date(Date.now() - 180000),
        success: false,
        error: 'Probe signal interrupted',
      },
      {
        id: '4',
        type: 'corner',
        position: { x: 30.123, y: 30.456, z: -5.0 },
        timestamp: new Date(Date.now() - 120000),
        success: true,
      },
      {
        id: '5',
        type: 'surface',
        position: { x: 0, y: 0, z: 0 },
        timestamp: new Date(Date.now() - 60000),
        success: false,
        error: 'Machine emergency stop during probing',
      },
    ]);
    const [isProbing, setIsProbing] = useState(false);

    const handleProbe = async (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => {
      console.log('Probing direction:', direction);
    };

    const handleProbeSequence = async (sequence: string) => {
      console.log('Running probe sequence:', sequence);
    };

    const handleUpdateSettings = (settings: Partial<ProbeSettings>) => {
      setProbeSettings(prev => ({ ...prev, ...settings }));
    };

    const handleSetZero = (axis?: 'x' | 'y' | 'z') => {
      if (axis) {
        setCurrentPosition(prev => ({ ...prev, [axis]: 0 }));
      } else {
        setCurrentPosition({ x: 0, y: 0, z: 0 });
      }
    };

    const handleRetract = () => {
      setCurrentPosition(prev => ({ ...prev, z: prev.z + probeSettings.safeHeight }));
    };

    const handleGoToPosition = (position: { x: number; y: number; z: number }) => {
      setCurrentPosition(position);
    };

    return (
      <div style={{ width: '800px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <AlertCircle size={16} color="hsl(0, 84.2%, 60.2%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 84.2%, 60.2%)',
              fontSize: '1rem',
            }}>
              Probe Failures
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Demonstrating probe control with failed probe operations and error handling.
          </p>
        </Card>

        <ProbeControl
          currentPosition={currentPosition}
          probeSettings={probeSettings}
          probeResults={probeResults}
          isProbing={isProbing}
          onProbe={handleProbe}
          onProbeSequence={handleProbeSequence}
          onUpdateSettings={handleUpdateSettings}
          onSetZero={handleSetZero}
          onRetract={handleRetract}
          onGoToPosition={handleGoToPosition}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Probe control showing failed probe operations with error messages.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [isProbing, setIsProbing] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleProbe = async (direction: 'z-') => {
      setIsProbing(true);
      console.log('Quick probe Z');
      
      // Simulate probing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProbing(false);
    };

    return (
      <div style={{ width: 'auto' }}>
        <CompactProbeControl
          isProbing={isProbing}
          onProbe={handleProbe}
          onShowDetails={() => setShowDetails(!showDetails)}
        />
        {showDetails && (
          <div style={{ marginTop: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <p style={{ 
                margin: 0, 
                color: 'hsl(240, 5%, 64.9%)',
                fontSize: '0.875rem',
              }}>
                Full probe control interface would open here...
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
        story: 'Compact probe control for quick Z-axis probing in toolbars.',
      },
    },
  },
};

export const SetupWorkflow: Story = {
  render: () => {
    const [currentPosition, setCurrentPosition] = useState({ x: 0.0, y: 0.0, z: 10.0 });
    const [probeSettings, setProbeSettings] = useState<ProbeSettings>(initialProbeSettings);
    const [probeResults, setProbeResults] = useState<ProbeResult[]>([]);
    const [isProbing, setIsProbing] = useState(false);
    const [workflowStep, setWorkflowStep] = useState(0);

    const workflowSteps = [
      'Position probe over workpiece',
      'Probe Z surface',
      'Move to X edge',
      'Probe X edge',
      'Move to Y edge',
      'Probe Y edge',
      'Setup complete'
    ];

    const handleProbe = async (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => {
      setIsProbing(true);
      console.log('Probing direction:', direction);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResult: ProbeResult = {
        id: `probe_${Date.now()}`,
        type: direction.startsWith('z') ? 'surface' : 'edge',
        position: {
          x: currentPosition.x + (Math.random() - 0.5) * 2,
          y: currentPosition.y + (Math.random() - 0.5) * 2,
          z: currentPosition.z - Math.random() * 10,
        },
        timestamp: new Date(),
        success: true,
      };
      
      setProbeResults(prev => [...prev, newResult]);
      setIsProbing(false);
      
      // Advance workflow
      if (workflowStep < workflowSteps.length - 1) {
        setWorkflowStep(prev => prev + 1);
      }
    };

    const handleProbeSequence = async (sequence: string) => {
      console.log('Running probe sequence:', sequence);
    };

    const handleUpdateSettings = (settings: Partial<ProbeSettings>) => {
      setProbeSettings(prev => ({ ...prev, ...settings }));
    };

    const handleSetZero = (axis?: 'x' | 'y' | 'z') => {
      if (axis) {
        setCurrentPosition(prev => ({ ...prev, [axis]: 0 }));
      } else {
        setCurrentPosition({ x: 0, y: 0, z: 0 });
      }
    };

    const handleRetract = () => {
      setCurrentPosition(prev => ({ ...prev, z: prev.z + probeSettings.safeHeight }));
    };

    const handleGoToPosition = (position: { x: number; y: number; z: number }) => {
      setCurrentPosition(position);
    };

    return (
      <div style={{ width: '900px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Setup Workflow
            </h4>
            <Badge variant={workflowStep === workflowSteps.length - 1 ? 'success' : 'default'}>
              Step {workflowStep + 1} of {workflowSteps.length}
            </Badge>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{ 
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: workflowStep === workflowSteps.length - 1 ? 
                'hsl(142, 76%, 36%)' : 'hsl(217, 91%, 60%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {workflowStep === workflowSteps.length - 1 ? (
                <CheckCircle size={16} color="white" />
              ) : (
                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>
                  {workflowStep + 1}
                </span>
              )}
            </div>
            <span style={{ 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '0.875rem',
            }}>
              {workflowSteps[workflowStep]}
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '4px',
            height: '4px',
            backgroundColor: 'hsl(240, 10%, 12%)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            {workflowSteps.map((_, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: index <= workflowStep ? 
                    'hsl(142, 76%, 36%)' : 'hsl(240, 10%, 12%)',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </Card>

        <ProbeControl
          currentPosition={currentPosition}
          probeSettings={probeSettings}
          probeResults={probeResults}
          isProbing={isProbing}
          onProbe={handleProbe}
          onProbeSequence={handleProbeSequence}
          onUpdateSettings={handleUpdateSettings}
          onSetZero={handleSetZero}
          onRetract={handleRetract}
          onGoToPosition={handleGoToPosition}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Probe control integrated into a setup workflow with step-by-step guidance.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    currentPosition: { x: 10.0, y: 20.0, z: 5.0 },
    probeSettings: initialProbeSettings,
    probeResults: sampleProbeResults,
    isProbing: false,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '800px' }}>
      <ProbeControl
        {...args}
        onProbe={() => {}}
        onProbeSequence={() => {}}
        onUpdateSettings={() => {}}
        onSetZero={() => {}}
        onRetract={() => {}}
        onGoToPosition={() => {}}
      />
    </div>
  ),
};