// 📦 导出所有类型定义
export * from './types';

// 🔧 导出所有工具函数
export * from './utils';

// 🔍 导出zoom level监听器hooks (优先导出)
export { useZoomLevelMonitor, useTodayButtonZoomResponse } from './hooks/useZoomLevelMonitor';

// ⚡ 导出所有 Hooks
export * from './hooks';

// 🎨 导出主组件
// export { Timeline } from './ui/Timeline';
export { IssueDetails } from './ui/IssueDetails';
export { TimelineView, type TimelineViewRef } from './ui/TimelineView';

// 🪝 导出 hooks 和工具函数
export { useTimelineZoom } from './ui/Timeline';

// 🎯 便利导出：常用的具体函数（避免深层导入）
export { groupTimelineItemsByField, sortTimelineItemsByStartDate } from './utils/sorting';
export { findPlacement, calculateMaxOverlapCardinality } from './utils/placement';
export { TimelineItemInterval, calculateDurationInDays, monthNames } from './utils/time';

// Export configuration helpers
export { 
  createFieldConfig,
  createSidebarProperty,
  TimelineConfigBuilder
} from './types';

// Issue Details configuration helpers
export { IssueDetailsConfigBuilder } from './issueDetailsConfig';

export type { IssueDetailsConfig, PropertyConfig } from './issueDetailsConfig';