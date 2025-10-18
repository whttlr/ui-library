#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComponentMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'whttlr-ui-components',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Cache for component data
    this.componentCache = null;
    this.cacheTimestamp = null;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    this.watchers = new Map();
    
    this.setupToolHandlers();
    this.setupFileWatching();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'list-components',
            description: 'List all available UI components in the library with their categories',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Filter components by category (primitives, complex, animated, cnc, mobile)',
                  enum: ['primitives', 'complex', 'animated', 'cnc', 'mobile', 'adapters']
                },
                package: {
                  type: 'string',
                  description: 'Filter components by package name',
                  enum: ['core', 'cnc', 'adapters', 'icons', 'theme']
                },
                forceRefresh: {
                  type: 'boolean',
                  description: 'Force refresh the component cache',
                  default: false
                }
              },
            },
          },
          {
            name: 'get-component-details',
            description: 'Get detailed information about a specific component including README, props, and usage examples',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component to get details for',
                },
                includeStory: {
                  type: 'boolean',
                  description: 'Include Storybook story content if available',
                  default: false
                },
                includeTests: {
                  type: 'boolean',
                  description: 'Include test files content if available',
                  default: false
                }
              },
              required: ['componentName'],
            },
          },
          {
            name: 'refresh-cache',
            description: 'Manually refresh the component cache to detect new components',
            inputSchema: {
              type: 'object',
              properties: {
                verbose: {
                  type: 'boolean',
                  description: 'Show detailed information about the refresh process',
                  default: false
                }
              },
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'list-components':
          return await this.listComponents(request.params.arguments || {});
        case 'get-component-details':
          return await this.getComponentDetails(request.params.arguments || {});
        case 'refresh-cache':
          return await this.refreshCache(request.params.arguments || {});
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  async listComponents(args) {
    const { category, package: packageFilter, forceRefresh = false } = args;
    
    try {
      // Get components from cache or scan filesystem
      const allComponents = await this.getComponentsFromCache(forceRefresh);
      
      // Filter by package if specified
      let filteredComponents = allComponents;
      if (packageFilter) {
        filteredComponents = allComponents.filter(comp => comp.package === packageFilter);
      }
      
      // Filter by category if specified
      if (category) {
        filteredComponents = filteredComponents.filter(comp => comp.category === category);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              total: filteredComponents.length,
              cached: !forceRefresh && this.isCacheValid(),
              cacheTimestamp: this.cacheTimestamp,
              components: filteredComponents.map(comp => ({
                name: comp.name,
                package: comp.package,
                category: comp.category,
                path: comp.path,
                hasReadme: comp.hasReadme,
                hasStory: comp.hasStory,
                hasTests: comp.hasTests,
                description: comp.description
              }))
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error listing components: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async scanPackageForComponents(packagePath, packageName) {
    const components = [];
    
    try {
      const categories = await fs.readdir(packagePath, { withFileTypes: true });
      
      for (const categoryDir of categories) {
        if (!categoryDir.isDirectory()) continue;
        
        const categoryPath = path.join(packagePath, categoryDir.name);
        const categoryComponents = await this.scanCategoryForComponents(categoryPath, categoryDir.name, packageName);
        components.push(...categoryComponents);
      }
    } catch (error) {
      // Package might not exist or be accessible
      console.error(`Error scanning package ${packageName}: ${error.message}`);
    }
    
    return components;
  }

  async scanCategoryForComponents(categoryPath, categoryName, packageName) {
    const components = [];
    
    try {
      const items = await fs.readdir(categoryPath, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          // This is a component directory
          const componentPath = path.join(categoryPath, item.name);
          const component = await this.analyzeComponent(componentPath, item.name, categoryName, packageName);
          if (component) {
            components.push(component);
          }
        } else if (item.name.endsWith('.tsx') && !item.name.includes('.stories.') && !item.name.includes('.test.')) {
          // This is a component file in the category root
          const componentName = item.name.replace('.tsx', '');
          const componentFilePath = path.join(categoryPath, item.name);
          const component = await this.analyzeComponentFile(componentFilePath, componentName, categoryName, packageName);
          if (component) {
            components.push(component);
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning category ${categoryName}: ${error.message}`);
    }
    
    return components;
  }

  async analyzeComponent(componentPath, componentName, categoryName, packageName) {
    const component = {
      name: componentName,
      package: packageName,
      category: categoryName,
      path: componentPath,
      hasReadme: false,
      hasStory: false,
      hasTests: false,
      description: ''
    };

    try {
      const files = await fs.readdir(componentPath);
      
      component.hasReadme = files.some(f => f.toLowerCase() === 'readme.md');
      component.hasStory = files.some(f => f.includes('.stories.'));
      component.hasTests = files.some(f => f.includes('.test.'));

      // Try to extract description from README or component file
      if (component.hasReadme) {
        try {
          const readmeContent = await fs.readFile(path.join(componentPath, 'README.md'), 'utf-8');
          const firstLine = readmeContent.split('\n')[0];
          if (firstLine.startsWith('#')) {
            component.description = firstLine.replace(/^#+\s*/, '').trim();
          }
        } catch (error) {
          // README exists but couldn't read it
        }
      }

      // If no description from README, try to get it from the component file
      if (!component.description) {
        const componentFile = files.find(f => f === `${componentName}.tsx`);
        if (componentFile) {
          try {
            const componentContent = await fs.readFile(path.join(componentPath, componentFile), 'utf-8');
            const docComment = componentContent.match(/\/\*\*([\s\S]*?)\*\//);
            if (docComment) {
              component.description = docComment[1]
                .split('\n')
                .map(line => line.replace(/^\s*\*\s?/, ''))
                .join(' ')
                .trim()
                .split('.')[0] + '.';
            }
          } catch (error) {
            // Couldn't read component file
          }
        }
      }

      return component;
    } catch (error) {
      console.error(`Error analyzing component ${componentName}: ${error.message}`);
      return component;
    }
  }

  async analyzeComponentFile(filePath, componentName, categoryName, packageName) {
    const component = {
      name: componentName,
      package: packageName,
      category: categoryName,
      path: filePath,
      hasReadme: false,
      hasStory: false,
      hasTests: false,
      description: ''
    };

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Check for story and test files in the same directory
      const dir = path.dirname(filePath);
      const files = await fs.readdir(dir);
      component.hasStory = files.some(f => f.includes(`${componentName}.stories.`));
      component.hasTests = files.some(f => f.includes(`${componentName}.test.`));

      // Extract description from JSDoc comment
      const docComment = content.match(/\/\*\*([\s\S]*?)\*\//);
      if (docComment) {
        component.description = docComment[1]
          .split('\n')
          .map(line => line.replace(/^\s*\*\s?/, ''))
          .join(' ')
          .trim()
          .split('.')[0] + '.';
      }

      return component;
    } catch (error) {
      console.error(`Error analyzing component file ${componentName}: ${error.message}`);
      return component;
    }
  }

  async getComponentDetails(args) {
    const { componentName, includeStory = false, includeTests = false } = args;
    
    if (!componentName) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: componentName is required',
          },
        ],
        isError: true,
      };
    }

    try {
      const uiLibraryRoot = path.resolve(__dirname, '..', '..');
      const componentInfo = await this.findComponent(uiLibraryRoot, componentName);
      
      if (!componentInfo) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found`,
            },
          ],
          isError: true,
        };
      }

      const details = {
        name: componentInfo.name,
        package: componentInfo.package,
        category: componentInfo.category,
        path: componentInfo.path,
        files: {},
      };

      // Read component file
      if (componentInfo.isDirectory) {
        const componentFilePath = path.join(componentInfo.path, `${componentName}.tsx`);
        try {
          details.files.component = await fs.readFile(componentFilePath, 'utf-8');
        } catch (error) {
          details.files.component = 'Component file not found';
        }
      } else {
        details.files.component = await fs.readFile(componentInfo.path, 'utf-8');
      }

      // Read README if it exists
      if (componentInfo.hasReadme) {
        const readmePath = componentInfo.isDirectory 
          ? path.join(componentInfo.path, 'README.md')
          : path.join(path.dirname(componentInfo.path), 'README.md');
        try {
          details.files.readme = await fs.readFile(readmePath, 'utf-8');
        } catch (error) {
          details.files.readme = 'README.md exists but could not be read';
        }
      }

      // Read story file if requested and exists
      if (includeStory && componentInfo.hasStory) {
        const storyPath = componentInfo.isDirectory
          ? path.join(componentInfo.path, `${componentName}.stories.tsx`)
          : path.join(path.dirname(componentInfo.path), `${componentName}.stories.tsx`);
        try {
          details.files.story = await fs.readFile(storyPath, 'utf-8');
        } catch (error) {
          // Try other story file extensions
          const storyFiles = [
            `${componentName}.stories.ts`,
            `${componentName}.stories.jsx`,
            `${componentName}.stories.js`
          ];
          
          for (const storyFile of storyFiles) {
            try {
              const altStoryPath = componentInfo.isDirectory
                ? path.join(componentInfo.path, storyFile)
                : path.join(path.dirname(componentInfo.path), storyFile);
              details.files.story = await fs.readFile(altStoryPath, 'utf-8');
              break;
            } catch (altError) {
              continue;
            }
          }
          
          if (!details.files.story) {
            details.files.story = 'Story file exists but could not be read';
          }
        }
      }

      // Read test file if requested and exists
      if (includeTests && componentInfo.hasTests) {
        const testPath = componentInfo.isDirectory
          ? path.join(componentInfo.path, `${componentName}.test.tsx`)
          : path.join(path.dirname(componentInfo.path), `${componentName}.test.tsx`);
        try {
          details.files.test = await fs.readFile(testPath, 'utf-8');
        } catch (error) {
          // Try other test file extensions
          const testFiles = [
            `${componentName}.test.ts`,
            `${componentName}.test.jsx`,
            `${componentName}.test.js`
          ];
          
          for (const testFile of testFiles) {
            try {
              const altTestPath = componentInfo.isDirectory
                ? path.join(componentInfo.path, testFile)
                : path.join(path.dirname(componentInfo.path), testFile);
              details.files.test = await fs.readFile(altTestPath, 'utf-8');
              break;
            } catch (altError) {
              continue;
            }
          }
          
          if (!details.files.test) {
            details.files.test = 'Test file exists but could not be read';
          }
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(details, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error getting component details: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async findComponent(uiLibraryRoot, componentName) {
    const packagePaths = [
      { name: 'core', path: path.join(uiLibraryRoot, 'packages', 'core', 'src') },
      { name: 'cnc', path: path.join(uiLibraryRoot, 'packages', 'cnc', 'src') },
      { name: 'adapters', path: path.join(uiLibraryRoot, 'packages', 'adapters', 'src') },
      { name: 'icons', path: path.join(uiLibraryRoot, 'packages', 'icons', 'src') },
    ];

    for (const pkg of packagePaths) {
      try {
        const categories = await fs.readdir(pkg.path, { withFileTypes: true });
        
        for (const categoryDir of categories) {
          if (!categoryDir.isDirectory()) continue;
          
          const categoryPath = path.join(pkg.path, categoryDir.name);
          const items = await fs.readdir(categoryPath, { withFileTypes: true });
          
          // Check for component directory
          const componentDir = items.find(item => item.isDirectory() && item.name === componentName);
          if (componentDir) {
            const componentPath = path.join(categoryPath, componentName);
            const files = await fs.readdir(componentPath);
            
            return {
              name: componentName,
              package: pkg.name,
              category: categoryDir.name,
              path: componentPath,
              isDirectory: true,
              hasReadme: files.some(f => f.toLowerCase() === 'readme.md'),
              hasStory: files.some(f => f.includes('.stories.')),
              hasTests: files.some(f => f.includes('.test.')),
            };
          }
          
          // Check for component file
          const componentFile = items.find(item => !item.isDirectory() && item.name === `${componentName}.tsx`);
          if (componentFile) {
            const componentPath = path.join(categoryPath, componentFile.name);
            
            return {
              name: componentName,
              package: pkg.name,
              category: categoryDir.name,
              path: componentPath,
              isDirectory: false,
              hasReadme: items.some(item => item.name.toLowerCase() === 'readme.md'),
              hasStory: items.some(item => item.name.includes(`${componentName}.stories.`)),
              hasTests: items.some(item => item.name.includes(`${componentName}.test.`)),
            };
          }
        }
      } catch (error) {
        console.error(`Error searching in package ${pkg.name}: ${error.message}`);
        continue;
      }
    }

    return null;
  }

  // Cache management methods
  isCacheValid() {
    if (!this.componentCache || !this.cacheTimestamp) {
      return false;
    }
    
    const now = Date.now();
    return (now - this.cacheTimestamp) < this.CACHE_DURATION;
  }

  async getComponentsFromCache(forceRefresh = false) {
    if (!forceRefresh && this.isCacheValid()) {
      return this.componentCache;
    }

    // Cache is invalid or force refresh requested - scan filesystem
    const components = await this.scanAllComponents();
    this.componentCache = components;
    this.cacheTimestamp = Date.now();
    
    return components;
  }

  async scanAllComponents() {
    const components = [];
    const uiLibraryRoot = path.resolve(__dirname, '..', '..');
    
    // Define package paths to search
    const packagePaths = [
      { name: 'core', path: path.join(uiLibraryRoot, 'packages', 'core', 'src') },
      { name: 'cnc', path: path.join(uiLibraryRoot, 'packages', 'cnc', 'src') },
      { name: 'adapters', path: path.join(uiLibraryRoot, 'packages', 'adapters', 'src') },
      { name: 'icons', path: path.join(uiLibraryRoot, 'packages', 'icons', 'src') },
    ];

    for (const pkg of packagePaths) {
      const components_in_package = await this.scanPackageForComponents(pkg.path, pkg.name);
      components.push(...components_in_package);
    }

    return components;
  }

  async refreshCache(args) {
    const { verbose = false } = args;
    
    try {
      const startTime = Date.now();
      const oldCount = this.componentCache ? this.componentCache.length : 0;
      
      // Force refresh the cache
      const components = await this.getComponentsFromCache(true);
      const newCount = components.length;
      const scanTime = Date.now() - startTime;
      
      const result = {
        success: true,
        message: `Cache refreshed successfully`,
        componentsFound: newCount,
        scanTime: `${scanTime}ms`,
        cacheTimestamp: this.cacheTimestamp,
        changes: {
          added: newCount - oldCount,
          previous: oldCount,
          current: newCount
        }
      };
      
      if (verbose) {
        result.components = components.map(comp => ({
          name: comp.name,
          package: comp.package,
          category: comp.category,
          hasReadme: comp.hasReadme,
          hasStory: comp.hasStory,
          hasTests: comp.hasTests
        }));
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error refreshing cache: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  // File watching setup
  setupFileWatching() {
    const uiLibraryRoot = path.resolve(__dirname, '..', '..');
    const packagePaths = [
      path.join(uiLibraryRoot, 'packages', 'core', 'src'),
      path.join(uiLibraryRoot, 'packages', 'cnc', 'src'),
      path.join(uiLibraryRoot, 'packages', 'adapters', 'src'),
      path.join(uiLibraryRoot, 'packages', 'icons', 'src'),
    ];

    for (const packagePath of packagePaths) {
      try {
        const watcher = watch(packagePath, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.tsx') || filename.endsWith('.md') || filename.includes('.stories.') || filename.includes('.test.'))) {
            console.error(`File ${eventType}: ${filename} - invalidating cache`);
            this.invalidateCache();
          }
        });
        
        this.watchers.set(packagePath, watcher);
      } catch (error) {
        console.error(`Could not watch ${packagePath}: ${error.message}`);
      }
    }
  }

  invalidateCache() {
    this.componentCache = null;
    this.cacheTimestamp = null;
  }

  cleanup() {
    // Clean up file watchers
    for (const [path, watcher] of this.watchers) {
      try {
        watcher.close();
        console.error(`Closed watcher for ${path}`);
      } catch (error) {
        console.error(`Error closing watcher for ${path}: ${error.message}`);
      }
    }
    this.watchers.clear();
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Whttlr UI Components MCP Server running on stdio');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.error('Received SIGINT, cleaning up...');
      this.cleanup();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.error('Received SIGTERM, cleaning up...');
      this.cleanup();
      process.exit(0);
    });
  }
}

const server = new ComponentMCPServer();
server.run().catch(console.error);