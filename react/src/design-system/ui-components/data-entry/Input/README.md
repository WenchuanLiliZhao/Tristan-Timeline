# SearchBar Component

A versatile search input component that supports both standard input mode and button trigger mode for different search experiences.

## Features

- ✅ Two modes: Standard input and button trigger (`useAsButton`)
- ✅ Three variants: `outlined`, `filled`, `ghost`
- ✅ Four sizes: `tiny`, `small`, `medium`, `large`
- ✅ Built-in search and clear icons
- ✅ Keyboard shortcuts (Enter to search, Escape to clear)
- ✅ Accessibility support (ARIA labels, keyboard navigation)
- ✅ Controlled and uncontrolled modes
- ✅ TypeScript support

## Basic Usage

```tsx
import { SearchBar } from '@/design-system/ui-components';

// Standard search input
<SearchBar 
  placeholder="Search documents..."
  onSearch={(value) => handleSearch(value)}
  onChange={(value) => setSearchTerm(value)}
/>

// Button trigger mode for fullscreen search
<SearchBar 
  useAsButton
  placeholder="Click to search"
  onClick={() => openFullScreenSearch()}
  value={currentSearchDisplay}
/>
```

## Variants

### Outlined (Default)
```tsx
<SearchBar variant="outlined" placeholder="Outlined search" />
```

### Filled
```tsx
<SearchBar variant="filled" placeholder="Filled search" />
```

### Ghost
```tsx
<SearchBar variant="ghost" placeholder="Ghost search" />
```

## Sizes

```tsx
<SearchBar size="tiny" placeholder="Tiny search" />
<SearchBar size="small" placeholder="Small search" />
<SearchBar size="medium" placeholder="Medium search" />  {/* Default */}
<SearchBar size="large" placeholder="Large search" />
```

## Controlled vs Uncontrolled

### Uncontrolled (Component manages state)
```tsx
<SearchBar 
  placeholder="Type to search..."
  onSearch={(value) => console.log('Search:', value)}
  onChange={(value) => console.log('Change:', value)}
/>
```

### Controlled (Parent manages state)
```tsx
const [searchValue, setSearchValue] = useState('');

<SearchBar 
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  onSearch={(value) => performSearch(value)}
/>
```

## Button Mode (useAsButton)

When `useAsButton` is true, the SearchBar behaves like a button that triggers an action rather than accepting direct input:

```tsx
<SearchBar 
  useAsButton
  placeholder="Advanced Search"
  value="Category: Electronics" // Display current filters
  onClick={() => {
    // Open modal, navigate to search page, etc.
    setShowAdvancedSearch(true);
  }}
/>
```

**Button Mode Features:**
- Input field becomes read-only
- Shows dropdown arrow indicator
- Entire component is clickable
- No clear button (since no direct input)
- `onClick` handler instead of `onChange`

## Event Handlers

```tsx
<SearchBar 
  // Input changes (not called in button mode)
  onChange={(value, event) => {
    console.log('New value:', value);
    console.log('Event:', event);
  }}
  
  // Search triggered (Enter key or search icon click)
  onSearch={(value) => {
    console.log('Performing search for:', value);
  }}
  
  // Button mode click (only when useAsButton=true)
  onClick={() => {
    console.log('Search button clicked');
  }}
  
  // Clear button clicked
  onClear={() => {
    console.log('Search cleared');
  }}
  
  // Focus/blur events
  onFocus={(event) => console.log('Focused')}
  onBlur={(event) => console.log('Blurred')}
  
  // Keyboard events
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
    }
  }}
/>
```

## Keyboard Shortcuts

- **Enter**: Trigger search (`onSearch` callback)
- **Escape**: Clear input (when `showClearButton` is true)
- **Tab**: Navigate to/from the component

## Accessibility

The SearchBar component includes comprehensive accessibility features:

- **ARIA labels** for search and clear buttons
- **Keyboard navigation** support
- **Screen reader** compatible
- **High contrast** mode support
- **Reduced motion** respect

```tsx
<SearchBar 
  aria-label="Search products"
  data-testid="product-search"
/>
```

## Advanced Examples

### Search with Loading State
```tsx
const [isSearching, setIsSearching] = useState(false);
const [searchValue, setSearchValue] = useState('');

<SearchBar 
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  onSearch={async (value) => {
    setIsSearching(true);
    try {
      await performSearch(value);
    } finally {
      setIsSearching(false);
    }
  }}
  disabled={isSearching}
  placeholder={isSearching ? "Searching..." : "Search..."}
/>
```

### Search with Debounced Input
```tsx
const [searchValue, setSearchValue] = useState('');
const debouncedSearch = useDebounce(searchValue, 300);

useEffect(() => {
  if (debouncedSearch) {
    performSearch(debouncedSearch);
  }
}, [debouncedSearch]);

<SearchBar 
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  placeholder="Type to search..."
/>
```

### Trigger Modal Search
```tsx
const [showSearchModal, setShowSearchModal] = useState(false);
const [selectedFilters, setSelectedFilters] = useState([]);

<SearchBar 
  useAsButton
  placeholder="Advanced Search"
  value={selectedFilters.length > 0 ? `${selectedFilters.length} filters applied` : ''}
  onClick={() => setShowSearchModal(true)}
/>

{showSearchModal && (
  <SearchModal 
    onClose={() => setShowSearchModal(false)}
    onApplyFilters={setSelectedFilters}
  />
)}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outlined' \| 'filled' \| 'ghost'` | `'outlined'` | Visual style variant |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `value` | `string` | `undefined` | Controlled value |
| `useAsButton` | `boolean` | `false` | Button trigger mode |
| `showClearButton` | `boolean` | `true` | Show clear button when there's content |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Input change handler |
| `onSearch` | `(value: string) => void` | `undefined` | Search trigger handler |
| `onClick` | `() => void` | `undefined` | Button mode click handler |
| `onClear` | `() => void` | `undefined` | Clear button handler |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Blur handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | `undefined` | Key down handler |
| `className` | `string` | `''` | Additional CSS classes |
| `data-testid` | `string` | `undefined` | Test identifier |

## Styling

The component uses CSS modules with the following class structure:

```scss
.tristan-search-bar {
  // Base styles
  
  &--outlined { /* Outlined variant */ }
  &--filled { /* Filled variant */ }
  &--ghost { /* Ghost variant */ }
  
  &--tiny { /* Tiny size */ }
  &--small { /* Small size */ }
  &--medium { /* Medium size */ }
  &--large { /* Large size */ }
  
  &--button-mode { /* Button trigger mode */ }
  &--disabled { /* Disabled state */ }
  &--has-value { /* Has content state */ }
}
```

## Files

- `index.tsx` - Main SearchBar component
- `styles.module.scss` - Component styles
- `README.md` - This documentation

## Best Practices

1. **Use appropriate mode**: Standard input for immediate search, button mode for complex search UI
2. **Provide clear placeholders**: Help users understand what they can search for
3. **Handle loading states**: Disable during search operations
4. **Debounce input**: For real-time search to avoid excessive API calls
5. **Accessibility**: Always provide meaningful labels and test with keyboard navigation 