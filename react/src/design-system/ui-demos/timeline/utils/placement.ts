/**
 * Timeline项目放置和布局相关的工具函数
 */

import { type TimelineItemType } from "../types";

/**
 * Represents the result of placing a timeline item in a specific column
 */
export interface PlacementResult {
  column: number;
  item: TimelineItemType;
  startDate: Date;
  endDate: Date;
}

/**
 * Check if two date ranges overlap
 */
export const doDateRangesOverlap = (
  start1: Date, 
  end1: Date, 
  start2: Date, 
  end2: Date
): boolean => {
  return !(end1 < start2 || start1 > end2);
};

/**
 * Find the appropriate column (vertical position) for a new timeline item
 */
export const findPlacement = (
  placements: PlacementResult[],
  _currentItem: TimelineItemType,
  currentStartDate: Date,
  currentEndDate: Date
): number => {
  if (placements.length === 0) return 0;

  const maxColumn = Math.max(...placements.map(p => p.column));
  
  for (let col = 0; col <= maxColumn + 1; col++) {
    const itemsInColumn = placements.filter(p => p.column === col);
    
    const isColumnAvailable = itemsInColumn.every(placement => {
      return currentEndDate < placement.startDate || currentStartDate > placement.endDate;
    });

    if (isColumnAvailable) {
      return col;
    }
  }

  return maxColumn + 1;
};

/**
 * Calculate maximum overlap cardinality for timeline items
 */
export const calculateMaxOverlapCardinality = (items: TimelineItemType[]): number => {
  if (items.length === 0) return 1;
  
  // Create events array with start and end events
  const events: Array<{ date: Date; type: 'start' | 'end' }> = [];
  
  items.forEach(item => {
    events.push({ date: item.startDate, type: 'start' });
    events.push({ date: item.endDate, type: 'end' });
  });
  
  // Sort events by date, with end events before start events for same date
  events.sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare === 0) {
      return a.type === 'end' ? -1 : 1;
    }
    return dateCompare;
  });
  
  let currentOverlap = 0;
  let maxOverlap = 0;
  
  events.forEach(event => {
    if (event.type === 'start') {
      currentOverlap++;
      maxOverlap = Math.max(maxOverlap, currentOverlap);
    } else {
      currentOverlap--;
    }
  });
  
  return Math.max(maxOverlap, 1);
}; 