import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable, SkeletonCompound } from './Skeleton';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton component for loading states with multiple variants and compound components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape variant of the skeleton',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant',
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value)',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the skeleton',
    },
    lines: {
      control: 'number',
      description: 'Number of lines for text variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <Skeleton />
    </div>
  ),
};

export const TextVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Single Line
          </h4>
          <Skeleton variant="text" />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Multiple Lines
          </h4>
          <Skeleton variant="text" lines={3} />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Custom Width
          </h4>
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text skeleton for content placeholders',
      },
    },
  },
};

export const CircularVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Skeleton variant="circular" size="sm" />
        <Skeleton variant="circular" size="default" />
        <Skeleton variant="circular" size="lg" />
        <Skeleton variant="circular" width="4rem" height="4rem" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular skeleton for avatars and profile pictures',
      },
    },
  },
};

export const RectangularVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Skeleton variant="rectangular" size="sm" />
        <Skeleton variant="rectangular" size="default" />
        <Skeleton variant="rectangular" size="lg" />
        <Skeleton variant="rectangular" width="100%" height="12rem" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rectangular skeleton for images and content blocks',
      },
    },
  },
};

export const RoundedVariant: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Skeleton variant="rounded" size="sm" />
        <Skeleton variant="rounded" size="default" />
        <Skeleton variant="rounded" size="lg" />
        <Skeleton variant="rounded" width="100%" height="10rem" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rounded skeleton for cards and containers',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Small
          </h4>
          <Skeleton variant="text" size="sm" />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Default
          </h4>
          <Skeleton variant="text" size="default" />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Large
          </h4>
          <Skeleton variant="text" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes for different contexts',
      },
    },
  },
};

export const WithoutAnimation: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Animated (Default)
          </h4>
          <Skeleton variant="text" lines={2} />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Static
          </h4>
          <Skeleton variant="text" lines={2} animate={false} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of animated vs static skeletons',
      },
    },
  },
};

export const CompoundComponents: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Avatar with Text
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SkeletonAvatar />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" size="sm" style={{ marginTop: '0.25rem' }} />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Text Block
          </h4>
          <SkeletonText lines={4} />
        </div>
        
        <div>
          <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
            Card with Avatar and Actions
          </h4>
          <SkeletonCard showAvatar showActions />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compound components for common loading patterns',
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'hsl(240, 10%, 3.9%)',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <h4 style={{ color: 'hsl(0, 0%, 98%)', marginBottom: '1rem' }}>
        Table Loading State
      </h4>
      <SkeletonTable rows={6} columns={5} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table skeleton for data loading states',
      },
    },
  },
};

export const LoadingStateDemo: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    const toggleLoading = () => {
      setLoading(!loading);
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={toggleLoading}>
            {loading ? 'Show Content' : 'Show Loading'}
          </Button>
        </div>
        
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <SkeletonAvatar />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" size="sm" style={{ marginTop: '0.25rem' }} />
              </div>
            </div>
            
            <SkeletonText lines={3} />
            
            <Skeleton variant="rounded" height="12rem" />
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Skeleton variant="rounded" width="5rem" height="2.5rem" />
              <Skeleton variant="rounded" width="4rem" height="2.5rem" />
            </div>
          </div>
        ) : (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: 'hsl(262, 83%, 58%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600
              }}>
                JD
              </div>
              <div>
                <div style={{ color: 'hsl(0, 0%, 98%)', fontWeight: 500 }}>John Doe</div>
                <div style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>CNC Operator</div>
              </div>
            </div>
            
            <p style={{ color: 'hsl(0, 0%, 98%)', margin: '0 0 1rem 0' }}>
              The latest CNC job has been completed successfully. All quality checks passed and the parts 
              are ready for assembly. The machine is now available for the next operation.
            </p>
            
            <div style={{
              height: '12rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ color: 'hsl(240, 5%, 64.9%)' }}>CNC Job Report Chart</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="default">View Details</Button>
              <Button variant="outline" size="default">Export</Button>
            </div>
          </Card>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing loading state transition to actual content',
      },
    },
  },
};

export const CNCMachineStatus: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: 'hsl(0, 0%, 98%)', 
          fontSize: '1.25rem',
          fontWeight: 600
        }}>
          CNC Machine Dashboard
        </h3>
        
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)'
            }}>
              <Skeleton variant="text" width="60%" style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width="30%" size="sm" />
                  <Skeleton variant="text" width="40%" size="sm" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width="35%" size="sm" />
                  <Skeleton variant="text" width="45%" size="sm" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width="25%" size="sm" />
                  <Skeleton variant="text" width="35%" size="sm" />
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)'
            }}>
              <Skeleton variant="text" width="50%" style={{ marginBottom: '1rem' }} />
              <Skeleton variant="rounded" height="8rem" />
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <Skeleton variant="text" width="40%" style={{ marginBottom: '1rem' }} />
              <SkeletonTable rows={4} columns={6} showHeader />
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)'
            }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem'
              }}>
                Machine Status
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Status:</span>
                  <span style={{ color: 'hsl(142, 71%, 45%)', fontSize: '0.875rem' }}>Running</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Progress:</span>
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>75%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>ETA:</span>
                  <span style={{ color: 'hsl(0, 0%, 98%)', fontSize: '0.875rem' }}>15 min</span>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(240, 3.7%, 25%)'
            }}>
              <h4 style={{ 
                margin: '0 0 1rem 0',
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1rem'
              }}>
                Performance Chart
              </h4>
              <div style={{
                height: '8rem',
                backgroundColor: 'hsl(240, 10%, 6%)',
                borderRadius: '0.375rem',
                border: '1px solid hsl(262, 83%, 58% / 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>
                  Real-time Performance Data
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: 'hsl(240, 5%, 64.9%)',
          fontSize: '0.875rem'
        }}>
          {loading ? 'Loading machine data...' : 'Data loaded successfully'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC machine dashboard with realistic loading states',
      },
    },
  },
};