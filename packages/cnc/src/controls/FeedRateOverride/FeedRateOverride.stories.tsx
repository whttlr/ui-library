import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FeedRateOverride, CompactFeedRateOverride } from './FeedRateOverride';
import { Card, Button } from '@whttlr/ui-core';

const meta: Meta<typeof FeedRateOverride> = {
  title: 'CNC/Controls/FeedRateOverride',
  component: FeedRateOverride,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A feed rate override control for CNC machines, allowing operators to adjust the programmed feed rate in real-time for safety and optimization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentOverride: {
      control: { type: 'number', min: 0, max: 200, step: 5 },
    },
    min: {
      control: { type: 'number', min: 0, max: 50 },
    },
    max: {
      control: { type: 'number', min: 100, max: 300 },
    },
    step: {
      control: { type: 'number', min: 1, max: 25 },
    },
    showTrend: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [override, setOverride] = useState(100);
    const [previousOverride, setPreviousOverride] = useState(100);

    const handleChange = (value: number) => {
      setPreviousOverride(override);
      setOverride(value);
    };

    return (
      <div style={{ width: '400px' }}>
        <FeedRateOverride
          currentOverride={override}
          onChange={handleChange}
          previousOverride={previousOverride}
        />
      </div>
    );
  },
};

export const CustomRange: Story = {
  render: () => {
    const [override, setOverride] = useState(50);

    return (
      <div style={{ width: '400px' }}>
        <FeedRateOverride
          currentOverride={override}
          onChange={setOverride}
          min={0}
          max={150}
          step={10}
          presets={[0, 10, 25, 50, 75, 100, 125, 150]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Feed rate override with custom range and presets for specific machine requirements.',
      },
    },
  },
};

export const WithoutTrend: Story = {
  render: () => {
    const [override, setOverride] = useState(75);

    return (
      <div style={{ width: '400px' }}>
        <FeedRateOverride
          currentOverride={override}
          onChange={setOverride}
          showTrend={false}
        />
      </div>
    );
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [override, setOverride] = useState(100);

    return (
      <div style={{ width: 'auto' }}>
        <CompactFeedRateOverride
          currentOverride={override}
          onChange={setOverride}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact version suitable for toolbars and space-constrained layouts.',
      },
    },
  },
};

export const ControlStates: Story = {
  render: () => {
    const [overrides, setOverrides] = useState({
      feedHold: 0,
      reduced: 50,
      normal: 100,
      rapid: 150,
    });

    const updateOverride = (key: string, value: number) => {
      setOverrides(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px',
      }}>
        <h3 style={{ 
          margin: 0, 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Feed Rate Override States
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Feed Hold (0%)
            </h4>
            <FeedRateOverride
              currentOverride={overrides.feedHold}
              onChange={(value) => updateOverride('feedHold', value)}
              showTrend={false}
            />
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Reduced Speed (50%)
            </h4>
            <FeedRateOverride
              currentOverride={overrides.reduced}
              onChange={(value) => updateOverride('reduced', value)}
              showTrend={false}
            />
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Normal Speed (100%)
            </h4>
            <FeedRateOverride
              currentOverride={overrides.normal}
              onChange={(value) => updateOverride('normal', value)}
              showTrend={false}
            />
          </Card>

          <Card style={{ padding: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1rem',
            }}>
              Rapid Override (150%)
            </h4>
            <FeedRateOverride
              currentOverride={overrides.rapid}
              onChange={(value) => updateOverride('rapid', value)}
              showTrend={false}
            />
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different feed rate override states showing various operating conditions.',
      },
    },
  },
};

export const MachinePanelIntegration: Story = {
  render: () => {
    const [feedOverride, setFeedOverride] = useState(100);
    const [rapidOverride, setRapidOverride] = useState(100);
    const [spindleOverride, setSpindleOverride] = useState(100);

    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          Machine Override Panel
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Toolbar with compact controls */}
          <Card style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <CompactFeedRateOverride
                currentOverride={feedOverride}
                onChange={setFeedOverride}
              />
              
              <div style={{ 
                borderLeft: '1px solid hsl(240, 3.7%, 15.9%)',
                height: '40px',
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  color: 'hsl(240, 5%, 64.9%)', 
                  fontSize: '0.875rem',
                  minWidth: '80px',
                }}>
                  Rapid:
                </span>
                <CompactFeedRateOverride
                  currentOverride={rapidOverride}
                  onChange={setRapidOverride}
                />
              </div>
              
              <div style={{ 
                borderLeft: '1px solid hsl(240, 3.7%, 15.9%)',
                height: '40px',
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  color: 'hsl(240, 5%, 64.9%)', 
                  fontSize: '0.875rem',
                  minWidth: '80px',
                }}>
                  Spindle:
                </span>
                <CompactFeedRateOverride
                  currentOverride={spindleOverride}
                  onChange={setSpindleOverride}
                />
              </div>
            </div>
          </Card>

          {/* Detailed controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Feed Rate Override
              </h4>
              <FeedRateOverride
                currentOverride={feedOverride}
                onChange={setFeedOverride}
              />
            </Card>

            <Card style={{ padding: '1rem' }}>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem',
              }}>
                Rapid Override
              </h4>
              <FeedRateOverride
                currentOverride={rapidOverride}
                onChange={setRapidOverride}
                max={100}
                presets={[0, 25, 50, 75, 100]}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of feed rate override controls integrated into a machine control panel.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    currentOverride: 100,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FeedRateOverride {...args} />
    </div>
  ),
};