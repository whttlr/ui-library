import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Card } from '../Card/Card';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with variants, sizes, and support for indeterminate state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
      <div style={{ width: '300px' }}>
        <Checkbox
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [checks, setChecks] = useState({
      default: false,
      success: true,
      warning: false,
      error: false,
      info: true,
    });
    
    const updateCheck = (variant: string, checked: boolean) => {
      setChecks(prev => ({ ...prev, [variant]: checked }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <Checkbox
          label="Default checkbox"
          variant="default"
          checked={checks.default}
          onCheckedChange={(checked) => updateCheck('default', checked)}
        />
        <Checkbox
          label="Success checkbox"
          variant="success"
          checked={checks.success}
          onCheckedChange={(checked) => updateCheck('success', checked)}
        />
        <Checkbox
          label="Warning checkbox"
          variant="warning"
          checked={checks.warning}
          onCheckedChange={(checked) => updateCheck('warning', checked)}
        />
        <Checkbox
          label="Error checkbox"
          variant="error"
          checked={checks.error}
          onCheckedChange={(checked) => updateCheck('error', checked)}
        />
        <Checkbox
          label="Info checkbox"
          variant="info"
          checked={checks.info}
          onCheckedChange={(checked) => updateCheck('info', checked)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [checks, setChecks] = useState({
      sm: false,
      md: true,
      lg: false,
    });
    
    const updateCheck = (size: string, checked: boolean) => {
      setChecks(prev => ({ ...prev, [size]: checked }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <Checkbox
          label="Small checkbox"
          size="sm"
          checked={checks.sm}
          onCheckedChange={(checked) => updateCheck('sm', checked)}
        />
        <Checkbox
          label="Medium checkbox"
          size="md"
          checked={checks.md}
          onCheckedChange={(checked) => updateCheck('md', checked)}
        />
        <Checkbox
          label="Large checkbox"
          size="lg"
          checked={checks.lg}
          onCheckedChange={(checked) => updateCheck('lg', checked)}
        />
      </div>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [checks, setChecks] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
    });
    
    const updateCheck = (key: string, checked: boolean) => {
      setChecks(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '400px' 
      }}>
        <Checkbox
          label="Enable notifications"
          description="Receive email notifications about important updates and security alerts."
          checked={checks.notifications}
          onCheckedChange={(checked) => updateCheck('notifications', checked)}
        />
        <Checkbox
          label="Marketing communications"
          description="Get updates about new features, product news, and special offers."
          variant="info"
          checked={checks.marketing}
          onCheckedChange={(checked) => updateCheck('marketing', checked)}
        />
        <Checkbox
          label="Analytics and performance"
          description="Help us improve the product by sharing anonymous usage data."
          variant="success"
          checked={checks.analytics}
          onCheckedChange={(checked) => updateCheck('analytics', checked)}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalCheck, setNormalCheck] = useState(false);
    const [indeterminateCheck, setIndeterminateCheck] = useState(false);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <Checkbox
          label="Normal checkbox"
          checked={normalCheck}
          onCheckedChange={setNormalCheck}
        />
        <Checkbox
          label="Indeterminate checkbox"
          indeterminate={true}
          checked={indeterminateCheck}
          onCheckedChange={setIndeterminateCheck}
        />
        <Checkbox
          label="Disabled unchecked"
          checked={false}
          disabled
        />
        <Checkbox
          label="Disabled checked"
          checked={true}
          disabled
        />
        <Checkbox
          label="Error state"
          variant="error"
          checked={false}
          error="This field is required"
        />
      </div>
    );
  },
};

export const CNCMachineSettings: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      safetyInterlocks: true,
      continuousJogMode: false,
      autoToolMeasurement: false,
      floodCoolant: true,
      mistCoolant: false,
      spindleReverse: false,
      probeEnabled: true,
      autoToolChange: false,
    });
    
    const updateSetting = (key: string, checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '400px' 
      }}>
        <Checkbox
          label="Safety Interlocks"
          description="Enable emergency stop and safety door monitoring systems."
          variant="error"
          checked={settings.safetyInterlocks}
          onCheckedChange={(checked) => updateSetting('safetyInterlocks', checked)}
          disabled
        />
        <Checkbox
          label="Continuous Jog Mode"
          description="Allow continuous jogging while button is held down."
          variant="warning"
          checked={settings.continuousJogMode}
          onCheckedChange={(checked) => updateSetting('continuousJogMode', checked)}
        />
        <Checkbox
          label="Auto Tool Length Measurement"
          description="Automatically measure tool length when tool is changed."
          variant="info"
          checked={settings.autoToolMeasurement}
          onCheckedChange={(checked) => updateSetting('autoToolMeasurement', checked)}
        />
        <Checkbox
          label="Flood Coolant"
          description="Enable flood coolant system for heavy cutting operations."
          variant="success"
          checked={settings.floodCoolant}
          onCheckedChange={(checked) => updateSetting('floodCoolant', checked)}
        />
        <Checkbox
          label="Mist Coolant"
          description="Enable mist coolant system for light cutting operations."
          variant="success"
          checked={settings.mistCoolant}
          onCheckedChange={(checked) => updateSetting('mistCoolant', checked)}
        />
        <Checkbox
          label="Spindle Reverse"
          description="Allow spindle to rotate in reverse direction for tapping."
          variant="warning"
          checked={settings.spindleReverse}
          onCheckedChange={(checked) => updateSetting('spindleReverse', checked)}
        />
        <Checkbox
          label="Probe Enabled"
          description="Enable touch probe for workpiece and tool measurement."
          variant="info"
          checked={settings.probeEnabled}
          onCheckedChange={(checked) => updateSetting('probeEnabled', checked)}
        />
        <Checkbox
          label="Auto Tool Change"
          description="Enable automatic tool changer for unattended operation."
          variant="default"
          checked={settings.autoToolChange}
          onCheckedChange={(checked) => updateSetting('autoToolChange', checked)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine settings checkboxes with descriptions and appropriate variants for different types of controls.',
      },
    },
  },
};

export const MachineControlPanel: Story = {
  render: () => {
    const [machineSettings, setMachineSettings] = useState({
      safetyInterlocks: true,
      continuousJogMode: false,
      autoToolMeasurement: false,
      floodCoolant: true,
      mistCoolant: false,
      spindleReverse: false,
      probeEnabled: true,
      autoToolChange: false,
      rapidOverride: false,
      feedOverride: true,
    });
    
    const updateSetting = (key: string, checked: boolean) => {
      setMachineSettings(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(262, 83%, 75%) 50%, hsl(220, 83%, 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Machine Control Settings
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Configure machine options and safety features
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Safety & Control
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Checkbox
                label="Safety Interlocks"
                description="Emergency stop and safety door monitoring"
                variant="error"
                checked={machineSettings.safetyInterlocks}
                onCheckedChange={(checked) => updateSetting('safetyInterlocks', checked)}
                disabled
              />
              <Checkbox
                label="Continuous Jog Mode"
                description="Hold button for continuous movement"
                variant="warning"
                checked={machineSettings.continuousJogMode}
                onCheckedChange={(checked) => updateSetting('continuousJogMode', checked)}
              />
              <Checkbox
                label="Rapid Override"
                description="Allow rapid movement speed override"
                variant="info"
                checked={machineSettings.rapidOverride}
                onCheckedChange={(checked) => updateSetting('rapidOverride', checked)}
              />
              <Checkbox
                label="Feed Override"
                description="Allow feed rate override during operation"
                variant="success"
                checked={machineSettings.feedOverride}
                onCheckedChange={(checked) => updateSetting('feedOverride', checked)}
              />
            </div>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Tooling & Measurement
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Checkbox
                label="Auto Tool Length Measurement"
                description="Measure tool length automatically"
                variant="info"
                checked={machineSettings.autoToolMeasurement}
                onCheckedChange={(checked) => updateSetting('autoToolMeasurement', checked)}
              />
              <Checkbox
                label="Probe Enabled"
                description="Touch probe for workpiece measurement"
                variant="success"
                checked={machineSettings.probeEnabled}
                onCheckedChange={(checked) => updateSetting('probeEnabled', checked)}
              />
              <Checkbox
                label="Auto Tool Change"
                description="Automatic tool changer operation"
                variant="default"
                checked={machineSettings.autoToolChange}
                onCheckedChange={(checked) => updateSetting('autoToolChange', checked)}
              />
              <Checkbox
                label="Spindle Reverse"
                description="Allow reverse rotation for tapping"
                variant="warning"
                checked={machineSettings.spindleReverse}
                onCheckedChange={(checked) => updateSetting('spindleReverse', checked)}
              />
            </div>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Coolant Systems
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Checkbox
                label="Flood Coolant"
                description="High-volume coolant for heavy cutting"
                variant="success"
                checked={machineSettings.floodCoolant}
                onCheckedChange={(checked) => updateSetting('floodCoolant', checked)}
              />
              <Checkbox
                label="Mist Coolant"
                description="Fine mist coolant for light operations"
                variant="success"
                checked={machineSettings.mistCoolant}
                onCheckedChange={(checked) => updateSetting('mistCoolant', checked)}
              />
            </div>
          </Card>

        </div>

        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 10%, 8%)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'hsl(240, 5%, 64.9%)'
        }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            marginBottom: '0.5rem',
            color: 'hsl(0, 0%, 98%)'
          }}>
            Active Settings:
          </h3>
          <div style={{ fontFamily: 'monospace', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {Object.entries(machineSettings).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{key}:</span>
                <span style={{ color: value ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)' }}>
                  {value ? 'ON' : 'OFF'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete machine control panel showcasing Checkbox components in a realistic CNC application.',
      },
    },
  },
};