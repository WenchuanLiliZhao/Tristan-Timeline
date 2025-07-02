# TopNav Component

The primary navigation component that appears at the top of the application, providing main navigation links and global controls.

## Features

- Responsive navigation design
- Support for multiple navigation items
- User action integration (login, profile, etc.)
- Active state management
- Mobile-friendly collapsed navigation
- Consistent branding area

## Files

- `index.tsx` - Main top navigation component implementation
- `styles.module.scss` - Navigation styling, responsive behavior, and visual states

## Usage

```typescript
import { TopNav } from '@/ui-components';

<TopNav 
  logo={<Logo />}
  navigationItems={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]}
  userActions={<UserMenu />}
/>
```

This component ensures consistent navigation experience across all pages and handles the primary user navigation flow. 