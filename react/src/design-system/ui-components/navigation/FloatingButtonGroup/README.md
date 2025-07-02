# FloatingButtonGroup

A floating group of buttons that can be positioned anywhere on the screen. Commonly used for quick actions, view controls, or navigation shortcuts.

## Features

- 🎯 **Flexible Positioning**: Support for 4 corner positions (top-left, top-right, bottom-left, bottom-right)
- 🎨 **Customizable Styling**: Multiple size and variant options
- 📱 **Responsive Design**: Adapts to mobile devices with adjusted spacing
- ♿ **Accessibility**: Supports reduced motion preferences
- 🌙 **Dark Mode**: Built-in dark mode support
- 💨 **Smooth Animations**: Hover effects and transitions

## Usage

### Basic Example

```tsx
import { FloatingButtonGroup } from '@/ui-components';

const zoomButtons = [
  { id: 'day', label: 'Day' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' }
];

function TimelineView() {
  const [currentZoom, setCurrentZoom] = useState('month');

  return (
    <div>
      {/* Your main content */}
      
      <FloatingButtonGroup
        items={zoomButtons}
        activeId={currentZoom}
        position="bottom-right"
        onItemClick={(item) => setCurrentZoom(item.id)}
      />
    </div>
  );
}
```

### Advanced Example

```tsx
import { FloatingButtonGroup } from '@/ui-components';

const actionButtons = [
  { 
    id: 'save', 
    label: 'Save',
    icon: 'save',
    data: { shortcut: 'Ctrl+S' }
  },
  { 
    id: 'export', 
    label: 'Export',
    icon: 'download'
  },
  { 
    id: 'share', 
    label: 'Share',
    disabled: !hasSharePermission
  }
];

<FloatingButtonGroup
  items={actionButtons}
  position="top-right"
  size="large"
  variant="outlined"
  onItemClick={(item) => {
    console.log('Clicked:', item.id, item.data);
    handleAction(item.id);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FloatingButtonItem[]` | `[]` | Array of button configurations |
| `activeId` | `string` | `undefined` | Currently active/selected button id |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Position of the floating group |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant for all buttons |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'filled'` | Variant style for active buttons |
| `onItemClick` | `(item: FloatingButtonItem) => void` | `undefined` | Callback when a button is clicked |
| `visible` | `boolean` | `true` | Whether to show the group |
| `className` | `string` | `undefined` | Additional CSS class |
| `data-testid` | `string` | `undefined` | Test identifier |

### FloatingButtonItem Interface

```tsx
interface FloatingButtonItem {
  id: string;                           // Unique identifier
  label: string;                        // Display label
  icon?: string;                        // Optional icon name
  disabled?: boolean;                   // Whether button is disabled
  data?: Record<string, unknown>;       // Custom data for onClick
}
```

## Styling

The component uses CSS modules and CSS custom properties for theming:

```scss
// Available CSS custom properties
--color--bg-secondary     // Background color
--color--border-prime     // Border color
--shadow--pop-up          // Default shadow
--shadow--modal           // Hover shadow
```

### Custom Styling

```tsx
<FloatingButtonGroup
  className="my-custom-floating-group"
  items={buttons}
/>
```

```scss
.my-custom-floating-group {
  /* Custom positioning */
  bottom: 100px;
  right: 50px;
  
  :global(.floating-button-group__container) {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
  }
}
```

## Accessibility

- Supports `prefers-reduced-motion` for users who prefer less animation
- All buttons are keyboard accessible
- Proper ARIA attributes are inherited from the Button component
- Uses semantic markup

## Best Practices

1. **Limit Button Count**: Keep the number of buttons reasonable (3-5) for better UX
2. **Clear Labels**: Use concise, descriptive labels
3. **Consistent Positioning**: Stick to one corner position throughout your app
4. **Mobile Consideration**: Test on mobile devices to ensure buttons don't interfere with content
5. **Provide Feedback**: Use the `activeId` prop to show current state

## Related Components

- [`Button`](../Button/README.md) - Individual button component
- [`TopNav`](../TopNav/README.md) - Main navigation component 