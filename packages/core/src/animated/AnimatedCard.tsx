/**
 * Animated Card Component
 * Card component with hover, click, and glow animations
 */

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../utils';
import { Card } from 'antd';
import {
  getAnimatedCardShadowStyles,
  getAnimatedCardGlowKeyframes,
  getAnimatedCardContainerStyles,
} from '../utils/tokens';

export interface AnimatedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'click' | 'glow';
  delay?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(({ 
  children,
  variant = 'default',
  delay = 0,
  duration = 0.3,
  className,
  onClick,
  disabled = false,
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const cardVariants: Variants = {
    initial: {
      scale: 1,
      boxShadow: getAnimatedCardShadowStyles('initial', false),
    },
    hover: {
      scale: variant === 'hover' ? 1.02 : 1,
      boxShadow: getAnimatedCardShadowStyles('hover', variant === 'hover'),
      transition: { duration },
    },
    tap: {
      scale: variant === 'click' ? 0.98 : 1,
      transition: { duration: 0.1 },
    },
    glow: {
      boxShadow: getAnimatedCardGlowKeyframes(),
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop'
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={[
        isHovered && !disabled ? 'hover' : 'initial',
        variant === 'glow' ? 'glow' : ''
      ].filter(Boolean)}
      whileTap={!disabled ? 'tap' : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!disabled ? onClick : undefined}
      className={cn(className)}
      style={{
        animationDelay: `${delay}s`,
        ...getAnimatedCardContainerStyles(disabled),
      }}
    >
      <Card className="h-full">
        {children}
      </Card>
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;