import type { Meta, StoryObj } from '@storybook/react';
import { MonospaceText } from './MonospaceText';

const meta: Meta<typeof MonospaceText> = {
  title: 'Components/MonospaceText',
  component: MonospaceText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'MonospaceText component for displaying numeric, code, and coordinate values with consistent monospace styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['coordinate', 'code', 'numeric', 'gcode', 'default'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', '2xl'],
      description: 'Text size',
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places for numeric values',
    },
    unit: {
      control: 'text',
      description: 'Unit suffix to display',
    },
    highlight: {
      control: 'boolean',
      description: 'Whether to highlight the text (coordinate variant)',
    },
    children: {
      control: 'text',
      description: 'Text content',
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
      maxWidth: '400px'
    }}>
      <MonospaceText>
        Default monospace text
      </MonospaceText>
    </div>
  ),
};

export const Coordinate: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '20px' }}>X:</span>
          <MonospaceText variant="coordinate" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '20px' }}>Y:</span>
          <MonospaceText variant="coordinate" precision={3} unit="mm">
            -87.920
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '20px' }}>Z:</span>
          <MonospaceText variant="coordinate" precision={3} unit="mm" highlight>
            15.000
          </MonospaceText>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Coordinate display with precision formatting and optional highlighting',
      },
    },
  },
};

export const Code: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '500px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>
          Press <MonospaceText variant="code">Ctrl+C</MonospaceText> to copy
        </p>
        
        <p style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>
          Function: <MonospaceText variant="code">calculateMachinePosition()</MonospaceText>
        </p>
        
        <p style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>
          Port: <MonospaceText variant="code">COM3</MonospaceText>
        </p>
        
        <p style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>
          Baud Rate: <MonospaceText variant="code">115200</MonospaceText>
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code snippets and technical values with background styling',
      },
    },
  },
};

export const Numeric: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Feed Rate:</span>
          <MonospaceText variant="numeric" unit="mm/min">
            1500
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Spindle Speed:</span>
          <MonospaceText variant="numeric" unit="RPM">
            12000
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Temperature:</span>
          <MonospaceText variant="numeric" precision={1} unit="°C">
            68.5
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Tool Length:</span>
          <MonospaceText variant="numeric" precision={3} unit="mm">
            50.275
          </MonospaceText>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Numeric values with right alignment and precision formatting',
      },
    },
  },
};

export const GCode: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '500px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>1:</span>
          <MonospaceText variant="gcode">G21 G90 G17</MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>2:</span>
          <MonospaceText variant="gcode">G0 X0 Y0 Z5</MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>3:</span>
          <MonospaceText variant="gcode">M3 S12000</MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>4:</span>
          <MonospaceText variant="gcode">G1 X10 Y10 F1500</MonospaceText>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'G-code commands with specialized styling for CNC programming',
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
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>xs:</span>
          <MonospaceText variant="coordinate" size="xs" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>sm:</span>
          <MonospaceText variant="coordinate" size="sm" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>default:</span>
          <MonospaceText variant="coordinate" size="default" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>lg:</span>
          <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>xl:</span>
          <MonospaceText variant="coordinate" size="xl" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', minWidth: '40px', fontSize: '0.875rem' }}>2xl:</span>
          <MonospaceText variant="coordinate" size="2xl" precision={3} unit="mm">
            123.456
          </MonospaceText>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available text sizes for different display contexts',
      },
    },
  },
};

export const CNCMachineDisplay: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)', 
        fontSize: '1.25rem',
        fontWeight: 600
      }}>
        CNC Machine Status
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Machine Position */}
        <div style={{ 
          padding: '1rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '6px',
          border: '1px solid hsl(240, 3.7%, 25%)'
        }}>
          <h4 style={{ 
            margin: '0 0 0.75rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            Machine Position
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>X:</span>
              <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm">
                125.750
              </MonospaceText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Y:</span>
              <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm">
                -45.120
              </MonospaceText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Z:</span>
              <MonospaceText variant="coordinate" size="lg" precision={3} unit="mm" highlight>
                2.000
              </MonospaceText>
            </div>
          </div>
        </div>

        {/* Operating Parameters */}
        <div style={{ 
          padding: '1rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '6px',
          border: '1px solid hsl(240, 3.7%, 25%)'
        }}>
          <h4 style={{ 
            margin: '0 0 0.75rem 0',
            color: 'hsl(0, 0%, 98%)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            Operating Parameters
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Feed:</span>
              <MonospaceText variant="numeric" unit="mm/min">
                1500
              </MonospaceText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Spindle:</span>
              <MonospaceText variant="numeric" unit="RPM">
                12000
              </MonospaceText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Temp:</span>
              <MonospaceText variant="numeric" precision={1} unit="°C">
                68.5
              </MonospaceText>
            </div>
          </div>
        </div>
      </div>

      {/* Current G-Code */}
      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'hsl(240, 3.7%, 15.9%)',
        borderRadius: '6px',
        border: '1px solid hsl(240, 3.7%, 25%)'
      }}>
        <h4 style={{ 
          margin: '0 0 0.75rem 0',
          color: 'hsl(0, 0%, 98%)',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          Current Command
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Line 247:</span>
          <MonospaceText variant="gcode">G1 X125.75 Y-45.12 Z2.0 F1500</MonospaceText>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC machine status display showcasing all MonospaceText variants',
      },
    },
  },
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>Before (Inline Styles)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>X Position:</span>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                letterSpacing: '0.025em',
                color: 'hsl(0, 0%, 98%)'
              }}>
                125.750 mm
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>G-Code:</span>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 400,
                letterSpacing: '0.025em',
                color: 'hsl(35, 91%, 65%)',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid hsl(240, 3.7%, 25%)'
              }}>
                G0 X0 Y0
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>After (MonospaceText)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>X Position:</span>
              <MonospaceText variant="coordinate" precision={3} unit="mm">
                125.750
              </MonospaceText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>G-Code:</span>
              <MonospaceText variant="gcode">
                G0 X0 Y0
              </MonospaceText>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using MonospaceText vs inline styles',
      },
    },
  },
};