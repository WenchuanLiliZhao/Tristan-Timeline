# RightSidebar Component

A slide-in sidebar component that appears from the right side of the screen with overlay background.

## Features

- ✅ **Nameable**: Customize the title of the sidebar
- ✅ **Closable**: Built-in close button and overlay click to close
- ✅ **Smooth Animation**: Slide-in animation with fade-in overlay
- ✅ **Responsive**: Customizable width
- ✅ **Accessible**: Proper ARIA labels and keyboard navigation

## Usage

```tsx
import { RightSidebar } from '@/ui-components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Sidebar
      </button>
      
      <RightSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Issue Details"
        width={400}
      >
        <div>Your content here...</div>
      </RightSidebar>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Whether the sidebar is open |
| `onClose` | `() => void` | - | Function called when sidebar should close |
| `title` | `string` | `"Details"` | Title displayed in the header |
| `children` | `ReactNode` | - | Content to display in the sidebar |
| `width` | `number \| string` | `400` | Width of the sidebar (px or CSS unit) |

## Examples

### Basic Usage
```tsx
<RightSidebar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Basic Sidebar"
>
  <p>Hello World!</p>
</RightSidebar>
```

### Custom Width
```tsx
<RightSidebar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Wide Sidebar"
  width={600}
>
  <div>Wide content...</div>
</RightSidebar>
```

### With Complex Content
```tsx
<RightSidebar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Issue #123"
  width="30vw"
>
  <div>
    <h4>Description</h4>
    <p>Issue description...</p>
    
    <h4>Properties</h4>
    <ul>
      <li>Status: In Progress</li>
      <li>Priority: High</li>
    </ul>
  </div>
</RightSidebar>
``` 