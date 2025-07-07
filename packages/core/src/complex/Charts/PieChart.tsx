/**
 * Pie Chart Component
 * Professional pie chart with customizable styling
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@whttlr/ui-theme';
import { Card } from '../../primitives/Card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { PieChartProps } from './types';
import { chartDefaults, pieChartColors } from './constants';
import { formatTooltipValue } from './utils';
import {
  getChartLoadingStyles,
  getChartLoadingSpinnerStyles,
  getChartLoadingTextStyles,
  getChartErrorContainerStyles,
  getChartErrorIconStyles,
  getChartErrorTitleStyles,
  getChartErrorTextStyles,
  getChartEmptyStateContainerStyles,
  getChartEmptyStateIconStyles,
  getChartEmptyStateTextStyles,
  getChartTitleStyles,
  getChartSubtitleStyles,
  getChartTooltipStyles,
  getChartPrimaryColor,
} from '../../utils/tokens';

export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey,
  nameKey,
  height = chartDefaults.height,
  title,
  subtitle,
  className,
  loading = false,
  error,
  showLegend = true,
  showTooltip = true,
  responsive = true,
  innerRadius = 0,
  outerRadius = 80,
  showLabels = false,
  labelPosition = 'outside',
  colors = pieChartColors,
}) => {
  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-center justify-center" style={{ height }}>
          <div style={getChartLoadingStyles()}>
            <div style={getChartLoadingSpinnerStyles()}></div>
            <p style={getChartLoadingTextStyles()}>Loading chart data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <div style={getChartErrorContainerStyles()}>
          <svg style={getChartErrorIconStyles()} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 style={getChartErrorTitleStyles()}>Chart Error</h4>
            <p style={getChartErrorTextStyles()}>{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className={cn('p-6', className)}>
        <div style={getChartEmptyStateContainerStyles()}>
          <svg style={getChartEmptyStateIconStyles()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p style={getChartEmptyStateTextStyles()}>No data available</p>
        </div>
      </Card>
    );
  }

  const renderCustomLabel = (entry: any) => {
    if (!showLabels) return null;
    
    const percent = ((entry.value / data.reduce((sum, item) => sum + item[dataKey], 0)) * 100).toFixed(0);
    return `${entry[nameKey]}: ${percent}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 style={getChartTitleStyles()}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={getChartSubtitleStyles()}>{subtitle}</p>
            )}
          </div>
        )}
        
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              {showTooltip && (
                <Tooltip 
                  formatter={(value, name) => formatTooltipValue(value as number, name as string, {})}
                  contentStyle={getChartTooltipStyles()}
                />
              )}
              
              {showLegend && (
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                />
              )}
              
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={showLabels ? renderCustomLabel : false}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill={getChartPrimaryColor()}
                dataKey={dataKey}
                nameKey={nameKey}
                animationDuration={chartDefaults.animationDuration}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};