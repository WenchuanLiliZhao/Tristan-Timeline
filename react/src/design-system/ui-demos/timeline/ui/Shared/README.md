# Timeline Shared Components

## TimelinePointer

A visual pointer component that indicates the current date position on the timeline with an optional date label.

### Features

- 🎯 **Visual Indicator**: Green bullet point with vertical line
- 📅 **Date Tooltip**: Rich tooltip displaying formatted date on hover (e.g., "12 Feb 2024")
- 📍 **Smart Positioning**: Automatically switches between preferred and fallback positions
- 🧠 **Overflow Detection**: Automatically detects screen boundaries and adjusts tooltip position
- 🎨 **Rich UI**: Uses RichTooltip with icon and structured layout
- ⚡ **Auto Detection**: Uses today's date when no parameters provided
- 🔧 **Shared Utilities**: Uses centralized date formatting from ui-components

### Basic Usage

```tsx
import { TimelinePointer } from './Shared/TimelinePointer';

// Basic usage (shows today's date in tooltip by default)
<TimelinePointer />

// With specific date
<TimelinePointer 
  year={2024} 
  month={1}  // 0-based (1 = February)
  day={12} 
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `year` | `number` | Current year | Year to display |
| `month` | `number` | Current month | Month to display (0-based: 0=Jan, 1=Feb...) |
| `day` | `number` | Current day | Day of month to display |
| `showTooltip` | `boolean` | `true` | Whether to show the date tooltip on hover |
| `preferredPosition` | `Position` | `'right-middle'` | Preferred position of the tooltip |
| `fallbackPosition` | `Position` | `'left-middle'` | Fallback position when preferred position overflows |

### Smart Positioning Examples

```tsx
// Default smart positioning (right-middle with left-middle fallback)
<TimelinePointer />

// Custom preferred and fallback positions
<TimelinePointer 
  preferredPosition="right-middle" 
  fallbackPosition="left-middle" 
/>

// Top positioning with bottom fallback
<TimelinePointer 
  preferredPosition="top-middle" 
  fallbackPosition="bottom-middle" 
/>

// Start-aligned positioning
<TimelinePointer 
  preferredPosition="right-start" 
  fallbackPosition="left-start" 
/>

// Hide tooltip
<TimelinePointer showTooltip={false} />
```

### Date Format

The date is automatically formatted using the shared `formatDate` utility from `@/ui-components` with the default format:
- Day: 2 digits (01-31)
- Month: Short name (Jan, Feb, Mar...)
- Year: 4 digits (2024)

Example output: `"12 Feb 2024"`

The formatting can be customized by modifying the `formatDate` function in `@/ui-components/shared/dateUtils`.

### Styling

The component uses CSS custom properties that can be customized:

- `--element-color-prime`: Primary color (bullet inner)
- `--element-color-secondary`: Secondary color (line)
- `--element-color-tertiary`: Border color
- `--color--bg-prime`: Background color
- `--color--text-prime`: Text color

### Use Cases

1. **Current Date Indicator**: Shows where "today" is on the timeline
2. **Event Markers**: Mark specific important dates
3. **Timeline Navigation**: Visual reference point for users
4. **Date Selection**: Interactive date picker interface

### Smart Positioning Logic

The component uses intelligent positioning to ensure tooltips are always visible:

1. **Overflow Detection**: Monitors the viewport boundaries in real-time
2. **Automatic Switching**: Switches to fallback position when preferred position would overflow
3. **Middle Alignment**: New middle alignment options for better centering
4. **Dynamic Updates**: Repositions on scroll and window resize

#### Available Position Options

Now supports middle alignment for all directions:
- `right-start`, `right-middle`, `right-end`
- `left-start`, `left-middle`, `left-end`  
- `top-start`, `top-middle`, `top-end`
- `bottom-start`, `bottom-middle`, `bottom-end`

### Layout Considerations

- The pointer line extends to full viewport height (`100vh`)
- Uses RichTooltip for consistent tooltip behavior across the application
- Smart positioning automatically handles viewport boundaries
- No additional z-index concerns as RichTooltip handles layering automatically
- Position calculations update on scroll and window resize for optimal placement 