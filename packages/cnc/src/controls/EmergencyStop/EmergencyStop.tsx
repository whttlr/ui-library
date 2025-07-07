import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, XOctagon, RotateCcw } from 'lucide-react';
import {
  tokens,
  getCNCStatusColor,
  getEmergencyStopSizeStyles,
  getEmergencyStopStateStyles,
  getEmergencyStopBaseStyles,
} from '@whttlr/ui-core';

// Simple className utility
const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface EmergencyStopProps {
  onStop: () => void | Promise<void>
  onReset?: () => void
  isEmergencyStopped?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showWarning?: boolean
  confirmationRequired?: boolean
  className?: string
}

export const EmergencyStop: React.FC<EmergencyStopProps> = ({
  onStop,
  onReset,
  isEmergencyStopped = false,
  size = 'lg',
  showWarning = true,
  confirmationRequired = false,
  className,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const sizeConfig = {
    sm: {
      button: getEmergencyStopSizeStyles('sm'),
      icon: { height: tokens.spacing.lg, width: tokens.spacing.lg },
      text: { fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs },
      ring: '3px',
      activeScale: 0.95,
    },
    md: {
      button: getEmergencyStopSizeStyles('default'),
      icon: { height: tokens.spacing.xl, width: tokens.spacing.xl },
      text: { fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm },
      ring: '4px',
      activeScale: 0.93,
    },
    lg: {
      button: getEmergencyStopSizeStyles('lg'),
      icon: { height: '2.5rem', width: '2.5rem' },
      text: { fontSize: Array.isArray(tokens.text.size.base) ? tokens.text.size.base[0] : tokens.text.size.base },
      ring: '5px',
      activeScale: 0.90,
    },
    xl: {
      button: getEmergencyStopSizeStyles('xl'),
      icon: { height: '3rem', width: '3rem' },
      text: { fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg },
      ring: '6px',
      activeScale: 0.88,
    },
  };

  const config = sizeConfig[size];

  const handleStop = async () => {
    if (confirmationRequired && !showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsProcessing(true);
    setIsPressed(true);

    try {
      await onStop();
    } finally {
      setIsProcessing(false);
      setShowConfirmation(false);
    }
  };

  const handleReset = () => {
    setIsPressed(false);
    onReset?.();
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const warningContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: size === 'xl' ? '-3rem' : size === 'lg' ? '-2.75rem' : size === 'md' ? '-2.5rem' : '-2.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const warningContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    color: getCNCStatusColor('danger'),
  };

  const warningTextStyle: React.CSSProperties = {
    fontWeight: 600,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 1.2,
    ...config.text,
  };

  const buttonStyle: React.CSSProperties = {
    ...getEmergencyStopBaseStyles(),
    ...config.button,
    ...getEmergencyStopStateStyles(
      isEmergencyStopped ? 'stopped' : isPressed ? 'pressed' : 'normal'
    ),
    cursor: isEmergencyStopped || isProcessing ? 'not-allowed' : 'pointer',
    boxShadow: `0 0 0 ${config.ring} ${isEmergencyStopped ? '#7f1d1d' : isPressed ? '#991b1b' : '#b91c1c'}, ${getEmergencyStopStateStyles(isEmergencyStopped ? 'stopped' : isPressed ? 'pressed' : 'normal').boxShadow}`,
  };

  const buttonInnerShadowStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)',
  };

  const iconStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    ...config.icon,
  };

  const processingOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const processingSpinnerStyle: React.CSSProperties = {
    width: '75%',
    height: '75%',
    borderRadius: '50%',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
  };

  const stopIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: size === 'xl' ? '-3rem' : size === 'lg' ? '-2.75rem' : size === 'md' ? '-2.5rem' : '-2.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const stopBadgeStyle: React.CSSProperties = {
    backgroundColor: `${getCNCStatusColor('danger')}1A`, // 10% opacity
    color: '#991b1b',
    padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.full,
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    fontWeight: tokens.text.weight.semibold,
    whiteSpace: 'nowrap',
  };

  const resetButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: size === 'xl' ? '-4rem' : size === 'lg' ? '-3.5rem' : size === 'md' ? '-3.25rem' : '-3rem',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: getCNCStatusColor('success'),
    color: tokens.colors.text.primary,
    padding: tokens.spacing.xs,
    borderRadius: '50%',
    boxShadow: tokens.shadows.md,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  const confirmationDialogStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    marginTop: tokens.spacing.md,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: tokens.colors.bg.primary,
    borderRadius: tokens.radius.md,
    boxShadow: tokens.shadows.xl,
    padding: tokens.spacing.md,
    border: `1px solid ${getCNCStatusColor('danger')}40`,
    zIndex: 50,
  };

  const confirmationTextStyle: React.CSSProperties = {
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    fontWeight: tokens.text.weight.medium,
    marginBottom: tokens.spacing.sm,
    whiteSpace: 'nowrap',
    color: tokens.colors.text.primary,
  };

  const confirmationButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.xs,
  };

  const confirmButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
    backgroundColor: getCNCStatusColor('danger'),
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.sm,
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    fontWeight: tokens.text.weight.medium,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  const cancelButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
    backgroundColor: tokens.colors.bg.secondary,
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.sm,
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
    fontWeight: tokens.text.weight.medium,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  return (
    <div style={{ ...containerStyle, ...className as React.CSSProperties }}>
      {/* Warning text */}
      {showWarning && !isEmergencyStopped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={warningContainerStyle}
        >
          <div style={warningContentStyle}>
            <AlertTriangle style={{ height: '1rem', width: '1rem' }} />
            <div style={warningTextStyle}>
              <div>Emergency</div>
              <div>Stop</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main button */}
      <motion.button
        whileTap={{ scale: config.activeScale }}
        onClick={handleStop}
        disabled={isEmergencyStopped || isProcessing}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!isEmergencyStopped && !isProcessing) {
            e.currentTarget.style.backgroundColor = '#b91c1c';
          }
        }}
        onMouseLeave={(e) => {
          if (!isEmergencyStopped && !isProcessing) {
            e.currentTarget.style.backgroundColor = isPressed ? '#b91c1c' : getCNCStatusColor('danger');
          }
        }}
      >
        {/* Button inner shadow for 3D effect */}
        <div style={buttonInnerShadowStyle} />

        {/* Icon */}
        <XOctagon style={iconStyle} />

        {/* Processing spinner */}
        {isProcessing && (
          <div style={processingOverlayStyle}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={processingSpinnerStyle}
            />
          </div>
        )}
      </motion.button>

      {/* Stop indicator */}
      {isEmergencyStopped && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={stopIndicatorStyle}
        >
          <div style={stopBadgeStyle}>
            STOPPED - Press Reset
          </div>
        </motion.div>
      )}

      {/* Reset button */}
      {isEmergencyStopped && onReset && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleReset}
          style={resetButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#15803d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = getCNCStatusColor('success');
          }}
        >
          <RotateCcw style={{ height: '1.25rem', width: '1.25rem' }} />
        </motion.button>
      )}

      {/* Confirmation dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={confirmationDialogStyle}
          >
            <p style={confirmationTextStyle}>
              Confirm Emergency Stop?
            </p>
            <div style={confirmationButtonsStyle}>
              <button
                onClick={handleStop}
                style={confirmButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = getCNCStatusColor('danger');
                }}
              >
                Stop Now
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                style={cancelButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.colors.bg.secondary;
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface CompactEmergencyStopProps {
  onStop: () => void
  isEmergencyStopped?: boolean
  className?: string
}

export const CompactEmergencyStop: React.FC<CompactEmergencyStopProps> = ({
  onStop,
  isEmergencyStopped = false,
  className,
}) => {
  const compactButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    fontWeight: tokens.text.weight.semibold,
    color: tokens.colors.text.primary,
    boxShadow: tokens.shadows.md,
    transition: tokens.transition.default,
    border: 'none',
    cursor: isEmergencyStopped ? 'not-allowed' : 'pointer',
    backgroundColor: isEmergencyStopped ? '#991b1b' : getCNCStatusColor('danger'),
    opacity: isEmergencyStopped ? 0.75 : 1,
    outline: 'none',
  };

  const textStyle: React.CSSProperties = {
    textTransform: 'uppercase',
    fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onStop}
      disabled={isEmergencyStopped}
      style={{ ...compactButtonStyle, ...className as React.CSSProperties }}
      onMouseEnter={(e) => {
        if (!isEmergencyStopped) {
          e.currentTarget.style.backgroundColor = '#b91c1c';
        }
      }}
      onMouseLeave={(e) => {
        if (!isEmergencyStopped) {
          e.currentTarget.style.backgroundColor = getCNCStatusColor('danger');
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.5), 0 0 0 2px rgba(239, 68, 68, 0.5)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <XOctagon style={{ height: '1.25rem', width: '1.25rem' }} />
      <span style={textStyle}>
        {isEmergencyStopped ? 'Stopped' : 'E-Stop'}
      </span>
    </motion.button>
  );
};

export interface SafetyControlPanelProps {
  onEmergencyStop: () => void
  onPause?: () => void
  onResume?: () => void
  isPaused?: boolean
  isEmergencyStopped?: boolean
  className?: string
}

export const SafetyControlPanel: React.FC<SafetyControlPanelProps> = ({
  onEmergencyStop,
  onPause,
  onResume,
  isPaused = false,
  isEmergencyStopped = false,
  className,
}) => {
  const panelStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.primary,
    border: `1px solid ${tokens.colors.border.primary}`,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.lg,
    boxShadow: tokens.shadows.sm,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: Array.isArray(tokens.text.size.lg) ? tokens.text.size.lg[0] : tokens.text.size.lg,
    fontWeight: tokens.text.weight.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
    textAlign: 'center',
    margin: 0,
  };

  const controlsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing.md,
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.xs,
  };

  const pauseButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.xs} ${tokens.spacing.lg}`,
    backgroundColor: getCNCStatusColor('warning'),
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.sm,
    fontWeight: tokens.text.weight.medium,
    boxShadow: tokens.shadows.sm,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  const resumeButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.xs} ${tokens.spacing.lg}`,
    backgroundColor: getCNCStatusColor('success'),
    color: tokens.colors.text.primary,
    borderRadius: tokens.radius.sm,
    fontWeight: tokens.text.weight.medium,
    boxShadow: tokens.shadows.sm,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  return (
    <div style={{ ...panelStyle, ...className as React.CSSProperties }}>
      <h3 style={titleStyle}>
        Safety Controls
      </h3>

      <div style={controlsContainerStyle}>
        <EmergencyStop
          onStop={onEmergencyStop}
          isEmergencyStopped={isEmergencyStopped}
          size="sm"
        />

        {(onPause || onResume) && (
          <div style={buttonGroupStyle}>
            {onPause && !isPaused && !isEmergencyStopped && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onPause}
                style={pauseButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b45309';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = getCNCStatusColor('warning');
                }}
              >
                Pause
              </motion.button>
            )}

            {onResume && isPaused && !isEmergencyStopped && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onResume}
                style={resumeButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = getCNCStatusColor('success');
                }}
              >
                Resume
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};