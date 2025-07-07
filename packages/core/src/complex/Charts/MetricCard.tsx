/**
 * Metric Card Component
 * Professional metric display with trend indicators and animations
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@whttlr/ui-theme';
import { Card } from '../../primitives/Card';
import { MetricCardProps } from './types';
import { formatValue, getTrendIcon, getTrendColor } from './utils';
import { metricCardSizes } from './constants';

export const MetricCard: React.FC<MetricCardProps> = ({
  data,
  size = 'md',
  showChange = true,
  showTarget = true,
  animated = true,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate value changes
  useEffect(() => {
    if (animated && typeof data.value === 'number') {
      const startValue = displayValue;
      const endValue = data.value;
      const duration = 1000; // 1 second
      const steps = 60;
      const stepValue = (endValue - startValue) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(startValue + (stepValue * currentStep));
        
        if (currentStep >= steps) {
          setDisplayValue(endValue);
          clearInterval(timer);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setDisplayValue(typeof data.value === 'number' ? data.value : 0);
    }
  }, [data.value, animated, displayValue]);
  
  const sizeConfig = metricCardSizes[size];
  const formattedValue = formatValue(
    animated && typeof data.value === 'number' ? displayValue : data.value,
    data.format,
    data.precision,
    data.unit
  );
  
  const changeValue = data.change;
  const changeFormatted = changeValue ? `${changeValue > 0 ? '+' : ''}${changeValue.toFixed(2)}%` : null;
  
  const targetProgress = data.target && typeof data.value === 'number' 
    ? Math.min((data.value / data.target) * 100, 100)
    : null;
  
  return (
    <div
      className={cn(
        'transition-all duration-300',
        animated && 'animate-in fade-in-0 slide-in-from-bottom-4',
        className
      )}
    >
      <Card
        className={cn(
          'h-full hover:shadow-lg transition-shadow duration-200',
          size === 'sm' && 'p-3',
          size === 'md' && 'p-4',
          size === 'lg' && 'p-6'
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-gray-600 font-medium"
                style={{ fontSize: sizeConfig.titleSize }}
              >
                {data.title}
              </span>
              {data.icon && (
                <div className="text-gray-400" title="More information">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex items-baseline gap-2">
              <span 
                className="font-bold text-gray-900"
                style={{ fontSize: sizeConfig.valueSize }}
              >
                {formattedValue}
              </span>
              
              {showChange && changeValue !== undefined && (
                <div className={cn('text-sm flex items-center gap-1', getTrendColor(data.trend))}>
                  {getTrendIcon(data.trend)}
                  <span>{changeFormatted}</span>
                </div>
              )}
            </div>
            
            {showTarget && targetProgress !== null && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Progress to target</span>
                  <span className="text-xs text-gray-500">
                    {targetProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      targetProgress >= 100 ? 'bg-green-500' :
                      targetProgress >= 75 ? 'bg-yellow-500' : 'bg-purple-500'
                    )}
                    style={{ width: `${Math.min(targetProgress, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {data.icon && (
            <div 
              className="text-gray-400 ml-3"
              style={{ fontSize: sizeConfig.iconSize }}
            >
              {data.icon}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};