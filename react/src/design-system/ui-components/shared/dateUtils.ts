/**
 * Date formatting utilities for UI components
 */

export interface DateFormatOptions {
  locale?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  day?: '2-digit' | 'numeric';
  month?: '2-digit' | 'numeric' | 'long' | 'short' | 'narrow';
  year?: '2-digit' | 'numeric';
}

/**
 * Format a date for display in UI components
 * 
 * @param year - The year
 * @param month - The month (0-based: 0=January, 1=February, etc.)
 * @param day - The day of the month
 * @param options - Formatting options
 * @returns Formatted date string
 * 
 * @example
 * formatDate(2024, 1, 12) // "12 Feb 2024"
 * formatDate(2024, 1, 12, { locale: 'zh-CN' }) // "2024年2月12日"
 * formatDate(2024, 1, 12, { month: 'long', day: 'numeric' }) // "12 February 2024"
 */
export const formatDate = (
  year: number, 
  month: number, 
  day: number, 
  options: DateFormatOptions = {}
): string => {
  const {
    locale = 'en-GB',
    day: dayFormat = '2-digit',
    month: monthFormat = 'short',
    year: yearFormat = 'numeric',
    ...otherOptions
  } = options;

  const date = new Date(year, month, day);
  
  return date.toLocaleDateString(locale, {
    day: dayFormat,
    month: monthFormat,
    year: yearFormat,
    ...otherOptions
  });
};

/**
 * Format the current date
 * 
 * @param options - Formatting options
 * @returns Formatted current date string
 */
export const formatToday = (options: DateFormatOptions = {}): string => {
  const today = new Date();
  return formatDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    options
  );
};

/**
 * Format a Date object for display
 * 
 * @param date - The Date object to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatDateObject = (
  date: Date, 
  options: DateFormatOptions = {}
): string => {
  return formatDate(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    options
  );
};

/**
 * Common date format presets
 */
export const DateFormats = {
  // 12 Feb 2024
  short: { day: '2-digit', month: 'short', year: 'numeric' } as DateFormatOptions,
  
  // 12 February 2024
  long: { day: 'numeric', month: 'long', year: 'numeric' } as DateFormatOptions,
  
  // 12/02/2024
  numeric: { day: '2-digit', month: '2-digit', year: 'numeric' } as DateFormatOptions,
  
  // Feb 12
  monthDay: { month: 'short', day: 'numeric' } as DateFormatOptions,
  
  // 2024
  yearOnly: { year: 'numeric' } as DateFormatOptions,
}; 