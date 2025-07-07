/**
 * Machine Dashboard Component
 * Comprehensive dashboard for CNC machine monitoring
 */

import React, { useState, useMemo } from 'react';
import { cn } from '@whttlr/ui-theme';
import { MachineDashboardProps, MetricCardData, ChartConfig } from './types';
import { chartColors } from './constants';
import { MetricCard } from './MetricCard';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

// Mock data interfaces for the dashboard
interface MachineStatus {
  timestamps: string[];
  temperature: number[];
  spindleSpeed: number[];
  feedRate: number[];
}

interface JobStats {
  completed: number;
  failed: number;
  pending: number;
  running: number;
}

interface ExtendedMachineDashboardProps extends MachineDashboardProps {
  machineStatus: MachineStatus;
  jobStats: JobStats;
  performanceMetrics: MetricCardData[];
}

export const MachineDashboard: React.FC<ExtendedMachineDashboardProps> = ({
  machineStatus,
  jobStats,
  performanceMetrics,
  className,
  refreshInterval = 30000,
  showHeader = true,
  compactMode = false,
}) => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Prepare time series data
  const timeSeriesData = useMemo(() => {
    return machineStatus.timestamps.map((time, index) => ({
      name: time,
      temperature: machineStatus.temperature[index],
      spindleSpeed: machineStatus.spindleSpeed[index],
      feedRate: machineStatus.feedRate[index],
    }));
  }, [machineStatus]);
  
  // Prepare job statistics for pie chart
  const jobStatsData = [
    { name: 'Completed', value: jobStats.completed },
    { name: 'Failed', value: jobStats.failed },
    { name: 'Pending', value: jobStats.pending },
    { name: 'Running', value: jobStats.running },
  ];
  
  const temperatureConfig: ChartConfig[] = [
    {
      dataKey: 'temperature',
      name: 'Temperature (°C)',
      color: chartColors.danger,
      strokeWidth: 3,
    },
  ];
  
  const speedConfig: ChartConfig[] = [
    {
      dataKey: 'spindleSpeed',
      name: 'Spindle Speed (RPM)',
      color: chartColors.primary,
    },
    {
      dataKey: 'feedRate',
      name: 'Feed Rate (mm/min)',
      color: chartColors.info,
    },
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
  ];
  
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      {showHeader && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Machine Dashboard</h2>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Performance Metrics */}
      <div className={cn(
        'grid gap-4',
        compactMode 
          ? 'grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}>
        {performanceMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            data={metric}
            size={compactMode ? 'sm' : 'md'}
            animated
          />
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className={cn(
        'grid gap-6',
        compactMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
      )}>
        {/* Temperature Chart */}
        <LineChart
          data={timeSeriesData}
          config={temperatureConfig}
          title="Machine Temperature"
          height={compactMode ? 200 : 250}
          referenceLine={{ 
            value: 60, 
            label: 'Max Safe Temp', 
            color: chartColors.danger 
          }}
        />
        
        {/* Speed Charts */}
        <LineChart
          data={timeSeriesData}
          config={speedConfig}
          title="Speed Metrics"
          height={compactMode ? 200 : 250}
        />
        
        {/* Job Statistics */}
        {!compactMode && (
          <PieChart
            data={jobStatsData}
            dataKey="value"
            nameKey="name"
            title="Job Statistics"
            height={250}
            innerRadius={40}
            outerRadius={80}
            showLabels
          />
        )}
      </div>
    </div>
  );
};