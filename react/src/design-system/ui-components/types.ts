// Design System Base Types
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

// Size variants
export type Size = 'tiny' | 'small' | 'medium' | 'large';

// Color variants
export type Color = 'primary' | 'secondary' | 'active' | 'success' | 'warning' | 'error' | 'info';

// Position variants for tooltips and popovers
export type Position =
  | "top-start"
  | "top-middle" 
  | "top-end"
  | "bottom-start"
  | "bottom-middle"
  | "bottom-end"
  | "left-start"
  | "left-middle"
  | "left-end"
  | "right-start"
  | "right-middle"
  | "right-end";


// Input specific types
export interface InputProps extends BaseComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  size?: Size;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
} 