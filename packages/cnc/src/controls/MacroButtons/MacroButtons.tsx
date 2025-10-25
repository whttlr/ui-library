import * as React from 'react';
import { 
  Play,
  Square,
  RotateCcw,
  Home,
  Target,
  Zap,
  Settings,
  Edit,
  Copy,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  Command,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge,
  Select,
  cn 
} from '@whttlr/ui-core';

export interface MacroButton {
  id: string
  name: string
  description?: string
  gcode: string
  icon?: React.ReactNode
  color?: string
  category?: 'setup' | 'operation' | 'maintenance' | 'safety' | 'custom'
  hotkey?: string
  enabled?: boolean
  estimatedTime?: number
  requiresConfirmation?: boolean
}

export interface MacroButtonsProps {
  macros: MacroButton[]
  onExecute: (macroId: string) => void
  onEdit?: (macroId: string) => void
  onDelete?: (macroId: string) => void
  onAdd?: () => void
  onSettings?: () => void
  showCategories?: boolean
  showDescriptions?: boolean
  allowEdit?: boolean
  layout?: 'grid' | 'list'
  columns?: number
  disabled?: boolean
  className?: string
}

export const MacroButtons: React.FC<MacroButtonsProps> = ({
  macros,
  onExecute,
  onEdit,
  onDelete,
  onAdd,
  onSettings,
  showCategories = true,
  showDescriptions = true,
  allowEdit = true,
  layout = 'grid',
  columns = 4,
  disabled = false,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [executingMacro, setExecutingMacro] = React.useState<string | null>(null);
  const [expandedMacros, setExpandedMacros] = React.useState<Set<string>>(new Set());

  // Filter macros by category
  const filteredMacros = React.useMemo(() => {
    if (selectedCategory === 'all') return macros;
    return macros.filter(macro => macro.category === selectedCategory);
  }, [macros, selectedCategory]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(macros.map(macro => macro.category).filter(Boolean));
    return Array.from(cats);
  }, [macros]);

  const handleExecute = async (macroId: string) => {
    const macro = macros.find(m => m.id === macroId);
    if (!macro || !macro.enabled) return;

    if (macro.requiresConfirmation) {
      if (!window.confirm(`Execute macro "${macro.name}"?`)) return;
    }

    setExecutingMacro(macroId);
    try {
      await onExecute(macroId);
    } finally {
      setTimeout(() => setExecutingMacro(null), 1000);
    }
  };

  const toggleExpanded = (macroId: string) => {
    setExpandedMacros(prev => {
      const newSet = new Set(prev);
      if (newSet.has(macroId)) {
        newSet.delete(macroId);
      } else {
        newSet.add(macroId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'setup':
        return tokens.colors.status.info;
      case 'operation':
        return tokens.colors.status.success;
      case 'maintenance':
        return tokens.colors.status.warning;
      case 'safety':
        return tokens.colors.status.error;
      default:
        return tokens.colors.primary.main;
    }
  };

  const getDefaultIcon = (category: string) => {
    switch (category) {
      case 'setup':
        return <Settings size={16} />;
      case 'operation':
        return <Play size={16} />;
      case 'maintenance':
        return <RotateCcw size={16} />;
      case 'safety':
        return <AlertCircle size={16} />;
      default:
        return <Command size={16} />;
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
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
          <Command size={20} />
          Macro Buttons
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Badge variant="outline-default">
            {filteredMacros.length} macros
          </Badge>
          <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
            {onAdd && (
              <Button
                variant="outline-default"
                size="sm"
                onClick={onAdd}
                disabled={disabled}
                leftIcon={<Plus size={16} />}
              >
                Add
              </Button>
            )}
            {onSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSettings}
                disabled={disabled}
              >
                <Settings size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {showCategories && categories.length > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.lg,
        }}>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            style={{ minWidth: '150px' }}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Macro Buttons */}
      <div style={{ 
        display: layout === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: layout === 'grid' ? `repeat(${columns}, 1fr)` : undefined,
        flexDirection: layout === 'list' ? 'column' : undefined,
        gap: tokens.spacing.md,
      }}>
        {filteredMacros.map((macro) => {
          const isExecuting = executingMacro === macro.id;
          const isExpanded = expandedMacros.has(macro.id);
          
          return (
            <Card 
              key={macro.id}
              style={{ 
                padding: tokens.spacing.md,
                backgroundColor: tokens.colors.bg.tertiary,
                border: `1px solid ${tokens.colors.border.primary}`,
                opacity: macro.enabled === false ? 0.5 : 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Macro Button */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: tokens.spacing.sm,
                marginBottom: showDescriptions && macro.description ? tokens.spacing.sm : 0,
              }}>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleExecute(macro.id)}
                  disabled={disabled || macro.enabled === false || isExecuting}
                  leftIcon={isExecuting ? <CheckCircle size={16} /> : (macro.icon || getDefaultIcon(macro.category || 'custom'))}
                  style={{ 
                    flex: 1,
                    backgroundColor: isExecuting ? tokens.colors.status.success : undefined,
                    color: macro.color || undefined,
                  }}
                >
                  {isExecuting ? 'Executing...' : macro.name}
                </Button>

                {/* Expand/Collapse Button */}
                {(showDescriptions && macro.description) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(macro.id)}
                    style={{ padding: tokens.spacing.xs }}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                )}

                {/* Edit/Delete Actions */}
                {allowEdit && (
                  <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(macro.id)}
                        disabled={disabled}
                        style={{ padding: tokens.spacing.xs }}
                      >
                        <Edit size={14} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(macro.id)}
                        disabled={disabled}
                        style={{ padding: tokens.spacing.xs }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Macro Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: tokens.spacing.sm,
                fontSize: tokens.text.size.xs[0],
                color: tokens.colors.text.secondary,
                marginBottom: tokens.spacing.sm,
              }}>
                {macro.category && (
                  <Badge 
                    variant="outline-default"
                    style={{ 
                      fontSize: tokens.text.size.xs[0],
                      color: getCategoryColor(macro.category),
                    }}
                  >
                    {macro.category}
                  </Badge>
                )}
                
                {macro.hotkey && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: tokens.spacing.xs,
                  }}>
                    <span>Hotkey:</span>
                    <code style={{ 
                      backgroundColor: tokens.colors.bg.secondary,
                      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                      borderRadius: tokens.radius.sm,
                      fontSize: tokens.text.size.xs[0],
                    }}>
                      {macro.hotkey}
                    </code>
                  </div>
                )}

                {macro.estimatedTime && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: tokens.spacing.xs,
                  }}>
                    <Clock size={12} />
                    <span>{formatTime(macro.estimatedTime)}</span>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div style={{ 
                  padding: tokens.spacing.sm,
                  backgroundColor: tokens.colors.bg.secondary,
                  borderRadius: tokens.radius.sm,
                  marginTop: tokens.spacing.sm,
                }}>
                  {macro.description && (
                    <div style={{ 
                      fontSize: tokens.text.size.sm[0],
                      color: tokens.colors.text.secondary,
                      marginBottom: tokens.spacing.sm,
                    }}>
                      {macro.description}
                    </div>
                  )}
                  
                  <div style={{ 
                    fontSize: tokens.text.size.xs[0],
                    color: tokens.colors.text.secondary,
                    marginBottom: tokens.spacing.sm,
                  }}>
                    G-code Preview:
                  </div>
                  
                  <div style={{ 
                    backgroundColor: tokens.colors.bg.primary,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.sm,
                    fontSize: tokens.text.size.xs[0],
                    fontFamily: tokens.text.family.mono.join(', '),
                    color: tokens.colors.text.primary,
                    maxHeight: '100px',
                    overflowY: 'auto',
                  }}>
                    {macro.gcode.split('\n').slice(0, 5).map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    {macro.gcode.split('\n').length > 5 && (
                      <div style={{ color: tokens.colors.text.secondary }}>
                        ... ({macro.gcode.split('\n').length - 5} more lines)
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMacros.length === 0 && (
        <Card style={{ 
          padding: tokens.spacing.xl,
          textAlign: 'center',
          backgroundColor: tokens.colors.bg.tertiary,
          border: 'none',
        }}>
          <FileText size={48} color={tokens.colors.text.secondary} style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            color: tokens.colors.text.primary,
            fontSize: tokens.text.size.base[0],
          }}>
            No Macros Available
          </h3>
          <p style={{ 
            margin: '0 0 1rem 0',
            color: tokens.colors.text.secondary,
            fontSize: tokens.text.size.sm[0],
          }}>
            {selectedCategory === 'all' ? 
              'No macros have been configured yet.' : 
              `No macros found in the "${selectedCategory}" category.`
            }
          </p>
          {onAdd && (
            <Button
              variant="outline-default"
              onClick={onAdd}
              disabled={disabled}
              leftIcon={<Plus size={16} />}
            >
              Add First Macro
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};

// Compact macro buttons for quick access
export interface CompactMacroButtonsProps {
  macros: MacroButton[]
  onExecute: (macroId: string) => void
  maxButtons?: number
  showLabels?: boolean
  disabled?: boolean
  className?: string
}

export const CompactMacroButtons: React.FC<CompactMacroButtonsProps> = ({
  macros,
  onExecute,
  maxButtons = 6,
  showLabels = false,
  disabled = false,
  className,
}) => {
  const [executingMacro, setExecutingMacro] = React.useState<string | null>(null);

  const displayMacros = macros.slice(0, maxButtons);

  const handleExecute = async (macroId: string) => {
    const macro = macros.find(m => m.id === macroId);
    if (!macro || !macro.enabled) return;

    if (macro.requiresConfirmation) {
      if (!window.confirm(`Execute macro "${macro.name}"?`)) return;
    }

    setExecutingMacro(macroId);
    try {
      await onExecute(macroId);
    } finally {
      setTimeout(() => setExecutingMacro(null), 1000);
    }
  };

  const getDefaultIcon = (category: string) => {
    switch (category) {
      case 'setup':
        return <Settings size={16} />;
      case 'operation':
        return <Play size={16} />;
      case 'maintenance':
        return <RotateCcw size={16} />;
      case 'safety':
        return <AlertCircle size={16} />;
      default:
        return <Command size={16} />;
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      <Command size={18} color={tokens.colors.text.secondary} />
      
      <div style={{ 
        borderLeft: `1px solid ${tokens.colors.border.primary}`,
        height: '20px',
      }} />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.sm,
      }}>
        {displayMacros.map((macro) => {
          const isExecuting = executingMacro === macro.id;
          
          return (
            <Button
              key={macro.id}
              variant="ghost"
              size="sm"
              onClick={() => handleExecute(macro.id)}
              disabled={disabled || macro.enabled === false || isExecuting}
              leftIcon={isExecuting ? <CheckCircle size={14} /> : (macro.icon || getDefaultIcon(macro.category || 'custom'))}
              title={macro.description || macro.name}
              style={{ 
                padding: showLabels ? undefined : tokens.spacing.xs,
                backgroundColor: isExecuting ? tokens.colors.status.success : undefined,
                color: macro.color || undefined,
              }}
            >
              {showLabels && (isExecuting ? 'Executing...' : macro.name)}
            </Button>
          );
        })}
      </div>
      
      {macros.length > maxButtons && (
        <>
          <div style={{ 
            borderLeft: `1px solid ${tokens.colors.border.primary}`,
            height: '20px',
          }} />
          <Badge variant="secondary" style={{ fontSize: tokens.text.size.xs[0] }}>
            +{macros.length - maxButtons} more
          </Badge>
        </>
      )}
    </div>
  );
};