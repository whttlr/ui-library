#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function installMCPForClaude() {
  console.log('🚀 Installing Whttlr UI Components MCP for Claude Desktop...\n');

  // Get the absolute path to the UI library
  const uiLibraryPath = path.resolve(__dirname, '..', '..');
  const serverPath = path.join(uiLibraryPath, 'tools', 'mcp', 'server.js');

  console.log(`📁 UI Library Path: ${uiLibraryPath}`);
  console.log(`🔧 MCP Server Path: ${serverPath}\n`);

  // Determine Claude Desktop config path based on OS
  let configPath;
  const platform = os.platform();
  
  switch (platform) {
    case 'darwin': // macOS
      configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
      break;
    case 'win32': // Windows
      configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
      break;
    case 'linux': // Linux
      configPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
      break;
    default:
      console.error(`❌ Unsupported platform: ${platform}`);
      process.exit(1);
  }

  console.log(`⚙️  Claude Desktop config: ${configPath}\n`);

  // Verify server exists
  try {
    await fs.access(serverPath);
    console.log('✅ MCP server file found');
  } catch (error) {
    console.error(`❌ MCP server file not found at: ${serverPath}`);
    console.error('Please run this script from the UI library root directory');
    process.exit(1);
  }

  // Create the MCP configuration
  const mcpConfig = {
    mcpServers: {
      'whttlr-ui-components': {
        command: 'node',
        args: [serverPath],
        cwd: uiLibraryPath
      }
    }
  };

  try {
    // Try to read existing config
    let existingConfig = {};
    try {
      const configContent = await fs.readFile(configPath, 'utf-8');
      existingConfig = JSON.parse(configContent);
      console.log('📄 Found existing Claude Desktop config');
    } catch (error) {
      console.log('📄 Creating new Claude Desktop config');
      // Create directory if it doesn't exist
      await fs.mkdir(path.dirname(configPath), { recursive: true });
    }

    // Merge configurations
    const finalConfig = {
      ...existingConfig,
      mcpServers: {
        ...(existingConfig.mcpServers || {}),
        ...mcpConfig.mcpServers
      }
    };

    // Write the configuration
    await fs.writeFile(configPath, JSON.stringify(finalConfig, null, 2));
    console.log('✅ Claude Desktop configuration updated');

    console.log('\n🎉 Installation Complete!\n');
    console.log('📋 Next Steps:');
    console.log('1. Restart Claude Desktop');
    console.log('2. Start a new conversation');
    console.log('3. Ask Claude: "Show me all available components"');
    console.log('\n💡 You should see the MCP tools available in Claude Desktop');
    
    console.log('\n🔧 Available Tools:');
    console.log('   • list-components - Browse and filter components');
    console.log('   • get-component-details - Get detailed component info');
    console.log('   • refresh-cache - Update component detection');

    console.log('\n📖 For more information, see:');
    console.log(`   ${path.join(__dirname, 'README.md')}`);

  } catch (error) {
    console.error(`❌ Failed to update Claude Desktop config: ${error.message}`);
    console.error('\n🔧 Manual Installation:');
    console.error(`1. Open: ${configPath}`);
    console.error('2. Add this configuration:');
    console.error(JSON.stringify(mcpConfig, null, 2));
    process.exit(1);
  }
}

// Run the installation
installMCPForClaude().catch(console.error);