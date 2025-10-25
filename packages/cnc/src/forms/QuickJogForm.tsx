/**
 * Quick Jog Form Component
 * 
 * Interactive form for manual CNC machine positioning with jog controls,
 * position display, and homing functionality.
 */

import React, { useState } from 'react';
import { Card, Button, Input, Divider } from 'antd';
import { 
  HomeOutlined,
  AimOutlined,
} from '@ant-design/icons';

// ============================================================================
// QUICK JOG FORM
// ============================================================================

export interface QuickJogFormProps {
  currentPosition: { x: number; y: number; z: number };
  onJog: (axis: 'X' | 'Y' | 'Z', distance: number) => void;
  onGoTo: (coordinates: { x?: number; y?: number; z?: number }) => void;
  onHome: (axes?: ('X' | 'Y' | 'Z')[]) => void;
  disabled?: boolean;
}

export const QuickJogForm: React.FC<QuickJogFormProps> = ({
  currentPosition,
  onJog,
  onGoTo,
  onHome,
  disabled = false,
}) => {
  const [jogDistance, setJogDistance] = useState(1);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, z: 0 });
  
  const jogDistances = [0.1, 1, 10, 50];
  
  const handleJog = (axis: 'X' | 'Y' | 'Z', direction: number) => {
    onJog(axis, jogDistance * direction);
  };
  
  const handleGoTo = () => {
    onGoTo(targetPosition);
  };
  
  return (
    <Card title="Quick Jog Controls" size="small">
      <div className="space-y-4">
        {/* Current Position Display */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-secondary-50 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-secondary-400 mb-1">X Position</div>
            <div className="font-mono text-lg font-bold text-red-600">
              {currentPosition.x.toFixed(3)} mm
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-secondary-400 mb-1">Y Position</div>
            <div className="font-mono text-lg font-bold text-green-600">
              {currentPosition.y.toFixed(3)} mm
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-secondary-400 mb-1">Z Position</div>
            <div className="font-mono text-lg font-bold text-blue-600">
              {currentPosition.z.toFixed(3)} mm
            </div>
          </div>
        </div>
        
        {/* Jog Distance Selection */}
        <div>
          <div className="text-sm font-medium mb-2">Jog Distance</div>
          <div className="flex space-x-2">
            {jogDistances.map(distance => (
              <Button
                key={distance}
                size="small"
                type={jogDistance === distance ? 'primary' : 'default'}
                onClick={() => setJogDistance(distance)}
                disabled={disabled}
              >
                {distance} mm
              </Button>
            ))}
          </div>
        </div>
        
        {/* Jog Controls */}
        <div className="grid grid-cols-3 gap-4">
          {/* X Axis */}
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-red-600">X Axis</div>
            <div className="flex space-x-1">
              <Button
                size="small"
                onClick={() => handleJog('X', -1)}
                disabled={disabled}
              >
                ←
              </Button>
              <Button
                size="small"
                onClick={() => handleJog('X', 1)}
                disabled={disabled}
              >
                →
              </Button>
            </div>
          </div>
          
          {/* Y Axis */}
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-green-600">Y Axis</div>
            <div className="flex flex-col space-y-1">
              <Button
                size="small"
                onClick={() => handleJog('Y', 1)}
                disabled={disabled}
              >
                ↑
              </Button>
              <Button
                size="small"
                onClick={() => handleJog('Y', -1)}
                disabled={disabled}
              >
                ↓
              </Button>
            </div>
          </div>
          
          {/* Z Axis */}
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-blue-600">Z Axis</div>
            <div className="flex flex-col space-y-1">
              <Button
                size="small"
                onClick={() => handleJog('Z', 1)}
                disabled={disabled}
              >
                ⬆
              </Button>
              <Button
                size="small"
                onClick={() => handleJog('Z', -1)}
                disabled={disabled}
              >
                ⬇
              </Button>
            </div>
          </div>
        </div>
        
        <Divider />
        
        {/* Go To Position */}
        <div>
          <div className="text-sm font-medium mb-2">Go To Position</div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <Input
              type="number"
              step="0.001"
              value={targetPosition.x}
              onChange={(e) => setTargetPosition(prev => ({ ...prev, x: parseFloat(e.target.value) || 0 }))}
              placeholder="X"
              size="small"
              suffix="mm"
            />
            <Input
              type="number"
              step="0.001"
              value={targetPosition.y}
              onChange={(e) => setTargetPosition(prev => ({ ...prev, y: parseFloat(e.target.value) || 0 }))}
              placeholder="Y"
              size="small"
              suffix="mm"
            />
            <Input
              type="number"
              step="0.001"
              value={targetPosition.z}
              onChange={(e) => setTargetPosition(prev => ({ ...prev, z: parseFloat(e.target.value) || 0 }))}
              placeholder="Z"
              size="small"
              suffix="mm"
            />
          </div>
          <Button
            onClick={handleGoTo}
            disabled={disabled}
            className="w-full"
            type="default"
            icon={<AimOutlined />}
          >
            Go To Position
          </Button>
        </div>
        
        {/* Home Controls */}
        <div>
          <div className="text-sm font-medium mb-2">Home Machine</div>
          <div className="flex space-x-2">
            <Button
              onClick={() => onHome(['X', 'Y', 'Z'])}
              disabled={disabled}
              type="default"
              icon={<HomeOutlined />}
              className="flex-1"
            >
              Home All
            </Button>
            <Button
              onClick={() => onHome(['X'])}
              disabled={disabled}
              size="sm"
              type="default"
            >
              X
            </Button>
            <Button
              onClick={() => onHome(['Y'])}
              disabled={disabled}
              size="sm"
              type="default"
            >
              Y
            </Button>
            <Button
              onClick={() => onHome(['Z'])}
              disabled={disabled}
              size="sm"
              type="default"
            >
              Z
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickJogForm;