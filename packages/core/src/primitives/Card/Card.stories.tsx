import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardIcon, CardValue, CardChange, CardActions, CardCompound } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { MetricCard } from '../MetricCard/MetricCard';
import { ActivityItem } from '../ActivityItem/ActivityItem';
import { StatusCard } from '../StatusCard/StatusCard';
import { Settings, TrendingUp, Activity, Zap, CheckCircle, AlertCircle, Info as InfoIcon, DollarSign, Users, ShoppingCart, Package, MoreVertical, ChevronRight, BarChart2 } from 'lucide-react';
import { Slider } from '../Slider/Slider';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content in a visually distinct container. Perfect for dashboards, forms, and content organization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'cnc', 'metric', 'settings', 'activity', 'dashboard'],
      description: 'Visual style variant of the card',
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove default padding',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive hover effects',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Default Card
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          This is a default card with standard styling.
        </p>
      </div>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Outline Card
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          This card has an outline border style.
        </p>
      </div>
    ),
  },
};

export const CNC: Story = {
  args: {
    variant: 'cnc',
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          CNC Card
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          Industrial-styled card for CNC applications.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific styling with dark theme for industrial applications',
      },
    },
  },
};

// Padding variants
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          No Padding
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          Card with no internal padding - content controls spacing.
        </p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <div style={{ padding: '0.75rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Small Padding
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          Card with small internal padding.
        </p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <div style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }}>
          Large Padding
        </h3>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          Card with large internal padding for spacious layouts.
        </p>
      </div>
    ),
  },
};

// Compound component examples - NEW API
export const MetricCardExample: Story = {
  render: () => (
    <MetricCard
      title="Revenue"
      value="$45,231"
      change={{ value: "+20.1% from last month", variant: "positive" }}
      icon={<DollarSign size={24} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Metric card using new compound components for cleaner implementation',
      },
    },
  },
};

export const MetricCardVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      <MetricCard
        title="Total Users"
        value="2,543"
        change={{ value: "+12.5%", variant: "positive" }}
        icon={<Users size={24} />}
        iconColor="hsl(220, 70%, 50%)"
        iconBackgroundColor="hsl(220, 70%, 50% / 0.1)"
      />

      <MetricCard
        title="Orders"
        value="432"
        change={{ value: "-5.4%", variant: "negative" }}
        icon={<ShoppingCart size={24} />}
        iconColor="hsl(30, 70%, 50%)"
        iconBackgroundColor="hsl(30, 70%, 50% / 0.1)"
      />

      <MetricCard
        title="Inventory"
        value="1,893"
        change={{ value: "No change", variant: "neutral" }}
        icon={<Package size={24} />}
        iconColor="hsl(142, 76%, 36%)"
        iconBackgroundColor="hsl(142, 76%, 36% / 0.1)"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various metric cards showing different states and icons',
      },
    },
  },
};

// Legacy example for comparison
export const DashboardMetricLegacy: Story = {
  render: () => (
    <MetricCard
      title="Machine Uptime"
      value="98.5%"
      icon={<TrendingUp size={28} />}
      iconColor="hsl(142, 76%, 36%)"
      iconBackgroundColor="hsl(142, 76%, 36% / 0.12)"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Legacy implementation with inline styles - compare with MetricCard above',
      },
    },
  },
};

export const StatusCardExample: Story = {
  render: () => (
    <StatusCard
      title="Machine Status"
      status={{ label: 'Online', variant: 'success' }}
      values={[
        { label: 'X Position', value: 125.450, precision: 3, unit: 'mm' },
        { label: 'Y Position', value: 67.230, precision: 3, unit: 'mm' },
      ]}
      actions={[
        { label: 'Start', variant: 'success' },
        { label: 'Pause', variant: 'warning' },
        { label: 'Stop', variant: 'emergency' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC machine status card with position data and controls',
      },
    },
  },
};

// Settings card with new API
export const SettingsCardNew: Story = {
  render: () => {
    const [feedRate, setFeedRate] = useState(1500);
    
    return (
      <Card variant="settings" noPadding style={{ width: '400px' }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardTitle>Machine Settings</CardTitle>
            <CardActions>
              <Button size="icon" variant="ghost">
                <MoreVertical size={16} />
              </Button>
            </CardActions>
          </div>
          <CardDescription>Configure machine parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Feed Rate</label>
                <span style={{ fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace', color: 'hsl(262, 83%, 58%)' }}>
                  {feedRate} mm/min
                </span>
              </div>
              <Slider
                value={feedRate}
                onChange={setFeedRate}
                min={100}
                max={3000}
                step={50}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter style={{ borderTop: '1px solid hsl(240, 3.7%, 15.9%)', paddingTop: '1rem' }}>
          <Button style={{ width: '100%' }}>Apply Settings</Button>
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings card using compound components for cleaner structure',
      },
    },
  },
};

// Activity card with new API
export const ActivityCardNew: Story = {
  render: () => (
    <Card variant="activity" noPadding style={{ width: '400px' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardTitle>Recent Activity</CardTitle>
          <Badge variant="bright-info" showIndicator>3 new</Badge>
        </div>
      </CardHeader>
      <CardContent style={{ padding: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { icon: <CheckCircle size={16} />, title: 'Job completed', time: '2 min ago', color: 'hsl(142, 76%, 36%)' },
            { icon: <Activity size={16} />, title: 'Machine started', time: '5 min ago', color: 'hsl(262, 83%, 58%)' },
            { icon: <AlertCircle size={16} />, title: 'Maintenance due', time: '1 hour ago', color: 'hsl(48, 96%, 53%)' },
          ].map((item, index) => (
            <ActivityItem
              key={index}
              icon={item.icon}
              title={item.title}
              time={item.time}
              iconColor={item.color}
              borderBottom={index < 2}
              onClick={() => console.log('Activity clicked:', item.title)}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter style={{ borderTop: '1px solid hsl(240, 3.7%, 15.9%)', paddingTop: '1rem', justifyContent: 'center' }}>
        <Button variant="ghost" size="sm">View all activity</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Activity feed card using compound components',
      },
    },
  },
};

// Dashboard overview with multiple cards
export const DashboardOverview: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <MetricCard
        title="Production Overview"
        value="1,245"
        change={{ value: "+12% from yesterday", variant: "positive" }}
        icon={<BarChart2 size={24} />}
        iconColor="hsl(262, 83%, 58%)"
        iconBackgroundColor="hsl(262, 83%, 58% / 0.1)"
      />

      <MetricCard
        title="Machine Efficiency"
        value="89.3%"
        change={{ value: "Target: 85%", variant: "neutral" }}
        icon={<Activity size={24} />}
        iconColor="hsl(142, 76%, 36%)"
        iconBackgroundColor="hsl(142, 76%, 36% / 0.1)"
      />

      <MetricCard
        title="Active Alerts"
        value="3"
        change={{ value: "2 critical", variant: "negative" }}
        icon={<AlertCircle size={24} />}
        iconColor="hsl(0, 84.2%, 60.2%)"
        iconBackgroundColor="hsl(0, 84.2%, 60.2% / 0.1)"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard overview using compound components with interactive cards',
      },
    },
  },
};

// Legacy settings card for comparison
export const SettingsCard: Story = {
  render: () => {
    const [feedRate, setFeedRate] = useState(1500);
    const [selectedDistance, setSelectedDistance] = useState(10.0);
    
    const distances = [0.1, 1.0, 10.0, 100.0];
    
    return (
      <Card style={{ width: '24rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings style={{ width: '1.25rem', height: '1.25rem', color: 'hsl(240, 5%, 64.9%)' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)', margin: 0 }}>
              Jog Settings
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Feed Rate Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
                  Feed Rate
                </label>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: 'hsl(217, 91%, 60%)', 
                  fontFamily: 'JetBrains Mono, monospace', 
                  fontWeight: 600 
                }}>
                  {feedRate} mm/min
                </span>
              </div>
              <Slider
                value={feedRate}
                onChange={setFeedRate}
                min={100}
                max={3000}
                step={50}
                variant="info"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>100 mm/min</span>
                <span style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>3000 mm/min</span>
              </div>
            </div>
            
            {/* Jog Distance Buttons */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: 'hsl(0, 0%, 98%)', 
                marginBottom: '0.75rem' 
              }}>
                Jog Distance
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {distances.map((distance) => (
                  <Button
                    key={distance}
                    variant={selectedDistance === distance ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDistance(distance)}
                    style={{ flex: 1 }}
                  >
                    {distance}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ 
            paddingTop: '1rem', 
            borderTop: '1px solid hsl(240, 3.7%, 15.9%)',
            marginTop: '0.5rem'
          }}>
            <Button style={{ width: '100%' }}>Apply Settings</Button>
          </div>
        </div>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings card using the Slider primitive for feed rate control with improved styling',
      },
    },
  },
};

export const ActivityCard: Story = {
  render: () => (
    <Card style={{ width: '20rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)', margin: 0 }}>
            Recent Activity
          </h3>
          <Activity style={{ width: '1.25rem', height: '1.25rem', color: 'hsl(217, 91%, 60%)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { 
              time: '2 minutes ago', 
              action: 'Job completed successfully', 
              status: 'success',
              icon: <CheckCircle style={{ width: '1rem', height: '1rem', color: 'hsl(142, 76%, 36%)' }} />
            },
            { 
              time: '15 minutes ago', 
              action: 'Emergency stop activated', 
              status: 'error',
              icon: <AlertCircle style={{ width: '1rem', height: '1rem', color: 'hsl(0, 84.2%, 60.2%)' }} />
            },
            { 
              time: '1 hour ago', 
              action: 'Machine calibration started', 
              status: 'info',
              icon: <InfoIcon style={{ width: '1rem', height: '1rem', color: 'hsl(217, 91%, 60%)' }} />
            },
          ].map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem', 
              padding: '0.75rem', 
              borderRadius: '6px',
              border: '1px solid hsl(240, 3.7%, 15.9%)',
              backgroundColor: 'hsl(240, 10%, 6%)'
            }}>
              <div style={{ flexShrink: 0, marginTop: '1px' }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 500, 
                  color: 'hsl(0, 0%, 98%)', 
                  margin: '0 0 0.25rem 0' 
                }}>
                  {item.action}
                </p>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'hsl(240, 5%, 64.9%)', 
                  margin: 0 
                }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Activity feed card with proper icons and improved layout spacing',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(true);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => setLoading(!loading)}>
            {loading ? 'Show Content' : 'Show Loading'}
          </Button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Card loading={loading} loadingLines={2} loadingHeight="4rem" style={{ width: '100%' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
                Machine Status
              </h3>
              <p style={{ margin: '0 0 1rem 0', color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                Current operational status and metrics.
              </p>
              <div style={{
                height: '4rem',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                borderRadius: '0.375rem',
                border: '1px solid hsl(240, 3.7%, 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'hsl(142, 71%, 45%)', fontWeight: 500 }}>
                  ● Running
                </span>
              </div>
            </div>
          </Card>

          <Card loading={loading} loadingLines={3} loadingHeight="6rem" style={{ width: '100%' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
                Performance
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                Real-time performance metrics and efficiency data.
              </p>
              <p style={{ margin: '0 0 1rem 0', color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                Updated every 5 seconds for accurate monitoring.
              </p>
              <div style={{
                height: '6rem',
                backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                borderRadius: '0.375rem',
                border: '1px solid hsl(240, 3.7%, 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                  Performance Chart
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Card component with loading states using Skeleton component',
      },
    },
  },
};

export const CardSizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Small Card
          </h4>
          <Card size="sm" style={{ width: '100%' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>
              Compact Status
            </h3>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)', fontSize: '0.75rem' }}>
              Small card with reduced padding and font sizes for compact displays.
            </p>
          </Card>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Default Card
          </h4>
          <Card size="default" style={{ width: '100%' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1rem' }}>
              Machine Status
            </h3>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
              Default card size with standard padding and typography for most use cases.
            </p>
          </Card>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Large Card
          </h4>
          <Card size="lg" style={{ width: '100%' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)', fontSize: '1.125rem' }}>
              System Overview
            </h3>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)', fontSize: '1rem' }}>
              Large card with increased padding and font sizes for prominent content sections.
            </p>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card size variants for different content hierarchy levels',
      },
    },
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card>
        <h4 className="font-semibold mb-2">Default</h4>
        <p className="text-sm text-gray-600">Standard card styling</p>
      </Card>
      <Card variant="outline">
        <h4 className="font-semibold mb-2">Outline</h4>
        <p className="text-sm text-gray-600">Border-focused styling</p>
      </Card>
      <Card variant="cnc">
        <h4 className="font-semibold mb-2 text-white">CNC</h4>
        <p className="text-sm text-gray-300">Industrial dark theme</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available card variants displayed together',
      },
    },
  },
};