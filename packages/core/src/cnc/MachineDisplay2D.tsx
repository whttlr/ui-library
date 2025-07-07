import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@whttlr/ui-theme';
import { Card } from '../primitives/Card/Card';
import { Button } from '../primitives/Button/Button';
import {
  getCNCMinorGridColor,
  getCNCMajorGridColor,
  getCNCWorkAreaBoundaryColor,
  getCNCCoordinateAxisColor,
  getCNCOriginMarkerColor,
  getCNCToolTrailColor,
  getCNCCurrentToolColor,
  getCNCPositionLabelColor,
  getCNCAxisLabelColor,
  getCNCCanvasBackgroundColor,
  getCNCCanvasFontStyles,
  getCNCCheckboxStyles,
} from '../utils/tokens';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface MachineDisplay2DProps {
  currentPosition?: Position;
  workArea?: { x: number; y: number; z: number };
  showGrid?: boolean;
  showTrail?: boolean;
  onGridToggle?: (show: boolean) => void;
  onTrailToggle?: (show: boolean) => void;
  onSetOrigin?: () => void;
  onGoHome?: () => void;
  className?: string;
}

// Icons using React.createElement
const AimIcon = React.createElement('svg', { 
  className: 'h-4 w-4', 
  fill: 'currentColor', 
  viewBox: '0 0 24 24' 
}, React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
React.createElement('circle', { cx: '12', cy: '12', r: '6' }),
React.createElement('circle', { cx: '12', cy: '12', r: '2' }));

const HomeIcon = React.createElement('svg', { 
  className: 'h-4 w-4', 
  fill: 'currentColor', 
  viewBox: '0 0 24 24' 
}, React.createElement('path', { 
  d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' 
}));

const MachineDisplay2D: React.FC<MachineDisplay2DProps> = ({
  currentPosition = { x: 0, y: 0, z: 0 },
  workArea = { x: 300, y: 200, z: 50 },
  showGrid = true,
  showTrail = false,
  onGridToggle,
  onTrailToggle,
  onSetOrigin,
  onGoHome,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trail, setTrail] = useState<Position[]>([]);
  const [scale, setScale] = useState(1);

  // Add current position to trail
  useEffect(() => {
    if (showTrail) {
      setTrail((prev) => {
        const newTrail = [...prev, currentPosition];
        // Keep only last 100 points
        return newTrail.slice(-100);
      });
    } else {
      setTrail([]);
    }
  }, [currentPosition, showTrail]);

  // Calculate scale to fit work area in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const padding = 40;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;

    const scaleX = availableWidth / workArea.x;
    const scaleY = availableHeight / workArea.y;

    setScale(Math.min(scaleX, scaleY));
  }, [workArea]);

  // Draw the 2D view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Transform coordinates (Y is inverted for screen coordinates)
    const toScreenX = (x: number) => centerX + (x * scale);
    const toScreenY = (y: number) => centerY - (y * scale);

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = getCNCMinorGridColor();
      ctx.lineWidth = 0.5;

      const gridSize = 10; // 10mm grid
      const workAreaLeft = -workArea.x / 2;
      const workAreaRight = workArea.x / 2;
      const workAreaTop = workArea.y / 2;
      const workAreaBottom = -workArea.y / 2;

      // Vertical grid lines
      for (let x = workAreaLeft; x <= workAreaRight; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(toScreenX(x), toScreenY(workAreaTop));
        ctx.lineTo(toScreenX(x), toScreenY(workAreaBottom));
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = workAreaBottom; y <= workAreaTop; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(toScreenX(workAreaLeft), toScreenY(y));
        ctx.lineTo(toScreenX(workAreaRight), toScreenY(y));
        ctx.stroke();
      }

      // Major grid lines (every 50mm)
      ctx.strokeStyle = getCNCMajorGridColor();
      ctx.lineWidth = 1;

      const majorGridSize = 50;
      for (let x = workAreaLeft; x <= workAreaRight; x += majorGridSize) {
        if (x !== 0) {
          ctx.beginPath();
          ctx.moveTo(toScreenX(x), toScreenY(workAreaTop));
          ctx.lineTo(toScreenX(x), toScreenY(workAreaBottom));
          ctx.stroke();
        }
      }

      for (let y = workAreaBottom; y <= workAreaTop; y += majorGridSize) {
        if (y !== 0) {
          ctx.beginPath();
          ctx.moveTo(toScreenX(workAreaLeft), toScreenY(y));
          ctx.lineTo(toScreenX(workAreaRight), toScreenY(y));
          ctx.stroke();
        }
      }
    }

    // Draw work area boundary
    ctx.strokeStyle = getCNCWorkAreaBoundaryColor();
    ctx.lineWidth = 2;
    ctx.strokeRect(
      toScreenX(-workArea.x / 2),
      toScreenY(workArea.y / 2),
      workArea.x * scale,
      workArea.y * scale,
    );

    // Draw coordinate axes
    ctx.strokeStyle = getCNCCoordinateAxisColor();
    ctx.lineWidth = 1;

    // X axis
    ctx.beginPath();
    ctx.moveTo(toScreenX(-workArea.x / 2), toScreenY(0));
    ctx.lineTo(toScreenX(workArea.x / 2), toScreenY(0));
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(toScreenX(0), toScreenY(-workArea.y / 2));
    ctx.lineTo(toScreenX(0), toScreenY(workArea.y / 2));
    ctx.stroke();

    // Draw origin marker
    ctx.fillStyle = getCNCOriginMarkerColor();
    ctx.beginPath();
    ctx.arc(toScreenX(0), toScreenY(0), 4, 0, 2 * Math.PI);
    ctx.fill();

    // Draw trail
    if (showTrail && trail.length > 1) {
      ctx.strokeStyle = getCNCToolTrailColor();
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(toScreenX(trail[0].x), toScreenY(trail[0].y));

      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(toScreenX(trail[i].x), toScreenY(trail[i].y));
      }
      ctx.stroke();
    }

    // Draw current position
    const currentX = toScreenX(currentPosition.x);
    const currentY = toScreenY(currentPosition.y);

    // Tool position circle
    ctx.fillStyle = getCNCCurrentToolColor();
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Tool crosshairs
    ctx.strokeStyle = getCNCCurrentToolColor();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(currentX - 10, currentY);
    ctx.lineTo(currentX + 10, currentY);
    ctx.moveTo(currentX, currentY - 10);
    ctx.lineTo(currentX, currentY + 10);
    ctx.stroke();

    // Draw position labels
    const fontStyles = getCNCCanvasFontStyles();
    ctx.fillStyle = getCNCPositionLabelColor();
    ctx.font = fontStyles.labelFont;
    ctx.textAlign = 'center';

    // Origin label
    ctx.fillText('(0,0)', toScreenX(0) + 15, toScreenY(0) - 10);

    // Current position label
    ctx.fillText(
      `(${currentPosition.x.toFixed(1)}, ${currentPosition.y.toFixed(1)})`,
      currentX,
      currentY - 15,
    );

    // Draw axis labels
    ctx.fillStyle = getCNCAxisLabelColor();
    ctx.font = fontStyles.axisFont;
    ctx.fillText('X', toScreenX(workArea.x / 2) - 10, toScreenY(0) + 20);
    ctx.fillText('Y', toScreenX(0) + 15, toScreenY(workArea.y / 2) + 5);
  }, [currentPosition, workArea, scale, showGrid, showTrail, trail]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2">
        <h3 className="text-sm font-medium">2D Working Area View</h3>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Grid:</span>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => onGridToggle?.(e.target.checked)}
                style={getCNCCheckboxStyles()}
              />
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Trail:</span>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showTrail}
                onChange={(e) => onTrailToggle?.(e.target.checked)}
                style={getCNCCheckboxStyles()}
              />
            </label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onSetOrigin}
            className="flex items-center gap-1"
          >
            {AimIcon}
            <span>Set Origin</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onGoHome}
            className="flex items-center gap-1"
          >
            {HomeIcon}
            <span>Go Home</span>
          </Button>
        </div>

        <div className="border border-border rounded-md">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{
              width: '100%',
              height: '300px',
              background: getCNCCanvasBackgroundColor(),
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground font-mono">
          <div>X: {currentPosition.x.toFixed(2)}mm</div>
          <div>Y: {currentPosition.y.toFixed(2)}mm</div>
          <div>Z: {currentPosition.z.toFixed(2)}mm</div>
          <div>Scale: {(scale * 100).toFixed(0)}%</div>
        </div>
      </div>
    </Card>
  );
};

export default MachineDisplay2D;