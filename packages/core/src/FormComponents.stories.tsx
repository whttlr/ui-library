import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from './primitives/Card/Card';
import { Button } from './primitives/Button/Button';
import { Badge } from './primitives/Badge/Badge';
import { Input, CoordinateInput, PrecisionInput } from './primitives/Input/Input';
import { 
  NumberInput, 
  TextInput, 
  SliderInput, 
  Checkbox, 
  RadioGroup, 
  SelectableList, 
  type RadioOption, 
  type SelectableListOption 
} from './primitives';
import { 
  Search, Settings, User, Mail, Lock, Eye, EyeOff, 
  Calculator, Ruler, Target, Wrench, Activity 
} from 'lucide-react';

const meta: Meta = {
  title: 'Forms/Form Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form component library for CNC applications with inline styling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Form component examples using the new extracted components

export const FormShowcase: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      spindleSpeed: 1200,
      feedRate: 500,
      jogDistance: 1,
      continuousMode: false,
      machineType: 'mill',
      enabledFeatures: ['safety', 'coolant'],
      toolSelection: ['tool1'],
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '1200px',
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
            textShadow: '0 0 30px hsl(262, 83%, 58% / 0.3)',
          }}>
            Form Components
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Complete form component library for CNC applications
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          {/* Text Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Text Inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                label="Username"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Enter your username"
                icon={<User size={16} />}
              />
              <TextInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                placeholder="Enter your email"
                icon={<Mail size={16} />}
              />
              <TextInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                placeholder="Enter your password"
                icon={<Lock size={16} />}
              />
            </div>
          </Card>

          {/* Number Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Number Inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <NumberInput
                label="Spindle Speed (RPM)"
                value={formData.spindleSpeed}
                onChange={(value) => setFormData(prev => ({ ...prev, spindleSpeed: value }))}
                min={0}
                max={10000}
                step={100}
                placeholder="1200"
              />
              <NumberInput
                label="Feed Rate (mm/min)"
                value={formData.feedRate}
                onChange={(value) => setFormData(prev => ({ ...prev, feedRate: value }))}
                min={0}
                max={5000}
                step={50}
                placeholder="500"
              />
              <NumberInput
                label="Jog Distance (mm)"
                value={formData.jogDistance}
                onChange={(value) => setFormData(prev => ({ ...prev, jogDistance: value }))}
                min={0.01}
                max={100}
                step={0.1}
                placeholder="1.0"
              />
            </div>
          </Card>

          {/* Sliders */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Slider Controls</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SliderInput
                label="Spindle Speed"
                value={formData.spindleSpeed}
                onChange={(value) => setFormData(prev => ({ ...prev, spindleSpeed: value }))}
                min={0}
                max={10000}
                step={100}
                unit=" RPM"
                variant="info"
              />
              <SliderInput
                label="Feed Rate"
                value={formData.feedRate}
                onChange={(value) => setFormData(prev => ({ ...prev, feedRate: value }))}
                min={0}
                max={5000}
                step={50}
                unit=" mm/min"
                variant="success"
              />
              <SliderInput
                label="Jog Distance"
                value={formData.jogDistance}
                onChange={(value) => setFormData(prev => ({ ...prev, jogDistance: value }))}
                min={0.1}
                max={10}
                step={0.1}
                unit=" mm"
                variant="warning"
              />
            </div>
          </Card>

          {/* Checkboxes */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Checkboxes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Checkbox
                label="Continuous Jog Mode"
                checked={formData.continuousMode}
                onChange={(checked) => setFormData(prev => ({ ...prev, continuousMode: checked }))}
              />
              <Checkbox
                label="Enable Safety Interlocks"
                checked={true}
                disabled
              />
              <Checkbox
                label="Auto Tool Length Measurement"
                checked={false}
              />
              <Checkbox
                label="Flood Coolant"
                checked={true}
              />
            </div>
          </Card>

          {/* Radio Groups */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Radio Groups</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <RadioGroup
                label="Machine Type"
                value={formData.machineType}
                onChange={(value) => setFormData(prev => ({ ...prev, machineType: value }))}
                options={[
                  { value: 'mill', label: '3-Axis Mill' },
                  { value: 'lathe', label: 'CNC Lathe' },
                  { value: '4axis', label: '4-Axis Mill' },
                  { value: 'router', label: 'CNC Router', disabled: true },
                ]}
              />
            </div>
          </Card>

          {/* Selectable Lists */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Selectable Lists</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SelectableList
                label="Enabled Features (Multi-select)"
                multiSelect
                value={formData.enabledFeatures}
                onChange={(value) => setFormData(prev => ({ ...prev, enabledFeatures: value }))}
                options={[
                  { id: 'safety', label: 'Safety Systems', description: 'Emergency stop and safety interlocks' },
                  { id: 'coolant', label: 'Coolant Control', description: 'Flood and mist coolant systems' },
                  { id: 'probing', label: 'Part Probing', description: 'Automatic workpiece detection' },
                  { id: 'toolchange', label: 'Auto Tool Change', description: 'Automatic tool changer support' },
                ]}
              />
              
              <SelectableList
                label="Active Tool (Single-select)"
                value={formData.toolSelection}
                onChange={(value) => setFormData(prev => ({ ...prev, toolSelection: value }))}
                options={[
                  { id: 'tool1', label: 'Tool 1: 6mm End Mill', description: 'HSS 2-flute end mill' },
                  { id: 'tool2', label: 'Tool 2: 3mm Drill', description: 'Carbide twist drill' },
                  { id: 'tool3', label: 'Tool 3: Face Mill', description: '50mm indexable face mill' },
                  { id: 'tool4', label: 'Tool 4: Tap M6', description: 'M6x1.0 spiral tap', disabled: true },
                ]}
              />
            </div>
          </Card>

        </div>

        {/* Form Actions */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="default" size="lg">
              <Settings size={16} style={{ marginRight: '0.5rem' }} />
              Apply Settings
            </Button>
            <Button variant="secondary" size="lg">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete form component showcase including:

- **Text Inputs**: Username, email, password with icons and validation
- **Number Inputs**: Spindle speed, feed rate, jog distance with precision
- **Slider Controls**: Interactive sliders with real-time value display
- **Checkboxes**: Boolean settings with proper styling
- **Radio Groups**: Single-selection options for machine configuration
- **Selectable Lists**: Multi-select and single-select lists with descriptions

All components use consistent styling matching the dark CNC theme with proper focus states and hover effects.
        `,
      },
    },
  },
};

export const CNCSpecificInputs: Story = {
  render: () => {
    const [coordinates, setCoordinates] = useState({ x: 125.456, y: 67.234, z: -10.125 });
    const [precisionValues, setPrecisionValues] = useState({
      toolDiameter: 6.35,
      stepover: 0.8,
      stepdown: 2.0,
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            CNC-Specific Inputs
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Specialized input components for precision machining
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          
          {/* Coordinate Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Target size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Machine Coordinates
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
          </Card>

          {/* Precision Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Ruler size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Tool Parameters
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <PrecisionInput
                label="Tool Diameter (mm)"
                value={precisionValues.toolDiameter}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, toolDiameter: parseFloat(e.target.value) || 0 }))}
                precision={2}
              />
              <PrecisionInput
                label="Stepover (%)"
                value={precisionValues.stepover}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, stepover: parseFloat(e.target.value) || 0 }))}
                precision={1}
              />
              <PrecisionInput
                label="Stepdown (mm)"
                value={precisionValues.stepdown}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, stepdown: parseFloat(e.target.value) || 0 }))}
                precision={1}
              />
            </div>
          </Card>

          {/* Machine Settings */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Activity size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Machine Parameters
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <SliderInput
                  label="Spindle Speed"
                  value={1200}
                  min={0}
                  max={10000}
                  step={100}
                  unit=" RPM"
                />
              </div>
              <div>
                <SliderInput
                  label="Feed Rate"
                  value={800}
                  min={0}
                  max={5000}
                  step={50}
                  unit=" mm/min"
                />
              </div>
              <div>
                <SliderInput
                  label="Rapid Rate"
                  value={2500}
                  min={0}
                  max={10000}
                  step={100}
                  unit=" mm/min"
                />
              </div>
              <div>
                <SliderInput
                  label="Plunge Rate"
                  value={300}
                  min={0}
                  max={2000}
                  step={25}
                  unit=" mm/min"
                />
              </div>
            </div>
          </Card>

        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific input components including coordinate inputs with precision formatting and machine parameter sliders.',
      },
    },
  },
};