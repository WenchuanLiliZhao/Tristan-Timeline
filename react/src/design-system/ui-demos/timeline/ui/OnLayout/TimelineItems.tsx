import React, { useMemo } from "react";
import { getDaysInMonth } from "../../utils/time";
import {
  type TimelineItemType,
  type TimelineItemDisplayConfig,
} from "../../types";
import { TimelineGroup } from "../OnTimeline/Group";
import { Column } from "../Shared/Column";
import { TimelineConst } from "../_constants";
import type { GroupPlacement } from "../LeftSidebar/TimelineLeftSidebar";
// import styles from "../../Timeline.module.scss";
import styles from "./TimelineItems.module.scss";

interface TimelineItemsProps<T = Record<string, unknown>> {
  yearList: number[];
  startMonth: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  groupPlacements: GroupPlacement<T>[];
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}

// 🚀 优化的年份渲染组件
const YearRenderer = React.memo<{
  year: number;
  yearIndex: number;
  startMonth: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupPlacements: any[];
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}>(
  ({
    year,
    yearIndex,
    startMonth,
    dayWidth,
    cellHeight,
    groupGap,
    groupPlacements,
    displayConfig,
    onIssueClick,
  }) => {
    // 🚀 性能优化：缓存月份列表计算
    const monthIndices = useMemo(() => {
      const length = yearIndex === 0 ? 12 - startMonth : 12;
      return Array.from({ length }, (_, i) =>
        yearIndex === 0 ? i + startMonth : i
      );
    }, [yearIndex, startMonth]);

    return (
      <React.Fragment key={yearIndex}>
        {/* 占位空间，与年份标签对齐 - 透明占位 */}
        <Column className={styles["timeline-ruler-column"]}>
          {monthIndices.map((monthIndex) => (
            <MonthRenderer
              key={monthIndex}
              year={year}
              monthIndex={monthIndex}
              dayWidth={dayWidth}
              cellHeight={cellHeight}
              groupGap={groupGap}
              groupPlacements={groupPlacements}
              displayConfig={displayConfig}
              onIssueClick={onIssueClick}
            />
          ))}
        </Column>
      </React.Fragment>
    );
  }
);

// 🚀 优化的月份渲染组件
const MonthRenderer = React.memo<{
  year: number;
  monthIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  groupPlacements: GroupPlacement[];
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}>(
  ({
    year,
    monthIndex,
    dayWidth,
    cellHeight,
    groupGap,
    groupPlacements,
    displayConfig,
    onIssueClick,
  }) => {
    // 🚀 性能优化：缓存天数计算
    const daysInMonth = useMemo(
      () => getDaysInMonth(year, monthIndex),
      [year, monthIndex]
    );

    // 🚀 性能优化：批量渲染天数，减少DOM操作
    const dayElements = useMemo(() => {
      const batchSize = TimelineConst.performance.batchRenderDays;
      const elements = [];

      for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex += batchSize) {
        const batchEnd = Math.min(dayIndex + batchSize, daysInMonth);
        const batchElements = [];

        for (let i = dayIndex; i < batchEnd; i++) {
          batchElements.push(
            <DayRenderer
              key={i}
              year={year}
              monthIndex={monthIndex}
              dayIndex={i}
              dayWidth={dayWidth}
              cellHeight={cellHeight}
              groupGap={groupGap}
              groupPlacements={groupPlacements}
              displayConfig={displayConfig}
              onIssueClick={onIssueClick}
            />
          );
        }

        elements.push(...batchElements);
      }

      return elements;
    }, [
      year,
      monthIndex,
      daysInMonth,
      dayWidth,
      cellHeight,
      groupGap,
      groupPlacements,
      displayConfig,
      onIssueClick,
    ]);

    return (
      <div key={monthIndex} className={styles["timeline-ruler-month-column"]}>
        <Column className={`${styles["timeline-ruler-column"]}`}>
          {dayElements}
        </Column>
      </div>
    );
  }
);

// 🚀 优化的天渲染组件
const DayRenderer = React.memo<{
  year: number;
  monthIndex: number;
  dayIndex: number;
  dayWidth: number;
  cellHeight: number;
  groupGap: number;
  groupPlacements: GroupPlacement[];
  displayConfig?: TimelineItemDisplayConfig;
  onIssueClick?: (issue: TimelineItemType) => void;
}>(
  ({
    year,
    monthIndex,
    dayIndex,
    dayWidth,
    cellHeight,
    groupGap,
    groupPlacements,
    displayConfig,
    onIssueClick,
  }) => {
    // 🚀 性能优化：只有当天有项目时才渲染分组
    const hasItemsOnThisDay = useMemo(() => {
      return groupPlacements.some((groupData) =>
        groupData.placements.some((placement) => {
          const itemStartDate = placement.startDate;
          const itemStartYear = itemStartDate.getFullYear();
          const itemStartMonth = itemStartDate.getMonth();
          const itemStartDay = itemStartDate.getDate();

          return (
            itemStartYear === year &&
            itemStartMonth === monthIndex &&
            itemStartDay === dayIndex + 1
          );
        })
      );
    }, [groupPlacements, year, monthIndex, dayIndex]);

    return (
      <div
        key={dayIndex}
        className={styles["timeline-ruler-day-column"]}
        style={{ width: `${dayWidth}px` }}
      >
        {/* 时间线项目内容 - 只在有项目时渲染 */}
        {hasItemsOnThisDay && (
          <div className={styles["timeline-groups"]}>
            {groupPlacements.map((groupData, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <TimelineGroup
                  groupData={groupData}
                  year={year}
                  monthIndex={monthIndex}
                  dayIndex={dayIndex}
                  dayWidth={dayWidth}
                  cellHeight={cellHeight}
                  groupGap={groupGap}
                  displayConfig={displayConfig}
                  onIssueClick={onIssueClick}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export const TimelineItems = React.memo(
  <T = Record<string, unknown>,>({
    yearList,
    startMonth,
    dayWidth,
    cellHeight,
    groupGap,
    groupPlacements,
    displayConfig,
    onIssueClick,
  }: TimelineItemsProps<T>) => {
    return (
      <Column className={styles["timeline-vertical-column-container"]}>
        {/* ... */}
        {yearList.map((year, yearIndex) => (
          <YearRenderer
            key={year}
            year={year}
            yearIndex={yearIndex}
            startMonth={startMonth}
            dayWidth={dayWidth}
            cellHeight={cellHeight}
            groupGap={groupGap}
            groupPlacements={groupPlacements}
            displayConfig={displayConfig}
            onIssueClick={onIssueClick}
          />
        ))}
      </Column>
    );
  }
) as <T = Record<string, unknown>>(
  props: TimelineItemsProps<T>
) => React.ReactElement;
