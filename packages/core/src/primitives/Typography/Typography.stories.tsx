import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography, H1, H2, H3, H4, H5, H6, Body, Caption, Link, Monospace } from './Typography';
import { Card } from '../Card/Card';
import { Stack } from '../Grid/Grid';

const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Typography component for consistent text styling across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'button', 'link', 'monospace'],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'cnc', 'muted', 'accent'],
      description: 'Text color variant',
    },
    gradient: {
      control: 'boolean',
      description: 'Apply gradient text effect',
    },
    strikethrough: {
      control: 'boolean',
      description: 'Apply strikethrough decoration',
    },
    bold: {
      control: 'boolean',
      description: 'Apply bold font weight',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Typography Scale
export const TypographyScale: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '900px',
      minWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <H1 gradient>UI Component Demo</H1>
          <div style={{ marginTop: '0.5rem' }}>
            <Caption>Showcasing the new modern component library with Luro AI design</Caption>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <H1>Heading 1 - Main Title</H1>
          <H2>Heading 2 - Section Title</H2>
          <H3>Heading 3 - Subsection</H3>
          <H4>Heading 4 - Component Title</H4>
          <H5>Heading 5 - Feature Title</H5>
          <H6>Heading 6 - Detail Title</H6>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Body>
            Body text is used for regular content and paragraphs. It should be easy to read 
            and provide good contrast against the background. This is the primary text style 
            for most content in the application.
          </Body>
          <Caption>Caption text is smaller and used for supplementary information, metadata, or footnotes.</Caption>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="#" onClick={(e) => e.preventDefault()}>This is a link element</Link>
          <Monospace>console.log('This is monospace text for code')</Monospace>
          <Body strikethrough>This text has strikethrough decoration</Body>
          <Body bold>This text is bold for emphasis</Body>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete typography scale showing all heading levels and text variants.',
      },
    },
  },
};

// Heading Variants
export const Headings: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Stack spacing="lg">
        <H1>Machine Control Dashboard</H1>
        <H2>Position Monitoring</H2>
        <H3>Current Coordinates</H3>
        <H4>X-Axis Position</H4>
        <H5>Precision Settings</H5>
        <H6>Calibration Data</H6>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading hierarchy for CNC application interfaces.',
      },
    },
  },
};

// Gradient Text
export const GradientText: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center'
    }}>
      <Stack spacing="lg">
        <H1 gradient>CNC Control Interface</H1>
        <H2 gradient>Advanced Manufacturing</H2>
        <H3 gradient>Precision Engineering</H3>
        <Body>
          Gradient text adds visual interest to important headings and branding elements.
        </Body>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gradient text effects for emphasis and branding.',
      },
    },
  },
};

// Gradient Variants
export const GradientVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <H2>Gradient Typography Variants</H2>
          <Caption style={{ marginTop: '0.5rem' }}>
            Multiple gradient options inspired by the original UI demo designs
          </Caption>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <H6 style={{ marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Primary & Brand</H6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <H2 gradient="primary">Primary Gradient</H2>
                <H3 gradient>Default Gradient</H3>
              </div>
            </div>
            
            <div>
              <H6 style={{ marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Cool Tones</H6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <H2 gradient="blue">Blue Gradient</H2>
                <H2 gradient="cyan">Cyan Gradient</H2>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <H6 style={{ marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Warm Tones</H6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <H2 gradient="orange">Orange Gradient</H2>
                <H2 gradient="pink">Pink Gradient</H2>
              </div>
            </div>
            
            <div>
              <H6 style={{ marginBottom: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Nature</H6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <H2 gradient="green">Green Gradient</H2>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '1rem',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid hsl(240, 3.7%, 15.9%)',
          backgroundColor: 'hsl(240, 10%, 6%)'
        }}>
          <H3 style={{ marginBottom: '1rem' }}>CNC Application Examples</H3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <H1 gradient="blue" style={{ textAlign: 'center' }}>Machine Control Dashboard</H1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <H4 gradient="green">System Ready</H4>
              <H4 gradient="orange">Tool Change</H4>
              <H4 gradient="pink">Precision Mode</H4>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available gradient variants for headlines and emphasis text, perfect for modern CNC interfaces',
      },
    },
  },
};

// Text Colors
export const TextColors: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '900px',
      minWidth: '700px'
    }}>
      <H3 style={{ marginBottom: '2rem' }}>Text Color Palette</H3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <H6>Primary Colors</H6>
            <Body style={{ color: 'hsl(0, 0%, 98%)' }}>Primary text - hsl(0, 0%, 98%)</Body>
            <Body style={{ color: 'hsl(240, 5%, 64.9%)' }}>Secondary text - hsl(240, 5%, 64.9%)</Body>
            <Body style={{ color: 'hsl(240, 3.7%, 15.9%)' }}>Muted text - hsl(240, 3.7%, 15.9%)</Body>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <H6>Semantic Colors</H6>
            <Body style={{ color: 'hsl(142, 76%, 36%)' }}>Success - hsl(142, 76%, 36%)</Body>
            <Body style={{ color: 'hsl(48, 96%, 53%)' }}>Warning - hsl(48, 96%, 53%)</Body>
            <Body style={{ color: 'hsl(0, 84.2%, 60.2%)' }}>Error - hsl(0, 84.2%, 60.2%)</Body>
            <Body style={{ color: 'hsl(217, 91%, 60%)' }}>Info - hsl(217, 91%, 60%)</Body>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <H6>Brand Colors</H6>
            <Body style={{ color: 'hsl(262, 83%, 58%)' }}>Primary brand - hsl(262, 83%, 58%)</Body>
            <Body style={{ color: 'hsl(262, 83%, 75%)' }}>Light brand - hsl(262, 83%, 75%)</Body>
            <Body style={{ color: 'hsl(256, 42%, 25%)' }}>Dark brand - hsl(256, 42%, 25%)</Body>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <H6>CNC-Specific Colors</H6>
            <Body style={{ color: '#4ade80' }}>X-Axis - #4ade80</Body>
            <Body style={{ color: '#60a5fa' }}>Y-Axis - #60a5fa</Body>
            <Body style={{ color: '#fbbf24' }}>Z-Axis - #fbbf24</Body>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color palette for text elements in the design system.',
      },
    },
  },
};

// Code and Monospace
export const CodeAndMonospace: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Stack spacing="lg">
        <H3>Code and Monospace Text</H3>
        
        <Stack spacing="md">
          <div>
            <H6>Coordinate Values</H6>
            <Monospace>X: 125.456</Monospace>
            <Monospace>Y: 67.234</Monospace>
            <Monospace>Z: -10.125</Monospace>
          </div>
          
          <div>
            <H6>G-Code Commands</H6>
            <Monospace>G01 X10.5 Y20.3 F1500</Monospace>
            <Monospace>M03 S12000</Monospace>
            <Monospace>G00 Z5.0</Monospace>
          </div>
          
          <div>
            <H6>Machine Parameters</H6>
            <Monospace>RPM: 12,000</Monospace>
            <Monospace>Feed: 1,500 mm/min</Monospace>
            <Monospace>Tool: T01 (6.35mm)</Monospace>
          </div>
        </Stack>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Monospace text for coordinates, G-code, and technical data.',
      },
    },
  },
};

// Text Decorations
export const TextDecorations: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Stack spacing="lg">
        <H3>Text Decorations and Emphasis</H3>
        
        <Stack spacing="md">
          <Body>This is regular body text</Body>
          <Body bold>This is bold text for emphasis</Body>
          <Body strikethrough>This is strikethrough text</Body>
          <Link href="#" onClick={(e) => e.preventDefault()}>This is a link</Link>
          <Typography variant="button">BUTTON TEXT</Typography>
        </Stack>
        
        <Stack spacing="md">
          <Body>
            You can combine decorations: <Typography as="span" bold>bold text</Typography> and{' '}
            <Typography as="span" strikethrough>strikethrough text</Typography> in the same paragraph.
          </Body>
          
          <Body>
            Technical data often uses <Monospace as="span">monospace inline</Monospace> within regular text.
          </Body>
        </Stack>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various text decorations and emphasis styles.',
      },
    },
  },
};

// Paragraph Layouts
export const ParagraphLayouts: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px',
      minWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <H2>CNC Machine Operation Guide</H2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <H3>Getting Started</H3>
          <Body>
            Before operating the CNC machine, ensure all safety protocols are in place. 
            Check that the emergency stop button is easily accessible and that all 
            protective guards are properly installed.
          </Body>
          
          <div style={{ marginTop: '1rem' }}>
            <H4>Safety Checklist</H4>
            <Body style={{ marginTop: '0.5rem' }}>
              1. Verify machine is in a safe state<br/>
              2. Check tool installation and condition<br/>
              3. Ensure work piece is properly secured<br/>
              4. Confirm coolant levels are adequate
            </Body>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <H4>Machine Coordinates</H4>
            <Body style={{ marginTop: '0.5rem' }}>
              The machine uses a standard Cartesian coordinate system where:
            </Body>
            <Body style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
              • <strong>X-axis</strong>: Left/Right movement (horizontal)<br/>
              • <strong>Y-axis</strong>: Forward/Backward movement (horizontal)<br/>
              • <strong>Z-axis</strong>: Up/Down movement (vertical)
            </Body>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <H4>Operating Procedures</H4>
            <Body style={{ marginTop: '0.5rem' }}>
              Always start with a dry run to verify the tool path before beginning actual 
              machining operations. Monitor the machine closely during the first few 
              operations to ensure everything is functioning correctly.
            </Body>
          </div>
          
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid hsl(240, 3.7%, 15.9%)' }}>
            <Caption>
              Last updated: March 2024 | Version 2.1 | For technical support, contact the engineering team.
            </Caption>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete document layout example with headers, paragraphs, and formatting.',
      },
    },
  },
};

// Interactive Demo
export const Interactive: Story = {
  render: () => {
    const [variant, setVariant] = React.useState<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'button' | 'link' | 'monospace'>('h1');
    const [color, setColor] = React.useState<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'cnc' | 'muted' | 'accent'>('default');
    const [gradient, setGradient] = React.useState(false);
    const [strikethrough, setStrikethrough] = React.useState(false);
    const [bold, setBold] = React.useState(false);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Stack spacing="lg">
          <H3>Interactive Typography Demo</H3>
          
          <Card style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)' }}>
            <Stack spacing="md">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Variant
                </label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
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
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                  <option value="h5">Heading 5</option>
                  <option value="h6">Heading 6</option>
                  <option value="body">Body</option>
                  <option value="caption">Caption</option>
                  <option value="button">Button</option>
                  <option value="link">Link</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  Color
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as any)}
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
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="info">Info</option>
                  <option value="cnc">CNC</option>
                  <option value="muted">Muted</option>
                  <option value="accent">Accent</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={gradient}
                    onChange={(e) => setGradient(e.target.checked)}
                  />
                  Gradient
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={strikethrough}
                    onChange={(e) => setStrikethrough(e.target.checked)}
                  />
                  Strikethrough
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={bold}
                    onChange={(e) => setBold(e.target.checked)}
                  />
                  Bold
                </label>
              </div>
            </Stack>
          </Card>
          
          <div style={{ 
            padding: '2rem',
            backgroundColor: 'hsl(240, 3.7%, 15.9%)',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <Typography
              variant={variant}
              color={color}
              gradient={gradient}
              strikethrough={strikethrough}
              bold={bold}
            >
              Sample Typography Text
            </Typography>
          </div>
        </Stack>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive typography configuration with live preview.',
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Typography variant="h3" style={{ marginBottom: '1.5rem' }}>
        Typography Color System
      </Typography>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Default:</Typography>
          <Typography color="default">System operational and ready for use</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Primary:</Typography>
          <Typography color="primary">CNC system status indicator</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Secondary:</Typography>
          <Typography color="secondary">Additional system information</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Success:</Typography>
          <Typography color="success">Operation completed successfully</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Warning:</Typography>
          <Typography color="warning">Coolant level requires attention</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Error:</Typography>
          <Typography color="error">Critical system error detected</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Info:</Typography>
          <Typography color="info">Informational system message</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">CNC:</Typography>
          <Typography color="cnc">Industrial CNC system alert</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Muted:</Typography>
          <Typography color="muted">Subdued informational text</Typography>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
          <Typography variant="caption" color="muted">Accent:</Typography>
          <Typography color="accent">Highlighted accent information</Typography>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography color variants for semantic text styling',
      },
    },
  },
};