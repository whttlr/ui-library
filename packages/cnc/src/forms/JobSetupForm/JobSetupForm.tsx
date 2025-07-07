import React, { useState } from 'react';
import { Card, Button, Input } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';

export interface JobSetupFormData {
  jobName: string;
  material: {
    type: string;
    thickness: number;
    dimensions: { width: number; height: number };
  };
  workOrigin: { x: number; y: number; z: number };
  tool: {
    number: number;
    diameter: number;
    feedRate: number;
    spindleSpeed: number;
  };
  settings: {
    safetyHeight: number;
    rapidHeight: number;
    stepDown: number;
  };
}

export interface JobSetupFormProps {
  initialData?: Partial<JobSetupFormData>;
  onSubmit: (data: JobSetupFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

const defaultFormData: JobSetupFormData = {
  jobName: '',
  material: {
    type: 'aluminum',
    thickness: 6,
    dimensions: { width: 100, height: 100 },
  },
  workOrigin: { x: 0, y: 0, z: 0 },
  tool: {
    number: 1,
    diameter: 6,
    feedRate: 1000,
    spindleSpeed: 12000,
  },
  settings: {
    safetyHeight: 10,
    rapidHeight: 5,
    stepDown: 1,
  },
};

export const JobSetupForm: React.FC<JobSetupFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  className,
}) => {
  const [formData, setFormData] = useState<JobSetupFormData>({
    ...defaultFormData,
    ...initialData,
  });

  const updateFormData = (section: keyof JobSetupFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof data === 'object' ? { ...prev[section], ...data } : data,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className={cn('max-w-lg mx-auto', className)}>
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h2 className="text-lg font-semibold">Job Setup</h2>
        <p className="text-sm text-muted-foreground">Configure job parameters</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Job Info */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Job Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Job Name</label>
            <Input
              value={formData.jobName}
              onChange={(e) => updateFormData('jobName', e.target.value)}
              placeholder="Enter job name"
            />
          </div>
        </div>

        {/* Material */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Material</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Material Type</label>
            <select
              value={formData.material.type}
              onChange={(e) => updateFormData('material', { type: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="aluminum">Aluminum</option>
              <option value="steel">Steel</option>
              <option value="wood">Wood</option>
              <option value="plastic">Plastic</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Width</label>
              <Input
                type="number"
                value={formData.material.dimensions.width}
                onChange={(e) => updateFormData('material', { 
                  dimensions: { ...formData.material.dimensions, width: Number(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height</label>
              <Input
                type="number"
                value={formData.material.dimensions.height}
                onChange={(e) => updateFormData('material', { 
                  dimensions: { ...formData.material.dimensions, height: Number(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Thickness</label>
              <Input
                type="number"
                value={formData.material.thickness}
                onChange={(e) => updateFormData('material', { thickness: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Tool Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Tool Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tool Number</label>
              <Input
                type="number"
                value={formData.tool.number}
                onChange={(e) => updateFormData('tool', { number: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diameter (mm)</label>
              <Input
                type="number"
                value={formData.tool.diameter}
                onChange={(e) => updateFormData('tool', { diameter: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Feed Rate</label>
              <Input
                type="number"
                value={formData.tool.feedRate}
                onChange={(e) => updateFormData('tool', { feedRate: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Spindle Speed</label>
              <Input
                type="number"
                value={formData.tool.spindleSpeed}
                onChange={(e) => updateFormData('tool', { spindleSpeed: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-border">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Starting Job...' : 'Start Job'}
          </Button>
        </div>
      </div>
    </Card>
  );
};