import * as React from 'react';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Alert } from '../primitives/Alert';
import { cn } from '../utils';
import { Power, PowerOff, RotateCcw, ShieldAlert } from 'lucide-react';

export interface SafetyControlPanelProps {
  isEmergencyStopped: boolean;
  onEmergencyStop: () => void;
  onReset: () => void;
  disabled?: boolean;
  className?: string;
}

export const SafetyControlPanel = React.forwardRef<HTMLDivElement, SafetyControlPanelProps>(
  ({ isEmergencyStopped, onEmergencyStop, onReset, disabled = false, className }, ref) => {
    return (
      <Card ref={ref} className={cn('p-6 border-red-500/20', className)}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold">Safety Controls</h3>
          </div>

          {isEmergencyStopped && (
            <Alert variant="destructive">
              <h5 className="mb-1 font-medium leading-none tracking-tight">Emergency Stop Active</h5>
              <div className="text-sm">Machine is stopped for safety. Click Reset to continue operations.</div>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="emergency"
              size="lg"
              onClick={onEmergencyStop}
              disabled={disabled || isEmergencyStopped}
              className="w-full h-16 text-lg font-bold"
              iconl={<Power className="w-6 h-6" />}
            >
              EMERGENCY STOP
            </Button>

            <Button
              variant="success"
              size="lg"
              onClick={onReset}
              disabled={disabled || !isEmergencyStopped}
              className="w-full"
              iconl={<RotateCcw className="w-4 h-4" />}
            >
              Reset System
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Emergency stop will immediately halt all machine operations
          </div>
        </div>
      </Card>
    );
  }
);
SafetyControlPanel.displayName = 'SafetyControlPanel';