import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grid, GridItem, DashboardGrid, ControlGrid, JogGrid, Flex, Stack } from './Grid';
import { Container } from '../Container/Container';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Progress } from '../Progress/Progress';
import { Monitor, Cpu, Activity, Gauge, Play, Square, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Layout components including Grid, Flex, Container, and Stack for organizing UI elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Number of grid columns',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Grid gap size',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Card Component for demos
const DemoCard: React.FC<{ title: string; content?: string; color?: string; height?: string }> = ({ 
  title, 
  content = 'Sample content', 
  color = 'hsl(240, 3.7%, 15.9%)',
  height = 'auto'
}) => {
  // Use white text for all content when on colored backgrounds
  const isColorfulBackground = color !== 'hsl(240, 3.7%, 15.9%)';
  const contentColor = isColorfulBackground ? 'rgba(255, 255, 255, 0.9)' : 'hsl(240, 5%, 64.9%)';
  
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: color,
      borderRadius: '6px',
      border: '1px solid hsl(240, 3.7%, 15.9%)',
      color: 'hsl(0, 0%, 98%)',
      height: height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.75rem', color: contentColor }}>{content}</p>
    </div>
  );
};

// Basic Grid Stories
export const BasicGrid: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%',
      maxWidth: '800px'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Basic Grid Layouts</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>3 Column Grid</h4>
        <Grid cols={3} gap="md">
          <DemoCard title="Column 1" />
          <DemoCard title="Column 2" />
          <DemoCard title="Column 3" />
        </Grid>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>4 Column Grid with Responsive</h4>
        <Grid cols={4} gap="lg" responsive>
          <DemoCard title="Item 1" />
          <DemoCard title="Item 2" />
          <DemoCard title="Item 3" />
          <DemoCard title="Item 4" />
        </Grid>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Grid with Spanning Items</h4>
        <Grid cols={6} gap="md">
          <GridItem colSpan={2}>
            <DemoCard title="Span 2" color="hsl(262, 83%, 58%)" />
          </GridItem>
          <GridItem colSpan={4}>
            <DemoCard title="Span 4" color="hsl(142, 76%, 36%)" />
          </GridItem>
          <GridItem colSpan={3}>
            <DemoCard title="Span 3" color="hsl(48, 96%, 53%)" />
          </GridItem>
          <GridItem colSpan={3}>
            <DemoCard title="Span 3" color="hsl(0, 84.2%, 60.2%)" />
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic grid layouts with different column counts and spanning items.',
      },
    },
  },
};

export const CNCDashboard: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%',
      maxWidth: '1200px'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>CNC Dashboard Layout</h3>
      
      <DashboardGrid cols={4} gap="lg">
        <GridItem colSpan={2}>
          <Card style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Monitor size={24} />
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Machine Status</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Badge variant="success">Running</Badge>
              <span style={{ fontSize: '0.875rem' }}>Operation 2 of 3</span>
            </div>
            <Progress value={67} variant="primary" />
          </Card>
        </GridItem>
        
        <GridItem>
          <Card style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Cpu size={20} />
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Spindle Load</h4>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'hsl(142, 76%, 36%)', marginBottom: '0.5rem' }}>
                65%
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Normal Range</p>
            </div>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Activity size={20} />
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Feed Rate</h4>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', marginBottom: '0.5rem' }}>
                1,250
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>mm/min</p>
            </div>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Current Position</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.25rem' }}>X</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>125.456</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.25rem' }}>Y</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>67.234</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)', marginBottom: '0.25rem' }}>Z</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>-10.125</div>
              </div>
            </div>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Quick Controls</h4>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Button variant="secondary" size="sm">
                <Play size={16} style={{ marginRight: '0.5rem' }} />
                Start
              </Button>
              <Button variant="secondary" size="sm">
                <Square size={16} style={{ marginRight: '0.5rem' }} />
                Pause
              </Button>
              <Button variant="destructive" size="sm">
                Emergency Stop
              </Button>
            </div>
          </Card>
        </GridItem>
      </DashboardGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC dashboard layout using DashboardGrid with machine status, controls, and monitoring.',
      },
    },
  },
};

export const JogControlLayout: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>
          CNC Jog Control Layout
        </h3>
        
        {/* XY Movement Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
            XY Movement
          </h4>
          <JogGrid cols={3} gap="sm">
            <div></div>
            <Button variant="cnc" size="icon" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              <ArrowUp size={16} />
            </Button>
            <div></div>
            
            <Button variant="cnc" size="icon" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              <ArrowLeft size={16} />
            </Button>
            <Button variant="cnc" size="icon" style={{ backgroundColor: 'hsl(142, 76%, 36%)', borderColor: 'hsl(142, 76%, 36%)' }}>
              Home
            </Button>
            <Button variant="cnc" size="icon" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              <ArrowRight size={16} />
            </Button>
            
            <div></div>
            <Button variant="cnc" size="icon" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              <ArrowDown size={16} />
            </Button>
            <div></div>
          </JogGrid>
        </div>

        {/* Z Movement Section */}
        <div>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(240, 5%, 64.9%)' }}>
            Z Movement
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <Button variant="cnc" size="sm" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              Z+
            </Button>
            <Button variant="cnc" size="sm" style={{ backgroundColor: 'hsl(217, 91%, 60%)', borderColor: 'hsl(217, 91%, 60%)' }}>
              Z-
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Jog control layout using JogGrid for CNC machine positioning controls.',
      },
    },
  },
};

export const FlexLayouts: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%',
      maxWidth: '800px'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Flex Layouts</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Horizontal Flex</h4>
        <Flex direction="row" justify="between" align="center" gap="md" style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
          <DemoCard title="Left" height="80px" />
          <DemoCard title="Center" height="60px" />
          <DemoCard title="Right" height="80px" />
        </Flex>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Vertical Stack</h4>
        <Flex direction="column" gap="md" style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
          <DemoCard title="Top" />
          <DemoCard title="Middle" />
          <DemoCard title="Bottom" />
        </Flex>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Flex Wrap</h4>
        <Flex direction="row" wrap gap="md" style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ minWidth: '120px' }}>
              <DemoCard title={`Item ${i + 1}`} />
            </div>
          ))}
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flex layout examples with different directions, alignment, and wrapping.',
      },
    },
  },
};

export const ContainerSizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, textAlign: 'center' }}>
        Container Sizes
      </h3>
      
      <Stack spacing="lg">
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Small Container</h4>
          <Container size="sm" style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
            <DemoCard title="Small Container Content" content="max-width: 384px" />
          </Container>
        </div>

        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Medium Container</h4>
          <Container size="md" style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
            <DemoCard title="Medium Container Content" content="max-width: 448px" />
          </Container>
        </div>

        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }}>Large Container</h4>
          <Container size="lg" style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
            <DemoCard title="Large Container Content" content="max-width: 896px" />
          </Container>
        </div>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container components with different maximum width sizes.',
      },
    },
  },
};

export const StackComponent: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%',
      maxWidth: '600px'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Stack Components</h3>
      
      <Grid cols={2} gap="lg">
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Default Stack</h4>
          <div style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
            <Stack spacing="md">
              <DemoCard title="Stack Item 1" />
              <DemoCard title="Stack Item 2" />
              <DemoCard title="Stack Item 3" />
            </Stack>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Centered Stack</h4>
          <div style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
            <Stack spacing="md" align="center">
              <DemoCard title="Centered 1" />
              <DemoCard title="Centered 2" />
              <DemoCard title="Centered 3" />
            </Stack>
          </div>
        </div>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack component for vertical layouts with configurable spacing and alignment.',
      },
    },
  },
};

export const CommonLayouts: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      width: '100%',
      maxWidth: '1200px'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Common Layout Patterns</h3>
      
      <Stack spacing="xl">
        {/* Header + Content + Footer */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Page Layout (Header + Content + Footer)</h4>
          <div style={{ height: '300px', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ height: '60px', backgroundColor: 'hsl(240, 3.7%, 15.9%)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
              <h5 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Header</h5>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" variant="ghost">Menu</Button>
                <Button size="sm" variant="ghost">Profile</Button>
              </div>
            </div>
            <div style={{ height: '180px', padding: '1rem', backgroundColor: 'hsl(240, 10%, 6%)' }}>
              <Grid cols={3} gap="md" style={{ height: '100%' }}>
                <GridItem>
                  <DemoCard title="Content 1" height="100%" />
                </GridItem>
                <GridItem>
                  <DemoCard title="Content 2" height="100%" />
                </GridItem>
                <GridItem>
                  <DemoCard title="Content 3" height="100%" />
                </GridItem>
              </Grid>
            </div>
            <div style={{ height: '60px', backgroundColor: 'hsl(240, 3.7%, 15.9%)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Footer Content</p>
            </div>
          </div>
        </div>

        {/* Sidebar + Main */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Sidebar Layout</h4>
          <div style={{ height: '250px', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: '6px', overflow: 'hidden' }}>
            <Grid cols={4} gap="none" style={{ height: '100%' }}>
              <GridItem>
                <div style={{ height: '100%', backgroundColor: 'hsl(240, 3.7%, 15.9%)', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Sidebar</h5>
                  <Stack spacing="sm">
                    <Button size="sm" variant="ghost" style={{ justifyContent: 'flex-start' }}>Dashboard</Button>
                    <Button size="sm" variant="ghost" style={{ justifyContent: 'flex-start' }}>Projects</Button>
                    <Button size="sm" variant="ghost" style={{ justifyContent: 'flex-start' }}>Settings</Button>
                  </Stack>
                </div>
              </GridItem>
              <GridItem colSpan={3}>
                <div style={{ height: '100%', backgroundColor: 'hsl(240, 10%, 6%)', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Main Content</h5>
                  <Grid cols={2} gap="md" style={{ height: 'calc(100% - 2rem)' }}>
                    <DemoCard title="Main 1" height="100%" />
                    <DemoCard title="Main 2" height="100%" />
                  </Grid>
                </div>
              </GridItem>
            </Grid>
          </div>
        </div>

        {/* Card Grid */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Card Grid Layout</h4>
          <Grid cols={3} gap="lg">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i} style={{ height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Monitor size={24} style={{ marginBottom: '0.5rem', color: 'hsl(240, 5%, 64.9%)' }} />
                <h5 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Card {i + 1}</h5>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>Description</p>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Hero Section */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Hero Section Layout</h4>
          <div style={{ height: '200px', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: '6px', overflow: 'hidden' }}>
            <Grid cols={2} gap="none" style={{ height: '100%' }}>
              <GridItem>
                <div style={{ height: '100%', backgroundColor: 'hsl(240, 10%, 6%)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h5 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700 }}>Hero Title</h5>
                  <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>Hero description text that explains the main value proposition.</p>
                  <Button>Get Started</Button>
                </div>
              </GridItem>
              <GridItem>
                <div style={{ height: '100%', backgroundColor: 'hsl(240, 3.7%, 15.9%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: 'hsl(240, 5%, 64.9%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={32} />
                  </div>
                </div>
              </GridItem>
            </Grid>
          </div>
        </div>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common web application layout patterns using Grid and Flex components.',
      },
    },
  },
};

export const InteractiveLayout: Story = {
  render: () => {
    const [layoutConfig, setLayoutConfig] = React.useState({
      gridCols: 3,
      gridGap: 'md' as const,
      flexDirection: 'row' as const,
      flexJustify: 'start' as const,
      containerSize: 'lg' as const,
    });

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        width: '100%'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Interactive Layout Demo</h3>
        
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Layout Controls</h4>
          
          <Grid cols={3} gap="md">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Grid Columns
              </label>
              <select
                value={layoutConfig.gridCols}
                onChange={(e) => setLayoutConfig(prev => ({ ...prev, gridCols: Number(e.target.value) }))}
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
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Grid Gap
              </label>
              <select
                value={layoutConfig.gridGap}
                onChange={(e) => setLayoutConfig(prev => ({ ...prev, gridGap: e.target.value as any }))}
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
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">X-Large</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Flex Direction
              </label>
              <select
                value={layoutConfig.flexDirection}
                onChange={(e) => setLayoutConfig(prev => ({ ...prev, flexDirection: e.target.value as any }))}
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
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>
          </Grid>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Grid Layout</h4>
          <Grid cols={layoutConfig.gridCols} gap={layoutConfig.gridGap}>
            {Array.from({ length: 6 }, (_, i) => (
              <DemoCard key={i} title={`Grid ${i + 1}`} />
            ))}
          </Grid>
        </div>

        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 500 }}>Flex Layout</h4>
          <Flex 
            direction={layoutConfig.flexDirection} 
            justify={layoutConfig.flexJustify} 
            gap="md"
            style={{ padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}
          >
            <DemoCard title="Flex 1" />
            <DemoCard title="Flex 2" />
            <DemoCard title="Flex 3" />
          </Flex>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of layout components with configurable properties.',
      },
    },
  },
};