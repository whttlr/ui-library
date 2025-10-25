import * as React from 'react';
import { 
  Target,
  Zap,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Play,
  Square,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Crosshair,
  Grid,
  Ruler,
  Home,
  Lock,
  Unlock
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

export interface ProbeSettings {
  feedRate: number
  probeDistance: number
  retractDistance: number
  repeatCount: number
  probeOffset: number
  safeHeight: number
}

export interface ProbeResult {
  id: string
  type: 'surface' | 'hole' | 'boss' | 'edge' | 'corner' | 'angle'
  position: { x: number; y: number; z: number }
  timestamp: Date
  error?: string
  success: boolean
}

export interface ProbeControlProps {
  currentPosition: { x: number; y: number; z: number }
  probeSettings: ProbeSettings
  probeResults: ProbeResult[]
  isProbing: boolean
  onProbe: (direction: 'x+' | 'x-' | 'y+' | 'y-' | 'z+' | 'z-') => void
  onProbeSequence: (sequence: string) => void
  onUpdateSettings: (settings: Partial<ProbeSettings>) => void
  onSetZero: (axis?: 'x' | 'y' | 'z') => void
  onRetract: () => void
  onGoToPosition: (position: { x: number; y: number; z: number }) => void
  unit?: 'mm' | 'inch'
  precision?: number
  disabled?: boolean
  className?: string
}

export const ProbeControl: React.FC<ProbeControlProps> = ({
  currentPosition,
  probeSettings,
  probeResults,
  isProbing,
  onProbe,
  onProbeSequence,
  onUpdateSettings,
  onSetZero,
  onRetract,
  onGoToPosition,
  unit = 'mm',
  precision = 3,
  disabled = false,
  className,
}) => {
  const [selectedSequence, setSelectedSequence] = React.useState<string>('single_z');
  const [showSettings, setShowSettings] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const probeSequences = [
    { id: 'single_z', name: 'Single Z Probe', description: 'Probe Z axis down' },
    { id: 'corner_inside', name: 'Inside Corner', description: 'Probe inside corner (X-, Y-)' },
    { id: 'corner_outside', name: 'Outside Corner', description: 'Probe outside corner (X+, Y+)' },
    { id: 'center_hole', name: 'Center Hole', description: 'Find center of hole' },
    { id: 'center_boss', name: 'Center Boss', description: 'Find center of boss' },
    { id: 'surface_5pt', name: '5-Point Surface', description: 'Probe 5 points for surface mapping' },
    { id: 'edge_finder', name: 'Edge Finder', description: 'Find edge in selected direction' },
  ];

  const lastResult = probeResults[probeResults.length - 1];
  const successfulResults = probeResults.filter(r => r.success);
  const failedResults = probeResults.filter(r => !r.success);

  const formatValue = (value: number) => {
    return value.toFixed(precision);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getProbeIcon = (type: ProbeResult['type']) => {
    switch (type) {
      case 'surface':
        return <ArrowDown size={14} />;
      case 'hole':
        return <Target size={14} />;
      case 'boss':
        return <Crosshair size={14} />;
      case 'edge':
        return <Ruler size={14} />;
      case 'corner':
        return <Grid size={14} />;
      case 'angle':
        return <RotateCcw size={14} />;
      default:
        return <Target size={14} />;
    }
  };

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

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <span style={titleStyles}>
          <Target size={20} />
          Probe Control
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Badge variant={isProbing ? 'default' : 'secondary'}>
            {isProbing ? 'Probing...' : 'Ready'}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            disabled={disabled}
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* Current Position */}
      <Card style={{ 
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.bg.tertiary,
        border: 'none',
        marginBottom: tokens.spacing.lg,
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
            Current Position
          </h4>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            <Button
              variant="outline-default"
              size="sm"
              onClick={() => onSetZero()}
              disabled={disabled || isProbing}
              leftIcon={<Home size={16} />}
            >
              Zero All
            </Button>
            <Button
              variant="outline-default"
              size="sm"
              onClick={onRetract}
              disabled={disabled || isProbing}
              leftIcon={<ArrowUp size={16} />}
            >
              Retract
            </Button>
          </div>
        </div>
        <PositionDisplay
          position={currentPosition}
          unit={unit}
          precision={precision}
          showLabels={true}
        />
      </Card>

      {/* Probe Settings */}
      {showSettings && (
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
          marginBottom: tokens.spacing.lg,
        }}>
          <h4 style={{ 
            margin: `0 0 ${tokens.spacing.md} 0`,
            fontSize: tokens.text.size.sm[0],
            fontWeight: tokens.text.weight.semibold,
            color: tokens.colors.text.primary,
          }}>
            Probe Settings
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: tokens.spacing.md,
          }}>
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: tokens.spacing.xs,
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
              }}>
                Feed Rate ({unit}/min)
              </label>
              <input
                type="number"
                value={probeSettings.feedRate}
                onChange={(e) => onUpdateSettings({ feedRate: Number(e.target.value) })}
                disabled={disabled || isProbing}
                style={{
                  width: '100%',
                  padding: tokens.spacing.sm,
                  backgroundColor: tokens.colors.bg.primary,
                  border: `1px solid ${tokens.colors.border.primary}`,
                  borderRadius: tokens.radius.sm,
                  color: tokens.colors.text.primary,
                  fontSize: tokens.text.size.sm[0],
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: tokens.spacing.xs,
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
              }}>
                Max Distance ({unit})
              </label>
              <input
                type="number"
                value={probeSettings.probeDistance}
                onChange={(e) => onUpdateSettings({ probeDistance: Number(e.target.value) })}
                disabled={disabled || isProbing}
                style={{
                  width: '100%',
                  padding: tokens.spacing.sm,
                  backgroundColor: tokens.colors.bg.primary,
                  border: `1px solid ${tokens.colors.border.primary}`,
                  borderRadius: tokens.radius.sm,
                  color: tokens.colors.text.primary,
                  fontSize: tokens.text.size.sm[0],
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: tokens.spacing.xs,
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
              }}>
                Retract Distance ({unit})
              </label>
              <input
                type="number"
                value={probeSettings.retractDistance}
                onChange={(e) => onUpdateSettings({ retractDistance: Number(e.target.value) })}
                disabled={disabled || isProbing}
                style={{
                  width: '100%',
                  padding: tokens.spacing.sm,
                  backgroundColor: tokens.colors.bg.primary,
                  border: `1px solid ${tokens.colors.border.primary}`,
                  borderRadius: tokens.radius.sm,
                  color: tokens.colors.text.primary,
                  fontSize: tokens.text.size.sm[0],
                }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Manual Probe Controls */}
      <Card style={{ 
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.bg.tertiary,
        border: 'none',
        marginBottom: tokens.spacing.lg,
      }}>
        <h4 style={{ 
          margin: `0 0 ${tokens.spacing.md} 0`,
          fontSize: tokens.text.size.sm[0],
          fontWeight: tokens.text.weight.semibold,
          color: tokens.colors.text.primary,
        }}>
          Manual Probe
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: tokens.spacing.sm,
          maxWidth: '300px',
          margin: '0 auto',
        }}>
          {/* Y+ */}
          <div />
          <Button
            variant="outline-default"
            size="sm"
            onClick={() => onProbe('y+')}
            disabled={disabled || isProbing}
            leftIcon={<ArrowUp size={16} />}
          >
            Y+
          </Button>
          <div />
          
          {/* X-, Z-, X+ */}
          <Button
            variant="outline-default"
            size="sm"
            onClick={() => onProbe('x-')}
            disabled={disabled || isProbing}
            leftIcon={<ArrowLeft size={16} />}
          >
            X-
          </Button>
          <Button
            variant="outline-default"
            size="sm"
            onClick={() => onProbe('z-')}
            disabled={disabled || isProbing}
            leftIcon={<ArrowDown size={16} />}
          >
            Z-
          </Button>
          <Button
            variant="outline-default"
            size="sm"
            onClick={() => onProbe('x+')}
            disabled={disabled || isProbing}
            leftIcon={<ArrowRight size={16} />}
          >
            X+
          </Button>
          
          {/* Y- */}
          <div />
          <Button
            variant="outline-default"
            size="sm"
            onClick={() => onProbe('y-')}
            disabled={disabled || isProbing}
            leftIcon={<ArrowDown size={16} />}
          >
            Y-
          </Button>
          <div />
        </div>
      </Card>

      {/* Probe Sequences */}
      <Card style={{ 
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.bg.tertiary,
        border: 'none',
        marginBottom: tokens.spacing.lg,
      }}>
        <h4 style={{ 
          margin: `0 0 ${tokens.spacing.md} 0`,
          fontSize: tokens.text.size.sm[0],
          fontWeight: tokens.text.weight.semibold,
          color: tokens.colors.text.primary,
        }}>
          Probe Sequences
        </h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.md,
        }}>
          <Select
            value={selectedSequence}
            onValueChange={setSelectedSequence}
            disabled={disabled || isProbing}
            style={{ flex: 1 }}
          >
            {probeSequences.map(seq => (
              <option key={seq.id} value={seq.id}>
                {seq.name}
              </option>
            ))}
          </Select>
          <Button
            variant="default"
            onClick={() => onProbeSequence(selectedSequence)}
            disabled={disabled || isProbing}
            leftIcon={<Play size={16} />}
          >
            Start
          </Button>
        </div>
        <div style={{ 
          fontSize: tokens.text.size.sm[0],
          color: tokens.colors.text.secondary,
        }}>
          {probeSequences.find(seq => seq.id === selectedSequence)?.description}
        </div>
      </Card>

      {/* Probe Results */}
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
            Probe Results
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Badge variant="success" style={{ fontSize: tokens.text.size.xs[0] }}>
              {successfulResults.length} Success
            </Badge>
            {failedResults.length > 0 && (
              <Badge variant="destructive" style={{ fontSize: tokens.text.size.xs[0] }}>
                {failedResults.length} Failed
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResults(!showResults)}
              leftIcon={showResults ? <Eye size={16} /> : <Eye size={16} />}
            >
              {showResults ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>

        {/* Last Result */}
        {lastResult && (
          <div style={{ 
            padding: tokens.spacing.sm,
            backgroundColor: lastResult.success ? 
              `${tokens.colors.status.success}15` : 
              `${tokens.colors.status.error}15`,
            border: `1px solid ${lastResult.success ? 
              `${tokens.colors.status.success}40` : 
              `${tokens.colors.status.error}40`}`,
            borderRadius: tokens.radius.sm,
            marginBottom: showResults ? tokens.spacing.md : 0,
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: tokens.spacing.sm,
              marginBottom: tokens.spacing.xs,
            }}>
              {lastResult.success ? (
                <CheckCircle size={16} color={tokens.colors.status.success} />
              ) : (
                <AlertCircle size={16} color={tokens.colors.status.error} />
              )}
              <span style={{ 
                fontSize: tokens.text.size.sm[0],
                fontWeight: tokens.text.weight.medium,
                color: tokens.colors.text.primary,
              }}>
                Latest: {lastResult.success ? 'Success' : 'Failed'}
              </span>
              <span style={{ 
                fontSize: tokens.text.size.xs[0],
                color: tokens.colors.text.secondary,
              }}>
                {formatTime(lastResult.timestamp)}
              </span>
            </div>
            {lastResult.success ? (
              <div style={{ 
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
                fontFamily: tokens.text.family.mono.join(', '),
              }}>
                X: {formatValue(lastResult.position.x)} Y: {formatValue(lastResult.position.y)} Z: {formatValue(lastResult.position.z)}
              </div>
            ) : (
              <div style={{ 
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.status.error,
              }}>
                {lastResult.error || 'Probe failed'}
              </div>
            )}
          </div>
        )}

        {/* Results List */}
        {showResults && (
          <div style={{ 
            maxHeight: '200px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing.sm,
          }}>
            {probeResults.length === 0 ? (
              <div style={{ 
                textAlign: 'center',
                padding: tokens.spacing.lg,
                color: tokens.colors.text.secondary,
                fontSize: tokens.text.size.sm[0],
              }}>
                No probe results yet
              </div>
            ) : (
              probeResults.slice().reverse().map((result) => (
                <div 
                  key={result.id}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.sm,
                    backgroundColor: tokens.colors.bg.secondary,
                    borderRadius: tokens.radius.sm,
                  }}
                >
                  <div style={{ 
                    color: result.success ? tokens.colors.status.success : tokens.colors.status.error,
                  }}>
                    {getProbeIcon(result.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: tokens.text.size.sm[0],
                      color: tokens.colors.text.primary,
                      marginBottom: tokens.spacing.xs,
                    }}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)} Probe
                    </div>
                    {result.success ? (
                      <div style={{ 
                        fontSize: tokens.text.size.xs[0],
                        color: tokens.colors.text.secondary,
                        fontFamily: tokens.text.family.mono.join(', '),
                      }}>
                        X: {formatValue(result.position.x)} Y: {formatValue(result.position.y)} Z: {formatValue(result.position.z)}
                      </div>
                    ) : (
                      <div style={{ 
                        fontSize: tokens.text.size.xs[0],
                        color: tokens.colors.status.error,
                      }}>
                        {result.error || 'Failed'}
                      </div>
                    )}
                  </div>
                  <div style={{ 
                    fontSize: tokens.text.size.xs[0],
                    color: tokens.colors.text.secondary,
                  }}>
                    {formatTime(result.timestamp)}
                  </div>
                  {result.success && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGoToPosition(result.position)}
                      disabled={disabled || isProbing}
                      style={{ padding: tokens.spacing.xs }}
                    >
                      Go To
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

// Compact probe control for quick access
export interface CompactProbeControlProps {
  isProbing: boolean
  onProbe: (direction: 'z-') => void
  onShowDetails?: () => void
  disabled?: boolean
  className?: string
}

export const CompactProbeControl: React.FC<CompactProbeControlProps> = ({
  isProbing,
  onProbe,
  onShowDetails,
  disabled = false,
  className,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      <Target size={18} color={tokens.colors.text.secondary} />
      
      <div style={{ 
        borderLeft: `1px solid ${tokens.colors.border.primary}`,
        height: '20px',
      }} />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.sm,
      }}>
        <Button
          variant="outline-default"
          size="sm"
          onClick={() => onProbe('z-')}
          disabled={disabled || isProbing}
          leftIcon={isProbing ? <Zap size={14} /> : <ArrowDown size={14} />}
        >
          {isProbing ? 'Probing...' : 'Probe Z'}
        </Button>
        
        <Badge variant={isProbing ? 'default' : 'secondary'}>
          {isProbing ? 'Active' : 'Ready'}
        </Badge>
      </div>
      
      {onShowDetails && (
        <>
          <div style={{ 
            borderLeft: `1px solid ${tokens.colors.border.primary}`,
            height: '20px',
          }} />
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowDetails}
            disabled={disabled}
            leftIcon={<Settings size={16} />}
          >
            Setup
          </Button>
        </>
      )}
    </div>
  );
};