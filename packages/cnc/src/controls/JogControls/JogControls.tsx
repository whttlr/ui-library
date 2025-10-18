import * as React from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  Home,
  Plus,
  Minus,
} from 'lucide-react';
import { Button, tokens } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';

export interface JogControlsProps {
  onJog: (axis: 'X' | 'Y' | 'Z', direction: number) => void
  onHome?: () => void
  disabled?: boolean
  className?: string
}

export const JogControls: React.FC<JogControlsProps> = ({
  onJog,
  onHome,
  disabled = false,
  className,
}) => {
  // For now, we'll define the styles inline until the import issue is resolved
  const directionalButtonStyle: React.CSSProperties = {
    minWidth: '60px',
    minHeight: '60px',
  };
  const homeButtonStyle: React.CSSProperties = {
    minWidth: '60px',
    minHeight: '60px',
  };
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* XY Controls */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground text-center">XY Movement</h3>
        <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', -1)}
            onMouseUp={() => onJog('Y', 1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowUpLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Y', 1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', 1)}
            onMouseUp={() => onJog('Y', 1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', -1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="success"
            size="jog"
            disabled={disabled}
            onClick={onHome}
            style={homeButtonStyle}
            className="transition-colors duration-200"
          >
            <Home className="h-6 w-6" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', 1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', -1)}
            onMouseUp={() => onJog('Y', -1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowDownLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Y', -1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', 1)}
            onMouseUp={() => onJog('Y', -1)}
            style={directionalButtonStyle}
            className="transition-colors duration-200"
          >
            <ArrowDownRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Z Controls */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground text-center">Z Movement</h3>
        <div className="flex justify-center gap-4">
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Z', 1)}
            style={{ minWidth: '60px', minHeight: '60px', backgroundColor: tokens.colors.status.info }}
            className="transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Z', -1)}
            style={{ minWidth: '60px', minHeight: '60px', backgroundColor: tokens.colors.status.info }}
            className="transition-colors duration-200"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export interface JogSpeedControlProps {
  speed: number
  onSpeedChange: (speed: number) => void
  unit?: 'mm/min' | 'in/min'
  min?: number
  max?: number
  step?: number
  className?: string
}

export const JogSpeedControl: React.FC<JogSpeedControlProps> = ({
  speed,
  onSpeedChange,
  unit = 'mm/min',
  min = 1,
  max = 10000,
  step = 10,
  className,
}) => {
  const presets = [10, 50, 100, 500, 1000, 5000];

  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          Jog Speed
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="min-w-[100px] text-right">
            <span className="font-mono text-lg font-semibold">{speed}</span>
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={speed === preset ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSpeedChange(preset)}
            className="min-w-[60px]"
          >
            {preset}
          </Button>
        ))}
      </div>
    </div>
  );
};

export interface JogDistanceControlProps {
  distance: number
  onDistanceChange: (distance: number) => void
  unit?: 'mm' | 'in'
  continuous?: boolean
  onContinuousChange?: (continuous: boolean) => void
  className?: string
}

export const JogDistanceControl: React.FC<JogDistanceControlProps> = ({
  distance,
  onDistanceChange,
  unit = 'mm',
  continuous = false,
  onContinuousChange,
  className,
}) => {
  const presets = [0.01, 0.1, 1, 10, 100];

  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Jog Distance
          </label>
          {onContinuousChange && (
            <label style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs, fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm, cursor: 'pointer' }}>
              <div
                onClick={() => onContinuousChange(!continuous)}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '3px',
                  border: '2px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: continuous ? 'hsl(262, 83%, 58%)' : 'transparent',
                  borderColor: continuous ? 'hsl(262, 83%, 58%)' : 'hsl(240, 3.7%, 15.9%)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  if (!continuous) {
                    e.currentTarget.style.borderColor = 'hsl(262, 83%, 58%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!continuous) {
                    e.currentTarget.style.borderColor = 'hsl(240, 3.7%, 15.9%)';
                  }
                }}
              >
                {continuous && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    style={{ color: 'white' }}
                  >
                    <path
                      d="M9 1L3.5 6.5L1 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span style={{ color: 'hsl(0, 0%, 98%)' }}>Continuous</span>
            </label>
          )}
        </div>

        {!continuous && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  min={0.001}
                  max={1000}
                  step={0.001}
                  value={distance}
                  onChange={(e) => onDistanceChange(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 40px 0 12px',
                    backgroundColor: '#18181a',
                    border: '1px solid hsl(240, 3.7%, 15.9%)',
                    borderRadius: '6px',
                    color: 'hsl(0, 0%, 98%)',
                    fontSize: '0.875rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    outline: 'none',
                    transition: 'border-color 0.2s ease-in-out',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'hsl(262, 83%, 58%)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'hsl(240, 3.7%, 15.9%)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px'
                }}>
                  <button
                    type="button"
                    onClick={() => onDistanceChange(distance + 0.001)}
                    style={{
                      width: '20px',
                      height: '18px',
                      backgroundColor: 'hsl(240, 3.7%, 15.9%)',
                      border: 'none',
                      borderRadius: '2px 2px 0 0',
                      color: 'hsl(0, 0%, 98%)',
                      cursor: 'pointer',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = tokens.colors.primary.main;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = tokens.colors.bg.secondary;
                    }}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => onDistanceChange(Math.max(0.001, distance - 0.001))}
                    style={{
                      width: '20px',
                      height: '18px',
                      backgroundColor: tokens.colors.bg.secondary,
                      border: 'none',
                      borderRadius: '0 0 2px 2px',
                      color: tokens.colors.text.primary,
                      cursor: 'pointer',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: tokens.transition.default,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = tokens.colors.primary.main;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = tokens.colors.bg.secondary;
                    }}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <span style={{ fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm, color: tokens.colors.text.secondary, minWidth: '24px' }}>{unit}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {presets.map((preset) => (
                <Button
                  key={preset}
                  variant={distance === preset ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onDistanceChange(preset)}
                  className="min-w-[50px]"
                >
                  {preset}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};