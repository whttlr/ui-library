import React from 'react';
import { Card } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';

interface ToolPathSegment {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
  type: 'rapid' | 'feed' | 'arc';
  feedRate?: number;
}

export interface ToolPathProps {
  segments: ToolPathSegment[];
  showRapidMoves?: boolean;
  showFeedMoves?: boolean;
  workArea?: { x: number; y: number; z: number };
  className?: string;
}

const ToolPath: React.FC<ToolPathProps> = ({
  segments,
  showRapidMoves = true,
  showFeedMoves = true,
  workArea = { x: 300, y: 200, z: 50 },
  className,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 20;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;

    const scaleX = availableWidth / workArea.x;
    const scaleY = availableHeight / workArea.y;
    const scale = Math.min(scaleX, scaleY);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Transform coordinates
    const toScreenX = (x: number) => centerX + (x * scale);
    const toScreenY = (y: number) => centerY - (y * scale);

    // Draw work area boundary
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      toScreenX(-workArea.x / 2),
      toScreenY(workArea.y / 2),
      workArea.x * scale,
      workArea.y * scale,
    );

    // Draw tool path segments
    segments.forEach((segment) => {
      if (segment.type === 'rapid' && !showRapidMoves) return;
      if (segment.type === 'feed' && !showFeedMoves) return;

      ctx.beginPath();
      ctx.moveTo(toScreenX(segment.start.x), toScreenY(segment.start.y));
      ctx.lineTo(toScreenX(segment.end.x), toScreenY(segment.end.y));

      // Set color based on move type
      switch (segment.type) {
        case 'rapid':
          ctx.strokeStyle = '#ff4444';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          break;
        case 'feed':
          ctx.strokeStyle = '#1890ff';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          break;
        case 'arc':
          ctx.strokeStyle = '#52c41a';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          break;
      }

      ctx.stroke();
    });

    // Draw start and end points
    if (segments.length > 0) {
      const firstSegment = segments[0];
      const lastSegment = segments[segments.length - 1];

      // Start point (green)
      ctx.fillStyle = '#52c41a';
      ctx.beginPath();
      ctx.arc(toScreenX(firstSegment.start.x), toScreenY(firstSegment.start.y), 4, 0, 2 * Math.PI);
      ctx.fill();

      // End point (red)
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(toScreenX(lastSegment.end.x), toScreenY(lastSegment.end.y), 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [segments, showRapidMoves, showFeedMoves, workArea]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Tool Path Preview</h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-red-500 border-dashed border border-red-300"></div>
              <span>Rapid</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Feed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Arc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="border border-border rounded">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full h-[300px] bg-muted/30"
          />
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {segments.length} path segments
        </div>
      </div>
    </Card>
  );
};

export default ToolPath;