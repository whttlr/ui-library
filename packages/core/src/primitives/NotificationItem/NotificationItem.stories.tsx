import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NotificationItem } from './NotificationItem';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { 
  Bell, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Activity,
  Wrench,
  Play,
  Pause
} from 'lucide-react';

const meta: Meta<typeof NotificationItem> = {
  title: 'Primitives/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A notification item component for displaying alerts, messages, and system notifications with proper formatting and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    read: {
      control: 'boolean',
    },
    showUnreadIndicator: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Job Completed',
    message: 'Aluminum bracket machining operation completed successfully. Total time: 2h 15m.',
    type: 'success',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
  },
  render: (args) => (
    <div style={{ width: '400px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
      <NotificationItem {...args} />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '500px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <NotificationItem
        id="info-1"
        title="Machine Connection"
        message="Successfully connected to CNC controller at 192.168.1.100:8080."
        type="info"
        timestamp={new Date(Date.now() - 600000)}
        read={false}
      />
      
      <NotificationItem
        id="warning-1"
        title="Tool Change Required"
        message="Tool #3 (6.35mm end mill) has reached 80% of recommended tool life. Consider replacement."
        type="warning"
        timestamp={new Date(Date.now() - 900000)}
        read={false}
      />
      
      <NotificationItem
        id="error-1"
        title="Emergency Stop Activated"
        message="Emergency stop was activated by operator. Machine safely stopped. Reason: Tool collision detected."
        type="error"
        timestamp={new Date(Date.now() - 1800000)}
        read={false}
      />
      
      <NotificationItem
        id="success-1"
        title="Job Completed"
        message="Aluminum bracket machining operation completed successfully. Total time: 2h 15m."
        type="success"
        timestamp={new Date(Date.now() - 300000)}
        read={false}
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
      width: '500px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Small</h4>
        <NotificationItem
          id="small-1"
          title="Tool Change Required"
          message="Tool life at 80%"
          type="warning"
          timestamp={new Date(Date.now() - 300000)}
          size="sm"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Medium</h4>
        <NotificationItem
          id="medium-1"
          title="Tool Change Required"
          message="Tool #3 (6.35mm end mill) has reached 80% of recommended tool life."
          type="warning"
          timestamp={new Date(Date.now() - 300000)}
          size="md"
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Large</h4>
        <NotificationItem
          id="large-1"
          title="Tool Change Required"
          message="Tool #3 (6.35mm end mill) has reached 80% of recommended tool life. Consider replacement soon to maintain quality."
          type="warning"
          timestamp={new Date(Date.now() - 300000)}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const ReadStates: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '500px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Unread</h4>
        <NotificationItem
          id="unread-1"
          title="New Job Started"
          message="Steel bracket machining operation has begun."
          type="info"
          timestamp={new Date(Date.now() - 300000)}
          read={false}
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Read</h4>
        <NotificationItem
          id="read-1"
          title="Job Completed"
          message="Aluminum part machining completed successfully."
          type="success"
          timestamp={new Date(Date.now() - 1800000)}
          read={true}
        />
      </div>
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '500px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <NotificationItem
        id="custom-1"
        title="Machine Settings Updated"
        message="Feed rate and spindle speed parameters have been updated."
        type="info"
        timestamp={new Date(Date.now() - 300000)}
        icon={<Settings size={20} />}
      />
      
      <NotificationItem
        id="custom-2"
        title="Tool Maintenance Scheduled"
        message="Routine tool maintenance scheduled for tomorrow at 8:00 AM."
        type="warning"
        timestamp={new Date(Date.now() - 600000)}
        icon={<Wrench size={20} />}
      />
      
      <NotificationItem
        id="custom-3"
        title="System Activity Detected"
        message="Unusual vibration patterns detected during operation."
        type="error"
        timestamp={new Date(Date.now() - 900000)}
        icon={<Activity size={20} />}
      />
    </div>
  ),
};

export const CNCNotificationFeed: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      {
        id: '1',
        title: 'Job Completed Successfully',
        message: 'Aluminum bracket machining operation completed successfully. Total time: 2h 15m. Quality check passed.',
        type: 'success' as const,
        timestamp: new Date(Date.now() - 300000),
        read: false,
      },
      {
        id: '2',
        title: 'Tool Change Required',
        message: 'Tool #3 (6.35mm end mill) has reached 80% of recommended tool life. Consider replacement to maintain precision.',
        type: 'warning' as const,
        timestamp: new Date(Date.now() - 900000),
        read: false,
      },
      {
        id: '3',
        title: 'Spindle Load Warning',
        message: 'Spindle load has exceeded 85% for the past 10 minutes. Check feed rates and tool condition.',
        type: 'warning' as const,
        timestamp: new Date(Date.now() - 1800000),
        read: true,
      },
      {
        id: '4',
        title: 'Machine Connection Established',
        message: 'Successfully connected to CNC controller at 192.168.1.100:8080. All systems operational.',
        type: 'info' as const,
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: '5',
        title: 'Emergency Stop Activated',
        message: 'Emergency stop was activated by operator. Machine safely stopped. Reason: Tool collision detected.',
        type: 'error' as const,
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id: string) => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    };

    const handleNotificationClick = (id: string, notification: any) => {
      console.log('Notification clicked:', notification);
    };

    const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const addNewNotification = () => {
      const newNotification = {
        id: Date.now().toString(),
        title: 'New System Alert',
        message: 'A new system alert has been generated for demonstration purposes.',
        type: 'info' as const,
        timestamp: new Date(),
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
    };

    return (
      <div style={{ 
        width: '600px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ 
              margin: 0, 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}>
              CNC Notifications
            </h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" showIndicator>
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="sm" variant="outline" onClick={addNewNotification}>
              Add Notification
            </Button>
            {unreadCount > 0 && (
              <Button size="sm" variant="secondary" onClick={markAllAsRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </div>
        
        <Card style={{ padding: 0 }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            padding: '1rem'
          }}>
            {notifications.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: 'hsl(240, 5%, 64.9%)',
                fontSize: '0.875rem'
              }}>
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  type={notification.type}
                  timestamp={notification.timestamp}
                  read={notification.read}
                  onMarkAsRead={handleMarkAsRead}
                  onClick={handleNotificationClick}
                />
              ))
            )}
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC notification feed with interactive read/unread states and management actions.',
      },
    },
  },
};

export const MachineAlertsPanel: Story = {
  render: () => {
    const alerts = [
      {
        id: 'alert-1',
        title: 'High Temperature Warning',
        message: 'Spindle temperature has reached 85°C. Normal operating range is 60-75°C.',
        type: 'warning' as const,
        timestamp: new Date(Date.now() - 600000),
        read: false,
        icon: <AlertTriangle size={20} />,
      },
      {
        id: 'alert-2',
        title: 'Coolant Level Critical',
        message: 'Coolant reservoir is at 15% capacity. Refill immediately to prevent overheating.',
        type: 'error' as const,
        timestamp: new Date(Date.now() - 1200000),
        read: false,
        icon: <AlertCircle size={20} />,
      },
      {
        id: 'alert-3',
        title: 'Maintenance Reminder',
        message: 'Scheduled maintenance is due in 3 days. Contact maintenance team to schedule downtime.',
        type: 'info' as const,
        timestamp: new Date(Date.now() - 3600000),
        read: true,
        icon: <Wrench size={20} />,
      },
      {
        id: 'alert-4',
        title: 'Production Target Met',
        message: 'Daily production target of 50 parts has been successfully achieved.',
        type: 'success' as const,
        timestamp: new Date(Date.now() - 7200000),
        read: true,
        icon: <CheckCircle size={20} />,
      },
    ];

    return (
      <div style={{ 
        width: '500px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Machine Alerts
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map((alert) => (
            <NotificationItem
              key={alert.id}
              id={alert.id}
              title={alert.title}
              message={alert.message}
              type={alert.type}
              timestamp={alert.timestamp}
              read={alert.read}
              icon={alert.icon}
              size="sm"
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Machine alerts panel with different severity levels and custom icons.',
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
      maxWidth: '1000px',
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)',
        fontSize: '1.25rem',
        fontWeight: 600,
      }}>
        Before vs After: NotificationItem Component
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
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              border: '1px solid hsl(240, 3.7%, 25%)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🟢</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  color: 'hsl(0, 0%, 98%)'
                }}>
                  Job Completed
                </h4>
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '0.75rem', 
                  lineHeight: 1.4,
                  color: 'hsl(240, 5%, 64.9%)'
                }}>
                  Aluminum bracket machining operation completed successfully.
                </p>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'hsl(240, 5%, 64.9%)'
                }}>
                  5m ago
                </span>
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'hsl(142, 76%, 36%)',
                flexShrink: 0,
                marginTop: '4px',
              }} />
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: NotificationItem Component
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            <NotificationItem
              id="comparison-1"
              title="Job Completed"
              message="Aluminum bracket machining operation completed successfully."
              type="success"
              timestamp={new Date(Date.now() - 300000)}
              read={false}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the NotificationItem component vs inline implementation.',
      },
    },
  },
};