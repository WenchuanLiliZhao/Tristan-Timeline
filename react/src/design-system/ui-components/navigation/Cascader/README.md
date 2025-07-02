# Cascader Component

A flexible cascader component that supports grouping and custom ReactNode content.

## Usage

```tsx
import { Cascader, CascaderGroupProps } from '@/ui-components';

const groups: CascaderGroupProps[] = [
  {
    groupTitle: "Recent",
    items: [
      {
        key: "item1",
        content: <span>Option 1</span>,
        value: "option1"
      }
    ]
  },
  {
    // No group title
    items: [
      {
        key: "item2", 
        content: <div>Custom Content</div>,
        value: { id: 2, name: "custom" }
      }
    ]
  }
];

<Cascader 
  groups={groups}
  onItemClick={(value, item) => {
    console.log('Selected:', value);
  }}
/>
```

## Props

### CascaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `groups` | `CascaderGroupProps[]` | - | Array of item groups |
| `onItemClick` | `(value, item) => void` | - | Callback when item is clicked |
| `maxHeight` | `number` | `300` | Maximum height in pixels |
| `width` | `number` | `200` | Width in pixels |
| `className` | `string` | - | Additional CSS class |
| `data-testid` | `string` | - | Test identifier |

### CascaderGroupProps

| Prop | Type | Description |
|------|------|-------------|
| `groupTitle` | `ReactNode` | Optional group title (can be empty) |
| `items` | `CascaderItemProps[]` | Array of items in the group |

### CascaderItemProps

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Unique identifier |
| `content` | `ReactNode` | Content to display (can be any ReactNode) |
| `value` | `string \| number \| object` | Value passed to onClick |
| `disabled` | `boolean` | Whether item is disabled |
| `onClick` | `(value, item) => void` | Click handler |
| `className` | `string` | Additional CSS class |
| `data-testid` | `string` | Test identifier |

## Features

- **Flexible Content**: Items can contain any ReactNode content
- **Grouping**: Items can be organized into groups with optional titles
- **Keyboard Support**: Basic keyboard navigation
- **Accessibility**: ARIA labels and proper focus management
- **Customizable**: Supports custom styling and dimensions 