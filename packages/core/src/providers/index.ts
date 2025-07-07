/**
 * UI Providers Public API
 * 
 * Exports React context providers for global UI state management
 */

// Configuration
export { defaultProviderConfig, getProviderConfig } from './config';
export type { ProviderConfig } from './config';

// Providers
export { default as ComponentProvider } from './ComponentProvider';

// Re-export from ComponentProvider
export * from './ComponentProvider';