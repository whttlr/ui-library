/**
 * Animated Status Component
 * Status indicator with pulse animation and icon support
 */

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../utils';
import { tokens } from '../utils/tokens';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  CloseOutlined,
} from '@ant-design/icons';

export interface AnimatedStatusProps {
  status: 'connected' | 'disconnected' | 'idle' | 'running' | 'error' | 'warning';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  showSpinner?: boolean; // Show spinner instead of pulsing dot for 'running' status
  className?: string;
}

export const AnimatedStatus: React.FC<AnimatedStatusProps> = ({
  status,
  label,
  size = 'md',
  showPulse = true,
  showSpinner = false,
  className,
}) => {
  const statusConfig = {
    connected: {
      color: 'hsl(142, 76%, 36%)',
      icon: CheckCircleOutlined,
      text: 'Connected',
      iconColor: 'hsl(142, 76%, 36%)'
    },
    disconnected: {
      color: 'hsl(0, 84%, 60%)',
      icon: CloseOutlined,
      text: 'Disconnected',
      iconColor: 'hsl(0, 84%, 60%)'
    },
    idle: {
      color: 'hsl(38, 92%, 50%)',
      icon: ExclamationCircleOutlined,
      text: 'Idle',
      iconColor: 'hsl(38, 92%, 50%)'
    },
    running: {
      color: tokens.colors.primary.main,
      icon: LoadingOutlined,
      text: 'Running',
      iconColor: tokens.colors.primary.main
    },
    error: {
      color: 'hsl(0, 84%, 50%)',
      icon: ExclamationCircleOutlined,
      text: 'Error',
      iconColor: 'hsl(0, 84%, 50%)'
    },
    warning: {
      color: 'hsl(38, 92%, 40%)',
      icon: ExclamationCircleOutlined,
      text: 'Warning',
      iconColor: 'hsl(38, 92%, 40%)'
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeStyles = {
    sm: { width: '6px', height: '6px' },
    md: { width: '8px', height: '8px' },
    lg: { width: '10px', height: '10px' },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    static: {}
  };

  return (
    <motion.div
      className={cn(className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 10px',
        borderRadius: '9999px',
        border: `1px solid ${config.color}`,
        backgroundColor: 'transparent',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Show spinner on the left if showSpinner is true and status is running */}
      {status === 'running' && showSpinner ? (
        <motion.div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'center center',
            lineHeight: 0,
            color: config.iconColor,
            fontSize: '0.75rem',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Icon style={{ color: config.iconColor, fontSize: '0.75rem' }} />
        </motion.div>
      ) : (
        /* Otherwise show the pulsing dot */
        <div style={{ position: 'relative' }}>
          <motion.div
            style={{
              borderRadius: '9999px',
              backgroundColor: config.color,
              ...sizeStyles[size],
            }}
            variants={pulseVariants}
            animate={showPulse && (status === 'running' || status === 'connected') ? 'pulse' : 'static'}
          />
          {showPulse && (status === 'running' || status === 'connected') && (
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '9999px',
                backgroundColor: config.color,
                opacity: 0.2,
              }}
              animate={{
                scale: [1, 2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </div>
      )}

      <span style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        color: config.color,
      }}>
        {label || config.text}
      </span>
    </motion.div>
  );
};

export default AnimatedStatus;