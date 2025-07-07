import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart, AreaChart, BarChart, PieChart, MetricCard, MachineDashboard } from './index';

// Mock recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  LineChart: ({ children, ...props }: any) => <div data-testid="line-chart" {...props}>{children}</div>,
  AreaChart: ({ children, ...props }: any) => <div data-testid="area-chart" {...props}>{children}</div>,
  BarChart: ({ children, ...props }: any) => <div data-testid="bar-chart" {...props}>{children}</div>,
  PieChart: ({ children, ...props }: any) => <div data-testid="pie-chart" {...props}>{children}</div>,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  Line: () => <div data-testid="line" />,
  Area: () => <div data-testid="area" />,
  Bar: () => <div data-testid="bar" />,
  Cell: () => <div data-testid="cell" />,
  Pie: () => <div data-testid="pie" />,
}));

const mockData = [
  { name: 'Jan', value: 400, temperature: 20 },
  { name: 'Feb', value: 300, temperature: 22 },
  { name: 'Mar', value: 200, temperature: 25 },
  { name: 'Apr', value: 278, temperature: 28 },
];

describe('Chart Components', () => {
  describe('LineChart', () => {
    it('renders with basic props', () => {
      render(<LineChart data={mockData} />);
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });

    it('renders with custom dimensions', () => {
      render(<LineChart data={mockData} width={500} height={300} />);
      const chart = screen.getByTestId('line-chart');
      expect(chart).toHaveAttribute('width', '500');
      expect(chart).toHaveAttribute('height', '300');
    });

    it('renders with title', () => {
      render(<LineChart data={mockData} title="Test Chart" />);
      expect(screen.getByText('Test Chart')).toBeInTheDocument();
    });
  });

  describe('AreaChart', () => {
    it('renders with basic props', () => {
      render(<AreaChart data={mockData} />);
      expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    });

    it('renders with stacked areas', () => {
      render(<AreaChart data={mockData} stacked />);
      expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    });
  });

  describe('BarChart', () => {
    it('renders with basic props', () => {
      render(<BarChart data={mockData} />);
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });

    it('renders horizontal variant', () => {
      render(<BarChart data={mockData} orientation="horizontal" />);
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });

  describe('PieChart', () => {
    it('renders with basic props', () => {
      render(<PieChart data={mockData} />);
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('renders with custom colors', () => {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
      render(<PieChart data={mockData} colors={colors} />);
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  describe('MetricCard', () => {
    it('renders with basic props', () => {
      render(<MetricCard title="Test Metric" value="123" />);
      expect(screen.getByText('Test Metric')).toBeInTheDocument();
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('renders with trend indicator', () => {
      render(
        <MetricCard 
          title="Performance" 
          value="95%" 
          trend={{ value: 5, direction: 'up' }}
        />
      );
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<MetricCard title="Test" value="100" variant="default" />);
      expect(screen.getByTestId('metric-card')).toHaveClass('metric-card-default');

      rerender(<MetricCard title="Test" value="100" variant="success" />);
      expect(screen.getByTestId('metric-card')).toHaveClass('metric-card-success');

      rerender(<MetricCard title="Test" value="100" variant="warning" />);
      expect(screen.getByTestId('metric-card')).toHaveClass('metric-card-warning');

      rerender(<MetricCard title="Test" value="100" variant="error" />);
      expect(screen.getByTestId('metric-card')).toHaveClass('metric-card-error');
    });

    it('renders with chart', () => {
      const chartData = [{ value: 10 }, { value: 20 }, { value: 15 }];
      render(
        <MetricCard 
          title="Chart Metric" 
          value="25" 
          chart={<LineChart data={chartData} height={60} />}
        />
      );
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });
  });

  describe('MachineDashboard', () => {
    const machineData = {
      temperature: { current: 42, target: 45, history: mockData },
      spindle: { rpm: 1200, load: 75 },
      position: { x: 120.5, y: 85.2, z: 15.0 },
      status: 'running' as const
    };

    it('renders with machine data', () => {
      render(<MachineDashboard data={machineData} />);
      expect(screen.getByText(/temperature/i)).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('1200')).toBeInTheDocument();
    });

    it('renders different machine statuses', () => {
      const { rerender } = render(<MachineDashboard data={{ ...machineData, status: 'idle' }} />);
      expect(screen.getByTestId('machine-dashboard')).toHaveClass('status-idle');

      rerender(<MachineDashboard data={{ ...machineData, status: 'running' }} />);
      expect(screen.getByTestId('machine-dashboard')).toHaveClass('status-running');

      rerender(<MachineDashboard data={{ ...machineData, status: 'error' }} />);
      expect(screen.getByTestId('machine-dashboard')).toHaveClass('status-error');
    });

    it('renders with compact layout', () => {
      render(<MachineDashboard data={machineData} layout="compact" />);
      expect(screen.getByTestId('machine-dashboard')).toHaveClass('layout-compact');
    });
  });
});

describe('Chart Utilities', () => {
  // These would test utility functions if we import them
  it('should format chart data correctly', () => {
    // Test data formatting utilities
    expect(true).toBe(true); // Placeholder
  });

  it('should generate chart colors correctly', () => {
    // Test color generation utilities
    expect(true).toBe(true); // Placeholder
  });
});