import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable slider component for selecting numeric values with visual feedback and variant styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current value of the slider',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'info'],
      description: 'Visual variant of the slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Slider with Label Component
const SliderWithLabel: React.FC<{
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  unit?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}> = ({ label, value = 0, onChange, min = 0, max = 100, step = 1, disabled, showValue = true, unit, variant = 'default' }) => {
  const variantColors = {
    default: 'hsl(262, 83%, 58%)',
    success: 'rgb(34, 197, 94)',
    warning: 'rgb(245, 158, 11)',
    info: 'rgb(59, 130, 246)',
  };

  const activeColor = variantColors[variant];

  return (
    <div style={{ 
      width: '320px',
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        {label && (
          <label style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
            {label}
          </label>
        )}
        {showValue && (
          <span style={{ fontSize: '14px', color: activeColor, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            {value}{unit}
          </span>
        )}
      </div>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        variant={variant}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <span style={{ fontSize: '12px', color: 'hsl(240, 5%, 64.9%)' }}>{min}{unit}</span>
        <span style={{ fontSize: '12px', color: 'hsl(240, 5%, 64.9%)' }}>{max}{unit}</span>
      </div>
    </div>
  );
};

// Basic Examples
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <SliderWithLabel
        label="Default Slider"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    );
  },
};

export const FeedRate: Story = {
  render: () => {
    const [value, setValue] = useState(1500);
    return (
      <SliderWithLabel
        label="Feed Rate"
        value={value}
        onChange={setValue}
        min={100}
        max={3000}
        step={50}
        unit=" mm/min"
        variant="info"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC feed rate control with appropriate range and units',
      },
    },
  },
};

export const SpindleSpeed: Story = {
  render: () => {
    const [value, setValue] = useState(8000);
    return (
      <SliderWithLabel
        label="Spindle Speed"
        value={value}
        onChange={setValue}
        min={1000}
        max={15000}
        step={100}
        unit=" RPM"
        variant="success"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Spindle speed control for CNC machines',
      },
    },
  },
};

export const Temperature: Story = {
  render: () => {
    const [value, setValue] = useState(75);
    return (
      <SliderWithLabel
        label="Temperature Warning"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        unit="°C"
        variant="warning"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Temperature monitoring with warning variant styling',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <SliderWithLabel
        label="Disabled Slider"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        disabled
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: 25,
      success: 50,
      warning: 75,
      info: 40,
    });

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: 'fit-content'
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '1.125rem', 
          fontWeight: 600,
          color: 'hsl(0, 0%, 98%)',
          textAlign: 'center'
        }}>
          Slider Variants
        </h3>
        
        <SliderWithLabel
          label="Default"
          value={values.default}
          onChange={(val) => setValues(prev => ({ ...prev, default: val }))}
          variant="default"
        />
        
        <SliderWithLabel
          label="Success"
          value={values.success}
          onChange={(val) => setValues(prev => ({ ...prev, success: val }))}
          variant="success"
        />
        
        <SliderWithLabel
          label="Warning"
          value={values.warning}
          onChange={(val) => setValues(prev => ({ ...prev, warning: val }))}
          variant="warning"
        />
        
        <SliderWithLabel
          label="Info"
          value={values.info}
          onChange={(val) => setValues(prev => ({ ...prev, info: val }))}
          variant="info"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All available slider variants displayed together',
      },
    },
  },
};

export const PrecisionControl: Story = {
  render: () => {
    const [value, setValue] = useState(2.5);
    return (
      <SliderWithLabel
        label="Precision Setting"
        value={value}
        onChange={setValue}
        min={0}
        max={5}
        step={0.1}
        unit=" mm"
        variant="info"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'High-precision slider with decimal step values',
      },
    },
  },
};

export const BasicSlider: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    variant: 'default',
    disabled: false,
  },
};