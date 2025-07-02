# ProgressCircle Component

A circular progress indicator component for visualizing completion status, loading states, and progress tracking.

## Features

- Animated progress transitions
- Customizable colors and sizes
- Support for determinate and indeterminate states
- Accessibility support with proper ARIA attributes
- Smooth animations and visual feedback

## Files

- `index.tsx` - Main progress circle component implementation
- `styles.module.scss` - Styling for animations, colors, and sizing variants

## Usage

```typescript
import { ProgressCircle } from '@/ui-components';

<ProgressCircle value={75} size="large" />
<ProgressCircle value={50} color="primary" />
<ProgressCircle indeterminate size="small" />
```

Ideal for showing upload progress, task completion, loading states, and any scenario requiring visual progress indication. 