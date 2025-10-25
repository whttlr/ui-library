import type { Meta, StoryObj } from '@storybook/react';
import { Grid12 } from './Grid12';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { tokens } from '../../tokens/tokens';

const meta: Meta<typeof Grid12> = {
  title: 'Primitives/Grid12',
  component: Grid12,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Grid12 - 12-Column Grid System

A flexible 12-column grid layout system with responsive breakpoints and token-based spacing.

## Features
- **12-column system** - Industry-standard grid layout
- **Responsive breakpoints** - Mobile-first responsive design
- **Token-based spacing** - Consistent gaps using design tokens
- **Flexible spanning** - Items can span any number of columns
- **Easy to use** - Simple API with compound component pattern

## Usage
\`\`\`tsx
<Grid12 gap="md" padding>
  <Grid12.Item span={6}>
    <Card>Half width</Card>
  </Grid12.Item>
  <Grid12.Item span={6}>
    <Card>Half width</Card>
  </Grid12.Item>
</Grid12>
\`\`\`

## Responsive Design
\`\`\`tsx
<Grid12.Item
  span={12}      // Full width on mobile
  spanMd={6}     // Half width on tablet
  spanLg={4}     // Third width on desktop
>
  <Card>Responsive</Card>
</Grid12.Item>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid12>;

// Demo card for examples
const DemoCard = ({ children, height = '100px' }: { children: React.ReactNode; height?: string }) => (
  <Card
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.bg.secondary,
      border: `1px solid ${tokens.colors.border.default}`,
    }}
  >
    <div style={{
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.text.secondary,
      textAlign: 'center',
    }}>
      {children}
    </div>
  </Card>
);

/**
 * Basic 12-column grid with equal-width items
 */
export const Basic: Story = {
  render: () => (
    <Grid12 gap="md">
      <Grid12.Item span={12}>
        <DemoCard>12 columns (full width)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={6}>
        <DemoCard>6 columns (half)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={6}>
        <DemoCard>6 columns (half)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={4}>
        <DemoCard>4 columns (third)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={4}>
        <DemoCard>4 columns (third)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={4}>
        <DemoCard>4 columns (third)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={3}>
        <DemoCard>3 cols (quarter)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={3}>
        <DemoCard>3 cols (quarter)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={3}>
        <DemoCard>3 cols (quarter)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={3}>
        <DemoCard>3 cols (quarter)</DemoCard>
      </Grid12.Item>
    </Grid12>
  ),
};

/**
 * Responsive grid that adapts to screen size
 */
export const Responsive: Story = {
  render: () => (
    <Grid12 gap="md">
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={4}>
        <DemoCard height="120px">
          12 cols mobile<br />
          6 cols tablet<br />
          4 cols desktop
        </DemoCard>
      </Grid12.Item>
    </Grid12>
  ),
};

/**
 * Different gap sizes for spacing control
 */
export const GapSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: none
        </h3>
        <Grid12 gap="none">
          <Grid12.Item span={4}><DemoCard>No gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>No gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>No gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: xs (4px)
        </h3>
        <Grid12 gap="xs">
          <Grid12.Item span={4}><DemoCard>xs gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>xs gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>xs gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: sm (8px)
        </h3>
        <Grid12 gap="sm">
          <Grid12.Item span={4}><DemoCard>sm gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>sm gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>sm gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: md (12px)
        </h3>
        <Grid12 gap="md">
          <Grid12.Item span={4}><DemoCard>md gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>md gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>md gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: base (16px)
        </h3>
        <Grid12 gap="base">
          <Grid12.Item span={4}><DemoCard>base gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>base gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>base gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: lg (24px)
        </h3>
        <Grid12 gap="lg">
          <Grid12.Item span={4}><DemoCard>lg gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>lg gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>lg gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Gap: xl (32px)
        </h3>
        <Grid12 gap="xl">
          <Grid12.Item span={4}><DemoCard>xl gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>xl gap</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>xl gap</DemoCard></Grid12.Item>
        </Grid12>
      </div>
    </div>
  ),
};

/**
 * Independent row and column gaps
 */
export const SeparateGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Row gap: lg, Column gap: sm
        </h3>
        <Grid12 rowGap="lg" columnGap="sm">
          <Grid12.Item span={4}><DemoCard>Item 1</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 2</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 3</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 4</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 5</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 6</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          Row gap: sm, Column gap: lg
        </h3>
        <Grid12 rowGap="sm" columnGap="lg">
          <Grid12.Item span={4}><DemoCard>Item 1</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 2</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 3</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 4</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 5</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 6</DemoCard></Grid12.Item>
        </Grid12>
      </div>
    </div>
  ),
};

/**
 * Grid with container padding
 */
export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          With default padding (base = 16px)
        </h3>
        <Grid12 gap="md" padding style={{ backgroundColor: tokens.colors.bg.tertiary }}>
          <Grid12.Item span={4}><DemoCard>Item 1</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 2</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 3</DemoCard></Grid12.Item>
        </Grid12>
      </div>

      <div>
        <h3 style={{ marginBottom: tokens.spacing.md, color: tokens.colors.text.primary }}>
          With large padding (lg = 24px)
        </h3>
        <Grid12 gap="md" padding paddingSize="lg" style={{ backgroundColor: tokens.colors.bg.tertiary }}>
          <Grid12.Item span={4}><DemoCard>Item 1</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 2</DemoCard></Grid12.Item>
          <Grid12.Item span={4}><DemoCard>Item 3</DemoCard></Grid12.Item>
        </Grid12>
      </div>
    </div>
  ),
};

/**
 * Complex asymmetric layout
 */
export const AsymmetricLayout: Story = {
  render: () => (
    <Grid12 gap="md">
      <Grid12.Item span={8}>
        <DemoCard height="200px">Main content (8 columns)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={4}>
        <DemoCard height="200px">Sidebar (4 columns)</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={3}>
        <DemoCard>3 cols</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={9}>
        <DemoCard>9 cols</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={7}>
        <DemoCard>7 cols</DemoCard>
      </Grid12.Item>
      <Grid12.Item span={5}>
        <DemoCard>5 cols</DemoCard>
      </Grid12.Item>
    </Grid12>
  ),
};

/**
 * Dashboard layout example
 */
export const DashboardLayout: Story = {
  render: () => (
    <Grid12 gap="base" padding>
      {/* Header spanning full width */}
      <Grid12.Item span={12}>
        <Card style={{ padding: tokens.spacing.lg }}>
          <h2 style={{ margin: 0, color: tokens.colors.text.primary }}>Dashboard Header</h2>
        </Card>
      </Grid12.Item>

      {/* Metric cards - 4 columns each on desktop */}
      <Grid12.Item span={12} spanMd={6} spanLg={3}>
        <Card style={{ padding: tokens.spacing.base }}>
          <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary }}>
            Total Jobs
          </div>
          <div style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.primary }}>
            1,234
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={3}>
        <Card style={{ padding: tokens.spacing.base }}>
          <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary }}>
            Active
          </div>
          <div style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.success }}>
            45
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={3}>
        <Card style={{ padding: tokens.spacing.base }}>
          <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary }}>
            Completed
          </div>
          <div style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.primary }}>
            1,189
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6} spanLg={3}>
        <Card style={{ padding: tokens.spacing.base }}>
          <div style={{ fontSize: tokens.typography.fontSize.sm, color: tokens.colors.text.secondary }}>
            Failed
          </div>
          <div style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.error }}>
            12
          </div>
        </Card>
      </Grid12.Item>

      {/* Main content and sidebar */}
      <Grid12.Item span={12} spanLg={8}>
        <Card style={{ padding: tokens.spacing.lg, minHeight: '400px' }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Recent Activity</h3>
          <p style={{ color: tokens.colors.text.secondary }}>Main content area spanning 8 columns on desktop</p>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanLg={4}>
        <Card style={{ padding: tokens.spacing.lg, minHeight: '400px' }}>
          <h3 style={{ marginTop: 0, color: tokens.colors.text.primary }}>Quick Stats</h3>
          <p style={{ color: tokens.colors.text.secondary }}>Sidebar spanning 4 columns on desktop</p>
        </Card>
      </Grid12.Item>
    </Grid12>
  ),
};

/**
 * Form layout with responsive columns
 */
export const FormLayout: Story = {
  render: () => (
    <Grid12 gap="base" padding paddingSize="lg">
      <Grid12.Item span={12}>
        <h2 style={{ margin: 0, marginBottom: tokens.spacing.base, color: tokens.colors.text.primary }}>
          User Information Form
        </h2>
      </Grid12.Item>

      {/* Full width field */}
      <Grid12.Item span={12}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            Full Name
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field (full width)
          </div>
        </Card>
      </Grid12.Item>

      {/* Two half-width fields */}
      <Grid12.Item span={12} spanMd={6}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            Email
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field (half width on tablet+)
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={6}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            Phone
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field (half width on tablet+)
          </div>
        </Card>
      </Grid12.Item>

      {/* Three equal fields */}
      <Grid12.Item span={12} spanMd={4}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            City
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={4}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            State
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field
          </div>
        </Card>
      </Grid12.Item>
      <Grid12.Item span={12} spanMd={4}>
        <Card style={{ padding: tokens.spacing.base }}>
          <label style={{ display: 'block', marginBottom: tokens.spacing.xs, color: tokens.colors.text.primary }}>
            ZIP
          </label>
          <div style={{ padding: tokens.spacing.sm, backgroundColor: tokens.colors.bg.tertiary, borderRadius: tokens.radius.base }}>
            Input field
          </div>
        </Card>
      </Grid12.Item>

      {/* Submit button - full width on mobile, auto on desktop */}
      <Grid12.Item span={12}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacing.sm }}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </div>
      </Grid12.Item>
    </Grid12>
  ),
};

/**
 * All possible column spans (1-12)
 */
export const AllSpans: Story = {
  render: () => (
    <Grid12 gap="sm">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((span) => (
        <Grid12.Item key={span} span={span as Grid12Span}>
          <DemoCard>{span} column{span > 1 ? 's' : ''}</DemoCard>
        </Grid12.Item>
      ))}
    </Grid12>
  ),
};
