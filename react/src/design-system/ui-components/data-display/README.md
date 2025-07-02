# Data Display Components

This directory contains components specifically designed for displaying and visualizing data in various formats. These components help present information to users in clear, accessible ways.

## Available Components

### ProgressCircle (`./ProgressCircle/`)
Circular progress indicator component for showing completion status, loading states, or progress tracking. Supports customizable colors, sizes, and animation options.

### Tooltip (`./Tooltip/`)
Flexible tooltip component that provides contextual information on hover or focus. Supports rich content, custom positioning, and keyboard navigation.

### PropertyDistributionBar (`./PropertyDistributionBar/`)
Horizontal bar chart component that visualizes the distribution of property values across a dataset. Features include:
- Visual data distribution as proportional colored segments
- Customizable colors with design system integration
- Interactive click handlers and hover effects
- Legend support with item counts
- Smart grouping of small segments
- Full accessibility with keyboard navigation
- Responsive design for all screen sizes

## Usage

```typescript
import { ProgressCircle, Tooltip, PropertyDistributionBar } from '@/ui-components';

// ProgressCircle example
<ProgressCircle value={75} size="large" color="primary" />

// Tooltip example
<Tooltip content="This is helpful information">
  <button>Hover me</button>
</Tooltip>

// PropertyDistributionBar example
<PropertyDistributionBar
  data={dataArray}
  field="status"
  mapping={{
    active: { name: 'Active', color: '#22c55e' },
    pending: { name: 'Pending', color: '#f59e0b' },
    inactive: { name: 'Inactive', color: '#ef4444' }
  }}
  label="Status Distribution"
  showLegend={true}
/>
```

## Design Principles

All data display components follow these principles:
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Responsive**: Adapt to different screen sizes and contexts
- **Customizable**: Support for design system colors and custom styling
- **Interactive**: Optional user interactions where appropriate
- **Performance**: Optimized for smooth rendering and animations 