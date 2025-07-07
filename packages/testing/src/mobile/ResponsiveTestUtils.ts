/**
 * Responsive Design Testing Utilities
 * 
 * Utilities for testing responsive behavior and viewport changes.
 */

import { fireEvent } from '@testing-library/react';

// Mock responsive context for testing
export interface MockResponsiveContext {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
  isOnline: boolean;
  dimensions: {
    width: number;
    height: number;
  };
}

// Default mobile test environment
export const defaultMobileContext: MockResponsiveContext = {
  breakpoint: 'sm',
  orientation: 'portrait',
  isTouchDevice: true,
  isOnline: true,
  dimensions: {
    width: 375,
    height: 667,
  },
};

// Tablet test environment
export const tabletContext: MockResponsiveContext = {
  breakpoint: 'md',
  orientation: 'landscape',
  isTouchDevice: true,
  isOnline: true,
  dimensions: {
    width: 1024,
    height: 768,
  },
};

// Desktop test environment
export const desktopContext: MockResponsiveContext = {
  breakpoint: 'lg',
  orientation: 'landscape',
  isTouchDevice: false,
  isOnline: true,
  dimensions: {
    width: 1440,
    height: 900,
  },
};

// Offline test environment
export const offlineContext: MockResponsiveContext = {
  ...defaultMobileContext,
  isOnline: false,
};

// Responsive design testing utilities
export class ResponsiveTestUtils {
  static setViewportSize(width: number, height: number): void {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });

    // Trigger resize event
    fireEvent(window, new Event('resize'));
  }

  static setOrientation(orientation: 'portrait' | 'landscape'): void {
    const angle = orientation === 'portrait' ? 0 : 90;
    
    Object.defineProperty(screen, 'orientation', {
      writable: true,
      configurable: true,
      value: {
        angle,
        type: orientation === 'portrait' ? 'portrait-primary' : 'landscape-primary',
      },
    });

    // Trigger orientationchange event
    fireEvent(window, new Event('orientationchange'));
  }

  static mockTouchDevice(isTouch: boolean = true): void {
    Object.defineProperty(window, 'ontouchstart', {
      writable: true,
      configurable: true,
      value: isTouch ? {} : undefined,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: isTouch ? 10 : 0,
    });
  }

  static mockNetworkStatus(isOnline: boolean = true): void {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: isOnline,
    });

    fireEvent(window, new Event(isOnline ? 'online' : 'offline'));
  }

  static setupMobileEnvironment(context: MockResponsiveContext = defaultMobileContext): void {
    this.setViewportSize(context.dimensions.width, context.dimensions.height);
    this.setOrientation(context.orientation);
    this.mockTouchDevice(context.isTouchDevice);
    this.mockNetworkStatus(context.isOnline);
  }
}