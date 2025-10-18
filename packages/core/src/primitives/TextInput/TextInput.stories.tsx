import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { Card } from '../Card/Card';
import { User, Mail, Lock, Search, Phone, Globe } from 'lucide-react';

const meta: Meta<typeof TextInput> = {
  title: 'Primitives/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text input component with icon support, password visibility toggle, and various input types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    icon: <User size={16} />,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState('');
    const [mediumValue, setMediumValue] = useState('');
    const [largeValue, setLargeValue] = useState('');
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <TextInput
          label="Small Size"
          size="sm"
          placeholder="Small input"
          value={smallValue}
          onChange={(e) => setSmallValue(e.target.value)}
          icon={<User size={14} />}
        />
        <TextInput
          label="Medium Size"
          size="md"
          placeholder="Medium input"
          value={mediumValue}
          onChange={(e) => setMediumValue(e.target.value)}
          icon={<User size={16} />}
        />
        <TextInput
          label="Large Size"
          size="lg"
          placeholder="Large input"
          value={largeValue}
          onChange={(e) => setLargeValue(e.target.value)}
          icon={<User size={18} />}
        />
      </div>
    );
  },
};

export const InputTypes: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      text: '',
      email: '',
      password: '',
      search: '',
      tel: '',
      url: '',
    });
    
    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <TextInput
          label="Text Input"
          type="text"
          placeholder="Enter text"
          value={formData.text}
          onChange={(e) => updateField('text', e.target.value)}
          icon={<User size={16} />}
        />
        <TextInput
          label="Email Input"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          icon={<Mail size={16} />}
        />
        <TextInput
          label="Password Input"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          icon={<Lock size={16} />}
        />
        <TextInput
          label="Search Input"
          type="search"
          placeholder="Search..."
          value={formData.search}
          onChange={(e) => updateField('search', e.target.value)}
          icon={<Search size={16} />}
        />
        <TextInput
          label="Phone Input"
          type="tel"
          placeholder="Enter phone number"
          value={formData.tel}
          onChange={(e) => updateField('tel', e.target.value)}
          icon={<Phone size={16} />}
        />
        <TextInput
          label="URL Input"
          type="url"
          placeholder="Enter URL"
          value={formData.url}
          onChange={(e) => updateField('url', e.target.value)}
          icon={<Globe size={16} />}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState('');
    const [errorValue, setErrorValue] = useState('invalid-email');
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <TextInput
          label="Default Variant"
          variant="default"
          placeholder="Enter text"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          icon={<User size={16} />}
        />
        <TextInput
          label="Error Variant"
          variant="error"
          placeholder="Enter email"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
          icon={<Mail size={16} />}
          error="Please enter a valid email address"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('Normal state');
    const [disabledValue, setDisabledValue] = useState('Disabled state');
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <TextInput
          label="Normal State"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
          icon={<User size={16} />}
        />
        <TextInput
          label="Disabled State"
          value={disabledValue}
          onChange={(e) => setDisabledValue(e.target.value)}
          icon={<User size={16} />}
          disabled
        />
        <TextInput
          label="With Error"
          value="invalid-input"
          onChange={() => {}}
          icon={<Mail size={16} />}
          error="This field contains invalid data"
        />
      </div>
    );
  },
};

export const WithoutIcons: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        width: '300px' 
      }}>
        <TextInput
          label="No Icon"
          placeholder="Enter text"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <TextInput
          label="Password No Icon"
          type="password"
          placeholder="Enter password"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <TextInput
          label="Search No Icon"
          type="search"
          placeholder="Search..."
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
      </div>
    );
  },
};

export const FormShowcase: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      website: '',
      phone: '',
    });
    
    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        minHeight: '100vh',
        maxWidth: '600px',
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
          }}>
            Text Input Form
          </h1>
          <p style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '1.125rem' }}>
            Complete form with various text input types
          </p>
        </div>

        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              icon={<User size={16} />}
            />
            
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              icon={<Mail size={16} />}
            />
            
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              icon={<Lock size={16} />}
            />
            
            <TextInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              icon={<Lock size={16} />}
              error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : undefined}
            />
            
            <TextInput
              label="Website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              icon={<Globe size={16} />}
            />
            
            <TextInput
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              icon={<Phone size={16} />}
            />
          </div>
        </Card>

        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 10%, 8%)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'hsl(240, 5%, 64.9%)'
        }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            marginBottom: '0.5rem',
            color: 'hsl(0, 0%, 98%)'
          }}>
            Form Data:
          </h3>
          <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form showcase demonstrating TextInput components with various types, icons, and validation.',
      },
    },
  },
};

// Interactive event handling example
export const InteractiveEvents: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [eventLog, setEventLog] = useState<string[]>(['Ready for input...']);
    const [characterCount, setCharacterCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    
    const logEvent = (event: string) => {
      setEventLog(prev => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 9)]);
    };
    
    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: 'hsl(240, 10%, 8%)', 
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3 style={{ 
          color: 'hsl(0, 0%, 98%)', 
          marginBottom: '1.5rem',
          fontSize: '1.25rem',
          fontWeight: 600
        }}>
          TextInput Event Handling Demo
        </h3>
        
        <Card style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <TextInput
            label="Interactive Input"
            placeholder="Type to see events fire..."
            value={value}
            icon={<Search size={16} />}
            onChange={(e) => {
              setValue(e.target.value);
              setCharacterCount(e.target.value.length);
              logEvent(`onChange: "${e.target.value}"`);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              logEvent('onFocus');
            }}
            onBlur={(e) => {
              setIsFocused(false);
              logEvent('onBlur');
            }}
            onKeyDown={(e) => {
              logEvent(`onKeyDown: ${e.key}`);
            }}
            onKeyUp={(e) => {
              logEvent(`onKeyUp: ${e.key}`);
            }}
            onKeyPress={(e) => {
              logEvent(`onKeyPress: ${e.key}`);
            }}
            onInput={(e) => {
              logEvent(`onInput: "${e.currentTarget.value}"`);
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData('text');
              logEvent(`onPaste: "${pastedText}"`);
            }}
            onCopy={(e) => {
              logEvent(`onCopy: "${window.getSelection()?.toString()}"`);
            }}
            onCut={(e) => {
              logEvent(`onCut: "${window.getSelection()?.toString()}"`);
            }}
            onSelect={(e) => {
              const selection = e.currentTarget.value.substring(
                e.currentTarget.selectionStart || 0,
                e.currentTarget.selectionEnd || 0
              );
              if (selection) {
                logEvent(`onSelect: "${selection}"`);
              }
            }}
          />
          
          <div style={{ 
            display: 'flex', 
            gap: '2rem',
            marginTop: '1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem' 
            }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Status:</span>
              <span style={{ 
                color: isFocused ? 'hsl(142, 76%, 36%)' : 'hsl(0, 0%, 98%)',
                fontWeight: 600
              }}>
                {isFocused ? 'Focused' : 'Not Focused'}
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem' 
            }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Characters:</span>
              <span style={{ 
                color: 'hsl(0, 0%, 98%)',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {characterCount}
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem' 
            }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>Value:</span>
              <span style={{ 
                color: 'hsl(262, 83%, 58%)',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                "{value}"
              </span>
            </div>
          </div>
        </Card>
        
        {/* Event Log */}
        <div style={{ 
          backgroundColor: 'hsl(240, 10%, 12%)', 
          borderRadius: '6px',
          padding: '1rem',
          borderLeft: '4px solid hsl(262, 83%, 58%)'
        }}>
          <h4 style={{ 
            color: 'hsl(0, 0%, 98%)', 
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            Event Log (Last 10 Events)
          </h4>
          <div style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            lineHeight: '1.5'
          }}>
            {eventLog.map((event, index) => (
              <div 
                key={index} 
                style={{ 
                  color: index === 0 ? 'hsl(142, 76%, 36%)' : 'hsl(240, 5%, 64.9%)',
                  marginBottom: '0.25rem',
                  opacity: 1 - (index * 0.08)
                }}
              >
                {event}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 10%, 12%)',
          borderRadius: '6px',
          fontSize: '0.875rem',
          color: 'hsl(240, 5%, 64.9%)'
        }}>
          <p>
            <strong style={{ color: 'hsl(0, 0%, 98%)' }}>Try these actions:</strong>
          </p>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Type normally to see onChange and onInput events</li>
            <li>Click in/out to see focus and blur events</li>
            <li>Press individual keys to see keydown/keyup events</li>
            <li>Copy/paste text to see clipboard events</li>
            <li>Select text to see selection events</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration showing all TextInput event handlers in action. This proves that all HTML input events are properly passed through to the component.',
      },
    },
  },
};