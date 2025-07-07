import * as React from 'react';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { cn } from '../utils';

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface CoordinateDisplayProps {
  position: Coordinate;
  units?: 'mm' | 'in';
  precision?: number;
  className?: string;
}

export const CoordinateDisplay = React.forwardRef<HTMLDivElement, CoordinateDisplayProps>(
  ({ position, units = 'mm', precision = 3, className }, ref) => {
    const formatCoordinate = (value: number) => {
      return value.toFixed(precision);
    };

    return (
      <Card ref={ref} className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Machine Position</h3>
            <Badge variant="info">{units}</Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">X Axis</div>
              <div className="text-2xl font-mono font-bold text-blue-400">
                {formatCoordinate(position.x)}
              </div>
            </div>
            
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Y Axis</div>
              <div className="text-2xl font-mono font-bold text-green-400">
                {formatCoordinate(position.y)}
              </div>
            </div>
            
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Z Axis</div>
              <div className="text-2xl font-mono font-bold text-amber-400">
                {formatCoordinate(position.z)}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
CoordinateDisplay.displayName = 'CoordinateDisplay';

export interface CompactCoordinateDisplayProps {
  position: Coordinate;
  units?: 'mm' | 'in';
  precision?: number;
  className?: string;
}

export const CompactCoordinateDisplay = React.forwardRef<HTMLDivElement, CompactCoordinateDisplayProps>(
  ({ position, units = 'mm', precision = 3, className }, ref) => {
    const formatCoordinate = (value: number) => {
      return value.toFixed(precision);
    };

    return (
      <div ref={ref} className={cn('flex items-center space-x-4 p-3 bg-muted/20 rounded-lg', className)}>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-blue-400">X:</span>
          <span className="font-mono text-sm">{formatCoordinate(position.x)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-green-400">Y:</span>
          <span className="font-mono text-sm">{formatCoordinate(position.y)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-amber-400">Z:</span>
          <span className="font-mono text-sm">{formatCoordinate(position.z)}</span>
        </div>
        <Badge variant="outline-info" size="sm">{units}</Badge>
      </div>
    );
  }
);
CompactCoordinateDisplay.displayName = 'CompactCoordinateDisplay';