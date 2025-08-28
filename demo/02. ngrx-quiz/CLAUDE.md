# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 19 application demonstrating advanced NgRx Signal Store patterns. It's a quiz application that showcases color-based questions with internationalization support.

## Key Technologies

- **Angular 19** with standalone components
- **NgRx Signal Store** for state management
- **Angular Material** for UI components
- **TypeScript 5.5**
- **SCSS** for styling with custom theme system

## Development Commands

```bash
# Development server
npm start              # Start dev server at http://localhost:4200
npm run watch         # Build in watch mode for development

# Testing
npm test              # Run unit tests with Karma

# Build
npm run build         # Build for production

# Code scaffolding (Angular CLI)
npm run ng -- generate component component-name
```

## Architecture Overview

### Store Architecture

The application uses a **modular slice-based NgRx Signal Store pattern**:

- **AppStore**: Global state (language, dictionaries)
- **QuizStore**: Feature-specific state (questions, answers)
- **Custom Features**: Reusable state enhancers

### Key Patterns

1. **Custom Store Features**:
   - `withBusy()`: Loading state management
   - `withLocalStorage()`: State persistence
   - `withService()`: Generic data loading pattern

2. **State Organization**:
   - Each store has consistent structure: `slice.ts`, `updaters.ts`, `helpers.ts`
   - Features compose via higher-order functions
   - Reactive methods with `rxMethod` for async operations

3. **Component Integration**:
   - Direct store injection: `readonly store = inject(QuizStore)`
   - Signal-based templates with automatic change detection
   - Cross-store communication via dependency injection

### File Structure

```
src/app/
├── store/                    # Global store configuration
├── features/                 # Feature modules
│   ├── home/
│   └── quiz/
│       ├── store/           # Quiz-specific store
│       └── components/
├── custom-features/         # Reusable store features
├── components/              # Shared UI components
├── services/               # Business logic services
├── models/                 # Type definitions
└── styles/                 # SCSS theme system
```

### Styling System

- **Custom theme** with Material Design integration
- **SCSS partials** in `src/app/styles/`
- **Preprocessor include path** configured for `@import 'vars'` etc.
- **Responsive design** with mobile-first approach

### State Management Best Practices

- **Feature composition** over inheritance
- **Type-safe** custom features with generics
- **Automatic persistence** with localStorage
- **DevTools integration** for debugging
- **Service-based** data loading patterns

### Testing Approach

- **Karma/Jasmine** for unit tests
- **Test configuration** in `karma.conf.js`
- **Component testing** with TestBed
- **Store testing** via signal assertions