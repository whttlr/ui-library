#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyInstallation() {
  console.log('🔍 Verifying Whttlr UI Components MCP Installation...\n');

  let allPassed = true;

  // Test 1: Check MCP server file exists
  console.log('1️⃣  Checking MCP server file...');
  const serverPath = path.join(__dirname, 'server.js');
  try {
    await fs.access(serverPath);
    console.log('   ✅ MCP server file found');
  } catch (error) {
    console.log('   ❌ MCP server file not found');
    allPassed = false;
  }

  // Test 2: Check dependencies installed
  console.log('\n2️⃣  Checking dependencies...');
  const packageJsonPath = path.join(__dirname, 'package.json');
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  try {
    await fs.access(nodeModulesPath);
    console.log('   ✅ Dependencies installed');
  } catch (error) {
    console.log('   ❌ Dependencies not installed - run: npm run mcp:install');
    allPassed = false;
  }

  // Test 3: Check Claude Desktop configuration
  console.log('\n3️⃣  Checking Claude Desktop configuration...');
  let configPath;
  const platform = os.platform();
  
  switch (platform) {
    case 'darwin':
      configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
      break;
    case 'win32':
      configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
      break;
    case 'linux':
      configPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
      break;
    default:
      console.log(`   ⚠️  Unsupported platform: ${platform}`);
      configPath = null;
  }

  if (configPath) {
    try {
      const configContent = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      
      if (config.mcpServers && config.mcpServers['whttlr-ui-components']) {
        console.log('   ✅ Claude Desktop configuration found');
        
        const serverConfig = config.mcpServers['whttlr-ui-components'];
        console.log(`   📁 Server path: ${serverConfig.args[0]}`);
        console.log(`   📂 Working directory: ${serverConfig.cwd}`);
      } else {
        console.log('   ❌ MCP server not configured in Claude Desktop');
        console.log('   💡 Run: npm run mcp:install-claude');
        allPassed = false;
      }
    } catch (error) {
      console.log('   ❌ Claude Desktop config file not found or invalid');
      console.log('   💡 Run: npm run mcp:install-claude');
      allPassed = false;
    }
  }

  // Test 4: Test MCP server functionality
  console.log('\n4️⃣  Testing MCP server functionality...');
  
  try {
    const testResult = await testMCPServer();
    if (testResult) {
      console.log('   ✅ MCP server responding correctly');
    } else {
      console.log('   ❌ MCP server not responding correctly');
      allPassed = false;
    }
  } catch (error) {
    console.log('   ❌ MCP server test failed:', error.message);
    allPassed = false;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 Installation Verification PASSED!');
    console.log('\n✅ Your MCP server is ready to use with Claude Desktop');
    console.log('\n📋 Next Steps:');
    console.log('1. Restart Claude Desktop if it\'s running');
    console.log('2. Start a new conversation');
    console.log('3. Ask Claude: "Show me all available components"');
  } else {
    console.log('❌ Installation Verification FAILED!');
    console.log('\n🔧 To fix issues:');
    console.log('1. Run: npm run mcp:install');
    console.log('2. Run: npm run mcp:install-claude');
    console.log('3. Restart Claude Desktop');
    console.log('4. Run this verification again');
  }
  console.log('='.repeat(50));
}

function testMCPServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['server.js'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let hasError = false;

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      const stderr = data.toString();
      if (stderr.includes('running on stdio')) {
        // Server started successfully
      } else if (stderr.includes('Error')) {
        hasError = true;
      }
    });

    // Send a simple tools list request
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    };

    setTimeout(() => {
      server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
    }, 500);

    setTimeout(() => {
      server.kill();
      
      if (hasError) {
        resolve(false);
      } else if (output.includes('list-components') && output.includes('get-component-details')) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);

    server.on('error', (error) => {
      reject(error);
    });
  });
}

// Run verification
verifyInstallation().catch(console.error);