import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ButtonGrid } from './ButtonGrid';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { 
  Settings, 
  Play, 
  Pause, 
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Wifi,
  Bluetooth,
  Bell,
  Shield,
  Zap,
  Power,
  Home,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Move,
  Crosshair,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

const meta: Meta<typeof ButtonGrid> = {
  title: 'Primitives/ButtonGrid',
  component: ButtonGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible grid layout component for organizing buttons in various configurations with support for icons, values, and selection states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'spacious'],
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'auto'],
    },
    responsive: {
      control: 'boolean',
    },
    buttonSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
      { label: 'Option 6' },
    ],
    columns: 3,
  },
  render: (args) => (
    <div style={{ width: '400px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
      <ButtonGrid {...args} />
    </div>
  ),
};

export const MediaControls: Story = {
  render: () => {
    const [playing, setPlaying] = useState(false);
    
    return (
      <div style={{ width: '300px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Media Controls
        </h4>
        <ButtonGrid
          columns={5}
          buttonSize="sm"
          items={[
            { label: 'Previous', icon: <SkipBack size={16} /> },
            { 
              label: playing ? 'Pause' : 'Play', 
              icon: playing ? <Pause size={16} /> : <Play size={16} />,
              onClick: () => setPlaying(!playing),
              variant: 'default'
            },
            { label: 'Stop', icon: <Square size={16} /> },
            { label: 'Next', icon: <SkipForward size={16} /> },
            { label: 'Volume', icon: <Volume2 size={16} /> },
          ]}
        />
      </div>
    );
  },
};

export const QuickSettings: Story = {
  render: () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([0, 2]);
    
    const toggleSelection = (index: number) => {
      setSelectedIndices(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };
    
    return (
      <div style={{ width: '500px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1.5rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Quick Settings
        </h4>
        <ButtonGrid
          columns={3}
          multiSelect
          selectedIndices={selectedIndices}
          onItemClick={(_, index) => toggleSelection(index)}
          items={[
            { label: 'WiFi', icon: <Wifi size={16} /> },
            { label: 'Bluetooth', icon: <Bluetooth size={16} /> },
            { label: 'Notifications', icon: <Bell size={16} /> },
            { label: 'Sound', icon: <Volume2 size={16} /> },
            { label: 'Security', icon: <Shield size={16} /> },
            { label: 'Power Save', icon: <Zap size={16} /> },
          ]}
        />
      </div>
    );
  },
};

export const JogDistanceSelector: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const distances = [0.01, 0.1, 1.0, 10.0, 100.0];
    
    return (
      <Card style={{ width: '450px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Jog Distance (mm)
        </h4>
        <ButtonGrid
          columns={5}
          responsive={false}
          buttonSize="sm"
          activeIndex={activeIndex}
          onItemClick={(_, index) => setActiveIndex(index)}
          items={distances.map(d => ({
            label: d.toString(),
            value: 'mm',
          }))}
        />
      </Card>
    );
  },
};

export const CNCJogControls: Story = {
  render: () => {
    const [activeAxis, setActiveAxis] = useState<string | null>(null);
    
    const handleJog = (axis: string, direction: string) => {
      setActiveAxis(`${axis}${direction}`);
      console.log(`Jogging ${axis} axis ${direction}`);
      setTimeout(() => setActiveAxis(null), 200);
    };
    
    return (
      <Card style={{ width: '350px' }}>
        <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Manual Jog Controls
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* XY Controls */}
          <div>
            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
              X/Y Axis
            </h5>
            <div style={{ width: '180px', margin: '0 auto' }}>
              <ButtonGrid
                columns={3}
                variant="compact"
                buttonSize="lg"
                responsive={false}
                items={[
                  { label: '', icon: <span /> }, // Empty top-left
                  { 
                    label: 'Y+', 
                    icon: <ArrowUp size={20} />,
                    onClick: () => handleJog('Y', '+'),
                    variant: activeAxis === 'Y+' ? 'default' : 'outline'
                  },
                  { label: '', icon: <span /> }, // Empty top-right
                  { 
                    label: 'X-', 
                    icon: <ArrowLeft size={20} />,
                    onClick: () => handleJog('X', '-'),
                    variant: activeAxis === 'X-' ? 'default' : 'outline'
                  },
                  { 
                    label: 'Home', 
                    icon: <Home size={20} />,
                    onClick: () => console.log('Home all axes'),
                    variant: 'secondary'
                  },
                  { 
                    label: 'X+', 
                    icon: <ArrowRight size={20} />,
                    onClick: () => handleJog('X', '+'),
                    variant: activeAxis === 'X+' ? 'default' : 'outline'
                  },
                  { label: '', icon: <span /> }, // Empty bottom-left
                  { 
                    label: 'Y-', 
                    icon: <ArrowDown size={20} />,
                    onClick: () => handleJog('Y', '-'),
                    variant: activeAxis === 'Y-' ? 'default' : 'outline'
                  },
                  { label: '', icon: <span /> }, // Empty bottom-right
                ]}
              />
            </div>
          </div>
          
          {/* Z Controls */}
          <div>
            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
              Z Axis
            </h5>
            <ButtonGrid
              columns={2}
              buttonSize="default"
              items={[
                { 
                  label: 'Z+', 
                  icon: <ArrowUp size={18} />,
                  onClick: () => handleJog('Z', '+'),
                  variant: activeAxis === 'Z+' ? 'default' : 'outline'
                },
                { 
                  label: 'Z-', 
                  icon: <ArrowDown size={18} />,
                  onClick: () => handleJog('Z', '-'),
                  variant: activeAxis === 'Z-' ? 'default' : 'outline'
                },
              ]}
            />
          </div>
          
          {/* Rotary Controls */}
          <div>
            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
              Rotary Axes
            </h5>
            <ButtonGrid
              columns={3}
              buttonSize="sm"
              items={[
                { label: 'A-', icon: <RotateCw size={16} className="rotate-180" /> },
                { label: 'B-', icon: <RotateCw size={16} className="rotate-180" /> },
                { label: 'C-', icon: <RotateCw size={16} className="rotate-180" /> },
                { label: 'A+', icon: <RotateCw size={16} /> },
                { label: 'B+', icon: <RotateCw size={16} /> },
                { label: 'C+', icon: <RotateCw size={16} /> },
              ]}
            />
          </div>
        </div>
      </Card>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '2rem',
      width: '600px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Default Spacing
        </h4>
        <ButtonGrid
          variant="default"
          columns={4}
          items={[
            { label: 'Button 1' },
            { label: 'Button 2' },
            { label: 'Button 3' },
            { label: 'Button 4' },
          ]}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Compact Spacing
        </h4>
        <ButtonGrid
          variant="compact"
          columns={4}
          items={[
            { label: 'Button 1' },
            { label: 'Button 2' },
            { label: 'Button 3' },
            { label: 'Button 4' },
          ]}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Spacious Spacing
        </h4>
        <ButtonGrid
          variant="spacious"
          columns={4}
          items={[
            { label: 'Button 1' },
            { label: 'Button 2' },
            { label: 'Button 3' },
            { label: 'Button 4' },
          ]}
        />
      </div>
    </div>
  ),
};

export const ColumnLayouts: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '2rem',
      width: '700px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      {[1, 2, 3, 4, 5, 6].map(cols => (
        <div key={cols}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
            {cols} Column{cols > 1 ? 's' : ''}
          </h4>
          <ButtonGrid
            columns={cols as any}
            responsive={false}
            buttonSize="sm"
            items={Array.from({ length: cols }, (_, i) => ({
              label: `Col ${i + 1}`,
            }))}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithValues: Story = {
  render: () => {
    const machineStats = [
      { label: 'Feed Rate', value: '1500', icon: <Move size={16} /> },
      { label: 'Spindle', value: '12000', icon: <RefreshCw size={16} /> },
      { label: 'Tool', value: 'T3', icon: <Settings size={16} /> },
      { label: 'Coolant', value: 'ON', icon: <Zap size={16} /> },
      { label: 'Program', value: 'G01', icon: <Power size={16} /> },
      { label: 'Line', value: '245', icon: <Crosshair size={16} /> },
    ];
    
    return (
      <Card style={{ width: '500px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Machine Status
        </h4>
        <ButtonGrid
          columns={3}
          buttonVariant="secondary"
          items={machineStats}
        />
      </Card>
    );
  },
};

export const MixedStates: Story = {
  render: () => {
    const items = [
      { label: 'Start', icon: <Play size={16} />, variant: 'default' as const },
      { label: 'Pause', icon: <Pause size={16} />, variant: 'secondary' as const },
      { label: 'Stop', icon: <Square size={16} />, variant: 'destructive' as const, disabled: false },
      { label: 'Settings', icon: <Settings size={16} />, variant: 'outline' as const },
      { label: 'Reset', icon: <RefreshCw size={16} />, variant: 'ghost' as const },
      { label: 'Help', icon: <Bell size={16} />, variant: 'link' as const },
      { label: 'Disabled 1', icon: <X size={16} />, disabled: true },
      { label: 'Disabled 2', icon: <Shield size={16} />, disabled: true },
      { label: 'Active', icon: <Check size={16} />, variant: 'default' as const },
    ];
    
    return (
      <Card style={{ width: '600px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Mixed Button States
        </h4>
        <ButtonGrid
          columns={3}
          items={items}
        />
      </Card>
    );
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div style={{ 
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
        Responsive Button Grid
      </h4>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
        Resize your window to see the responsive behavior
      </p>
      
      <ButtonGrid
        columns={4}
        responsive={true}
        items={[
          { label: 'Dashboard', icon: <Home size={16} /> },
          { label: 'Programs', icon: <Settings size={16} /> },
          { label: 'Tools', icon: <Move size={16} /> },
          { label: 'History', icon: <RefreshCw size={16} /> },
          { label: 'Alarms', icon: <Bell size={16} /> },
          { label: 'Settings', icon: <Settings size={16} /> },
          { label: 'Help', icon: <Shield size={16} /> },
          { label: 'Logout', icon: <Power size={16} /> },
        ]}
      />
    </div>
  ),
};

export const AutoColumns: Story = {
  render: () => (
    <div style={{ 
      width: '100%',
      maxWidth: '700px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
        Auto-fit Columns
      </h4>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
        Buttons automatically adjust to available space
      </p>
      
      <ButtonGrid
        columns="auto"
        items={[
          { label: 'Short' },
          { label: 'Medium Length' },
          { label: 'This is a very long button label' },
          { label: 'Normal' },
          { label: 'Compact' },
          { label: 'Extended Label Text' },
          { label: 'Small' },
        ]}
      />
    </div>
  ),
};

export const ComparisonStory: Story = {
  render: () => (
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
        Before vs After: ButtonGrid Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <Card>
            {/* Legacy inline implementation */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '4px',
                border: '1px solid hsl(240, 3.7%, 15.9%)',
                backgroundColor: 'transparent',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '0.875rem'
              }}>
                0.1
              </button>
              <button style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '4px',
                border: '1px solid hsl(240, 3.7%, 15.9%)',
                backgroundColor: 'hsl(262, 83%, 58%)',
                color: 'white',
                fontSize: '0.875rem'
              }}>
                1.0
              </button>
              <button style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '4px',
                border: '1px solid hsl(240, 3.7%, 15.9%)',
                backgroundColor: 'transparent',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '0.875rem'
              }}>
                10.0
              </button>
              <button style={{ 
                flex: 1, 
                padding: '0.5rem', 
                borderRadius: '4px',
                border: '1px solid hsl(240, 3.7%, 15.9%)',
                backgroundColor: 'transparent',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '0.875rem'
              }}>
                100.0
              </button>
            </div>
          </Card>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: ButtonGrid Component
          </h4>
          <Card>
            <ButtonGrid
              columns={4}
              responsive={false}
              buttonSize="sm"
              activeIndex={1}
              items={[
                { label: '0.1' },
                { label: '1.0' },
                { label: '10.0' },
                { label: '100.0' },
              ]}
            />
          </Card>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
        <h5 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Benefits:</h5>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          <li>Consistent button styling and spacing</li>
          <li>Flexible column layouts (1-6 columns or auto-fit)</li>
          <li>Built-in responsive behavior</li>
          <li>Support for icons and values</li>
          <li>Single and multi-selection support</li>
          <li>Accessibility features (tooltips, keyboard navigation)</li>
          <li>Variant support for different button states</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the ButtonGrid component vs inline implementation.',
      },
    },
  },
};