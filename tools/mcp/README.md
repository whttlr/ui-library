# Whttlr UI Library MCP Server

This MCP (Model Context Protocol) server provides tools for managing and exploring components in the Whttlr UI Library.

## Quick Start

Want to get started immediately? Run these two commands:

```bash
# 1. Install MCP server dependencies
npm run mcp:install

# 2. Configure Claude Desktop automatically
npm run mcp:install-claude

# 3. Verify everything is working
npm run mcp:verify
```

Then restart Claude Desktop and ask: *"Show me all available components"*

🎉 **That's it!** Claude will now have access to your entire UI component library.

## Features

- **list-components**: List all available UI components with filtering by category and package
- **get-component-details**: Get detailed information about specific components including README, source code, stories, and tests
- **refresh-cache**: Manually refresh the component cache to detect new components
- **Auto-detection**: File watching automatically detects new components and updates the cache
- **Performance caching**: 5-minute cache improves response times for repeated requests

## Installation

### Prerequisites
- Node.js 16+ 
- Claude Desktop app installed
- Access to your UI library codebase

### Step 1: Install MCP Server Dependencies

The MCP server is automatically configured in the main package.json. To install dependencies:

```bash
npm run mcp:install
```

### Step 2: Configure Claude Desktop

#### Option A: Automatic Installation (Recommended)

Use the automated installer to configure Claude Desktop:

```bash
npm run mcp:install-claude
```

This script will:
- Detect your operating system
- Find the Claude Desktop config file
- Add the MCP server configuration automatically
- Preserve any existing MCP servers

#### Option B: Manual Installation

If the automatic installer doesn't work, configure Claude Desktop manually:

Add the MCP server to your Claude Desktop configuration:

#### On macOS:
1. Open `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add the server configuration:

```json
{
  "mcpServers": {
    "whttlr-ui-components": {
      "command": "node",
      "args": ["/absolute/path/to/your/ui-library/tools/mcp/server.js"],
      "cwd": "/absolute/path/to/your/ui-library"
    }
  }
}
```

#### On Windows:
1. Open `%APPDATA%/Claude/claude_desktop_config.json`
2. Add the server configuration:

```json
{
  "mcpServers": {
    "whttlr-ui-components": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\your\\ui-library\\tools\\mcp\\server.js"],
      "cwd": "C:\\absolute\\path\\to\\your\\ui-library"
    }
  }
}
```

#### On Linux:
1. Open `~/.config/Claude/claude_desktop_config.json`
2. Add the server configuration:

```json
{
  "mcpServers": {
    "whttlr-ui-components": {
      "command": "node",
      "args": ["/absolute/path/to/your/ui-library/tools/mcp/server.js"],
      "cwd": "/absolute/path/to/your/ui-library"
    }
  }
}
```

**Important**: Replace `/absolute/path/to/your/ui-library` with the actual absolute path to your UI library directory.

### Step 3: Restart Claude Desktop

After adding the configuration, restart Claude Desktop for the changes to take effect.

### Step 4: Verify Installation

Run the verification script to ensure everything is working:

```bash
npm run mcp:verify
```

This will check:
- MCP server files exist
- Dependencies are installed
- Claude Desktop is configured correctly
- Server responds to requests

### Step 5: Test in Claude Desktop

1. Open Claude Desktop
2. Start a new conversation
3. You should see the MCP server tools available in the tool panel
4. Look for these tools:
   - `list-components`
   - `get-component-details` 
   - `refresh-cache`

### Step 6: Try It Out!

Ask Claude any of these questions to test the integration:
- *"Show me all available components"*
- *"List the primitive components from the core package"*
- *"Show me the Button component details with its README"*
- *"What CNC components are available?"*

## Usage

### Getting Started with Claude Desktop

Once installed, you can use the MCP tools directly in Claude Desktop conversations:

#### 1. **List All Components**
Ask Claude: *"Show me all the available components"*

Claude will use the `list-components` tool and show you:
- Total number of components
- Component names, packages, and categories
- Which components have READMEs, stories, and tests

#### 2. **Filter Components**
Ask Claude: *"Show me only the primitive components from the core package"*

Claude will filter the results by category and package.

#### 3. **Get Component Details**
Ask Claude: *"Show me the details for the Button component including its README and story"*

Claude will use `get-component-details` to provide:
- Component source code
- README documentation
- Storybook stories (if requested)
- Test files (if requested)

#### 4. **Refresh Component Cache**
Ask Claude: *"Refresh the component cache to detect any new components"*

Claude will use `refresh-cache` to update the component list.

### Advanced Usage Examples

#### Exploring Components by Category
```
"List all CNC-specific components with their descriptions"
"Show me all animated components that have stories"
"What mobile components are available in the library?"
```

#### Component Analysis
```
"Compare the Button and Card components - show me their READMEs"
"Which components in the primitives category don't have tests?"
"Show me the source code for the EmergencyStop component"
```

#### Development Workflow
```
"I just added a new component called 'NewWidget'. Refresh the cache and show me if it was detected"
"List all components that have both stories and tests"
"Show me all components that are missing READMEs"
```

### Manual Server Management

You can also run the MCP server manually for development:

```bash
# Start the MCP server manually
npm run mcp:start

# Start in development mode with auto-restart
npm run mcp:dev
```

### Tool Reference

#### list-components
- **Purpose**: Browse and filter components
- **Filters**: category, package, forceRefresh
- **Output**: List with metadata

#### get-component-details  
- **Purpose**: Deep dive into specific components
- **Options**: includeStory, includeTests
- **Output**: Full component information

#### refresh-cache
- **Purpose**: Update component detection
- **Options**: verbose for detailed output
- **Output**: Cache statistics and changes

### Available Tools

#### list-components

Lists all available components in the UI library.

**Parameters:**
- `category` (optional): Filter by category (`primitives`, `complex`, `animated`, `cnc`, `mobile`, `adapters`)
- `package` (optional): Filter by package (`core`, `cnc`, `adapters`, `icons`, `theme`)
- `forceRefresh` (optional): Force refresh the component cache (default: false)

**Example:**
```json
{
  "name": "list-components",
  "arguments": {
    "category": "primitives",
    "package": "core",
    "forceRefresh": true
  }
}
```

**Response:**
```json
{
  "total": 15,
  "cached": false,
  "cacheTimestamp": 1704067200000,
  "components": [
    {
      "name": "Button",
      "package": "core",
      "category": "primitives",
      "path": "/path/to/Button",
      "hasReadme": true,
      "hasStory": true,
      "hasTests": true,
      "description": "A customizable button component with multiple variants and states"
    }
  ]
}
```

#### get-component-details

Get detailed information about a specific component.

**Parameters:**
- `componentName` (required): Name of the component
- `includeStory` (optional): Include Storybook story content (default: false)
- `includeTests` (optional): Include test file content (default: false)

**Example:**
```json
{
  "name": "get-component-details",
  "arguments": {
    "componentName": "Button",
    "includeStory": true,
    "includeTests": true
  }
}
```

**Response:**
```json
{
  "name": "Button",
  "package": "core",
  "category": "primitives",
  "path": "/path/to/Button",
  "files": {
    "component": "// Button component source code...",
    "readme": "# Button Component\n\n...",
    "story": "// Storybook stories...",
    "test": "// Test file content..."
  }
}
```

#### refresh-cache

Manually refresh the component cache to detect new components.

**Parameters:**
- `verbose` (optional): Show detailed information about the refresh process (default: false)

**Example:**
```json
{
  "name": "refresh-cache",
  "arguments": {
    "verbose": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cache refreshed successfully",
  "componentsFound": 45,
  "scanTime": "123ms",
  "cacheTimestamp": 1704067200000,
  "changes": {
    "added": 2,
    "previous": 43,
    "current": 45
  },
  "components": [
    {
      "name": "NewComponent",
      "package": "core",
      "category": "primitives",
      "hasReadme": true,
      "hasStory": true,
      "hasTests": false
    }
  ]
}
```

## Cache Management

The MCP server includes intelligent caching for optimal performance:

### Automatic Cache Management
- **5-minute cache duration**: Components are cached for 5 minutes to improve response times
- **File watching**: Automatically detects changes to `.tsx`, `.md`, `.stories.*`, and `.test.*` files
- **Auto-invalidation**: Cache is automatically cleared when component files are modified

### Manual Cache Control
- **Force refresh**: Use `forceRefresh: true` parameter in `list-components`
- **Manual refresh**: Use the `refresh-cache` tool to manually update the cache
- **Cache status**: `list-components` response includes cache status and timestamp

### When to Refresh Cache
- **After adding new components**: The file watcher should detect this automatically
- **After major structural changes**: If components are moved or renamed
- **After deployment**: To ensure all components are detected in production
- **When debugging**: To verify component detection is working correctly

## Architecture

The MCP server scans the following package structure:
- `packages/core/src/` - Core UI components
- `packages/cnc/src/` - CNC-specific components
- `packages/adapters/src/` - Multi-library adapters
- `packages/icons/src/` - Icon components

Each package is organized into categories:
- `primitives/` - Basic UI components
- `complex/` - Advanced composite components
- `animated/` - Animation-enhanced components
- `cnc/` - CNC and industrial components
- `mobile/` - Mobile-optimized components
- `adapters/` - Library adapter implementations

## Component Detection

The server automatically detects:
- Component directories with TypeScript files
- README.md files
- Storybook stories (*.stories.tsx)
- Test files (*.test.tsx)
- JSDoc comments for descriptions

## MCP Configuration

The server is configured in the main package.json under the `mcp` section:

```json
{
  "mcp": {
    "servers": {
      "whttlr-ui-components": {
        "command": "node",
        "args": ["tools/mcp/server.js"],
        "cwd": ".",
        "env": {}
      }
    }
  }
}
```

## Development

To modify the MCP server:

1. Edit `tools/mcp/server.js`
2. Run `npm run mcp:dev` for auto-restart during development
3. Test with your MCP client (Claude Desktop, etc.)

## Error Handling

The server includes comprehensive error handling for:
- Missing components
- Inaccessible files
- Invalid parameters
- File system errors

All errors are returned with appropriate error messages and the `isError` flag set to true.

## Troubleshooting

### Common Issues

#### MCP Server Not Showing Up in Claude Desktop
1. **Check file paths**: Ensure absolute paths are correct in `claude_desktop_config.json`
2. **Verify Node.js**: Confirm Node.js 16+ is installed and accessible
3. **Restart Claude Desktop**: Always restart after configuration changes
4. **Check permissions**: Ensure Claude Desktop can access the UI library directory

#### Tool Not Working
1. **Install dependencies**: Run `npm run mcp:install` in the UI library root
2. **Check server logs**: Look for error messages in Claude Desktop's debug console
3. **Verify paths**: Ensure the `cwd` path in configuration points to your UI library root
4. **Test manually**: Run `npm run mcp:start` to test the server independently

#### Components Not Being Detected
1. **Check file structure**: Ensure components follow the expected directory structure
2. **Refresh cache**: Use the `refresh-cache` tool or `forceRefresh: true` parameter
3. **Verify file extensions**: Components should be `.tsx` files
4. **Check package paths**: Ensure packages exist in `packages/*/src/` structure

#### Cache Issues
1. **Force refresh**: Use `list-components` with `forceRefresh: true`
2. **Manual refresh**: Use the `refresh-cache` tool
3. **Restart server**: Restart Claude Desktop to reset the cache
4. **Check file watching**: Ensure no file system permission issues

### Debug Mode

To run the MCP server in debug mode:

```bash
# Enable verbose logging
DEBUG=* npm run mcp:dev

# Test server manually
node tools/mcp/server.js
```

### Configuration Validation

Your `claude_desktop_config.json` should look like this:

```json
{
  "mcpServers": {
    "whttlr-ui-components": {
      "command": "node",
      "args": ["/Users/yourusername/path/to/ui-library/tools/mcp/server.js"],
      "cwd": "/Users/yourusername/path/to/ui-library"
    }
  }
}
```

### Performance Tips

1. **Use caching**: Let the 5-minute cache improve response times
2. **Filter requests**: Use category/package filters for faster results
3. **Selective details**: Only request stories/tests when needed
4. **Batch operations**: Ask for multiple components in one conversation

### Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your configuration matches the examples
3. Test with a simple request like "list all components"
4. Check Claude Desktop's debug console for error messages