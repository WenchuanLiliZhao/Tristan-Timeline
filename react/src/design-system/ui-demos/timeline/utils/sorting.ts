/**
 * 排序和分组相关的工具函数
 */

import { type TimelineItemType, type SortedTimelineDataType, BaseTimelineItemKeys } from "../types";

/**
 * Sort timeline items by start date
 */
export const sortTimelineItemsByStartDate = <T = Record<string, unknown>>(
  items: TimelineItemType<T>[]
): TimelineItemType<T>[] => {
  return [...items].sort((a, b) => {
    const dateA = a.startDate || a[BaseTimelineItemKeys.START_DATE as keyof typeof a];
    const dateB = b.startDate || b[BaseTimelineItemKeys.START_DATE as keyof typeof b];
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });
};

/**
 * Group timeline items by a specific field
 */
export function groupTimelineItemsByField<T = Record<string, unknown>>(
  items: TimelineItemType<T>[],
  groupBy: keyof (TimelineItemType<T>)
): SortedTimelineDataType<T> {
  // Group items by the specified field
  const groups = items.reduce((acc, item) => {
    const groupValue = String(item[groupBy] || 'Unknown');
    if (!acc[groupValue]) {
      acc[groupValue] = [];
    }
    acc[groupValue].push(item);
    return acc;
  }, {} as Record<string, TimelineItemType<T>[]>);

  // Convert to the expected data structure
  const data = Object.entries(groups).map(([groupTitle, groupItems]) => ({
    groupTitle,
    groupItems: sortTimelineItemsByStartDate(groupItems as TimelineItemType<T>[])
  }));

  return {
    meta: {
      sortBy: groupBy
    },
    data
  };
}

/**
 * Get color for status
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    "High Risks": "#dc3545",
    "Manageable Risk": "#ffc107", 
    "On Track": "#28a745",
    "Not Yet Started": "#6c757d",
  };
  return statusColors[status] || "#6c757d";
};

/**
 * Get color for team
 */
export const getTeamColor = (team: string): string => {
  const teamColors: Record<string, string> = {
    "Function": "#007bff",
    "Retail": "#28a745",
    "E-com": "#17a2b8",
    "Brand Marketing": "#ffc107",
    "Product": "#6f42c1",
    "Fulfillment": "#fd7e14",
    "Corporate": "#e83e8c",
    "Tech": "#20c997",
  };
  return teamColors[team] || "#6c757d";
}; 