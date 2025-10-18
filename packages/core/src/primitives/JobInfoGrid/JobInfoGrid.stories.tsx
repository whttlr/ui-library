import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { JobInfoGrid } from './JobInfoGrid';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import { Progress } from '../Progress/Progress';
import { Button } from '../Button/Button';
import { PositionDisplay } from '../PositionDisplay/PositionDisplay';

const meta: Meta<typeof JobInfoGrid> = {
  title: 'Primitives/JobInfoGrid',
  component: JobInfoGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible grid component for displaying job information and metadata in a structured format with various layout options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Job Name', value: 'Aluminum Bracket v2.1', format: 'text' },
      { label: 'Material', value: 'AL-6061', format: 'monospace' },
      { label: 'Dimensions', value: '150 x 100 x 25mm', format: 'monospace' },
      { label: 'Tool Count', value: '3', format: 'number' },
    ],
  },
  render: (args) => (
    <div style={{ width: '600px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1rem' }}>
      <JobInfoGrid {...args} />
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    title: 'Job Information',
    items: [
      { label: 'Job Name', value: 'Aluminum Bracket v2.1', format: 'text' },
      { label: 'Material', value: 'AL-6061', format: 'monospace' },
      { label: 'Dimensions', value: '150 x 100 x 25mm', format: 'monospace' },
      { label: 'Tool Count', value: '3', format: 'number' },
      { label: 'Estimated Time', value: '2h 45m', format: 'time' },
      { label: 'Remaining', value: '58m 23s', format: 'time' },
    ],
  },
  render: (args) => (
    <div style={{ width: '700px', backgroundColor: 'hsl(240, 10%, 3.9%)', borderRadius: '8px', padding: '1.5rem' }}>
      <JobInfoGrid {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '2rem',
      width: '800px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Default Variant
        </h4>
        <JobInfoGrid
          variant="default"
          items={[
            { label: 'Job Name', value: 'Precision Gear Assembly', format: 'text' },
            { label: 'Material', value: 'SS-316L', format: 'monospace' },
            { label: 'Progress', value: '67%', format: 'number' },
            { label: 'Time Remaining', value: '1h 23m', format: 'time' },
          ]}
        />
      </Card>

      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Compact Variant
        </h4>
        <JobInfoGrid
          variant="compact"
          items={[
            { label: 'Job Name', value: 'Precision Gear Assembly', format: 'text' },
            { label: 'Material', value: 'SS-316L', format: 'monospace' },
            { label: 'Progress', value: '67%', format: 'number' },
            { label: 'Time Remaining', value: '1h 23m', format: 'time' },
          ]}
        />
      </Card>

      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Detailed Variant
        </h4>
        <JobInfoGrid
          variant="detailed"
          items={[
            { label: 'Job Name', value: 'Precision Gear Assembly', format: 'text' },
            { label: 'Material', value: 'SS-316L', format: 'monospace' },
            { label: 'Progress', value: '67%', format: 'number' },
            { label: 'Time Remaining', value: '1h 23m', format: 'time' },
          ]}
        />
      </Card>
    </div>
  ),
};

export const ColumnLayouts: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '2rem',
      width: '1000px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Single Column
        </h4>
        <JobInfoGrid
          columns={1}
          items={[
            { label: 'Job Name', value: 'Titanium Frame Component', format: 'text' },
            { label: 'Material', value: 'Ti-6Al-4V', format: 'monospace' },
            { label: 'Machine', value: 'DMG Mori NLX 2500', format: 'text' },
            { label: 'Operator', value: 'John Smith', format: 'text' },
          ]}
        />
      </Card>

      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Two Columns
        </h4>
        <JobInfoGrid
          columns={2}
          items={[
            { label: 'Job Name', value: 'Titanium Frame Component', format: 'text' },
            { label: 'Material', value: 'Ti-6Al-4V', format: 'monospace' },
            { label: 'Machine', value: 'DMG Mori NLX 2500', format: 'text' },
            { label: 'Operator', value: 'John Smith', format: 'text' },
          ]}
        />
      </Card>

      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Three Columns
        </h4>
        <JobInfoGrid
          columns={3}
          items={[
            { label: 'Job Name', value: 'Titanium Frame Component', format: 'text' },
            { label: 'Material', value: 'Ti-6Al-4V', format: 'monospace' },
            { label: 'Machine', value: 'DMG Mori NLX 2500', format: 'text' },
            { label: 'Operator', value: 'John Smith', format: 'text' },
            { label: 'Start Time', value: '08:30 AM', format: 'time' },
            { label: 'Status', value: 'Running', format: 'text' },
          ]}
        />
      </Card>

      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Four Columns
        </h4>
        <JobInfoGrid
          columns={4}
          items={[
            { label: 'Job ID', value: 'JOB-001', format: 'monospace' },
            { label: 'Material', value: 'Ti-6Al-4V', format: 'monospace' },
            { label: 'Machine', value: 'DMG Mori', format: 'text' },
            { label: 'Operator', value: 'John Smith', format: 'text' },
            { label: 'Start', value: '08:30', format: 'time' },
            { label: 'End', value: '11:15', format: 'time' },
            { label: 'Progress', value: '67%', format: 'number' },
            { label: 'Status', value: 'Running', format: 'text' },
          ]}
        />
      </Card>
    </div>
  ),
};

export const FormatTypes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '2rem',
      width: '800px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <Card>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Different Format Types
        </h4>
        <JobInfoGrid
          items={[
            { 
              label: 'Text Format', 
              value: 'Standard text display with sans-serif font', 
              format: 'text',
              helperText: 'Default format for general text'
            },
            { 
              label: 'Number Format', 
              value: '1,234.567', 
              format: 'number',
              helperText: 'Monospace font for numerical values'
            },
            { 
              label: 'Time Format', 
              value: '2h 45m 30s', 
              format: 'time',
              helperText: 'Monospace font for time values'
            },
            { 
              label: 'Monospace Format', 
              value: 'JOB-2024-001-XYZ', 
              format: 'monospace',
              helperText: 'Fixed-width font for codes and IDs'
            },
          ]}
        />
      </Card>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ 
      width: '700px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <JobInfoGrid
        title="Machine Configuration"
        items={[
          { 
            label: 'Feed Rate', 
            value: '1,500 mm/min', 
            format: 'number',
            helperText: 'Current cutting feed rate'
          },
          { 
            label: 'Spindle Speed', 
            value: '12,000 RPM', 
            format: 'number',
            helperText: 'Maximum: 24,000 RPM'
          },
          { 
            label: 'Coolant Flow', 
            value: '45 L/min', 
            format: 'number',
            helperText: 'High-pressure through-spindle'
          },
          { 
            label: 'Tool Wear', 
            value: '23%', 
            format: 'number',
            helperText: 'Replace at 80% wear'
          },
        ]}
      />
    </div>
  ),
};

export const CustomComponents: Story = {
  render: () => (
    <div style={{ 
      width: '800px',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      padding: '2rem'
    }}>
      <JobInfoGrid
        title="Advanced Job Details"
        items={[
          { 
            label: 'Job Status', 
            value: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Badge variant="bright-success" showIndicator pulse>Running</Badge>
                <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                  Operation 2 of 3
                </span>
              </div>
            ),
            format: 'custom'
          },
          { 
            label: 'Progress', 
            value: (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem' }}>Overall Progress</span>
                  <span style={{ fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace' }}>67%</span>
                </div>
                <Progress value={67} variant="primary" />
              </div>
            ),
            format: 'custom'
          },
          { 
            label: 'Current Position', 
            value: (
              <PositionDisplay
                position={{ x: 125.750, y: 67.230, z: -10.125 }}
                variant="compact"
                size="sm"
                showLabels={false}
              />
            ),
            format: 'custom'
          },
          { 
            label: 'Quality Metrics', 
            value: (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Badge variant="bright-success">Tolerance: ±0.01mm</Badge>
                <Badge variant="bright-info">Surface: Ra 0.8</Badge>
              </div>
            ),
            format: 'custom'
          },
        ]}
      />
    </div>
  ),
};

export const RealTimeJobMonitor: Story = {
  render: () => {
    const [timeRemaining, setTimeRemaining] = useState(3523); // seconds
    const [progress, setProgress] = useState(67);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
        setProgress(prev => Math.min(100, prev + 0.1));
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
      <div style={{ 
        width: '900px',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        padding: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: 'hsl(0, 0%, 98%)' 
          }}>
            CNC Job Monitor
          </h3>
          <Badge variant="bright-success" showIndicator pulse>Live</Badge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <Card>
            <JobInfoGrid
              title="Job Information"
              items={[
                { label: 'Job Name', value: 'Aluminum Bracket v2.1', format: 'text' },
                { label: 'Material', value: 'AL-6061-T6', format: 'monospace' },
                { label: 'Stock Size', value: '200 x 150 x 30mm', format: 'monospace' },
                { label: 'Final Size', value: '150 x 100 x 25mm', format: 'monospace' },
                { label: 'Machine', value: 'Haas VF-3', format: 'text' },
                { label: 'Operator', value: 'Sarah Johnson', format: 'text' },
              ]}
            />
          </Card>

          <Card>
            <JobInfoGrid
              title="Progress Tracking"
              items={[
                { 
                  label: 'Overall Progress', 
                  value: (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem' }}>Completion</span>
                        <span style={{ fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace' }}>
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={progress} variant="primary" animated />
                    </div>
                  ),
                  format: 'custom'
                },
                { 
                  label: 'Time Remaining', 
                  value: formatTime(timeRemaining), 
                  format: 'time',
                  helperText: 'Estimated completion time'
                },
                { 
                  label: 'Current Operation', 
                  value: 'Finish Pass - Contour 3', 
                  format: 'text' 
                },
                { 
                  label: 'Tool in Use', 
                  value: 'T3 - 6mm End Mill', 
                  format: 'monospace' 
                },
              ]}
            />
          </Card>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="secondary">Pause Job</Button>
          <Button variant="destructive">Emergency Stop</Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time job monitoring dashboard with live progress updates and time tracking.',
      },
    },
  },
};

export const ComparisonStory: Story = {
  render: () => (
    <div style={{ 
      padding: '1.5rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '1000px',
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'hsl(0, 0%, 98%)',
        fontSize: '1.25rem',
        fontWeight: 600,
      }}>
        Before vs After: JobInfoGrid Component
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Before: Inline Implementation
          </h4>
          <Card>
            {/* Legacy inline implementation from Modal.stories.tsx */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Job Name:</span>
                <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>Aluminum Bracket v2.1</p>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Material:</span>
                <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>AL-6061</p>
              </div>
              <div>
                <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Dimensions:</span>
                <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>150 x 100 x 25mm</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            After: JobInfoGrid Component
          </h4>
          <Card>
            <JobInfoGrid
              items={[
                { label: 'Job Name', value: 'Aluminum Bracket v2.1', format: 'monospace' },
                { label: 'Material', value: 'AL-6061', format: 'monospace' },
                { label: 'Dimensions', value: '150 x 100 x 25mm', format: 'monospace' },
              ]}
            />
          </Card>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'hsl(240, 3.7%, 15.9%)', borderRadius: '6px' }}>
        <h5 style={{ margin: '0 0 0.5rem 0', color: 'hsl(0, 0%, 98%)' }}>Benefits:</h5>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
          <li>Consistent styling with design tokens</li>
          <li>Flexible column layouts (1-4 columns)</li>
          <li>Multiple format types (text, number, time, monospace)</li>
          <li>Support for custom components</li>
          <li>Helper text support</li>
          <li>Responsive grid layout</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing the benefit of using the JobInfoGrid component vs inline implementation.',
      },
    },
  },
};