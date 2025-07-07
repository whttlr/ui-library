/**
 * @whttlr/ui-cli
 * 
 * Command-line interface for Whttlr UI component library.
 * Provides tools for generating components, managing themes, and migration.
 */

export { default as generateCommand } from './commands/generate';
export { default as themeCommand } from './commands/theme';
export { default as migrateCommand } from './commands/migrate';