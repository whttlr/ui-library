import React, { useRef, useState } from 'react';
import { cn } from '@whttlr/ui-theme';
import { Card } from '../primitives/Card/Card';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls, Grid, Box, Text,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  getCNCMeshColors,
  getCNCCanvasBackgroundColor,
  getCNCCheckboxStyles,
  getCNCSliderStyles,
} from '../utils/tokens';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface WorkingAreaPreviewProps {
  currentPosition?: Position;
  workArea?: { x: number; y: number; z: number };
  showGrid?: boolean;
  onGridToggle?: (show: boolean) => void;
  className?: string;
}

// Moving tool component
const Tool: React.FC<{ position: Position }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Add slight rotation animation
      meshRef.current.rotation.y += 0.01;
    }
  });

  const meshColors = getCNCMeshColors();
  
  return (
    <group position={[position.x / 10, position.z / 10, -position.y / 10]}>
      {/* Tool holder */}
      <Box ref={meshRef} args={[0.5, 0.5, 2]} position={[0, 0, 1]}>
        <meshStandardMaterial color={meshColors.toolHolder} />
      </Box>
      {/* Tool bit */}
      <Box args={[0.1, 0.1, 3]} position={[0, 0, -0.5]}>
        <meshStandardMaterial color={meshColors.toolBit} />
      </Box>
      {/* Position indicator */}
      <Box args={[0.2, 0.2, 0.1]} position={[0, 0, -2]}>
        <meshStandardMaterial color={meshColors.positionIndicator} />
      </Box>
    </group>
  );
};

// Work area bounds
const WorkArea: React.FC<{ dimensions: { x: number; y: number; z: number } }> = ({ dimensions }) => {
  const meshColors = getCNCMeshColors();
  
  return (
    <group>
      {/* Work surface */}
      <Box args={[dimensions.x / 10, dimensions.y / 10, 0.1]} position={[0, 0, -dimensions.z / 20]}>
        <meshStandardMaterial color={meshColors.workSurface} transparent opacity={0.3} />
      </Box>

      {/* Work area outline */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.BoxGeometry(dimensions.x / 10, dimensions.y / 10, dimensions.z / 10)]}
        />
        <lineBasicMaterial color={meshColors.workAreaOutline} />
      </lineSegments>
    </group>
  );
};

const WorkingAreaPreview: React.FC<WorkingAreaPreviewProps> = ({
  currentPosition = { x: 0, y: 0, z: 0 },
  workArea = { x: 300, y: 200, z: 50 },
  showGrid = true,
  onGridToggle,
  className,
}) => {
  const [zoom, setZoom] = useState(1);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-border bg-muted/50 px-4 py-2">
        <h3 className="text-sm font-medium">3D Working Area Preview</h3>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Show Grid:</span>
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
            <span className="text-sm font-medium">Zoom:</span>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={getCNCSliderStyles()}
            />
            <span className="text-xs text-muted-foreground w-8">{zoom.toFixed(1)}x</span>
          </div>
        </div>

        <div className="h-80 border border-border rounded-md">
          <Canvas
            camera={{ position: [20, 20, 20], fov: 50 }}
            style={{ background: getCNCCanvasBackgroundColor() }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />

            {/* Grid */}
            {showGrid && (() => {
              const meshColors = getCNCMeshColors();
              return (
                <Grid
                  args={[30, 30]}
                  cellSize={1}
                  cellThickness={0.5}
                  cellColor={meshColors.gridCellColor}
                  sectionSize={5}
                  sectionThickness={1}
                  sectionColor={meshColors.gridSectionColor}
                  fadeDistance={25}
                  fadeStrength={1}
                  followCamera={false}
                  infiniteGrid={false}
                />
              );
            })()}

            {/* Work area */}
            <WorkArea dimensions={workArea} />

            {/* Current tool position */}
            <Tool position={currentPosition} />

            {/* Coordinate system origin */}
            <group>
              {(() => {
                const meshColors = getCNCMeshColors();
                return (
                  <>
                    {/* X axis - Red */}
                    <Box args={[5, 0.1, 0.1]} position={[2.5, 0, 0]}>
                      <meshStandardMaterial color={meshColors.xAxis} />
                    </Box>
                    <Text
                      position={[5.5, 0, 0]}
                      fontSize={1}
                      color={meshColors.xAxis}
                      anchorX="center"
                      anchorY="middle"
                    >
                      X
                    </Text>

                    {/* Y axis - Green */}
                    <Box args={[0.1, 5, 0.1]} position={[0, 2.5, 0]}>
                      <meshStandardMaterial color={meshColors.yAxis} />
                    </Box>
                    <Text
                      position={[0, 5.5, 0]}
                      fontSize={1}
                      color={meshColors.yAxis}
                      anchorX="center"
                      anchorY="middle"
                    >
                      Y
                    </Text>

                    {/* Z axis - Blue */}
                    <Box args={[0.1, 0.1, 3]} position={[0, 0, 1.5]}>
                      <meshStandardMaterial color={meshColors.zAxis} />
                    </Box>
                    <Text
                      position={[0, 0, 3.5]}
                      fontSize={1}
                      color={meshColors.zAxis}
                      anchorX="center"
                      anchorY="middle"
                    >
                      Z
                    </Text>
                  </>
                );
              })()}
            </group>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={50}
            />
          </Canvas>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground font-mono">
          <div>X: {currentPosition.x.toFixed(2)}mm</div>
          <div>Y: {currentPosition.y.toFixed(2)}mm</div>
          <div>Z: {currentPosition.z.toFixed(2)}mm</div>
        </div>
      </div>
    </Card>
  );
};

export default WorkingAreaPreview;