/**
 * Jog Distance Control Component
 * Allows selection of jog distance with preset buttons
 */

import * as React from 'react';
import { Button } from '@whttlr/ui-core';
import { legacyTokens as tokens } from '@whttlr/ui-core';

export interface JogDistanceControlProps {
  distance: number;
  onDistanceChange: (distance: number) => void;
  presets?: number[];
  disabled?: boolean;
  className?: string;
}

const defaultPresets = [0.1, 0.5, 1, 5, 10, 25, 50, 100];

export const JogDistanceControl: React.FC<JogDistanceControlProps> = ({
  distance,
  onDistanceChange,
  presets = defaultPresets,
  disabled = false,
  className,
}) => {
  return (
    <div className={className}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 500,
          fontSize: '0.875rem',
          color: tokens.colors.text.primary,
        }}
      >
        Jog Distance (mm):
      </label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
        }}
      >
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={distance === preset ? 'default' : 'outline-default'}
            size="sm"
            onClick={() => onDistanceChange(preset)}
            disabled={disabled}
            style={{
              minHeight: '36px',
              fontSize: '0.875rem',
            }}
          >
            {preset}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JogDistanceControl;
