import type { Meta, StoryObj } from '@storybook/react';
import { JogControls } from './JogControls';
import { useState } from 'react';

const meta: Meta<typeof JogControls> = {
  title: 'CNC/Controls/JogControls',
  component: JogControls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Manual jog controls for CNC machine positioning. Provides directional movement controls for X, Y, and Z axes with configurable step sizes and feed rates.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onJog: {
      action: 'jog',
      description: 'Callback for jog movement',
    },
    onHome: {
      action: 'home',
      description: 'Callback for homing operation',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether jog controls are disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic setup
export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Jog controls when disabled - all buttons should be disabled',
      },
    },
  },
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    disabled: false,
    className: 'custom-jog-controls',
  },
  parameters: {
    docs: {
      description: {
        story: 'Jog controls with custom CSS class applied',
      },
    },
  },
};

// Interactive example with state
export const Interactive: Story = {
  render: () => {
    const [disabled, setDisabled] = useState(false);

    const handleJog = (axis: 'X' | 'Y' | 'Z', direction: number) => {
      console.log(`Jogging ${axis} axis in direction ${direction}`);
    };

    const handleHome = () => {
      console.log('Homing machine');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          padding: '1rem', 
          border: '1px solid hsl(240, 3.7%, 15.9%)', 
          borderRadius: '6px', 
          backgroundColor: 'hsl(240, 10%, 8%)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              style={{ accentColor: 'hsl(262, 83%, 58%)' }}
            />
            Disabled
          </label>
        </div>

        <JogControls
          onJog={handleJog}
          onHome={handleHome}
          disabled={disabled}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive jog controls with working controls and state management',
      },
    },
  },
};

// Showcase different states
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Enabled
        </h4>
        <JogControls
          disabled={false}
          onJog={() => {}}
          onHome={() => {}}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Disabled
        </h4>
        <JogControls
          disabled={true}
          onJog={() => {}}
          onHome={() => {}}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of jog controls in different states',
      },
    },
  },
};