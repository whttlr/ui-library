import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Super simple button component to test rendering
const SimpleButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    style={{
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    {label}
  </button>
);

const meta: Meta<typeof SimpleButton> = {
  title: 'Test/SimpleButton',
  component: SimpleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me!',
  },
};

export const LongText: Story = {
  args: {
    label: 'This is a button with longer text',
  },
};