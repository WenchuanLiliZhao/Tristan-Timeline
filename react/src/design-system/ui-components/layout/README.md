# Layout Components

This directory contains components that define the structure and layout of pages and sections within the application. These components provide consistent spacing, positioning, and responsive behavior.

## Available Components

### PageLayout (`./PageLayout/`)
Main page layout component that provides the basic structure for application pages. Handles overall page organization, responsive grid systems, and consistent spacing patterns.

## Usage

```typescript
import { PageLayout } from '@/ui-components';

// Example usage
<PageLayout
  header={<TopNav />}
  sidebar={<Sidebar />}
  main={<MainContent />}
  footer={<Footer />}
/>
```

## Layout Philosophy

The layout components follow these principles:
- **Consistency** - Uniform spacing and positioning across pages
- **Responsiveness** - Adaptive layouts for different screen sizes
- **Accessibility** - Semantic structure for screen readers
- **Flexibility** - Configurable layouts for different page types
- **Performance** - Optimized rendering and minimal layout shifts

These components ensure that all pages maintain a consistent structure while allowing for content-specific customization. 