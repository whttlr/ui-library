# Claude Context for Whttlr UI Library

## Project Overview
A comprehensive React/TypeScript monorepo UI library designed specifically for CNC and industrial applications. Features modular component architecture, multi-library adapter system, advanced testing utilities, and specialized CNC control components with 3D visualization capabilities.

## Key Commands
- `npm run build` - Build all packages in dependency order
- `npm run dev` - Start development mode with hot reload
- `npm test` - Run comprehensive test suite across all packages
- `npm run lint` - Code quality checks and linting
- `npm run storybook` - Component documentation and visual testing
- `npm run setup` - Initial project setup and dependency installation
- `npm run clean` - Clean all build artifacts
- `npm run changeset` - Create changeset for version management

## Project Structure
**NOTE**: If any packages are created, deleted, or moved, please update this architecture section to reflect the current project structure.

```
ui-library/
├── 📁 packages/                     # Core library packages
│   ├── 📁 core/                     # @whttlr/ui-core - Foundation components
│   │   ├── 📁 src/
│   │   │   ├── primitives/          # Basic UI components (Button, Card, Input, etc.)
│   │   │   ├── complex/             # Advanced components (Charts, DataTable, Layouts)
│   │   │   ├── animated/            # Animation components and utilities
│   │   │   ├── mobile/              # Mobile-optimized components
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── providers/           # React context providers
│   │   │   └── utils/               # Utility functions
│   │   ├── package.json             # Package configuration
│   │   └── rollup.config.js         # Build configuration
│   │
│   ├── 📁 theme/                    # @whttlr/ui-theme - Design system
│   │   ├── 📁 src/
│   │   │   ├── tokens/              # Design tokens (colors, typography, spacing)
│   │   │   ├── themes/              # Theme configurations
│   │   │   ├── components/          # Component-specific styling
│   │   │   ├── css/                 # Global CSS and utilities
│   │   │   └── utils.ts             # Theme utility functions
│   │   ├── package.json
│   │   └── rollup.config.js
│   │
│   ├── 📁 adapters/                 # @whttlr/ui-adapters - Multi-library system
│   │   ├── 📁 src/
│   │   │   ├── factory/             # Component factory and adapter registry
│   │   │   ├── ant-design/          # Ant Design adapter implementations
│   │   │   ├── headless-ui/         # Headless UI adapter implementations
│   │   │   ├── custom/              # Custom component implementations
│   │   │   ├── types/               # TypeScript interfaces and types
│   │   │   └── utils/               # Adapter utility functions
│   │   └── package.json
│   │
│   ├── 📁 cnc/                      # @whttlr/ui-cnc - CNC-specific components
│   │   ├── 📁 src/
│   │   │   ├── controls/            # CNC control components (JogControls, EmergencyStop)
│   │   │   ├── forms/               # CNC-specific forms (JobSetup, MachineSetup)
│   │   │   ├── visualization/       # 3D/2D visualization components
│   │   │   ├── validation/          # CNC-specific validation utilities
│   │   │   └── mobile/              # Mobile CNC control interfaces
│   │   └── package.json
│   │
│   ├── 📁 testing/                  # @whttlr/ui-testing - Testing utilities
│   │   ├── 📁 src/
│   │   │   ├── components/          # Test wrapper components
│   │   │   ├── mocks/               # Mock data and components
│   │   │   ├── factories/           # Test data factories
│   │   │   ├── accessibility/       # Accessibility testing utilities
│   │   │   ├── visual/              # Visual regression testing
│   │   │   ├── mobile/              # Mobile testing utilities
│   │   │   ├── performance/         # Performance testing tools
│   │   │   └── utils/               # General testing utilities
│   │   └── package.json
│   │
│   ├── 📁 icons/                    # @whttlr/ui-icons - Icon system
│   │   ├── 📁 src/
│   │   │   ├── cnc/                 # CNC-specific icons
│   │   │   ├── common/              # General purpose icons
│   │   │   └── components/          # Icon components
│   │   └── package.json
│   │
│   └── 📁 cli/                      # @whttlr/ui-cli - Development tools
│       ├── 📁 src/
│       │   ├── commands/            # CLI command implementations
│       │   └── templates/           # Component generation templates
│       ├── 📁 bin/                  # Executable scripts
│       └── package.json
│
├── 📁 apps/                         # Demo and development applications
│   ├── 📁 documentation/            # Documentation website (future)
│   ├── 📁 playground/               # Development playground (future)
│   └── 📁 storybook/                # Storybook for component documentation
│
├── 📁 docs/                         # Project documentation
│   ├── 📁 components/               # Component documentation
│   ├── 📁 guides/                   # Development guides
│   └── 📁 migration/                # Migration documentation
│
├── 📁 tools/                        # Shared build and development tools
│   ├── 📁 build/                    # Build configuration
│   ├── 📁 eslint/                   # ESLint configurations
│   └── 📁 testing/                  # Testing configurations
│
├── 📁 config/                       # Root configuration files
├── package.json                     # Root package.json with workspace config
├── turbo.json                       # Turborepo configuration
├── tsconfig.json                    # TypeScript configuration
└── .changeset/                      # Changeset configuration for versioning
```

## Important Notes
- This is a **Turborepo monorepo** with npm workspaces for efficient package management
- Features **multi-library adapter system** allowing seamless switching between UI libraries
- Includes **comprehensive testing infrastructure** with accessibility, visual regression, and mobile testing
- Designed specifically for **CNC and industrial applications** with specialized components
- Built with **modern React/TypeScript** patterns and strict type safety

## Package Architecture & Dependencies

### Dependency Graph
```
@whttlr/ui-core ← @whttlr/ui-adapters ← @whttlr/ui-cnc
       ↑              ↑                    ↑
@whttlr/ui-theme ←─────┴──────────────────┘
       ↑
@whttlr/ui-testing
```

### Package Responsibilities

#### @whttlr/ui-core (Foundation)
- **Purpose**: Core UI components and primitives
- **Key Features**: Button, Card, Badge, Alert, Input, Grid, Container, Charts, Layouts, Animations
- **Dependencies**: `@whttlr/ui-theme`, `@radix-ui/react-slot`, `class-variance-authority`, `framer-motion`, `recharts`
- **Exports**: Primitive components, complex components, hooks, providers

#### @whttlr/ui-theme (Design System)
- **Purpose**: Design tokens, themes, and styling utilities
- **Key Features**: Color tokens, typography scales, spacing system, breakpoints, animation tokens
- **Dependencies**: `clsx`, `tailwind-merge`
- **Exports**: Theme configurations, design tokens, utility functions

#### @whttlr/ui-adapters (Multi-Library System)
- **Purpose**: Abstraction layer for switching between UI libraries
- **Key Features**: Component factory, adapter registry, library-specific implementations
- **Supported Libraries**: Ant Design, Headless UI, custom components
- **Dependencies**: `@whttlr/ui-core`, `@whttlr/ui-theme`
- **Peer Dependencies**: `antd`, `@headlessui/react` (optional)

#### @whttlr/ui-cnc (CNC Components)
- **Purpose**: Industrial CNC control components
- **Key Features**: JogControls, CoordinateDisplay, EmergencyStop, MachineStatusMonitor, 3D visualization
- **Dependencies**: `@whttlr/ui-core`, `@whttlr/ui-theme`
- **Peer Dependencies**: `@react-three/fiber`, `@react-three/drei`, `three`, `framer-motion`, `lucide-react`

#### @whttlr/ui-testing (Testing Infrastructure)
- **Purpose**: Comprehensive testing utilities
- **Key Features**: Component mocks, test factories, accessibility testing, visual regression, mobile testing
- **Dependencies**: `@whttlr/ui-core`, `@whttlr/ui-theme`, `axe-core`, `react-router-dom`
- **Peer Dependencies**: `@testing-library/react`, `@testing-library/user-event`, `jest`

#### @whttlr/ui-icons (Icon System)
- **Purpose**: Centralized icon system
- **Key Features**: CNC-specific icons, general purpose icons, icon components
- **Dependencies**: Minimal (React peer dependencies only)

#### @whttlr/ui-cli (Development Tools)
- **Purpose**: Component generation and development tools
- **Key Features**: Component scaffolding, theme management, migration tools
- **Dependencies**: `commander`, `inquirer`, `chalk`, `mustache`

## Configuration

### Turborepo Pipeline
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Build Configuration
- **Build Tool**: Rollup with shared configuration
- **Output Formats**: CommonJS (`dist/index.js`) and ESM (`dist/index.esm.js`)
- **TypeScript**: Strict mode with declaration generation
- **CSS Processing**: PostCSS with extraction and minification
- **Bundle Analysis**: Size optimization and tree-shaking

### Testing Strategy
- **Framework**: Jest with React Testing Library
- **Environment**: jsdom for component testing
- **Coverage**: Comprehensive coverage collection across packages
- **Accessibility**: Built-in axe-core integration for a11y testing
- **Visual Regression**: Screenshot comparison with baseline management
- **Mobile Testing**: Touch event simulation and responsive testing

## Dependencies

### Core Technology Stack
- **React & TypeScript**: Modern UI framework with strict type safety
- **Turborepo**: Monorepo management and build optimization
- **Rollup**: Package bundling and optimization
- **Jest**: Testing framework with comprehensive utilities
- **ESLint & Prettier**: Code quality and formatting

### UI Library Dependencies
- **@radix-ui/react-\***: Headless UI primitives for accessibility
- **class-variance-authority**: Component variant styling
- **framer-motion**: Advanced animations and interactions
- **recharts**: Data visualization components
- **clsx & tailwind-merge**: Conditional styling utilities

### CNC-Specific Dependencies
- **@react-three/fiber**: 3D visualization with React
- **@react-three/drei**: 3D component utilities
- **three**: 3D graphics library
- **lucide-react**: Modern icon system

### Testing Dependencies
- **@testing-library/react**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **axe-core**: Accessibility testing engine
- **jest-environment-jsdom**: DOM testing environment

### Development Dependencies
- **commander**: CLI framework for development tools
- **inquirer**: Interactive CLI prompts
- **chalk**: Terminal styling
- **mustache**: Template engine for code generation

## Core Features

### 1. Multi-Library Adapter System
- **Component Factory**: Dynamic component creation with library switching
- **Adapter Registry**: Centralized component adapter management
- **Library Support**: Ant Design, Headless UI, custom implementations
- **Runtime Switching**: Change UI library without code modifications
- **Type Safety**: Full TypeScript support across all adapters

### 2. CNC-Specific Components
- **Jog Controls**: Multi-axis manual machine positioning
- **Coordinate Display**: Real-time position tracking with precision
- **Emergency Stop**: Safety-critical control components
- **Machine Status**: Real-time machine state monitoring
- **3D Visualization**: Interactive working area preview with Three.js
- **Mobile Controls**: Touch-optimized CNC interfaces

### 3. Comprehensive Testing Infrastructure
- **Component Testing**: React Testing Library integration
- **Accessibility Testing**: Automated a11y auditing with axe-core
- **Visual Regression**: Screenshot comparison testing
- **Mobile Testing**: Touch gestures and responsive design testing
- **Performance Testing**: Component performance measurement
- **Test Factories**: Automated test data generation

### 4. Advanced Component System
- **Primitive Components**: Foundation UI elements (Button, Card, Input)
- **Complex Components**: Advanced compositions (DataTable, Charts, Layouts)
- **Animated Components**: Motion-enhanced interactions
- **Mobile Components**: Touch-optimized mobile interfaces
- **Theme System**: Comprehensive design token management

### 5. Developer Experience
- **CLI Tools**: Component generation and scaffolding
- **Hot Module Replacement**: Live reloading during development
- **Storybook Integration**: Component documentation and testing
- **TypeScript**: Full type safety with strict configuration
- **Monorepo Optimization**: Efficient builds with Turborepo

## Development Guidelines

### Component Development
- **IMPORTANT**: Follow the [Component Creation Guide](./HOW-TO-CREATE-A-COMPONENT-THE-RIGHT-WAY.md) for all new components
- Use design tokens from `@whttlr/ui-theme` - **never use hardcoded styles**
- Use TypeScript interfaces for all props and component APIs
- Follow React hooks patterns and functional component architecture
- Implement proper error boundaries and loading states
- Ensure accessibility compliance with WCAG guidelines
- Support mobile-first responsive design patterns
- Reference the Button component as the gold standard for token usage

### Package Development
- Maintain clear package boundaries and dependencies
- Use workspace dependencies (`workspace:*`) for internal packages
- Implement comprehensive test coverage (>90%)
- Follow semantic versioning with changesets
- Document all public APIs with JSDoc comments

### Testing Requirements
- Unit tests for all components using React Testing Library
- Accessibility tests for interactive components
- Visual regression tests for critical UI components
- Mobile responsiveness tests for touch interfaces
- Performance benchmarks for complex components

### Build and Release
- All packages must build successfully before release
- Maintain backward compatibility across minor versions
- Use changesets for version management and changelogs
- Optimize bundle sizes and eliminate dead code
- Support both CommonJS and ESM module formats

## Adapter System Architecture

### Component Factory Pattern
```typescript
interface AdapterDefinition<T extends AdapterProps = AdapterProps> {
  name: string;
  adapters: {
    [K in AdapterLibrary]?: React.ComponentType<T>;
  };
  defaultAdapter: AdapterLibrary;
}

class AdapterRegistry {
  register<T extends AdapterProps>(definition: AdapterDefinition<T>): void;
  get<T extends AdapterProps>(name: string, preferredLibrary?: AdapterLibrary): React.ComponentType<T> | null;
}
```

### Supported Libraries
- **Ant Design**: Production-ready enterprise components
- **Headless UI**: Unstyled, accessible UI primitives
- **Custom**: Tailored implementations for specific needs

### Usage Pattern
```typescript
// Automatic adapter selection
import { Button } from '@whttlr/ui-adapters';

// Explicit library preference
import { ComponentProvider } from '@whttlr/ui-adapters';

<ComponentProvider adapter="ant-design">
  <App />
</ComponentProvider>
```

## Recent Updates
- Established monorepo architecture with Turborepo for optimal build performance
- Implemented innovative multi-library adapter system for UI library flexibility
- Created comprehensive CNC-specific component library with 3D visualization
- Built advanced testing infrastructure with accessibility and visual regression testing
- Developed CLI tools for component generation and development workflow
- Established strict TypeScript configuration with full type safety
- Implemented modern build pipeline with Rollup and optimized bundle generation

## Migration from electron-app
- Successfully extracted and modularized 40+ components from electron-app
- Maintained backward compatibility through adapter system
- Established clean architectural boundaries between packages
- Preserved existing functionality while enabling library switching
- Created comprehensive test coverage for all migrated components

## Development Workflow

### Initial Setup
1. Clone repository and install dependencies: `npm install`
2. Build all packages: `npm run build`
3. Start development mode: `npm run dev`
4. Run tests: `npm test`

### Component Development
1. Generate new component: `npx @whttlr/ui-cli generate component`
2. Develop with hot reload: `npm run dev`
3. Test component: `npm test -- ComponentName`
4. Document in Storybook: Add stories and documentation
5. Create changeset: `npm run changeset`

### Package Management
- Use workspace dependencies for internal package references
- Add external dependencies to appropriate package.json
- Maintain peer dependencies for optional integrations
- Version packages together using changesets

### Quality Assurance
- All code must pass TypeScript strict checks
- ESLint rules enforced across all packages
- Test coverage requirements (>90% for new code)
- Accessibility compliance for all interactive components
- Performance benchmarks for complex components