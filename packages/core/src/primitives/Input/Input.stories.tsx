import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input, CoordinateInput, PrecisionInput } from './Input';
import { User, Mail, Lock, Search, Settings } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input component with icons, validation, and CNC-specific variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helpText: {
      control: 'text',
      description: 'Help text to display below input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      description: 'Input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input Stories
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helpText: 'Password must be at least 8 characters long',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '300px'
    }}>
      <Input
        label="Username"
        placeholder="Enter username"
        startIcon={<User size={16} />}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        startIcon={<Mail size={16} />}
      />
      <Input
        label="Search"
        placeholder="Search..."
        startIcon={<Search size={16} />}
      />
      <Input
        label="Settings"
        placeholder="Configuration"
        endIcon={<Settings size={16} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input fields with start and end icons for enhanced UX.',
      },
    },
  },
};

export const InputStates: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '300px'
    }}>
      <Input
        label="Normal State"
        placeholder="Type here..."
      />
      <Input
        label="Focused State"
        placeholder="Click to focus"
        value="Focused input"
      />
      <Input
        label="Disabled State"
        placeholder="Cannot type here"
        disabled
      />
      <Input
        label="Error State"
        placeholder="Invalid input"
        error="This field is required"
        value="Invalid"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states including normal, focused, disabled, and error states.',
      },
    },
  },
};

// CNC-Specific Input Stories
export const CoordinateInputs: Story = {
  render: () => {
    const [coordinates, setCoordinates] = useState({ x: 125.456, y: 67.234, z: -10.125 });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        width: '500px'
      }}>
        <CoordinateInput
          label="X Position"
          value={coordinates.x}
          onChange={(e) => setCoordinates(prev => ({ ...prev, x: parseFloat(e.target.value) || 0 }))}
          precision={3}
        />
        <CoordinateInput
          label="Y Position"
          value={coordinates.y}
          onChange={(e) => setCoordinates(prev => ({ ...prev, y: parseFloat(e.target.value) || 0 }))}
          precision={3}
        />
        <CoordinateInput
          label="Z Position"
          value={coordinates.z}
          onChange={(e) => setCoordinates(prev => ({ ...prev, z: parseFloat(e.target.value) || 0 }))}
          precision={3}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC coordinate inputs with precision formatting and monospace font.',
      },
    },
  },
};

export const PrecisionInputs: Story = {
  render: () => {
    const [values, setValues] = useState({
      toolDiameter: 6.35,
      stepover: 0.8,
      stepdown: 2.0,
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        width: '500px'
      }}>
        <PrecisionInput
          label="Tool Diameter (mm)"
          value={values.toolDiameter}
          onChange={(e) => setValues(prev => ({ ...prev, toolDiameter: parseFloat(e.target.value) || 0 }))}
          precision={2}
        />
        <PrecisionInput
          label="Stepover (%)"
          value={values.stepover}
          onChange={(e) => setValues(prev => ({ ...prev, stepover: parseFloat(e.target.value) || 0 }))}
          precision={1}
        />
        <PrecisionInput
          label="Stepdown (mm)"
          value={values.stepdown}
          onChange={(e) => setValues(prev => ({ ...prev, stepdown: parseFloat(e.target.value) || 0 }))}
          precision={1}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Precision inputs for tool parameters with automatic rounding and right-aligned text.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      search: '',
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '350px'
      }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Interactive Form</h3>
        
        <Input
          label="Username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          placeholder="Enter username"
          startIcon={<User size={16} />}
          helpText="Username must be unique"
        />
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email"
          startIcon={<Mail size={16} />}
          error={formData.email && !formData.email.includes('@') ? 'Please enter a valid email' : undefined}
        />
        
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Enter password"
          startIcon={<Lock size={16} />}
          helpText="At least 8 characters"
        />
        
        <Input
          label="Search"
          value={formData.search}
          onChange={(e) => setFormData(prev => ({ ...prev, search: e.target.value }))}
          placeholder="Search for something..."
          startIcon={<Search size={16} />}
        />

        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          <strong>Form Data:</strong>
          <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration showing real-time validation and form state management.',
      },
    },
  },
};