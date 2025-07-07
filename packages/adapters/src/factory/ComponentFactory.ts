/**
 * Component Factory System
 * 
 * Factory for creating and managing adapter components
 */

import React from 'react';
import { AdapterRegistry, AdapterLibrary, AdapterDefinition } from './AdapterRegistry';
import { AdapterComponent, AdapterProps } from '../types/adapter';

export class ComponentFactory {
  private registry: AdapterRegistry;

  constructor(registry?: AdapterRegistry) {
    this.registry = registry || AdapterRegistry.getInstance();
  }

  /**
   * Create an adapter component with multiple implementations
   */
  createAdapter<T extends AdapterProps>(
    name: string,
    adapters: Partial<Record<AdapterLibrary, React.ComponentType<T>>>,
    options?: {
      defaultAdapter?: AdapterLibrary;
      fallbackComponent?: React.ComponentType<T>;
    }
  ): AdapterComponent<T> {
    // Register the adapter definition
    const definition: AdapterDefinition<T> = {
      name,
      adapters,
      defaultAdapter: options?.defaultAdapter,
      fallbackComponent: options?.fallbackComponent,
    };

    this.registry.register(definition);

    // Return the adapter component
    return this.registry.createComponent<T>(name, options?.defaultAdapter);
  }

  /**
   * Create a lazy-loaded adapter component
   */
  createLazyAdapter<T extends AdapterProps>(
    name: string,
    adapters: Partial<Record<AdapterLibrary, () => Promise<{ default: React.ComponentType<T> }>>>,
    options?: {
      defaultAdapter?: AdapterLibrary;
      fallbackComponent?: React.ComponentType<T>;
      loading?: React.ComponentType;
    }
  ): AdapterComponent<T> {
    const LazyAdapterComponent: AdapterComponent<T> = (props) => {
      const { adapter, ...componentProps } = props;
      const library = adapter || options?.defaultAdapter || 'ant-design';
      
      const lazyLoader = adapters[library];
      
      if (!lazyLoader) {
        console.warn(`Lazy adapter "${library}" not found for "${name}"`);
        if (options?.fallbackComponent) {
          return React.createElement(options.fallbackComponent, componentProps as T);
        }
        return React.createElement('div', {}, `Missing lazy adapter: ${name} (${library})`);
      }

      const LazyComponent = React.lazy(lazyLoader);
      
      return React.createElement(
        React.Suspense,
        { 
          fallback: options?.loading 
            ? React.createElement(options.loading) 
            : React.createElement('div', {}, 'Loading...') 
        },
        React.createElement(LazyComponent, componentProps as T)
      );
    };

    LazyAdapterComponent.displayName = `LazyAdapter(${name})`;
    return LazyAdapterComponent;
  }

  /**
   * Create adapter with runtime library detection
   */
  createSmartAdapter<T extends AdapterProps>(
    name: string,
    adapters: Partial<Record<AdapterLibrary, React.ComponentType<T>>>,
    detector: () => AdapterLibrary
  ): AdapterComponent<T> {
    const SmartAdapterComponent: AdapterComponent<T> = (props) => {
      const { adapter, ...componentProps } = props;
      const detectedLibrary = adapter || detector();
      
      const Component = adapters[detectedLibrary];
      
      if (!Component) {
        console.warn(`Smart adapter "${detectedLibrary}" not found for "${name}"`);
        // Try first available adapter
        const availableAdapters = Object.values(adapters).filter(Boolean);
        if (availableAdapters.length > 0) {
          return React.createElement(availableAdapters[0], componentProps as T);
        }
        return React.createElement('div', {}, `Missing smart adapter: ${name}`);
      }

      return React.createElement(Component, componentProps as T);
    };

    SmartAdapterComponent.displayName = `SmartAdapter(${name})`;
    return SmartAdapterComponent;
  }

  /**
   * Create adapter with theme integration
   */
  createThemedAdapter<T extends AdapterProps>(
    name: string,
    adapters: Partial<Record<AdapterLibrary, React.ComponentType<T>>>,
    themeMapper?: (library: AdapterLibrary, props: T) => T
  ): AdapterComponent<T> {
    const ThemedAdapterComponent: AdapterComponent<T> = (props) => {
      const { adapter, ...componentProps } = props;
      const library = adapter || 'ant-design';
      
      const Component = adapters[library];
      
      if (!Component) {
        console.warn(`Themed adapter "${library}" not found for "${name}"`);
        return React.createElement('div', {}, `Missing themed adapter: ${name}`);
      }

      const themedProps = themeMapper 
        ? themeMapper(library, props as T)
        : componentProps as T;

      return React.createElement(Component, themedProps);
    };

    ThemedAdapterComponent.displayName = `ThemedAdapter(${name})`;
    return ThemedAdapterComponent;
  }

  /**
   * Get the underlying registry
   */
  getRegistry(): AdapterRegistry {
    return this.registry;
  }
}

// Export singleton instance
export const componentFactory = new ComponentFactory();