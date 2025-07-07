import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion, AccordionItemProps } from './Accordion';
import { Settings, Info, HelpCircle, Wrench, Activity, AlertTriangle } from 'lucide-react';
import { Button } from '../Button/Button';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accordion component for organizing content in collapsible sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open simultaneously',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'bordered', 'cnc'],
      description: 'Visual variant of the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const basicItems: AccordionItemProps[] = [
  {
    id: '1',
    title: 'Getting Started',
    content: (
      <div>
        <p>Welcome to the CNC control system. This section covers the basics of getting started with your machine.</p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Initial setup and calibration</li>
          <li>Loading your first job</li>
          <li>Basic safety procedures</li>
        </ul>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Machine Configuration',
    content: (
      <div>
        <p>Configure your machine settings for optimal performance.</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button size="sm" variant="secondary">Open Settings</Button>
          <Button size="sm" variant="outline">Reset to Default</Button>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Troubleshooting',
    content: (
      <div>
        <p>Common issues and solutions:</p>
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Issue:</strong> Spindle not starting
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Solution:</strong> Check emergency stop and spindle enable switches
          </div>
        </div>
      </div>
    ),
  },
];

const cncItems: AccordionItemProps[] = [
  {
    id: 'machine-status',
    title: 'Machine Status',
    content: (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Activity size={16} style={{ color: 'hsl(142, 76%, 36%)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Status: Running</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Spindle: 12,000 RPM<br />
              Feed Rate: 1,500 mm/min<br />
              Position: X125.456 Y67.234 Z-10.125
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Current Job: Aluminum Bracket v2.1<br />
              Progress: 67%<br />
              Est. Remaining: 1h 23m
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tool-info',
    title: 'Tool Information',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Wrench size={16} style={{ color: 'hsl(262, 83%, 58%)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Current Tool: T01 - 6.35mm End Mill</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.75rem' }}>
          <div>Material: Carbide</div>
          <div>RPM: 12,000</div>
          <div>Diameter: 6.35mm</div>
          <div>Tool Life: 78%</div>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
            <span>Tool Life:</span>
            <span>78% remaining</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '78%', 
              height: '100%', 
              backgroundColor: 'hsl(142, 76%, 36%)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'alerts',
    title: 'System Alerts',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <AlertTriangle size={16} style={{ color: 'hsl(48, 96%, 53%)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(48, 96%, 53%)' }}>
            1 Warning
          </span>
        </div>
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: 'hsl(48, 96%, 53% / 0.1)', 
          border: '1px solid hsl(48, 96%, 53%)',
          borderRadius: '4px',
          fontSize: '0.75rem'
        }}>
          <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Coolant Level Low</div>
          <div>Coolant tank is at 15%. Refill recommended before next job.</div>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Accordion items={basicItems} />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
        Multiple Open Items
      </h3>
      <Accordion items={basicItems} multiple defaultOpen={['1', '2']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Allow multiple accordion items to be open simultaneously.',
      },
    },
  },
};

export const Ghost: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
        Ghost Variant
      </h3>
      <Accordion items={basicItems} variant="ghost" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal styling with no background or borders.',
      },
    },
  },
};

export const Bordered: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
        Bordered Variant
      </h3>
      <Accordion items={basicItems} variant="bordered" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Emphasized borders for better visual separation.',
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
        CNC Machine Dashboard
      </h3>
      <Accordion items={cncItems} variant="cnc" defaultOpen={['machine-status']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific styling with enhanced visual feedback and machine data.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['1']);
    const [multiple, setMultiple] = useState(false);
    const [variant, setVariant] = useState<'default' | 'ghost' | 'bordered' | 'cnc'>('default');

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '700px'
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
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={multiple}
                onChange={(e) => setMultiple(e.target.checked)}
              />
              Multiple Open
            </label>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Variant:
              </label>
              <select 
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                style={{
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
          </div>
          
          <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
            Currently open: {openItems.join(', ') || 'None'}
          </div>
        </div>
        
        <Accordion 
          items={basicItems} 
          multiple={multiple}
          variant={variant}
          defaultOpen={openItems}
          onOpenChange={setOpenItems}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration with configurable options.',
      },
    },
  },
};