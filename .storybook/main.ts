import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-essentials')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },
  async viteFinal(config) {
    // Add workspace package aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@whttlr/ui-core': join(__dirname, '../packages/core/src'),
      '@whttlr/ui-theme': join(__dirname, '../packages/theme/src'),
      '@whttlr/ui-adapters': join(__dirname, '../packages/adapters/src'),
      '@whttlr/ui-cnc': join(__dirname, '../packages/cnc/src'),
      '@whttlr/ui-testing': join(__dirname, '../packages/testing/src'),
      '@whttlr/ui-icons': join(__dirname, '../packages/icons/src'),
    };

    // PostCSS config will be picked up from postcss.config.js

    return config;
  }
};
export default config;