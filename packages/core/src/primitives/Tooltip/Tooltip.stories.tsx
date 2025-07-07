import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, InfoTooltip, SuccessTooltip, WarningTooltip, ErrorTooltip, CNCTooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';
import { HelpCircle, Info, AlertTriangle, CheckCircle, XCircle, Settings, Zap, Power, Activity, Gauge } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltip component for providing contextual information on hover. Supports multiple positions, variants, and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip position relative to trigger',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tooltip size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'cnc'],
      description: 'Tooltip visual variant',
    },
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
    delayShow: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before showing tooltip (ms)',
    },
    delayHide: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before hiding tooltip (ms)',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show tooltip arrow',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum tooltip width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const BasicTooltip: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="This is a helpful tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip with default styling',
      },
    },
  },
};

// Position Variants
export const Positions: Story = {
  render: () => (
    <div style={{ 
      padding: '6rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '4rem',
      justifyItems: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioning in all four directions',
      },
    },
  },
};

// Variant Colors
export const Variants: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="Default tooltip" variant="default">
        <Button variant="outline">Default</Button>
      </Tooltip>
      
      <InfoTooltip content="Information tooltip">
        <Button variant="outline">Info</Button>
      </InfoTooltip>
      
      <SuccessTooltip content="Success tooltip">
        <Button variant="outline">Success</Button>
      </SuccessTooltip>
      
      <WarningTooltip content="Warning tooltip">
        <Button variant="outline">Warning</Button>
      </WarningTooltip>
      
      <ErrorTooltip content="Error tooltip">
        <Button variant="outline">Error</Button>
      </ErrorTooltip>
      
      <CNCTooltip content="CNC tooltip">
        <Button variant="outline">CNC</Button>
      </CNCTooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All tooltip color variants',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="Small tooltip" size="sm">
        <Button size="sm">Small</Button>
      </Tooltip>
      
      <Tooltip content="Default size tooltip" size="default">
        <Button>Default</Button>
      </Tooltip>
      
      <Tooltip content="Large tooltip with more content" size="lg">
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip size variants for different content amounts',
      },
    },
  },
};

// CNC Interface Examples
export const CNCInterface: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem', textAlign: 'center' }}>
          CNC Machine Control Panel
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%' }}>
          <CNCTooltip 
            content="Main power control for CNC machine. Toggle to start/stop all operations."
            position="top"
            maxWidth="180px"
          >
            <Button variant="cnc" leftIcon={<Power size={16} />}>
              Power
            </Button>
          </CNCTooltip>
          
          <InfoTooltip 
            content="Current spindle RPM: 12,000. Click to adjust speed settings."
            position="top"
          >
            <Button variant="info" leftIcon={<Activity size={16} />}>
              Spindle
            </Button>
          </InfoTooltip>
          
          <WarningTooltip 
            content="Emergency stop - immediately halts all machine operations for safety."
            position="top"
            size="lg"
          >
            <Button variant="emergency" leftIcon={<XCircle size={16} />}>
              E-Stop
            </Button>
          </WarningTooltip>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SuccessTooltip content="Machine is online and ready">
            <StatusIndicator variant="success" label="Online" />
          </SuccessTooltip>
          
          <InfoTooltip content="Current job progress: 67% complete">
            <StatusIndicator variant="info" label="Running" pulse />
          </InfoTooltip>
          
          <ErrorTooltip content="Coolant level low - refill required">
            <StatusIndicator variant="error" label="Alert" />
          </ErrorTooltip>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Tooltip 
            content="X-axis position: 125.456mm" 
            variant="cnc"
            position="bottom"
          >
            <Badge variant="bright-info">X: 125.456</Badge>
          </Tooltip>
          
          <Tooltip 
            content="Y-axis position: 67.234mm" 
            variant="cnc"
            position="bottom"
          >
            <Badge variant="bright-info">Y: 67.234</Badge>
          </Tooltip>
          
          <Tooltip 
            content="Z-axis position: -10.125mm" 
            variant="cnc"
            position="bottom"
          >
            <Badge variant="bright-info">Z: -10.125</Badge>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC machine interface with contextual tooltips for controls and status indicators',
      },
    },
  },
};

// Complex Content
export const ComplexContent: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip 
        content={
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Machine Settings</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
              • Feed Rate: 1,500 mm/min<br/>
              • Spindle Speed: 12,000 RPM<br/>
              • Tool: T01 (6.35mm)
            </div>
          </div>
        }
        variant="cnc"
        size="lg"
        maxWidth="220px"
        position="right"
      >
        <Button leftIcon={<Settings size={16} />}>
          Settings
        </Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <AlertTriangle size={14} />
              <span style={{ fontWeight: 600 }}>Warning</span>
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Temperature approaching limits
            </div>
          </div>
        }
        variant="warning"
        size="lg"
        position="left"
      >
        <Button variant="warning" leftIcon={<Gauge size={16} />}>
          Temperature
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with complex content including icons and multiple lines',
      },
    },
  },
};

// Delay Examples
export const DelayBehavior: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      gap: '2rem',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0' }}>
        Tooltip Timing Examples
      </h4>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Tooltip content="Instant tooltip" delayShow={0}>
          <Button variant="outline">Instant</Button>
        </Tooltip>
        
        <Tooltip content="Quick tooltip (200ms)" delayShow={200}>
          <Button variant="outline">Quick</Button>
        </Tooltip>
        
        <Tooltip content="Default tooltip (500ms)" delayShow={500}>
          <Button variant="outline">Default</Button>
        </Tooltip>
        
        <Tooltip content="Slow tooltip (1000ms)" delayShow={1000}>
          <Button variant="outline">Slow</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip timing behavior with different show delays',
      },
    },
  },
};

// Help Icons with Tooltips
export const HelpTooltips: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '500px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ margin: 0, color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
          Form with Help Tooltips
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem', fontWeight: 500 }}>
              Feed Rate
            </label>
            <InfoTooltip 
              content="Speed at which the cutting tool moves through the material (mm/min)"
              size="sm"
              position="right"
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'hsl(221, 83%, 53%)',
                cursor: 'help'
              }}>
                <HelpCircle size={10} color="white" />
              </div>
            </InfoTooltip>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem', fontWeight: 500 }}>
              Spindle Speed
            </label>
            <InfoTooltip 
              content="Rotational speed of the cutting tool in revolutions per minute (RPM)"
              size="sm"
              position="right"
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'hsl(221, 83%, 53%)',
                cursor: 'help'
              }}>
                <HelpCircle size={10} color="white" />
              </div>
            </InfoTooltip>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem', fontWeight: 500 }}>
              Tool Offset
            </label>
            <WarningTooltip 
              content="Critical setting - incorrect values may damage workpiece or machine"
              size="sm"
              position="right"
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'hsl(38, 92%, 50%)',
                cursor: 'help'
              }}>
                <AlertTriangle size={10} color="black" />
              </div>
            </WarningTooltip>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Help tooltips for form fields with contextual information',
      },
    },
  },
};

// No Arrow Example
export const NoArrow: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Tooltip content="Tooltip with arrow" showArrow={true}>
        <Button variant="outline">With Arrow</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button variant="outline">No Arrow</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with and without arrow indicators',
      },
    },
  },
};

// Interactive Demo
export const Interactive: Story = {
  render: () => {
    const [config, setConfig] = React.useState({
      position: 'top' as 'top' | 'right' | 'bottom' | 'left',
      size: 'default' as 'sm' | 'default' | 'lg',
      variant: 'default' as any,
      showArrow: true,
      delayShow: 500,
      content: 'Interactive tooltip content',
    });
    
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ margin: 0, color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
            Interactive Tooltip Demo
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                Position
              </label>
              <select
                value={config.position}
                onChange={(e) => setConfig(prev => ({ ...prev, position: e.target.value as any }))}
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
                <option value="top">Top</option>
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
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
                <option value="default">Default</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="cnc">CNC</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                Delay (ms)
              </label>
              <input
                type="number"
                value={config.delayShow}
                onChange={(e) => setConfig(prev => ({ ...prev, delayShow: Number(e.target.value) }))}
                min="0"
                max="2000"
                step="100"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={config.showArrow}
                onChange={(e) => setConfig(prev => ({ ...prev, showArrow: e.target.checked }))}
              />
              Show Arrow
            </label>
          </div>
          
          <div style={{ 
            padding: '4rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Tooltip
              position={config.position}
              size={config.size}
              variant={config.variant}
              showArrow={config.showArrow}
              delayShow={config.delayShow}
              content={config.content}
            >
              <Button>Hover for Tooltip</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tooltip configuration with live preview',
      },
    },
  },
};