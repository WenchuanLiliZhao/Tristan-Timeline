# Dropdown Component

A flexible dropdown component that uses Cascader as its menu content. Click-triggered only with smart positioning.

## Usage

```tsx
import { Dropdown, CascaderGroupProps } from '@/ui-components';

const groups: CascaderGroupProps[] = [
  {
    groupTitle: "Actions",
    items: [
      {
        key: "add",
        content: <span>Add New</span>,
        value: "add"
      },
      {
        key: "edit", 
        content: <span>Edit</span>,
        value: "edit"
      }
    ]
  }
];

// Basic usage
<Dropdown
  trigger={<button>Click me</button>}
  groups={groups}
  onItemClick={(value) => {
    console.log('Selected:', value);
  }}
/>

// With positioning
<Dropdown
  trigger={<Button variant="outlined">Menu</Button>}
  groups={groups}
  position="right-start"
  width={200}
  onItemClick={(value) => {
    console.log('Selected:', value);
  }}
/>
```

## Props

### DropdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | - | The element that triggers the dropdown |
| `groups` | `CascaderGroupProps[]` | - | Array of cascader groups for the menu |
| `position` | `Position` | `"bottom-start"` | Where to position the dropdown |
| `offset` | `number` | `8` | Distance from trigger in pixels |
| `disabled` | `boolean` | `false` | Whether the dropdown is disabled |
| `onItemClick` | `(value, item) => void` | - | Callback when a menu item is clicked |
| `onVisibilityChange` | `(visible) => void` | - | Callback when dropdown visibility changes |
| `maxHeight` | `number` | `300` | Maximum height of the dropdown menu |
| `width` | `number` | `200` | Width of the dropdown menu |
| `className` | `string` | - | Additional CSS class |
| `data-testid` | `string` | - | Test identifier |

### Position Options

All 8 positioning options are supported:

| Position | Description |
|----------|-------------|
| `"top-start"` | Above trigger, aligned to left edge |
| `"top-end"` | Above trigger, aligned to right edge |
| `"bottom-start"` | Below trigger, aligned to left edge |
| `"bottom-end"` | Below trigger, aligned to right edge |
| `"left-start"` | Left of trigger, aligned to top edge |
| `"left-end"` | Left of trigger, aligned to bottom edge |
| `"right-start"` | Right of trigger, aligned to top edge |
| `"right-end"` | Right of trigger, aligned to bottom edge |

## Features

- **Click-only Interaction**: Simple click to open/close behavior
- **Smart Positioning**: Automatically adjusts position to stay within viewport
- **8 Position Options**: Comprehensive positioning with start/end alignment
- **Flexible Content**: Any ReactNode can be used as trigger or menu content
- **Click Outside**: Automatically closes when clicking outside
- **Auto-close**: Closes automatically after selecting an item
- **Cascader Integration**: Uses Cascader component for rich menu content
- **Customizable Dimensions**: Configurable width and max-height

## Behavior

### Click Interaction
- Click trigger to open/close dropdown
- Click outside to close
- Select item to close automatically

### Smart Positioning
- Automatically detects viewport boundaries
- Adjusts position if dropdown would overflow
- Maintains consistent offset from trigger
- Handles window scrolling correctly

### Accessibility
- Proper focus management
- Keyboard navigation support
- ARIA labels and roles 