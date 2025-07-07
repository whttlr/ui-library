import type { Meta, StoryObj } from '@storybook/react';

// Extremely simple test component with zero dependencies
const TestButton = ({ text }: { text: string }) => (
  <button style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
    {text}
  </button>
);

const meta: Meta<typeof TestButton> = {
  title: 'Test/TestButton',
  component: TestButton,
};

export default meta;
type Story = StoryObj<typeof TestButton>;

export const Basic: Story = {
  args: {
    text: 'Hello World',
  },
};