import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Progress, CircularProgress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress indicators including linear progress bars and circular progress components for CNC applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'cnc'],
      description: 'Progress bar color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Progress bar size',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    striped: {
      control: 'boolean',
      description: 'Show striped pattern',
    },
    animated: {
      control: 'boolean',
      description: 'Animate striped pattern',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Progress Stories
export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 45,
    showLabel: true,
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Default (65%)</p>
        <Progress value={65} color="default" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Primary (70%)</p>
        <Progress value={70} color="primary" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Success (80%)</p>
        <Progress value={80} color="success" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Warning (45%)</p>
        <Progress value={45} color="warning" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Error (25%)</p>
        <Progress value={25} color="error" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Info (55%)</p>
        <Progress value={55} color="info" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>CNC (90%)</p>
        <Progress value={90} color="cnc" showPercentage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different progress bar variants for various states and contexts.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Small</p>
        <Progress value={60} size="sm" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Default</p>
        <Progress value={60} size="default" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Large</p>
        <Progress value={60} size="lg" showPercentage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars in different sizes for various UI contexts.',
      },
    },
  },
};

export const StripedAndAnimated: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '400px'
    }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Default Progress</p>
        <Progress value={75} color="primary" showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Striped Progress</p>
        <Progress value={75} color="success" striped showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Animated Striped Progress</p>
        <Progress value={75} color="warning" striped animated showPercentage />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>CNC Animated Progress</p>
        <Progress value={85} color="cnc" striped animated showPercentage size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with striped patterns and animations for enhanced visual feedback.',
      },
    },
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px'
      }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Animated Progress</p>
          <Progress value={Math.round(progress)} color="primary" showPercentage striped animated />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated progress bar demonstrating smooth value transitions.',
      },
    },
  },
};

// Circular Progress Stories
export const CircularDefault: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress value={75} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic circular progress indicator.',
      },
    },
  },
};

export const CircularVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Primary</p>
        <CircularProgress value={65} color="primary" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Success</p>
        <CircularProgress value={80} color="success" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Warning</p>
        <CircularProgress value={45} color="warning" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Error</p>
        <CircularProgress value={20} color="error" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular progress indicators in different color variants.',
      },
    },
  },
};

export const CircularSizes: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Small</p>
        <CircularProgress value={70} size={80} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Default</p>
        <CircularProgress value={70} size={120} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Large</p>
        <CircularProgress value={70} size={160} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular progress indicators in different sizes.',
      },
    },
  },
};

export const CNCOperationProgress: Story = {
  render: () => {
    const [operationProgress, setOperationProgress] = useState(0);
    const [spindleLoad, setSpindleLoad] = useState(0);
    const [coolantFlow, setCoolantFlow] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setOperationProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        setSpindleLoad((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        setCoolantFlow((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      }, 200);

      return () => clearInterval(timer);
    }, []);

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        width: '500px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Operation Progress</h3>
          <Progress 
            value={operationProgress} 
            color="primary" 
            showPercentage 
            size="lg"
            striped
            animated
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
            Machining operation in progress
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress 
              value={Math.round(spindleLoad)} 
              color={spindleLoad > 80 ? "warning" : "success"}
              size={100}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 500 }}>Spindle Load</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <CircularProgress 
              value={Math.round(coolantFlow)} 
              color="primary"
              size={100}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 500 }}>Coolant Flow</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC operation monitoring with real-time progress indicators for machining operations, spindle load, and coolant flow.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [linearValue, setLinearValue] = useState(50);
    const [circularValue, setCircularValue] = useState(75);

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '400px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Interactive Progress Controls</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Linear Progress: {linearValue}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={linearValue}
              onChange={(e) => setLinearValue(Number(e.target.value))}
              style={{
                width: '100%',
                marginBottom: '0.5rem',
                accentColor: 'hsl(262, 83%, 58%)',
              }}
            />
            <Progress value={linearValue} color="primary" showPercentage />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Circular Progress: {circularValue}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={circularValue}
              onChange={(e) => setCircularValue(Number(e.target.value))}
              style={{
                width: '100%',
                marginBottom: '1rem',
                accentColor: 'hsl(262, 83%, 58%)',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress value={circularValue} color="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration allowing real-time adjustment of progress values.',
      },
    },
  },
};