import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import { Card } from '../Card/Card';
import { 
  Users, ShoppingCart, Package, TrendingUp, Activity, 
  Zap, Settings, DollarSign, Target, Wrench 
} from 'lucide-react';

const meta: Meta<typeof MetricCard> = {
  title: 'Primitives/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A metric card component for displaying key performance indicators with icons, values, and change indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Users',
    value: '2,543',
    change: {
      value: '+12.5%',
      variant: 'positive',
    },
    icon: <Users />,
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <MetricCard {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Total Users"
        value="2,543"
        change={{ value: '+12.5%', variant: 'positive' }}
        icon={<Users />}
        variant="default"
      />
      <MetricCard
        title="Success Rate"
        value="98.2%"
        change={{ value: '+2.1%', variant: 'positive' }}
        icon={<TrendingUp />}
        variant="success"
      />
      <MetricCard
        title="Warnings"
        value="12"
        change={{ value: '+3', variant: 'negative' }}
        icon={<Activity />}
        variant="warning"
      />
      <MetricCard
        title="Errors"
        value="3"
        change={{ value: '-2', variant: 'positive' }}
        icon={<Zap />}
        variant="error"
      />
      <MetricCard
        title="Information"
        value="1,247"
        change={{ value: 'No change', variant: 'neutral' }}
        icon={<Settings />}
        variant="info"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Small Size"
        value="1,234"
        change={{ value: '+5.2%', variant: 'positive' }}
        icon={<Users />}
        size="sm"
      />
      <MetricCard
        title="Medium Size"
        value="2,543"
        change={{ value: '+12.5%', variant: 'positive' }}
        icon={<Users />}
        size="md"
      />
      <MetricCard
        title="Large Size"
        value="5,789"
        change={{ value: '+8.7%', variant: 'positive' }}
        icon={<Users />}
        size="lg"
      />
    </div>
  ),
};

export const ChangeVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Positive Change"
        value="1,234"
        change={{ value: '+12.5%', variant: 'positive' }}
        icon={<TrendingUp />}
      />
      <MetricCard
        title="Negative Change"
        value="987"
        change={{ value: '-5.4%', variant: 'negative' }}
        icon={<Activity />}
      />
      <MetricCard
        title="Neutral Change"
        value="2,543"
        change={{ value: 'No change', variant: 'neutral' }}
        icon={<Package />}
      />
      <MetricCard
        title="No Change Indicator"
        value="456"
        icon={<DollarSign />}
      />
    </div>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Revenue"
        value="$12,345"
        change={{ value: '+8.2%', variant: 'positive' }}
      />
      <MetricCard
        title="Orders"
        value="432"
        change={{ value: '-2.1%', variant: 'negative' }}
      />
      <MetricCard
        title="Customers"
        value="1,893"
        change={{ value: 'Stable', variant: 'neutral' }}
      />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Custom Blue"
        value="1,234"
        change={{ value: '+5.2%', variant: 'positive' }}
        icon={<Users />}
        iconColor="hsl(220, 70%, 50%)"
        iconBackgroundColor="hsl(220, 70%, 50% / 0.1)"
      />
      <MetricCard
        title="Custom Orange"
        value="567"
        change={{ value: '+12.1%', variant: 'positive' }}
        icon={<ShoppingCart />}
        iconColor="hsl(30, 70%, 50%)"
        iconBackgroundColor="hsl(30, 70%, 50% / 0.1)"
      />
      <MetricCard
        title="Custom Green"
        value="890"
        change={{ value: 'Stable', variant: 'neutral' }}
        icon={<Package />}
        iconColor="hsl(142, 76%, 36%)"
        iconBackgroundColor="hsl(142, 76%, 36% / 0.1)"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
    }}>
      <MetricCard
        title="Loading Card"
        value="1,234"
        loading={true}
      />
      <MetricCard
        title="Loading Card"
        value="567"
        loading={true}
        size="sm"
      />
      <MetricCard
        title="Loading Card"
        value="890"
        loading={true}
        size="lg"
      />
    </div>
  ),
};

export const CNCMetrics: Story = {
  render: () => {
    const [metrics, setMetrics] = useState({
      activeJobs: 12,
      completedJobs: 156,
      machineUtilization: 87.5,
      averageCycleTime: 45.2,
      toolChanges: 8,
      qualityRate: 99.2,
    });
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(262, 83%, 75%) 50%, hsl(220, 83%, 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            CNC Machine Metrics
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Real-time performance indicators for CNC operations
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <MetricCard
            title="Active Jobs"
            value={metrics.activeJobs}
            change={{ value: '+2', variant: 'positive' }}
            icon={<Activity />}
            variant="info"
          />
          <MetricCard
            title="Completed Jobs"
            value={metrics.completedJobs}
            change={{ value: '+12', variant: 'positive' }}
            icon={<Target />}
            variant="success"
          />
          <MetricCard
            title="Machine Utilization"
            value={`${metrics.machineUtilization}%`}
            change={{ value: '+2.3%', variant: 'positive' }}
            icon={<Settings />}
            variant="default"
          />
          <MetricCard
            title="Avg Cycle Time"
            value={`${metrics.averageCycleTime}s`}
            change={{ value: '-1.2s', variant: 'positive' }}
            icon={<Zap />}
            variant="warning"
          />
          <MetricCard
            title="Tool Changes"
            value={metrics.toolChanges}
            change={{ value: '+3', variant: 'negative' }}
            icon={<Wrench />}
            variant="error"
          />
          <MetricCard
            title="Quality Rate"
            value={`${metrics.qualityRate}%`}
            change={{ value: '+0.1%', variant: 'positive' }}
            icon={<TrendingUp />}
            variant="success"
          />
        </div>

        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 10%, 8%)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'hsl(240, 5%, 64.9%)'
        }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            marginBottom: '0.5rem',
            color: 'hsl(0, 0%, 98%)'
          }}>
            Performance Summary:
          </h3>
          <div style={{ fontFamily: 'monospace', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            <div>Active Jobs: {metrics.activeJobs}</div>
            <div>Completed: {metrics.completedJobs}</div>
            <div>Utilization: {metrics.machineUtilization}%</div>
            <div>Cycle Time: {metrics.averageCycleTime}s</div>
            <div>Tool Changes: {metrics.toolChanges}</div>
            <div>Quality: {metrics.qualityRate}%</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine metrics dashboard showcasing MetricCard components with realistic manufacturing data.',
      },
    },
  },
};