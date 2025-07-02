# Shared UI Component Utilities

## Date Utilities (`dateUtils.ts`)

Centralized date formatting utilities for consistent date display across the design system.

### Available Functions

#### `formatDate(year, month, day, options?)`
Format a specific date for display.

```tsx
import { formatDate } from '@/ui-components';

// Basic usage (default: "12 Feb 2024")
formatDate(2024, 1, 12);

// With custom locale
formatDate(2024, 1, 12, { locale: 'zh-CN' }); // "2024年2月12日"

// Long format
formatDate(2024, 1, 12, { month: 'long', day: 'numeric' }); // "12 February 2024"
```

#### `formatToday(options?)`
Format the current date.

```tsx
import { formatToday } from '@/ui-components';

formatToday(); // "15 Dec 2024" (current date)
formatToday({ month: 'long' }); // "15 December 2024"
```

#### `formatDateObject(date, options?)`
Format a Date object.

```tsx
import { formatDateObject } from '@/ui-components';

const someDate = new Date(2024, 1, 12);
formatDateObject(someDate); // "12 Feb 2024"
```

### Format Presets (`DateFormats`)

Pre-configured format options for common use cases:

```tsx
import { formatDate, DateFormats } from '@/ui-components';

// 12 Feb 2024
formatDate(2024, 1, 12, DateFormats.short);

// 12 February 2024
formatDate(2024, 1, 12, DateFormats.long);

// 12/02/2024
formatDate(2024, 1, 12, DateFormats.numeric);

// Feb 12
formatDate(2024, 1, 12, DateFormats.monthDay);

// 2024
formatDate(2024, 1, 12, DateFormats.yearOnly);
```

### Options Interface

```tsx
interface DateFormatOptions {
  locale?: string;                                    // 'en-GB', 'zh-CN', etc.
  day?: '2-digit' | 'numeric';                       // '01' vs '1'
  month?: '2-digit' | 'numeric' | 'long' | 'short' | 'narrow'; // '02', '2', 'February', 'Feb', 'F'
  year?: '2-digit' | 'numeric';                      // '24' vs '2024'
}
```

### Usage in Components

This utility is used throughout the design system for consistent date formatting:

- **TimelinePointer**: Displays current date in tooltip
- **PropertyDistributionBar**: Could be extended for date-based data
- **Other date-related components**: Use these utilities for consistency

### Benefits

- **Consistency**: All date displays use the same formatting logic
- **Internationalization**: Easy to switch locales globally
- **Maintainability**: Single place to update date formatting
- **Type Safety**: Full TypeScript support with proper interfaces

## Smart Positioning Hook (`useSmartPosition.ts`)

Intelligent positioning hook for tooltips and popovers that automatically adjusts position when content would overflow the viewport.

### Usage

```tsx
import { useSmartPosition } from '@/ui-components';

const MyComponent = () => {
  const { position, triggerRef } = useSmartPosition({
    preferredPosition: 'right-middle',
    fallbackPosition: 'left-middle',
    offset: 8
  });

  return (
    <div>
      <div ref={triggerRef}>Trigger Element</div>
      <Tooltip position={position}>Content</Tooltip>
    </div>
  );
};
```

### Features

- **Automatic Overflow Detection**: Monitors viewport boundaries
- **Dynamic Position Switching**: Switches to fallback when preferred position overflows
- **Real-time Updates**: Repositions on scroll and window resize
- **Middle Alignment Support**: New center-aligned positioning options

### Extended Position Types

The Position type now includes middle alignment options:
- `top-middle`, `bottom-middle`, `left-middle`, `right-middle`
- All existing start/end positions remain supported
- Middle positions center the tooltip relative to the trigger element 