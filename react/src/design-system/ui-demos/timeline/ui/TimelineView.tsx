import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { RightSidebar, TristanLayoutContent } from "tristan-ui";
import { Timeline, type TimelineRef } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";
import { useTimelineUrlParams } from "../hooks/useTimelineUrlParams";

// TimelineView 组件的公共方法接口
export interface TimelineViewRef {
  scrollToDate: (date: Date) => void;
}

// Reusable Timeline view with integrated right sidebar displaying issue details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimelineView = forwardRef<TimelineViewRef, TimelineProps<any>>(function TimelineView<T = Record<string, unknown>>(props: TimelineProps<T>, ref: React.Ref<TimelineViewRef>) {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);
  const timelineRef = useRef<TimelineRef>(null);
  
  // URL 参数管理
  const urlParamsHook = useTimelineUrlParams(props.urlParams);
  
  // 滚动到日期的回调函数
  const handleScrollToDate = useCallback((date: Date) => {
    timelineRef.current?.scrollToDate(date);
  }, []);

  // 暴露组件的公共方法
  useImperativeHandle(ref, () => ({
    scrollToDate: handleScrollToDate,
  }), [handleScrollToDate]);

  // When a timeline item is clicked, update local state and forward the event if provided
  const handleItemClick = (item: TimelineItemType<T>) => {
    props.onItemClick?.(item);
    
    // Only set selected item if issueDetailsConfig is provided
    if (props.issueDetailsConfig) {
      setSelectedItem(item);
    }
  };

  // 从 URL 参数中获取初始 groupBy（如果配置了且 URL 中有值）
  const effectiveGroupBy = (() => {
    if (props.urlParams?.recordGroupby && urlParamsHook.urlGroupBy) {
      // 验证 URL 中的 groupBy 是否在 groupByOptions 中
      if (props.groupByOptions) {
        const validOption = props.groupByOptions.find(
          option => String(option.field) === urlParamsHook.urlGroupBy
        );
        if (validOption) {
          return validOption.field;
        }
      }
    }
    return props.groupBy;
  })();


  return (
    <TristanLayoutContent
      main={
        <Timeline
          ref={timelineRef}
          {...props}
          groupBy={effectiveGroupBy}
          onItemClick={handleItemClick}
        />
      }
      right={
        <RightSidebar
          isOpen={Boolean(selectedItem && props.issueDetailsConfig)}
          onClose={() => setSelectedItem(null)}
          width={400}
          title={props.issueDetailsConfig?.title}
        >
          {selectedItem && props.issueDetailsConfig && (
            <IssueDetails<T>
              item={selectedItem}
              config={props.issueDetailsConfig}
              onScrollToDate={handleScrollToDate}
            />
          )}
        </RightSidebar>
      }
    />
  );
});