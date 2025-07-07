import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormField } from './FormField';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Slider } from '../Slider/Slider';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FormField component for standardizing form layouts with label, input, and help text patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text',
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the field',
    },
    error: {
      control: 'text',
      description: 'Error message (overrides help text)',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <FormField
        label="Machine Name"
        helpText="Enter a unique name for your CNC machine"
      >
        <Input placeholder="e.g., Haas VF-3" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <FormField
        label="Feed Rate"
        helpText="Operating speed in mm/min"
        required
      >
        <Input 
          variant="number" 
          value="1500"
          rightAddon="mm/min"
        />
      </FormField>
    </div>
  ),
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
      <FormField
        label="Spindle Speed"
        error="Value must be between 100 and 24000 RPM"
        required
      >
        <Input 
          variant="number" 
          value="25000"
          rightAddon="RPM"
        />
      </FormField>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormField
          label="Machine Type"
          layout="horizontal"
          helpText="Select your CNC machine type"
        >
          <Input value="3-Axis Mill" />
        </FormField>
        
        <FormField
          label="Work Offset"
          layout="horizontal"
          required
        >
          <Input variant="cnc" value="G54" />
        </FormField>
        
        <FormField
          label="Tool Length"
          layout="horizontal"
          helpText="Measured in millimeters"
        >
          <Input 
            variant="number" 
            value="50.275"
            rightAddon="mm"
          />
        </FormField>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout for form fields with consistent alignment',
      },
    },
  },
};

export const DisabledField: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <FormField
        label="Machine Status"
        helpText="Current operational status"
        disabled
      >
        <Input value="Connected" />
      </FormField>
    </div>
  ),
};

export const WithSlider: Story = {
  render: () => {
    const [feedRate, setFeedRate] = useState(1500);
    
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <FormField
          label="Feed Rate"
          helpText={`Current setting: ${feedRate} mm/min`}
        >
          <Slider
            value={feedRate}
            onChange={setFeedRate}
            min={100}
            max={3000}
            step={50}
          />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'FormField works with any form control, including sliders',
      },
    },
  },
};

export const CNCMachineSetup: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      machineName: 'Haas VF-3',
      feedRate: 1500,
      spindleSpeed: 12000,
      workOffset: 'G54',
      toolLength: 50.275,
    });

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)', 
          fontSize: '1.25rem',
          fontWeight: 600
        }}>
          CNC Machine Configuration
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FormField
            label="Machine Name"
            helpText="Unique identifier for this machine"
            required
          >
            <Input 
              value={settings.machineName}
              onChange={(e) => setSettings(prev => ({ ...prev, machineName: e.target.value }))}
            />
          </FormField>

          <FormField
            label="Feed Rate"
            helpText={`Operating speed: ${settings.feedRate} mm/min`}
            required
          >
            <Slider
              value={settings.feedRate}
              onChange={(value) => setSettings(prev => ({ ...prev, feedRate: value }))}
              min={100}
              max={3000}
              step={50}
            />
          </FormField>

          <FormField
            label="Spindle Speed"
            helpText="Maximum spindle RPM"
            required
          >
            <Input 
              variant="number"
              value={settings.spindleSpeed}
              onChange={(e) => setSettings(prev => ({ ...prev, spindleSpeed: parseInt(e.target.value) || 0 }))}
              min={100}
              max={24000}
              rightAddon="RPM"
            />
          </FormField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormField
              label="Work Offset"
              required
            >
              <Input 
                variant="cnc"
                value={settings.workOffset}
                onChange={(e) => setSettings(prev => ({ ...prev, workOffset: e.target.value }))}
              />
            </FormField>

            <FormField
              label="Tool Length"
              helpText="mm"
            >
              <Input 
                variant="number"
                value={settings.toolLength}
                onChange={(e) => setSettings(prev => ({ ...prev, toolLength: parseFloat(e.target.value) || 0 }))}
                step={0.001}
                rightAddon="mm"
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
            <div>
              <Badge variant="bright-success" showIndicator>
                Configuration Valid
              </Badge>
            </div>
            <Button>Apply Settings</Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC machine setup form using FormField components',
      },
    },
  },
};

export const FormComparison: Story = {
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
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Before (Inline Styles)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'hsl(0, 0%, 98%)',
                marginBottom: '0.5rem'
              }}>
                Machine Name *
              </label>
              <Input placeholder="Haas VF-3" />
              <p style={{ 
                fontSize: '0.75rem',
                color: 'hsl(240, 5%, 64.9%)',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0'
              }}>
                Enter machine identifier
              </p>
            </div>
            
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'hsl(0, 0%, 98%)',
                marginBottom: '0.5rem'
              }}>
                Feed Rate
              </label>
              <Input variant="number" value="1500" rightAddon="mm/min" />
              <p style={{ 
                fontSize: '0.75rem',
                color: 'hsl(240, 5%, 64.9%)',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0'
              }}>
                Operating speed
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>After (FormField)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              label="Machine Name"
              helpText="Enter machine identifier"
              required
            >
              <Input placeholder="Haas VF-3" />
            </FormField>
            
            <FormField
              label="Feed Rate"
              helpText="Operating speed"
            >
              <Input variant="number" value="1500" rightAddon="mm/min" />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using FormField vs inline styles',
      },
    },
  },
};