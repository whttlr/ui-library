import * as React from 'react';
import { 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Package,
  Ruler,
  Clock,
  Hash
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge, 
  Progress, 
  Select,
  cn 
} from '@whttlr/ui-core';

export interface Tool {
  id: number
  name: string
  type: 'endmill' | 'drill' | 'facemill' | 'ballnose' | 'chamfer' | 'tap' | 'reamer' | 'custom'
  diameter: number
  length?: number
  flutes?: number
  material?: string
  coating?: string
  wearPercentage?: number
  timeInUse?: number // minutes
  cutsCompleted?: number
  maxCuts?: number
  notes?: string
}

export interface ToolSelectorProps {
  tools: Tool[]
  selectedToolId?: number
  onSelectTool: (toolId: number) => void
  onToolChange?: (toolId: number) => void
  unit?: 'mm' | 'inch'
  showWearIndicator?: boolean
  showToolInfo?: boolean
  disabled?: boolean
  className?: string
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({
  tools,
  selectedToolId,
  onSelectTool,
  onToolChange,
  unit = 'mm',
  showWearIndicator = true,
  showToolInfo = true,
  disabled = false,
  className,
}) => {
  const selectedTool = tools.find(t => t.id === selectedToolId);

  // Container styles
  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border.default}`,
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

  // Tool type icons
  const getToolIcon = (type: Tool['type']) => {
    const iconProps = { size: 18, color: tokens.colors.text.secondary };
    switch (type) {
      case 'drill':
        return <Package {...iconProps} />;
      case 'facemill':
        return <Hash {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  // Tool wear color
  const getWearColor = (wearPercentage?: number) => {
    if (!wearPercentage) return tokens.colors.text.secondary;
    if (wearPercentage >= 80) return tokens.colors.status.error;
    if (wearPercentage >= 60) return tokens.colors.status.warning;
    return tokens.colors.status.success;
  };

  // Format tool options for Select
  const toolOptions = tools.map(tool => ({
    value: tool.id.toString(),
    label: `T${tool.id.toString().padStart(2, '0')} - ${tool.name}`,
  }));

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <span style={titleStyles}>
          <Wrench size={20} />
          Tool Selection
        </span>
        {onToolChange && selectedTool && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToolChange(selectedTool.id)}
            disabled={disabled}
            leftIcon={<RefreshCw size={16} />}
          >
            Change Tool
          </Button>
        )}
      </div>

      {/* Tool Selector */}
      <div style={{ marginBottom: tokens.spacing.lg }}>
        <Select
          value={selectedToolId?.toString()}
          onValueChange={(value) => onSelectTool(parseInt(value))}
          disabled={disabled}
          placeholder="Select a tool..."
        >
          {toolOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Selected Tool Info */}
      {selectedTool && showToolInfo && (
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
        }}>
          {/* Tool Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: tokens.spacing.md,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              {getToolIcon(selectedTool.type)}
              <div>
                <div style={{ 
                  fontSize: tokens.text.size.lg[0],
                  fontWeight: tokens.text.weight.semibold,
                  color: tokens.colors.text.primary,
                }}>
                  T{selectedTool.id.toString().padStart(2, '0')}
                </div>
                <div style={{ 
                  fontSize: tokens.text.size.sm[0],
                  color: tokens.colors.text.secondary,
                }}>
                  {selectedTool.name}
                </div>
              </div>
            </div>
            <Badge variant="outline">{selectedTool.type}</Badge>
          </div>

          {/* Tool Specifications */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: tokens.spacing.sm,
            marginBottom: tokens.spacing.md,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Ruler size={14} color={tokens.colors.text.secondary} />
              <span style={{ fontSize: tokens.text.size.sm[0], color: tokens.colors.text.secondary }}>
                Diameter:
              </span>
              <span style={{ 
                fontSize: tokens.text.size.sm[0], 
                fontWeight: tokens.text.weight.semibold,
                fontFamily: tokens.text.family.mono.join(', '),
              }}>
                {selectedTool.diameter} {unit}
              </span>
            </div>
            
            {selectedTool.length && (
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Ruler size={14} color={tokens.colors.text.secondary} />
                <span style={{ fontSize: tokens.text.size.sm[0], color: tokens.colors.text.secondary }}>
                  Length:
                </span>
                <span style={{ 
                  fontSize: tokens.text.size.sm[0], 
                  fontWeight: tokens.text.weight.semibold,
                  fontFamily: tokens.text.family.mono.join(', '),
                }}>
                  {selectedTool.length} {unit}
                </span>
              </div>
            )}
            
            {selectedTool.flutes && (
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Hash size={14} color={tokens.colors.text.secondary} />
                <span style={{ fontSize: tokens.text.size.sm[0], color: tokens.colors.text.secondary }}>
                  Flutes:
                </span>
                <span style={{ 
                  fontSize: tokens.text.size.sm[0], 
                  fontWeight: tokens.text.weight.semibold,
                }}>
                  {selectedTool.flutes}
                </span>
              </div>
            )}
            
            {selectedTool.material && (
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Package size={14} color={tokens.colors.text.secondary} />
                <span style={{ fontSize: tokens.text.size.sm[0], color: tokens.colors.text.secondary }}>
                  Material:
                </span>
                <span style={{ 
                  fontSize: tokens.text.size.sm[0], 
                  fontWeight: tokens.text.weight.semibold,
                }}>
                  {selectedTool.material}
                </span>
              </div>
            )}
          </div>

          {/* Tool Wear Indicator */}
          {showWearIndicator && selectedTool.wearPercentage !== undefined && (
            <div style={{ marginBottom: tokens.spacing.md }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: tokens.spacing.xs,
              }}>
                <span style={{ 
                  fontSize: tokens.text.size.sm[0], 
                  color: tokens.colors.text.secondary,
                }}>
                  Tool Wear
                </span>
                <span style={{ 
                  fontSize: tokens.text.size.sm[0], 
                  fontWeight: tokens.text.weight.semibold,
                  color: getWearColor(selectedTool.wearPercentage),
                }}>
                  {selectedTool.wearPercentage}%
                </span>
              </div>
              <Progress
                value={selectedTool.wearPercentage}
                style={{ 
                  height: '6px',
                  backgroundColor: tokens.colors.bg.primary,
                }}
              />
              {selectedTool.wearPercentage >= 80 && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: tokens.spacing.xs,
                  marginTop: tokens.spacing.xs,
                }}>
                  <AlertTriangle size={14} color={tokens.colors.status.warning} />
                  <span style={{ 
                    fontSize: tokens.text.size.xs[0], 
                    color: tokens.colors.status.warning,
                  }}>
                    Consider tool replacement
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tool Usage Stats */}
          {(selectedTool.timeInUse || selectedTool.cutsCompleted) && (
            <div style={{ 
              display: 'flex', 
              gap: tokens.spacing.md,
              paddingTop: tokens.spacing.sm,
              borderTop: `1px solid ${tokens.colors.border.default}`,
            }}>
              {selectedTool.timeInUse && (
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <Clock size={14} color={tokens.colors.text.secondary} />
                  <span style={{ fontSize: tokens.text.size.xs[0], color: tokens.colors.text.secondary }}>
                    {Math.floor(selectedTool.timeInUse / 60)}h {selectedTool.timeInUse % 60}m
                  </span>
                </div>
              )}
              
              {selectedTool.cutsCompleted && selectedTool.maxCuts && (
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <CheckCircle size={14} color={tokens.colors.text.secondary} />
                  <span style={{ fontSize: tokens.text.size.xs[0], color: tokens.colors.text.secondary }}>
                    {selectedTool.cutsCompleted}/{selectedTool.maxCuts} cuts
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tool Notes */}
          {selectedTool.notes && (
            <div style={{ 
              marginTop: tokens.spacing.md,
              padding: tokens.spacing.sm,
              backgroundColor: tokens.colors.bg.secondary,
              borderRadius: tokens.radius.sm,
              borderLeft: `3px solid ${tokens.colors.status.info}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Info size={14} color={tokens.colors.status.info} />
                <span style={{ 
                  fontSize: tokens.text.size.xs[0], 
                  color: tokens.colors.text.secondary,
                }}>
                  {selectedTool.notes}
                </span>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

// Compact version for toolbar integration
export interface CompactToolSelectorProps {
  tools: Tool[]
  selectedToolId?: number
  onSelectTool: (toolId: number) => void
  disabled?: boolean
  className?: string
}

export const CompactToolSelector: React.FC<CompactToolSelectorProps> = ({
  tools,
  selectedToolId,
  onSelectTool,
  disabled = false,
  className,
}) => {
  const selectedTool = tools.find(t => t.id === selectedToolId);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.default}`,
  };

  const toolDisplayStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    minWidth: '120px',
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      <Wrench size={18} color={tokens.colors.text.secondary} />
      
      <div style={toolDisplayStyles}>
        <Select
          value={selectedToolId?.toString()}
          onValueChange={(value) => onSelectTool(parseInt(value))}
          disabled={disabled}
          placeholder="Tool..."
          style={{ 
            minWidth: '100px',
            padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
          }}
        >
          {tools.map(tool => (
            <option key={tool.id} value={tool.id.toString()}>
              T{tool.id.toString().padStart(2, '0')}
            </option>
          ))}
        </Select>
        
        {selectedTool && (
          <>
            <div style={{ 
              borderLeft: `1px solid ${tokens.colors.border.default}`,
              height: '20px',
            }} />
            <div style={{ 
              fontSize: tokens.text.size.sm[0],
              color: tokens.colors.text.secondary,
            }}>
              {selectedTool.name}
            </div>
            {selectedTool.wearPercentage !== undefined && (
              <Badge 
                variant={selectedTool.wearPercentage >= 80 ? 'destructive' : 'secondary'}
                style={{ fontSize: tokens.text.size.xs[0] }}
              >
                {selectedTool.wearPercentage}%
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
};