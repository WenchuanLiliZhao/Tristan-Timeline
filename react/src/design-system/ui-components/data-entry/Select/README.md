# Select Component

A dropdown select component that combines the Input component as a trigger with a Dropdown for option selection.

## Features

- **Text Input Integration**: Uses Input component as the trigger
- **Searchable Options**: Optional search/filter functionality
- **Keyboard Navigation**: Full keyboard support through Dropdown
- **Clear Functionality**: Optional clear button for selected values
- **Disabled State**: Full disabled state support
- **Multiple Sizes**: Supports all Input component sizes
- **Customizable**: Extensible with custom styles and props

## Usage

```tsx
import { Select } from '@/design-system/ui-components/data-entry';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <Select
      options={options}
      value={selectedValue}
      placeholder="Select an option..."
      onSelect={(value, option) => setSelectedValue(value)}
    />
  );
}
```

## Props

### SelectProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | **required** | Available options for selection |
| `value` | `string \| number` | `undefined` | Currently selected value |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text when no option is selected |
| `size` | `Size` | `'medium'` | Size of the select component |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `showClearButton` | `boolean` | `true` | Whether to show clear button when there's a selected value |
| `searchable` | `boolean` | `false` | Whether to allow searching/filtering options |
| `style` | `React.CSSProperties` | `undefined` | Custom styles |
| `onSelect` | `(value: string \| number, option: SelectOption) => void` | `undefined` | Called when an option is selected |
| `onClear` | `() => void` | `undefined` | Called when clear button is clicked |
| `onVisibilityChange` | `(visible: boolean) => void` | `undefined` | Called when dropdown visibility changes |

### SelectOption

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | **required** | Option value |
| `label` | `string` | **required** | Option display label |
| `disabled` | `boolean` | `false` | Whether the option is disabled |

## Examples

### Basic Select

```tsx
<Select
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ]}
  placeholder="Choose a fruit..."
  onSelect={(value) => console.log('Selected:', value)}
/>
```

### Searchable Select

```tsx
<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ]}
  searchable={true}
  placeholder="Search frameworks..."
  onSelect={(value) => console.log('Selected:', value)}
/>
```

### Controlled Select with Clear

```tsx
const [selectedFramework, setSelectedFramework] = useState<string>();

<Select
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
  value={selectedFramework}
  onSelect={(value) => setSelectedFramework(value)}
  onClear={() => setSelectedFramework(undefined)}
  showClearButton={true}
/>
```

### Disabled Select

```tsx
<Select
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  disabled={true}
  placeholder="This select is disabled"
/>
```

### Different Sizes

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <Select size="tiny" options={options} placeholder="Tiny select" />
  <Select size="small" options={options} placeholder="Small select" />
  <Select size="medium" options={options} placeholder="Medium select" />
  <Select size="large" options={options} placeholder="Large select" />
</div>
```

## Implementation Details

The Select component is built by combining:

1. **Input Component**: Used as the trigger with `useAsButton` mode for non-searchable selects
2. **Dropdown Component**: Provides the positioning and visibility logic
3. **Cascader Component**: Renders the option list with keyboard navigation

### Searchable Mode

When `searchable={true}`:
- The Input component becomes editable
- User can type to filter options
- The dropdown shows filtered results
- Selection closes the dropdown and clears the search

### Non-Searchable Mode

When `searchable={false}`:
- The Input component acts as a button trigger
- Clicking opens the dropdown
- No text input is allowed
- Arrow icon indicates dropdown state

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Focus management
- Escape key to close dropdown

## Styling

The Select component inherits most of its styling from the Input and Dropdown components. Custom styles can be applied through the `style` prop or by extending the CSS classes. 