import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { FormField } from '../FormField/FormField';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';
import { Button } from '../Button/Button';
import { Settings, Wifi, WifiOff, Monitor, Wrench, Code, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component for choosing from a list of options with enhanced styling and functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'cnc', 'minimal'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the select is searchable',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the select can be cleared',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const machineOptions = [
  { 
    value: 'haas-vf3', 
    label: 'Haas VF-3', 
    description: '3-axis vertical machining center',
    icon: <Settings size={16} />
  },
  { 
    value: 'fanuc-robodrill', 
    label: 'Fanuc Robodrill', 
    description: 'High-speed compact machining center',
    icon: <Settings size={16} />
  },
  { 
    value: 'okuma-genos', 
    label: 'Okuma Genos L200', 
    description: 'CNC turning center',
    icon: <Settings size={16} />
  },
  { 
    value: 'dmg-mori', 
    label: 'DMG Mori NTX2000', 
    description: 'Multi-tasking machine',
    icon: <Settings size={16} />
  },
];

const connectionOptions = [
  { 
    value: 'ethernet', 
    label: 'Ethernet Connection', 
    icon: <Wifi size={16} />,
    description: 'High-speed wired connection'
  },
  { 
    value: 'wifi', 
    label: 'WiFi Connection', 
    icon: <Wifi size={16} />,
    description: 'Wireless network connection'
  },
  { 
    value: 'usb', 
    label: 'USB Connection', 
    icon: <Monitor size={16} />,
    description: 'Direct USB cable connection'
  },
  { 
    value: 'serial', 
    label: 'Serial Connection', 
    icon: <WifiOff size={16} />,
    description: 'RS-232 serial port connection'
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={basicOptions}
        placeholder="Choose a fruit..."
        defaultValue="apple"
      />
    </div>
  ),
};

export const CNCVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={machineOptions}
        variant="cnc"
        placeholder="Select CNC Machine..."
        defaultValue="haas-vf3"
      />
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

export const MinimalVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={basicOptions}
        variant="minimal"
        placeholder="Choose an option..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant with clean underline styling',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={connectionOptions}
        placeholder="Select connection type..."
        defaultValue="ethernet"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with icons and descriptions',
      },
    },
  },
};

export const Searchable: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={machineOptions}
        searchable
        placeholder="Search for a machine..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Searchable select with filter functionality',
      },
    },
  },
};

export const Clearable: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={basicOptions}
        clearable
        placeholder="Choose a fruit..."
        defaultValue="banana"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Clearable select with clear button',
      },
    },
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={connectionOptions}
        multiple
        clearable
        placeholder="Select connection types..."
        defaultValue="ethernet"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection with checkboxes',
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
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ 
            display: 'block', 
            color: 'hsl(0, 0%, 98%)', 
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            Small
          </label>
          <Select 
            options={basicOptions}
            size="sm"
            placeholder="Small select..."
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            color: 'hsl(0, 0%, 98%)', 
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            Default
          </label>
          <Select 
            options={basicOptions}
            size="default"
            placeholder="Default select..."
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            color: 'hsl(0, 0%, 98%)', 
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            Large
          </label>
          <Select 
            options={basicOptions}
            size="lg"
            placeholder="Large select..."
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes for different contexts',
      },
    },
  },
};

export const WithError: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={basicOptions}
        error="Please select a valid option"
        placeholder="Choose a fruit..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select with error state and message',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Select 
        options={basicOptions}
        disabled
        value="apple"
        placeholder="Disabled select..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled select state',
      },
    },
  },
};

export const CNCMachineSetup: Story = {
  render: () => {
    const [machine, setMachine] = useState('');
    const [connection, setConnection] = useState('');
    const [workOffset, setWorkOffset] = useState('');
    const [tools, setTools] = useState<(string | number)[]>([]);

    const workOffsetOptions = [
      { value: 'G54', label: 'G54 - Work Coordinate 1' },
      { value: 'G55', label: 'G55 - Work Coordinate 2' },
      { value: 'G56', label: 'G56 - Work Coordinate 3' },
      { value: 'G57', label: 'G57 - Work Coordinate 4' },
      { value: 'G58', label: 'G58 - Work Coordinate 5' },
      { value: 'G59', label: 'G59 - Work Coordinate 6' },
    ];

    const toolOptions = [
      { value: 'end-mill-6mm', label: '6mm End Mill', icon: <Wrench size={16} /> },
      { value: 'drill-5mm', label: '5mm Drill', icon: <Wrench size={16} /> },
      { value: 'face-mill-20mm', label: '20mm Face Mill', icon: <Wrench size={16} /> },
      { value: 'tap-m6', label: 'M6 Tap', icon: <Wrench size={16} /> },
      { value: 'reamer-8mm', label: '8mm Reamer', icon: <Wrench size={16} /> },
      { value: 'boring-bar', label: 'Boring Bar', icon: <Wrench size={16} /> },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)', 
          fontSize: '1.25rem',
          fontWeight: 600
        }}>
          CNC Machine Setup
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FormField
            label="CNC Machine"
            helpText="Select the machine for this job"
            required
          >
            <Select 
              options={machineOptions}
              variant="cnc"
              value={machine}
              onValueChange={setMachine}
              placeholder="Select CNC machine..."
              searchable
            />
          </FormField>

          <FormField
            label="Connection Type"
            helpText="How will you connect to the machine?"
            required
          >
            <Select 
              options={connectionOptions}
              value={connection}
              onValueChange={setConnection}
              placeholder="Select connection type..."
            />
          </FormField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormField
              label="Work Offset"
              helpText="Coordinate system"
              required
            >
              <Select 
                options={workOffsetOptions}
                variant="cnc"
                size="sm"
                value={workOffset}
                onValueChange={setWorkOffset}
                placeholder="Select offset..."
              />
            </FormField>

            <FormField
              label="Tools Required"
              helpText="Select multiple tools"
            >
              <Select 
                options={toolOptions}
                multiple
                clearable
                size="sm"
                value={tools}
                onValueChange={setTools}
                placeholder="Select tools..."
              />
            </FormField>
          </div>

          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {machine && connection && workOffset ? (
                <>
                  <StatusIndicator status="success" variant="dot" size="sm" />
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>
                    Configuration Valid
                  </span>
                </>
              ) : (
                <>
                  <StatusIndicator status="warning" variant="dot" size="sm" />
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                    Incomplete Configuration
                  </span>
                </>
              )}
            </div>
            <Button 
              disabled={!machine || !connection || !workOffset}
              size="sm"
            >
              Apply Setup
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC machine setup form using Select components',
      },
    },
  },
};

export const StatusSelection: Story = {
  render: () => {
    const [status, setStatus] = useState('');

    const statusOptions = [
      { 
        value: 'online', 
        label: 'Online', 
        icon: <StatusIndicator status="online" variant="dot" size="sm" />,
        description: 'Machine is connected and operational'
      },
      { 
        value: 'offline', 
        label: 'Offline', 
        icon: <StatusIndicator status="offline" variant="dot" size="sm" />,
        description: 'Machine is disconnected'
      },
      { 
        value: 'running', 
        label: 'Running', 
        icon: <StatusIndicator status="running" variant="dot" size="sm" />,
        description: 'Machine is actively processing'
      },
      { 
        value: 'paused', 
        label: 'Paused', 
        icon: <StatusIndicator status="paused" variant="dot" size="sm" />,
        description: 'Operation temporarily halted'
      },
      { 
        value: 'error', 
        label: 'Error', 
        icon: <StatusIndicator status="error" variant="dot" size="sm" />,
        description: 'System error detected'
      },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <FormField
          label="Machine Status"
          helpText="Set the current machine status"
        >
          <Select 
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
            placeholder="Select status..."
            clearable
          />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with status indicators and descriptions',
      },
    },
  },
};

export const ControlledSelect: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setValue('apple')}
          >
            Select Apple
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setValue('banana')}
          >
            Select Banana
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setValue('')}
          >
            Clear
          </Button>
        </div>
        
        <Select 
          options={basicOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Controlled select..."
          clearable
        />
        
        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.875rem', 
          color: 'hsl(240, 5%, 64.9%)' 
        }}>
          Current value: {value || 'none'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled select with external state management',
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
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Before (Native Select)</h4>
          <select style={{
            width: '100%',
            height: '40px',
            padding: '8px 12px',
            backgroundColor: 'hsl(240, 10%, 3.9%)',
            color: 'hsl(0, 0%, 98%)',
            border: '1px solid hsl(240, 3.7%, 15.9%)',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}>
            <option value="">Select a machine...</option>
            <option value="haas">Haas VF-3</option>
            <option value="fanuc">Fanuc Robodrill</option>
            <option value="okuma">Okuma Genos L200</option>
          </select>
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '0.875rem', 
            color: 'hsl(240, 5%, 64.9%)' 
          }}>
            Limited styling options, no search or icons
          </p>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>After (Select Component)</h4>
          <Select 
            options={machineOptions}
            placeholder="Select a machine..."
            searchable
            clearable
          />
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '0.875rem', 
            color: 'hsl(240, 5%, 64.9%)' 
          }}>
            Enhanced styling, search, icons, descriptions, and more
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the Select component vs native select',
      },
    },
  },
};