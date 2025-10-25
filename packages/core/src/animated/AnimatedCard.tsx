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
  getAnimatedCardContainerStyles,
  tokens,
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

  // For glow variant, use CSS animation instead of Framer Motion
  if (variant === 'glow') {
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          animationDelay: `${delay}s`,
          animation: 'glow-pulse 2s ease-in-out infinite',
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          ...getAnimatedCardContainerStyles(disabled),
        }}
      >
        <style>
          {`
            @keyframes glow-pulse {
              0%, 100% {
                box-shadow: 0 0 20px 5px hsla(262, 83%, 58%, 0.8);
              }
              50% {
                box-shadow: 0 0 30px 10px hsla(262, 83%, 58%, 0.4);
              }
            }
          `}
        </style>
        <Card
          className="h-full"
          style={{
            backgroundColor: tokens.colors.bg.secondary,
            border: 'none',
            color: tokens.colors.text.primary,
          }}
        >
          {children}
        </Card>
      </div>
    );
  }

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
  };

  // Use React.createElement to avoid JSX transform issues with motion.div
  return React.createElement(
    motion.div,
    {
      ref,
      variants: cardVariants,
      initial: "initial",
      animate: isHovered && !disabled ? 'hover' : 'initial',
      whileTap: !disabled ? 'tap' : undefined,
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      onClick: !disabled ? onClick : undefined,
      className: cn(className),
      style: {
        animationDelay: `${delay}s`,
        ...getAnimatedCardContainerStyles(disabled),
      },
    },
    React.createElement(
      Card,
      {
        className: "h-full",
        style: {
          backgroundColor: tokens.colors.bg.secondary,
          borderColor: tokens.colors.border.primary,
          color: tokens.colors.text.primary,
        },
      },
      children
    )
  );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;