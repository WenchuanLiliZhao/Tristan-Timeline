# Timeline Issue Width Calculation

## Overview

This document explains the width calculation logic for timeline issues in the `TimelineItem` component. The calculation ensures that issue cards accurately span across their time duration, properly accounting for month boundaries and visual separators.

## Core Formula

```typescript
width = durationInDays * dayWidth - TimelineConst.itemHPadding * 2 + (spannedMonths - 1)
```

## Component Breakdown

### 1. Base Width Calculation
```typescript
durationInDays * dayWidth
```
- **Purpose**: Calculate the raw width based on the issue's duration
- **`durationInDays`**: Number of days the issue spans
- **`dayWidth`**: Width allocated for each day in the timeline (in pixels)

### 2. Padding Compensation
```typescript
- TimelineConst.itemHPadding * 2
```
- **Purpose**: Account for left and right padding inside the issue card
- **`TimelineConst.itemHPadding`**: Currently set to 2px
- **Calculation**: `2px * 2 = 4px` total horizontal padding to subtract

### 3. Month Boundary Compensation
```typescript
+ (spannedMonths - 1)
```
- **Purpose**: Compensate for visual separators between months
- **Logic**: Each month boundary typically has a 1px separator line
- **Calculation**: For `n` months spanned, there are `n-1` separator lines

## Month Span Calculation

```typescript
const calculateSpannedMonths = (startDate: Date, endDate: Date): number => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
};
```

### Algorithm Explanation
1. Extract year and month from start and end dates
2. Calculate total months difference: `(endYear - startYear) * 12 + (endMonth - startMonth)`
3. Add 1 to include both start and end months

## Practical Examples

### Example 1: Single Month Issue
- **Issue**: January 15 - January 25 (11 days)
- **Spanned Months**: 1
- **Calculation**: `11 * dayWidth - 4 + (1-1) = 11 * dayWidth - 4`
- **Month Compensation**: 0px (no month boundaries crossed)

### Example 2: Two Month Issue
- **Issue**: January 25 - February 10 (spans 2 months)
- **Spanned Months**: 2
- **Calculation**: `durationInDays * dayWidth - 4 + (2-1) = durationInDays * dayWidth - 3`
- **Month Compensation**: +1px (one month boundary crossed)

### Example 3: Three Month Issue
- **Issue**: January 15 - March 15 (spans 3 months)
- **Spanned Months**: 3
- **Calculation**: `durationInDays * dayWidth - 4 + (3-1) = durationInDays * dayWidth - 2`
- **Month Compensation**: +2px (two month boundaries crossed)

## Why Month Compensation is Necessary

In timeline visualizations, months are typically separated by visual dividers (borders, lines, or gaps). When an issue spans multiple months, its visual representation must account for these separators to maintain accurate positioning relative to the time grid.

Without month compensation:
- Long issues would appear shorter than their actual duration
- Visual alignment with date markers would be incorrect
- The timeline would appear compressed for multi-month items

## Implementation Details

### Constants Used
```typescript
// From _constants.ts
TimelineConst.itemHPadding = 2; // pixels
```

### CSS Considerations
The calculation works in conjunction with CSS styling:
```scss
.timeline-item-container {
  border: 1px solid var(--color--border-prime);
  padding: 8px;
  // ... other styles
}
```

### Border Impact
Note that while the component has a 1px border, this is handled by CSS box-sizing and doesn't need explicit compensation in the width calculation. The padding and month boundary compensation are the primary factors.

## Maintenance Notes

### When to Update This Calculation
- If `TimelineConst.itemHPadding` changes
- If the timeline's month separator width changes
- If the day width calculation method changes
- If CSS box-sizing model changes

### Debugging Tips
1. Check if issues align properly with date markers
2. Verify that multi-month issues don't appear compressed
3. Ensure single-month issues don't extend beyond their month boundaries
4. Test with various issue durations (1 day, 1 week, 1 month, 3+ months)

## Related Files
- `Item.tsx` - Contains the implementation
- `Item.module.scss` - CSS styling that affects the calculation
- `_constants.ts` - Defines padding and spacing constants
- `types.ts` - Defines the `TimelineItemType` interface with date fields 