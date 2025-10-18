import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MacroButtons, CompactMacroButtons, type MacroButton } from './MacroButtons';
import { Card, Button, Badge } from '@whttlr/ui-core';
import { 
  Home, 
  Target, 
  RotateCcw, 
  Zap, 
  Settings, 
  AlertCircle, 
  Play, 
  RefreshCw,
  Tool,
  Wrench,
  Square
} from 'lucide-react';

const meta: Meta<typeof MacroButtons> = {
  title: 'CNC/Controls/MacroButtons',
  component: MacroButtons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable macro button system for CNC machines with support for G-code automation and quick actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showCategories: {
      control: 'boolean',
    },
    showDescriptions: {
      control: 'boolean',
    },
    allowEdit: {
      control: 'boolean',
    },
    layout: {
      control: 'select',
      options: ['grid', 'list'],
    },
    columns: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample macro data
const sampleMacros: MacroButton[] = [
  {
    id: 'home_all',
    name: 'Home All Axes',
    description: 'Move all axes to their home position safely',
    gcode: 'G28 X Y Z\nG00 X0 Y0 Z0\nM00',
    icon: <Home size={16} />,
    category: 'setup',
    hotkey: 'Ctrl+H',
    enabled: true,
    estimatedTime: 15,
    requiresConfirmation: false,
  },
  {
    id: 'probe_z',
    name: 'Probe Z Height',
    description: 'Automatically probe and set Z height using touch probe',
    gcode: 'G91\nG38.2 Z-10 F50\nG92 Z0\nG00 Z5\nG90',
    icon: <Target size={16} />,
    category: 'setup',
    hotkey: 'Ctrl+P',
    enabled: true,
    estimatedTime: 10,
    requiresConfirmation: true,
  },
  {
    id: 'spindle_warmup',
    name: 'Spindle Warmup',
    description: 'Run spindle warmup routine to ensure optimal performance',
    gcode: 'S500 M03\nG04 P5\nS1000 M03\nG04 P5\nS2000 M03\nG04 P10\nM05',
    icon: <Zap size={16} />,
    category: 'operation',
    hotkey: 'Ctrl+W',
    enabled: true,
    estimatedTime: 25,
    requiresConfirmation: false,
  },
  {
    id: 'emergency_stop',
    name: 'Emergency Stop',
    description: 'Immediately stop all machine motion and spindle',
    gcode: 'M00\nM05\nM09\nG00 Z50',
    icon: <AlertCircle size={16} />,
    category: 'safety',
    hotkey: 'Esc',
    enabled: true,
    estimatedTime: 2,
    requiresConfirmation: false,
  },
  {
    id: 'tool_change',
    name: 'Manual Tool Change',
    description: 'Position machine for manual tool change',
    gcode: 'G00 Z50\nG00 X0 Y0\nM05\nM00 (Change tool and press cycle start)',
    icon: <Wrench size={16} />,
    category: 'operation',
    hotkey: 'Ctrl+T',
    enabled: true,
    estimatedTime: 5,
    requiresConfirmation: true,
  },
  {
    id: 'coolant_flush',
    name: 'Coolant Flush',
    description: 'Flush coolant system to remove debris',
    gcode: 'M08\nG04 P10\nM09\nG04 P2\nM08\nG04 P10\nM09',
    icon: <RefreshCw size={16} />,
    category: 'maintenance',
    hotkey: 'Ctrl+F',
    enabled: true,
    estimatedTime: 30,
    requiresConfirmation: false,
  },
  {
    id: 'part_zero',
    name: 'Set Part Zero',
    description: 'Set current position as part zero (G54)',
    gcode: 'G10 L20 P1 X0 Y0 Z0\nG54',
    icon: <Target size={16} />,
    category: 'setup',
    hotkey: 'Ctrl+0',
    enabled: true,
    estimatedTime: 1,
    requiresConfirmation: true,
  },
  {
    id: 'surface_touch',
    name: 'Surface Touch',
    description: 'Touch surface to set Z zero with current tool',
    gcode: 'G91\nG38.2 Z-25 F25\nG92 Z0\nG00 Z2\nG90',
    icon: <Target size={16} />,
    category: 'setup',
    enabled: true,
    estimatedTime: 8,
    requiresConfirmation: true,
  },
  {
    id: 'spindle_orient',
    name: 'Orient Spindle',
    description: 'Orient spindle to 0 degrees for tool change',
    gcode: 'M19\nG04 P2',
    icon: <RotateCcw size={16} />,
    category: 'operation',
    enabled: true,
    estimatedTime: 3,
    requiresConfirmation: false,
  },
  {
    id: 'dust_collection',
    name: 'Dust Collection',
    description: 'Turn on dust collection system',
    gcode: 'M07\nG04 P2',
    icon: <RefreshCw size={16} />,
    category: 'operation',
    enabled: true,
    estimatedTime: 2,
    requiresConfirmation: false,
  },
];

export const Default: Story = {
  render: () => {
    const [macros, setMacros] = useState<MacroButton[]>(sampleMacros);

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      // Simulate macro execution
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleEdit = (macroId: string) => {
      console.log('Edit macro:', macroId);
    };

    const handleDelete = (macroId: string) => {
      setMacros(prev => prev.filter(macro => macro.id !== macroId));
    };

    const handleAdd = () => {
      const newMacro: MacroButton = {
        id: `macro_${Date.now()}`,
        name: 'New Macro',
        description: 'Custom macro description',
        gcode: 'G00 X0 Y0 Z0',
        category: 'custom',
        enabled: true,
        estimatedTime: 5,
      };
      setMacros(prev => [...prev, newMacro]);
    };

    return (
      <div style={{ width: '800px', height: '600px' }}>
        <MacroButtons
          macros={macros}
          onExecute={handleExecute}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          onSettings={() => console.log('Open macro settings')}
        />
      </div>
    );
  },
};

export const GridLayout: Story = {
  render: () => {
    const [macros, setMacros] = useState<MacroButton[]>(sampleMacros);

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div style={{ width: '900px', height: '600px' }}>
        <MacroButtons
          macros={macros}
          onExecute={handleExecute}
          layout="grid"
          columns={3}
          showCategories={true}
          showDescriptions={true}
          allowEdit={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Macro buttons displayed in a grid layout with 3 columns.',
      },
    },
  },
};

export const ListLayout: Story = {
  render: () => {
    const [macros, setMacros] = useState<MacroButton[]>(sampleMacros);

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div style={{ width: '600px', height: '600px' }}>
        <MacroButtons
          macros={macros}
          onExecute={handleExecute}
          layout="list"
          showCategories={true}
          showDescriptions={true}
          allowEdit={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Macro buttons displayed in a list layout for detailed view.',
      },
    },
  },
};

export const SafetyMacrosOnly: Story = {
  render: () => {
    const safetyMacros = sampleMacros.filter(macro => macro.category === 'safety');
    const [macros, setMacros] = useState<MacroButton[]>(safetyMacros);

    const handleExecute = async (macroId: string) => {
      console.log('Executing safety macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 500));
    };

    return (
      <div style={{ width: '500px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <AlertCircle size={16} color="hsl(0, 84.2%, 60.2%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 84.2%, 60.2%)',
              fontSize: '1rem',
            }}>
              Safety Macros
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Critical safety macros for emergency situations.
          </p>
        </Card>

        <MacroButtons
          macros={macros}
          onExecute={handleExecute}
          showCategories={false}
          showDescriptions={true}
          allowEdit={false}
          layout="grid"
          columns={2}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Safety-focused macro buttons with emergency stop and safety procedures.',
      },
    },
  },
};

export const SetupMacros: Story = {
  render: () => {
    const setupMacros = sampleMacros.filter(macro => macro.category === 'setup');
    const [macros, setMacros] = useState<MacroButton[]>(setupMacros);

    const handleExecute = async (macroId: string) => {
      console.log('Executing setup macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div style={{ width: '700px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <Settings size={16} color="hsl(217, 91%, 60%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(217, 91%, 60%)',
              fontSize: '1rem',
            }}>
              Setup Macros
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Machine setup and calibration macros for job preparation.
          </p>
        </Card>

        <MacroButtons
          macros={macros}
          onExecute={handleExecute}
          showCategories={false}
          showDescriptions={true}
          allowEdit={true}
          layout="grid"
          columns={2}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Setup macros for machine preparation and calibration.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => {
    const quickMacros = sampleMacros.slice(0, 4);
    const [showDetails, setShowDetails] = useState(false);

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div style={{ width: 'auto' }}>
        <CompactMacroButtons
          macros={quickMacros}
          onExecute={handleExecute}
          maxButtons={4}
          showLabels={false}
        />
        <div style={{ marginTop: '1rem' }}>
          <CompactMacroButtons
            macros={quickMacros}
            onExecute={handleExecute}
            maxButtons={3}
            showLabels={true}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'Show'} Full Interface
          </Button>
        </div>
        {showDetails && (
          <div style={{ marginTop: '1rem' }}>
            <MacroButtons
              macros={sampleMacros}
              onExecute={handleExecute}
              layout="grid"
              columns={3}
              showCategories={true}
              showDescriptions={false}
              allowEdit={false}
            />
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact macro buttons suitable for toolbars and quick access panels.',
      },
    },
  },
};

export const NoMacros: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <MacroButtons
        macros={[]}
        onExecute={() => {}}
        onAdd={() => console.log('Add first macro')}
        onSettings={() => console.log('Open settings')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no macros are configured.',
      },
    },
  },
};

export const DisabledMacros: Story = {
  render: () => {
    const disabledMacros = sampleMacros.map(macro => ({
      ...macro,
      enabled: macro.category === 'safety' ? true : false,
    }));

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div style={{ width: '700px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <Square size={16} color="hsl(43, 89%, 38%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(43, 89%, 38%)',
              fontSize: '1rem',
            }}>
              Limited Access Mode
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            Most macros are disabled. Only safety macros are available.
          </p>
        </Card>

        <MacroButtons
          macros={disabledMacros}
          onExecute={handleExecute}
          showCategories={true}
          showDescriptions={true}
          allowEdit={false}
          layout="grid"
          columns={3}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Macro buttons with some disabled based on permissions or machine state.',
      },
    },
  },
};

export const WorkshopDashboard: Story = {
  render: () => {
    const [macros, setMacros] = useState<MacroButton[]>(sampleMacros);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleExecute = async (macroId: string) => {
      console.log('Executing macro:', macroId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleEdit = (macroId: string) => {
      console.log('Edit macro:', macroId);
    };

    const handleDelete = (macroId: string) => {
      setMacros(prev => prev.filter(macro => macro.id !== macroId));
    };

    const handleAdd = () => {
      const newMacro: MacroButton = {
        id: `macro_${Date.now()}`,
        name: 'New Macro',
        description: 'Custom macro description',
        gcode: 'G00 X0 Y0 Z0',
        category: 'custom',
        enabled: true,
        estimatedTime: 5,
      };
      setMacros(prev => [...prev, newMacro]);
    };

    // Get category statistics
    const categoryStats = {
      setup: macros.filter(m => m.category === 'setup').length,
      operation: macros.filter(m => m.category === 'operation').length,
      maintenance: macros.filter(m => m.category === 'maintenance').length,
      safety: macros.filter(m => m.category === 'safety').length,
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          CNC Workshop Macros
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
          {/* Macro Statistics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Macro Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Setup:</span>
                  <Badge variant="secondary">{categoryStats.setup}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Operation:</span>
                  <Badge variant="default">{categoryStats.operation}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Maintenance:</span>
                  <Badge variant="warning">{categoryStats.maintenance}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Safety:</span>
                  <Badge variant="destructive">{categoryStats.safety}</Badge>
                </div>
              </div>
            </Card>

            {/* Quick Access */}
            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Quick Access
              </h4>
              <CompactMacroButtons
                macros={macros.filter(m => m.category === 'safety')}
                onExecute={handleExecute}
                maxButtons={3}
                showLabels={true}
              />
            </Card>
          </div>

          {/* Main Macro Interface */}
          <MacroButtons
            macros={macros}
            onExecute={handleExecute}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onSettings={() => console.log('Open macro settings')}
            showCategories={true}
            showDescriptions={true}
            allowEdit={true}
            layout="grid"
            columns={3}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete workshop macro dashboard with statistics and management interface.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    macros: sampleMacros.slice(0, 6),
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <MacroButtons
        {...args}
        onExecute={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        onSettings={() => {}}
      />
    </div>
  ),
};