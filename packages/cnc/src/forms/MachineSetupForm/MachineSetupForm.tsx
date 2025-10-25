import React, { useState } from 'react';
import { Card, Button, Input } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';
import { validateMachineId, validateWorkingArea } from '../../validation';

export interface MachineSetupFormData {
  // Basic Info
  machineId: string;
  machineName: string;
  machineType: 'cnc' | 'laser' | '3d-printer';
  manufacturer?: string;
  model?: string;
  
  // Working Area
  workingArea: {
    width: number;
    height: number;
    depth: number;
    units: 'mm' | 'in';
  };
  
  // Connection
  connection: {
    type: 'serial' | 'ethernet' | 'usb';
    port?: string;
    baudRate?: number;
    ipAddress?: string;
    networkPort?: number;
  };
  
  // Movement
  movement: {
    maxFeedRate: number;
    maxSpindleSpeed: number;
    homePosition: { x: number; y: number; z: number };
    jogDistances: number[];
    jogSpeeds: number[];
  };
  
  // Safety
  safety: {
    emergencyStopEnabled: boolean;
    softLimitsEnabled: boolean;
    hardLimitsEnabled: boolean;
    homingEnabled: boolean;
    probingEnabled: boolean;
  };
}

export interface MachineSetupFormProps {
  initialData?: Partial<MachineSetupFormData>;
  onSubmit: (data: MachineSetupFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

const defaultFormData: MachineSetupFormData = {
  machineId: '',
  machineName: '',
  machineType: 'cnc',
  workingArea: {
    width: 300,
    height: 200,
    depth: 50,
    units: 'mm',
  },
  connection: {
    type: 'serial',
    port: 'COM1',
    baudRate: 115200,
  },
  movement: {
    maxFeedRate: 5000,
    maxSpindleSpeed: 24000,
    homePosition: { x: 0, y: 0, z: 0 },
    jogDistances: [0.1, 1, 10, 100],
    jogSpeeds: [100, 500, 1000, 5000],
  },
  safety: {
    emergencyStopEnabled: true,
    softLimitsEnabled: true,
    hardLimitsEnabled: false,
    homingEnabled: true,
    probingEnabled: false,
  },
};

export const MachineSetupForm: React.FC<MachineSetupFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  className,
}) => {
  const [formData, setFormData] = useState<MachineSetupFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('basic');

  const updateFormData = (section: keyof MachineSetupFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof data === 'object' ? { ...prev[section], ...data } : data,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate machine ID
    const machineIdResult = validateMachineId(formData.machineId);
    if (!machineIdResult.isValid) {
      newErrors.machineId = machineIdResult.message!;
    }

    // Validate working area
    const workingAreaResult = validateWorkingArea(formData.workingArea);
    if (!workingAreaResult.isValid) {
      newErrors.workingArea = workingAreaResult.message!;
    }

    // Validate machine name
    if (!formData.machineName.trim()) {
      newErrors.machineName = 'Machine name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const tabs = [
    { key: 'basic', label: 'Basic Info' },
    { key: 'working-area', label: 'Working Area' },
    { key: 'connection', label: 'Connection' },
    { key: 'movement', label: 'Movement' },
    { key: 'safety', label: 'Safety' },
  ];

  return (
    <Card className={cn('max-w-2xl mx-auto', className)}>
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Machine Setup</h2>
        <p className="text-sm text-muted-foreground">Configure your CNC machine settings</p>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Machine ID *</label>
                <Input
                  value={formData.machineId}
                  onChange={(e) => updateFormData('machineId', e.target.value)}
                  placeholder="e.g., cnc-001"
                  error={errors.machineId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Machine Name *</label>
                <Input
                  value={formData.machineName}
                  onChange={(e) => updateFormData('machineName', e.target.value)}
                  placeholder="e.g., Workshop CNC Mill"
                  error={errors.machineName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Machine Type</label>
                <select
                  value={formData.machineType}
                  onChange={(e) => updateFormData('machineType', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="cnc">CNC Mill</option>
                  <option value="laser">Laser Cutter</option>
                  <option value="3d-printer">3D Printer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manufacturer</label>
                <Input
                  value={formData.manufacturer || ''}
                  onChange={(e) => updateFormData('manufacturer', e.target.value)}
                  placeholder="e.g., Haas, Tormach, etc."
                />
              </div>
            </div>
          )}

          {activeTab === 'working-area' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <Input
                    type="number"
                    value={formData.workingArea.width}
                    onChange={(e) => updateFormData('workingArea', { width: Number(e.target.value) })}
                    placeholder="300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <Input
                    type="number"
                    value={formData.workingArea.height}
                    onChange={(e) => updateFormData('workingArea', { height: Number(e.target.value) })}
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Depth</label>
                  <Input
                    type="number"
                    value={formData.workingArea.depth}
                    onChange={(e) => updateFormData('workingArea', { depth: Number(e.target.value) })}
                    placeholder="50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Units</label>
                <select
                  value={formData.workingArea.units}
                  onChange={(e) => updateFormData('workingArea', { units: e.target.value as 'mm' | 'in' })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="mm">Millimeters</option>
                  <option value="in">Inches</option>
                </select>
              </div>
              {errors.workingArea && (
                <p className="text-sm text-destructive">{errors.workingArea}</p>
              )}
            </div>
          )}

          {activeTab === 'connection' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Connection Type</label>
                <select
                  value={formData.connection.type}
                  onChange={(e) => updateFormData('connection', { type: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="serial">Serial Port</option>
                  <option value="ethernet">Ethernet</option>
                  <option value="usb">USB</option>
                </select>
              </div>
              {formData.connection.type === 'serial' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Port</label>
                    <Input
                      value={formData.connection.port || ''}
                      onChange={(e) => updateFormData('connection', { port: e.target.value })}
                      placeholder="COM1, /dev/ttyUSB0, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Baud Rate</label>
                    <select
                      value={formData.connection.baudRate || 115200}
                      onChange={(e) => updateFormData('connection', { baudRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
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
              {formData.connection.type === 'ethernet' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">IP Address</label>
                    <Input
                      value={formData.connection.ipAddress || ''}
                      onChange={(e) => updateFormData('connection', { ipAddress: e.target.value })}
                      placeholder="192.168.1.100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Port</label>
                    <Input
                      type="number"
                      value={formData.connection.networkPort || 8080}
                      onChange={(e) => updateFormData('connection', { networkPort: Number(e.target.value) })}
                      placeholder="8080"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Add other tab content here... */}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
          {onCancel && (
            <Button variant="outline-default" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </div>
    </Card>
  );
};