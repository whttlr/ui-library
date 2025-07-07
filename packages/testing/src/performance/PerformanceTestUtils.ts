/**
 * Performance Testing Utilities
 * 
 * Utilities for measuring component performance, render times, and memory usage.
 */

import { RenderResult } from '@testing-library/react';

export class PerformanceTestUtils {
  static measureRenderTime<T>(renderFn: () => T): { result: T; duration: number } {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    
    return {
      result,
      duration: endTime - startTime,
    };
  }

  static async measureAsyncOperation<T>(operation: () => Promise<T>): Promise<{ result: T; duration: number }> {
    const startTime = performance.now();
    const result = await operation();
    const endTime = performance.now();
    
    return {
      result,
      duration: endTime - startTime,
    };
  }

  static measureMemoryUsage<T>(fn: () => T): { result: T; memoryUsed: number } {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const result = fn();
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    return {
      result,
      memoryUsed: finalMemory - initialMemory,
    };
  }

  static async stressTest(operation: () => void, iterations: number = 1000, maxDuration: number = 5000) {
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      operation();
      
      // Check timeout
      if (performance.now() - start > maxDuration) {
        throw new Error(`Stress test exceeded ${maxDuration}ms with ${i} iterations`);
      }
    }
    
    return {
      duration: performance.now() - start,
      iterationsCompleted: iterations,
    };
  }

  static mockSlowNetwork(): void {
    // Mock slow network conditions
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockImplementation((...args) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(originalFetch(...args));
        }, 1000); // 1 second delay
      });
    });
  }

  static restoreNetwork(): void {
    if (jest.isMockFunction(global.fetch)) {
      global.fetch.mockRestore();
    }
  }

  static measureComponentRenderPerformance<T extends RenderResult>(
    renderFn: () => T,
    iterations: number = 10
  ): {
    averageRenderTime: number;
    minRenderTime: number;
    maxRenderTime: number;
    totalTime: number;
    iterations: number;
  } {
    const renderTimes: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const { duration } = this.measureRenderTime(renderFn);
      renderTimes.push(duration);
    }
    
    const totalTime = renderTimes.reduce((sum, time) => sum + time, 0);
    const averageRenderTime = totalTime / iterations;
    const minRenderTime = Math.min(...renderTimes);
    const maxRenderTime = Math.max(...renderTimes);
    
    return {
      averageRenderTime,
      minRenderTime,
      maxRenderTime,
      totalTime,
      iterations,
    };
  }

  static createPerformanceObserver(callback: (entries: PerformanceEntry[]) => void): PerformanceObserver | null {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      return observer;
    }
    
    return null;
  }

  static markPerformance(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name);
    }
  }

  static measurePerformance(name: string, startMark: string, endMark: string): number {
    if (typeof performance !== 'undefined' && performance.measure) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, 'measure')[0];
      return measure ? measure.duration : 0;
    }
    
    return 0;
  }
}