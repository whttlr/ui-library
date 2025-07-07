/**
 * UI Adapters Public API
 * 
 * Multi-library adapter system for switching between UI component implementations
 */

// Core Factory and Registry
export { AdapterRegistry, adapterRegistry } from './factory/AdapterRegistry';
export { ComponentFactory, componentFactory } from './factory/ComponentFactory';

// Types
export * from './types';

// Configuration
export { defaultAdapterConfig, getAdapterConfig } from './config';
export type { AdapterConfig } from './config';

// Adapter Implementations
export * from './ant-design';
export * from './custom';
export * from './headless-ui';

// Legacy Utilities (deprecated - use ComponentFactory instead)
export { createAdapterComponent } from './utils/adapter-factory';
export { useAdapterConfig } from './utils/adapter-hooks';
export type { AdapterComponent, AdapterProps } from './utils/adapter-types';