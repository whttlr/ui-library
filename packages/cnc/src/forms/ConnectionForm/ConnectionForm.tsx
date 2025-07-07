import React, { useState } from 'react';
import { Card, Button, Input } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';
import { validateIpAddress, validatePort } from '../../validation';
import { Wifi, WifiOff } from 'lucide-react';

export interface ConnectionFormData {
  type: 'serial' | 'ethernet' | 'usb';
  serial?: {
    port: string;
    baudRate: number;
  };
  ethernet?: {
    ipAddress: string;
    port: number;
  };
  usb?: {
    deviceId: string;
  };
}

export interface ConnectionFormProps {
  initialData?: Partial<ConnectionFormData>;
  onConnect: (data: ConnectionFormData) => void;
  onDisconnect?: () => void;
  isConnected?: boolean;
  loading?: boolean;
  className?: string;
}

const defaultFormData: ConnectionFormData = {
  type: 'serial',
  serial: {
    port: 'COM1',
    baudRate: 115200,
  },
  ethernet: {
    ipAddress: '192.168.1.100',
    port: 8080,
  },
  usb: {
    deviceId: '',
  },
};

export const ConnectionForm: React.FC<ConnectionFormProps> = ({
  initialData = {},
  onConnect,
  onDisconnect,
  isConnected = false,
  loading = false,
  className,
}) => {
  const [formData, setFormData] = useState<ConnectionFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (updates: Partial<ConnectionFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.type === 'ethernet' && formData.ethernet) {
      const ipResult = validateIpAddress(formData.ethernet.ipAddress);
      if (!ipResult.isValid) {
        newErrors.ipAddress = ipResult.message!;
      }

      const portResult = validatePort(formData.ethernet.port);
      if (!portResult.isValid) {
        newErrors.port = portResult.message!;
      }
    }

    if (formData.type === 'serial' && formData.serial) {
      if (!formData.serial.port.trim()) {
        newErrors.port = 'Port is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = () => {
    if (validateForm()) {
      onConnect(formData);
    }
  };

  const handleDisconnect = () => {
    onDisconnect?.();
  };

  return (
    <Card className={cn('max-w-md mx-auto', className)}>
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Connection</h2>
            <p className="text-sm text-muted-foreground">Connect to your CNC machine</p>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-gray-400" />
            )}
            <span className={cn(
              'text-sm font-medium',
              isConnected ? 'text-green-600' : 'text-gray-400'
            )}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Connection Type</label>
          <select
            value={formData.type}
            onChange={(e) => updateFormData({ type: e.target.value as ConnectionFormData['type'] })}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
            disabled={isConnected}
          >
            <option value="serial">Serial Port</option>
            <option value="ethernet">Ethernet</option>
            <option value="usb">USB</option>
          </select>
        </div>

        {formData.type === 'serial' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Port</label>
              <Input
                value={formData.serial?.port || ''}
                onChange={(e) => updateFormData({ 
                  serial: { ...formData.serial!, port: e.target.value }
                })}
                placeholder="COM1, /dev/ttyUSB0, etc."
                disabled={isConnected}
                error={errors.port}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Baud Rate</label>
              <select
                value={formData.serial?.baudRate || 115200}
                onChange={(e) => updateFormData({ 
                  serial: { ...formData.serial!, baudRate: Number(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                disabled={isConnected}
              >
                <option value={9600}>9600</option>
                <option value={19200}>19200</option>
                <option value={38400}>38400</option>
                <option value={57600}>57600</option>
                <option value={115200}>115200</option>
              </select>
            </div>
          </>
        )}

        {formData.type === 'ethernet' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">IP Address</label>
              <Input
                value={formData.ethernet?.ipAddress || ''}
                onChange={(e) => updateFormData({ 
                  ethernet: { ...formData.ethernet!, ipAddress: e.target.value }
                })}
                placeholder="192.168.1.100"
                disabled={isConnected}
                error={errors.ipAddress}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Port</label>
              <Input
                type="number"
                value={formData.ethernet?.port || ''}
                onChange={(e) => updateFormData({ 
                  ethernet: { ...formData.ethernet!, port: Number(e.target.value) }
                })}
                placeholder="8080"
                disabled={isConnected}
                error={errors.port}
              />
            </div>
          </>
        )}

        {formData.type === 'usb' && (
          <div>
            <label className="block text-sm font-medium mb-1">Device ID</label>
            <Input
              value={formData.usb?.deviceId || ''}
              onChange={(e) => updateFormData({ 
                usb: { ...formData.usb!, deviceId: e.target.value }
              })}
              placeholder="USB Device ID"
              disabled={isConnected}
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {isConnected ? (
            <Button 
              variant="destructive" 
              onClick={handleDisconnect} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Disconnecting...' : 'Disconnect'}
            </Button>
          ) : (
            <Button 
              onClick={handleConnect} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};