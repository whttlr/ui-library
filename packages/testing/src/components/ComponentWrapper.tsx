/**
 * Component Testing Wrapper
 * 
 * Generic wrapper for testing components with various configurations.
 */

import React from 'react';

// ============================================================================
// COMPONENT TEST HELPERS
// ============================================================================

export const componentHelpers = {
  // Wait for animations to complete
  waitForAnimation: (duration: number = 500) => {
    return new Promise(resolve => setTimeout(resolve, duration));
  },
  
  // Wait for async operations
  waitForAsync: async (fn: () => Promise<any>, timeout: number = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        await fn();
        return;
      } catch (e) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    throw new Error(`Async operation timed out after ${timeout}ms`);
  },
  
  // Simulate user interactions
  simulateTyping: async (element: HTMLElement, text: string, delay: number = 50) => {
    const { fireEvent } = await import('@testing-library/react');
    
    for (let i = 0; i < text.length; i++) {
      const currentText = text.substring(0, i + 1);
      fireEvent.change(element, { target: { value: currentText } });
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  },
  
  // Simulate drag and drop
  simulateDragDrop: async (source: HTMLElement, target: HTMLElement) => {
    const { fireEvent } = await import('@testing-library/react');
    
    fireEvent.dragStart(source);
    fireEvent.dragEnter(target);
    fireEvent.dragOver(target);
    fireEvent.drop(target);
    fireEvent.dragEnd(source);
  },
  
  // Simulate file upload
  simulateFileUpload: async (input: HTMLElement, file: File) => {
    const { fireEvent } = await import('@testing-library/react');
    
    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });
    
    fireEvent.change(input);
  },
};

// ============================================================================
// ASSERTION HELPERS
// ============================================================================

export const assertions = {
  // Assert element has specific classes
  expectElementClasses: (element: HTMLElement, classes: string[]) => {
    classes.forEach(className => {
      expect(element).toHaveClass(className);
    });
  },
  
  // Assert element has specific attributes
  expectElementAttributes: (element: HTMLElement, attributes: Record<string, string>) => {
    Object.entries(attributes).forEach(([attr, value]) => {
      expect(element).toHaveAttribute(attr, value);
    });
  },
  
  // Assert async state changes
  expectEventuallyToHave: async (fn: () => any, expected: any, timeout: number = 5000) => {
    const start = Date.now();
    
    while (Date.now() - start < timeout) {
      try {
        const actual = fn();
        expect(actual).toEqual(expected);
        return;
      } catch (e) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    throw new Error(`Expected state not reached within ${timeout}ms`);
  },
};

// ============================================================================
// PERFORMANCE TESTING HELPERS
// ============================================================================

export const performanceHelpers = {
  // Measure render time
  measureRenderTime: async (renderFn: () => any): Promise<{ result: any; duration: number }> => {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    return {
      result,
      duration: end - start,
    };
  },
  
  // Measure memory usage
  measureMemoryUsage: <T>(fn: () => T): { result: T; memoryUsed: number } => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const result = fn();
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    return {
      result,
      memoryUsed: finalMemory - initialMemory,
    };
  },
  
  // Stress test with rapid operations
  stressTest: async (operation: () => void, iterations: number = 1000, maxDuration: number = 5000) => {
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
  },
};