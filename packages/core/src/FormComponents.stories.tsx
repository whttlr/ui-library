import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from './primitives/Card/Card';
import { Button } from './primitives/Button/Button';
import { Badge } from './primitives/Badge/Badge';
import { Input, CoordinateInput, PrecisionInput } from './primitives/Input/Input';
import { 
  Search, Settings, User, Mail, Lock, Eye, EyeOff, 
  Calculator, Ruler, Target, Wrench, Activity 
} from 'lucide-react';

const meta: Meta = {
  title: 'Forms/Form Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form component library for CNC applications with inline styling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced Input Components with inline styles
const NumberInput: React.FC<{
  label?: string;
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}> = ({ label, value, onChange, min, max, step = 1, placeholder, disabled, error }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Handle empty input
    if (inputValue === '' || inputValue === '-') {
      onChange?.(undefined);
      return;
    }
    
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      onChange?.(val);
    }
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    height: '40px',
    padding: '8px 36px 8px 12px', // Extra padding for custom arrows
    borderRadius: '6px',
    border: error ? '1px solid rgb(248, 113, 113)' : '1px solid hsl(240, 3.7%, 15.9%)',
    backgroundColor: '#18181a', // Exact color from UI demo
    color: 'hsl(0, 0%, 98%)',
    fontSize: '14px',
    fontFamily: 'JetBrains Mono, monospace',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    MozAppearance: 'textfield', // Firefox: hide default arrows
    WebkitAppearance: 'none', // Webkit: hide default arrows
    appearance: 'none', // Standard: hide default arrows
  };

  const arrowContainerStyles: React.CSSProperties = {
    position: 'absolute',
    right: '1px',
    top: '1px',
    bottom: '1px',
    width: '32px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0 5px 5px 0',
    overflow: 'hidden',
    opacity: isHovered || isInputFocused ? 1 : 0.6,
    transform: isHovered || isInputFocused ? 'translateX(0)' : 'translateX(4px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const arrowButtonStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    backgroundColor: '#27272a', // Slightly lighter gray from demo
    color: 'hsl(0, 0%, 98%)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    borderLeft: '1px solid hsl(240, 3.7%, 15.9%)',
    transformOrigin: 'center',
  };

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        /* Hide all browser default number input spinners */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          appearance: none !important;
          margin: 0 !important;
          display: none !important;
        }
        
        input[type="number"] {
          -moz-appearance: textfield !important;
          appearance: textfield !important;
        }
        
        /* Additional cross-browser spinner hiding */
        input[type="number"]::-ms-clear {
          display: none !important;
        }
        
        input[type="number"]::-ms-reveal {
          display: none !important;
        }
      `}</style>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: 500, 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '8px' 
        }}>
          {label}
        </label>
      )}
      <div 
        style={containerStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          type="number"
          value={value !== undefined ? value : ''}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
          onFocus={(e) => {
            setIsInputFocused(true);
            e.target.style.borderColor = 'hsl(262, 83%, 58%)';
            e.target.style.boxShadow = '0 0 0 2px hsl(262, 83%, 58% / 0.2)';
          }}
          onBlur={(e) => {
            setIsInputFocused(false);
            e.target.style.borderColor = error ? 'rgb(248, 113, 113)' : 'hsl(240, 3.7%, 15.9%)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <div style={arrowContainerStyles}>
          <button
            type="button"
            style={arrowButtonStyles}
            onClick={() => {
              const currentValue = value ?? 0;
              const newValue = currentValue + step;
              if (max === undefined || newValue <= max) {
                onChange?.(newValue);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(262, 83%, 58% / 0.15)';
              e.currentTarget.style.color = 'hsl(262, 83%, 58%)';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#27272a';
              e.currentTarget.style.color = 'hsl(0, 0%, 98%)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            ▲
          </button>
          <button
            type="button"
            style={{...arrowButtonStyles, borderTop: '1px solid hsl(240, 3.7%, 15.9%)'}}
            onClick={() => {
              const currentValue = value ?? 0;
              const newValue = currentValue - step;
              if (min === undefined || newValue >= min) {
                onChange?.(newValue);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(262, 83%, 58% / 0.15)';
              e.currentTarget.style.color = 'hsl(262, 83%, 58%)';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#27272a';
              e.currentTarget.style.color = 'hsl(0, 0%, 98%)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            ▼
          </button>
        </div>
      </div>
      {error && (
        <p style={{ fontSize: '12px', color: 'rgb(248, 113, 113)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

const TextInput: React.FC<{
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'password';
  icon?: React.ReactNode;
}> = ({ label, value, onChange, placeholder, disabled, error, type = 'text', icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyles: React.CSSProperties = {
    width: '100%',
    height: '40px',
    padding: icon ? '8px 12px 8px 40px' : '8px 12px',
    borderRadius: '6px',
    border: error ? '1px solid rgb(248, 113, 113)' : '1px solid hsl(240, 3.7%, 15.9%)',
    backgroundColor: disabled ? 'hsl(240, 3.7%, 10%)' : '#18181a', // Match UI demo
    color: 'hsl(0, 0%, 98%)',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: 500, 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '8px' 
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            {icon}
          </div>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
          onFocus={(e) => {
            e.target.style.borderColor = 'hsl(262, 83%, 58%)';
            e.target.style.boxShadow = '0 0 0 2px hsl(262, 83%, 58% / 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'rgb(248, 113, 113)' : 'hsl(240, 3.7%, 15.9%)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'hsl(240, 5%, 64.9%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p style={{ fontSize: '12px', color: 'rgb(248, 113, 113)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

const SliderInput: React.FC<{
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  unit?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}> = ({ label, value = 0, onChange, min = 0, max = 100, step = 1, disabled, showValue = true, unit, variant = 'default' }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const variantColors = {
    default: 'hsl(262, 83%, 58%)', // Purple
    success: 'rgb(34, 197, 94)', // Green
    warning: 'rgb(245, 158, 11)', // Amber
    info: 'rgb(59, 130, 246)', // Blue
  };

  const activeColor = variantColors[variant];

  const containerStyles: React.CSSProperties = {
    width: '100%',
    position: 'relative',
  };

  const trackStyles: React.CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: 'hsl(240, 3.7%, 15.9%)',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const fillStyles: React.CSSProperties = {
    height: '100%',
    borderRadius: '4px',
    background: `linear-gradient(90deg, ${activeColor} 0%, ${activeColor} 100%)`,
    width: `${percentage}%`,
    transition: 'width 0.3s ease',
    boxShadow: `0 0 8px ${activeColor}40`, // Subtle glow
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${percentage}%`,
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: activeColor,
    border: '3px solid #18181a',
    boxShadow: `0 0 0 1px hsl(240, 3.7%, 15.9%), 0 2px 4px rgba(0,0,0,0.3), 0 0 8px ${activeColor}60`,
    cursor: disabled ? 'not-allowed' : 'grab',
    transition: 'all 0.2s ease',
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
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        {label && (
          <label style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(0, 0%, 98%)' }}>
            {label}
          </label>
        )}
        {showValue && (
          <span style={{ fontSize: '14px', color: activeColor, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            {value}{unit}
          </span>
        )}
      </div>
      <div style={containerStyles}>
        <div style={trackStyles}>
          <div style={fillStyles} />
          <div 
            style={thumbStyles}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 0 0 1px hsl(240, 3.7%, 15.9%), 0 4px 8px rgba(0,0,0,0.4), 0 0 12px ${activeColor}80`;
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = `0 0 0 1px hsl(240, 3.7%, 15.9%), 0 2px 4px rgba(0,0,0,0.3), 0 0 8px ${activeColor}60`;
              }
            }}
          />
        </div>
        <input
          type="range"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          style={inputStyles}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <span style={{ fontSize: '12px', color: 'hsl(240, 5%, 64.9%)' }}>{min}{unit}</span>
        <span style={{ fontSize: '12px', color: 'hsl(240, 5%, 64.9%)' }}>{max}{unit}</span>
      </div>
    </div>
  );
};

const Checkbox: React.FC<{
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ label, checked, onChange, disabled }) => {
  const checkboxStyles: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: '3px',
    border: checked ? '2px solid hsl(262, 83%, 58%)' : '2px solid hsl(240, 5%, 34%)',
    backgroundColor: checked ? 'hsl(262, 83%, 58%)' : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <label style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      <div
        style={checkboxStyles}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {label && (
        <span style={{ fontSize: '14px', color: 'hsl(0, 0%, 98%)' }}>
          {label}
        </span>
      )}
    </label>
  );
};

const RadioGroup: React.FC<{
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}> = ({ label, options, value, onChange, disabled }) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: 500, 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '8px' 
        }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;
          
          return (
            <label 
              key={option.value}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: isSelected ? '2px solid hsl(262, 83%, 58%)' : '2px solid hsl(240, 5%, 34%)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease-in-out',
                }}
                onClick={() => !isDisabled && onChange?.(option.value)}
              >
                {isSelected && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'hsl(262, 83%, 58%)',
                  }} />
                )}
              </div>
              <span style={{ fontSize: '14px', color: 'hsl(0, 0%, 98%)' }}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const SelectableList: React.FC<{
  label?: string;
  options: { id: string; label: string; description?: string; disabled?: boolean }[];
  value?: string[];
  onChange?: (value: string[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
}> = ({ label, options, value = [], onChange, multiSelect = false, disabled }) => {
  const handleSelect = (id: string) => {
    if (disabled) return;
    
    if (multiSelect) {
      const newValue = value.includes(id) 
        ? value.filter(v => v !== id)
        : [...value, id];
      onChange?.(newValue);
    } else {
      onChange?.(value.includes(id) ? [] : [id]);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: 500, 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '8px' 
        }}>
          {label}
        </label>
      )}
      <div style={{ 
        border: '1px solid hsl(240, 3.7%, 15.9%)',
        borderRadius: '6px',
        backgroundColor: 'hsl(240, 10%, 8%)',
        maxHeight: '200px',
        overflowY: 'auto',
      }}>
        {options.map((option) => {
          const isSelected = value.includes(option.id);
          const isDisabled = disabled || option.disabled;
          
          return (
            <div
              key={option.id}
              style={{
                padding: '8px 0',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
              onClick={() => handleSelect(option.id)}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '3px',
                  border: '2px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: isSelected ? 'hsl(262, 83%, 58%)' : 'transparent',
                  borderColor: isSelected ? 'hsl(262, 83%, 58%)' : 'hsl(240, 3.7%, 15.9%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease-in-out',
                  marginTop: '2px',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled && !isSelected) {
                    e.currentTarget.style.borderColor = 'hsl(262, 83%, 58%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled && !isSelected) {
                    e.currentTarget.style.borderColor = 'hsl(240, 3.7%, 15.9%)';
                  }
                }}
              >
                {isSelected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '14px', 
                  color: isDisabled ? 'hsl(240, 5%, 44.9%)' : 'hsl(0, 0%, 98%)', 
                  fontWeight: 400 
                }}>
                  {option.label}
                </div>
                {option.description && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: isDisabled ? 'hsl(240, 5%, 34.9%)' : 'hsl(240, 5%, 64.9%)', 
                    marginTop: '2px' 
                  }}>
                    {option.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const FormShowcase: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      spindleSpeed: 1200,
      feedRate: 500,
      jogDistance: 1,
      continuousMode: false,
      machineType: 'mill',
      enabledFeatures: ['safety', 'coolant'],
      toolSelection: ['tool1'],
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(262, 83%, 75%) 50%, hsl(220, 83%, 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px hsl(262, 83%, 58% / 0.3)',
          }}>
            Form Components
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Complete form component library for CNC applications
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          {/* Text Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Text Inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                label="Username"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Enter your username"
                icon={<User size={16} />}
              />
              <TextInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                placeholder="Enter your email"
                icon={<Mail size={16} />}
              />
              <TextInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                placeholder="Enter your password"
                icon={<Lock size={16} />}
              />
            </div>
          </Card>

          {/* Number Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Number Inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <NumberInput
                label="Spindle Speed (RPM)"
                value={formData.spindleSpeed}
                onChange={(value) => setFormData(prev => ({ ...prev, spindleSpeed: value }))}
                min={0}
                max={10000}
                step={100}
                placeholder="1200"
              />
              <NumberInput
                label="Feed Rate (mm/min)"
                value={formData.feedRate}
                onChange={(value) => setFormData(prev => ({ ...prev, feedRate: value }))}
                min={0}
                max={5000}
                step={50}
                placeholder="500"
              />
              <NumberInput
                label="Jog Distance (mm)"
                value={formData.jogDistance}
                onChange={(value) => setFormData(prev => ({ ...prev, jogDistance: value }))}
                min={0.01}
                max={100}
                step={0.1}
                placeholder="1.0"
              />
            </div>
          </Card>

          {/* Sliders */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Slider Controls</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SliderInput
                label="Spindle Speed"
                value={formData.spindleSpeed}
                onChange={(value) => setFormData(prev => ({ ...prev, spindleSpeed: value }))}
                min={0}
                max={10000}
                step={100}
                unit=" RPM"
                variant="info"
              />
              <SliderInput
                label="Feed Rate"
                value={formData.feedRate}
                onChange={(value) => setFormData(prev => ({ ...prev, feedRate: value }))}
                min={0}
                max={5000}
                step={50}
                unit=" mm/min"
                variant="success"
              />
              <SliderInput
                label="Jog Distance"
                value={formData.jogDistance}
                onChange={(value) => setFormData(prev => ({ ...prev, jogDistance: value }))}
                min={0.1}
                max={10}
                step={0.1}
                unit=" mm"
                variant="warning"
              />
            </div>
          </Card>

          {/* Checkboxes */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Checkboxes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Checkbox
                label="Continuous Jog Mode"
                checked={formData.continuousMode}
                onChange={(checked) => setFormData(prev => ({ ...prev, continuousMode: checked }))}
              />
              <Checkbox
                label="Enable Safety Interlocks"
                checked={true}
                disabled
              />
              <Checkbox
                label="Auto Tool Length Measurement"
                checked={false}
              />
              <Checkbox
                label="Flood Coolant"
                checked={true}
              />
            </div>
          </Card>

          {/* Radio Groups */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Radio Groups</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <RadioGroup
                label="Machine Type"
                value={formData.machineType}
                onChange={(value) => setFormData(prev => ({ ...prev, machineType: value }))}
                options={[
                  { value: 'mill', label: '3-Axis Mill' },
                  { value: 'lathe', label: 'CNC Lathe' },
                  { value: '4axis', label: '4-Axis Mill' },
                  { value: 'router', label: 'CNC Router', disabled: true },
                ]}
              />
            </div>
          </Card>

          {/* Selectable Lists */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Selectable Lists</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SelectableList
                label="Enabled Features (Multi-select)"
                multiSelect
                value={formData.enabledFeatures}
                onChange={(value) => setFormData(prev => ({ ...prev, enabledFeatures: value }))}
                options={[
                  { id: 'safety', label: 'Safety Systems', description: 'Emergency stop and safety interlocks' },
                  { id: 'coolant', label: 'Coolant Control', description: 'Flood and mist coolant systems' },
                  { id: 'probing', label: 'Part Probing', description: 'Automatic workpiece detection' },
                  { id: 'toolchange', label: 'Auto Tool Change', description: 'Automatic tool changer support' },
                ]}
              />
              
              <SelectableList
                label="Active Tool (Single-select)"
                value={formData.toolSelection}
                onChange={(value) => setFormData(prev => ({ ...prev, toolSelection: value }))}
                options={[
                  { id: 'tool1', label: 'Tool 1: 6mm End Mill', description: 'HSS 2-flute end mill' },
                  { id: 'tool2', label: 'Tool 2: 3mm Drill', description: 'Carbide twist drill' },
                  { id: 'tool3', label: 'Tool 3: Face Mill', description: '50mm indexable face mill' },
                  { id: 'tool4', label: 'Tool 4: Tap M6', description: 'M6x1.0 spiral tap', disabled: true },
                ]}
              />
            </div>
          </Card>

        </div>

        {/* Form Actions */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="default" size="lg">
              <Settings size={16} style={{ marginRight: '0.5rem' }} />
              Apply Settings
            </Button>
            <Button variant="secondary" size="lg">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete form component showcase including:

- **Text Inputs**: Username, email, password with icons and validation
- **Number Inputs**: Spindle speed, feed rate, jog distance with precision
- **Slider Controls**: Interactive sliders with real-time value display
- **Checkboxes**: Boolean settings with proper styling
- **Radio Groups**: Single-selection options for machine configuration
- **Selectable Lists**: Multi-select and single-select lists with descriptions

All components use consistent styling matching the dark CNC theme with proper focus states and hover effects.
        `,
      },
    },
  },
};

export const CNCSpecificInputs: Story = {
  render: () => {
    const [coordinates, setCoordinates] = useState({ x: 125.456, y: 67.234, z: -10.125 });
    const [precisionValues, setPrecisionValues] = useState({
      toolDiameter: 6.35,
      stepover: 0.8,
      stepdown: 2.0,
    });

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            CNC-Specific Inputs
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Specialized input components for precision machining
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          
          {/* Coordinate Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Target size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Machine Coordinates
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <CoordinateInput
                label="X Position"
                value={coordinates.x}
                onChange={(e) => setCoordinates(prev => ({ ...prev, x: parseFloat(e.target.value) || 0 }))}
                precision={3}
              />
              <CoordinateInput
                label="Y Position"
                value={coordinates.y}
                onChange={(e) => setCoordinates(prev => ({ ...prev, y: parseFloat(e.target.value) || 0 }))}
                precision={3}
              />
              <CoordinateInput
                label="Z Position"
                value={coordinates.z}
                onChange={(e) => setCoordinates(prev => ({ ...prev, z: parseFloat(e.target.value) || 0 }))}
                precision={3}
              />
            </div>
          </Card>

          {/* Precision Inputs */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Ruler size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Tool Parameters
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <PrecisionInput
                label="Tool Diameter (mm)"
                value={precisionValues.toolDiameter}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, toolDiameter: parseFloat(e.target.value) || 0 }))}
                precision={2}
              />
              <PrecisionInput
                label="Stepover (%)"
                value={precisionValues.stepover}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, stepover: parseFloat(e.target.value) || 0 }))}
                precision={1}
              />
              <PrecisionInput
                label="Stepdown (mm)"
                value={precisionValues.stepdown}
                onChange={(e) => setPrecisionValues(prev => ({ ...prev, stepdown: parseFloat(e.target.value) || 0 }))}
                precision={1}
              />
            </div>
          </Card>

          {/* Machine Settings */}
          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Activity size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Machine Parameters
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <SliderInput
                  label="Spindle Speed"
                  value={1200}
                  min={0}
                  max={10000}
                  step={100}
                  unit=" RPM"
                />
              </div>
              <div>
                <SliderInput
                  label="Feed Rate"
                  value={800}
                  min={0}
                  max={5000}
                  step={50}
                  unit=" mm/min"
                />
              </div>
              <div>
                <SliderInput
                  label="Rapid Rate"
                  value={2500}
                  min={0}
                  max={10000}
                  step={100}
                  unit=" mm/min"
                />
              </div>
              <div>
                <SliderInput
                  label="Plunge Rate"
                  value={300}
                  min={0}
                  max={2000}
                  step={25}
                  unit=" mm/min"
                />
              </div>
            </div>
          </Card>

        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC-specific input components including coordinate inputs with precision formatting and machine parameter sliders.',
      },
    },
  },
};