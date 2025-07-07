import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapse } from './Collapse';
import { Settings, Info, HelpCircle, Wrench, Activity } from 'lucide-react';
import { Button } from '../Button/Button';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Collapse component for hiding and showing content with smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the collapse is open (controlled)',
    },
    title: {
      control: 'text',
      description: 'Title text for the collapse header',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'bordered', 'cnc'],
      description: 'Visual variant of the collapse',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the collapse',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the expand/collapse icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapse is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '500px'
    }}>
      <Collapse title="Machine Settings">
        <div style={{ padding: '1rem 0' }}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Configure your machine parameters for optimal performance. These settings affect 
            speed, accuracy, and tool life.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="sm" variant="secondary">Open Settings</Button>
            <Button size="sm" variant="outline">Reset Defaults</Button>
          </div>
        </div>
      </Collapse>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Collapse
          </Button>
        </div>
        
        <Collapse 
          title="Controlled Collapse"
          isOpen={isOpen}
          onToggle={setIsOpen}
        >
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>
              This collapse is controlled by external state. The button above controls whether it's open or closed.
            </p>
          </div>
        </Collapse>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled collapse with external state management.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Collapse title="Default Variant" variant="default">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Default collapse styling with minimal visual treatment.
            </p>
          </div>
        </Collapse>

        <Collapse title="Ghost Variant" variant="ghost">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Ghost variant with subtle styling and muted colors.
            </p>
          </div>
        </Collapse>

        <Collapse title="Bordered Variant" variant="bordered">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Bordered variant with defined boundaries and background.
            </p>
          </div>
        </Collapse>

        <Collapse title="CNC Variant" variant="cnc">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              CNC variant with industrial styling and enhanced visual feedback.
            </p>
          </div>
        </Collapse>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the collapse component.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Collapse title="Small Size" size="sm" variant="bordered">
          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>
              Small collapse with compact padding and typography.
            </p>
          </div>
        </Collapse>

        <Collapse title="Default Size" size="default" variant="bordered">
          <div style={{ padding: '0.75rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Default collapse size with standard spacing.
            </p>
          </div>
        </Collapse>

        <Collapse title="Large Size" size="lg" variant="bordered">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '1rem' }}>
              Large collapse with generous padding and typography.
            </p>
          </div>
        </Collapse>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the collapse component.',
      },
    },
  },
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Collapse title="Icon on Left" iconPosition="left" variant="bordered">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Collapse with icon positioned on the left side of the title.
            </p>
          </div>
        </Collapse>

        <Collapse title="Icon on Right" iconPosition="right" variant="bordered">
          <div style={{ padding: '1rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Collapse with icon positioned on the right side of the title.
            </p>
          </div>
        </Collapse>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon positions for the collapse component.',
      },
    },
  },
};

export const CNCDashboard: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '700px'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
        CNC System Information
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Collapse title="Machine Status" variant="cnc" size="lg">
          <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Activity size={16} style={{ color: 'hsl(142, 76%, 36%)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Running</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                  Uptime: 8h 42m<br />
                  Jobs completed: 23
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                  Spindle: 12,000 RPM<br />
                  Feed Rate: 1,500 mm/min<br />
                  Coolant: ON
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                  X: 125.456 mm<br />
                  Y: 67.234 mm<br />
                  Z: -10.125 mm
                </div>
              </div>
            </div>
          </div>
        </Collapse>

        <Collapse title="Tool Information" variant="cnc" size="lg">
          <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Wrench size={16} style={{ color: 'hsl(262, 83%, 58%)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>T01 - 6.35mm End Mill</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                Material: Carbide<br />
                Diameter: 6.35mm<br />
                Length: 50mm
              </div>
              <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
                RPM: 12,000<br />
                Feed: 1,500 mm/min<br />
                Tool Life: 78%
              </div>
            </div>
          </div>
        </Collapse>

        <Collapse title="System Settings" variant="cnc" size="lg">
          <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Auto-cycle enabled</span>
                <div style={{ 
                  width: '2rem', 
                  height: '1rem', 
                  backgroundColor: 'hsl(142, 76%, 36%)', 
                  borderRadius: '0.5rem',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '0.125rem',
                    top: '0.125rem',
                    width: '0.75rem',
                    height: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '50%'
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Spindle warm-up</span>
                <div style={{ 
                  width: '2rem', 
                  height: '1rem', 
                  backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
                  borderRadius: '0.5rem',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '0.125rem',
                    top: '0.125rem',
                    width: '0.75rem',
                    height: '0.75rem',
                    backgroundColor: 'hsl(240, 5%, 64.9%)',
                    borderRadius: '50%'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC dashboard with multiple collapse sections containing machine information.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [openStates, setOpenStates] = useState({
      section1: false,
      section2: false,
      section3: false,
    });
    
    const [variant, setVariant] = useState<'default' | 'ghost' | 'bordered' | 'cnc'>('default');
    const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default');
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');

    const toggleSection = (section: keyof typeof openStates) => {
      setOpenStates(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
          Interactive Demo
        </h3>
        
        {/* Controls */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Variant:
              </label>
              <select 
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: 'hsl(240, 10%, 6%)',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="default">Default</option>
                <option value="ghost">Ghost</option>
                <option value="bordered">Bordered</option>
                <option value="cnc">CNC</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Size:
              </label>
              <select 
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: 'hsl(240, 10%, 6%)',
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
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Icon Position:
              </label>
              <select 
                value={iconPosition}
                onChange={(e) => setIconPosition(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: 'hsl(240, 10%, 6%)',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Actions:
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setOpenStates({ section1: true, section2: true, section3: true })}
                >
                  Open All
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setOpenStates({ section1: false, section2: false, section3: false })}
                >
                  Close All
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Collapse sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Collapse 
            title="Section 1" 
            variant={variant} 
            size={size} 
            iconPosition={iconPosition}
            isOpen={openStates.section1}
            onToggle={() => toggleSection('section1')}
          >
            <div style={{ padding: '1rem 0' }}>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                This is the content of section 1. It can contain any React elements.
              </p>
            </div>
          </Collapse>
          
          <Collapse 
            title="Section 2" 
            variant={variant} 
            size={size} 
            iconPosition={iconPosition}
            isOpen={openStates.section2}
            onToggle={() => toggleSection('section2')}
          >
            <div style={{ padding: '1rem 0' }}>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                This is the content of section 2 with different content to show variation.
              </p>
            </div>
          </Collapse>
          
          <Collapse 
            title="Section 3" 
            variant={variant} 
            size={size} 
            iconPosition={iconPosition}
            isOpen={openStates.section3}
            onToggle={() => toggleSection('section3')}
          >
            <div style={{ padding: '1rem 0' }}>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                This is the content of section 3. Each section can be controlled independently.
              </p>
            </div>
          </Collapse>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration with configurable options and controls.',
      },
    },
  },
};