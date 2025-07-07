# @whttlr/ui-library

A comprehensive UI component library for CNC applications.

## Packages

- `@whttlr/ui-core` - Core UI components and primitives
- `@whttlr/ui-theme` - Design system and theme tokens
- `@whttlr/ui-adapters` - Multi-library adapter system
- `@whttlr/ui-cnc` - CNC-specific components
- `@whttlr/ui-testing` - Testing utilities
- `@whttlr/ui-icons` - Icon system
- `@whttlr/ui-cli` - CLI tools

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Start development mode
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Architecture

This is a monorepo managed with Turborepo, containing multiple npm packages that work together to provide a complete UI component system for CNC applications.

### Package Dependencies

```
ui-core ← ui-adapters ← ui-cnc
   ↑         ↑           ↑
ui-theme ←────┴───────────┘
   ↑
ui-testing
```

## Documentation

- **[Component Creation Guide](./HOW-TO-CREATE-A-COMPONENT-THE-RIGHT-WAY.md)** - Complete guide for building components with design tokens
- **[Component Refactoring Checklist](./COMPONENT-REFACTORING-CHECKLIST.md)** - Track progress of design token migration
- **[Project Architecture](./CLAUDE.md)** - Detailed project structure and development guidelines
- **[Storybook](./apps/storybook)** - Interactive component documentation and examples

## Contributing

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build all packages
4. **📖 Read the [Component Creation Guide](./HOW-TO-CREATE-A-COMPONENT-THE-RIGHT-WAY.md)** before creating components
5. Follow the design token patterns established in Button and Card components
6. Make your changes using design tokens (never hardcode styles)
7. Run tests with `npm run test`
8. Submit a pull request

## License

MIT
