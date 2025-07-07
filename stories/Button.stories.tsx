import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@whttlr/ui-core';

const meta: Meta<typeof Button> = {
  title: 'UI Library/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Emergency: Story = {
  args: {
    children: 'EMERGENCY STOP',
    variant: 'emergency',
  },
};