import * as React from 'react';
import { Badge } from '../primitives/Badge';
import { Card } from '../primitives/Card';
import { cn } from '../utils';
import { Wifi, WifiOff, Power, PowerOff, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
type MachineStatus = 'idle' | 'running' | 'error' | 'warning' | 'stopped';

interface StatusIndicatorProps {
  status: ConnectionStatus | MachineStatus;
  label?: string;
  className?: string;
}

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, label, className }, ref) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'connected':
          return {
            icon: <Wifi className="w-4 h-4" />,
            variant: 'success' as const,
            text: 'Connected',
            pulse: false
          };
        case 'disconnected':
          return {
            icon: <WifiOff className="w-4 h-4" />,
            variant: 'danger' as const,
            text: 'Disconnected',
            pulse: false
          };
        case 'connecting':
          return {
            icon: <Wifi className="w-4 h-4" />,
            variant: 'warning' as const,
            text: 'Connecting...',
            pulse: true
          };
        case 'idle':
          return {
            icon: <Clock className="w-4 h-4" />,
            variant: 'secondary' as const,
            text: 'Idle',
            pulse: false
          };
        case 'running':
          return {
            icon: <Zap className="w-4 h-4" />,
            variant: 'info' as const,
            text: 'Running',
            pulse: true
          };
        case 'error':
          return {
            icon: <AlertTriangle className="w-4 h-4" />,
            variant: 'danger' as const,
            text: 'Error',
            pulse: true
          };
        case 'warning':
          return {
            icon: <AlertTriangle className="w-4 h-4" />,
            variant: 'warning' as const,
            text: 'Warning',
            pulse: true
          };
        case 'stopped':
          return {
            icon: <PowerOff className="w-4 h-4" />,
            variant: 'destructive' as const,
            text: 'Stopped',
            pulse: false
          };
        default:
          return {
            icon: <CheckCircle className="w-4 h-4" />,
            variant: 'default' as const,
            text: 'Unknown',
            pulse: false
          };
      }
    };

    const config = getStatusConfig();

    return (
      <div ref={ref} className={cn('flex items-center space-x-2', className)}>
        <Badge variant={config.variant} pulse={config.pulse} className="flex items-center space-x-1">
          {config.icon}
          <span>{label || config.text}</span>
        </Badge>
      </div>
    );
  }
);
StatusIndicator.displayName = 'StatusIndicator';

interface ConnectionStatusProps {
  isConnected: boolean;
  className?: string;
}

export const ConnectionStatus = React.forwardRef<HTMLDivElement, ConnectionStatusProps>(
  ({ isConnected, className }, ref) => {
    return (
      <StatusIndicator
        ref={ref}
        status={isConnected ? 'connected' : 'disconnected'}
        className={className}
      />
    );
  }
);
ConnectionStatus.displayName = 'ConnectionStatus';

interface StatusDashboardProps {
  connectionStatus: ConnectionStatus;
  machineStatus: MachineStatus;
  className?: string;
}

export const StatusDashboard = React.forwardRef<HTMLDivElement, StatusDashboardProps>(
  ({ connectionStatus, machineStatus, className }, ref) => {
    return (
      <Card ref={ref} className={cn('p-4', className)}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">System Status</h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Connection:</span>
              <StatusIndicator status={connectionStatus} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Machine:</span>
              <StatusIndicator status={machineStatus} />
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
StatusDashboard.displayName = 'StatusDashboard';