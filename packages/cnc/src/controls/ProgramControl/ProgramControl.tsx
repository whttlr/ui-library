import * as React from 'react';
import { 
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  RotateCcw,
  Timer,
  Zap,
  CheckCircle,
  AlertCircle,
  FileText,
  Settings,
  Upload,
  Download
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge,
  Progress,
  cn 
} from '@whttlr/ui-core';

export interface ProgramState {
  status: 'idle' | 'running' | 'paused' | 'stopped' | 'completed' | 'error'
  currentLine: number
  totalLines: number
  runtime: number
  estimatedTime: number
  programName: string
  errorMessage?: string
}

export interface ProgramControlProps {
  programState: ProgramState
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onReset: () => void
  onSingleStep: () => void
  onSkipToLine?: (line: number) => void
  onLoadProgram?: () => void
  onSaveProgram?: () => void
  onProgramSettings?: () => void
  disabled?: boolean
  className?: string
}

export const ProgramControl: React.FC<ProgramControlProps> = ({
  programState,
  onStart,
  onPause,
  onStop,
  onReset,
  onSingleStep,
  onSkipToLine,
  onLoadProgram,
  onSaveProgram,
  onProgramSettings,
  disabled = false,
  className,
}) => {
  const {
    status,
    currentLine,
    totalLines,
    runtime,
    estimatedTime,
    programName,
    errorMessage,
  } = programState;

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isCompleted = status === 'completed';
  const hasError = status === 'error';
  const canStart = !isRunning && !disabled;
  const canPause = isRunning && !disabled;
  const canStop = (isRunning || isPaused) && !disabled;
  const canStep = isPaused && !disabled;

  // Calculate progress
  const progress = totalLines > 0 ? (currentLine / totalLines) * 100 : 0;

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return tokens.colors.success.main;
      case 'paused':
        return tokens.colors.warning.main;
      case 'error':
        return tokens.colors.destructive.main;
      case 'completed':
        return tokens.colors.success.main;
      default:
        return tokens.colors.text.secondary;
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Play size={16} />;
      case 'paused':
        return <Pause size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      default:
        return <Square size={16} />;
    }
  };

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
          <FileText size={20} />
          Program Control
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Badge 
            variant={hasError ? 'destructive' : isCompleted ? 'success' : 'secondary'}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: tokens.spacing.xs,
              color: getStatusColor(),
            }}
          >
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {onProgramSettings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onProgramSettings}
              disabled={disabled}
            >
              <Settings size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Program Info */}
      <Card style={{ 
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.bg.tertiary,
        border: 'none',
        marginBottom: tokens.spacing.lg,
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: tokens.spacing.md,
        }}>
          <div>
            <h4 style={{ 
              margin: 0,
              fontSize: tokens.text.size.sm[0],
              fontWeight: tokens.text.weight.semibold,
              color: tokens.colors.text.primary,
            }}>
              {programName || 'No Program Loaded'}
            </h4>
            <span style={{ 
              fontSize: tokens.text.size.xs[0],
              color: tokens.colors.text.secondary,
            }}>
              {totalLines > 0 ? `${totalLines} lines` : 'Load a program to begin'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            {onLoadProgram && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLoadProgram}
                disabled={disabled}
                leftIcon={<Upload size={16} />}
              >
                Load
              </Button>
            )}
            {onSaveProgram && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSaveProgram}
                disabled={disabled}
                leftIcon={<Download size={16} />}
              >
                Save
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {totalLines > 0 && (
          <div style={{ marginBottom: tokens.spacing.md }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: tokens.spacing.xs,
            }}>
              <span style={{ 
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
              }}>
                Line {currentLine} of {totalLines}
              </span>
              <span style={{ 
                fontSize: tokens.text.size.sm[0],
                color: tokens.colors.text.secondary,
              }}>
                {progress.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={progress} 
              style={{ 
                height: '8px',
                backgroundColor: tokens.colors.bg.primary,
              }}
            />
          </div>
        )}

        {/* Runtime Info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: tokens.spacing.sm,
          }}>
            <Timer size={16} color={tokens.colors.text.secondary} />
            <span style={{ 
              fontSize: tokens.text.size.sm[0],
              color: tokens.colors.text.secondary,
            }}>
              Runtime: {formatTime(runtime)}
            </span>
          </div>
          {estimatedTime > 0 && (
            <span style={{ 
              fontSize: tokens.text.size.sm[0],
              color: tokens.colors.text.secondary,
            }}>
              Est: {formatTime(estimatedTime)}
            </span>
          )}
        </div>
      </Card>

      {/* Error Message */}
      {hasError && errorMessage && (
        <Card style={{ 
          padding: tokens.spacing.md,
          backgroundColor: `${tokens.colors.destructive.main}15`,
          border: `1px solid ${tokens.colors.destructive.main}40`,
          marginBottom: tokens.spacing.lg,
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: tokens.spacing.sm,
          }}>
            <AlertCircle size={16} color={tokens.colors.destructive.main} />
            <span style={{ 
              fontSize: tokens.text.size.sm[0],
              color: tokens.colors.destructive.main,
            }}>
              {errorMessage}
            </span>
          </div>
        </Card>
      )}

      {/* Main Controls */}
      <div style={{ 
        display: 'flex', 
        gap: tokens.spacing.md,
        marginBottom: tokens.spacing.lg,
      }}>
        {/* Start/Pause Button */}
        {canStart ? (
          <Button
            variant="success"
            size="lg"
            onClick={onStart}
            disabled={!canStart}
            leftIcon={<Play size={20} />}
            style={{ flex: 1 }}
          >
            {isPaused ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button
            variant="warning"
            size="lg"
            onClick={onPause}
            disabled={!canPause}
            leftIcon={<Pause size={20} />}
            style={{ flex: 1 }}
          >
            Pause
          </Button>
        )}

        {/* Stop Button */}
        <Button
          variant="destructive"
          size="lg"
          onClick={onStop}
          disabled={!canStop}
          leftIcon={<Square size={20} />}
          style={{ flex: 1 }}
        >
          Stop
        </Button>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          disabled={disabled}
          leftIcon={<RotateCcw size={20} />}
          style={{ flex: 1 }}
        >
          Reset
        </Button>
      </div>

      {/* Secondary Controls */}
      <div style={{ 
        display: 'flex', 
        gap: tokens.spacing.sm,
        paddingTop: tokens.spacing.md,
        borderTop: `1px solid ${tokens.colors.border.default}`,
      }}>
        <Button
          variant="outline"
          size="sm"
          onClick={onSingleStep}
          disabled={!canStep}
          leftIcon={<SkipForward size={16} />}
        >
          Single Step
        </Button>

        {onSkipToLine && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSkipToLine(Math.max(1, currentLine - 1))}
              disabled={disabled || currentLine <= 1}
              leftIcon={<SkipBack size={16} />}
            >
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSkipToLine(Math.min(totalLines, currentLine + 1))}
              disabled={disabled || currentLine >= totalLines}
              leftIcon={<SkipForward size={16} />}
            >
              Forward
            </Button>
          </>
        )}

        <div style={{ flex: 1 }} />

        {/* Speed Override */}
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          leftIcon={<Zap size={16} />}
          style={{ 
            fontSize: tokens.text.size.sm[0],
            color: tokens.colors.text.secondary,
          }}
        >
          100%
        </Button>
      </div>
    </div>
  );
};

// Compact program control for toolbars
export interface CompactProgramControlProps {
  programState: ProgramState
  onStart: () => void
  onPause: () => void
  onStop: () => void
  onShowDetails?: () => void
  disabled?: boolean
  className?: string
}

export const CompactProgramControl: React.FC<CompactProgramControlProps> = ({
  programState,
  onStart,
  onPause,
  onStop,
  onShowDetails,
  disabled = false,
  className,
}) => {
  const { status, currentLine, totalLines, runtime } = programState;

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const hasError = status === 'error';
  const canStart = !isRunning && !disabled;
  const canPause = isRunning && !disabled;
  const canStop = (isRunning || isPaused) && !disabled;

  // Calculate progress
  const progress = totalLines > 0 ? (currentLine / totalLines) * 100 : 0;

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return tokens.colors.success.main;
      case 'paused':
        return tokens.colors.warning.main;
      case 'error':
        return tokens.colors.destructive.main;
      case 'completed':
        return tokens.colors.success.main;
      default:
        return tokens.colors.text.secondary;
    }
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.default}`,
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Status Indicator */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.sm,
      }}>
        <div style={{ 
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: getStatusColor(),
        }} />
        <span style={{ 
          fontSize: tokens.text.size.sm[0],
          color: tokens.colors.text.secondary,
          fontWeight: tokens.text.weight.medium,
        }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Progress Info */}
      {totalLines > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: tokens.spacing.sm,
          fontSize: tokens.text.size.sm[0],
          color: tokens.colors.text.secondary,
        }}>
          <span>{currentLine}/{totalLines}</span>
          <Progress 
            value={progress} 
            style={{ 
              width: '60px',
              height: '4px',
              backgroundColor: tokens.colors.bg.primary,
            }}
          />
          <span>{progress.toFixed(0)}%</span>
        </div>
      )}

      {/* Runtime */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: tokens.spacing.xs,
        fontSize: tokens.text.size.sm[0],
        color: tokens.colors.text.secondary,
      }}>
        <Timer size={14} />
        <span>{formatTime(runtime)}</span>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        gap: tokens.spacing.xs,
        marginLeft: 'auto',
      }}>
        {/* Start/Pause Button */}
        {canStart ? (
          <Button
            variant="success"
            size="sm"
            onClick={onStart}
            disabled={!canStart}
            style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}` }}
          >
            <Play size={14} />
          </Button>
        ) : (
          <Button
            variant="warning"
            size="sm"
            onClick={onPause}
            disabled={!canPause}
            style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}` }}
          >
            <Pause size={14} />
          </Button>
        )}

        {/* Stop Button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={onStop}
          disabled={!canStop}
          style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}` }}
        >
          <Square size={14} />
        </Button>

        {/* Details Button */}
        {onShowDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowDetails}
            disabled={disabled}
            style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}` }}
          >
            <FileText size={14} />
          </Button>
        )}
      </div>
    </div>
  );
};