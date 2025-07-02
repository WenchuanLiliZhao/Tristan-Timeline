# UI Components

This directory contains the core UI component library for the Tristan Design System. It provides reusable, styled components organized by their functional categories.

## Directory Structure

- **`general/`** - Basic UI components for general use (buttons, icons, tags, etc.)
- **`data-display/`** - Components for displaying and visualizing data
- **`navigation/`** - Components for site navigation and routing
- **`layout/`** - Components for page structure and layout management

## Usage

Components are exported through the main index file and can be imported as:

```typescript
import { Button, Icon, Tag } from '@/ui-components';
```

## Component Organization

Each component follows a consistent structure:
- `index.tsx` - Main component implementation
- `styles.module.scss` - Component-specific styles
- Additional documentation or configuration files as needed

## Types

Shared TypeScript interfaces and types are defined in `types.ts` and are available throughout the component library. 