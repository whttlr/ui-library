/**
 * Adapter Registry System
 * 
 * Central registry for managing component adapters across different UI libraries
 */

import React from 'react';
import { AdapterComponent, AdapterProps } from '../types/adapter';

export type AdapterLibrary = 'ant-design' | 'headless-ui' | 'custom';

export interface AdapterDefinition<T extends AdapterProps = AdapterProps> {
  name: string;
  adapters: Partial<Record<AdapterLibrary, React.ComponentType<T>>>;
  defaultAdapter?: AdapterLibrary;
  fallbackComponent?: React.ComponentType<T>;
}

export class AdapterRegistry {
  private static instance: AdapterRegistry;
  private adapters = new Map<string, AdapterDefinition>();
  private globalDefaultAdapter: AdapterLibrary = 'ant-design';

  static getInstance(): AdapterRegistry {
    if (!AdapterRegistry.instance) {
      AdapterRegistry.instance = new AdapterRegistry();
    }
    return AdapterRegistry.instance;
  }

  /**
   * Register a component adapter
   */
  register<T extends AdapterProps>(definition: AdapterDefinition<T>): void {
    this.adapters.set(definition.name, definition);
  }

  /**
   * Get registered adapter component
   */
  get<T extends AdapterProps>(
    name: string,
    preferredLibrary?: AdapterLibrary
  ): React.ComponentType<T> | null {
    const definition = this.adapters.get(name);
    if (!definition) {
      console.warn(`Adapter "${name}" not found in registry`);
      return null;
    }

    const library = preferredLibrary || definition.defaultAdapter || this.globalDefaultAdapter;
    const Component = definition.adapters[library];
    
    if (Component) {
      return Component as React.ComponentType<T>;
    }

    // Try fallback to any available adapter
    const availableAdapters = Object.values(definition.adapters).filter(Boolean);
    if (availableAdapters.length > 0) {
      console.warn(`Adapter "${library}" not available for "${name}". Using fallback.`);
      return availableAdapters[0] as React.ComponentType<T>;
    }

    // Use fallback component if provided
    if (definition.fallbackComponent) {
      console.warn(`No adapters available for "${name}". Using fallback component.`);
      return definition.fallbackComponent as React.ComponentType<T>;
    }

    console.error(`No adapters or fallback available for "${name}"`);
    return null;
  }

  /**
   * Create an adapter component from registry
   */
  createComponent<T extends AdapterProps>(
    name: string,
    defaultLibrary?: AdapterLibrary
  ): AdapterComponent<T> {
    const AdapterComponent: AdapterComponent<T> = (props) => {
      const { adapter, ...componentProps } = props;
      const library = adapter || defaultLibrary || this.globalDefaultAdapter;
      
      const Component = this.get<T>(name, library);
      
      if (!Component) {
        return React.createElement('div', {
          style: { 
            border: '2px dashed #ff6b6b', 
            padding: '8px', 
            color: '#ff6b6b',
            backgroundColor: '#ffe0e0'
          }
        }, `Missing adapter: ${name} (${library})`);
      }

      return React.createElement(Component, componentProps as T);
    };

    AdapterComponent.displayName = `Adapter(${name})`;
    return AdapterComponent;
  }

  /**
   * Set global default adapter library
   */
  setDefaultAdapter(library: AdapterLibrary): void {
    this.globalDefaultAdapter = library;
  }

  /**
   * Get all registered adapter names
   */
  getRegisteredAdapters(): string[] {
    return Array.from(this.adapters.keys());
  }

  /**
   * Check if adapter is available for a library
   */
  isAdapterAvailable(name: string, library: AdapterLibrary): boolean {
    const definition = this.adapters.get(name);
    return definition ? !!definition.adapters[library] : false;
  }

  /**
   * Get available libraries for an adapter
   */
  getAvailableLibraries(name: string): AdapterLibrary[] {
    const definition = this.adapters.get(name);
    if (!definition) return [];
    
    return Object.keys(definition.adapters) as AdapterLibrary[];
  }

  /**
   * Clear all registered adapters
   */
  clear(): void {
    this.adapters.clear();
  }
}

// Export singleton instance
export const adapterRegistry = AdapterRegistry.getInstance();