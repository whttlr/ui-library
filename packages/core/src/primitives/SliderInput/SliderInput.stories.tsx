import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SliderInput } from './SliderInput';
import { Card } from '../Card/Card';

const meta: Meta<typeof SliderInput> = {
  title: 'Primitives/SliderInput',
  component: SliderInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable slider input component with variant colors, size options, and value display.',
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
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    showValue: {
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
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showValue: true,
    unit: '%',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 50);
    return (
      <div style={{ width: '300px' }}>
        <SliderInput
          {...args}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: 50,
      success: 75,
      warning: 85,
      error: 95,
      info: 60,
    });
    
    const updateValue = (variant: string, value: number) => {
      setValues(prev => ({ ...prev, [variant]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <SliderInput
          label="Default"
          variant="default"
          value={values.default}
          onValueChange={(value) => updateValue('default', value)}
          unit="%"
        />
        <SliderInput
          label="Success"
          variant="success"
          value={values.success}
          onValueChange={(value) => updateValue('success', value)}
          unit="%"
        />
        <SliderInput
          label="Warning"
          variant="warning"
          value={values.warning}
          onValueChange={(value) => updateValue('warning', value)}
          unit="%"
        />
        <SliderInput
          label="Error"
          variant="error"
          value={values.error}
          onValueChange={(value) => updateValue('error', value)}
          unit="%"
        />
        <SliderInput
          label="Info"
          variant="info"
          value={values.info}
          onValueChange={(value) => updateValue('info', value)}
          unit="%"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      sm: 25,
      md: 50,
      lg: 75,
    });
    
    const updateValue = (size: string, value: number) => {
      setValues(prev => ({ ...prev, [size]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <SliderInput
          label="Small"
          size="sm"
          value={values.sm}
          onValueChange={(value) => updateValue('sm', value)}
          unit="%"
        />
        <SliderInput
          label="Medium"
          size="md"
          value={values.md}
          onValueChange={(value) => updateValue('md', value)}
          unit="%"
        />
        <SliderInput
          label="Large"
          size="lg"
          value={values.lg}
          onValueChange={(value) => updateValue('lg', value)}
          unit="%"
        />
      </div>
    );
  },
};

export const CNCParameters: Story = {
  render: () => {
    const [params, setParams] = useState({
      spindleSpeed: 1200,
      feedRate: 800,
      rapidRate: 2500,
      plungeRate: 300,
      jogSpeed: 1000,
    });
    
    const updateParam = (param: string, value: number) => {
      setParams(prev => ({ ...prev, [param]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <SliderInput
          label="Spindle Speed"
          variant="info"
          min={0}
          max={10000}
          step={100}
          value={params.spindleSpeed}
          onValueChange={(value) => updateParam('spindleSpeed', value)}
          unit=" RPM"
        />
        <SliderInput
          label="Feed Rate"
          variant="success"
          min={0}
          max={5000}
          step={50}
          value={params.feedRate}
          onValueChange={(value) => updateParam('feedRate', value)}
          unit=" mm/min"
        />
        <SliderInput
          label="Rapid Rate"
          variant="warning"
          min={0}
          max={10000}
          step={100}
          value={params.rapidRate}
          onValueChange={(value) => updateParam('rapidRate', value)}
          unit=" mm/min"
        />
        <SliderInput
          label="Plunge Rate"
          variant="error"
          min={0}
          max={2000}
          step={25}
          value={params.plungeRate}
          onValueChange={(value) => updateParam('plungeRate', value)}
          unit=" mm/min"
        />
        <SliderInput
          label="Jog Speed"
          variant="default"
          min={0}
          max={5000}
          step={100}
          value={params.jogSpeed}
          onValueChange={(value) => updateParam('jogSpeed', value)}
          unit=" mm/min"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine parameter sliders with appropriate ranges and step sizes for precision control.',
      },
    },
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState(50);
    const [disabledValue, setDisabledValue] = useState(75);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <SliderInput
          label="Normal State"
          value={normalValue}
          onValueChange={setNormalValue}
          unit="%"
        />
        <SliderInput
          label="Disabled State"
          value={disabledValue}
          onValueChange={setDisabledValue}
          unit="%"
          disabled
        />
        <SliderInput
          label="Without Value Display"
          value={25}
          onValueChange={() => {}}
          showValue={false}
          unit="%"
        />
      </div>
    );
  },
};

export const PrecisionControl: Story = {
  render: () => {
    const [values, setValues] = useState({
      coarse: 50,
      fine: 12.5,
      micro: 0.125,
    });
    
    const updateValue = (key: string, value: number) => {
      setValues(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '300px' 
      }}>
        <SliderInput
          label="Coarse Adjustment"
          min={0}
          max={100}
          step={1}
          value={values.coarse}
          onValueChange={(value) => updateValue('coarse', value)}
          unit=" mm"
        />
        <SliderInput
          label="Fine Adjustment"
          min={0}
          max={25}
          step={0.1}
          value={values.fine}
          onValueChange={(value) => updateValue('fine', value)}
          unit=" mm"
        />
        <SliderInput
          label="Micro Adjustment"
          min={0}
          max={1}
          step={0.001}
          value={values.micro}
          onValueChange={(value) => updateValue('micro', value)}
          unit=" mm"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Precision control sliders with different step sizes for fine-tuning machine parameters.',
      },
    },
  },
};

export const MachineControlPanel: Story = {
  render: () => {
    const [machineParams, setMachineParams] = useState({
      spindleSpeed: 1200,
      feedRate: 800,
      coolantFlow: 60,
      toolLength: 25.4,
      workOffset: 0,
    });
    
    const updateParam = (param: string, value: number) => {
      setMachineParams(prev => ({ ...prev, [param]: value }));
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
            Machine Control Panel
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Precision slider controls for CNC machine parameters
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Speed Controls
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SliderInput
                label="Spindle Speed"
                variant="info"
                min={0}
                max={10000}
                step={100}
                value={machineParams.spindleSpeed}
                onValueChange={(value) => updateParam('spindleSpeed', value)}
                unit=" RPM"
              />
              <SliderInput
                label="Feed Rate"
                variant="success"
                min={0}
                max={5000}
                step={50}
                value={machineParams.feedRate}
                onValueChange={(value) => updateParam('feedRate', value)}
                unit=" mm/min"
              />
            </div>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              System Controls
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SliderInput
                label="Coolant Flow"
                variant="default"
                min={0}
                max={100}
                step={5}
                value={machineParams.coolantFlow}
                onValueChange={(value) => updateParam('coolantFlow', value)}
                unit="%"
              />
              <SliderInput
                label="Tool Length Offset"
                variant="warning"
                min={0}
                max={50}
                step={0.1}
                value={machineParams.toolLength}
                onValueChange={(value) => updateParam('toolLength', value)}
                unit=" mm"
              />
              <SliderInput
                label="Work Offset"
                variant="error"
                min={-10}
                max={10}
                step={0.01}
                value={machineParams.workOffset}
                onValueChange={(value) => updateParam('workOffset', value)}
                unit=" mm"
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
            Current Parameters:
          </h3>
          <div style={{ fontFamily: 'monospace', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            <div>Spindle: {machineParams.spindleSpeed} RPM</div>
            <div>Feed: {machineParams.feedRate} mm/min</div>
            <div>Coolant: {machineParams.coolantFlow}%</div>
            <div>Tool Length: {machineParams.toolLength} mm</div>
            <div>Work Offset: {machineParams.workOffset} mm</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete machine control panel showcasing SliderInput components in a realistic CNC application.',
      },
    },
  },
};