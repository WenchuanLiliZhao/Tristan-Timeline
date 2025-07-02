# PropertyDistributionBar

A flexible data visualization component that displays the distribution of property values as a horizontal bar chart.

## Features

- 📊 **Visual Distribution**: Shows data distribution as proportional colored segments
- 🎨 **Customizable Colors**: Support for CSS variables, hex colors, and custom mappings
- 📱 **Responsive Design**: Adapts to different screen sizes
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎯 **Interactive**: Optional click handlers and hover effects
- 📈 **Smart Grouping**: Automatically merge small segments into "Others"
- 🔧 **Highly Configurable**: Multiple styling and behavior options

## Basic Usage

```tsx
import { PropertyDistributionBar } from '@/ui-components';

const data = [
  { status: 'active', team: 'engineering' },
  { status: 'inactive', team: 'design' },
  { status: 'active', team: 'engineering' },
  // ...more data
];

const statusMapping = {
  active: { name: 'Active', color: '#22c55e' },
  inactive: { name: 'Inactive', color: '#ef4444' },
  pending: { name: 'Pending', color: '#f59e0b' }
};

<PropertyDistributionBar
  data={data}
  field="status"
  mapping={statusMapping}
  label="Status Distribution"
/>
```

## Legend Modes

The component supports three different ways to display legend information:

### `below` (Default)
- Traditional legend displayed below the distribution bar
- Shows all segments with color indicators and counts
- Takes up additional vertical space
- Always visible, good for persistent reference

### `tooltip` 
- Individual tooltips for each segment on hover
- Clean, space-efficient design
- Interactive discovery of segment details
- Good for dense layouts where space is limited

### `hover`
- Single tooltip showing all segments when hovering the entire bar
- Comprehensive overview in one interaction
- Most space-efficient option
- Ideal for overview/summary use cases

## Tooltip Positioning

For `tooltip` and `hover` legend modes, you can control the tooltip position using the `tooltipPosition` prop. Available positions:

- `"top-start"` - Above the element, aligned to start
- `"top-end"` - Above the element, aligned to end
- `"bottom-start"` - Below the element, aligned to start
- `"bottom-end"` - Below the element, aligned to end
- `"left-start"` - Left of the element, aligned to start
- `"left-end"` - Left of the element, aligned to end
- `"right-start"` - Right of the element, aligned to start
- `"right-end"` - Right of the element, aligned to end

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Record<string, unknown>>` | - | Array of data objects to analyze |
| `field` | `string` | - | Property name to analyze distribution for |
| `mapping` | `PropertyDistributionMapping` | - | Maps field values to display names and colors |
| `label` | `string` | - | Optional label displayed above the bar |
| `showLegend` | `boolean` | `false` | Show legend with counts |
| `legendMode` | `'below' \| 'tooltip' \| 'hover'` | `'below'` | How to display the legend |
| `tooltipPosition` | `Position` | `'top-start'` | Tooltip position for tooltip and hover modes |
| `countUnit` | `string` | `undefined` | Unit text for displaying count (e.g., 'projects', 'tasks'). If not provided, only numbers are shown |
| `percentageDecimalPlaces` | `number` | `1` | Number of decimal places for percentage display |
| `height` | `number` | `4` | Height of the distribution bar in pixels |
| `enableHover` | `boolean` | `true` | Enable hover effects on segments |
| `className` | `string` | - | Additional CSS class name |
| `borderRadius` | `number` | `2` | Border radius of the bar in pixels |
| `minPercentage` | `number` | `0` | Minimum percentage to show; smaller segments are grouped as "Others" |
| `sortBy` | `'count' \| 'name' \| 'value' \| function` | `'count'` | How to sort the segments |
| `onSegmentClick` | `(segment: PropertyDistributionSegment) => void` | - | Callback when a segment is clicked |

## Advanced Usage

### With Custom Sorting

```tsx
<PropertyDistributionBar
  data={teamData}
  field="priority"
  mapping={priorityMapping}
  sortBy={(a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.value] - order[b.value];
  }}
/>
```

### With Different Legend Modes

```tsx
// Traditional legend below the bar
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  legendMode="below"
/>

// Individual segment tooltips
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  legendMode="tooltip"
/>

// Hover entire bar for summary tooltip
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  legendMode="hover"
  tooltipPosition="top-start"
/>
```

### With Custom Tooltip Position

```tsx
// Tooltip appearing to the right
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  legendMode="hover"
  tooltipPosition="right-start"
/>

// Tooltip appearing below, useful in tight layouts
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  showLegend={true}
  legendMode="tooltip"
  tooltipPosition="bottom-end"
/>
```

### With Custom Display Format

```tsx
// No unit text, just numbers
<PropertyDistributionBar
  data={projectData}
  field="status"
  mapping={statusMapping}
  label="Status Distribution"
  showLegend={true}
  legendMode="hover"
  percentageDecimalPlaces={0}
  // countUnit is undefined, will show "5 (50%)" instead of "5 items (50%)"
/>

// Custom unit and no decimal places for percentages
<PropertyDistributionBar
  data={projectData}
  field="status"
  mapping={statusMapping}
  label="Project Status"
  showLegend={true}
  legendMode="hover"
  countUnit="projects"
  percentageDecimalPlaces={0}
/>

// Show more precise percentages
<PropertyDistributionBar
  data={largeDataset}
  field="category"
  mapping={categoryMapping}
  label="Category Distribution"
  showLegend={true}
  legendMode="tooltip"
  countUnit="records"
  percentageDecimalPlaces={2}
/>
```

### With Click Handling

```tsx
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  legendMode="tooltip"
  tooltipPosition="top-start"
  onSegmentClick={(segment) => {
    console.log(`Clicked ${segment.name}: ${segment.count} items`);
  }}
/>
```

### Custom Styling

```tsx
<PropertyDistributionBar
  data={data}
  field="category"
  mapping={categoryMapping}
  height={8}
  borderRadius={4}
  className="my-custom-distribution"
  minPercentage={5} // Group segments < 5% as "Others"
/>
```

### Using Design System Colors

```tsx
import { getRainbowColor, getSemanticColor } from '@/styles';

const statusMapping = {
  active: { 
    name: 'Active', 
    color: getSemanticColor('success') 
  },
  error: { 
    name: 'Error', 
    color: getRainbowColor('rose') 
  },
  pending: { 
    name: 'Pending', 
    color: getRainbowColor('amber') 
  }
};
```

## Types

### PropertyDistributionSegment

```tsx
interface PropertyDistributionSegment {
  value: string;      // Original field value
  count: number;      // Number of items with this value
  percentage: number; // Percentage of total
  color: string;      // Display color
  name: string;       // Display name
}
```

### PropertyDistributionMapping

```tsx
interface PropertyDistributionMapping {
  [key: string]: {
    name: string;   // Display name
    color: string;  // CSS color value
  };
}
```

## Styling

The component supports CSS modules and custom styling through:

- CSS variables for colors and spacing
- `className` prop for custom classes
- Style variants through CSS classes:
  - `.variant-compact` - Smaller, more compact layout
  - `.variant-large` - Larger, more spacious layout

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- Focus indicators
- Color contrast compliance

## Examples

### Simple Status Bar
```tsx
<PropertyDistributionBar
  data={tickets}
  field="status"
  mapping={{
    open: { name: 'Open', color: '#3b82f6' },
    closed: { name: 'Closed', color: '#10b981' },
    pending: { name: 'Pending', color: '#f59e0b' }
  }}
  label="Ticket Status"
/>
```

### Interactive Team Distribution
```tsx
<PropertyDistributionBar
  data={employees}
  field="department"
  mapping={departmentColors}
  label="Department Distribution"
  showLegend={true}
  height={6}
  onSegmentClick={(segment) => {
    setSelectedDepartment(segment.value);
  }}
/>
``` 