import * as React from 'react';
import { 
  RotateCw, 
  Power, 
  Gauge,
  AlertTriangle 
} from 'lucide-react';
import { Button, tokens, SliderInput, cn } from '@whttlr/ui-core';

export interface SpindleSpeedControlProps {
  currentSpeed: number
  targetSpeed: number
  onSpeedChange: (speed: number) => void
  onStart?: () => void
  onStop?: () => void
  isRunning?: boolean
  minSpeed?: number
  maxSpeed?: number
  unit?: 'RPM' | 'SFM'
  presets?: number[]
  showOverride?: boolean
  overridePercentage?: number
  onOverrideChange?: (percentage: number) => void
  disabled?: boolean
  className?: string
}

export const SpindleSpeedControl: React.FC<SpindleSpeedControlProps> = ({
  currentSpeed,
  targetSpeed,
  onSpeedChange,
  onStart,
  onStop,
  isRunning = false,
  minSpeed = 0,
  maxSpeed = 24000,
  unit = 'RPM',
  presets = [1000, 3000, 6000, 12000, 18000, 24000],
  showOverride = true,
  overridePercentage = 100,
  onOverrideChange,
  disabled = false,
  className,
}) => {
  const actualSpeed = Math.round(currentSpeed * (overridePercentage / 100));
  const isAtSpeed = Math.abs(currentSpeed - targetSpeed) < targetSpeed * 0.02; // 2% tolerance

  // Container styles
  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border.default}`,
    padding: tokens.spacing.lg,
  };

  // Status indicator styles
  const getStatusColor = () => {
    if (!isRunning) return tokens.colors.text.secondary;
    if (!isAtSpeed) return tokens.colors.status.warning;
    return tokens.colors.status.success;
  };

  const statusStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  };

  const statusIndicatorStyles: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: getStatusColor(),
    boxShadow: isRunning ? `0 0 8px ${getStatusColor()}` : 'none',
    transition: 'all 0.3s ease',
  };

  // Speed display styles
  const speedDisplayStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: tokens.spacing.lg,
  };

  const currentSpeedStyles: React.CSSProperties = {
    fontSize: tokens.text.size['2xl'][0],
    fontWeight: tokens.text.weight.bold,
    fontFamily: tokens.text.family.mono.join(', '),
    color: tokens.colors.text.primary,
  };

  const targetSpeedStyles: React.CSSProperties = {
    fontSize: tokens.text.size.base[0],
    color: tokens.colors.text.secondary,
    fontFamily: tokens.text.family.mono.join(', '),
  };

  // Control button styles
  const controlButtonStyles: React.CSSProperties = {
    flex: 1,
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Status Indicator */}
      <div style={statusStyles}>
        <div style={statusIndicatorStyles} />
        <span style={{ 
          fontSize: tokens.text.size.sm[0], 
          color: tokens.colors.text.secondary,
          fontWeight: tokens.text.weight.medium,
        }}>
          {!isRunning ? 'Stopped' : !isAtSpeed ? 'Ramping' : 'At Speed'}
        </span>
        {isRunning && !isAtSpeed && (
          <AlertTriangle size={16} color={tokens.colors.status.warning} />
        )}
      </div>

      {/* Speed Display */}
      <div style={speedDisplayStyles}>
        <div>
          <div style={currentSpeedStyles}>
            {actualSpeed.toLocaleString()} {unit}
          </div>
          {overridePercentage !== 100 && (
            <div style={{ 
              fontSize: tokens.text.size.xs[0], 
              color: tokens.colors.status.info,
              marginTop: tokens.spacing.xs,
            }}>
              Override: {overridePercentage}%
            </div>
          )}
        </div>
        <div style={targetSpeedStyles}>
          Target: {targetSpeed.toLocaleString()} {unit}
        </div>
      </div>

      {/* Speed Control Slider */}
      <div style={{ marginBottom: tokens.spacing.lg }}>
        <SliderInput
          label="Spindle Speed"
          value={targetSpeed}
          onChange={onSpeedChange}
          min={minSpeed}
          max={maxSpeed}
          step={100}
          unit={unit}
          disabled={disabled || isRunning}
          showInput={true}
        />
      </div>

      {/* Preset Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: tokens.spacing.sm,
        marginBottom: tokens.spacing.lg,
      }}>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={targetSpeed === preset ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSpeedChange(preset)}
            disabled={disabled || isRunning}
          >
            {preset >= 1000 ? `${preset / 1000}k` : preset}
          </Button>
        ))}
      </div>

      {/* Override Control */}
      {showOverride && onOverrideChange && (
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <SliderInput
            label="Speed Override"
            value={overridePercentage}
            onChange={onOverrideChange}
            min={0}
            max={200}
            step={5}
            unit="%"
            disabled={disabled}
            showInput={true}
          />
          <div style={{ 
            display: 'flex', 
            gap: tokens.spacing.xs,
            marginTop: tokens.spacing.sm,
          }}>
            {[50, 75, 100, 125, 150].map((percentage) => (
              <Button
                key={percentage}
                variant={overridePercentage === percentage ? 'default' : 'outline'}
                size="sm"
                onClick={() => onOverrideChange(percentage)}
                disabled={disabled}
                style={{ flex: 1 }}
              >
                {percentage}%
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: tokens.spacing.md }}>
        {!isRunning ? (
          <Button
            variant="success"
            size="lg"
            onClick={onStart}
            disabled={disabled || targetSpeed === 0}
            leftIcon={<Power size={20} />}
            style={controlButtonStyles}
          >
            Start Spindle
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="lg"
            onClick={onStop}
            disabled={disabled}
            leftIcon={<Power size={20} />}
            style={controlButtonStyles}
          >
            Stop Spindle
          </Button>
        )}
      </div>
    </div>
  );
};

// Compact version for space-constrained layouts
export interface CompactSpindleControlProps {
  currentSpeed: number
  isRunning: boolean
  onToggle: () => void
  disabled?: boolean
  className?: string
}

export const CompactSpindleControl: React.FC<CompactSpindleControlProps> = ({
  currentSpeed,
  isRunning,
  onToggle,
  disabled = false,
  className,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.default}`,
  };

  const speedStyles: React.CSSProperties = {
    fontSize: tokens.text.size.lg[0],
    fontWeight: tokens.text.weight.semibold,
    fontFamily: tokens.text.family.mono.join(', '),
    color: isRunning ? tokens.colors.status.success : tokens.colors.text.secondary,
  };

  const iconStyles: React.CSSProperties = {
    animation: isRunning ? 'spin 2s linear infinite' : 'none',
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={iconStyles}>
        <RotateCw size={24} color={isRunning ? tokens.colors.status.success : tokens.colors.text.secondary} />
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={speedStyles}>
          {currentSpeed.toLocaleString()} RPM
        </div>
        <div style={{ 
          fontSize: tokens.text.size.xs[0], 
          color: tokens.colors.text.secondary,
        }}>
          Spindle {isRunning ? 'Running' : 'Stopped'}
        </div>
      </div>
      
      <Button
        variant={isRunning ? 'destructive' : 'success'}
        size="icon"
        onClick={onToggle}
        disabled={disabled}
      >
        <Power size={18} />
      </Button>
    </div>
  );
};