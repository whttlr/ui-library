import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup, type RadioOption } from './RadioGroup';
import { Card } from '../Card/Card';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio group component for selecting a single option from multiple choices, with variants, sizes, and orientation support.',
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    label: 'Choose an option',
    options: basicOptions,
    value: 'option1',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div style={{ width: '300px' }}>
        <RadioGroup
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: 'option1',
      success: 'option2',
      warning: 'option1',
      error: 'option3',
      info: 'option2',
    });
    
    const updateValue = (variant: string, value: string) => {
      setValues(prev => ({ ...prev, [variant]: value }));
    };
    
    const options: RadioOption[] = [
      { value: 'option1', label: 'First Option' },
      { value: 'option2', label: 'Second Option' },
      { value: 'option3', label: 'Third Option' },
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <RadioGroup
          label="Default variant"
          variant="default"
          options={options}
          value={values.default}
          onChange={(value) => updateValue('default', value)}
        />
        <RadioGroup
          label="Success variant"
          variant="success"
          options={options}
          value={values.success}
          onChange={(value) => updateValue('success', value)}
        />
        <RadioGroup
          label="Warning variant"
          variant="warning"
          options={options}
          value={values.warning}
          onChange={(value) => updateValue('warning', value)}
        />
        <RadioGroup
          label="Error variant"
          variant="error"
          options={options}
          value={values.error}
          onChange={(value) => updateValue('error', value)}
        />
        <RadioGroup
          label="Info variant"
          variant="info"
          options={options}
          value={values.info}
          onChange={(value) => updateValue('info', value)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      sm: 'option1',
      md: 'option2',
      lg: 'option3',
    });
    
    const updateValue = (size: string, value: string) => {
      setValues(prev => ({ ...prev, [size]: value }));
    };
    
    const options: RadioOption[] = [
      { value: 'option1', label: 'Small Option' },
      { value: 'option2', label: 'Medium Option' },
      { value: 'option3', label: 'Large Option' },
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <RadioGroup
          label="Small size"
          size="sm"
          options={options}
          value={values.sm}
          onChange={(value) => updateValue('sm', value)}
        />
        <RadioGroup
          label="Medium size"
          size="md"
          options={options}
          value={values.md}
          onChange={(value) => updateValue('md', value)}
        />
        <RadioGroup
          label="Large size"
          size="lg"
          options={options}
          value={values.lg}
          onChange={(value) => updateValue('lg', value)}
        />
      </div>
    );
  },
};

export const Orientations: Story = {
  render: () => {
    const [verticalValue, setVerticalValue] = useState('option2');
    const [horizontalValue, setHorizontalValue] = useState('option1');
    
    const options: RadioOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '400px' 
      }}>
        <RadioGroup
          label="Vertical orientation"
          orientation="vertical"
          options={options}
          value={verticalValue}
          onChange={setVerticalValue}
        />
        <RadioGroup
          label="Horizontal orientation"
          orientation="horizontal"
          options={options}
          value={horizontalValue}
          onChange={setHorizontalValue}
        />
      </div>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState('basic');
    
    const options: RadioOption[] = [
      { 
        value: 'basic', 
        label: 'Basic Plan',
        description: 'Perfect for individuals getting started with basic features.'
      },
      { 
        value: 'pro', 
        label: 'Pro Plan',
        description: 'Advanced features for growing teams and businesses.'
      },
      { 
        value: 'enterprise', 
        label: 'Enterprise Plan',
        description: 'Full-featured plan with priority support and custom integrations.'
      },
    ];
    
    return (
      <div style={{ width: '400px' }}>
        <RadioGroup
          label="Choose your plan"
          variant="info"
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('option1');
    const [requiredValue, setRequiredValue] = useState('');
    
    const options: RadioOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3', disabled: true },
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <RadioGroup
          label="Normal state"
          options={options}
          value={normalValue}
          onChange={setNormalValue}
        />
        <RadioGroup
          label="Required field"
          options={options}
          value={requiredValue}
          onChange={setRequiredValue}
          required
          error={!requiredValue ? 'Please select an option' : undefined}
        />
        <RadioGroup
          label="Disabled group"
          options={options}
          value="option2"
          disabled
        />
      </div>
    );
  },
};

export const CNCMachineTypes: Story = {
  render: () => {
    const [machineType, setMachineType] = useState('mill');
    
    const options: RadioOption[] = [
      { 
        value: 'mill', 
        label: '3-Axis Mill',
        description: 'Standard milling machine with X, Y, and Z axes.'
      },
      { 
        value: 'lathe', 
        label: 'CNC Lathe',
        description: 'Turning machine for cylindrical parts.'
      },
      { 
        value: '4axis', 
        label: '4-Axis Mill',
        description: 'Mill with additional rotary axis for complex geometries.'
      },
      { 
        value: '5axis', 
        label: '5-Axis Mill',
        description: 'Advanced mill with two rotary axes for complex parts.'
      },
      { 
        value: 'router', 
        label: 'CNC Router',
        description: 'Large format router for wood and plastics.',
        disabled: true
      },
    ];
    
    return (
      <div style={{ width: '400px' }}>
        <RadioGroup
          label="Machine Type"
          variant="info"
          options={options}
          value={machineType}
          onChange={setMachineType}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine type selection with descriptions and disabled options.',
      },
    },
  },
};

export const MachineControlPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      machineType: 'mill',
      coordinateSystem: 'absolute',
      units: 'metric',
      jogMode: 'incremental',
      spindleDirection: 'clockwise',
    });
    
    const updateSetting = (key: string, value: string) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };
    
    const machineTypes: RadioOption[] = [
      { value: 'mill', label: '3-Axis Mill', description: 'Standard milling machine' },
      { value: 'lathe', label: 'CNC Lathe', description: 'Turning machine' },
      { value: '4axis', label: '4-Axis Mill', description: 'Mill with rotary axis' },
    ];
    
    const coordinateSystems: RadioOption[] = [
      { value: 'absolute', label: 'Absolute', description: 'G90 - Absolute positioning' },
      { value: 'incremental', label: 'Incremental', description: 'G91 - Incremental positioning' },
    ];
    
    const units: RadioOption[] = [
      { value: 'metric', label: 'Metric (mm)', description: 'Millimeters' },
      { value: 'imperial', label: 'Imperial (in)', description: 'Inches' },
    ];
    
    const jogModes: RadioOption[] = [
      { value: 'incremental', label: 'Incremental', description: 'Fixed distance steps' },
      { value: 'continuous', label: 'Continuous', description: 'Hold to move' },
    ];
    
    const spindleDirections: RadioOption[] = [
      { value: 'clockwise', label: 'Clockwise (M3)', description: 'Standard cutting direction' },
      { value: 'counterclockwise', label: 'Counter-clockwise (M4)', description: 'Reverse for tapping' },
    ];
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '1000px',
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
            Machine Configuration
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Configure machine settings and operation modes
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Machine Setup
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <RadioGroup
                label="Machine Type"
                variant="info"
                options={machineTypes}
                value={settings.machineType}
                onChange={(value) => updateSetting('machineType', value)}
              />
              <RadioGroup
                label="Units"
                variant="success"
                options={units}
                value={settings.units}
                onChange={(value) => updateSetting('units', value)}
              />
            </div>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Coordinate System
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <RadioGroup
                label="Positioning Mode"
                variant="warning"
                options={coordinateSystems}
                value={settings.coordinateSystem}
                onChange={(value) => updateSetting('coordinateSystem', value)}
              />
              <RadioGroup
                label="Jog Mode"
                variant="default"
                options={jogModes}
                value={settings.jogMode}
                onChange={(value) => updateSetting('jogMode', value)}
              />
            </div>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Spindle Control
            </h2>
            <RadioGroup
              label="Spindle Direction"
              variant="error"
              options={spindleDirections}
              value={settings.spindleDirection}
              onChange={(value) => updateSetting('spindleDirection', value)}
            />
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
            Current Configuration:
          </h3>
          <div style={{ fontFamily: 'monospace', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            <div>Machine: {settings.machineType}</div>
            <div>Coordinates: {settings.coordinateSystem}</div>
            <div>Units: {settings.units}</div>
            <div>Jog Mode: {settings.jogMode}</div>
            <div>Spindle: {settings.spindleDirection}</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete machine configuration panel showcasing RadioGroup components in a realistic CNC application.',
      },
    },
  },
};