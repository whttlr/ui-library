import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Settings, Info, HelpCircle, User, Wrench, Activity } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Popover component for displaying contextual information and controls with flexible positioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    triggerType: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How the popover is triggered',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Popover placement relative to trigger',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Popover Stories
export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Popover
        trigger={<Button>Click me</Button>}
        content={
          <div style={{ padding: '0.75rem' }}>
            <p>This is a basic popover with some content.</p>
          </div>
        }
      />
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Popover
        trigger={<Button>Hover me</Button>}
        content={
          <div style={{ padding: '0.75rem' }}>
            <p>Popover with arrow indicator</p>
          </div>
        }
        triggerType="hover"
        arrow
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover with arrow indicator and hover trigger.',
      },
    },
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ 
      padding: '4rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <Popover
        trigger={<Button size="sm">Top</Button>}
        content={<div style={{ padding: '0.75rem' }}>Top placement</div>}
        placement="top"
        arrow
      />
      <Popover
        trigger={<Button size="sm">Top Start</Button>}
        content={<div style={{ padding: '0.75rem' }}>Top start placement</div>}
        placement="top-start"
        arrow
      />
      <Popover
        trigger={<Button size="sm">Top End</Button>}
        content={<div style={{ padding: '0.75rem' }}>Top end placement</div>}
        placement="top-end"
        arrow
      />
      
      <Popover
        trigger={<Button size="sm">Left</Button>}
        content={<div style={{ padding: '0.75rem' }}>Left placement</div>}
        placement="left"
        arrow
      />
      <Popover
        trigger={<Button size="sm">Center</Button>}
        content={<div style={{ padding: '0.75rem' }}>Default placement</div>}
        arrow
      />
      <Popover
        trigger={<Button size="sm">Right</Button>}
        content={<div style={{ padding: '0.75rem' }}>Right placement</div>}
        placement="right"
        arrow
      />
      
      <Popover
        trigger={<Button size="sm">Bottom</Button>}
        content={<div style={{ padding: '0.75rem' }}>Bottom placement</div>}
        placement="bottom"
        arrow
      />
      <Popover
        trigger={<Button size="sm">Bottom Start</Button>}
        content={<div style={{ padding: '0.75rem' }}>Bottom start placement</div>}
        placement="bottom-start"
        arrow
      />
      <Popover
        trigger={<Button size="sm">Bottom End</Button>}
        content={<div style={{ padding: '0.75rem' }}>Bottom end placement</div>}
        placement="bottom-end"
        arrow
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popover placement options relative to the trigger element.',
      },
    },
  },
};

export const RichContent: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <Popover
        trigger={
          <Button variant="secondary" iconl={<User size={16} />}>
            User Info
          </Button>
        }
        content={
          <div style={{ padding: '1rem', width: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: 'hsl(262, 83%, 58%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={20} color="white" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>John Operator</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>CNC Operator</p>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Shift: Day (6AM - 2PM)</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>Experience: 5 years</p>
              <p style={{ margin: 0 }}>Certification: Level 3</p>
            </div>
          </div>
        }
        placement="bottom-start"
        arrow
      />
      
      <Popover
        trigger={
          <Button variant="secondary" iconl={<Settings size={16} />}>
            Settings
          </Button>
        }
        content={
          <div style={{ padding: '1rem', width: '200px' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Quick Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <input type="checkbox" defaultChecked />
                Auto-refresh data
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <input type="checkbox" />
                Sound alerts
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <input type="checkbox" defaultChecked />
                Show tooltips
              </label>
            </div>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid hsl(240, 3.7%, 15.9%)' }}>
              <Button size="sm" style={{ width: '100%' }}>Apply Changes</Button>
            </div>
          </div>
        }
        placement="bottom-end"
        arrow
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popovers with rich content including user profiles and settings panels.',
      },
    },
  },
};

export const CNCMachineInfo: Story = {
  render: () => (
    <div style={{ 
      padding: '3rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <Popover
        trigger={
          <Button variant="secondary" iconl={<Wrench size={16} />}>
            Tool Info
          </Button>
        }
        content={
          <div style={{ padding: '1rem', width: '280px' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Current Tool</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Tool #:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>T01</span>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Diameter:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>6.35mm</span>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Type:</span>
                <span style={{ marginLeft: '0.5rem' }}>End Mill</span>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Material:</span>
                <span style={{ marginLeft: '0.5rem' }}>Carbide</span>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>RPM:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>12,000</span>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Feed:</span>
                <span style={{ marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>1,500</span>
              </div>
            </div>
            <div style={{ 
              marginTop: '0.75rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid hsl(240, 3.7%, 15.9%)',
              fontSize: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Tool Life:</span>
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
        }
        placement="bottom"
        arrow
      />
      
      <Popover
        trigger={
          <Button variant="secondary" iconl={<Activity size={16} />}>
            Machine Status
          </Button>
        }
        content={
          <div style={{ padding: '1rem', width: '250px' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Machine Health</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Spindle Load:</span>
                  <span style={{ color: 'hsl(142, 76%, 36%)' }}>Normal (65%)</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '65%', 
                    height: '100%', 
                    backgroundColor: 'hsl(142, 76%, 36%)',
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Temperature:</span>
                  <span style={{ color: 'hsl(48, 96%, 53%)' }}>Warm (45°C)</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '75%', 
                    height: '100%', 
                    backgroundColor: 'hsl(48, 96%, 53%)',
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Vibration:</span>
                  <span style={{ color: 'hsl(142, 76%, 36%)' }}>Low</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: 'hsl(240, 3.7%, 15.9%)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '25%', 
                    height: '100%', 
                    backgroundColor: 'hsl(142, 76%, 36%)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        }
        placement="bottom"
        arrow
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific popovers showing tool information and machine status with progress indicators.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option1');

    return (
      <div style={{ 
        padding: '3rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Popover
          trigger={
            <Button variant={isVisible ? "default" : "secondary"} iconl={<Info size={16} />}>
              Interactive Demo
            </Button>
          }
          content={
            <div style={{ padding: '1rem', width: '300px' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Interactive Content</h4>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 500 }}>
                  Select an option:
                </label>
                <select 
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid hsl(240, 3.7%, 15.9%)',
                    backgroundColor: '#18181a',
                    color: 'hsl(0, 0%, 98%)',
                    fontSize: '0.75rem'
                  }}
                >
                  <option value="option1">First Option</option>
                  <option value="option2">Second Option</option>
                  <option value="option3">Third Option</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: 'hsl(240, 5%, 64.9%)' }}>
                  Selected: <span style={{ fontWeight: 500 }}>{selectedOption}</span>
                </p>
                <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
                  Popover visible: <span style={{ fontWeight: 500 }}>{isVisible ? 'Yes' : 'No'}</span>
                </p>
              </div>
              
              <Button 
                size="sm" 
                onClick={() => setIsVisible(!isVisible)}
                style={{ width: '100%' }}
              >
                Toggle State
              </Button>
            </div>
          }
          onVisibilityChange={setIsVisible}
          placement="bottom"
          arrow
        />
        
        <Popover
          trigger={
            <Button variant="secondary" iconl={<HelpCircle size={16} />}>
              Help
            </Button>
          }
          content={
            <div style={{ padding: '1rem', width: '220px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Quick Help</h4>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.75rem', lineHeight: 1.4 }}>
                This popover demonstrates interactive content and state management.
              </p>
              <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
                <p style={{ margin: '0 0 0.25rem 0' }}>• Click buttons to interact</p>
                <p style={{ margin: '0 0 0.25rem 0' }}>• Select different options</p>
                <p style={{ margin: 0 }}>• Watch state changes</p>
              </div>
            </div>
          }
          triggerType="hover"
          placement="left"
          arrow
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive popover demonstration with state management and form controls.',
      },
    },
  },
};