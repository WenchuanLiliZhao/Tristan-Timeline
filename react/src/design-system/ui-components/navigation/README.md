# Navigation Components

This directory contains components that facilitate navigation and routing throughout the application. These components help users move between different sections and pages efficiently.

## Available Components

### TopNav (`./TopNav/`)
Primary navigation component that appears at the top of the application. Handles main navigation links, user actions, and global application controls.

## Usage

```typescript
import { TopNav } from '@/ui-components';

// Example usage
<TopNav 
  navigationItems={navItems}
  userActions={userActions}
/>
```

## Component Features

The navigation components are designed to:
- Provide clear navigation paths
- Support responsive design patterns
- Handle active state management
- Integrate with routing systems
- Maintain accessibility standards

These components ensure consistent navigation patterns across the entire application. 