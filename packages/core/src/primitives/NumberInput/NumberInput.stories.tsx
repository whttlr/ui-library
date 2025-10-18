import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NumberInput } from './NumberInput';
import { Card } from '../Card/Card';
import { Calculator, Settings, Gauge, Ruler } from 'lucide-react';

const meta: Meta<typeof NumberInput> = {
  title: 'Primitives/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A number input component with increment/decrement buttons and customizable styling. Designed for precision input in CNC applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    step: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
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
    label: 'Quantity',
    value: 1,
    min: 0,
    max: 100,
    step: 1,
    placeholder: 'Enter quantity',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ width: '300px' }}>
        <NumberInput
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState(10);
    const [mediumValue, setMediumValue] = useState(50);
    const [largeValue, setLargeValue] = useState(100);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <NumberInput
          label="Small Size"
          size="sm"
          value={smallValue}
          onChange={setSmallValue}
          min={0}
          max={100}
        />
        <NumberInput
          label="Medium Size"
          size="md"
          value={mediumValue}
          onChange={setMediumValue}
          min={0}
          max={100}
        />
        <NumberInput
          label="Large Size"
          size="lg"
          value={largeValue}
          onChange={setLargeValue}
          min={0}
          max={100}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState(42);
    const [errorValue, setErrorValue] = useState(-5);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <NumberInput
          label="Default Variant"
          variant="default"
          value={defaultValue}
          onChange={setDefaultValue}
          min={0}
          max={100}
        />
        <NumberInput
          label="Error Variant"
          variant="error"
          value={errorValue}
          onChange={setErrorValue}
          min={0}
          max={100}
          error="Value must be between 0 and 100"
        />
      </div>
    );
  },
};

export const PrecisionInputs: Story = {
  render: () => {
    const [coordinate, setCoordinate] = useState(125.456);
    const [diameter, setDiameter] = useState(6.35);
    const [feed, setFeed] = useState(800);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <NumberInput
          label="X Position (mm)"
          value={coordinate}
          onChange={setCoordinate}
          step={0.001}
          min={-999.999}
          max={999.999}
          placeholder="0.000"
        />
        <NumberInput
          label="Tool Diameter (mm)"
          value={diameter}
          onChange={setDiameter}
          step={0.01}
          min={0.1}
          max={50}
          placeholder="6.35"
        />
        <NumberInput
          label="Feed Rate (mm/min)"
          value={feed}
          onChange={setFeed}
          step={50}
          min={0}
          max={5000}
          placeholder="800"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Number inputs configured for precision CNC machining parameters with appropriate step sizes and ranges.',
      },
    },
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState(25);
    const [disabledValue, setDisabledValue] = useState(50);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <NumberInput
          label="Normal State"
          value={normalValue}
          onChange={setNormalValue}
          min={0}
          max={100}
        />
        <NumberInput
          label="Disabled State"
          value={disabledValue}
          onChange={setDisabledValue}
          min={0}
          max={100}
          disabled
        />
        <NumberInput
          label="With Error"
          value={150}
          onChange={() => {}}
          min={0}
          max={100}
          error="Value exceeds maximum limit"
        />
      </div>
    );
  },
};

export const CNCShowcase: Story = {
  render: () => {
    const [machineParams, setMachineParams] = useState({
      spindleSpeed: 1200,
      feedRate: 800,
      jogDistance: 1.0,
      toolDiameter: 6.35,
      stepover: 0.8,
      stepdown: 2.0,
    });
    
    const updateParam = (key: string, value: number | undefined) => {
      setMachineParams(prev => ({
        ...prev,
        [key]: value ?? 0,
      }));
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
            CNC Number Inputs
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Precision numeric inputs for CNC machining applications
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          {/* Machine Parameters */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Settings size={20} />
              Machine Parameters
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <NumberInput
                label="Spindle Speed (RPM)"
                value={machineParams.spindleSpeed}
                onChange={(value) => updateParam('spindleSpeed', value)}
                min={0}
                max={10000}
                step={100}
                placeholder="1200"
              />
              <NumberInput
                label="Feed Rate (mm/min)"
                value={machineParams.feedRate}
                onChange={(value) => updateParam('feedRate', value)}
                min={0}
                max={5000}
                step={50}
                placeholder="800"
              />
              <NumberInput
                label="Jog Distance (mm)"
                value={machineParams.jogDistance}
                onChange={(value) => updateParam('jogDistance', value)}
                min={0.01}
                max={100}
                step={0.1}
                placeholder="1.0"
              />
            </div>
          </Card>

          {/* Tool Parameters */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Ruler size={20} />
              Tool Parameters
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <NumberInput
                label="Tool Diameter (mm)"
                value={machineParams.toolDiameter}
                onChange={(value) => updateParam('toolDiameter', value)}
                min={0.1}
                max={50}
                step={0.01}
                placeholder="6.35"
              />
              <NumberInput
                label="Stepover (%)"
                value={machineParams.stepover}
                onChange={(value) => updateParam('stepover', value)}
                min={0.1}
                max={1.0}
                step={0.1}
                placeholder="0.8"
              />
              <NumberInput
                label="Stepdown (mm)"
                value={machineParams.stepdown}
                onChange={(value) => updateParam('stepdown', value)}
                min={0.1}
                max={10}
                step={0.1}
                placeholder="2.0"
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
            Current Settings:
          </h3>
          <div style={{ fontFamily: 'monospace' }}>
            Spindle: {machineParams.spindleSpeed} RPM | 
            Feed: {machineParams.feedRate} mm/min | 
            Jog: {machineParams.jogDistance} mm<br/>
            Tool: Ø{machineParams.toolDiameter}mm | 
            Stepover: {machineParams.stepover}% | 
            Stepdown: {machineParams.stepdown}mm
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of NumberInput components in a CNC machining context with real-world parameter ranges and step sizes.',
      },
    },
  },
};