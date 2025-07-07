import * as React from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw, Copy, Lock, Unlock,
} from 'lucide-react';
import { Button, Card, Badge } from '@whttlr/ui-core';
import {
  tokens,
  getCNCAxisColor,
  getCNCAxisColorSleek,
  getCNCPrecisionBadgeStyles,
  getCoordinateDisplayVariantStyles,
  getCoordinateInputSizeStyles,
  getCNCInputBaseStyles,
  getCNCLockedInputStyles
} from '@whttlr/ui-core';

// Simple className utility
const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface Coordinate {
  x: number
  y: number
  z: number
}

export interface CoordinateDisplayProps {
  workPosition: Coordinate
  machinePosition: Coordinate
  unit?: 'mm' | 'inch'
  precision?: 'high' | 'medium' | 'low'
  onZero?: (axis?: 'X' | 'Y' | 'Z') => void
  onCopy?: (position: Coordinate, type: 'work' | 'machine') => void
  className?: string
}

const PrecisionBadge: React.FC<{ precision: 'high' | 'medium' | 'low' }> = ({ precision }) => {
  const precisionStyles = getCNCPrecisionBadgeStyles(precision);

  return (
    <Badge 
      variant="outline" 
      style={precisionStyles}
    >
      {precision.toUpperCase()}
    </Badge>
  );
};

export const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({
  workPosition,
  machinePosition,
  unit = 'mm',
  precision = 'high',
  onZero,
  onCopy,
  className,
}) => {
  const [displayMode, setDisplayMode] = React.useState<'work' | 'machine'>('work');
  const [lockedAxes, setLockedAxes] = React.useState<Set<'X' | 'Y' | 'Z'>>(new Set());

  const formatCoordinate = (value: number): string => {
    const decimals = precision === 'high' ? 3 : precision === 'medium' ? 2 : 1;
    return value.toFixed(decimals);
  };

  const position = displayMode === 'work' ? workPosition : machinePosition;

  const toggleAxisLock = (axis: 'X' | 'Y' | 'Z') => {
    const newLocked = new Set(lockedAxes);
    if (newLocked.has(axis)) {
      newLocked.delete(axis);
    } else {
      newLocked.add(axis);
    }
    setLockedAxes(newLocked);
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Position</h3>
            <PrecisionBadge precision={precision} />
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={displayMode === 'work' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDisplayMode('work')}
              className="h-7 px-2 text-xs"
            >
              Work
            </Button>
            <Button
              variant={displayMode === 'machine' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDisplayMode('machine')}
              className="h-7 px-2 text-xs"
            >
              Machine
            </Button>
            {onCopy && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(position, displayMode)}
                className="h-7 w-7 ml-2"
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {(['X', 'Y', 'Z'] as const).map((axis) => (
          <AxisDisplay
            key={axis}
            axis={axis}
            value={position[axis.toLowerCase() as keyof Coordinate]}
            unit={unit}
            locked={lockedAxes.has(axis)}
            onLockToggle={() => toggleAxisLock(axis)}
            onZero={onZero ? () => onZero(axis) : undefined}
            formatValue={formatCoordinate}
          />
        ))}

        {onZero && (
          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onZero()}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Zero All Axes
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

interface AxisDisplayProps {
  axis: 'X' | 'Y' | 'Z'
  value: number
  unit: 'mm' | 'inch'
  locked: boolean
  onLockToggle?: () => void
  onZero?: () => void
  formatValue: (value: number) => string
}

const AxisDisplay: React.FC<AxisDisplayProps> = ({
  axis,
  value,
  unit,
  locked,
  onLockToggle,
  onZero,
  formatValue,
}) => {
  const getAxisColor = (axis: 'X' | 'Y' | 'Z'): string => {
    return getCNCAxisColor(axis.toLowerCase() as 'x' | 'y' | 'z');
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  };

  const axisLabelStyle: React.CSSProperties = {
    fontSize: Array.isArray(tokens.text.size.xl) ? tokens.text.size.xl[0] : tokens.text.size.xl,
    fontWeight: tokens.text.weight.bold,
    width: tokens.spacing.lg,
    color: getAxisColor(axis),
  };

  const inputContainerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  };

  const coordinateInputStyle: React.CSSProperties = {
    flex: 1,
    ...getCNCInputBaseStyles(),
    ...getCoordinateInputSizeStyles('default'),
    ...(locked ? getCNCLockedInputStyles() : {}),
    color: value < 0 ? getCNCAxisColor('x') : tokens.colors.text.primary,
    fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
    fontWeight: tokens.text.weight.semibold,
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  };

  const unitStyle: React.CSSProperties = {
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    color: tokens.colors.text.secondary,
    minWidth: '30px',
    fontFamily: tokens.text.family.mono.join(', '),
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div style={axisLabelStyle}>
        {axis}
      </div>

      <div style={inputContainerStyle}>
        <div style={coordinateInputStyle}>
          {value >= 0 && '+'}{formatValue(value)}
        </div>

        <span style={unitStyle}>
          {unit}
        </span>
      </div>

      <div style={buttonContainerStyle}>
        {onLockToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLockToggle}
            style={{ height: tokens.spacing.lg, width: tokens.spacing.lg }}
          >
            {locked ? (
              <Lock style={{ height: tokens.spacing.md, width: tokens.spacing.md, color: tokens.colors.text.secondary }} />
            ) : (
              <Unlock style={{ height: tokens.spacing.md, width: tokens.spacing.md, color: tokens.colors.text.secondary }} />
            )}
          </Button>
        )}

        {onZero && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onZero}
            disabled={locked}
            style={{ height: tokens.spacing.lg, padding: `0 ${tokens.spacing.xs}` }}
          >
            Zero
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export interface CompactCoordinateDisplayProps {
  position: Coordinate
  unit?: 'mm' | 'inch'
  precision?: number
  showLabels?: boolean
  className?: string
}

export const CompactCoordinateDisplay: React.FC<CompactCoordinateDisplayProps> = ({
  position,
  unit = 'mm',
  precision = 3,
  showLabels = true,
  className,
}) => {
  const formatValue = (value: number) => value.toFixed(precision);

  return (
    <div className={cn('flex items-center gap-4 font-mono', className)}>
      {(['X', 'Y', 'Z'] as const).map((axis) => {
        const axisColor = getCNCAxisColor(axis.toLowerCase() as 'x' | 'y' | 'z');

        return (
          <div key={axis} className="flex items-center gap-1">
            {showLabels && (
              <span 
                className="font-bold"
                style={{ color: axisColor }}
              >
                {axis}:
              </span>
            )}
            <span 
              className="font-semibold"
              style={{
                color: position[axis.toLowerCase() as keyof Coordinate] < 0 
                  ? getCNCAxisColor('x') // Use red for negative values
                  : tokens.colors.text.primary
              }}
            >
              {formatValue(position[axis.toLowerCase() as keyof Coordinate])}
            </span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        );
      })}
    </div>
  );
};

export interface SleekCoordinateDisplayProps {
  position: Coordinate
  unit?: 'mm' | 'inch'
  precision?: number
  title?: string
  showUnit?: boolean
  className?: string
}

export const SleekCoordinateDisplay: React.FC<SleekCoordinateDisplayProps> = ({
  position,
  unit = 'mm',
  precision = 3,
  title = 'Position',
  showUnit = true,
  className,
}) => {
  const formatValue = (value: number) => {
    const formatted = value.toFixed(precision);
    return value >= 0 ? `+${formatted}` : formatted;
  };

  const axisConfig = [
    { axis: 'X', color: getCNCAxisColorSleek('x') },
    { axis: 'Y', color: getCNCAxisColorSleek('y') },
    { axis: 'Z', color: getCNCAxisColorSleek('z') },
  ];

  return (
    <div 
      className={className}
      style={{
        ...getCoordinateDisplayVariantStyles('sleek'),
        minWidth: '280px',
      }}
    >
      <h3 style={{
        fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
        fontWeight: tokens.text.weight.semibold,
        color: tokens.colors.text.secondary,
        marginBottom: tokens.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {title}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
        {axisConfig.map(({ axis, color }) => (
          <div 
            key={axis}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
              backgroundColor: tokens.colors.bg.secondary,
              borderRadius: tokens.radius.sm,
              border: `1px solid ${tokens.colors.border.primary}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <span style={{
                color,
                fontWeight: tokens.text.weight.bold,
                fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
                fontFamily: tokens.text.family.mono.join(', '),
                width: '20px',
              }}>
                {axis}
              </span>
              <span style={{
                color: tokens.colors.text.primary,
                fontSize: Array.isArray(tokens.text.size.xl) ? tokens.text.size.xl[0] : tokens.text.size.xl,
                fontFamily: tokens.text.family.mono.join(', '),
                fontWeight: tokens.text.weight.semibold,
                letterSpacing: '-0.02em',
              }}>
                {formatValue(position[axis.toLowerCase() as keyof Coordinate])}
              </span>
            </div>
            {showUnit && (
              <span style={{
                color: tokens.colors.text.secondary,
                fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs,
                fontFamily: tokens.text.family.mono.join(', '),
                textTransform: 'lowercase',
              }}>
                {unit}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export interface LiveCoordinateDisplayProps extends CoordinateDisplayProps {
  isConnected: boolean
  updateInterval?: number
}

export const LiveCoordinateDisplay: React.FC<LiveCoordinateDisplayProps> = ({
  isConnected,
  updateInterval = 100,
  ...props
}) => {
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());

  React.useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isConnected, updateInterval]);

  return (
    <div className="relative">
      <CoordinateDisplay {...props} />

      {isConnected && (
        <motion.div
          className="absolute top-2 right-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-success-500 rounded-full" />
        </motion.div>
      )}

      {!isConnected && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Badge variant="destructive">Disconnected</Badge>
        </div>
      )}
    </div>
  );
};