/**
 * Toast Component
 * Individual toast notification component with animations
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@whttlr/ui-theme';
import { Button } from '../primitives/Button/Button';

export interface ToastAction {
  label: string;
  onClick: () => void;
  type?: 'default' | 'primary' | 'ghost' | 'link';
}

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'machine' | 'safety' | 'job';
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  icon?: React.ReactNode;
  actions: ToastAction[];
  read: boolean;
  onClick?: () => void;
}

export interface ToastComponentProps {
  toast: Toast;
  onClose: (id: string) => void;
  onRead: (id: string) => void;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onClose, onRead }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const getTypeConfig = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('path', { 
            d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' 
          })),
          color: 'border-green-500 bg-green-50 text-green-800',
          iconColor: 'text-green-500',
        };
      case 'error':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('path', { 
            d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' 
          })),
          color: 'border-red-500 bg-red-50 text-red-800',
          iconColor: 'text-red-500',
        };
      case 'warning':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('path', { 
            d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' 
          })),
          color: 'border-amber-500 bg-amber-50 text-amber-800',
          iconColor: 'text-amber-500',
        };
      case 'info':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
          React.createElement('path', { d: 'M12 16v-4m0-4h.01' })),
          color: 'border-blue-500 bg-blue-50 text-blue-800',
          iconColor: 'text-blue-500',
        };
      case 'machine':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('path', { 
            d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' 
          })),
          color: 'border-purple-500 bg-purple-50 text-purple-800',
          iconColor: 'text-purple-500',
        };
      case 'safety':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('path', { 
            d: 'M12 1l3.5 3.5L19 4l-1 4 4-1-.5 3.5L25 12l-3.5 3.5L22 19l-4-1 1 4-3.5-.5L12 25l-3.5-3.5L5 22l1-4-4 1 .5-3.5L-1 12l3.5-3.5L2 5l4 1-1-4 3.5.5L12 1z' 
          })),
          color: 'border-red-600 bg-red-100 text-red-900',
          iconColor: 'text-red-600',
        };
      case 'job':
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
          React.createElement('polyline', { points: '12,6 12,12 16,14' })),
          color: 'border-indigo-500 bg-indigo-50 text-indigo-800',
          iconColor: 'text-indigo-500',
        };
      default:
        return {
          icon: React.createElement('svg', { 
            className: 'w-5 h-5', 
            fill: 'currentColor', 
            viewBox: '0 0 24 24' 
          }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
          React.createElement('path', { d: 'M12 16v-4m0-4h.01' })),
          color: 'border-gray-500 bg-gray-50 text-gray-800',
          iconColor: 'text-gray-500',
        };
    }
  };
  
  const config = getTypeConfig();
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(toast.id), 300);
  };
  
  const handleClick = () => {
    if (!toast.read) {
      onRead(toast.id);
    }
    toast.onClick?.();
  };
  
  const variants = {
    initial: { opacity: 0, x: 100, scale: 0.3 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.5, transition: { duration: 0.3 } },
  };
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={isVisible ? "animate" : "exit"}
      exit="exit"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        'relative p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm max-w-sm cursor-pointer',
        config.color,
        !toast.read && 'ring-2 ring-primary/20',
        toast.priority === 'critical' && 'animate-pulse'
      )}
      onClick={handleClick}
    >
      {/* Priority Indicator */}
      {toast.priority === 'critical' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      )}
      
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={cn('flex-shrink-0 text-xl', config.iconColor)}>
          {toast.icon || config.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-xs mt-1 opacity-90 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="text-current opacity-60 hover:opacity-100 -mt-1 -mr-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </Button>
          </div>
          
          {/* Actions */}
          {toast.actions.length > 0 && (
            <div className="flex space-x-2 mt-3">
              {toast.actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.type === 'primary' ? 'default' : (action.type as any) || 'default'}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          
          {/* Timestamp */}
          <div className="text-xs opacity-60 mt-2">
            {toast.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};