import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle, Switch, ToggleButton } from './Toggle';
import { Settings, Wifi, Volume2, Bell, Shield, Zap, Power, Eye, EyeOff, Lock, Unlock } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle component for binary states including switches and toggle buttons. Perfect for settings, preferences, and feature toggles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Toggle size variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'cnc'],
      description: 'Toggle color variant',
    },
    variant: {
      control: 'select',
      options: ['switch', 'button'],
      description: 'Toggle visual style',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Label position relative to toggle',
    },
    label: {
      control: 'text',
      description: 'Toggle label text',
    },
    description: {
      control: 'text',
      description: 'Toggle description text',
    },
    checked: {
      control: 'boolean',
      description: 'Toggle state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Switch Examples
export const BasicSwitch: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="Enable notifications"
          description="Receive push notifications for important updates"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic switch with label and description',
      },
    },
  },
};

export const ToggleButtonExample: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <ToggleButton
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="Dark Mode"
          icon={<Settings size={16} />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle button variant with icon',
      },
    },
  },
};

// Color Variants
export const ColorVariants: Story = {
  render: () => {
    const [states, setStates] = useState({
      default: true,
      primary: true,
      secondary: true,
      success: true,
      warning: true,
      error: true,
      info: true,
      cnc: true,
    });
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
            Color Variants
          </h3>
          
          {Object.entries(states).map(([color, checked]) => (
            <Switch
              key={color}
              color={color as any}
              checked={checked}
              onChange={(e) => setStates(prev => ({ ...prev, [color]: e.target.checked }))}
              label={`${color.charAt(0).toUpperCase() + color.slice(1)} Toggle`}
              description={`${color} color variant`}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All available color variants for toggles',
      },
    },
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => {
    const [states, setStates] = useState({
      sm: true,
      default: true,
      lg: true,
    });
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
            Size Variants
          </h3>
          
          <Switch
            size="sm"
            checked={states.sm}
            onChange={(e) => setStates(prev => ({ ...prev, sm: e.target.checked }))}
            label="Small Toggle"
            description="Compact size for tight layouts"
          />
          
          <Switch
            size="default"
            checked={states.default}
            onChange={(e) => setStates(prev => ({ ...prev, default: e.target.checked }))}
            label="Default Toggle"
            description="Standard size for most use cases"
          />
          
          <Switch
            size="lg"
            checked={states.lg}
            onChange={(e) => setStates(prev => ({ ...prev, lg: e.target.checked }))}
            label="Large Toggle"
            description="Prominent size for important settings"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle size variants for different interface scales',
      },
    },
  },
};

// CNC Machine Settings
export const CNCSettings: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      machineEnabled: true,
      coolantFlow: false,
      spindleEnabled: true,
      emergencyMode: false,
      precisionMode: true,
      autoShutoff: false,
    });
    
    const updateSetting = (key: string, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
            CNC Machine Settings
          </h3>
          
          <Switch
            color="cnc"
            size="lg"
            checked={settings.machineEnabled}
            onChange={(e) => updateSetting('machineEnabled', e.target.checked)}
            label="Machine Power"
            description="Main power control for CNC machine"
            icon={<Power size={16} />}
          />
          
          <Switch
            color="info"
            checked={settings.coolantFlow}
            onChange={(e) => updateSetting('coolantFlow', e.target.checked)}
            label="Coolant Flow"
            description="Enable automatic coolant during operations"
          />
          
          <Switch
            color="success"
            checked={settings.spindleEnabled}
            onChange={(e) => updateSetting('spindleEnabled', e.target.checked)}
            label="Spindle Control"
            description="Allow spindle motor operation"
            icon={<Zap size={16} />}
          />
          
          <Switch
            color="error"
            checked={settings.emergencyMode}
            onChange={(e) => updateSetting('emergencyMode', e.target.checked)}
            label="Emergency Mode"
            description="Enable emergency stop protocols"
            icon={<Shield size={16} />}
          />
          
          <Switch
            color="warning"
            checked={settings.precisionMode}
            onChange={(e) => updateSetting('precisionMode', e.target.checked)}
            label="Precision Mode"
            description="High-precision machining with reduced feed rates"
          />
          
          <Switch
            color="secondary"
            checked={settings.autoShutoff}
            onChange={(e) => updateSetting('autoShutoff', e.target.checked)}
            label="Auto Shutdown"
            description="Automatically shutdown after job completion"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine settings panel with various toggle controls',
      },
    },
  },
};

// Toggle Button Grid
export const ToggleButtonGrid: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      wifi: true,
      bluetooth: false,
      notifications: true,
      sound: false,
      location: true,
      sync: false,
    });
    
    const updateFeature = (key: string, value: boolean) => {
      setFeatures(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
            Quick Settings
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <ToggleButton
              color="info"
              checked={features.wifi}
              onChange={(e) => updateFeature('wifi', e.target.checked)}
              label="WiFi"
              icon={<Wifi size={16} />}
            />
            
            <ToggleButton
              color="primary"
              checked={features.bluetooth}
              onChange={(e) => updateFeature('bluetooth', e.target.checked)}
              label="Bluetooth"
              icon={<Settings size={16} />}
            />
            
            <ToggleButton
              color="warning"
              checked={features.notifications}
              onChange={(e) => updateFeature('notifications', e.target.checked)}
              label="Notifications"
              icon={<Bell size={16} />}
            />
            
            <ToggleButton
              color="success"
              checked={features.sound}
              onChange={(e) => updateFeature('sound', e.target.checked)}
              label="Sound"
              icon={<Volume2 size={16} />}
            />
            
            <ToggleButton
              color="error"
              checked={features.location}
              onChange={(e) => updateFeature('location', e.target.checked)}
              label="Location"
              icon={<Shield size={16} />}
            />
            
            <ToggleButton
              color="cnc"
              checked={features.sync}
              onChange={(e) => updateFeature('sync', e.target.checked)}
              label="Sync"
              icon={<Zap size={16} />}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid of toggle buttons for quick settings access',
      },
    },
  },
};

// Loading States
export const LoadingStates: Story = {
  render: () => {
    const [normalChecked, setNormalChecked] = useState(false);
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
            Loading States
          </h3>
          
          <Switch
            checked={normalChecked}
            onChange={(e) => setNormalChecked(e.target.checked)}
            label="Normal Switch"
            description="Regular toggle without loading"
          />
          
          <Switch
            checked={true}
            loading={true}
            label="Loading Switch (On)"
            description="Switch in loading state while enabled"
          />
          
          <Switch
            checked={false}
            loading={true}
            label="Loading Switch (Off)"
            description="Switch in loading state while disabled"
          />
          
          <ToggleButton
            checked={true}
            loading={true}
            label="Loading Button"
            icon={<Settings size={16} />}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle components in loading states',
      },
    },
  },
};

// Label Positions
export const LabelPositions: Story = {
  render: () => {
    const [leftChecked, setLeftChecked] = useState(true);
    const [rightChecked, setRightChecked] = useState(true);
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
            Label Positions
          </h3>
          
          <Switch
            labelPosition="left"
            checked={leftChecked}
            onChange={(e) => setLeftChecked(e.target.checked)}
            label="Label on Left"
            description="Toggle with label positioned to the left"
          />
          
          <Switch
            labelPosition="right"
            checked={rightChecked}
            onChange={(e) => setRightChecked(e.target.checked)}
            label="Label on Right"
            description="Toggle with label positioned to the right (default)"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle label positioning options',
      },
    },
  },
};

// Interactive Demo
export const Interactive: Story = {
  render: () => {
    const [config, setConfig] = useState({
      variant: 'switch' as 'switch' | 'button',
      size: 'default' as 'sm' | 'default' | 'lg',
      color: 'default' as any,
      checked: true,
      disabled: false,
      loading: false,
      labelPosition: 'right' as 'left' | 'right',
    });
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ margin: 0, color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
            Interactive Toggle Demo
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                Variant
              </label>
              <select
                value={config.variant}
                onChange={(e) => setConfig(prev => ({ ...prev, variant: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="switch">Switch</option>
                <option value="button">Button</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                Size
              </label>
              <select
                value={config.size}
                onChange={(e) => setConfig(prev => ({ ...prev, size: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="sm">Small</option>
                <option value="default">Default</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                Color
              </label>
              <select
                value={config.color}
                onChange={(e) => setConfig(prev => ({ ...prev, color: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
                <option value="cnc">CNC</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                States
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                  <input
                    type="checkbox"
                    checked={config.checked}
                    onChange={(e) => setConfig(prev => ({ ...prev, checked: e.target.checked }))}
                  />
                  Checked
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                  <input
                    type="checkbox"
                    checked={config.disabled}
                    onChange={(e) => setConfig(prev => ({ ...prev, disabled: e.target.checked }))}
                  />
                  Disabled
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                  <input
                    type="checkbox"
                    checked={config.loading}
                    onChange={(e) => setConfig(prev => ({ ...prev, loading: e.target.checked }))}
                  />
                  Loading
                </label>
              </div>
            </div>
          </div>
          
          <div style={{ 
            padding: '2rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Toggle
              variant={config.variant}
              size={config.size}
              color={config.color}
              checked={config.checked}
              disabled={config.disabled}
              loading={config.loading}
              labelPosition={config.labelPosition}
              onChange={(e) => setConfig(prev => ({ ...prev, checked: e.target.checked }))}
              label="Sample Toggle"
              description="Interactive toggle demonstration"
              icon={<Eye size={16} />}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive toggle configuration with live preview',
      },
    },
  },
};