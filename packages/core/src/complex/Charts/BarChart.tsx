/**
 * Bar Chart Component
 * Professional bar chart with horizontal and vertical layouts
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@whttlr/ui-theme';
import { Card } from '../../primitives/Card';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { BarChartProps } from './types';
import { chartDefaults } from './constants';
import { getChartMargins, formatTooltipValue } from './utils';
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
  getChartGridColor,
  getChartAxisColor,
  getChartPrimaryColor,
  getChartFontSize,
} from '../../utils/tokens';

export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  height = chartDefaults.height,
  title,
  subtitle,
  className,
  loading = false,
  error,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  responsive = true,
  barSize = 40,
  layout = 'vertical',
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

  const margins = getChartMargins(showLegend, true);
  const primaryColor = getChartPrimaryColor();

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
            <RechartsBarChart
              layout={layout}
              data={data}
              margin={margins}
            >
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={getChartGridColor()}
                  opacity={0.5}
                />
              )}
              
              <XAxis 
                type={layout === 'vertical' ? 'number' : 'category'}
                dataKey={layout === 'vertical' ? undefined : 'name'}
                tick={{ fontSize: getChartFontSize() }}
                tickLine={{ stroke: getChartAxisColor() }}
                axisLine={{ stroke: getChartAxisColor() }}
              />
              
              <YAxis 
                type={layout === 'vertical' ? 'category' : 'number'}
                dataKey={layout === 'vertical' ? 'name' : undefined}
                tick={{ fontSize: getChartFontSize() }}
                tickLine={{ stroke: getChartAxisColor() }}
                axisLine={{ stroke: getChartAxisColor() }}
                width={80}
              />
              
              {showTooltip && (
                <Tooltip 
                  formatter={formatTooltipValue}
                  contentStyle={getChartTooltipStyles()}
                  labelStyle={{ color: getChartTooltipStyles().color }}
                  itemStyle={{ color: getChartTooltipStyles().color }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                />
              )}
              
              {showLegend && (
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              )}
              
              <Bar
                dataKey={dataKey}
                fill={primaryColor}
                radius={[4, 4, 0, 0]}
                maxBarSize={barSize}
                animationDuration={chartDefaults.animationDuration}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};