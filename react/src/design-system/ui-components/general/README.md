# General Components

This directory contains fundamental UI components that are commonly used across the application. These are basic building blocks that can be used in various contexts and layouts.

## Available Components

### Button (`./Button/`)
Interactive button component with multiple variants, sizes, and states. Supports different styling options for primary actions, secondary actions, and specialized use cases.

### Icon (`./Icon/`)
Flexible icon component that supports Material Icons integration. Includes font management and comprehensive icon rendering capabilities.

### Tag (`./Tag/`)
Label-style component for categorization, status indication, and metadata display. Useful for showing tags, badges, and status indicators.

## Usage

```typescript
import { Button, Icon, Tag } from '@/ui-components';

// Example usage
<Button variant="primary" size="medium">Click me</Button>
<Icon name="home" size={24} />
<Tag variant="info">Status</Tag>
```

These components form the foundation of the UI and are designed to be highly reusable across different parts of the application. 