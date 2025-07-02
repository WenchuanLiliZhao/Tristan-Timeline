# RichTooltip Component

A flexible tooltip component that displays rich content with icons, labels, and values.

## Features

- 📍 **Smart Positioning**: 12 different position options including middle alignment
- 🎨 **Rich Content**: Support for icons, labels, and values
- 📱 **Auto Width**: Automatic width adjustment for all items
- ♿ **Accessible**: Full keyboard and screen reader support
- 🎯 **Portal Rendering**: Renders outside normal DOM flow to avoid z-index issues

## Basic Usage

```tsx
import { RichTooltip, RichTooltipItem } from '@/ui-components';

<RichTooltip
  trigger={<button>Hover me</button>}
  position="top-middle"
>
  {[
    <RichTooltipItem 
      key="item1"
      icon="info" 
      label="Status" 
      value="Active" 
    />,
    <RichTooltipItem 
      key="item2"
      icon="calendar" 
      label="Last Updated" 
      value="2 hours ago" 
    />
  ]}
</RichTooltip>
```

## Auto Width Feature

The `autoWidth` prop on `RichTooltip` automatically applies to all child `TooltipItem` components:

```tsx
// All TooltipItems will have autoWidth enabled
<RichTooltip
  trigger={<button>Auto Width Tooltip</button>}
  autoWidth={true}
  position="right-middle"
>
  {[
    <RichTooltipItem key="1" label="Short" value="OK" />,
    <RichTooltipItem key="2" label="Very long label text" value="Very long value text that would normally wrap" />
  ]}
</RichTooltip>

// All TooltipItems will have fixed width (default)
<RichTooltip
  trigger={<button>Fixed Width Tooltip</button>}
  autoWidth={false}
  position="left-middle"
>
  {[
    <RichTooltipItem key="1" label="Label" value="Value" />,
    <RichTooltipItem key="2" label="Another" value="Value" />
  ]}
</RichTooltip>
```

## Props

### RichTooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement<TooltipItemProps>[]` | - | Array of TooltipItem components |
| `trigger` | `ReactElement` | - | Element that triggers the tooltip |
| `position` | `Position` | `'bottom-start'` | Tooltip position relative to trigger |
| `offset` | `number` | `8` | Distance between trigger and tooltip in pixels |
| `alwaysVisible` | `boolean` | `false` | Whether tooltip is always visible |
| `autoWidth` | `boolean` | `false` | Auto-width for all child TooltipItems |

### TooltipItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconName` | - | Optional icon name |
| `iconColor` | `string` | - | Custom icon color |
| `label` | `ReactNode` | - | Item label/title |
| `value` | `ReactNode` | - | Item value/content |
| `autoWidth` | `boolean` | `false` | Enable auto-width for this item |

## Position Options

All 12 position options are supported:

```tsx
// Corner positions
"top-start" | "top-end" | "bottom-start" | "bottom-end"
"left-start" | "left-end" | "right-start" | "right-end"

// Middle-aligned positions (NEW)
"top-middle" | "bottom-middle" | "left-middle" | "right-middle"
```

## Advanced Examples

### Mixed Content Types

```tsx
<RichTooltip
  trigger={<div>User Profile</div>}
  position="right-middle"
  autoWidth={true}
>
  {[
    <RichTooltipItem 
      key="name"
      icon="person" 
      label="Name" 
      value="John Doe" 
    />,
    <RichTooltipItem 
      key="email"
      icon="email" 
      label="Email" 
      value="john.doe@example.com" 
    />,
    <RichTooltipItem 
      key="status"
      icon="circle" 
      iconColor="#22c55e"
      label="Status" 
      value="Online" 
    />
  ]}
</RichTooltip>
```

### Always Visible Tooltip

```tsx
<RichTooltip
  trigger={<div>Always Visible Info</div>}
  alwaysVisible={true}
  position="bottom-middle"
>
  {[
    <RichTooltipItem 
      key="info"
      icon="info" 
      label="Important" 
      value="This tooltip is always shown" 
    />
  ]}
</RichTooltip>
```

## Auto Width Behavior

When `autoWidth={true}` is set on `RichTooltip`:

1. **Automatic Propagation**: All child `TooltipItem` components receive `autoWidth={true}`
2. **Individual Override**: You can still manually set `autoWidth` on individual `TooltipItem` components
3. **Layout Optimization**: Items automatically adjust their width based on content
4. **Consistency**: All items in the tooltip maintain consistent behavior

## Best Practices

- Use `autoWidth={true}` for tooltips with varying content lengths
- Use middle-aligned positions (`*-middle`) for better visual balance
- Keep tooltip content concise for better user experience
- Use icons to improve visual hierarchy and recognition 