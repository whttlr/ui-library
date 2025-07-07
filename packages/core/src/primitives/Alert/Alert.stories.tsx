import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription, AlertActions, AlertCompound } from './Alert';
import { Button } from '../Button/Button';
import { CheckCircle, AlertTriangle, XCircle, Info as InfoIcon, Settings, Wifi, WifiOff, AlertCircle, Zap, RefreshCw, ExternalLink } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display important messages and notifications to users. Supports various types including info, success, warning, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive', 'cnc'],
      description: 'Visual style variant of the alert',
    },
    layout: {
      control: 'select',
      options: ['simple', 'detailed', 'banner'],
      description: 'Layout style of the alert',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the alert',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show default icon for variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    actions: {
      control: 'text',
      description: 'Action buttons or content',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when alert is dismissed',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants with icons
export const Info: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="info"
        title="System Information"
        description="Machine diagnostics completed successfully. All systems operational."
        icon={<InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />}
      />
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="success"
        title="Operation Complete"
        description="Job #1247 has been completed successfully. Quality check passed."
        icon={<CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />}
      />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="warning"
        title="Low Coolant Level"
        description="Coolant level is below 30%. Consider refilling before next operation."
        icon={<AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />}
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="destructive"
        title="Critical Error"
        description="Spindle motor temperature exceeded safe limits. Machine stopped for protection."
        icon={<XCircle style={{ width: '1.25rem', height: '1.25rem' }} />}
      />
    </div>
  ),
};

// Without titles
export const InfoNoTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message without a title.',
  },
};

export const SuccessNoTitle: Story = {
  args: {
    variant: 'success',
    children: 'File uploaded successfully.',
  },
};

// Dismissible alerts
export const Dismissible: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);
    
    if (!isVisible) {
      return (
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'hsl(240, 10%, 3.9%)',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', margin: 0 }}>Alert dismissed</p>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => setIsVisible(true)}
            style={{ marginTop: '0.5rem' }}
          >
            Show Alert Again
          </Button>
        </div>
      );
    }
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Alert 
          variant="warning"
          title="Maintenance Required"
          description="This alert can be dismissed by clicking the X button."
          icon={<AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />}
          dismissible
          onDismiss={() => setIsVisible(false)}
        />
      </div>
    );
  },
};

// With custom icons
export const CustomIcon: Story = {
  render: () => (
    <Alert variant="info" title="System Status">
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4" />
        System configuration is being updated.
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with custom icon content',
      },
    },
  },
};

// CNC-specific alerts
export const MachineConnected: Story = {
  render: () => (
    <Alert variant="success" title="Machine Connected">
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4" />
        Successfully connected to CNC machine at COM3 (115200 baud)
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC machine connection success alert',
      },
    },
  },
};

export const MachineDisconnected: Story = {
  render: () => (
    <Alert variant="destructive" title="Connection Lost" dismissible>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <WifiOff style={{ width: '1rem', height: '1rem' }} />
          Lost connection to CNC machine
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline">Retry Connection</Button>
          <Button size="sm" variant="ghost">Check Settings</Button>
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC machine disconnection alert with action buttons',
      },
    },
  },
};

export const EmergencyStop: Story = {
  render: () => (
    <Alert variant="error" title="EMERGENCY STOP ACTIVATED">
      <div className="space-y-2">
        <p>All machine operations have been halted for safety.</p>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="emergency">Reset Emergency Stop</Button>
          <Button size="sm" variant="outline">View Diagnostics</Button>
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Emergency stop alert with critical styling and actions',
      },
    },
  },
};

// System notifications
export const LowBattery: Story = {
  render: () => (
    <Alert variant="warning" title="Low Battery Warning">
      <div className="space-y-2">
        <p>Backup battery is running low (15% remaining). Consider replacing soon.</p>
        <div className="text-sm text-gray-600">
          Last checked: 2 minutes ago
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'System warning with additional details',
      },
    },
  },
};

export const JobComplete: Story = {
  render: () => (
    <Alert variant="success" title="Job Completed" dismissible>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Manufacturing job "Part_A_v2.nc" completed successfully
        </div>
        <div className="text-sm space-y-1">
          <div>Duration: 2h 34m</div>
          <div>Parts produced: 50</div>
          <div>Quality: 100%</div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm">View Report</Button>
          <Button size="sm" variant="outline">Start Next Job</Button>
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Job completion alert with detailed statistics and next actions',
      },
    },
  },
};

// Maintenance alerts
export const MaintenanceRequired: Story = {
  render: () => (
    <Alert variant="warning" title="Maintenance Required">
      <div className="space-y-2">
        <p>Scheduled maintenance is due for the following components:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Spindle bearing lubrication</li>
          <li>Belt tension adjustment</li>
          <li>Coolant system check</li>
        </ul>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="warning">Schedule Maintenance</Button>
          <Button size="sm" variant="ghost">Snooze (24h)</Button>
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Maintenance scheduling alert with checklist and actions',
      },
    },
  },
};

// Update notifications
export const SoftwareUpdate: Story = {
  render: () => (
    <Alert variant="info" title="Software Update Available" dismissible>
      <div className="space-y-2">
        <p>Version 2.1.0 is now available with new features and bug fixes.</p>
        <div className="text-sm text-gray-600">
          <div>• Enhanced 3D visualization</div>
          <div>• Improved jog controls</div>
          <div>• Bug fixes and performance improvements</div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm">Update Now</Button>
          <Button size="sm" variant="outline">View Changelog</Button>
          <Button size="sm" variant="ghost">Remind Later</Button>
        </div>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Software update notification with feature highlights',
      },
    },
  },
};

// Showcase all variants with better layout
export const AllVariants: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        fontSize: '1.125rem', 
        fontWeight: 600,
        color: 'hsl(0, 0%, 98%)'
      }}>
        Alert System
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Alert 
          variant="info"
          title="System Information"
          description="Machine diagnostics completed successfully. All systems operational."
          icon={<InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />}
        />

        <Alert 
          variant="success"
          title="Operation Complete"
          description="Job #1247 has been completed successfully. Quality check passed."
          icon={<CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />}
        />

        <Alert 
          variant="warning"
          title="Low Coolant Level"
          description="Coolant level is below 30%. Consider refilling before next operation."
          icon={<AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />}
        />

        <Alert 
          variant="destructive"
          title="Critical Error"
          description="Spindle motor temperature exceeded safe limits. Machine stopped for protection."
          icon={<XCircle style={{ width: '1.25rem', height: '1.25rem' }} />}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available alert variants displayed together with improved layout and CNC-specific content',
      },
    },
  },
};// Enhanced alerts with NEW API
export const AlertWithActions: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="warning"
        title="Coolant System Alert"
        description="Coolant temperature is approaching maximum threshold (85°C). Immediate action required."
        actions={
          <>
            <Button size="sm" variant="warning" leftIcon={<RefreshCw size={14} />}>
              Refresh Coolant
            </Button>
            <Button size="sm" variant="outline">
              View Settings
            </Button>
          </>
        }
        dismissible
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert using new actions prop for cleaner implementation',
      },
    },
  },
};

export const CNCAlert: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert 
        variant="cnc"
        layout="detailed"
        icon={<Zap size={20} />}
        title="CNC System Update"
        description="Firmware update available for improved precision and new G-code features. Estimated installation time: 15 minutes."
        actions={
          <>
            <Button size="sm" variant="cnc">
              Install Update
            </Button>
            <Button size="sm" variant="outline" rightIcon={<ExternalLink size={14} />}>
              Release Notes
            </Button>
          </>
        }
        dismissible
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific alert with enhanced styling and detailed layout',
      },
    },
  },
};

export const BannerAlert: Story = {
  render: () => (
    <div style={{ 
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '800px'
    }}>
      <Alert 
        variant="warning"
        layout="banner"
        title="System Maintenance"
        description="Scheduled maintenance window from 2:00 AM - 4:00 AM EST. Some features may be unavailable."
        actions={
          <Button size="sm" variant="outline">
            View Schedule
          </Button>
        }
        dismissible
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banner-style alert for system-wide notifications',
      },
    },
  },
};

export const CompoundComponentExample: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <AlertCompound variant="success" icon={<CheckCircle size={18} />} dismissible>
        <AlertTitle>Upload Complete</AlertTitle>
        <AlertDescription>
          Your G-code file has been successfully uploaded and validated. Ready for production.
        </AlertDescription>
        <AlertActions>
          <Button size="sm">Start Job</Button>
          <Button size="sm" variant="outline">Preview Toolpath</Button>
        </AlertActions>
      </AlertCompound>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using compound components for maximum flexibility',
      },
    },
  },
};

export const AlertSizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Small
        </h4>
        <Alert 
          variant="info" 
          size="sm"
          title="Small Alert" 
          description="This is a small alert with reduced padding and font size" 
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Default
        </h4>
        <Alert 
          variant="success" 
          size="default"
          title="Default Alert" 
          description="This is the default alert size with standard padding and font size" 
        />
      </div>
      
      <div>
        <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Large
        </h4>
        <Alert 
          variant="warning" 
          size="lg"
          title="Large Alert" 
          description="This is a large alert with increased padding and font size for greater prominence" 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert size variants for different emphasis levels',
      },
    },
  },
};

export const AlertVariations: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <Alert variant="info" title="Information" description="This is an info alert with default icon" />
      <Alert variant="success" title="Success" description="Operation completed successfully" />
      <Alert variant="warning" title="Warning" description="Please review before proceeding" />
      <Alert variant="destructive" title="Error" description="Something went wrong" />
      <Alert variant="cnc" title="CNC Alert" description="Industrial-style alert for CNC applications" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All alert variants with automatic icons and new API',
      },
    },
  },
};