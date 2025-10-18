import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ActivityItem } from './ActivityItem';
import { Card, CardHeader, CardTitle, CardContent } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { 
  CheckCircle, 
  Activity, 
  AlertCircle, 
  AlertTriangle, 
  Settings, 
  Play, 
  Pause, 
  Square, 
  Wrench, 
  Clock,
  Info
} from 'lucide-react';

const meta: Meta<typeof ActivityItem> = {
  title: 'Primitives/ActivityItem',
  component: ActivityItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable activity item component for displaying activity feed entries with icons, titles, timestamps, and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showChevron: {
      control: 'boolean',
    },
    borderBottom: {
      control: 'boolean',
    },
    iconColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <CheckCircle size={16} />,
    title: 'Job completed successfully',
    time: '2 minutes ago',
    iconColor: 'hsl(142, 76%, 36%)',
  },
  render: (args) => (
    <div style={{ width: '400px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px' }}>
      <ActivityItem {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Default</h4>
      <ActivityItem
        icon={<CheckCircle size={16} />}
        title="Job completed successfully"
        time="2 minutes ago"
        iconColor="hsl(142, 76%, 36%)"
        variant="default"
      />
      
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Subtle</h4>
      <ActivityItem
        icon={<Activity size={16} />}
        title="Machine started"
        time="5 minutes ago"
        iconColor="hsl(262, 83%, 58%)"
        variant="subtle"
      />
      
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Bordered</h4>
      <ActivityItem
        icon={<AlertCircle size={16} />}
        title="Maintenance due"
        time="1 hour ago"
        iconColor="hsl(48, 96%, 53%)"
        variant="bordered"
        borderBottom
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Small</h4>
      <ActivityItem
        icon={<CheckCircle size={14} />}
        title="Job completed successfully"
        time="2 minutes ago"
        iconColor="hsl(142, 76%, 36%)"
        size="sm"
      />
      
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Medium</h4>
      <ActivityItem
        icon={<Activity size={16} />}
        title="Machine started"
        time="5 minutes ago"
        iconColor="hsl(262, 83%, 58%)"
        size="md"
      />
      
      <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: 0 }}>Large</h4>
      <ActivityItem
        icon={<AlertCircle size={18} />}
        title="Maintenance due"
        time="1 hour ago"
        iconColor="hsl(48, 96%, 53%)"
        size="lg"
      />
    </div>
  ),
};

export const WithoutChevron: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <ActivityItem
        icon={<CheckCircle size={16} />}
        title="Job completed successfully"
        time="2 minutes ago"
        iconColor="hsl(142, 76%, 36%)"
        showChevron={false}
      />
      <ActivityItem
        icon={<Activity size={16} />}
        title="Machine started"
        time="5 minutes ago"
        iconColor="hsl(262, 83%, 58%)"
        showChevron={false}
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5rem',
      width: '400px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <ActivityItem
        title="System notification"
        time="2 minutes ago"
      />
      <ActivityItem
        title="Background process completed"
        time="5 minutes ago"
      />
    </div>
  ),
};

export const CNCActivityFeed: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const activities = [
      {
        id: '1',
        icon: <CheckCircle size={16} />,
        title: 'Job #1001 completed successfully',
        time: '2 minutes ago',
        iconColor: 'hsl(142, 76%, 36%)',
      },
      {
        id: '2',
        icon: <Play size={16} />,
        title: 'Machine started - Job #1002',
        time: '5 minutes ago',
        iconColor: 'hsl(262, 83%, 58%)',
      },
      {
        id: '3',
        icon: <AlertTriangle size={16} />,
        title: 'Coolant level warning',
        time: '15 minutes ago',
        iconColor: 'hsl(48, 96%, 53%)',
      },
      {
        id: '4',
        icon: <Wrench size={16} />,
        title: 'Tool change required - T01',
        time: '30 minutes ago',
        iconColor: 'hsl(217, 91%, 60%)',
      },
      {
        id: '5',
        icon: <Pause size={16} />,
        title: 'Production paused for maintenance',
        time: '1 hour ago',
        iconColor: 'hsl(38, 92%, 50%)',
      },
      {
        id: '6',
        icon: <Settings size={16} />,
        title: 'Settings updated by admin',
        time: '2 hours ago',
        iconColor: 'hsl(240, 5%, 64.9%)',
      },
    ];

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
      }}>
        <Card variant="activity" style={{ padding: 0 }}>
          <CardHeader style={{ paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle>Recent Activity</CardTitle>
              <Badge variant="bright-info" showIndicator>
                {activities.length} new
              </Badge>
            </div>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  icon={activity.icon}
                  title={activity.title}
                  time={activity.time}
                  iconColor={activity.iconColor}
                  borderBottom={index < activities.length - 1}
                  onClick={() => setSelectedItem(activity.id)}
                  style={{
                    backgroundColor: selectedItem === activity.id ? 'hsl(262, 83%, 58% / 0.1)' : 'transparent',
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC activity feed with realistic machine operations and events.',
      },
    },
  },
};

export const MachineStatusFeed: Story = {
  render: () => {
    const machineStatuses = [
      {
        id: '1',
        icon: <CheckCircle size={16} />,
        title: 'Machine A1 - Production completed',
        time: '3 minutes ago',
        iconColor: 'hsl(142, 76%, 36%)',
      },
      {
        id: '2',
        icon: <Activity size={16} />,
        title: 'Machine B2 - Started new job',
        time: '8 minutes ago',
        iconColor: 'hsl(262, 83%, 58%)',
      },
      {
        id: '3',
        icon: <AlertCircle size={16} />,
        title: 'Machine C3 - Temperature warning',
        time: '12 minutes ago',
        iconColor: 'hsl(0, 84.2%, 60.2%)',
      },
      {
        id: '4',
        icon: <Wrench size={16} />,
        title: 'Machine A1 - Maintenance scheduled',
        time: '25 minutes ago',
        iconColor: 'hsl(48, 96%, 53%)',
      },
      {
        id: '5',
        icon: <Square size={16} />,
        title: 'Machine B2 - Emergency stop activated',
        time: '45 minutes ago',
        iconColor: 'hsl(0, 84.2%, 60.2%)',
      },
    ];

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}>
            Machine Status Feed
          </h3>
          <Button size="sm" variant="outline">
            View All
          </Button>
        </div>
        
        <Card style={{ padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {machineStatuses.map((status, index) => (
              <ActivityItem
                key={status.id}
                icon={status.icon}
                title={status.title}
                time={status.time}
                iconColor={status.iconColor}
                borderBottom={index < machineStatuses.length - 1}
                variant="bordered"
                onClick={() => console.log('Clicked:', status.title)}
              />
            ))}
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Machine status feed showing different machine events and alerts.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [activities, setActivities] = useState([
      {
        id: '1',
        icon: <CheckCircle size={16} />,
        title: 'Job completed successfully',
        time: '2 minutes ago',
        iconColor: 'hsl(142, 76%, 36%)',
        read: false,
      },
      {
        id: '2',
        icon: <Activity size={16} />,
        title: 'Machine started',
        time: '5 minutes ago',
        iconColor: 'hsl(262, 83%, 58%)',
        read: false,
      },
      {
        id: '3',
        icon: <AlertTriangle size={16} />,
        title: 'Maintenance due',
        time: '1 hour ago',
        iconColor: 'hsl(48, 96%, 53%)',
        read: true,
      },
    ]);

    const handleItemClick = (id: string) => {
      setActivities(prev => prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      ));
    };

    const addNewActivity = () => {
      const newActivity = {
        id: Date.now().toString(),
        icon: <Info size={16} />,
        title: 'New system notification',
        time: 'Just now',
        iconColor: 'hsl(217, 91%, 60%)',
        read: false,
      };
      setActivities(prev => [newActivity, ...prev]);
    };

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}>
            Interactive Activity Feed
          </h3>
          <Button size="sm" onClick={addNewActivity}>
            Add Activity
          </Button>
        </div>
        
        <Card style={{ padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                icon={activity.icon}
                title={activity.title}
                time={activity.time}
                iconColor={activity.iconColor}
                borderBottom={index < activities.length - 1}
                onClick={() => handleItemClick(activity.id)}
                style={{
                  opacity: activity.read ? 0.7 : 1,
                  fontWeight: activity.read ? 'normal' : 'bold',
                }}
              />
            ))}
          </div>
        </Card>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActivities(prev => prev.map(item => ({ ...item, read: true })))}
          >
            Mark all as read
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive activity feed with clickable items and dynamic content.',
      },
    },
  },
};

export const ComparisonStory: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px',
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)',
        fontSize: '1.25rem',
        fontWeight: 600,
      }}>
        Before vs After: ActivityItem Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            {/* Legacy inline implementation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid hsl(240, 3.7%, 15.9%)',
              cursor: 'pointer',
            }}>
              <div style={{ color: 'hsl(142, 76%, 36%)' }}>
                <CheckCircle size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Job completed</div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>2 min ago</div>
              </div>
              <div style={{ color: 'hsl(240, 5%, 64.9%)' }}>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: ActivityItem Component
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            <ActivityItem
              icon={<CheckCircle size={16} />}
              title="Job completed"
              time="2 min ago"
              iconColor="hsl(142, 76%, 36%)"
              borderBottom
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the ActivityItem component vs inline implementation.',
      },
    },
  },
};