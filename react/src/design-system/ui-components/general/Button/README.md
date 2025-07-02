# Button Component

A versatile, accessible button component that supports multiple variants, sizes, and interaction states.

## Features

- Multiple visual variants (primary, secondary, etc.)
- Different sizes for various use cases
- Comprehensive state management (hover, focus, disabled, loading)
- Full accessibility support with ARIA attributes
- Customizable styling through CSS modules

## Files

- `index.tsx` - Main button component implementation
- `styles.module.scss` - Component styling and variants

## Usage

```typescript
import { Button } from '@/ui-components';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

This component serves as the foundation for all interactive button elements throughout the application. 