import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, NotificationDrawer } from './Drawer';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Badge } from '../Badge/Badge';
import { Stack } from '../Grid/Grid';
import { 
  Settings, Bell, Menu, FileText, Users, BarChart3, 
  Wrench, Activity, AlertTriangle, CheckCircle, Info 
} from 'lucide-react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Drawer/Slideout component for side panels, navigation, and contextual content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer slide-in position',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Drawer size',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close drawer when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close drawer when pressing Escape',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Drawer Stories
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Basic Drawer"
        >
          <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
            This is a basic drawer that slides in from the right side. It includes a title,
            close button, and can be closed by clicking the overlay or pressing Escape.
          </p>
          <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
            Drawer content can include any React elements and will scroll if needed.
          </p>
        </Drawer>
      </div>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        justifyItems: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setActiveDrawer('left')}>Left Drawer</Button>
        <Button onClick={() => setActiveDrawer('right')}>Right Drawer</Button>
        <Button onClick={() => setActiveDrawer('top')}>Top Drawer</Button>
        <Button onClick={() => setActiveDrawer('bottom')}>Bottom Drawer</Button>
        
        {['left', 'right', 'top', 'bottom'].map((position) => (
          <Drawer
            key={position}
            isOpen={activeDrawer === position}
            onClose={() => setActiveDrawer(null)}
            title={`${position.charAt(0).toUpperCase() + position.slice(1)} Drawer`}
            position={position as any}
          >
            <p style={{ margin: '0 0 1rem 0' }}>
              This drawer slides in from the <strong>{position}</strong> side.
            </p>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
              Different positions are useful for different types of content and workflows.
            </p>
          </Drawer>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer positions: left, right, top, and bottom slide-in directions.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Button size="sm" onClick={() => setActiveDrawer('sm')}>Small</Button>
        <Button size="sm" onClick={() => setActiveDrawer('md')}>Medium</Button>
        <Button size="sm" onClick={() => setActiveDrawer('lg')}>Large</Button>
        <Button size="sm" onClick={() => setActiveDrawer('xl')}>Extra Large</Button>
        <Button size="sm" onClick={() => setActiveDrawer('full')}>Full Width</Button>
        
        {['sm', 'md', 'lg', 'xl', 'full'].map((size) => (
          <Drawer
            key={size}
            isOpen={activeDrawer === size}
            onClose={() => setActiveDrawer(null)}
            title={`${size.toUpperCase()} Drawer`}
            size={size as any}
          >
            <p style={{ margin: '0 0 1rem 0' }}>
              This is a <strong>{size}</strong> sized drawer.
            </p>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
              Different sizes accommodate various content requirements.
            </p>
          </Drawer>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer size variants from small to full width.',
      },
    },
  },
};

export const NavigationDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'jobs', label: 'Jobs', icon: FileText },
      { id: 'tools', label: 'Tools', icon: Wrench },
      { id: 'monitoring', label: 'Monitoring', icon: Activity },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>
          <Menu size={16} />
          Open Navigation
        </Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Navigation"
          position="left"
          size="sm"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: isActive ? 'hsl(262, 83%, 58%)' : 'transparent',
                    color: isActive ? 'white' : 'hsl(0, 0%, 98%)',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'all 0.2s ease-in-out',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'hsl(240, 3.7%, 15.9%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid hsl(240, 3.7%, 15.9%)'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
              CNC Controller v2.1.0
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
              Machine: Haas VF-3
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation drawer with menu items and machine information.',
      },
    },
  },
};

export const SettingsDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
      autoRefresh: true,
      soundAlerts: false,
      showTooltips: true,
      darkMode: true,
      units: 'metric',
      precision: 3,
    });

    const handleSettingChange = (key: string, value: any) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>
          <Settings size={16} />
          Open Settings
        </Button>
        
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings"
          position="right"
          size="md"
        >
          <Stack spacing="lg">
            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>General</h4>
              <Stack spacing="md">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
                    style={{ accentColor: 'hsl(262, 83%, 58%)' }}
                  />
                  Auto-refresh data
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) => handleSettingChange('soundAlerts', e.target.checked)}
                    style={{ accentColor: 'hsl(262, 83%, 58%)' }}
                  />
                  Sound alerts
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={settings.showTooltips}
                    onChange={(e) => handleSettingChange('showTooltips', e.target.checked)}
                    style={{ accentColor: 'hsl(262, 83%, 58%)' }}
                  />
                  Show tooltips
                </label>
              </Stack>
            </div>

            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Display</h4>
              <Stack spacing="md">
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Units
                  </label>
                  <select
                    value={settings.units}
                    onChange={(e) => handleSettingChange('units', e.target.value)}
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
                    <option value="metric">Metric (mm)</option>
                    <option value="imperial">Imperial (in)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Coordinate Precision
                  </label>
                  <select
                    value={settings.precision}
                    onChange={(e) => handleSettingChange('precision', Number(e.target.value))}
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
                    <option value={1}>1 decimal place</option>
                    <option value={2}>2 decimal places</option>
                    <option value={3}>3 decimal places</option>
                    <option value={4}>4 decimal places</option>
                  </select>
                </div>
              </Stack>
            </div>

            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Machine Connection</h4>
              <Stack spacing="md">
                <Input
                  label="Controller IP"
                  placeholder="192.168.1.100"
                  defaultValue="192.168.1.100"
                />
                <Input
                  label="Port"
                  placeholder="8080"
                  defaultValue="8080"
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'hsl(142, 76%, 36%)', borderRadius: '6px' }}>
                  <CheckCircle size={16} />
                  <span style={{ fontSize: '0.875rem' }}>Connected to machine</span>
                </div>
              </Stack>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Save Settings
              </Button>
            </div>
          </Stack>
        </Drawer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings drawer with form controls and configuration options.',
      },
    },
  },
};

export const NotificationPanel: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
      {
        id: '1',
        title: 'Job Completed',
        message: 'Aluminum bracket machining operation completed successfully. Total time: 2h 15m.',
        type: 'success' as const,
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
      },
      {
        id: '2',
        title: 'Tool Change Required',
        message: 'Tool #3 (6.35mm end mill) has reached 80% of recommended tool life. Consider replacement.',
        type: 'warning' as const,
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        read: false,
      },
      {
        id: '3',
        title: 'Spindle Load High',
        message: 'Spindle load has exceeded 85% for the past 10 minutes. Check feed rates and tool condition.',
        type: 'warning' as const,
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: true,
      },
      {
        id: '4',
        title: 'Machine Connection',
        message: 'Successfully connected to CNC controller at 192.168.1.100:8080.',
        type: 'info' as const,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
      },
      {
        id: '5',
        title: 'Emergency Stop Activated',
        message: 'Emergency stop was activated by operator. Machine safely stopped. Reason: Tool collision detected.',
        type: 'error' as const,
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: true,
      },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id: string) => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    };

    const handleClearAll = () => {
      setNotifications([]);
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)} style={{ position: 'relative' }}>
          <Bell size={16} />
          Notifications
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                padding: '0',
              }}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
        
        <NotificationDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onClearAll={handleClearAll}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Notification drawer with CNC machine alerts, warnings, and status updates.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [drawerConfig, setDrawerConfig] = useState({
      isOpen: false,
      position: 'right' as const,
      size: 'md' as const,
      showCloseButton: true,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    });

    const openDrawer = () => {
      setDrawerConfig(prev => ({ ...prev, isOpen: true }));
    };

    const closeDrawer = () => {
      setDrawerConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Drawer Configuration</h4>
          
          <Stack spacing="md">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Position
              </label>
              <select
                value={drawerConfig.position}
                onChange={(e) => setDrawerConfig(prev => ({ ...prev, position: e.target.value as any }))}
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
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Size
              </label>
              <select
                value={drawerConfig.size}
                onChange={(e) => setDrawerConfig(prev => ({ ...prev, size: e.target.value as any }))}
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
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={drawerConfig.showCloseButton}
                  onChange={(e) => setDrawerConfig(prev => ({ ...prev, showCloseButton: e.target.checked }))}
                />
                Show close button
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={drawerConfig.closeOnOverlayClick}
                  onChange={(e) => setDrawerConfig(prev => ({ ...prev, closeOnOverlayClick: e.target.checked }))}
                />
                Close on overlay click
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={drawerConfig.closeOnEscape}
                  onChange={(e) => setDrawerConfig(prev => ({ ...prev, closeOnEscape: e.target.checked }))}
                />
                Close on Escape key
              </label>
            </div>
          </Stack>
        </div>
        
        <Button onClick={openDrawer}>Open Configured Drawer</Button>
        
        <Drawer
          isOpen={drawerConfig.isOpen}
          onClose={closeDrawer}
          title="Interactive Drawer Demo"
          position={drawerConfig.position}
          size={drawerConfig.size}
          showCloseButton={drawerConfig.showCloseButton}
          closeOnOverlayClick={drawerConfig.closeOnOverlayClick}
          closeOnEscape={drawerConfig.closeOnEscape}
        >
          <Stack spacing="md">
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              This drawer demonstrates the interactive configuration options.
            </p>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}>
              <strong>Current Settings:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem' }}>
                <li>Position: {drawerConfig.position}</li>
                <li>Size: {drawerConfig.size}</li>
                <li>Show close button: {drawerConfig.showCloseButton ? 'Yes' : 'No'}</li>
                <li>Close on overlay click: {drawerConfig.closeOnOverlayClick ? 'Yes' : 'No'}</li>
                <li>Close on Escape: {drawerConfig.closeOnEscape ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button onClick={closeDrawer}>Close Drawer</Button>
            </div>
          </Stack>
        </Drawer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of drawer configuration options and behaviors.',
      },
    },
  },
};