/**
 * Floating Action Button Component
 * FAB with hover animations, badges, and positioning options
 */

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../utils';
import {
  getFABSizeStyles,
  getFABColorStyles,
  getFABPositionStyles,
  getFABShadowStyles,
  getFABBaseStyles,
  getFABBadgeStyles,
} from '../utils/tokens';

export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  tooltip?: string;
  disabled?: boolean;
  badge?: number;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  size = 'md',
  color = 'primary',
  tooltip,
  disabled = false,
  badge,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get design token-based styles
  const sizeStyles = getFABSizeStyles(size);
  const colorStyles = getFABColorStyles(color);
  const positionStyles = getFABPositionStyles(position);
  const baseStyles = getFABBaseStyles(disabled);
  const badgeStyles = getFABBadgeStyles();
  
  const fabVariants: Variants = {
    initial: {
      scale: 1,
      boxShadow: getFABShadowStyles(false),
    },
    hover: {
      scale: 1.1,
      boxShadow: getFABShadowStyles(true),
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  return (
    <motion.button
      className={cn(className)}
      style={{
        ...baseStyles,
        ...sizeStyles,
        ...colorStyles,
        ...positionStyles,
      }}
      variants={fabVariants}
      initial="initial"
      animate={isHovered && !disabled ? 'hover' : 'initial'}
      whileTap={!disabled ? 'tap' : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!disabled ? onClick : undefined}
      title={tooltip}
    >
      {icon}
      
      {badge && badge > 0 && (
        <motion.div
          style={badgeStyles}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {badge > 99 ? '99+' : badge}
        </motion.div>
      )}
    </motion.button>
  );
};

export default FloatingActionButton;