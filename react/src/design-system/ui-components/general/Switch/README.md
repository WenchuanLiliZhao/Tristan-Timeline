# Switch Component

A modern toggle switch component for boolean input values.

## Usage

```tsx
import { Switch } from '@/design-system/ui-components';

// Basic usage
<Switch defaultChecked={false} onChange={(checked) => console.log(checked)} />

// Controlled component
const [isOn, setIsOn] = useState(false);
<Switch checked={isOn} onChange={(checked) => setIsOn(checked)} />

// With different sizes
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />

// Disabled state
<Switch disabled />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state for uncontrolled component |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant |
| `onChange` | `(checked: boolean, event: ChangeEvent) => void` | `undefined` | Change handler |
| `name` | `string` | `undefined` | Name attribute for the input |
| `value` | `string` | `undefined` | Value attribute for the input |
| `className` | `string` | `''` | Additional CSS class |
| `data-testid` | `string` | `undefined` | Test ID for testing |

## Design Mapping

The component maps Figma design tokens to our design system variables:

- **bg/prime** → `var(--color--bg-prime)` (white thumb in checked state)
- **bg/secondary** → `var(--color--bg-secondary)` (track background in unchecked state)
- **border/prime** → `var(--color--border-prime)` (track border in unchecked state)
- **border/darken** → `var(--color--border-darken)` (hover border)
- **semantic/active** → `var(--color--semantic-active)` (checked track background)
- **semantic/active-dark** → `var(--color--semantic-active-dark)` (hover checked state)
- **text/prime** → `var(--color--text-prime)` (thumb color in unchecked state)

## Features

- ✅ Controlled and uncontrolled modes
- ✅ Three size variants (small, medium, large)
- ✅ Disabled state
- ✅ Hover and focus states
- ✅ Smooth animations
- ✅ Accessible keyboard navigation
- ✅ TypeScript support
- ✅ Dark/light theme support

## Accessibility

- Uses semantic `<input type="checkbox">` for screen readers
- Supports keyboard navigation (Space/Enter to toggle)
- Proper focus indicators
- ARIA-compliant structure 