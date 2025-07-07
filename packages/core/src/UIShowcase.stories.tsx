import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './primitives/Button/Button';
import { Card } from './primitives/Card/Card';
import { Badge, StatusBadge } from './primitives/Badge/Badge';
import { Alert, AlertTitle, AlertDescription } from './primitives/Alert/Alert';
import { Progress, CircularProgress } from './primitives/Progress/Progress';
import { 
  Settings, Activity, Zap, Target, Play, Pause, Power, 
  Wifi, WifiOff, CheckCircle, AlertTriangle, XCircle,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home,
  Users, FileText, Info, Bell, Clock
} from 'lucide-react';

const meta: Meta = {
  title: 'Examples/UI Component Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete showcase of all UI components matching the original UIDemoView implementation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Complete UI Showcase matching original UIDemoView
export const CompleteShowcase: Story = {
  render: () => {
    const [isConnected, setIsConnected] = useState(true);
    const [machineStatus, setMachineStatus] = useState<'idle' | 'running' | 'error'>('idle');
    const [position, setPosition] = useState({ x: 125.45, y: 67.23, z: -10.5 });
    const [emergencyStop, setEmergencyStop] = useState(false);
    const [progressValues, setProgressValues] = useState({
      jobProgress: 65,
      spindle: 80,
      feed: 45,
      coolant: 90
    });

    const handleJog = (axis: 'x' | 'y' | 'z', direction: number) => {
      setPosition(prev => ({
        ...prev,
        [axis]: prev[axis] + (direction * 1)
      }));
    };

    return (
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: 'hsl(240, 10%, 3.9%)', 
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{ 
            marginBottom: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1.5rem',
            backgroundColor: 'hsl(240, 10%, 8%)',
            borderRadius: '8px',
            border: '1px solid hsl(240, 3.7%, 15.9%)'
          }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                UI Component Showcase
              </h1>
              <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
                Complete CNC control interface components
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StatusBadge status={isConnected ? 'connected' : 'disconnected'} />
              <StatusBadge status={machineStatus} />
              <Badge variant="success">v2.0</Badge>
            </div>
          </div>

          {/* Emergency Alert */}
          {emergencyStop && (
            <div style={{ marginBottom: '1.5rem' }}>
              <Alert variant="destructive">
                <AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />
                <AlertTitle>EMERGENCY STOP ACTIVATED</AlertTitle>
                <AlertDescription>
                  All machine operations have been halted for safety. Clear the workspace and reset to continue.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* Button Variants */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Buttons</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button variant="cnc">CNC</Button>
                  <Button variant="emergency">Emergency</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
            </Card>

            {/* Badge Variants */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Badges & Status</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Filled Badges</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Status Badges</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <StatusBadge status="connected" />
                    <StatusBadge status="running" />
                    <StatusBadge status="idle" />
                    <StatusBadge status="error" />
                    <StatusBadge status="warning" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Machine Controls */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Machine Controls</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <Button 
                    variant="success" 
                    disabled={!isConnected || emergencyStop || machineStatus === 'running'}
                    onClick={() => setMachineStatus('running')}
                  >
                    <Play style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Start
                  </Button>
                  <Button 
                    variant="warning"
                    disabled={!isConnected || emergencyStop || machineStatus !== 'running'}
                    onClick={() => setMachineStatus('idle')}
                  >
                    <Pause style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Pause
                  </Button>
                  <Button 
                    variant="emergency"
                    onClick={() => {
                      setEmergencyStop(true);
                      setMachineStatus('error');
                    }}
                  >
                    <Power style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    E-Stop
                  </Button>
                </div>

                {/* JOG Controls */}
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Jog Controls</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', maxWidth: '150px' }}>
                    <div></div>
                    <Button 
                      variant="cnc" 
                      size="sm"
                      disabled={!isConnected || emergencyStop}
                      onClick={() => handleJog('y', 1)}
                    >
                      <ArrowUp style={{ width: '0.875rem', height: '0.875rem' }} />
                    </Button>
                    <div></div>
                    
                    <Button 
                      variant="cnc" 
                      size="sm"
                      disabled={!isConnected || emergencyStop}
                      onClick={() => handleJog('x', -1)}
                    >
                      <ArrowLeft style={{ width: '0.875rem', height: '0.875rem' }} />
                    </Button>
                    <Button variant="cnc" size="sm">
                      <Home style={{ width: '0.875rem', height: '0.875rem' }} />
                    </Button>
                    <Button 
                      variant="cnc" 
                      size="sm"
                      disabled={!isConnected || emergencyStop}
                      onClick={() => handleJog('x', 1)}
                    >
                      <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
                    </Button>
                    
                    <div></div>
                    <Button 
                      variant="cnc" 
                      size="sm"
                      disabled={!isConnected || emergencyStop}
                      onClick={() => handleJog('y', -1)}
                    >
                      <ArrowDown style={{ width: '0.875rem', height: '0.875rem' }} />
                    </Button>
                    <div></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Position Display */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Current Position</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {['X', 'Y', 'Z'].map((axis, index) => (
                  <div 
                    key={axis}
                    style={{ 
                      textAlign: 'center', 
                      padding: '0.75rem',
                      backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                      borderRadius: '6px'
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.25rem' }}>
                      {axis} Axis
                    </div>
                    <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
                      {Object.values(position)[index].toFixed(3)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>mm</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Progress Indicators */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Progress Indicators</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.5rem', display: 'block' }}>
                    Job Progress
                  </label>
                  <Progress value={progressValues.jobProgress} variant="success" />
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.5rem', display: 'block' }}>
                    Spindle Load
                  </label>
                  <Progress value={progressValues.spindle} variant="warning" />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress value={progressValues.feed} variant="info" size={80} />
                    <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)', marginTop: '0.5rem' }}>
                      Feed Rate
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress value={progressValues.coolant} variant="success" size={80} />
                    <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)', marginTop: '0.5rem' }}>
                      Coolant
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alerts */}
            <Card style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Alerts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Alert variant="info">
                  <Info style={{ width: '1rem', height: '1rem' }} />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>Machine is ready for operation.</AlertDescription>
                </Alert>
                
                <Alert variant="success">
                  <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Job completed successfully.</AlertDescription>
                </Alert>
                
                <Alert variant="warning">
                  <AlertTriangle style={{ width: '1rem', height: '1rem' }} />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Tool life is approaching limit.</AlertDescription>
                </Alert>
              </div>
            </Card>

          </div>

          {/* Reset Emergency Stop Button */}
          {emergencyStop && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => {
                  setEmergencyStop(false);
                  setMachineStatus('idle');
                }}
              >
                Reset Emergency Stop
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete showcase of all UI components matching the original UIDemoView implementation:

- **Buttons**: All variants including CNC-specific and emergency styles
- **Badges**: Status indicators with proper coloring and animations  
- **Machine Controls**: Start/stop controls with proper state management
- **Jog Controls**: Directional movement controls in cross pattern
- **Position Display**: Real-time coordinate tracking with precision
- **Progress Indicators**: Linear and circular progress with variants
- **Alerts**: Success/warning/error notifications with icons
- **Emergency Stop**: Safety controls with proper visual feedback

All components use the exact styling and behavior from the original electron app.
        `,
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [currentDemo, setCurrentDemo] = useState('buttons');
    
    const demos = {
      buttons: 'Button Variants',
      badges: 'Badge System', 
      controls: 'Machine Controls',
      progress: 'Progress Indicators',
      alerts: 'Alert System'
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>
            Interactive Component Demo
          </h1>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {Object.entries(demos).map(([key, label]) => (
              <Button
                key={key}
                variant={currentDemo === key ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setCurrentDemo(key)}
              >
                {label}
              </Button>
            ))}
          </div>

          <Card style={{ padding: '1.5rem' }}>
            {currentDemo === 'buttons' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Button Variants</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="cnc">CNC</Button>
                    <Button variant="emergency">Emergency</Button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>
            )}
            
            {currentDemo === 'badges' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Badge System</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge variant="success">Online</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <StatusBadge status="connected" />
                    <StatusBadge status="running" />
                    <StatusBadge status="idle" />
                  </div>
                </div>
              </div>
            )}

            {currentDemo === 'controls' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Machine Controls</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Basic Machine Controls */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                      Machine Operations
                    </h3>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Button variant="success">
                        <Play style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Start
                      </Button>
                      <Button variant="warning">
                        <Pause style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Pause
                      </Button>
                      <Button variant="destructive">
                        <Power style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Stop
                      </Button>
                      <Button variant="emergency">
                        Emergency Stop
                      </Button>
                    </div>
                  </div>

                  {/* Jog Controls */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                      Manual Positioning
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', maxWidth: '200px' }}>
                      <div></div>
                      <Button variant="secondary" size="sm">
                        <ArrowUp style={{ width: '1rem', height: '1rem' }} />
                      </Button>
                      <div></div>
                      <Button variant="secondary" size="sm">
                        <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Home style={{ width: '1rem', height: '1rem' }} />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                      </Button>
                      <div></div>
                      <Button variant="secondary" size="sm">
                        <ArrowDown style={{ width: '1rem', height: '1rem' }} />
                      </Button>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentDemo === 'progress' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Progress Indicators</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Linear Progress */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                      Linear Progress
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem' }}>Job Progress</span>
                          <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>65%</span>
                        </div>
                        <Progress value={65} variant="primary" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem' }}>Spindle Load</span>
                          <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>80%</span>
                        </div>
                        <Progress value={80} variant="success" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem' }}>Coolant Level</span>
                          <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>25%</span>
                        </div>
                        <Progress value={25} variant="warning" />
                      </div>
                    </div>
                  </div>

                  {/* Circular Progress */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                      Circular Progress
                    </h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'center' }}>
                        <CircularProgress value={75} size="lg" />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                          Operation
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <CircularProgress value={45} size="lg" variant="warning" />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                          Buffer
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <CircularProgress value={90} size="lg" variant="success" />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                          Quality
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentDemo === 'alerts' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Alert System</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Alert variant="info">
                    <Info style={{ width: '1.25rem', height: '1.25rem' }} />
                    <AlertTitle>System Information</AlertTitle>
                    <AlertDescription>
                      Machine diagnostics completed successfully. All systems operational.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                    <AlertTitle>Operation Complete</AlertTitle>
                    <AlertDescription>
                      Job #1247 has been completed successfully. Quality check passed.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="warning">
                    <AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />
                    <AlertTitle>Low Coolant Level</AlertTitle>
                    <AlertDescription>
                      Coolant level is below 30%. Consider refilling before next operation.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <XCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                    <AlertTitle>Critical Error</AlertTitle>
                    <AlertDescription>
                      Spindle motor temperature exceeded safe limits. Machine stopped for protection.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  },
};