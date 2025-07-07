/**
 * Mock Data Generators for Testing
 * 
 * Provides reusable mock data for component testing.
 */

// Generate mock file
export const mockFile = (name: string = 'test.txt', content: string = 'Mock file content', type: string = 'text/plain'): File => {
  return new File([content], name, { type });
};

// Generate mock image file
export const mockImageFile = (name: string = 'test.png'): Promise<File> => {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#f0f0f0';
  context.fillRect(0, 0, 100, 100);
  context.fillStyle = '#333';
  context.font = '16px Arial';
  context.textAlign = 'center';
  context.fillText('Mock', 50, 50);
  
  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], name, { type: 'image/png' }));
    }, 'image/png');
  });
};

// Generate mock coordinates
export const mockPosition = (x: number = 0, y: number = 0, z: number = 0) => ({ x, y, z });

// Generate mock error
export const mockError = (message: string = 'Mock error', type: string = 'test', severity: 'low' | 'medium' | 'high' | 'critical' = 'high') => ({
  type,
  severity,
  message,
  timestamp: Date.now(),
});

// Generate mock performance metrics
export const mockPerformanceMetrics = () => ({
  cpu: {
    usage: Math.floor(Math.random() * 100),
    history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
  },
  memory: {
    used: Math.floor(Math.random() * 8192),
    total: 8192,
    history: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
  },
  network: {
    latency: Math.floor(Math.random() * 100) + 10,
    bandwidth: Math.floor(Math.random() * 100) + 50,
    packetsLost: Math.floor(Math.random() * 5),
  },
  rendering: {
    fps: Math.floor(Math.random() * 60) + 30,
    frameTime: Math.random() * 33 + 16,
    droppedFrames: Math.floor(Math.random() * 10),
  },
});

// Generate mock user data
export const mockUser = (overrides: Partial<any> = {}) => ({
  id: Math.random().toString(36).substr(2, 9),
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  preferences: {
    theme: 'dark',
    language: 'en',
  },
  ...overrides,
});

// Generate mock component props
export const mockComponentProps = (overrides: any = {}) => ({
  className: 'test-component',
  'data-testid': 'mock-component',
  ...overrides,
});

export default {
  mockFile,
  mockImageFile,
  mockPosition,
  mockError,
  mockPerformanceMetrics,
  mockUser,
  mockComponentProps,
};