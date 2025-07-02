/**
 * Tristan UI Timeline - A modern React timeline component
 * 
 * This library provides a comprehensive timeline component built on top of tristan-ui.
 * 
 * @example
 * ```typescript
 * import { Timeline, TimelineConfigBuilder } from 'tristan-ui-timeline';
 * 
 * const config = new TimelineConfigBuilder()
 *   .addProgress('completion')
 *   .addTag('status', statusMapping)
 *   .build();
 * 
 * <Timeline 
 *   inputData={myData} 
 *   init={config}
 *   groupBy="team"
 * />
 * ```
 */

// Main Timeline Component
export { Timeline } from './design-system/ui-demos/timeline/ui/Timeline';
export { TimelineView } from './design-system/ui-demos/timeline/ui/TimelineView';

// Types and Interfaces
export type {
  BaseTimelineItemType,
  TimelineItemType,
  TimelineGroupType,
  SortedTimelineDataType,
  TimelineProps,
  TimelineItemDisplayConfig,
  FieldDisplayConfig,
  GroupByOption,
  SidebarPropertyConfig,
  ZoomLevelType,
  TimelineColorType,
  ProgressColorStop,
  ProgressTooltipInterval,
  TimelineUrlParamsConfig,
  FieldDisplayType
} from './design-system/ui-demos/timeline/types';

// Configuration Builder
export { TimelineConfigBuilder } from './design-system/ui-demos/timeline/types';

// Constants
export { BaseTimelineItemKeys } from './design-system/ui-demos/timeline/types';

// Hooks
export {
  useCenterBasedZoom,
  useDisableBrowserGestures,
  useTimelineUrlParams,
  useVirtualizedTimeline,
  useTimelineVirtualization,
  useVirtualScrollPerformance,
  useZoomLevelMonitor,
  useTodayButtonZoomResponse
} from './design-system/ui-demos/timeline/hooks';

// Hook Types
export type {
  ZoomLevelMonitorCallbacks,
  ZoomLevelMonitorResult,
  VirtualizedTimelineConfig,
  VisibleTimeRange,
  VirtualScrollProps,
  UseTimelineUrlParamsReturn
} from './design-system/ui-demos/timeline/hooks';

// Utilities (export all)
export * from './design-system/ui-demos/timeline/utils';

// Issue Details Configuration (if needed)
export type { IssueDetailsConfig } from './design-system/ui-demos/timeline/issueDetailsConfig';