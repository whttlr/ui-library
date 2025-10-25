/**
 * Coordinate Display Component
 * Shows machine and work coordinates with lock/zero functionality
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Lock, Unlock } from 'lucide-react';
import { Button, Card } from '@whttlr/ui-core';
import { legacyTokens as tokens } from '@whttlr/ui-core';

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface CoordinateDisplayProps {
  workPosition: Coordinate;
  machinePosition: Coordinate;
  unit?: 'mm' | 'inch';
  precision?: 'high' | 'medium' | 'low';
  onZero?: (axis?: 'X' | 'Y' | 'Z') => void;
  onCopy?: (position: Coordinate, type: 'work' | 'machine') => void;
  className?: string;
}

export const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({
  workPosition,
  machinePosition,
  unit = 'mm',
  precision = 'high',
  onZero,
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

  const getAxisColor = (axis: 'X' | 'Y' | 'Z'): string => {
    switch (axis) {
      case 'X': return 'hsl(0, 84%, 60%)';
      case 'Y': return 'hsl(142, 76%, 36%)';
      case 'Z': return 'hsl(217, 91%, 60%)';
      default: return tokens.colors.text.primary;
    }
  };

  return (
    <Card
      className={className}
      style={{
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* Header with title and tab actions */}
      <Card.Header
        title="Position"
        bordered
        compact
        actions={
          <>
            <Button
              variant={displayMode === 'work' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDisplayMode('work')}
              style={{
                height: '1.75rem',
                padding: '0 0.5rem',
                fontSize: '0.75rem',
              }}
            >
              Work
            </Button>
            <Button
              variant={displayMode === 'machine' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDisplayMode('machine')}
              style={{
                height: '1.75rem',
                padding: '0 0.5rem',
                fontSize: '0.75rem',
              }}
            >
              Machine
            </Button>
          </>
        }
      />

      {/* Axis Displays */}
      <div style={{
        padding: tokens.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {(['X', 'Y', 'Z'] as const).map((axis) => {
          const value = position[axis.toLowerCase() as keyof Coordinate];
          const isLocked = lockedAxes.has(axis);

          return (
            <motion.div
              key={axis}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Axis Label */}
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                width: '2rem',
                color: getAxisColor(axis),
              }}>
                {axis}
              </div>

              {/* Value Display */}
              <div style={{
                flex: '1 1 auto',
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div style={{
                  flex: '1 1 auto',
                  minWidth: '120px',
                  fontFamily: tokens.text.family.mono.join(', '),
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.75rem',
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.colors.border.primary}`,
                  backgroundColor: tokens.colors.bg.primary,
                  color: value < 0 ? 'hsl(0, 84%, 60%)' : tokens.colors.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}>
                  {value >= 0 && '+'}{formatCoordinate(value)}
                </div>

                <span style={{
                  fontSize: '0.875rem',
                  color: tokens.colors.text.secondary,
                  minWidth: '30px',
                  fontFamily: tokens.text.family.mono.join(', '),
                }}>
                  {unit}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

export interface CompactCoordinateDisplayProps {
  position: Coordinate;
  unit?: 'mm' | 'inch';
  precision?: number;
  showLabels?: boolean;
  className?: string;
}

export const CompactCoordinateDisplay: React.FC<CompactCoordinateDisplayProps> = ({
  position,
  unit = 'mm',
  precision = 3,
  showLabels = true,
  className,
}) => {
  const formatValue = (value: number) => value.toFixed(precision);

  const getAxisColor = (axis: 'X' | 'Y' | 'Z'): string => {
    switch (axis) {
      case 'X': return 'hsl(0, 84%, 60%)';
      case 'Y': return 'hsl(142, 76%, 36%)';
      case 'Z': return 'hsl(217, 91%, 60%)';
      default: return tokens.colors.text.primary;
    }
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontFamily: tokens.text.family.mono.join(', '),
      }}
    >
      {(['X', 'Y', 'Z'] as const).map((axis) => {
        const value = position[axis.toLowerCase() as keyof Coordinate];
        const axisColor = getAxisColor(axis);

        return (
          <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {showLabels && (
              <span
                style={{
                  fontWeight: 700,
                  color: axisColor,
                }}
              >
                {axis}:
              </span>
            )}
            <span
              style={{
                fontWeight: 600,
                color: value < 0 ? 'hsl(0, 84%, 60%)' : tokens.colors.text.primary,
              }}
            >
              {formatValue(value)}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: tokens.colors.text.secondary,
            }}>
              {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CoordinateDisplay;
