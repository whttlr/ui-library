import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ToolSelector, CompactToolSelector, type Tool } from './ToolSelector';
import { Card, Button, Badge } from '@whttlr/ui-core';

const meta: Meta<typeof ToolSelector> = {
  title: 'CNC/Controls/ToolSelector',
  component: ToolSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tool selection component for CNC machines, allowing operators to select and view tool information including wear status and specifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    unit: {
      control: 'select',
      options: ['mm', 'inch'],
    },
    showWearIndicator: {
      control: 'boolean',
    },
    showToolInfo: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tool data
const sampleTools: Tool[] = [
  {
    id: 1,
    name: "6mm End Mill",
    type: "endmill",
    diameter: 6,
    length: 50,
    flutes: 4,
    material: "Carbide",
    coating: "TiAlN",
    wearPercentage: 35,
    timeInUse: 245,
    cutsCompleted: 1250,
    maxCuts: 5000,
  },
  {
    id: 2,
    name: "3mm Drill",
    type: "drill",
    diameter: 3,
    length: 30,
    flutes: 2,
    material: "HSS",
    wearPercentage: 65,
    timeInUse: 180,
    cutsCompleted: 800,
    maxCuts: 1200,
    notes: "For aluminum only",
  },
  {
    id: 3,
    name: "12mm Face Mill",
    type: "facemill",
    diameter: 12,
    length: 40,
    flutes: 6,
    material: "Carbide",
    coating: "AlTiN",
    wearPercentage: 85,
    timeInUse: 420,
    cutsCompleted: 2800,
    maxCuts: 3000,
    notes: "Replace soon - excessive wear",
  },
  {
    id: 4,
    name: "8mm Ball Nose",
    type: "ballnose",
    diameter: 8,
    length: 60,
    flutes: 2,
    material: "Carbide",
    wearPercentage: 15,
    timeInUse: 90,
    cutsCompleted: 450,
    maxCuts: 4000,
  },
  {
    id: 5,
    name: "45° Chamfer Mill",
    type: "chamfer",
    diameter: 10,
    length: 45,
    flutes: 4,
    material: "Carbide",
    wearPercentage: 45,
    timeInUse: 160,
  },
  {
    id: 6,
    name: "M8 Tap",
    type: "tap",
    diameter: 8,
    length: 35,
    material: "HSS",
    coating: "TiN",
    wearPercentage: 20,
    cutsCompleted: 300,
    maxCuts: 2000,
  },
];

export const Default: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(1);

    return (
      <div style={{ width: '400px' }}>
        <ToolSelector
          tools={sampleTools}
          selectedToolId={selectedToolId}
          onSelectTool={setSelectedToolId}
          onToolChange={(toolId) => {
            console.log('Tool change requested:', toolId);
          }}
        />
      </div>
    );
  },
};

export const WithoutWearIndicator: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(2);

    return (
      <div style={{ width: '400px' }}>
        <ToolSelector
          tools={sampleTools}
          selectedToolId={selectedToolId}
          onSelectTool={setSelectedToolId}
          showWearIndicator={false}
        />
      </div>
    );
  },
};

export const MinimalInfo: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(4);

    return (
      <div style={{ width: '400px' }}>
        <ToolSelector
          tools={sampleTools}
          selectedToolId={selectedToolId}
          onSelectTool={setSelectedToolId}
          showToolInfo={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool selector without detailed information display, just the selection dropdown.',
      },
    },
  },
};

export const InchUnits: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(1);

    const inchTools: Tool[] = sampleTools.map(tool => ({
      ...tool,
      diameter: Number((tool.diameter / 25.4).toFixed(4)),
      length: tool.length ? Number((tool.length / 25.4).toFixed(4)) : undefined,
    }));

    return (
      <div style={{ width: '400px' }}>
        <ToolSelector
          tools={inchTools}
          selectedToolId={selectedToolId}
          onSelectTool={setSelectedToolId}
          unit="inch"
        />
      </div>
    );
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(1);

    return (
      <div style={{ width: 'auto' }}>
        <CompactToolSelector
          tools={sampleTools}
          selectedToolId={selectedToolId}
          onSelectTool={setSelectedToolId}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact version suitable for toolbars and space-constrained layouts.',
      },
    },
  },
};

export const ToolMagazine: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(1);
    const [magazineTools, setMagazineTools] = useState<Tool[]>([
      ...sampleTools,
      {
        id: 7,
        name: "10mm Reamer",
        type: "reamer",
        diameter: 10,
        length: 55,
        flutes: 6,
        material: "Carbide",
        wearPercentage: 5,
        timeInUse: 30,
      },
      {
        id: 8,
        name: "Custom Profile",
        type: "custom",
        diameter: 15,
        length: 70,
        material: "Carbide",
        wearPercentage: 55,
        notes: "Special profile for Part A-123",
      },
    ]);

    const handleToolChange = (toolId: number) => {
      console.log('Initiating tool change to T' + toolId.toString().padStart(2, '0'));
      // Simulate tool change
      setTimeout(() => {
        setSelectedToolId(toolId);
      }, 1000);
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Tool Magazine Management
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Tool Selector */}
          <div>
            <ToolSelector
              tools={magazineTools}
              selectedToolId={selectedToolId}
              onSelectTool={setSelectedToolId}
              onToolChange={handleToolChange}
            />
          </div>

          {/* Tool Magazine Grid */}
          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Magazine Layout
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.5rem',
            }}>
              {magazineTools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedToolId === tool.id ? 'default' : 'outline'}
                  onClick={() => setSelectedToolId(tool.id)}
                  style={{ 
                    padding: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    T{tool.id.toString().padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.625rem', opacity: 0.8 }}>
                    {tool.diameter}mm
                  </span>
                  {tool.wearPercentage !== undefined && tool.wearPercentage >= 80 && (
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'hsl(0, 84.2%, 60.2%)',
                    }} />
                  )}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete tool magazine interface with visual tool layout and management.',
      },
    },
  },
};

export const ToolLifeMonitoring: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(3);

    // Tools with various wear states
    const toolsWithWear: Tool[] = [
      { ...sampleTools[0], wearPercentage: 25 },
      { ...sampleTools[1], wearPercentage: 60 },
      { ...sampleTools[2], wearPercentage: 85 },
      { ...sampleTools[3], wearPercentage: 95 },
      { ...sampleTools[4], wearPercentage: 45 },
    ];

    return (
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        width: '100%',
        maxWidth: '800px',
      }}>
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Tool Life Status
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <ToolSelector
              tools={toolsWithWear}
              selectedToolId={selectedToolId}
              onSelectTool={setSelectedToolId}
            />
            
            {/* Tool Status List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ 
                margin: '0 0 0.5rem 0', 
                color: 'hsl(0, 0%, 98%)',
                fontSize: '0.875rem',
              }}>
                All Tools Status
              </h4>
              {toolsWithWear.map((tool) => (
                <div 
                  key={tool.id}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: 'hsl(240, 10%, 12%)',
                    borderRadius: '4px',
                    border: selectedToolId === tool.id ? '1px solid hsl(262, 83%, 58%)' : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedToolId(tool.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>T{tool.id.toString().padStart(2, '0')}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{tool.name}</span>
                  </div>
                  <Badge 
                    variant={
                      tool.wearPercentage! >= 80 ? 'destructive' : 
                      tool.wearPercentage! >= 60 ? 'warning' : 
                      'success'
                    }
                  >
                    {tool.wearPercentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool life monitoring interface showing wear status for multiple tools.',
      },
    },
  },
};

export const ToolChangeSequence: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = useState<number>(1);
    const [isChanging, setIsChanging] = useState(false);
    const [changeProgress, setChangeProgress] = useState(0);

    const handleToolChange = (toolId: number) => {
      setIsChanging(true);
      setChangeProgress(0);
      
      const interval = setInterval(() => {
        setChangeProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsChanging(false);
            setSelectedToolId(toolId);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    };

    return (
      <div style={{ width: '500px' }}>
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Automatic Tool Changer
          </h3>
          
          <ToolSelector
            tools={sampleTools}
            selectedToolId={selectedToolId}
            onSelectTool={(id) => {
              if (!isChanging && id !== selectedToolId) {
                handleToolChange(id);
              }
            }}
            onToolChange={handleToolChange}
            disabled={isChanging}
          />
          
          {isChanging && (
            <div style={{ 
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'hsl(240, 10%, 12%)',
              borderRadius: '6px',
              border: '1px solid hsl(240, 3.7%, 15.9%)',
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                  Tool Change in Progress...
                </span>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  color: 'hsl(142, 76%, 36%)',
                }}>
                  {changeProgress}%
                </span>
              </div>
              <div style={{ 
                height: '8px',
                backgroundColor: 'hsl(240, 10%, 8%)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{ 
                  height: '100%',
                  width: `${changeProgress}%`,
                  backgroundColor: 'hsl(262, 83%, 58%)',
                  transition: 'width 0.2s ease',
                }} />
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulated automatic tool change sequence with progress indicator.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    tools: sampleTools,
    selectedToolId: 1,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ToolSelector {...args} onSelectTool={() => {}} />
    </div>
  ),
};