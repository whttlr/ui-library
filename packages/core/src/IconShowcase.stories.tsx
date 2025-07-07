import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './primitives/Card/Card';
import { Button } from './primitives/Button/Button';
import { Badge } from './primitives/Badge/Badge';
import {
  // Machine & CNC Icons
  Settings, Wrench, Cpu, Power, PowerOff, Activity, Zap, Shield,
  // Navigation & Controls
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, Target, RotateCcw, RotateCw,
  Play, Pause, Square, SkipForward, SkipBack, FastForward, Rewind,
  // Status & Alerts
  CheckCircle, XCircle, AlertTriangle, AlertCircle, Info, Bell, BellRing,
  // Connectivity & Communication
  Wifi, WifiOff, Bluetooth, BluetoothConnected, Signal, SignalHigh, SignalLow,
  // Files & Data
  File, FileText, Folder, FolderOpen, Download, Upload, Save, Copy,
  // Interface Elements
  Eye, EyeOff, Search, Filter, Menu, MoreHorizontal, MoreVertical,
  // Time & Progress
  Clock, Timer, Calendar, TrendingUp, TrendingDown, BarChart3, PieChart,
  // Users & Account
  User, Users, UserPlus, UserMinus, Lock, Unlock, Key,
  // Communication
  Mail, MessageSquare, Phone, PhoneCall, Video, VideoOff,
  // Hardware
  HardDrive, Monitor, Smartphone, Tablet, Laptop, Server,
  // Measurement & Tools
  Ruler, Gauge, Thermometer, Battery, BatteryLow, Volume2, VolumeX,
  // Location & Movement
  MapPin, Navigation, Compass, Move, MousePointer, Crosshair,
} from 'lucide-react';

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete icon library for CNC and industrial applications using Lucide React icons.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Icon categories matching the original UIDemoView usage
const iconCategories = {
  machine: {
    title: 'Machine & CNC',
    icons: [
      { Icon: Settings, name: 'Settings' },
      { Icon: Wrench, name: 'Wrench' },
      { Icon: Cpu, name: 'CPU' },
      { Icon: Power, name: 'Power' },
      { Icon: PowerOff, name: 'Power Off' },
      { Icon: Activity, name: 'Activity' },
      { Icon: Zap, name: 'Zap' },
      { Icon: Shield, name: 'Shield' },
    ]
  },
  controls: {
    title: 'Navigation & Controls',
    icons: [
      { Icon: ArrowUp, name: 'Arrow Up' },
      { Icon: ArrowDown, name: 'Arrow Down' },
      { Icon: ArrowLeft, name: 'Arrow Left' },
      { Icon: ArrowRight, name: 'Arrow Right' },
      { Icon: Home, name: 'Home' },
      { Icon: Target, name: 'Target' },
      { Icon: RotateCcw, name: 'Rotate CCW' },
      { Icon: RotateCw, name: 'Rotate CW' },
      { Icon: Play, name: 'Play' },
      { Icon: Pause, name: 'Pause' },
      { Icon: Square, name: 'Stop' },
    ]
  },
  status: {
    title: 'Status & Alerts',
    icons: [
      { Icon: CheckCircle, name: 'Check Circle' },
      { Icon: XCircle, name: 'X Circle' },
      { Icon: AlertTriangle, name: 'Alert Triangle' },
      { Icon: AlertCircle, name: 'Alert Circle' },
      { Icon: Info, name: 'Info' },
      { Icon: Bell, name: 'Bell' },
      { Icon: BellRing, name: 'Bell Ring' },
    ]
  },
  connectivity: {
    title: 'Connectivity',
    icons: [
      { Icon: Wifi, name: 'WiFi' },
      { Icon: WifiOff, name: 'WiFi Off' },
      { Icon: Bluetooth, name: 'Bluetooth' },
      { Icon: BluetoothConnected, name: 'Bluetooth Connected' },
      { Icon: Signal, name: 'Signal' },
      { Icon: SignalHigh, name: 'Signal High' },
      { Icon: SignalLow, name: 'Signal Low' },
    ]
  },
  files: {
    title: 'Files & Data',
    icons: [
      { Icon: File, name: 'File' },
      { Icon: FileText, name: 'File Text' },
      { Icon: Folder, name: 'Folder' },
      { Icon: Download, name: 'Download' },
      { Icon: Upload, name: 'Upload' },
      { Icon: Save, name: 'Save' },
      { Icon: Copy, name: 'Copy' },
    ]
  },
  measurement: {
    title: 'Measurement & Tools',
    icons: [
      { Icon: Ruler, name: 'Ruler' },
      { Icon: Gauge, name: 'Gauge' },
      { Icon: Thermometer, name: 'Thermometer' },
      { Icon: Battery, name: 'Battery' },
      { Icon: Crosshair, name: 'Crosshair' },
      { Icon: Move, name: 'Move' },
      { Icon: MapPin, name: 'Map Pin' },
    ]
  }
};

export const IconLibrary: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Icon Library
        </h1>
        <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
          Complete icon set for CNC and industrial applications
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {Object.entries(iconCategories).map(([key, category]) => (
          <Card key={key} style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              {category.title}
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
              gap: '1rem' 
            }}>
              {category.icons.map(({ Icon, name }) => (
                <div 
                  key={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(240, 3.7%, 20%)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(240, 3.7%, 15.9%)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Icon size={24} strokeWidth={1} style={{ marginBottom: '0.5rem', color: 'hsl(0, 0%, 98%)' }} />
                  <span style={{ fontSize: '0.75rem', textAlign: 'center', color: 'hsl(240, 5%, 64.9%)' }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete icon library organized by category for easy discovery and usage in CNC applications.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
    }}>
      <Card style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
          Icon Sizes
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { size: 16, label: 'Small (16px)' },
            { size: 20, label: 'Default (20px)' },
            { size: 24, label: 'Medium (24px)' },
            { size: 32, label: 'Large (32px)' },
            { size: 48, label: 'Extra Large (48px)' },
          ].map(({ size, label }) => (
            <div key={size} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '6px'
            }}>
              <Settings size={size} strokeWidth={1} />
              <span style={{ fontSize: '0.875rem' }}>{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available icon sizes for different use cases.',
      },
    },
  },
};

export const IconsInComponents: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      color: 'hsl(0, 0%, 98%)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
          Icons in Components
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          
          {/* Buttons with Icons */}
          <Card style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Buttons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button variant="success">
                <Play size={16} strokeWidth={1} style={{ marginRight: '0.5rem' }} />
                Start Machine
              </Button>
              <Button variant="warning">
                <Pause size={16} strokeWidth={1} style={{ marginRight: '0.5rem' }} />
                Pause Operation
              </Button>
              <Button variant="emergency">
                <Power size={16} strokeWidth={1} style={{ marginRight: '0.5rem' }} />
                Emergency Stop
              </Button>
              <Button variant="secondary">
                <Settings size={16} strokeWidth={1} style={{ marginRight: '0.5rem' }} />
                Settings
              </Button>
            </div>
          </Card>

          {/* Badges with Icons */}
          <Card style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Badges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} strokeWidth={1} style={{ color: 'rgb(74, 222, 128)' }} />
                <Badge variant="success">Connected</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} strokeWidth={1} style={{ color: 'rgb(96, 165, 250)' }} />
                <Badge variant="info">Running</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} strokeWidth={1} style={{ color: 'rgb(251, 191, 36)' }} />
                <Badge variant="warning">Warning</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <XCircle size={16} strokeWidth={1} style={{ color: 'rgb(248, 113, 113)' }} />
                <Badge variant="error">Error</Badge>
              </div>
            </div>
          </Card>

          {/* Control Panel */}
          <Card style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Control Panel</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <div></div>
              <Button variant="cnc" size="sm">
                <ArrowUp size={14} strokeWidth={1} />
              </Button>
              <div></div>
              
              <Button variant="cnc" size="sm">
                <ArrowLeft size={14} strokeWidth={1} />
              </Button>
              <Button variant="cnc" size="sm">
                <Home size={14} strokeWidth={1} />
              </Button>
              <Button variant="cnc" size="sm">
                <ArrowRight size={14} strokeWidth={1} />
              </Button>
              
              <div></div>
              <Button variant="cnc" size="sm">
                <ArrowDown size={14} strokeWidth={1} />
              </Button>
              <div></div>
            </div>
          </Card>

          {/* Status Indicators */}
          <Card style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Status Icons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Wifi size={20} strokeWidth={1} style={{ color: 'rgb(74, 222, 128)' }} />
                <span style={{ fontSize: '0.875rem' }}>Network Connected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bluetooth size={20} strokeWidth={1} style={{ color: 'rgb(96, 165, 250)' }} />
                <span style={{ fontSize: '0.875rem' }}>Bluetooth Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Battery size={20} strokeWidth={1} style={{ color: 'rgb(251, 191, 36)' }} />
                <span style={{ fontSize: '0.875rem' }}>Battery: 75%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Shield size={20} strokeWidth={1} style={{ color: 'rgb(74, 222, 128)' }} />
                <span style={{ fontSize: '0.875rem' }}>Safety Active</span>
              </div>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of how icons are integrated into various UI components for enhanced usability.',
      },
    },
  },
};