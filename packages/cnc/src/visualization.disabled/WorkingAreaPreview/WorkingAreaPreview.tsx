import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls, Grid, Box, Text,
} from '@react-three/drei';
import * as THREE from 'three';
import { Card, Button } from '@whttlr/ui-core';
import { cn } from '@whttlr/ui-theme';

interface Position {
  x: number;
  y: number;
  z: number;
}

export interface WorkingAreaPreviewProps {
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

  return (
    <group position={[position.x / 10, position.z / 10, -position.y / 10]}>
      {/* Tool holder */}
      <Box ref={meshRef} args={[0.5, 0.5, 2]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#888888" />
      </Box>
      {/* Tool bit */}
      <Box args={[0.1, 0.1, 3]} position={[0, 0, -0.5]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      {/* Position indicator */}
      <Box args={[0.2, 0.2, 0.1]} position={[0, 0, -2]}>
        <meshStandardMaterial color="#ff4444" />
      </Box>
    </group>
  );
};

// Work area bounds
const WorkArea: React.FC<{ dimensions: { x: number; y: number; z: number } }> = ({ dimensions }) => (
    <group>
      {/* Work surface */}
      <Box args={[dimensions.x / 10, dimensions.y / 10, 0.1]} position={[0, 0, -dimensions.z / 20]}>
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} />
      </Box>

      {/* Work area outline */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.BoxGeometry(dimensions.x / 10, dimensions.y / 10, dimensions.z / 10)]}
        />
        <lineBasicMaterial color="#1890ff" />
      </lineSegments>
    </group>
);

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
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">3D Working Area Preview</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={showGrid ? 'default' : 'outline'}
              size="sm"
              onClick={() => onGridToggle?.(!showGrid)}
              className="h-7 px-2 text-xs"
            >
              Grid
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Zoom:</span>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-16 h-1 bg-muted rounded appearance-none cursor-pointer"
              />
              <span className="text-xs text-muted-foreground min-w-[2ch]">{zoom.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="h-[300px] border border-border rounded">
          <Canvas
            camera={{ position: [20, 20, 20], fov: 50 }}
            style={{ background: '#fafafa' }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />

            {/* Grid */}
            {showGrid && (
              <Grid
                args={[30, 30]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#e0e0e0"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#cccccc"
                fadeDistance={25}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={false}
              />
            )}

            {/* Work area */}
            <WorkArea dimensions={workArea} />

            {/* Current tool position */}
            <Tool position={currentPosition} />

            {/* Coordinate system origin */}
            <group>
              {/* X axis - Red */}
              <Box args={[5, 0.1, 0.1]} position={[2.5, 0, 0]}>
                <meshStandardMaterial color="#ff0000" />
              </Box>
              <Text
                position={[5.5, 0, 0]}
                fontSize={1}
                color="#ff0000"
                anchorX="center"
                anchorY="middle"
              >
                X
              </Text>

              {/* Y axis - Green */}
              <Box args={[0.1, 5, 0.1]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color="#00ff00" />
              </Box>
              <Text
                position={[0, 5.5, 0]}
                fontSize={1}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
              >
                Y
              </Text>

              {/* Z axis - Blue */}
              <Box args={[0.1, 0.1, 3]} position={[0, 0, 1.5]}>
                <meshStandardMaterial color="#0000ff" />
              </Box>
              <Text
                position={[0, 0, 3.5]}
                fontSize={1}
                color="#0000ff"
                anchorX="center"
                anchorY="middle"
              >
                Z
              </Text>
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

        <div className="mt-2 text-xs text-muted-foreground grid grid-cols-3 gap-4">
          <div>X: {currentPosition.x.toFixed(2)}mm</div>
          <div>Y: {currentPosition.y.toFixed(2)}mm</div>
          <div>Z: {currentPosition.z.toFixed(2)}mm</div>
        </div>
      </div>
    </Card>
  );
};

export default WorkingAreaPreview;