/**
 * CSS Color Variables
 * 
 * This file exports all CSS custom properties (variables) used in the design system.
 * These constants provide type safety and auto-completion when referencing CSS variables.
 */

// ==================== BASE COLOR CHART ====================

// Base Colors
export const baseColors = {
  black: '--color-chart--base-black',
  white: '--color-chart--base-white',
} as const;

// Transparent Colors - Normal
export const transparentColors = {
  trans1: '--color-chart--trans-1',
  trans2: '--color-chart--trans-2',
  trans3: '--color-chart--trans-3',
  trans4: '--color-chart--trans-4',
  trans5: '--color-chart--trans-5',
  trans6: '--color-chart--trans-6',
  trans7: '--color-chart--trans-7',
  trans8: '--color-chart--trans-8',
  trans9: '--color-chart--trans-9',
  trans10: '--color-chart--trans-10',
  trans11: '--color-chart--trans-11',
  trans12: '--color-chart--trans-12',
} as const;

// Transparent Colors - Inverse
export const transparentInverseColors = {
  trans1: '--color-chart--trans-inverse-1',
  trans2: '--color-chart--trans-inverse-2',
  trans3: '--color-chart--trans-inverse-3',
  trans4: '--color-chart--trans-inverse-4',
  trans5: '--color-chart--trans-inverse-5',
  trans6: '--color-chart--trans-inverse-6',
  trans7: '--color-chart--trans-inverse-7',
  trans8: '--color-chart--trans-inverse-8',
  trans9: '--color-chart--trans-inverse-9',
  trans10: '--color-chart--trans-inverse-10',
  trans11: '--color-chart--trans-inverse-11',
  trans12: '--color-chart--trans-inverse-12',
} as const;

// Gray Colors
export const grayColors = {
  gray1: '--color-chart--gray-1',
  gray2: '--color-chart--gray-2',
  gray3: '--color-chart--gray-3',
  gray4: '--color-chart--gray-4',
  gray5: '--color-chart--gray-5',
  gray6: '--color-chart--gray-6',
  gray7: '--color-chart--gray-7',
  gray8: '--color-chart--gray-8',
  gray9: '--color-chart--gray-9',
  gray10: '--color-chart--gray-10',
  gray11: '--color-chart--gray-11',
  gray12: '--color-chart--gray-12',
} as const;

// Neutron Colors
export const neutronColors = {
  neutron1: '--color-chart--neutron-1',
  neutron2: '--color-chart--neutron-2',
  neutron3: '--color-chart--neutron-3',
  neutron4: '--color-chart--neutron-4',
  neutron5: '--color-chart--neutron-5',
  neutron6: '--color-chart--neutron-6',
  neutron7: '--color-chart--neutron-7',
  neutron8: '--color-chart--neutron-8',
  neutron9: '--color-chart--neutron-9',
  neutron10: '--color-chart--neutron-10',
  neutron11: '--color-chart--neutron-11',
  neutron12: '--color-chart--neutron-12',
} as const;

// Rainbow Colors - Amber
export const rainbowAmberColors = {
  default: '--color-chart--rainbow-amber',
  dark: '--color-chart--rainbow-amber-dark',
  half: '--color-chart--rainbow-amber-half',
  pale: '--color-chart--rainbow-amber-pale',
} as const;

// Rainbow Colors - Orange
export const rainbowOrangeColors = {
  default: '--color-chart--rainbow-orange',
  dark: '--color-chart--rainbow-orange-dark',
  half: '--color-chart--rainbow-orange-half',
  pale: '--color-chart--rainbow-orange-pale',
} as const;

// Rainbow Colors - Rose
export const rainbowRoseColors = {
  default: '--color-chart--rainbow-rose',
  dark: '--color-chart--rainbow-rose-dark',
  half: '--color-chart--rainbow-rose-half',
  pale: '--color-chart--rainbow-rose-pale',
} as const;

// Rainbow Colors - Pink
export const rainbowPinkColors = {
  default: '--color-chart--rainbow-pink',
  dark: '--color-chart--rainbow-pink-dark',
  half: '--color-chart--rainbow-pink-half',
  pale: '--color-chart--rainbow-pink-pale',
} as const;

// Rainbow Colors - Purple
export const rainbowPurpleColors = {
  default: '--color-chart--rainbow-purple',
  dark: '--color-chart--rainbow-purple-dark',
  half: '--color-chart--rainbow-purple-half',
  pale: '--color-chart--rainbow-purple-pale',
} as const;

// Rainbow Colors - Blue
export const rainbowBlueColors = {
  default: '--color-chart--rainbow-blue',
  dark: '--color-chart--rainbow-blue-dark',
  half: '--color-chart--rainbow-blue-half',
  pale: '--color-chart--rainbow-blue-pale',
} as const;

// Rainbow Colors - Cyan
export const rainbowCyanColors = {
  default: '--color-chart--rainbow-cyan',
  dark: '--color-chart--rainbow-cyan-dark',
  half: '--color-chart--rainbow-cyan-half',
  pale: '--color-chart--rainbow-cyan-pale',
} as const;

// Rainbow Colors - Emerald
export const rainbowEmeraldColors = {
  default: '--color-chart--rainbow-emerald',
  dark: '--color-chart--rainbow-emerald-dark',
  half: '--color-chart--rainbow-emerald-half',
  pale: '--color-chart--rainbow-emerald-pale',
} as const;

// Rainbow Color Names (without suffixes)
export const rainbowColorNames = {
  amber: 'amber',
  orange: 'orange',
  rose: 'rose',
  pink: 'pink',
  purple: 'purple',
  blue: 'blue',
  cyan: 'cyan',
  emerald: 'emerald',
} as const;

// Combined Rainbow Colors
export const rainbowColors = {
  amber: rainbowAmberColors,
  orange: rainbowOrangeColors,
  rose: rainbowRoseColors,
  pink: rainbowPinkColors,
  purple: rainbowPurpleColors,
  blue: rainbowBlueColors,
  cyan: rainbowCyanColors,
  emerald: rainbowEmeraldColors,
} as const;

// All chart colors combined
export const chartColors = {
  base: baseColors,
  transparent: transparentColors,
  transparentInverse: transparentInverseColors,
  gray: grayColors,
  neutron: neutronColors,
  rainbow: rainbowColors,
} as const;

// ==================== THEME COLORS ====================

// Text Colors
export const textColors = {
  prime: '--color--text-prime',
  secondary: '--color--text-secondary',
  negative: '--color--text-negative',
  disabled: '--color--text-disabled',
} as const;

// Background Colors
export const backgroundColors = {
  prime: '--color--bg-prime',
  secondary: '--color--bg-secondary',
  secondaryTrans: '--color--bg-secondary-trans',
  hover: '--color--bg-hover',
} as const;

// Border Colors
export const borderColors = {
  prime: '--color--border-prime',
  primeTrans: '--color--border-prime-trans',
  pale: '--color--border-pale',
  paleTrans: '--color--border-pale-trans',
  darken: '--color--border-darken',
  darkenTrans: '--color--border-darken-trans',
  secondaryTrans: '--color--border-secondary-trans',
} as const;

// Semantic Colors - Active
export const semanticActiveColors = {
  default: '--color--semantic-active',
  dark: '--color--semantic-active-dark',
  half: '--color--semantic-active-half',
  pale: '--color--semantic-active-pale',
} as const;

// Semantic Colors - Success
export const semanticSuccessColors = {
  default: '--color--semantic-success',
  dark: '--color--semantic-success-dark',
  half: '--color--semantic-success-half',
  pale: '--color--semantic-success-pale',
} as const;

// Semantic Colors - Warning
export const semanticWarningColors = {
  default: '--color--semantic-warning',
  dark: '--color--semantic-warning-dark',
  half: '--color--semantic-warning-half',
  pale: '--color--semantic-warning-pale',
} as const;

// Semantic Colors - Error
export const semanticErrorColors = {
  default: '--color--semantic-error',
  dark: '--color--semantic-error-dark',
  half: '--color--semantic-error-half',
  pale: '--color--semantic-error-pale',
} as const;

// Shadow Colors
export const shadowColors = {
  popUp: '--color--shadow-pop-up',
} as const;

// Combined semantic colors object
export const semanticColors = {
  active: semanticActiveColors,
  success: semanticSuccessColors,
  warning: semanticWarningColors,
  error: semanticErrorColors,
} as const;

// All colors combined for convenience
export const colors = {
  // Chart colors (base color system)
  chart: chartColors,
  
  // Theme colors (semantic colors for light/dark themes)
  text: textColors,
  background: backgroundColors,
  border: borderColors,
  semantic: semanticColors,
  shadow: shadowColors,
} as const;

// Type definitions for better TypeScript support

// Chart color types
export type BaseColorVar = typeof baseColors[keyof typeof baseColors];
export type TransparentColorVar = typeof transparentColors[keyof typeof transparentColors];
export type TransparentInverseColorVar = typeof transparentInverseColors[keyof typeof transparentInverseColors];
export type GrayColorVar = typeof grayColors[keyof typeof grayColors];
export type NeutronColorVar = typeof neutronColors[keyof typeof neutronColors];
export type RainbowColorName = typeof rainbowColorNames[keyof typeof rainbowColorNames];
export type RainbowColorVar = 
  | typeof rainbowAmberColors[keyof typeof rainbowAmberColors]
  | typeof rainbowOrangeColors[keyof typeof rainbowOrangeColors]
  | typeof rainbowRoseColors[keyof typeof rainbowRoseColors]
  | typeof rainbowPinkColors[keyof typeof rainbowPinkColors]
  | typeof rainbowPurpleColors[keyof typeof rainbowPurpleColors]
  | typeof rainbowBlueColors[keyof typeof rainbowBlueColors]
  | typeof rainbowCyanColors[keyof typeof rainbowCyanColors]
  | typeof rainbowEmeraldColors[keyof typeof rainbowEmeraldColors];
export type ChartColorVar = BaseColorVar | TransparentColorVar | TransparentInverseColorVar | GrayColorVar | NeutronColorVar | RainbowColorVar;

// Theme color types
export type TextColorVar = typeof textColors[keyof typeof textColors];
export type BackgroundColorVar = typeof backgroundColors[keyof typeof backgroundColors];
export type BorderColorVar = typeof borderColors[keyof typeof borderColors];
export type SemanticColorVar = 
  | typeof semanticActiveColors[keyof typeof semanticActiveColors]
  | typeof semanticSuccessColors[keyof typeof semanticSuccessColors]
  | typeof semanticWarningColors[keyof typeof semanticWarningColors]
  | typeof semanticErrorColors[keyof typeof semanticErrorColors];
export type ShadowColorVar = typeof shadowColors[keyof typeof shadowColors];
export type ThemeColorVar = TextColorVar | BackgroundColorVar | BorderColorVar | SemanticColorVar | ShadowColorVar;

// All color variables combined
export type ColorVar = ChartColorVar | ThemeColorVar;

/**
 * Utility function to get CSS variable value
 * @param variable - CSS variable name
 * @returns The CSS variable reference for use in styles
 */
export const getCSSVar = (variable: ColorVar): string => `var(${variable})`;

/**
 * Utility function to get computed CSS variable value
 * @param variable - CSS variable name
 * @param element - Optional element to get computed style from (defaults to document.documentElement)
 * @returns The computed value of the CSS variable
 */
export const getComputedCSSVar = (
  variable: ColorVar, 
  element: HTMLElement = document.documentElement
): string => {
  return getComputedStyle(element).getPropertyValue(variable).trim();
};

/**
 * Utility function to generate rainbow color CSS variable name
 * @param colorName - Rainbow color name (e.g., 'rose', 'blue')
 * @param suffix - Color suffix ('default', 'dark', 'half', 'pale')
 * @returns The CSS variable name for the rainbow color
 */
export const getRainbowColorVar = (
  colorName: RainbowColorName,
  suffix: 'default' | 'dark' | 'half' | 'pale' = 'default'
): string => {
  return `--color-chart--rainbow-${colorName}${suffix === 'default' ? '' : `-${suffix}`}`;
};

/**
 * Utility function to generate rainbow color CSS variable name with prefix
 * @param colorName - Rainbow color name (e.g., 'rose', 'blue')
 * @returns The CSS variable name with rainbow prefix (e.g., '--color-chart--rainbow-rose')
 */
export const useRainbowColor = (colorName: RainbowColorName): string => {
  return `--color-chart--rainbow-${colorName}`;
};

/**
 * Utility function to generate rainbow color CSS variable name with prefix (non-hook version)
 * @param colorName - Rainbow color name (e.g., 'rose', 'blue')
 * @returns The CSS variable name with rainbow prefix (e.g., '--color-chart--rainbow-rose')
 */
export const getRainbowColor = (colorName: RainbowColorName): string => {
  return `--color-chart--rainbow-${colorName}`;
};

/**
 * Generate semantic color CSS variable name
 * @param colorName - Semantic color name ('active', 'success', 'warning', 'error')
 * @param suffix - Color suffix ('default', 'dark', 'half', 'pale')
 * @returns The CSS variable name for the semantic color
 */
export const getSemanticColor = (
  colorName: 'active' | 'success' | 'warning' | 'error',
  suffix: 'default' | 'dark' | 'half' | 'pale' = 'default'
): string => {
  return `--color--semantic-${colorName}${suffix === 'default' ? '' : `-${suffix}`}`;
};

/**
 * Extract color name from CSS variable name for use with components that use CSS classes
 * @param cssVar - CSS variable name (e.g., '--color-chart--rainbow-rose')
 * @returns The color name (e.g., 'rose') or the original value if not a recognized CSS variable
 */
export const extractColorName = (cssVar: string): string => {
  // Handle rainbow colors
  const rainbowMatch = cssVar.match(/^--color-chart--rainbow-(.+)$/);
  if (rainbowMatch) {
    return rainbowMatch[1];
  }
  
  // Handle semantic colors - extract the base semantic color name
  const semanticMatch = cssVar.match(/^--color--semantic-(.+?)(?:-|$)/);
  if (semanticMatch) {
    return semanticMatch[1];
  }
  
  // Return the original value if it's not a CSS variable
  return cssVar;
}; 