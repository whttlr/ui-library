import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AlarmDisplay, CompactAlarmDisplay, type Alarm } from './AlarmDisplay';
import { Card, Button, Badge } from '@whttlr/ui-core';
import { AlertTriangle, Plus, RefreshCw } from 'lucide-react';

const meta: Meta<typeof AlarmDisplay> = {
  title: 'CNC/Controls/AlarmDisplay',
  component: AlarmDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive alarm display component for CNC machine alerts, warnings, and system notifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showFilters: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample alarm data
const sampleAlarms: Alarm[] = [
  {
    id: '1',
    code: 'E001',
    type: 'critical',
    message: 'Emergency stop activated',
    description: 'The emergency stop button has been pressed. All motion has been halted immediately. Check the machine area for any issues before resetting.',
    timestamp: new Date(Date.now() - 5000),
    acknowledged: false,
    source: 'Safety System',
    category: 'safety',
    severity: 'critical',
  },
  {
    id: '2',
    code: 'W015',
    type: 'warning',
    message: 'Spindle temperature high',
    description: 'Spindle temperature is approaching the maximum safe operating temperature. Consider reducing spindle speed or checking coolant flow.',
    timestamp: new Date(Date.now() - 30000),
    acknowledged: false,
    source: 'Spindle Controller',
    category: 'spindle',
    severity: 'medium',
  },
  {
    id: '3',
    code: 'E021',
    type: 'error',
    message: 'Axis X servo fault',
    description: 'The X-axis servo motor has reported a fault condition. This may be due to excessive load, wiring issues, or servo drive problems.',
    timestamp: new Date(Date.now() - 45000),
    acknowledged: true,
    source: 'Motion Controller',
    category: 'motion',
    severity: 'high',
  },
  {
    id: '4',
    code: 'I005',
    type: 'info',
    message: 'Tool change completed',
    description: 'Automatic tool change from T1 to T2 has been completed successfully. Tool offset has been applied.',
    timestamp: new Date(Date.now() - 60000),
    acknowledged: false,
    source: 'Tool Changer',
    category: 'tool',
    severity: 'low',
  },
  {
    id: '5',
    code: 'W032',
    type: 'warning',
    message: 'Low coolant level',
    description: 'Coolant tank level is below the minimum threshold. Refill the coolant tank to prevent pump damage and ensure proper cutting conditions.',
    timestamp: new Date(Date.now() - 120000),
    acknowledged: false,
    source: 'Coolant System',
    category: 'coolant',
    severity: 'medium',
  },
  {
    id: '6',
    code: 'E045',
    type: 'error',
    message: 'G-code syntax error on line 23',
    description: 'Invalid G-code command detected on line 23: \"G01 X Y10 Z5\". Missing X coordinate value. Please check the program and correct the syntax error.',
    timestamp: new Date(Date.now() - 180000),
    acknowledged: false,
    source: 'Program Parser',
    category: 'program',
    severity: 'high',
  },
];

export const Default: Story = {
  render: () => {
    const [alarms, setAlarms] = useState<Alarm[]>(sampleAlarms);

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleAcknowledgeAll = () => {
      setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    const handleClearAll = () => {
      setAlarms([]);
    };

    return (
      <div style={{ width: '800px', height: '600px' }}>
        <AlarmDisplay
          alarms={alarms}
          onAcknowledge={handleAcknowledge}
          onAcknowledgeAll={handleAcknowledgeAll}
          onClear={handleClear}
          onClearAll={handleClearAll}
          onSettings={() => console.log('Open alarm settings')}
        />
      </div>
    );
  },
};

export const NoAlarms: Story = {
  render: () => (
    <div style={{ width: '800px', height: '400px' }}>
      <AlarmDisplay
        alarms={[]}
        onAcknowledge={() => {}}
        onAcknowledgeAll={() => {}}
        onClear={() => {}}
        onClearAll={() => {}}
        onSettings={() => console.log('Open alarm settings')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alarm display when no alarms are active, showing the all-clear state.',
      },
    },
  },
};

export const CriticalAlarmsOnly: Story = {
  render: () => {
    const criticalAlarms = sampleAlarms.filter(alarm => alarm.type === 'critical');
    const [alarms, setAlarms] = useState<Alarm[]>(criticalAlarms);

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    return (
      <div style={{ width: '800px', height: '400px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <AlertTriangle size={16} color="hsl(0, 84.2%, 60.2%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 84.2%, 60.2%)',
              fontSize: '1rem',
            }}>
              Critical Alarms Active
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Only critical alarms are displayed for immediate attention.
          </p>
        </Card>

        <AlarmDisplay
          alarms={alarms}
          onAcknowledge={handleAcknowledge}
          onAcknowledgeAll={() => setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })))}
          onClear={handleClear}
          onClearAll={() => setAlarms([])}
          maxHeight="300px"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alarm display showing only critical alarms that require immediate attention.',
      },
    },
  },
};

export const WithFiltering: Story = {
  render: () => {
    const extendedAlarms = [
      ...sampleAlarms,
      {
        id: '7',
        code: 'W051',
        type: 'warning' as const,
        message: 'Tool wear detected',
        description: 'Tool T1 is showing signs of wear. Consider replacing the tool to maintain part quality.',
        timestamp: new Date(Date.now() - 240000),
        acknowledged: false,
        source: 'Tool Monitor',
        category: 'tool' as const,
        severity: 'medium' as const,
      },
      {
        id: '8',
        code: 'I012',
        type: 'info' as const,
        message: 'Scheduled maintenance reminder',
        description: 'Machine is due for scheduled maintenance in 50 operating hours. Plan maintenance during next available downtime.',
        timestamp: new Date(Date.now() - 300000),
        acknowledged: true,
        source: 'Maintenance System',
        category: 'system' as const,
        severity: 'low' as const,
      },
    ];

    const [alarms, setAlarms] = useState<Alarm[]>(extendedAlarms);

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    return (
      <div style={{ width: '900px', height: '700px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <h4 style={{ 
            margin: '0 0 0.5rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1rem',
          }}>
            Alarm Filtering Demo
          </h4>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Use the filter controls to show specific alarm types or categories.
          </p>
        </Card>

        <AlarmDisplay
          alarms={alarms}
          onAcknowledge={handleAcknowledge}
          onAcknowledgeAll={() => setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })))}
          onClear={handleClear}
          onClearAll={() => setAlarms([])}
          onSettings={() => console.log('Open alarm settings')}
          showFilters={true}
          maxHeight="500px"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alarm display with filtering controls to show specific alarm types and categories.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [showDetails, setShowDetails] = useState(false);
    const [alarms, setAlarms] = useState<Alarm[]>(sampleAlarms);

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    return (
      <div style={{ width: 'auto' }}>
        <CompactAlarmDisplay
          alarms={alarms}
          onShowDetails={() => setShowDetails(!showDetails)}
        />
        {showDetails && (
          <div style={{ marginTop: '1rem' }}>
            <AlarmDisplay
              alarms={alarms}
              onAcknowledge={handleAcknowledge}
              onAcknowledgeAll={() => setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })))}
              onClear={handleClear}
              onClearAll={() => setAlarms([])}
              maxHeight="400px"
              showFilters={false}
            />
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact alarm display suitable for status bars with expandable details.',
      },
    },
  },
};

export const RealTimeSimulation: Story = {
  render: () => {
    const [alarms, setAlarms] = useState<Alarm[]>(sampleAlarms.slice(0, 2));
    const [alarmCounter, setAlarmCounter] = useState(10);

    const addRandomAlarm = () => {
      const types: Alarm['type'][] = ['info', 'warning', 'error'];
      const categories: Alarm['category'][] = ['safety', 'motion', 'spindle', 'coolant', 'tool', 'program', 'system'];
      const messages = [
        'Coolant flow rate low',
        'Spindle vibration detected',
        'Tool change timeout',
        'Axis limit reached',
        'Program paused by operator',
        'Temperature sensor fault',
        'Network connection lost',
        'Backup completed successfully',
      ];

      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      const newAlarm: Alarm = {
        id: `sim_${alarmCounter}`,
        code: `${randomType.charAt(0).toUpperCase()}${String(alarmCounter).padStart(3, '0')}`,
        type: randomType,
        message: randomMessage,
        description: `Simulated alarm for demonstration purposes. This is alarm number ${alarmCounter}.`,
        timestamp: new Date(),
        acknowledged: false,
        source: 'Simulation',
        category: randomCategory,
        severity: 'medium',
      };

      setAlarms(prev => [newAlarm, ...prev]);
      setAlarmCounter(prev => prev + 1);
    };

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    return (
      <div style={{ width: '850px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}>
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Real-Time Alarm Simulation
            </h4>
            <Button
              variant="outline-default"
              size="sm"
              onClick={addRandomAlarm}
              leftIcon={<Plus size={16} />}
            >
              Add Random Alarm
            </Button>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Simulate real-time alarm generation and management.
          </p>
        </Card>

        <AlarmDisplay
          alarms={alarms}
          onAcknowledge={handleAcknowledge}
          onAcknowledgeAll={() => setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })))}
          onClear={handleClear}
          onClearAll={() => setAlarms([])}
          onSettings={() => console.log('Open alarm settings')}
          maxHeight="500px"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time alarm simulation showing dynamic alarm generation and management.',
      },
    },
  },
};

export const AlarmDashboard: Story = {
  render: () => {
    const [alarms, setAlarms] = useState<Alarm[]>(sampleAlarms);
    const [showCompact, setShowCompact] = useState(true);

    const handleAcknowledge = (alarmId: string) => {
      setAlarms(prev => prev.map(alarm => 
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      ));
    };

    const handleClear = (alarmId: string) => {
      setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
    };

    // Calculate alarm statistics
    const stats = {
      total: alarms.length,
      unacknowledged: alarms.filter(a => !a.acknowledged).length,
      critical: alarms.filter(a => a.type === 'critical' && !a.acknowledged).length,
      error: alarms.filter(a => a.type === 'error' && !a.acknowledged).length,
      warning: alarms.filter(a => a.type === 'warning' && !a.acknowledged).length,
      info: alarms.filter(a => a.type === 'info' && !a.acknowledged).length,
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Machine Alarm Dashboard
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Alarm Statistics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Alarm Statistics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Total Alarms:</span>
                  <Badge variant="secondary">{stats.total}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Unacknowledged:</span>
                  <Badge variant="warning">{stats.unacknowledged}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Critical:</span>
                  <Badge variant="destructive">{stats.critical}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Errors:</span>
                  <Badge variant="destructive">{stats.error}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Warnings:</span>
                  <Badge variant="warning">{stats.warning}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Info:</span>
                  <Badge variant="secondary">{stats.info}</Badge>
                </div>
              </div>
            </Card>

            {/* Compact View */}
            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Status Overview
              </h4>
              <CompactAlarmDisplay
                alarms={alarms}
                onShowDetails={() => setShowCompact(!showCompact)}
              />
            </Card>
          </div>

          {/* Detailed Alarm List */}
          <AlarmDisplay
            alarms={alarms}
            onAcknowledge={handleAcknowledge}
            onAcknowledgeAll={() => setAlarms(prev => prev.map(alarm => ({ ...alarm, acknowledged: true })))}
            onClear={handleClear}
            onClearAll={() => setAlarms([])}
            onSettings={() => console.log('Open alarm settings')}
            maxHeight="600px"
            showFilters={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete alarm dashboard with statistics and detailed alarm management.',
      },
    },
  },
};

export const NoFilters: Story = {
  render: () => (
    <div style={{ width: '700px', height: '500px' }}>
      <AlarmDisplay
        alarms={sampleAlarms}
        onAcknowledge={() => {}}
        onAcknowledgeAll={() => {}}
        onClear={() => {}}
        onClearAll={() => {}}
        showFilters={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alarm display without filter controls for simplified interface.',
      },
    },
  },
};