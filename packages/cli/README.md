# @whttlr/ui-cli

Command-line interface for the Whttlr UI component library. Provides tools for generating components, managing themes, and migrating existing components to the ui-library structure.

## Installation

```bash
npm install -g @whttlr/ui-cli
```

Or use with npx:

```bash
npx @whttlr/ui-cli --help
```

## Commands

### Component Generation

Generate new UI components with proper structure, tests, and stories.

```bash
whttlr-ui generate
# or
whttlr-ui g
```

#### Options

- `-n, --name <name>` - Component name (PascalCase)
- `-t, --type <type>` - Component type (primitive|complex|animated|mobile|cnc)
- `--no-story` - Skip Storybook story generation
- `--no-test` - Skip test file generation
- `--no-styles` - Skip styles file generation

#### Examples

```bash
# Interactive mode
whttlr-ui generate

# Generate a primitive button component
whttlr-ui generate -n Button -t primitive

# Generate CNC component without styles
whttlr-ui generate -n EmergencyStop -t cnc --no-styles

# Generate mobile component with all files
whttlr-ui generate -n TouchButton -t mobile
```

#### Generated Files

The CLI generates a complete component structure:

```
ComponentName/
├── ComponentName.tsx          # Main component file
├── ComponentName.test.tsx     # Jest tests (optional)
├── ComponentName.stories.tsx  # Storybook stories (optional)
├── ComponentName.module.css   # Component styles (optional)
└── index.ts                   # Exports
```

#### Component Types

- **primitive** - Basic building blocks (Button, Input, Card)
- **complex** - Advanced components (DataTable, Form, Modal)
- **animated** - Motion-enhanced components with Framer Motion
- **mobile** - Touch-optimized components
- **cnc** - Industrial control interface components

### Theme Management

Create and manage custom themes for the UI library.

```bash
whttlr-ui theme
```

#### Theme Operations

```bash
# Interactive theme menu
whttlr-ui theme

# Generate new theme
whttlr-ui theme --generate -n myTheme -b dark

# Validate existing themes
whttlr-ui theme --validate

# Export themes to CSS
whttlr-ui theme --export

# List available themes
whttlr-ui theme --list
```

#### Creating Custom Themes

The CLI guides you through creating custom themes:

1. **Theme Name** - Alphanumeric name (e.g., `corporateTheme`)
2. **Base Theme** - Start from light or dark theme
3. **Color Customization** - Override primary, secondary, success, warning, danger colors
4. **Additional Properties** - Typography, spacing, shadows (manual editing)

#### Generated Theme Structure

```typescript
// themes/myTheme.ts
export const myTheme: Theme = {
  ...darkTheme,
  name: 'myTheme',
  colors: {
    ...darkTheme.colors,
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    // ... custom colors
  },
};
```

### Migration Utilities

Migrate existing components to the ui-library structure.

```bash
whttlr-ui migrate
```

#### Migration Options

- `-s, --source <path>` - Source directory path
- `-t, --target <path>` - Target directory path  
- `--no-backup` - Skip creating backup
- `--no-imports` - Skip updating import statements

#### Migration Process

1. **Discovery** - Scans source directory for components
2. **Selection** - Choose which components to migrate
3. **Backup** - Creates timestamped backup (optional)
4. **Migration** - Copies components to ui-library structure
5. **Import Updates** - Updates import statements throughout project
6. **Report** - Shows migration summary

#### Example

```bash
# Migrate components from src/components to ui-library
whttlr-ui migrate -s ./src/components -t ./packages/core/src

# Migrate without backup
whttlr-ui migrate --no-backup

# Migrate without updating imports
whttlr-ui migrate --no-imports
```

## Usage in Projects

### UI Library Development

When working within the ui-library repository:

```bash
# Generate new primitive component
cd /path/to/ui-library
whttlr-ui generate -n TextField -t primitive

# Create custom theme
whttlr-ui theme --generate -n brandTheme -b light

# Validate all themes
whttlr-ui theme --validate
```

### Application Development

When consuming the ui-library in your applications:

```bash
# Generate app-specific components
whttlr-ui generate -n CustomButton -t primitive

# Create application theme
whttlr-ui theme --generate -n appTheme -b dark

# Migrate existing components
whttlr-ui migrate -s ./src/legacy-components
```

## Component Templates

The CLI uses Mustache templates for code generation. Templates support:

### Features by Component Type

#### All Components
- TypeScript interfaces and props
- Forward refs support
- CSS modules (optional)
- Comprehensive tests
- Storybook stories

#### CNC Components
- Industrial styling variables
- Safety-focused variants (emergency, warning, danger)
- Size variations (sm, md, lg)
- Disabled states
- WCAG compliance

#### Mobile Components
- Touch event handling
- Responsive breakpoints
- Touch target sizing (44px minimum)
- Gesture support
- Performance optimizations

#### Animated Components
- Framer Motion integration
- Animation variants
- Reduced motion support
- Performance considerations

### Template Customization

Templates are located in `src/templates/`:

- `component.tsx.mustache` - Main component template
- `test.tsx.mustache` - Test file template
- `story.tsx.mustache` - Storybook story template
- `styles.css.mustache` - CSS module template
- `index.ts.mustache` - Export file template

## Configuration

### Project Detection

The CLI automatically detects project structure:

- **UI Library Repo** - Places components in appropriate package directories
- **Application Repo** - Creates components in `./components/` directory
- **Custom Structure** - Uses provided target path

### File Placement

Components are placed based on type:

```
packages/
├── core/src/
│   ├── primitives/     # primitive components
│   ├── complex/        # complex components
│   ├── animated/       # animated components
│   └── mobile/         # mobile components
└── cnc/src/
    └── controls/       # cnc components
```

## Best Practices

### Component Naming

- Use PascalCase (e.g., `MyComponent`)
- Be descriptive and specific
- Avoid generic names like `Component` or `Element`

### Component Structure

- Keep components focused and single-purpose
- Use composition over inheritance
- Include proper TypeScript types
- Write comprehensive tests
- Document with Storybook stories

### Theme Development

- Start with existing base themes
- Use semantic color names
- Test with accessibility tools
- Support both light and dark modes
- Consider high contrast modes

### Migration Strategy

- Migrate in small batches
- Test thoroughly after each migration
- Update imports systematically
- Maintain backward compatibility during transition

## Troubleshooting

### Common Issues

#### Component Generation Fails
- Ensure you have write permissions in target directory
- Check that component name is valid PascalCase
- Verify templates exist in CLI package

#### Theme Creation Fails
- Ensure themes directory exists
- Check color values are valid hex codes
- Verify TypeScript compilation

#### Migration Issues
- Backup before migrating
- Check source directory exists
- Verify target structure is correct
- Test imports after migration

### Getting Help

```bash
# Show general help
whttlr-ui --help

# Show command-specific help
whttlr-ui generate --help
whttlr-ui theme --help
whttlr-ui migrate --help
```

## Development

### Building the CLI

```bash
cd packages/cli
npm run build
```

### Testing Locally

```bash
# Link for local testing
npm link

# Use globally
whttlr-ui --help

# Unlink when done
npm unlink -g @whttlr/ui-cli
```

### Adding New Commands

1. Create command file in `src/commands/`
2. Add to main CLI in `bin/whttlr-ui`
3. Export from `src/index.ts`
4. Add tests and documentation

## Contributing

When contributing to the CLI:

1. Follow existing code patterns
2. Add comprehensive error handling
3. Include helpful user feedback
4. Update documentation
5. Test with real projects