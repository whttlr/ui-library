/**
 * Mobile Testing Utilities
 * 
 * Comprehensive testing utilities for mobile and touch-optimized components.
 * Includes touch event simulation, responsive design testing, and mobile-specific
 * test helpers.
 */

import { fireEvent } from '@testing-library/react';

// Touch event simulation utilities
export class TouchEventSimulator {
  static createTouchEvent(
    type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
    touches: Array<{ clientX: number; clientY: number; identifier?: number }> = []
  ): TouchEvent {
    const touchList = touches.map((touch, index) => ({
      identifier: touch.identifier ?? index,
      target: document.body,
      clientX: touch.clientX,
      clientY: touch.clientY,
      pageX: touch.clientX,
      pageY: touch.clientY,
      screenX: touch.clientX,
      screenY: touch.clientY,
      radiusX: 20,
      radiusY: 20,
      rotationAngle: 0,
      force: 1,
    }));

    return new TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      touches: touchList as any,
      targetTouches: touchList as any,
      changedTouches: touchList as any,
    });
  }

  static tap(element: Element, coordinates = { x: 0, y: 0 }): void {
    const rect = element.getBoundingClientRect();
    const x = rect.left + (coordinates.x || rect.width / 2);
    const y = rect.top + (coordinates.y || rect.height / 2);

    fireEvent(element, this.createTouchEvent('touchstart', [{ clientX: x, clientY: y }]));
    fireEvent(element, this.createTouchEvent('touchend', []));
  }

  static longPress(element: Element, duration = 500, coordinates = { x: 0, y: 0 }): Promise<void> {
    return new Promise((resolve) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + (coordinates.x || rect.width / 2);
      const y = rect.top + (coordinates.y || rect.height / 2);

      fireEvent(element, this.createTouchEvent('touchstart', [{ clientX: x, clientY: y }]));

      setTimeout(() => {
        fireEvent(element, this.createTouchEvent('touchend', []));
        resolve();
      }, duration);
    });
  }

  static swipe(
    element: Element,
    startCoords: { x: number; y: number },
    endCoords: { x: number; y: number },
    duration = 300
  ): Promise<void> {
    return new Promise((resolve) => {
      const rect = element.getBoundingClientRect();
      const startX = rect.left + startCoords.x;
      const startY = rect.top + startCoords.y;
      const endX = rect.left + endCoords.x;
      const endY = rect.top + endCoords.y;

      fireEvent(element, this.createTouchEvent('touchstart', [{ clientX: startX, clientY: startY }]));

      // Simulate movement
      const steps = 10;
      const stepX = (endX - startX) / steps;
      const stepY = (endY - startY) / steps;

      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          const currentX = startX + (stepX * i);
          const currentY = startY + (stepY * i);
          fireEvent(element, this.createTouchEvent('touchmove', [{ clientX: currentX, clientY: currentY }]));
        }, (duration / steps) * i);
      }

      setTimeout(() => {
        fireEvent(element, this.createTouchEvent('touchend', []));
        resolve();
      }, duration);
    });
  }

  static pinch(
    element: Element,
    startDistance: number,
    endDistance: number,
    duration = 300
  ): Promise<void> {
    return new Promise((resolve) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const getCoords = (distance: number) => [
        { clientX: centerX - distance / 2, clientY: centerY },
        { clientX: centerX + distance / 2, clientY: centerY },
      ];

      fireEvent(element, this.createTouchEvent('touchstart', getCoords(startDistance)));

      const steps = 10;
      const stepDistance = (endDistance - startDistance) / steps;

      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          const currentDistance = startDistance + (stepDistance * i);
          fireEvent(element, this.createTouchEvent('touchmove', getCoords(currentDistance)));
        }, (duration / steps) * i);
      }

      setTimeout(() => {
        fireEvent(element, this.createTouchEvent('touchend', []));
        resolve();
      }, duration);
    });
  }
}