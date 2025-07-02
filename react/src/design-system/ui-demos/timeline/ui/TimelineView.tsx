import React, { useState } from "react";
import { RightSidebar, TristanLayoutContent } from "../../../ui-components";
import { Timeline } from "./Timeline";
import { IssueDetails } from "./IssueDetails";
import type { TimelineProps, TimelineItemType } from "../types";
import { useTimelineUrlParams } from "../hooks/useTimelineUrlParams";

// Reusable Timeline view with integrated right sidebar displaying issue details
export function TimelineView<T = Record<string, unknown>>(props: TimelineProps<T>): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);
  
  // URL 参数管理
  const urlParamsHook = useTimelineUrlParams(props.urlParams);

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
        <Timeline<T>
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
            />
          )}
        </RightSidebar>
      }
    />
  );
}