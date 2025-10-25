/**
 * Animated Progress Component
 * Progress indicator with smooth animations and various styles
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { tokens } from '../utils/tokens';

export interface AnimatedProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'primary',
  animated = true,
  striped = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorStyles = {
    primary: {
      background: `linear-gradient(to right, ${tokens.colors.primary.main}, hsl(262, 83%, 48%))`,
    },
    success: {
      background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 26%))',
    },
    warning: {
      background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))',
    },
    danger: {
      background: 'linear-gradient(to right, hsl(0, 84%, 60%), hsl(0, 84%, 50%))',
    },
  };

  return (
    <div className={cn(className)} style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          {label && (
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: tokens.colors.text.primary
            }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span
              style={{
                fontSize: '0.875rem',
                fontFamily: tokens.text.family.mono.join(', '),
                color: tokens.colors.text.secondary
              }}
              key={percentage}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(displayValue)}%
            </motion.span>
          )}
        </div>
      )}

      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '9999px',
          backgroundColor: tokens.colors.bg.tertiary,
          height: '8px',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            borderRadius: '9999px',
            position: 'relative',
            ...colorStyles[color],
          }}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.1
          }}
        >
          {animated && (
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedProgress;