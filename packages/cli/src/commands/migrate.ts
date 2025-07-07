#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

interface MigrationConfig {
  source: string;
  target: string;
  components: string[];
  updateImports: boolean;
  createBackup: boolean;
}

program
  .command('migrate')
  .description('Migration utilities for moving components to ui-library')
  .option('-s, --source <path>', 'Source directory path')
  .option('-t, --target <path>', 'Target directory path')
  .option('--no-backup', 'Skip creating backup')
  .option('--no-imports', 'Skip updating import statements')
  .action(async (options) => {
    try {
      await runMigration(options);
    } catch (error) {
      console.error(chalk.red('❌ Migration failed:'), error);
      process.exit(1);
    }
  });

async function runMigration(options: any): Promise<void> {
  console.log(chalk.blue('🚀 Starting component migration...'));

  const config = await getMigrationConfig(options);
  
  if (config.createBackup) {
    await createBackup(config.source);
  }

  await migrateComponents(config);
  
  if (config.updateImports) {
    await updateImportStatements(config);
  }

  console.log(chalk.green('✅ Migration completed successfully!'));
  generateMigrationReport(config);
}

async function getMigrationConfig(options: any): Promise<MigrationConfig> {
  const questions = [];

  if (!options.source) {
    questions.push({
      type: 'input',
      name: 'source',
      message: 'Source directory (where components are currently located):',
      default: './src/components',
      validate: async (input: string) => {
        if (!input) return 'Source path is required';
        if (!await fs.pathExists(input)) {
          return 'Source directory does not exist';
        }
        return true;
      }
    });
  }

  if (!options.target) {
    questions.push({
      type: 'input',
      name: 'target',
      message: 'Target directory (ui-library package location):',
      default: './packages/core/src',
      validate: (input: string) => {
        if (!input) return 'Target path is required';
        return true;
      }
    });
  }

  const answers = await inquirer.prompt(questions);

  // Discover components to migrate
  const sourcePath = options.source || answers.source;
  const components = await discoverComponents(sourcePath);

  const { selectedComponents } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedComponents',
      message: 'Select components to migrate:',
      choices: components.map(comp => ({ name: comp, value: comp })),
      validate: (input: string[]) => {
        if (input.length === 0) return 'Please select at least one component';
        return true;
      }
    }
  ]);

  return {
    source: sourcePath,
    target: options.target || answers.target,
    components: selectedComponents,
    updateImports: options.imports !== false,
    createBackup: options.backup !== false,
  };
}

async function discoverComponents(sourcePath: string): Promise<string[]> {
  const components: string[] = [];
  
  try {
    const items = await fs.readdir(sourcePath);
    
    for (const item of items) {
      const itemPath = path.join(sourcePath, item);
      const stats = await fs.stat(itemPath);
      
      if (stats.isDirectory()) {
        // Check if it's a component directory (contains index.ts or ComponentName.tsx)
        const files = await fs.readdir(itemPath);
        const hasIndexFile = files.includes('index.ts') || files.includes('index.tsx');
        const hasComponentFile = files.some(file => 
          file.endsWith('.tsx') && file !== 'index.tsx'
        );
        
        if (hasIndexFile || hasComponentFile) {
          components.push(item);
        }
      }
    }
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not read source directory'));
  }
  
  return components.sort();
}

async function createBackup(sourcePath: string): Promise<void> {
  console.log(chalk.blue('💾 Creating backup...'));
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${sourcePath}-backup-${timestamp}`;
  
  await fs.copy(sourcePath, backupPath);
  console.log(chalk.green(`✅ Backup created: ${backupPath}`));
}

async function migrateComponents(config: MigrationConfig): Promise<void> {
  console.log(chalk.blue('📦 Migrating components...'));

  for (const component of config.components) {
    console.log(chalk.blue(`  📁 Migrating ${component}...`));
    
    const sourcePath = path.join(config.source, component);
    const targetPath = await getTargetPath(config.target, component);
    
    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));
    
    // Copy component files
    await fs.copy(sourcePath, targetPath);
    
    // Update component imports and exports
    await updateComponentFiles(targetPath);
    
    console.log(chalk.green(`    ✅ ${component} migrated`));
  }
}

async function getTargetPath(basePath: string, componentName: string): Promise<string> {
  // Determine the appropriate subdirectory based on component analysis
  const componentPath = path.join(basePath, 'primitives', componentName);
  
  // In a real implementation, you might analyze the component to determine
  // if it should go in primitives/, complex/, animated/, etc.
  
  return componentPath;
}

async function updateComponentFiles(componentPath: string): Promise<void> {
  const files = await fs.readdir(componentPath);
  
  for (const file of files) {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(componentPath, file);
      await updateFileImports(filePath);
    }
  }
}

async function updateFileImports(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf8');
  
  // Update common import patterns
  let updatedContent = content
    // Update theme imports
    .replace(
      /from ['"](\.\.\/)+theme['"]|from ['"](\.\.\/)+ui\/theme['"]/g,
      "from '@whttlr/ui-theme'"
    )
    // Update core component imports
    .replace(
      /from ['"](\.\.\/)+components\/([^'"]+)['"]/g,
      "from '@whttlr/ui-core'"
    )
    // Update testing imports
    .replace(
      /from ['"](\.\.\/)+test-utils['"]|from ['"](\.\.\/)+testing['"]/g,
      "from '@whttlr/ui-testing'"
    );

  if (updatedContent !== content) {
    await fs.writeFile(filePath, updatedContent);
  }
}

async function updateImportStatements(config: MigrationConfig): Promise<void> {
  console.log(chalk.blue('🔄 Updating import statements...'));

  // Find all TypeScript/JavaScript files in the project that might import the migrated components
  const projectFiles = await findProjectFiles(process.cwd());
  
  for (const file of projectFiles) {
    await updateFileComponentImports(file, config.components);
  }
}

async function findProjectFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const items = await fs.readdir(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = await fs.stat(itemPath);
    
    if (stats.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
        files.push(...await findProjectFiles(itemPath));
      }
    } else if (item.match(/\.(ts|tsx|js|jsx)$/)) {
      files.push(itemPath);
    }
  }
  
  return files;
}

async function updateFileComponentImports(filePath: string, components: string[]): Promise<void> {
  const content = await fs.readFile(filePath, 'utf8');
  let updatedContent = content;
  
  for (const component of components) {
    // Update relative imports to the migrated component
    const importPattern = new RegExp(
      `from ['"](.*/)?components/${component}['"]`,
      'g'
    );
    
    updatedContent = updatedContent.replace(
      importPattern,
      "from '@whttlr/ui-core'"
    );
  }
  
  if (updatedContent !== content) {
    await fs.writeFile(filePath, updatedContent);
  }
}

function generateMigrationReport(config: MigrationConfig): void {
  console.log(chalk.blue('\n📊 Migration Report:'));
  console.log(chalk.green(`  • Migrated ${config.components.length} components`));
  console.log(chalk.blue('  • Components moved:'));
  
  config.components.forEach(component => {
    console.log(chalk.gray(`    - ${component}`));
  });
  
  console.log(chalk.blue('\n📝 Next Steps:'));
  console.log(chalk.gray('  1. Update package.json dependencies'));
  console.log(chalk.gray('  2. Run tests to verify migration'));
  console.log(chalk.gray('  3. Update documentation if needed'));
  console.log(chalk.gray('  4. Commit changes to version control'));
  
  console.log(chalk.blue('\n💡 Package Usage:'));
  console.log(chalk.gray('  npm install @whttlr/ui-core @whttlr/ui-theme'));
  console.log(chalk.gray("  import { ComponentName } from '@whttlr/ui-core';"));
}

export default program;