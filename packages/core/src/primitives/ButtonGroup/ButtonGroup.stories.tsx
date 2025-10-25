import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { tokens } from '../../tokens/tokens';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Primitives/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ButtonGroup - Button Layout Manager

Manages layout and spacing for groups of buttons with support for various alignments,
orientations, and sizing options.

## Features
- **Flexible alignment** - Left, center, right, space-between
- **Multiple orientations** - Horizontal or vertical layouts
- **Sizing options** - Full width, split (equal width), or auto
- **Attached mode** - Buttons with shared borders
- **Section support** - Organize buttons into logical groups
- **Token-based spacing** - Consistent gaps using design tokens

## Usage
\`\`\`tsx
<ButtonGroup align="right" gap="sm">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Submit</Button>
</ButtonGroup>
\`\`\`

## With Sections
\`\`\`tsx
<ButtonGroup align="space-between">
  <ButtonGroup.Section>
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </ButtonGroup.Section>
  <ButtonGroup.Section>
    <Button variant="primary">Submit</Button>
  </ButtonGroup.Section>
</ButtonGroup>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * Basic horizontal button group with default settings
 */
export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Cancel</Button>
      <Button variant="outline">Reset</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};

/**
 * Different alignment options
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Left Aligned (default)</h3>
        <ButtonGroup align="left">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Center Aligned</h3>
        <ButtonGroup align="center">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Right Aligned</h3>
        <ButtonGroup align="right">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Space Between</h3>
        <ButtonGroup align="space-between">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Vertical orientation for stacked buttons
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base, flex: 1 }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Vertical Layout</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Action 1</Button>
          <Button variant="outline">Action 2</Button>
          <Button variant="outline">Action 3</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base, flex: 1 }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Vertical Full Width</h3>
        <ButtonGroup orientation="vertical" fullWidth>
          <Button variant="outline">Action 1</Button>
          <Button variant="outline">Action 2</Button>
          <Button variant="outline">Action 3</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Full width buttons spanning entire container
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Full Width Horizontal
        </h3>
        <ButtonGroup fullWidth orientation="horizontal">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Full Width Vertical
        </h3>
        <ButtonGroup fullWidth orientation="vertical">
          <Button variant="outline">Action 1</Button>
          <Button variant="outline">Action 2</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Split buttons taking equal width
 */
export const Split: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Split (2 buttons - 50% each)
        </h3>
        <ButtonGroup split>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Split (3 buttons - 33% each)
        </h3>
        <ButtonGroup split>
          <Button variant="outline">Action 1</Button>
          <Button variant="outline">Action 2</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Split (4 buttons - 25% each)
        </h3>
        <ButtonGroup split>
          <Button variant="outline">Q1</Button>
          <Button variant="outline">Q2</Button>
          <Button variant="outline">Q3</Button>
          <Button variant="primary">Q4</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Different gap sizes
 */
export const GapSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Gap: none</h3>
        <ButtonGroup gap="none">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="primary">Button 3</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Gap: xs (4px)</h3>
        <ButtonGroup gap="xs">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="primary">Button 3</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Gap: sm (8px) - default</h3>
        <ButtonGroup gap="sm">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="primary">Button 3</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Gap: md (12px)</h3>
        <ButtonGroup gap="md">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="primary">Button 3</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Gap: base (16px)</h3>
        <ButtonGroup gap="base">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="primary">Button 3</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Attached buttons with shared borders
 */
export const Attached: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Attached Horizontal
        </h3>
        <ButtonGroup attached>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Attached Vertical
        </h3>
        <ButtonGroup attached orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Attached with Primary
        </h3>
        <ButtonGroup attached>
          <Button variant="outline">Option 1</Button>
          <Button variant="outline">Option 2</Button>
          <Button variant="primary">Selected</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Using sections to organize buttons
 */
export const WithSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Sections with Space Between
        </h3>
        <ButtonGroup align="space-between">
          <ButtonGroup.Section>
            <Button variant="outline">Delete</Button>
            <Button variant="outline">Archive</Button>
          </ButtonGroup.Section>
          <ButtonGroup.Section>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup.Section>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Multiple Sections
        </h3>
        <ButtonGroup align="space-between">
          <ButtonGroup.Section gap="xs">
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup.Section>
          <ButtonGroup.Section gap="xs">
            <Button variant="outline">Bold</Button>
            <Button variant="outline">Italic</Button>
            <Button variant="outline">Underline</Button>
          </ButtonGroup.Section>
          <ButtonGroup.Section>
            <Button variant="primary">Save</Button>
          </ButtonGroup.Section>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Form action buttons - common use case
 */
export const FormActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Standard Form Footer (Right Aligned)
        </h3>
        <div style={{ padding: tokens.spacing.lg, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base, marginBottom: tokens.spacing.md }}>
          <p style={{ color: tokens.colors.text.secondary, margin: 0 }}>Form content goes here...</p>
        </div>
        <ButtonGroup align="right">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Multi-Action Form
        </h3>
        <div style={{ padding: tokens.spacing.lg, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base, marginBottom: tokens.spacing.md }}>
          <p style={{ color: tokens.colors.text.secondary, margin: 0 }}>Form content goes here...</p>
        </div>
        <ButtonGroup align="space-between">
          <ButtonGroup.Section>
            <Button variant="outline">Delete Draft</Button>
          </ButtonGroup.Section>
          <ButtonGroup.Section>
            <Button variant="outline">Save Draft</Button>
            <Button variant="outline">Preview</Button>
            <Button variant="primary">Publish</Button>
          </ButtonGroup.Section>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Mobile-Friendly (Full Width)
        </h3>
        <div style={{ padding: tokens.spacing.lg, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base, marginBottom: tokens.spacing.md }}>
          <p style={{ color: tokens.colors.text.secondary, margin: 0 }}>Form content goes here...</p>
        </div>
        <ButtonGroup fullWidth orientation="vertical">
          <Button variant="primary">Submit</Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Toolbar-style button groups
 */
export const Toolbar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Text Editor Toolbar
        </h3>
        <ButtonGroup gap="xs">
          <Button variant="outline" size="sm">B</Button>
          <Button variant="outline" size="sm">I</Button>
          <Button variant="outline" size="sm">U</Button>
          <div style={{ width: '1px', height: '24px', backgroundColor: tokens.colors.border.default }} />
          <Button variant="outline" size="sm">Left</Button>
          <Button variant="outline" size="sm">Center</Button>
          <Button variant="outline" size="sm">Right</Button>
          <div style={{ width: '1px', height: '24px', backgroundColor: tokens.colors.border.default }} />
          <Button variant="outline" size="sm">Link</Button>
          <Button variant="outline" size="sm">Image</Button>
        </ButtonGroup>
      </Card>

      <Card style={{ padding: tokens.spacing.base }}>
        <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>
          Attached Toolbar
        </h3>
        <ButtonGroup attached>
          <Button variant="outline" size="sm">Bold</Button>
          <Button variant="outline" size="sm">Italic</Button>
          <Button variant="outline" size="sm">Underline</Button>
          <Button variant="outline" size="sm">Strike</Button>
        </ButtonGroup>
      </Card>
    </div>
  ),
};

/**
 * Modal footer examples
 */
export const ModalFooter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <Card style={{ padding: 0 }}>
        <div style={{ padding: tokens.spacing.lg }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Confirm Action</h3>
          <p style={{ color: tokens.colors.text.secondary }}>Are you sure you want to delete this item?</p>
        </div>
        <div style={{
          padding: tokens.spacing.base,
          borderTop: `1px solid ${tokens.colors.border.default}`,
        }}>
          <ButtonGroup align="right">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </ButtonGroup>
        </div>
      </Card>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: tokens.spacing.lg }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Multi-Step Wizard</h3>
          <p style={{ color: tokens.colors.text.secondary }}>Step 2 of 3</p>
        </div>
        <div style={{
          padding: tokens.spacing.base,
          borderTop: `1px solid ${tokens.colors.border.default}`,
        }}>
          <ButtonGroup align="space-between">
            <Button variant="outline">Back</Button>
            <ButtonGroup.Section>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Next</Button>
            </ButtonGroup.Section>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  ),
};

/**
 * Card footer with bottom-aligned buttons
 */
export const CardFooter: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: tokens.spacing.base }}>
      <Card style={{ padding: 0, width: '300px' }}>
        <div style={{ padding: tokens.spacing.base }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Product Card</h3>
          <p style={{ color: tokens.colors.text.secondary, fontSize: tokens.typography.fontSize.sm }}>
            This is a product description with some details about the item.
          </p>
          <div style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.primary, marginTop: tokens.spacing.md }}>
            $99.99
          </div>
        </div>
        <div style={{
          padding: tokens.spacing.base,
          borderTop: `1px solid ${tokens.colors.border.default}`,
          marginTop: 'auto',
        }}>
          <ButtonGroup fullWidth>
            <Button variant="primary">Add to Cart</Button>
          </ButtonGroup>
        </div>
      </Card>

      <Card style={{ padding: 0, width: '300px' }}>
        <div style={{ padding: tokens.spacing.base }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Action Card</h3>
          <p style={{ color: tokens.colors.text.secondary, fontSize: tokens.typography.fontSize.sm }}>
            Choose an action for this item.
          </p>
        </div>
        <div style={{
          padding: tokens.spacing.base,
          borderTop: `1px solid ${tokens.colors.border.default}`,
        }}>
          <ButtonGroup split>
            <Button variant="outline">Details</Button>
            <Button variant="primary">Select</Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  ),
};
