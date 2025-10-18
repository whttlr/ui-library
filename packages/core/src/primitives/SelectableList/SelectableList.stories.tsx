import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SelectableList, type SelectableListOption } from './SelectableList';
import { Card } from '../Card/Card';
import { Settings, Wrench, Zap, Shield, Activity } from 'lucide-react';

const meta: Meta<typeof SelectableList> = {
  title: 'Primitives/SelectableList',
  component: SelectableList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A selectable list component for single or multi-select scenarios, with search functionality and customizable styling.',
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
    multiSelect: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: SelectableListOption[] = [
  { id: 'option1', label: 'Option 1', description: 'First option description' },
  { id: 'option2', label: 'Option 2', description: 'Second option description' },
  { id: 'option3', label: 'Option 3', description: 'Third option description' },
  { id: 'option4', label: 'Option 4', description: 'Fourth option description', disabled: true },
];

export const Default: Story = {
  args: {
    label: 'Select options',
    options: basicOptions,
    value: ['option1'],
    multiSelect: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || []);
    return (
      <div style={{ width: '300px' }}>
        <SelectableList
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['option2']);
    
    return (
      <div style={{ width: '300px' }}>
        <SelectableList
          label="Single Selection"
          options={basicOptions}
          value={value}
          onChange={setValue}
          multiSelect={false}
        />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['option1', 'option3']);
    
    return (
      <div style={{ width: '300px' }}>
        <SelectableList
          label="Multiple Selection"
          options={basicOptions}
          value={value}
          onChange={setValue}
          multiSelect={true}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: ['option1'],
      success: ['option2'],
      warning: ['option1'],
      error: ['option3'],
      info: ['option2'],
    });
    
    const updateValue = (variant: string, value: string[]) => {
      setValues(prev => ({ ...prev, [variant]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <SelectableList
          label="Default variant"
          variant="default"
          options={basicOptions}
          value={values.default}
          onChange={(value) => updateValue('default', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Success variant"
          variant="success"
          options={basicOptions}
          value={values.success}
          onChange={(value) => updateValue('success', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Warning variant"
          variant="warning"
          options={basicOptions}
          value={values.warning}
          onChange={(value) => updateValue('warning', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Error variant"
          variant="error"
          options={basicOptions}
          value={values.error}
          onChange={(value) => updateValue('error', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Info variant"
          variant="info"
          options={basicOptions}
          value={values.info}
          onChange={(value) => updateValue('info', value)}
          multiSelect={false}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      sm: ['option1'],
      md: ['option2'],
      lg: ['option3'],
    });
    
    const updateValue = (size: string, value: string[]) => {
      setValues(prev => ({ ...prev, [size]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <SelectableList
          label="Small size"
          size="sm"
          options={basicOptions}
          value={values.sm}
          onChange={(value) => updateValue('sm', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Medium size"
          size="md"
          options={basicOptions}
          value={values.md}
          onChange={(value) => updateValue('md', value)}
          multiSelect={false}
        />
        <SelectableList
          label="Large size"
          size="lg"
          options={basicOptions}
          value={values.lg}
          onChange={(value) => updateValue('lg', value)}
          multiSelect={false}
        />
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['feature1']);
    
    const options: SelectableListOption[] = [
      { id: 'feature1', label: 'Safety Systems', description: 'Emergency stop and safety interlocks' },
      { id: 'feature2', label: 'Coolant Control', description: 'Flood and mist coolant systems' },
      { id: 'feature3', label: 'Part Probing', description: 'Automatic workpiece detection' },
      { id: 'feature4', label: 'Tool Change', description: 'Automatic tool changer support' },
      { id: 'feature5', label: 'Spindle Control', description: 'Variable speed spindle control' },
      { id: 'feature6', label: 'Axis Control', description: 'Multi-axis positioning control' },
    ];
    
    return (
      <div style={{ width: '400px' }}>
        <SelectableList
          label="Enabled Features (Searchable)"
          options={options}
          value={value}
          onChange={setValue}
          multiSelect={true}
          searchable={true}
          placeholder="Search features..."
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['tool1']);
    
    const options: SelectableListOption[] = [
      { 
        id: 'tool1', 
        label: 'Tool 1: 6mm End Mill', 
        description: 'HSS 2-flute end mill',
        icon: <Wrench size={16} />
      },
      { 
        id: 'tool2', 
        label: 'Tool 2: 3mm Drill', 
        description: 'Carbide twist drill',
        icon: <Zap size={16} />
      },
      { 
        id: 'tool3', 
        label: 'Tool 3: Face Mill', 
        description: '50mm indexable face mill',
        icon: <Settings size={16} />
      },
      { 
        id: 'tool4', 
        label: 'Tool 4: Tap M6', 
        description: 'M6x1.0 spiral tap',
        icon: <Wrench size={16} />,
        disabled: true
      },
    ];
    
    return (
      <div style={{ width: '400px' }}>
        <SelectableList
          label="Active Tools"
          options={options}
          value={value}
          onChange={setValue}
          multiSelect={false}
          variant="info"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState<string[]>(['option1']);
    const [disabledValue, setDisabledValue] = useState<string[]>(['option2']);
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '300px' 
      }}>
        <SelectableList
          label="Normal state"
          options={basicOptions}
          value={normalValue}
          onChange={setNormalValue}
          multiSelect={true}
        />
        <SelectableList
          label="Disabled state"
          options={basicOptions}
          value={disabledValue}
          onChange={setDisabledValue}
          multiSelect={true}
          disabled
        />
        <SelectableList
          label="With error"
          options={basicOptions}
          value={[]}
          onChange={() => {}}
          multiSelect={true}
          error="Please select at least one option"
        />
      </div>
    );
  },
};

export const CNCToolSelection: Story = {
  render: () => {
    const [activeTools, setActiveTools] = useState<string[]>(['tool1', 'tool3']);
    const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['safety', 'coolant']);
    
    const toolOptions: SelectableListOption[] = [
      { 
        id: 'tool1', 
        label: 'Tool 1: 6mm End Mill', 
        description: 'HSS 2-flute end mill for general purpose milling',
        icon: <Wrench size={16} />
      },
      { 
        id: 'tool2', 
        label: 'Tool 2: 3mm Drill', 
        description: 'Carbide twist drill for precise holes',
        icon: <Zap size={16} />
      },
      { 
        id: 'tool3', 
        label: 'Tool 3: Face Mill', 
        description: '50mm indexable face mill for large surfaces',
        icon: <Settings size={16} />
      },
      { 
        id: 'tool4', 
        label: 'Tool 4: Tap M6', 
        description: 'M6x1.0 spiral tap for threading',
        icon: <Wrench size={16} />,
        disabled: true
      },
      { 
        id: 'tool5', 
        label: 'Tool 5: Ball End Mill', 
        description: '4mm ball end mill for 3D contouring',
        icon: <Activity size={16} />
      },
    ];
    
    const featureOptions: SelectableListOption[] = [
      { 
        id: 'safety', 
        label: 'Safety Systems', 
        description: 'Emergency stop and safety door monitoring',
        icon: <Shield size={16} />
      },
      { 
        id: 'coolant', 
        label: 'Coolant Control', 
        description: 'Flood and mist coolant systems',
        icon: <Activity size={16} />
      },
      { 
        id: 'probing', 
        label: 'Part Probing', 
        description: 'Automatic workpiece detection and measurement',
        icon: <Zap size={16} />
      },
      { 
        id: 'toolchange', 
        label: 'Auto Tool Change', 
        description: 'Automatic tool changer for unattended operation',
        icon: <Wrench size={16} />
      },
      { 
        id: 'spindle', 
        label: 'Variable Speed Spindle', 
        description: 'Precise spindle speed control',
        icon: <Settings size={16} />
      },
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        width: '400px' 
      }}>
        <SelectableList
          label="Active Tools (Single Select)"
          options={toolOptions}
          value={activeTools}
          onChange={setActiveTools}
          multiSelect={false}
          variant="info"
          searchable={true}
          placeholder="Search tools..."
        />
        
        <SelectableList
          label="Enabled Features (Multi Select)"
          options={featureOptions}
          value={enabledFeatures}
          onChange={setEnabledFeatures}
          multiSelect={true}
          variant="success"
          searchable={true}
          placeholder="Search features..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC tool and feature selection with icons, search functionality, and realistic options.',
      },
    },
  },
};

export const MachineConfigurationPanel: Story = {
  render: () => {
    const [selectedTools, setSelectedTools] = useState<string[]>(['tool1']);
    const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['safety', 'coolant', 'probing']);
    const [activeSettings, setActiveSettings] = useState<string[]>(['setting1', 'setting3']);
    
    const toolOptions: SelectableListOption[] = [
      { id: 'tool1', label: 'Tool 1: 6mm End Mill', description: 'HSS 2-flute end mill', icon: <Wrench size={16} /> },
      { id: 'tool2', label: 'Tool 2: 3mm Drill', description: 'Carbide twist drill', icon: <Zap size={16} /> },
      { id: 'tool3', label: 'Tool 3: Face Mill', description: '50mm indexable face mill', icon: <Settings size={16} /> },
      { id: 'tool4', label: 'Tool 4: Tap M6', description: 'M6x1.0 spiral tap', icon: <Wrench size={16} />, disabled: true },
      { id: 'tool5', label: 'Tool 5: Ball End Mill', description: '4mm ball end mill', icon: <Activity size={16} /> },
    ];
    
    const featureOptions: SelectableListOption[] = [
      { id: 'safety', label: 'Safety Systems', description: 'Emergency stop and safety interlocks', icon: <Shield size={16} /> },
      { id: 'coolant', label: 'Coolant Control', description: 'Flood and mist coolant systems', icon: <Activity size={16} /> },
      { id: 'probing', label: 'Part Probing', description: 'Automatic workpiece detection', icon: <Zap size={16} /> },
      { id: 'toolchange', label: 'Auto Tool Change', description: 'Automatic tool changer support', icon: <Wrench size={16} /> },
      { id: 'spindle', label: 'Variable Speed Spindle', description: 'Precise spindle speed control', icon: <Settings size={16} /> },
    ];
    
    const settingOptions: SelectableListOption[] = [
      { id: 'setting1', label: 'Continuous Jog Mode', description: 'Allow continuous jogging while button is held' },
      { id: 'setting2', label: 'Auto Tool Measurement', description: 'Automatically measure tool length on change' },
      { id: 'setting3', label: 'Spindle Orientation', description: 'Orient spindle to same position after stop' },
      { id: 'setting4', label: 'Rapid Override', description: 'Allow rapid feed rate override' },
      { id: 'setting5', label: 'Feed Hold', description: 'Enable feed hold during operation' },
    ];
    
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
          }}>
            Machine Configuration
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Select tools, features, and settings for your CNC machine
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Tool Selection
            </h2>
            <SelectableList
              options={toolOptions}
              value={selectedTools}
              onChange={setSelectedTools}
              multiSelect={false}
              variant="info"
              searchable={true}
              placeholder="Search tools..."
              maxHeight="300px"
            />
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Enabled Features
            </h2>
            <SelectableList
              options={featureOptions}
              value={enabledFeatures}
              onChange={setEnabledFeatures}
              multiSelect={true}
              variant="success"
              searchable={true}
              placeholder="Search features..."
              maxHeight="300px"
            />
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Machine Settings
            </h2>
            <SelectableList
              options={settingOptions}
              value={activeSettings}
              onChange={setActiveSettings}
              multiSelect={true}
              variant="warning"
              searchable={true}
              placeholder="Search settings..."
              maxHeight="300px"
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>Selected Tools:</strong><br />
              {selectedTools.map(id => toolOptions.find(t => t.id === id)?.label).join(', ') || 'None'}
            </div>
            <div>
              <strong>Enabled Features:</strong><br />
              {enabledFeatures.map(id => featureOptions.find(f => f.id === id)?.label).join(', ') || 'None'}
            </div>
            <div>
              <strong>Active Settings:</strong><br />
              {activeSettings.map(id => settingOptions.find(s => s.id === id)?.label).join(', ') || 'None'}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete machine configuration panel showcasing SelectableList components in a realistic CNC application.',
      },
    },
  },
};