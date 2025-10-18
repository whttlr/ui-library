import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NavItem } from './NavItem';
import { Card } from '../Card/Card';
import { 
  Home, 
  Settings, 
  Activity, 
  BarChart3, 
  Archive, 
  Bell, 
  User, 
  HelpCircle,
  Play,
  Pause,
  Square,
  Monitor,
  Wrench,
  AlertTriangle
} from 'lucide-react';

const meta: Meta<typeof NavItem> = {
  title: 'Primitives/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A navigation item component for building navigation menus, sidebars, and tab interfaces with support for icons, badges, and multiple states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'bordered', 'pill'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    badge: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Dashboard',
    icon: <Home size={18} />,
  },
  render: (args) => (
    <div style={{ width: '200px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
      <NavItem {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      width: '600px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Default</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem label="Dashboard" icon={<Home size={18} />} variant="default" />
          <NavItem label="Settings" icon={<Settings size={18} />} variant="default" active />
        </div>
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Subtle</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem label="Analytics" icon={<BarChart3 size={18} />} variant="subtle" />
          <NavItem label="Activity" icon={<Activity size={18} />} variant="subtle" active />
        </div>
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Bordered</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem label="Tools" icon={<Tool size={18} />} variant="bordered" />
          <NavItem label="Archive" icon={<Archive size={18} />} variant="bordered" active />
        </div>
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>Pill</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavItem label="Notifications" icon={<Bell size={18} />} variant="pill" badge="3" />
          <NavItem label="Profile" icon={<User size={18} />} variant="pill" active />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Small</h4>
        <NavItem label="Dashboard" icon={<Home size={14} />} size="sm" />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Medium</h4>
        <NavItem label="Dashboard" icon={<Home size={18} />} size="md" />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Large</h4>
        <NavItem label="Dashboard" icon={<Home size={20} />} size="lg" />
      </div>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '0.5rem',
      width: '250px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <NavItem label="Notifications" icon={<Bell size={18} />} badge="12" />
      <NavItem label="Messages" icon={<User size={18} />} badge="3" />
      <NavItem label="Alerts" icon={<AlertTriangle size={18} />} badge="!" />
      <NavItem label="Updates" icon={<Archive size={18} />} badge="99+" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '0.5rem',
      width: '250px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <NavItem label="Normal State" icon={<Home size={18} />} />
      <NavItem label="Active State" icon={<Settings size={18} />} active />
      <NavItem label="Disabled State" icon={<Wrench size={18} />} disabled />
      <NavItem label="With Badge" icon={<Bell size={18} />} badge="5" />
    </div>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '0.5rem',
      width: '200px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '1rem'
    }}>
      <NavItem label="Home" />
      <NavItem label="Settings" active />
      <NavItem label="Profile" badge="1" />
      <NavItem label="Help" disabled />
    </div>
  ),
};

export const CNCSidebar: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
      { id: 'control', label: 'Machine Control', icon: <Play size={18} /> },
      { id: 'monitor', label: 'Monitor', icon: <Monitor size={18} />, badge: '3' },
      { id: 'tools', label: 'Tool Management', icon: <Tool size={18} /> },
      { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} />, badge: '2' },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
      { id: 'alerts', label: 'Alerts', icon: <AlertTriangle size={18} />, badge: '!' },
      { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    return (
      <div style={{ 
        width: '280px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.125rem',
          fontWeight: 600,
        }}>
          CNC Control Center
        </h3>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              badge={item.badge}
              active={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </nav>
        
        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid hsl(240, 3.7%, 15.9%)'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'hsl(240, 5%, 64.9%)' }}>
            CNC Controller v2.1.0
          </p>
          <NavItem label="Help & Support" icon={<HelpCircle size={18} />} variant="subtle" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete CNC sidebar navigation with machine control sections and status badges.',
      },
    },
  },
};

export const MachineOperationsMenu: Story = {
  render: () => {
    const [activeOperation, setActiveOperation] = useState('running');

    const operations = [
      { id: 'running', label: 'Running Jobs', icon: <Play size={18} />, badge: '2' },
      { id: 'paused', label: 'Paused Jobs', icon: <Pause size={18} />, badge: '1' },
      { id: 'stopped', label: 'Stopped Jobs', icon: <Square size={18} /> },
      { id: 'monitoring', label: 'System Monitor', icon: <Monitor size={18} /> },
      { id: 'maintenance', label: 'Maintenance Mode', icon: <Wrench size={18} />, disabled: true },
    ];

    return (
      <div style={{ 
        width: '320px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.125rem',
          fontWeight: 600,
        }}>
          Machine Operations
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {operations.map((operation) => (
            <NavItem
              key={operation.id}
              label={operation.label}
              icon={operation.icon}
              badge={operation.badge}
              active={activeOperation === operation.id}
              disabled={operation.disabled}
              onClick={() => !operation.disabled && setActiveOperation(operation.id)}
              variant="bordered"
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Machine operations menu with status badges and disabled states.',
      },
    },
  },
};

export const CompactNavigation: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'jobs', label: 'Jobs', badge: '5' },
      { id: 'tools', label: 'Tools' },
      { id: 'logs', label: 'Logs', badge: '12' },
    ];

    return (
      <div style={{ 
        width: '400px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <NavItem
              key={tab.id}
              label={tab.label}
              badge={tab.badge}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="pill"
              size="sm"
              style={{ flex: 1 }}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact horizontal navigation using pill variant for tab-like interface.',
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
        Before vs After: NavItem Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            {/* Legacy inline implementation */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'hsl(262, 83%, 58%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              textAlign: 'left',
              width: '100%',
            }}>
              <Home size={18} />
              Dashboard
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: NavItem Component
          </h4>
          <div style={{ backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '8px', padding: '1rem' }}>
            <NavItem
              label="Dashboard"
              icon={<Home size={18} />}
              active
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the NavItem component vs inline implementation.',
      },
    },
  },
};