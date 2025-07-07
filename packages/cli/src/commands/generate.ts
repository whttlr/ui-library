#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import mustache from 'mustache';

const program = new Command();

interface ComponentConfig {
  name: string;
  type: 'primitive' | 'complex' | 'animated' | 'mobile' | 'cnc';
  includeStory: boolean;
  includeTest: boolean;
  includeStyles: boolean;
  variant?: string;
}

program
  .command('generate')
  .alias('g')
  .description('Generate a new UI component')
  .option('-n, --name <name>', 'Component name')
  .option('-t, --type <type>', 'Component type (primitive|complex|animated|mobile|cnc)')
  .option('--no-story', 'Skip Storybook story generation')
  .option('--no-test', 'Skip test file generation')
  .option('--no-styles', 'Skip styles file generation')
  .action(async (options) => {
    try {
      const config = await getComponentConfig(options);
      await generateComponent(config);
      
      console.log(chalk.green('✅ Component generated successfully!'));
      console.log(chalk.blue('📁 Files created:'));
      
      const basePath = getComponentPath(config);
      console.log(chalk.gray(`   ${basePath}/${config.name}.tsx`));
      console.log(chalk.gray(`   ${basePath}/index.ts`));
      
      if (config.includeTest) {
        console.log(chalk.gray(`   ${basePath}/${config.name}.test.tsx`));
      }
      
      if (config.includeStory) {
        console.log(chalk.gray(`   ${basePath}/${config.name}.stories.tsx`));
      }
      
      if (config.includeStyles) {
        console.log(chalk.gray(`   ${basePath}/${config.name}.module.css`));
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error generating component:'), error);
      process.exit(1);
    }
  });

async function getComponentConfig(options: any): Promise<ComponentConfig> {
  const questions = [];
  
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Component name:',
      validate: (input: string) => {
        if (!input) return 'Component name is required';
        if (!/^[A-Z][A-Za-z0-9]*$/.test(input)) {
          return 'Component name must be PascalCase (e.g., MyComponent)';
        }
        return true;
      }
    });
  }
  
  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'Component type:',
      choices: [
        { name: 'Primitive - Basic building block (Button, Input, Card)', value: 'primitive' },
        { name: 'Complex - Advanced component (DataTable, Form, Modal)', value: 'complex' },
        { name: 'Animated - Motion-enhanced component', value: 'animated' },
        { name: 'Mobile - Touch-optimized component', value: 'mobile' },
        { name: 'CNC - Industrial control component', value: 'cnc' },
      ]
    });
  }
  
  const answers = await inquirer.prompt(questions);
  
  return {
    name: options.name || answers.name,
    type: options.type || answers.type,
    includeStory: options.story !== false,
    includeTest: options.test !== false,
    includeStyles: options.styles !== false,
  };
}

function getComponentPath(config: ComponentConfig): string {
  const basePath = path.resolve(process.cwd());
  
  // Try to detect if we're in the ui-library repo
  if (fs.existsSync(path.join(basePath, 'packages'))) {
    switch (config.type) {
      case 'primitive':
        return path.join(basePath, 'packages/core/src/primitives', config.name);
      case 'complex':
        return path.join(basePath, 'packages/core/src/complex', config.name);
      case 'animated':
        return path.join(basePath, 'packages/core/src/animated', config.name);
      case 'mobile':
        return path.join(basePath, 'packages/core/src/mobile', config.name);
      case 'cnc':
        return path.join(basePath, 'packages/cnc/src/controls', config.name);
    }
  }
  
  // Fallback to current directory
  return path.join(basePath, 'components', config.name);
}

async function generateComponent(config: ComponentConfig): Promise<void> {
  const componentDir = getComponentPath(config);
  
  // Ensure directory exists
  await fs.ensureDir(componentDir);
  
  // Generate component file
  await generateComponentFile(config, componentDir);
  
  // Generate index file
  await generateIndexFile(config, componentDir);
  
  // Generate test file
  if (config.includeTest) {
    await generateTestFile(config, componentDir);
  }
  
  // Generate story file
  if (config.includeStory) {
    await generateStoryFile(config, componentDir);
  }
  
  // Generate styles file
  if (config.includeStyles) {
    await generateStylesFile(config, componentDir);
  }
}

async function generateComponentFile(config: ComponentConfig, dir: string): Promise<void> {
  const template = await fs.readFile(
    path.join(__dirname, '../templates/component.tsx.mustache'),
    'utf8'
  );
  
  const rendered = mustache.render(template, {
    componentName: config.name,
    componentType: config.type,
    includeStyles: config.includeStyles,
    isCNC: config.type === 'cnc',
    isAnimated: config.type === 'animated',
    isMobile: config.type === 'mobile',
  });
  
  await fs.writeFile(path.join(dir, `${config.name}.tsx`), rendered);
}

async function generateIndexFile(config: ComponentConfig, dir: string): Promise<void> {
  const template = await fs.readFile(
    path.join(__dirname, '../templates/index.ts.mustache'),
    'utf8'
  );
  
  const rendered = mustache.render(template, {
    componentName: config.name,
  });
  
  await fs.writeFile(path.join(dir, 'index.ts'), rendered);
}

async function generateTestFile(config: ComponentConfig, dir: string): Promise<void> {
  const template = await fs.readFile(
    path.join(__dirname, '../templates/test.tsx.mustache'),
    'utf8'
  );
  
  const rendered = mustache.render(template, {
    componentName: config.name,
    componentType: config.type,
    isCNC: config.type === 'cnc',
    isMobile: config.type === 'mobile',
  });
  
  await fs.writeFile(path.join(dir, `${config.name}.test.tsx`), rendered);
}

async function generateStoryFile(config: ComponentConfig, dir: string): Promise<void> {
  const template = await fs.readFile(
    path.join(__dirname, '../templates/story.tsx.mustache'),
    'utf8'
  );
  
  const storyPath = config.type === 'cnc' ? 'CNC' : 
                   config.type === 'primitive' ? 'Core/Primitives' :
                   config.type === 'complex' ? 'Core/Complex' :
                   config.type === 'animated' ? 'Core/Animated' :
                   config.type === 'mobile' ? 'Core/Mobile' : 'Core';
  
  const rendered = mustache.render(template, {
    componentName: config.name,
    componentType: config.type,
    storyPath,
    isCNC: config.type === 'cnc',
    isAnimated: config.type === 'animated',
    isMobile: config.type === 'mobile',
  });
  
  await fs.writeFile(path.join(dir, `${config.name}.stories.tsx`), rendered);
}

async function generateStylesFile(config: ComponentConfig, dir: string): Promise<void> {
  const template = await fs.readFile(
    path.join(__dirname, '../templates/styles.css.mustache'),
    'utf8'
  );
  
  const rendered = mustache.render(template, {
    componentName: config.name,
    componentType: config.type,
  });
  
  await fs.writeFile(path.join(dir, `${config.name}.module.css`), rendered);
}

export default program;