# PageLayout Component

The foundational layout component that provides the basic structure and organization for application pages.

## Features

- Flexible page structure with configurable sections
- Responsive design for all screen sizes
- Consistent spacing and positioning
- Support for header, sidebar, main content, and footer areas
- Semantic HTML structure for accessibility
- Grid-based layout system

## Files

- `index.tsx` - Main page layout component implementation
- `styles.module.scss` - Layout grid system, spacing, and responsive behavior

## Usage

```typescript
import { PageLayout } from '@/ui-components';

<PageLayout
  header={<TopNav />}
  sidebar={<NavigationSidebar />}
  main={<MainContent />}
  footer={<AppFooter />}
/>
```

This component ensures that all pages follow a consistent structural pattern while providing the flexibility needed for different page types and content requirements. 