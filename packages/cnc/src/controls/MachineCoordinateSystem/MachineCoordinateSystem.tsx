import * as React from 'react';
import { 
  Navigation,
  Home,
  RotateCcw,
  Target,
  Settings,
  ChevronDown,
  Lock,
  Unlock,
  Copy,
  Save
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge, 
  Select,
  PositionDisplay,
  cn 
} from '@whttlr/ui-core';

export interface WorkOffset {
  id: string
  name: string
  x: number
  y: number
  z: number
  a?: number
  b?: number
  c?: number
  description?: string
  isActive?: boolean
}

export interface MachineCoordinateSystemProps {
  workOffsets: WorkOffset[]
  activeOffset: string
  machinePosition: { x: number; y: number; z: number; a?: number; b?: number; c?: number }
  onOffsetChange: (offsetId: string) => void
  onOffsetSet: (offsetId: string, axis: 'x' | 'y' | 'z' | 'a' | 'b' | 'c', value: number) => void
  onOffsetZero: (offsetId: string, axis?: 'x' | 'y' | 'z' | 'a' | 'b' | 'c') => void
  onOffsetCopy?: (fromId: string, toId: string) => void
  onOffsetSave?: (offsetId: string) => void
  unit?: 'mm' | 'inch'
  precision?: number
  showRotaryAxes?: boolean
  disabled?: boolean
  className?: string
}

export const MachineCoordinateSystem: React.FC<MachineCoordinateSystemProps> = ({
  workOffsets,
  activeOffset,
  machinePosition,
  onOffsetChange,
  onOffsetSet,
  onOffsetZero,
  onOffsetCopy,
  onOffsetSave,
  unit = 'mm',
  precision = 3,
  showRotaryAxes = false,
  disabled = false,
  className,
}) => {
  const [selectedOffset, setSelectedOffset] = React.useState(activeOffset);
  const [editingAxis, setEditingAxis] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');

  const activeOffsetData = workOffsets.find(offset => offset.id === activeOffset);
  const selectedOffsetData = workOffsets.find(offset => offset.id === selectedOffset);

  // Calculate work position
  const workPosition = React.useMemo(() => {
    if (!activeOffsetData) return machinePosition;
    
    return {
      x: machinePosition.x - activeOffsetData.x,
      y: machinePosition.y - activeOffsetData.y,
      z: machinePosition.z - activeOffsetData.z,
      a: machinePosition.a && activeOffsetData.a ? machinePosition.a - activeOffsetData.a : machinePosition.a,
      b: machinePosition.b && activeOffsetData.b ? machinePosition.b - activeOffsetData.b : machinePosition.b,
      c: machinePosition.c && activeOffsetData.c ? machinePosition.c - activeOffsetData.c : machinePosition.c,
    };
  }, [machinePosition, activeOffsetData]);

  // Container styles
  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border.primary}`,
    padding: tokens.spacing.lg,
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.lg,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: tokens.text.size.base[0],
    fontWeight: tokens.text.weight.semibold,
    color: tokens.colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  };

  // Get axes to display
  const axes = showRotaryAxes ? ['x', 'y', 'z', 'a', 'b', 'c'] : ['x', 'y', 'z'];

  // Handle edit mode
  const handleEditStart = (axis: string) => {
    if (disabled) return;
    setEditingAxis(axis);
    const currentValue = selectedOffsetData?.[axis as keyof WorkOffset] as number || 0;
    setEditValue(currentValue.toFixed(precision));
  };

  const handleEditSave = () => {
    if (editingAxis && selectedOffsetData) {
      const value = parseFloat(editValue);
      if (!isNaN(value)) {
        onOffsetSet(selectedOffsetData.id, editingAxis as any, value);
      }
    }
    setEditingAxis(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingAxis(null);
    setEditValue('');
  };

  const formatValue = (value: number | undefined) => {
    if (value === undefined) return '0.000';
    return value.toFixed(precision);
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <span style={titleStyles}>
          <Navigation size={20} />
          Coordinate System
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Badge variant="outline-default">
            Active: {activeOffsetData?.name}
          </Badge>
          {onOffsetSave && selectedOffsetData && (
            <Button
              variant="outline-default"
              size="sm"
              onClick={() => onOffsetSave(selectedOffsetData.id)}
              disabled={disabled}
              leftIcon={<Save size={16} />}
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Work Offset Selector */}
      <div style={{ marginBottom: tokens.spacing.lg }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.md,
        }}>
          <Select
            value={selectedOffset}
            onValueChange={setSelectedOffset}
            disabled={disabled}
            style={{ minWidth: '150px' }}
          >
            {workOffsets.map(offset => (
              <option key={offset.id} value={offset.id}>
                {offset.name}
              </option>
            ))}
          </Select>
          
          <Button
            variant={selectedOffset === activeOffset ? 'default' : 'outline'}
            size="sm"
            onClick={() => onOffsetChange(selectedOffset)}
            disabled={disabled || selectedOffset === activeOffset}
          >
            {selectedOffset === activeOffset ? 'Active' : 'Activate'}
          </Button>
          
          {onOffsetCopy && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Simple copy to next offset for demo
                const currentIndex = workOffsets.findIndex(o => o.id === selectedOffset);
                const nextIndex = (currentIndex + 1) % workOffsets.length;
                onOffsetCopy(selectedOffset, workOffsets[nextIndex].id);
              }}
              disabled={disabled}
              leftIcon={<Copy size={16} />}
            >
              Copy
            </Button>
          )}
        </div>
        
        {selectedOffsetData?.description && (
          <div style={{ 
            padding: tokens.spacing.sm,
            backgroundColor: tokens.colors.bg.tertiary,
            borderRadius: tokens.radius.sm,
            fontSize: tokens.text.size.sm[0],
            color: tokens.colors.text.secondary,
          }}>
            {selectedOffsetData.description}
          </div>
        )}
      </div>

      {/* Position Displays */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
        gap: tokens.spacing.lg,
        marginBottom: tokens.spacing.lg,
      }}>
        {/* Machine Position */}
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
        }}>
          <h4 style={{ 
            margin: `0 0 ${tokens.spacing.md} 0`,
            fontSize: tokens.text.size.sm[0],
            fontWeight: tokens.text.weight.semibold,
            color: tokens.colors.text.primary,
          }}>
            Machine Position
          </h4>
          <PositionDisplay
            position={machinePosition}
            unit={unit}
            precision={precision}
            showLabels={true}
            axes={axes as any}
          />
        </Card>

        {/* Work Position */}
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
        }}>
          <h4 style={{ 
            margin: `0 0 ${tokens.spacing.md} 0`,
            fontSize: tokens.text.size.sm[0],
            fontWeight: tokens.text.weight.semibold,
            color: tokens.colors.text.primary,
          }}>
            Work Position ({activeOffsetData?.name})
          </h4>
          <PositionDisplay
            position={workPosition}
            unit={unit}
            precision={precision}
            showLabels={true}
            axes={axes as any}
          />
        </Card>
      </div>

      {/* Offset Values */}
      {selectedOffsetData && (
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: tokens.spacing.md,
          }}>
            <h4 style={{ 
              margin: 0,
              fontSize: tokens.text.size.sm[0],
              fontWeight: tokens.text.weight.semibold,
              color: tokens.colors.text.primary,
            }}>
              Offset Values - {selectedOffsetData.name}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOffsetZero(selectedOffsetData.id)}
              disabled={disabled}
              leftIcon={<RotateCcw size={16} />}
            >
              Zero All
            </Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
            {axes.map((axis) => (
              <div key={axis} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: tokens.spacing.md,
                padding: tokens.spacing.sm,
                backgroundColor: tokens.colors.bg.secondary,
                borderRadius: tokens.radius.sm,
              }}>
                <span style={{ 
                  fontSize: tokens.text.size.lg[0],
                  fontWeight: tokens.text.weight.bold,
                  color: tokens.colors.primary.main,
                  minWidth: '20px',
                }}>
                  {axis.toUpperCase()}
                </span>
                
                <div style={{ flex: 1 }}>
                  {editingAxis === axis ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditSave();
                          if (e.key === 'Escape') handleEditCancel();
                        }}
                        style={{
                          flex: 1,
                          padding: tokens.spacing.xs,
                          backgroundColor: tokens.colors.bg.primary,
                          border: `1px solid ${tokens.colors.border.focus}`,
                          borderRadius: tokens.radius.sm,
                          color: tokens.colors.text.primary,
                          fontSize: tokens.text.size.sm[0],
                          fontFamily: tokens.text.family.mono.join(', '),
                        }}
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEditSave}
                        style={{ padding: tokens.spacing.xs }}
                      >
                        ✓
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEditCancel}
                        style={{ padding: tokens.spacing.xs }}
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <span 
                      style={{ 
                        fontSize: tokens.text.size.base[0],
                        fontFamily: tokens.text.family.mono.join(', '),
                        color: tokens.colors.text.primary,
                        cursor: disabled ? 'default' : 'pointer',
                      }}
                      onClick={() => handleEditStart(axis)}
                    >
                      {formatValue(selectedOffsetData[axis as keyof WorkOffset] as number)} {unit}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOffsetZero(selectedOffsetData.id, axis as any)}
                  disabled={disabled || editingAxis === axis}
                  style={{ padding: tokens.spacing.xs }}
                >
                  <RotateCcw size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div style={{ 
        display: 'flex', 
        gap: tokens.spacing.sm,
        marginTop: tokens.spacing.lg,
        paddingTop: tokens.spacing.md,
        borderTop: `1px solid ${tokens.colors.border.primary}`,
      }}>
        <Button
          variant="outline-default"
          size="sm"
          onClick={() => {
            const currentPos = machinePosition;
            Object.keys(currentPos).forEach(axis => {
              if (selectedOffsetData && currentPos[axis as keyof typeof currentPos] !== undefined) {
                onOffsetSet(selectedOffsetData.id, axis as any, currentPos[axis as keyof typeof currentPos]!);
              }
            });
          }}
          disabled={disabled || !selectedOffsetData}
          leftIcon={<Target size={16} />}
        >
          Set to Current Position
        </Button>
        
        <Button
          variant="outline-default"
          size="sm"
          onClick={() => {
            if (selectedOffsetData) {
              onOffsetSet(selectedOffsetData.id, 'z', machinePosition.z);
            }
          }}
          disabled={disabled || !selectedOffsetData}
          leftIcon={<Home size={16} />}
        >
          Set Z to Current
        </Button>
      </div>
    </div>
  );
};

// Compact coordinate system display
export interface CompactCoordinateSystemProps {
  activeOffset: string
  workPosition: { x: number; y: number; z: number }
  machinePosition: { x: number; y: number; z: number }
  onOffsetClick?: () => void
  unit?: 'mm' | 'inch'
  precision?: number
  className?: string
}

export const CompactCoordinateSystem: React.FC<CompactCoordinateSystemProps> = ({
  activeOffset,
  workPosition,
  machinePosition,
  onOffsetClick,
  unit = 'mm',
  precision = 3,
  className,
}) => {
  const [showMachine, setShowMachine] = React.useState(false);
  
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
  };

  const position = showMachine ? machinePosition : workPosition;

  return (
    <div className={cn(className)} style={containerStyles}>
      <Navigation size={18} color={tokens.colors.text.secondary} />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowMachine(!showMachine)}
        style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}` }}
      >
        {showMachine ? 'Machine' : activeOffset}
      </Button>
      
      <div style={{ 
        borderLeft: `1px solid ${tokens.colors.border.primary}`,
        height: '20px',
      }} />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.md,
        fontFamily: tokens.text.family.mono.join(', '),
        fontSize: tokens.text.size.sm[0],
      }}>
        {['x', 'y', 'z'].map((axis) => (
          <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            <span style={{ color: tokens.colors.primary.main, fontWeight: 600 }}>
              {axis.toUpperCase()}:
            </span>
            <span style={{ color: tokens.colors.text.primary, fontWeight: 600 }}>
              {(position[axis as keyof typeof position] || 0).toFixed(precision)}
            </span>
          </div>
        ))}
      </div>
      
      {onOffsetClick && (
        <>
          <div style={{ 
            borderLeft: `1px solid ${tokens.colors.border.primary}`,
            height: '20px',
          }} />
          <Button
            variant="ghost"
            size="sm"
            onClick={onOffsetClick}
            leftIcon={<Settings size={16} />}
          >
            Setup
          </Button>
        </>
      )}
    </div>
  );
};