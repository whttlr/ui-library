/**
 * Animated Components
 * 
 * Animation-enhanced components with framer-motion integration
 */

// Core Animated Components (default exports)
export { default as AnimatedCard } from './AnimatedCard';
export { default as AnimatedProgress } from './AnimatedProgress';
export { default as AnimatedStatus } from './AnimatedStatus';
export { default as AnimatedList } from './AnimatedList';
export { default as FloatingActionButton } from './FloatingActionButton';
export { default as ScrollReveal } from './ScrollReveal';
export { default as PageTransition } from './PageTransition';

// Animation Variants and Utilities
export * from './variants';

// Re-export component types (avoid duplicate exports by being selective)
export type { AnimatedCardProps } from './AnimatedCard';
export type { AnimatedProgressProps } from './AnimatedProgress';
export type { AnimatedStatusProps } from './AnimatedStatus';
export type { AnimatedListProps } from './AnimatedList';
export type { FloatingActionButtonProps } from './FloatingActionButton';
export type { ScrollRevealProps } from './ScrollReveal';
export type { PageTransitionProps } from './PageTransition';