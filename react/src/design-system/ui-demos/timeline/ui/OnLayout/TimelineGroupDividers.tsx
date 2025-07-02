import type { GroupPlacement } from "../LeftSidebar/TimelineLeftSidebar";
import styles from "./TimelineGroupDividers.module.scss";

interface TimelineGroupDividersProps<T = Record<string, unknown>> {
  groupPlacements: GroupPlacement<T>[];
  cellHeight: number;
  groupGap: number;
  timelineWidth: number;
}

export const TimelineGroupDividers = <T = Record<string, unknown>>({
  groupPlacements,
  cellHeight,
  groupGap,
  timelineWidth,
}: TimelineGroupDividersProps<T>) => {
  return (
    <div className={styles["timeline-group-dividers"]}>
      {groupPlacements.slice(0, -1).map((_, groupIndex) => {
        // 计算当前分组之前所有分组的累积高度
        const cumulativeHeight = groupPlacements
          .slice(0, groupIndex + 1)
          .reduce((total, group) => {
            if (group.isEndSpacer) return total;
            // 使用和 TimelineGroup 相同的高度计算逻辑
            const maxColumn = group.placements.length > 0 
              ? Math.max(...group.placements.map(p => p.column)) + 1
              : 1;
            return total + (maxColumn * cellHeight + groupGap);
          }, 0);

        return (
          <div
            key={groupIndex}
            className={styles["timeline-group-divider"]}
            style={{
              top: `${cumulativeHeight}px`,
              width: `${timelineWidth}px`
            }}
          />
        );
      })}
    </div>
  );
}; 