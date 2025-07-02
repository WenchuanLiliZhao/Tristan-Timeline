// Import TextField types for internal use

// Property Field Components
export { ProgressField } from './ProgressField';
export { TagField } from './TagField';
export { PlainTextField as TextField } from './PlainTextField';
export { DateField } from './DateField';
export * from './shared';

// Export all types
export type {
  ProgressFieldProps
} from './ProgressField';
export type { TagFieldProps } from './TagField';
export type { TextFieldProps } from './PlainTextField';

// DataField specific types (for external usage)
export interface DateFieldProps {
  label?: string;
  value: Date;
  /** Date format: 'short' | 'medium' | 'long' | 'full' */
  format?: 'short' | 'medium' | 'long' | 'full';
  /** Locale for date formatting */
  locale?: string;
  /** Text color override */
  color?: string;
} 