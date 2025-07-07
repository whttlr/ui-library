import * as React from 'react';
import {
  tokens,
  getSliderVariantStyles,
  getSliderTrackStyles,
  getSliderThumbStyles,
  getSliderFillStyles,
  getSliderThumbHoverShadow,
  getSliderThumbActiveShadow,
} from '../../utils/tokens';

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
  style?: React.CSSProperties;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value = 0, onChange, min = 0, max = 100, step = 1, disabled, variant = 'default', className, style, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const activeColor = getSliderVariantStyles(variant).backgroundColor as string;

    const containerStyles: React.CSSProperties = {
      width: '100%',
      position: 'relative',
      ...style,
    };

    const trackStyles: React.CSSProperties = {
      ...getSliderTrackStyles(),
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    };

    const fillStyles: React.CSSProperties = {
      ...getSliderFillStyles(variant),
      width: `${percentage}%`,
    };

    const thumbStyles: React.CSSProperties = {
      ...getSliderThumbStyles(variant),
      left: `${percentage}%`,
      cursor: disabled ? 'not-allowed' : 'grab',
    };

    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: 0,
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    };

    return (
      <div style={containerStyles} className={className}>
        <div style={trackStyles}>
          <div style={fillStyles} />
          <div 
            style={thumbStyles}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.currentTarget.style.boxShadow = getSliderThumbHoverShadow(activeColor);
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = getSliderThumbActiveShadow(activeColor);
              }
            }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          style={inputStyles}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };