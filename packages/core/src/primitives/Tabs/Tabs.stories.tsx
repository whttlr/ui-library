import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsCompound } from './Tabs';
import { MonospaceText } from '../MonospaceText/MonospaceText';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';
import { FormField } from '../FormField/FormField';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Settings, Code, BarChart3, Wrench, Play, Pause, Square, AlertTriangle, CheckCircle, Monitor } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabs component for organizing content into separate views with multiple styling variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'cnc', 'segmented'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all tabs are disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabsData = [
  {
    value: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)' }}>System Overview</h3>
        <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
          Monitor overall system status and performance metrics.
        </p>
      </div>
    ),
  },
  {
    value: 'settings',
    label: 'Settings',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Configuration</h3>
        <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
          Adjust system settings and preferences.
        </p>
      </div>
    ),
  },
  {
    value: 'logs',
    label: 'Logs',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Activity Logs</h3>
        <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
          View system logs and diagnostic information.
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tabs items={basicTabsData} defaultValue="overview" />
    </div>
  ),
};

export const Pills: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tabs items={basicTabsData} variant="pills" defaultValue="overview" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pills variant with rounded background styling',
      },
    },
  },
};

export const Underline: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tabs items={basicTabsData} variant="underline" defaultValue="overview" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Underline variant with bottom border on active tab',
      },
    },
  },
};

export const CNC: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tabs items={basicTabsData} variant="cnc" defaultValue="overview" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC variant with industrial styling and glowing effects',
      },
    },
  },
};

export const Segmented: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Tabs items={basicTabsData} variant="segmented" defaultValue="overview" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Segmented control style with elevated active state',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const tabsWithIcons = [
      {
        value: 'control',
        label: 'Control',
        icon: <Settings size={16} />,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>Machine Control</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="sm" leftIcon={<Play size={14} />}>Start</Button>
              <Button size="sm" variant="secondary" leftIcon={<Pause size={14} />}>Pause</Button>
              <Button size="sm" variant="outline" leftIcon={<Square size={14} />}>Stop</Button>
            </div>
          </div>
        ),
      },
      {
        value: 'gcode',
        label: 'G-Code',
        icon: <Code size={16} />,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>G-Code Editor</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <MonospaceText variant="gcode">G21 G90 G17</MonospaceText>
              <MonospaceText variant="gcode">G0 X0 Y0 Z5</MonospaceText>
              <MonospaceText variant="gcode">M3 S12000</MonospaceText>
              <MonospaceText variant="gcode">G1 X10 Y10 F1500</MonospaceText>
            </div>
          </div>
        ),
      },
      {
        value: 'analytics',
        label: 'Analytics',
        icon: <BarChart3 size={16} />,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>Performance Analytics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Runtime:</span>
                <MonospaceText variant="numeric" unit="hrs">247.5</MonospaceText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Parts:</span>
                <MonospaceText variant="numeric">1,247</MonospaceText>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '700px'
      }}>
        <Tabs items={tabsWithIcons} variant="pills" defaultValue="control" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with icons for enhanced visual recognition',
      },
    },
  },
};

export const WithBadges: Story = {
  render: () => {
    const tabsWithBadges = [
      {
        value: 'active',
        label: 'Active Jobs',
        badge: 3,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>Active Jobs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'hsl(0, 0%, 98%)' }}>Part_A_v2.nc</span>
                <StatusIndicator status="running" variant="pill" size="sm" pulse />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'hsl(0, 0%, 98%)' }}>Housing_v1.nc</span>
                <StatusIndicator status="idle" variant="pill" size="sm" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'hsl(0, 0%, 98%)' }}>Bracket_final.nc</span>
                <StatusIndicator status="idle" variant="pill" size="sm" />
              </div>
            </div>
          </div>
        ),
      },
      {
        value: 'completed',
        label: 'Completed',
        badge: 12,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>Completed Jobs</h3>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
              View completed manufacturing jobs and quality reports.
            </p>
          </div>
        ),
      },
      {
        value: 'errors',
        label: 'Errors',
        badge: 2,
        content: (
          <div style={{ padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)' }}>Error Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} style={{ color: 'hsl(0, 84.2%, 60.2%)' }} />
                <span style={{ color: 'hsl(0, 0%, 98%)' }}>Coolant level critical</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} style={{ color: 'hsl(38, 92%, 50%)' }} />
                <span style={{ color: 'hsl(0, 0%, 98%)' }}>Tool wear detected</span>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Tabs items={tabsWithBadges} variant="underline" defaultValue="active" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with badge indicators showing counts or notifications',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Small</h4>
          <Tabs items={basicTabsData} variant="pills" size="sm" defaultValue="overview" />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Default</h4>
          <Tabs items={basicTabsData} variant="pills" size="default" defaultValue="overview" />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Large</h4>
          <Tabs items={basicTabsData} variant="pills" size="lg" defaultValue="overview" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes for different UI contexts',
      },
    },
  },
};

export const VerticalOrientation: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px',
      height: '400px'
    }}>
      <Tabs 
        items={basicTabsData} 
        variant="default" 
        orientation="vertical" 
        defaultValue="overview" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical tab layout for sidebar-style navigation',
      },
    },
  },
};

export const CNCMachineInterface: Story = {
  render: () => {
    const [feedRate, setFeedRate] = useState(1500);
    const [spindleSpeed, setSpindleSpeed] = useState(12000);

    const cncTabs = [
      {
        value: 'control',
        label: 'Control',
        icon: <Settings size={18} />,
        content: (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Machine Control</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
                  Operating Parameters
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <FormField label="Feed Rate" layout="horizontal" labelWidth="100px">
                    <Input 
                      variant="number" 
                      value={feedRate}
                      onChange={(e) => setFeedRate(parseInt(e.target.value) || 0)}
                      rightAddon="mm/min"
                    />
                  </FormField>
                  
                  <FormField label="Spindle" layout="horizontal" labelWidth="100px">
                    <Input 
                      variant="number" 
                      value={spindleSpeed}
                      onChange={(e) => setSpindleSpeed(parseInt(e.target.value) || 0)}
                      rightAddon="RPM"
                    />
                  </FormField>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
                  Machine Status
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Connection:</span>
                    <StatusIndicator status="online" variant="pill" size="sm" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Operation:</span>
                    <StatusIndicator status="running" variant="pill" size="sm" pulse />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Safety:</span>
                    <StatusIndicator status="success" variant="pill" size="sm" />
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <Button leftIcon={<Play size={16} />}>Start Job</Button>
              <Button variant="secondary" leftIcon={<Pause size={16} />}>Pause</Button>
              <Button variant="outline" leftIcon={<Square size={16} />}>Stop</Button>
            </div>
          </div>
        ),
      },
      {
        value: 'position',
        label: 'Position',
        icon: <Monitor size={18} />,
        content: (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Machine Position</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* X Axis */}
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
                <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm">
                  125.750
                </MonospaceText>
              </div>
              
              {/* Y Axis */}
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
                <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm">
                  -45.120
                </MonospaceText>
              </div>
              
              {/* Z Axis */}
              <div style={{ 
                padding: '1rem',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                borderRadius: '0.5rem',
                border: '1px solid hsl(240, 3.7%, 25%)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Z Axis
                </div>
                <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm" highlight>
                  2.000
                </MonospaceText>
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)'
            }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>
                Current Command
              </h4>
              <MonospaceText variant="gcode">G1 X125.75 Y-45.12 Z2.0 F1500</MonospaceText>
            </div>
          </div>
        ),
      },
      {
        value: 'diagnostics',
        label: 'Diagnostics',
        icon: <Wrench size={18} />,
        badge: 1,
        content: (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'hsl(0, 0%, 98%)' }}>System Diagnostics</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                padding: '1rem',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                borderRadius: '0.5rem',
                border: '1px solid hsl(240, 3.7%, 25%)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontWeight: 500 }}>System Health</span>
                  <StatusIndicator status="warning" variant="badge" size="sm" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>CPU Temperature:</span>
                    <MonospaceText variant="numeric" precision={1} unit="°C">68.5</MonospaceText>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Coolant Level:</span>
                    <MonospaceText variant="numeric" unit="%">25</MonospaceText>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Runtime:</span>
                    <MonospaceText variant="numeric" precision={1} unit="hrs">247.5</MonospaceText>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                padding: '1rem',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                borderRadius: '0.5rem',
                border: '1px solid hsl(240, 3.7%, 25%)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontWeight: 500 }}>Recent Alerts</span>
                  <StatusIndicator status="warning" variant="dot" size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={16} style={{ color: 'hsl(38, 92%, 50%)' }} />
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>
                    Coolant level below threshold (25%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)', 
          fontSize: '1.5rem',
          fontWeight: 600
        }}>
          CNC Machine Interface
        </h3>
        
        <Tabs items={cncTabs} variant="cnc" defaultValue="control" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC machine interface showcasing tabs with complex content, icons, and badges',
      },
    },
  },
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Button 
            size="sm" 
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Go to Overview
          </Button>
          <Button 
            size="sm" 
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('settings')}
          >
            Go to Settings
          </Button>
        </div>
        
        <Tabs 
          items={basicTabsData} 
          variant="pills" 
          value={activeTab}
          onValueChange={setActiveTab}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled tabs with external state management',
      },
    },
  },
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Before (Custom Implementation)</h4>
          <div style={{ 
            display: 'flex',
            gap: '0.25rem',
            marginBottom: '1rem',
            padding: '0.25rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '0.5rem'
          }}>
            <button style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'hsl(0, 0%, 98%)',
              color: 'hsl(240, 10%, 3.9%)',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              Overview
            </button>
            <button style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'transparent',
              color: 'hsl(240, 5%, 64.9%)',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              Settings
            </button>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '0.5rem' }}>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
              Custom tab implementation with lots of repeated styling code.
            </p>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>After (Tabs Component)</h4>
          <Tabs 
            items={[
              {
                value: 'overview',
                label: 'Overview',
                content: (
                  <div style={{ padding: '1rem' }}>
                    <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
                      Clean, reusable Tabs component with consistent styling.
                    </p>
                  </div>
                ),
              },
              {
                value: 'settings',
                label: 'Settings',
                content: (
                  <div style={{ padding: '1rem' }}>
                    <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
                      Easy to configure and maintain.
                    </p>
                  </div>
                ),
              },
            ]} 
            variant="pills" 
            defaultValue="overview"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the Tabs component vs custom implementation',
      },
    },
  },
};