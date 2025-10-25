/**
 * Jog Controls Component
 * Directional controls for manual CNC machine movement
 */

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
} from 'lucide-react';
import { Button, legacyTokens as tokens } from '@whttlr/ui-core';

export interface JogControlsProps {
  onJog: (axis: 'X' | 'Y' | 'Z', direction: number) => void;
  onHome?: () => void;
  disabled?: boolean;
  className?: string;
}

export const JogControls: React.FC<JogControlsProps> = ({
  onJog,
  onHome,
  disabled = false,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* XY Controls */}
      <div>
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: tokens.colors.text.secondary,
            textAlign: 'center',
            margin: '0 0 0.5rem 0',
          }}
        >
          XY Movement
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            maxWidth: '200px',
            margin: '0 auto',
          }}
        >
          {/* Row 1 */}
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => {
              onJog('X', -1);
              onJog('Y', 1);
            }}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowUpLeft style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Y', 1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowUp style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => {
              onJog('X', 1);
              onJog('Y', 1);
            }}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowUpRight style={{ height: '1rem', width: '1rem' }} />
          </Button>

          {/* Row 2 */}
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', -1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="success"
            size="jog"
            disabled={disabled}
            onClick={onHome}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <Home style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('X', 1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowRight style={{ height: '1rem', width: '1rem' }} />
          </Button>

          {/* Row 3 */}
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => {
              onJog('X', -1);
              onJog('Y', -1);
            }}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowDownLeft style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Y', -1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowDown style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => {
              onJog('X', 1);
              onJog('Y', -1);
            }}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowDownRight style={{ height: '1rem', width: '1rem' }} />
          </Button>
        </div>
      </div>

      {/* Z Controls */}
      <div>
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: tokens.colors.text.secondary,
            textAlign: 'center',
            margin: '0 0 0.5rem 0',
          }}
        >
          Z Movement
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Z', 1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowUp style={{ height: '1rem', width: '1rem' }} />
          </Button>

          <Button
            variant="cnc"
            size="jog"
            disabled={disabled}
            onMouseDown={() => onJog('Z', -1)}
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <ArrowDown style={{ height: '1rem', width: '1rem' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JogControls;
