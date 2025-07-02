import React, { useMemo } from "react";
import { calculateDurationInDays } from "../../utils/time";
import { calculateMaxOverlapCardinality, type PlacementResult } from "../../utils/placement";
import { type TimelineItemType as TimelineItemType, type TimelineItemDisplayConfig } from "../../types";
import { TimelineItem } from "./Item";
import styles from "./Group.module.scss";
import { TimelineConstCalc } from "../_constants";

interface TimelineGroupProps {
  groupData: {
    groupTitle: string;
    groupItems: TimelineItemType[];
    placements: PlacementResult[];
    isEndSpacer?: boolean;
  };
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = React.memo(({
  groupData,
  year,
  monthIndex,
  dayIndex,
  dayWidth,
  cellHeight,
  groupGap,
  displayConfig,
  onIssueClick,
}) => {
  // 🚀 性能优化：缓存高度计算
  const finalHeight = useMemo(() => {
    return groupData.isEndSpacer 
      ? TimelineConstCalc.groupsEndHeight 
      : `${calculateMaxOverlapCardinality(groupData.groupItems) * cellHeight + groupGap}px`;
  }, [groupData.isEndSpacer, groupData.groupItems, cellHeight, groupGap]);

  const finalMinHeight = useMemo(() => {
    return groupData.isEndSpacer 
      ? TimelineConstCalc.groupsEndHeight 
      : TimelineConstCalc.groupMinHeight;
  }, [groupData.isEndSpacer]);

  // 🚀 性能优化：缓存渲染项目列表
  const renderedItems = useMemo(() => {
    return groupData.placements.map((placement) => {
      const itemStartDate = placement.startDate;
      const itemStartYear = itemStartDate.getFullYear();
      const itemStartMonth = itemStartDate.getMonth();
      const itemStartDay = itemStartDate.getDate();

      // Only render item if it starts on this exact day
      if (
        itemStartYear === year &&
        itemStartMonth === monthIndex &&
        itemStartDay === dayIndex + 1
      ) {
        const durationInDays = calculateDurationInDays(
          itemStartDate,
          placement.endDate
        );

        return (
          <TimelineItem
            key={placement.item.id}
            item={placement.item}
            durationInDays={durationInDays}
            dayWidth={dayWidth}
            cellHeight={cellHeight}
            column={placement.column}
            displayConfig={displayConfig}
            onIssueClick={onIssueClick}
          />
        );
      }
      return null;
    }).filter(Boolean);
  }, [groupData.placements, year, monthIndex, dayIndex, dayWidth, cellHeight, displayConfig, onIssueClick]);

  return (
    <div
      className={styles["timeline-group"]}
      style={{
        height: finalHeight,
        minHeight: finalMinHeight,
      }}
    >
      {renderedItems}
    </div>
  );
}, (prevProps, nextProps) => {
  // 🚀 自定义比较函数：只有关键属性变化时才重新渲染
  return (
    prevProps.year === nextProps.year &&
    prevProps.monthIndex === nextProps.monthIndex &&
    prevProps.dayIndex === nextProps.dayIndex &&
    prevProps.dayWidth === nextProps.dayWidth &&
    prevProps.cellHeight === nextProps.cellHeight &&
    prevProps.groupGap === nextProps.groupGap &&
    prevProps.groupData === nextProps.groupData &&
    prevProps.displayConfig === nextProps.displayConfig &&
    prevProps.onIssueClick === nextProps.onIssueClick
  );
}); 