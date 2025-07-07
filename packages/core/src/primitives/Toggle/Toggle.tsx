import * as React from 'react';
import { cn } from '../../utils';
import {
  getToggleSizeStyles,
  getToggleColorStyles,
  getToggleButtonStyles,
  getToggleTrackStyles,
  getToggleThumbStyles,
  getToggleLabelStyles,
  getToggleDescriptionStyles,
} from '../../utils/tokens';

export type ToggleSize = 'sm' | 'default' | 'lg';
export type ToggleColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'cnc';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  size?: ToggleSize;
  color?: ToggleColor;
  label?: string;
  description?: string;
  labelPosition?: 'left' | 'right';
  variant?: 'switch' | 'button';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({
    className,
    size = 'default',
    color = 'default',
    label,
    description,
    labelPosition = 'right',
    variant = 'switch',
    icon,
    loading = false,
    disabled,
    checked,
    onChange,
    id,
    ...props
  }, ref) => {
    const toggleId = id || React.useId();

    // Size styles using design tokens
    const sizeStyles = getToggleSizeStyles(size);

    // Color styles using design tokens
    const colorStyles = getToggleColorStyles(color);

    if (variant === 'button') {
      const buttonStyle = getToggleButtonStyles(size, checked || false, disabled || false, loading);

      return (
        <label
          htmlFor={toggleId}
          style={{
            display: 'inline-block',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            checked={checked}
            onChange={onChange}
            disabled={disabled || loading}
            style={{ display: 'none' }}
            {...props}
          />
          <div
            style={buttonStyle}
            // Hover effects handled by CSS transitions in getToggleButtonStyles
          >
            {loading && (
              <div
                style={{
                  width: '0.875rem',
                  height: '0.875rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            )}
            {!loading && icon && icon}
            {label}
          </div>
          <style>
            {`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </label>
      );
    }

    // Switch variant using design tokens
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: labelPosition === 'left' ? 'flex-start' : 'flex-start',
      flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...sizeStyles.container,
    };

    const trackStyle = getToggleTrackStyles(color, checked || false, size, disabled || false, loading);

    const thumbStyle = getToggleThumbStyles(color, checked || false, size);

    const labelStyle = getToggleLabelStyles(size);

    const descriptionStyle = getToggleDescriptionStyles(size);

    return (
      <label htmlFor={toggleId} style={containerStyle}>
        <input
          ref={ref}
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={onChange}
          disabled={disabled || loading}
          style={{ display: 'none' }}
          {...props}
        />
        <div style={trackStyle}>
          <div style={thumbStyle}>
            {loading && (
              <div
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  border: '1px solid transparent',
                  borderTop: '1px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            )}
            {!loading && icon && React.cloneElement(icon as React.ReactElement, {
              style: { width: '0.75rem', height: '0.75rem', color: 'currentColor' }
            })}
          </div>
        </div>
        {(label || description) && (
          <div style={{ flex: 1 }}>
            {label && <div style={labelStyle}>{label}</div>}
            {description && <div style={descriptionStyle}>{description}</div>}
          </div>
        )}
        <style>
          {`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

// Helper components for common use cases
export const Switch = React.forwardRef<HTMLInputElement, Omit<ToggleProps, 'variant'>>(
  (props, ref) => <Toggle ref={ref} variant="switch" {...props} />
);
Switch.displayName = 'Switch';

export const ToggleButton = React.forwardRef<HTMLInputElement, Omit<ToggleProps, 'variant'>>(
  (props, ref) => <Toggle ref={ref} variant="button" {...props} />
);
ToggleButton.displayName = 'ToggleButton';