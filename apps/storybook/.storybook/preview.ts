import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// Import global CSS
import '../../../packages/theme/src/css/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        // Add custom viewports for CNC interfaces
        cncMobile: {
          name: 'CNC Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        cncTablet: {
          name: 'CNC Tablet',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        cncDesktop: {
          name: 'CNC Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;