import * as React from 'react';
import { 
  AlertTriangle,
  AlertCircle,
  Info,
  XCircle,
  Clock,
  Zap,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Settings,
  Filter,
  X,
  RefreshCw
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge,
  Select,
  cn 
} from '@whttlr/ui-core';

export interface Alarm {
  id: string
  code: string
  type: 'error' | 'warning' | 'info' | 'critical'
  message: string
  description?: string
  timestamp: Date
  acknowledged: boolean
  source?: string
  category?: 'safety' | 'motion' | 'spindle' | 'coolant' | 'tool' | 'program' | 'system'
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

export interface AlarmDisplayProps {
  alarms: Alarm[]
  onAcknowledge: (alarmId: string) => void
  onAcknowledgeAll: () => void
  onClear: (alarmId: string) => void
  onClearAll: () => void
  onSettings?: () => void
  showFilters?: boolean
  maxHeight?: string
  className?: string
}

export const AlarmDisplay: React.FC<AlarmDisplayProps> = ({
  alarms,
  onAcknowledge,
  onAcknowledgeAll,
  onClear,
  onClearAll,
  onSettings,
  showFilters = true,
  maxHeight = '400px',
  className,
}) => {
  const [filterType, setFilterType] = React.useState<string>('all');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [showAcknowledged, setShowAcknowledged] = React.useState(true);
  const [expandedAlarms, setExpandedAlarms] = React.useState<Set<string>>(new Set());

  // Filter alarms
  const filteredAlarms = React.useMemo(() => {
    return alarms.filter(alarm => {
      if (filterType !== 'all' && alarm.type !== filterType) return false;
      if (filterCategory !== 'all' && alarm.category !== filterCategory) return false;
      if (!showAcknowledged && alarm.acknowledged) return false;
      return true;
    });
  }, [alarms, filterType, filterCategory, showAcknowledged]);

  // Categorize alarms
  const alarmCounts = React.useMemo(() => {
    const counts = { critical: 0, error: 0, warning: 0, info: 0, acknowledged: 0 };
    alarms.forEach(alarm => {
      if (alarm.acknowledged) {
        counts.acknowledged++;
      } else {
        counts[alarm.type]++;
      }
    });
    return counts;
  }, [alarms]);

  const toggleExpanded = (alarmId: string) => {
    setExpandedAlarms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alarmId)) {
        newSet.delete(alarmId);
      } else {
        newSet.add(alarmId);
      }
      return newSet;
    });
  };

  const getAlarmIcon = (type: Alarm['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      case 'info':
        return <Info size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getAlarmColor = (type: Alarm['type']) => {
    switch (type) {
      case 'critical':
        return tokens.colors.destructive.main;
      case 'error':
        return tokens.colors.destructive.main;
      case 'warning':
        return tokens.colors.warning.main;
      case 'info':
        return tokens.colors.info.main;
      default:
        return tokens.colors.text.secondary;
    }
  };

  const getCategoryIcon = (category: Alarm['category']) => {
    switch (category) {
      case 'safety':
        return <Shield size={14} />;
      case 'motion':
        return <RefreshCw size={14} />;
      case 'spindle':
        return <Zap size={14} />;
      case 'system':
        return <Settings size={14} />;
      default:
        return <Info size={14} />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const unacknowledgedAlarms = filteredAlarms.filter(alarm => !alarm.acknowledged);

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

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <span style={titleStyles}>
          <AlertTriangle size={20} />
          Alarms & Alerts
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          {/* Alarm counts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            {alarmCounts.critical > 0 && (
              <Badge variant="destructive" style={{ fontSize: tokens.text.size.xs[0] }}>
                {alarmCounts.critical} Critical
              </Badge>
            )}
            {alarmCounts.error > 0 && (
              <Badge variant="destructive" style={{ fontSize: tokens.text.size.xs[0] }}>
                {alarmCounts.error} Error
              </Badge>
            )}
            {alarmCounts.warning > 0 && (
              <Badge variant="warning" style={{ fontSize: tokens.text.size.xs[0] }}>
                {alarmCounts.warning} Warning
              </Badge>
            )}
            {alarmCounts.info > 0 && (
              <Badge variant="secondary" style={{ fontSize: tokens.text.size.xs[0] }}>
                {alarmCounts.info} Info
              </Badge>
            )}
          </div>
          {onSettings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettings}
            >
              <Settings size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.lg,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Filter size={16} color={tokens.colors.text.secondary} />
            <Select
              value={filterType}
              onValueChange={setFilterType}
              style={{ minWidth: '120px' }}
            >
              <option value="all">All Types</option>
              <option value="critical">Critical</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </Select>
          </div>

          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
            style={{ minWidth: '120px' }}
          >
            <option value="all">All Categories</option>
            <option value="safety">Safety</option>
            <option value="motion">Motion</option>
            <option value="spindle">Spindle</option>
            <option value="coolant">Coolant</option>
            <option value="tool">Tool</option>
            <option value="program">Program</option>
            <option value="system">System</option>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAcknowledged(!showAcknowledged)}
            leftIcon={showAcknowledged ? <Eye size={16} /> : <EyeOff size={16} />}
          >
            {showAcknowledged ? 'Hide' : 'Show'} Acknowledged
          </Button>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: tokens.spacing.sm }}>
            {unacknowledgedAlarms.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAcknowledgeAll}
                leftIcon={<CheckCircle size={16} />}
              >
                Acknowledge All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              leftIcon={<X size={16} />}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Alarms List */}
      <div style={{ 
        maxHeight,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.sm,
      }}>
        {filteredAlarms.length === 0 ? (
          <Card style={{ 
            padding: tokens.spacing.lg,
            textAlign: 'center',
            backgroundColor: tokens.colors.bg.tertiary,
            border: 'none',
          }}>
            <CheckCircle size={48} color={tokens.colors.success.main} style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ 
              margin: '0 0 0.5rem 0',
              color: tokens.colors.text.primary,
              fontSize: tokens.text.size.base[0],
            }}>
              No Active Alarms
            </h3>
            <p style={{ 
              margin: 0,
              color: tokens.colors.text.secondary,
              fontSize: tokens.text.size.sm[0],
            }}>
              All systems are operating normally
            </p>
          </Card>
        ) : (
          filteredAlarms.map((alarm) => (
            <Card 
              key={alarm.id} 
              style={{ 
                padding: tokens.spacing.md,
                backgroundColor: alarm.acknowledged ? 
                  tokens.colors.bg.tertiary : 
                  `${getAlarmColor(alarm.type)}10`,
                border: `1px solid ${alarm.acknowledged ? 
                  tokens.colors.border.default : 
                  `${getAlarmColor(alarm.type)}40`}`,
                opacity: alarm.acknowledged ? 0.7 : 1,
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: tokens.spacing.md,
              }}>
                {/* Alarm Icon */}
                <div style={{ 
                  color: getAlarmColor(alarm.type),
                  marginTop: tokens.spacing.xs,
                }}>
                  {getAlarmIcon(alarm.type)}
                </div>

                {/* Alarm Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: tokens.spacing.md,
                    marginBottom: tokens.spacing.sm,
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: tokens.spacing.sm,
                    }}>
                      <span style={{ 
                        fontSize: tokens.text.size.sm[0],
                        fontWeight: tokens.text.weight.bold,
                        color: tokens.colors.text.primary,
                        fontFamily: tokens.text.family.mono.join(', '),
                      }}>
                        {alarm.code}
                      </span>
                      {alarm.category && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: tokens.spacing.xs,
                          color: tokens.colors.text.secondary,
                        }}>
                          {getCategoryIcon(alarm.category)}
                          <span style={{ 
                            fontSize: tokens.text.size.xs[0],
                            textTransform: 'capitalize',
                          }}>
                            {alarm.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: tokens.spacing.xs,
                      marginLeft: 'auto',
                    }}>
                      <Clock size={14} color={tokens.colors.text.secondary} />
                      <span style={{ 
                        fontSize: tokens.text.size.xs[0],
                        color: tokens.colors.text.secondary,
                      }}>
                        {formatTime(alarm.timestamp)}
                      </span>
                    </div>
                  </div>

                  <div style={{ 
                    fontSize: tokens.text.size.sm[0],
                    color: tokens.colors.text.primary,
                    marginBottom: tokens.spacing.sm,
                  }}>
                    {alarm.message}
                  </div>

                  {alarm.description && (
                    <div style={{ 
                      fontSize: tokens.text.size.xs[0],
                      color: tokens.colors.text.secondary,
                      marginBottom: tokens.spacing.sm,
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleExpanded(alarm.id)}
                    >
                      {expandedAlarms.has(alarm.id) ? alarm.description : 
                        `${alarm.description.substring(0, 80)}${alarm.description.length > 80 ? '...' : ''}`
                      }
                      {alarm.description.length > 80 && (
                        <span style={{ 
                          color: tokens.colors.primary.main,
                          marginLeft: tokens.spacing.xs,
                        }}>
                          {expandedAlarms.has(alarm.id) ? 'Show less' : 'Show more'}
                        </span>
                      )}
                    </div>
                  )}

                  {alarm.source && (
                    <div style={{ 
                      fontSize: tokens.text.size.xs[0],
                      color: tokens.colors.text.secondary,
                      marginBottom: tokens.spacing.sm,
                    }}>
                      Source: {alarm.source}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: tokens.spacing.xs,
                }}>
                  {!alarm.acknowledged && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcknowledge(alarm.id)}
                      leftIcon={<CheckCircle size={14} />}
                    >
                      Ack
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onClear(alarm.id)}
                    leftIcon={<X size={14} />}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Compact alarm display for status bars
export interface CompactAlarmDisplayProps {
  alarms: Alarm[]
  onShowDetails?: () => void
  className?: string
}

export const CompactAlarmDisplay: React.FC<CompactAlarmDisplayProps> = ({
  alarms,
  onShowDetails,
  className,
}) => {
  const unacknowledgedAlarms = alarms.filter(alarm => !alarm.acknowledged);
  const criticalAlarms = unacknowledgedAlarms.filter(alarm => alarm.type === 'critical');
  const errorAlarms = unacknowledgedAlarms.filter(alarm => alarm.type === 'error');
  const warningAlarms = unacknowledgedAlarms.filter(alarm => alarm.type === 'warning');

  const hasAlarms = unacknowledgedAlarms.length > 0;
  const hasCritical = criticalAlarms.length > 0;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: hasAlarms ? 
      (hasCritical ? `${tokens.colors.destructive.main}15` : `${tokens.colors.warning.main}15`) :
      tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${hasAlarms ? 
      (hasCritical ? `${tokens.colors.destructive.main}40` : `${tokens.colors.warning.main}40`) :
      tokens.colors.border.default}`,
    cursor: onShowDetails ? 'pointer' : 'default',
  };

  const getStatusColor = () => {
    if (hasCritical) return tokens.colors.destructive.main;
    if (errorAlarms.length > 0) return tokens.colors.destructive.main;
    if (warningAlarms.length > 0) return tokens.colors.warning.main;
    return tokens.colors.success.main;
  };

  const getStatusIcon = () => {
    if (hasCritical) return <XCircle size={16} />;
    if (errorAlarms.length > 0) return <AlertCircle size={16} />;
    if (warningAlarms.length > 0) return <AlertTriangle size={16} />;
    return <CheckCircle size={16} />;
  };

  const getStatusText = () => {
    if (hasCritical) return 'Critical Alarms';
    if (errorAlarms.length > 0) return 'Error Alarms';
    if (warningAlarms.length > 0) return 'Warning Alarms';
    return 'All Clear';
  };

  return (
    <div 
      className={cn(className)} 
      style={containerStyles}
      onClick={onShowDetails}
    >
      <div style={{ color: getStatusColor() }}>
        {getStatusIcon()}
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.sm,
      }}>
        <span style={{ 
          fontSize: tokens.text.size.sm[0],
          color: tokens.colors.text.primary,
          fontWeight: tokens.text.weight.medium,
        }}>
          {getStatusText()}
        </span>
        
        {hasAlarms && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: tokens.spacing.xs,
          }}>
            {criticalAlarms.length > 0 && (
              <Badge variant="destructive" style={{ fontSize: tokens.text.size.xs[0] }}>
                {criticalAlarms.length}
              </Badge>
            )}
            {errorAlarms.length > 0 && (
              <Badge variant="destructive" style={{ fontSize: tokens.text.size.xs[0] }}>
                {errorAlarms.length}
              </Badge>
            )}
            {warningAlarms.length > 0 && (
              <Badge variant="warning" style={{ fontSize: tokens.text.size.xs[0] }}>
                {warningAlarms.length}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};