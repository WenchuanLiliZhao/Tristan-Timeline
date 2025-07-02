/* eslint-disable react-refresh/only-export-components */
/**
 * 📅 Timeline时间线主组件
 *
 * 这是设计系统中最重要的组件之一，用于展示项目或任务的时间线。
 * Timeline可以显示多个项目在时间轴上的分布，支持分组、缩放和响应式布局。
 *
 * 🎯 主要特性：
 * - 智能布局：自动避免项目重叠，垂直分层显示
 * - 分组显示：可以按团队、状态等字段分组
 * - 时间缩放：支持年、月、日三种时间视图
 * - 响应式：自适应不同屏幕尺寸
 *
 * 📊 数据要求：
 * 每个时间线项目必须包含：id（唯一标识）、name（名称）、startDate（开始日期）、endDate（结束日期）
 *
 * 💡 使用示例：
 * const data = {
 *   meta: { sortBy: 'team' },
 *   data: [{
 *     groupTitle: "开发团队",
 *     groupItems: [{
 *       id: "1", name: "项目A",
 *       startDate: new Date("2024-01-01"),
 *       endDate: new Date("2024-02-01")
 *     }]
 *   }]
 * };
 * <Timeline inputData={data} />
 */

import React, { useRef, useCallback, useMemo, useState, useEffect } from "react";
import {
  type TimelineProps,
  type TimelineItemType,
  type TimelineItemDisplayConfig,
  type SortedTimelineDataType,
  type BaseTimelineItemType,
  BaseTimelineItemKeys,
} from "../types";
import {
  TimelineItemInterval,
  sortTimelineItemsByStartDate,
  findPlacement,
  groupTimelineItemsByField,
  type PlacementResult,
} from "../utils";
import { TimelineRuler } from "./OnLayout/TimelineRuler";
import { TimelineItems } from "./OnLayout/TimelineItems";
import { TimelineGroupDividers } from "./OnLayout/TimelineGroupDividers";
import { TimelineSidebar } from "./LeftSidebar/TimelineLeftSidebar";
import { GroupBySelector } from "./Shared/GroupBySelector";
import type { GroupPlacement } from "./LeftSidebar/TimelineLeftSidebar";
import { useCenterBasedZoom, useDisableBrowserGestures } from "../hooks";
import { useZoomLevelMonitor } from "../hooks/useZoomLevelMonitor";
import { useTimelineUrlParams } from "../hooks/useTimelineUrlParams";
import {
  scrollToDate,
  calculateDateFromScrollPosition,
  isDateInTimelineRange,
} from "../utils/datePosition";
import { parseTimelineUrlParams } from "../utils/urlParams";
import styles from "./Timeline.module.scss";
import { TimelineConst } from "./_constants";
import { FloatingButtonGroup } from "../../../ui-components/navigation/FloatingButtonGroup";
import {
  Button,
} from "../../../ui-components/general/Button/index";
import { TodayButton } from "./Shared/TodayButton";
import { RightSidebar } from "../../../ui-components";
import { IssueDetails } from "./IssueDetails";
import { useFullscreen } from "../../../ui-components/shared/useFullscreen";

// 内部函数：创建 zoom controls
function createZoomControls(
  timeViewConfig: InternalZoomConfig[],
  currentZoom: string,
  onZoomChange: (zoom: string) => void
): React.ReactElement {
  return (
    <div id={"timeline-zoom-controls"} style={{ display: "flex", gap: "4px" }}>
      {timeViewConfig.map((level) => (
        <Button
          key={level.type}
          variant={currentZoom === level.type ? "filled" : "ghost"}
          semantic={currentZoom === level.type ? "active" : "default"}
          onClick={() => onZoomChange(level.type)}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
}

// 默认时间视图配置
const DEFAULT_TIME_VIEW_CONFIG = [
  { type: "year", dayWidth: 4.5, label: "Year", setAsDefault: false },
  { type: "month", dayWidth: 8, label: "Month", setAsDefault: true },
  { type: "day", dayWidth: 24, label: "Day", setAsDefault: false },
] as const;

// 内部zoom配置类型
interface InternalZoomConfig {
  type: string;
  dayWidth: number;
  label: string;
  setAsDefault: boolean;
}

// Hook 来管理 zoom 状态和配置
function useTimelineZoom(
  zoomLevels?: Array<{
    label: string;
    dayWidth: number;
    setAsDefault?: boolean;
  }>
) {
  // 处理 zoom levels 转换为内部格式
  const timeViewConfig = useMemo((): InternalZoomConfig[] => {
    const levels =
      zoomLevels && zoomLevels.length > 0
        ? zoomLevels
        : DEFAULT_TIME_VIEW_CONFIG;
    return levels.map((zl) => ({
      ...zl,
      type: zl.label.toLowerCase().replace(" ", "-"),
      setAsDefault: zl.setAsDefault ?? false,
    }));
  }, [zoomLevels]);

  // 管理当前 zoom 状态
  const [currentZoom, setCurrentZoom] = useState<string>(() => {
    const defaultView = timeViewConfig.find((view) => view.setAsDefault);
    return defaultView ? defaultView.type : timeViewConfig[0].type;
  });

  // 获取当前 zoom 配置
  const currentZoomConfig = timeViewConfig.find(
    (config) => config.type === currentZoom
  )!;

  return {
    timeViewConfig,
    currentZoom,
    setCurrentZoom,
    currentZoomConfig,
    dayWidth: currentZoomConfig.dayWidth,
  };
}

// Hook 来管理分组状态和配置
function useTimelineGroupBy<T = Record<string, unknown>>(
  groupByOptions?: Array<{
    label: string;
    field: keyof (BaseTimelineItemType & T);
    setAsDefault?: boolean;
  }>,
  fallbackGroupBy?: keyof (BaseTimelineItemType & T)
) {
  // 管理当前分组字段
  const [currentGroupBy, setCurrentGroupBy] = useState<keyof (BaseTimelineItemType & T) | undefined>(() => {
    if (groupByOptions && groupByOptions.length > 0) {
      const defaultOption = groupByOptions.find((option) => option.setAsDefault);
      return defaultOption ? defaultOption.field : groupByOptions[0].field;
    }
    return fallbackGroupBy;
  });

  return {
    groupByOptions,
    currentGroupBy,
    setCurrentGroupBy,
  };
}

// 通用的Timeline组件 - 支持泛型，现在作为主要接口
export function Timeline<T = Record<string, unknown>>({
  // init 参数直接接收 TimelineItemDisplayConfig，简化配置
  inputData,
  init,
  groupBy,
  groupByOptions,
  groupTitleProperties: sidebarProperties,
  zoomLevels,
  fetchByTimeInterval,
  onItemClick,
  currentZoom: externalCurrentZoom,
  defaultDayWidth = 12,
  issueDetailsConfig,
  urlParams,
}: TimelineProps<T>) {
  // URL 参数管理
  const urlParamsHook = useTimelineUrlParams(urlParams);

  // 始终调用 useTimelineZoom hook（React Hook 规则）
  const zoomManagement = useTimelineZoom(zoomLevels);

  // 使用分组管理 hook，优先使用 URL 中的值
  const effectiveInitialGroupBy = (() => {
    if (urlParams?.recordGroupby && urlParamsHook.urlGroupBy && groupByOptions) {
      const validOption = groupByOptions.find(
        option => String(option.field) === urlParamsHook.urlGroupBy
      );
      if (validOption) {
        return validOption.field;
      }
    }
    return groupBy;
  })();
  
  const groupByManagement = useTimelineGroupBy(groupByOptions, effectiveInitialGroupBy);

  // 确定最终使用的 dayWidth
  const dayWidth = (() => {
    if (externalCurrentZoom && zoomLevels) {
      // 如果有有效的 currentZoom 和 zoomLevels，查找对应的 dayWidth
      const zoomConfig = zoomLevels.find(
        (zl) => zl.label.toLowerCase().replace(" ", "-") === externalCurrentZoom
      );
      return zoomConfig?.dayWidth || defaultDayWidth;
    } else if (zoomLevels && zoomManagement) {
      // 如果提供了 zoomLevels 且使用内部 zoom 管理
      return zoomManagement.dayWidth;
    } else {
      // 如果没有 zoom 功能，使用默认值
      return defaultDayWidth;
    }
  })();

  // Constants for layout calculations
  const cellHeight = TimelineConst.cellHeight; // Height of each item row in pixels
  const groupGapForTesting = TimelineConst.groupGap;

  // 获取当前使用的分组字段
  const effectiveGroupBy = groupByManagement.currentGroupBy || groupBy;

  // 处理输入数据：根据数据类型和 groupBy 参数决定如何处理
  const processedData = useMemo(() => {
    // 检查是否是已分组的数据
    const isGroupedData =
      Array.isArray(inputData) === false &&
      typeof inputData === "object" &&
      "data" in inputData &&
      "meta" in inputData;

    if (isGroupedData) {
      // 如果是已分组的数据，直接使用
      return inputData as SortedTimelineDataType<T>;
    } else {
      // 如果是原始数据数组
      const rawData = inputData as TimelineItemType<T>[];

      if (effectiveGroupBy) {
        // 如果指定了 groupBy，进行分组
        return groupTimelineItemsByField(rawData, effectiveGroupBy);
      } else {
        // 如果没有指定 groupBy，创建一个单组的数据结构
        return {
          meta: { sortBy: "id" as keyof (BaseTimelineItemType & T) },
          data: [
            {
              groupTitle: "",
              groupItems: rawData,
            },
          ],
        } as SortedTimelineDataType<T>;
      }
    }
  }, [inputData, effectiveGroupBy]);

  // Filter data based on fetchByTimeInterval
  const filteredData = useMemo(() => {
    if (!fetchByTimeInterval) {
      return processedData;
    }
    const [start, end] = fetchByTimeInterval;
    const filteredGroups = processedData.data
      .map((group) => {
        const filteredItems = group.groupItems.filter((item) => {
          const itemStart = new Date(item.startDate);
          return itemStart >= start && itemStart <= end;
        });
        return { ...group, groupItems: filteredItems };
      })
      .filter((group) => group.groupItems.length > 0);

    return { ...processedData, data: filteredGroups };
  }, [processedData, fetchByTimeInterval]);

  // 检测是否有分组（用于决定是否显示 sidebar）
  const hasGrouping = useMemo(() => {
    // 如果指定了 effectiveGroupBy，则有分组
    if (effectiveGroupBy) return true;

    // 如果输入数据是已分组格式且有多个组或组标题非空，则有分组
    const isGroupedData =
      Array.isArray(inputData) === false &&
      typeof inputData === "object" &&
      "data" in inputData &&
      "meta" in inputData;

    if (isGroupedData) {
      const groupedData = inputData as SortedTimelineDataType<T>;
      return (
        groupedData.data.length > 1 ||
        (groupedData.data.length === 1 && groupedData.data[0].groupTitle !== "")
      );
    }

    return false;
  }, [inputData, effectiveGroupBy]);

  // 添加主滚动容器的引用 - 现在只需要一个
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // 滚动事件的防抖处理
  const scrollTimeoutRef = useRef<number | null>(null);

  // 使用自定义hook实现中心缩放功能，针对主内容容器
  const { containerRef: zoomContainerRef } = useCenterBasedZoom(dayWidth);

  // 使用自定义hook禁用浏览器左右滑动手势
  const gestureDisableRef = useDisableBrowserGestures();

  // 👉 Add fullscreen hook targeting the whole document (page level)
  const {
    ref: docFsRef,
    isFullscreen,
    toggleFullscreen,
  } = useFullscreen<HTMLElement>();

  // Set the target element to the document's root so that the whole page enters full-screen
  useEffect(() => {
    // document.documentElement includes the entire page
    docFsRef(document.documentElement);
  }, [docFsRef]);

  // 🔍 使用zoom level监听器 - 实施方案A
  useZoomLevelMonitor(
    dayWidth,
    zoomLevels || [],
    {
      onZoomLevelChanged: () => {
        // console.log('🎯 Timeline zoom level changed:', {
        //   from: previousLevel?.label || 'none',
        //   to: newLevel.label,
        //   dayWidth: newLevel.dayWidth
        // });
      }
    }
  );

  // Flatten all items from all groups for timeline calculations
  const allItems = filteredData.data.flatMap((group) => group.groupItems);

  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(
    allItems as TimelineItemType<T>[]
  );

  // 构建用于计算时间间隔的数据，使用基础字段键
  const timelineIntervalData = sortedItems.map((item) => ({
    id: item.id || "",
    name: item.name || "",
    startDate:
      item.startDate ||
      item[BaseTimelineItemKeys.START_DATE as keyof typeof item],
    endDate:
      item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item],
  }));

  // Get list of years and start month that need to be displayed
  const { years: yearList, startMonth } = TimelineItemInterval({
    inputData: timelineIntervalData,
  });

  // 滚动事件处理函数
  const handleScroll = useCallback(() => {
    if (!urlParams?.recordCurrentDate || !mainScrollRef.current) {
      return;
    }

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 防抖处理，避免频繁更新 URL
    scrollTimeoutRef.current = window.setTimeout(() => {
      const container = mainScrollRef.current;
      if (!container || yearList.length === 0) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const sidebarWidth = hasGrouping ? TimelineConst.sidebarWidth : 0;

      const currentDate = calculateDateFromScrollPosition(
        scrollLeft,
        containerWidth,
        sidebarWidth,
        yearList,
        startMonth,
        dayWidth
      );

      if (currentDate && isDateInTimelineRange(currentDate, yearList)) {
        urlParamsHook.setUrlCurrentDate(currentDate);
      }
    }, 300); // 300ms 防抖
  }, [urlParams?.recordCurrentDate, yearList, startMonth, dayWidth, hasGrouping, urlParamsHook]);

  // 监听滚动事件
  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container || !urlParams?.recordCurrentDate) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, urlParams?.recordCurrentDate]);

  // URL 参数同步：groupBy 变化时更新 URL
  useEffect(() => {
    if (urlParams?.recordGroupby && groupByManagement.currentGroupBy) {
      const currentGroupByStr = String(groupByManagement.currentGroupBy);
      if (urlParamsHook.urlGroupBy !== currentGroupByStr) {
        urlParamsHook.setUrlGroupBy(currentGroupByStr);
      }
    }
  }, [groupByManagement.currentGroupBy, urlParams?.recordGroupby, urlParamsHook]);

  // 监听 URL 参数变化，只处理浏览器前进/后退或外部 URL 变化
  useEffect(() => {
    const handlePopState = () => {
      // 当浏览器前进/后退时，从 URL 读取参数并更新内部状态
      const parsedParams = parseTimelineUrlParams();
      
             // 更新 groupBy
       if (urlParams?.recordGroupby && parsedParams.groupBy && groupByOptions) {
         const validOption = groupByOptions.find(
           option => String(option.field) === parsedParams.groupBy
         );
         if (validOption && groupByManagement.currentGroupBy !== validOption.field) {
           groupByManagement.setCurrentGroupBy(validOption.field);
         }
         urlParamsHook.setStateFromUrl({ groupBy: parsedParams.groupBy });
       }
      
      // 更新 currentDate
      if (urlParams?.recordCurrentDate && parsedParams.currentDate) {
        urlParamsHook.setStateFromUrl({ currentDate: parsedParams.currentDate });
        
        // 滚动到指定日期
        const container = mainScrollRef.current;
        if (container && yearList.length > 0) {
          const sidebarWidth = hasGrouping ? TimelineConst.sidebarWidth : 0;
          scrollToDate(
            container,
            parsedParams.currentDate,
            yearList,
            startMonth,
            dayWidth,
            sidebarWidth,
            false
          );
        }
      }
    };

    // 监听浏览器前进/后退事件
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
     }, [urlParams, groupByOptions, groupByManagement, urlParamsHook, yearList, startMonth, dayWidth, hasGrouping]);

  // 初始化时滚动到指定日期或今天（只在页面刷新时执行）
  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container || yearList.length === 0) return;

    // 只在页面刷新时进行滚动，避免在 URL 参数更新时强制滚动
    if (!urlParamsHook.isInitialLoad) return;

    const sidebarWidth = hasGrouping ? TimelineConst.sidebarWidth : 0;
    
    // 如果 URL 中有日期参数，滚动到该日期
    if (urlParamsHook.urlCurrentDate) {
      scrollToDate(
        container,
        urlParamsHook.urlCurrentDate,
        yearList,
        startMonth,
        dayWidth,
        sidebarWidth,
        false
      );
      return;
    }

    // 如果配置了 defaultToday 且没有其他 URL 参数，滚动到今天
    if (urlParams?.defaultToday) {
      const hasAnyTimelineParams = urlParamsHook.urlGroupBy || urlParamsHook.urlCurrentDate;
      if (!hasAnyTimelineParams) {
        const today = new Date();
        if (isDateInTimelineRange(today, yearList)) {
          scrollToDate(
            container,
            today,
            yearList,
            startMonth,
            dayWidth,
            sidebarWidth,
            false
          );
        }
      }
    }
  }, [yearList, startMonth, dayWidth, hasGrouping, urlParamsHook.urlCurrentDate, urlParamsHook.urlGroupBy, urlParams?.defaultToday, urlParamsHook.isInitialLoad]);



  // 计算 Timeline 的总宽度
  const calculateTimelineWidth = useCallback(() => {
    let totalDays = 0;

    yearList.forEach((year, yearIndex) => {
      // 第一年从 startMonth 开始，其他年份从1月开始
      const monthStart = yearIndex === 0 ? startMonth : 0;
      const monthEnd = 11; // 12月结束

      for (let month = monthStart; month <= monthEnd; month++) {
        // 计算当前月份的天数
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        totalDays += daysInMonth;
      }
    });

    // 只有在有分组时才加上左侧边栏的宽度
    return (
      totalDays * dayWidth + (hasGrouping ? TimelineConst.sidebarWidth : 0)
    );
  }, [yearList, startMonth, dayWidth, hasGrouping]);

  // 获取计算出的 Timeline 总宽度
  const timelineWidth = calculateTimelineWidth();

  // 生成 zoom controls（如果有 zoomLevels）
  const zoomControls = useMemo(() => {
    if (!zoomLevels || !zoomManagement) return null;

    return createZoomControls(
      zoomManagement.timeViewConfig,
      zoomManagement.currentZoom,
      zoomManagement.setCurrentZoom
    );
  }, [zoomLevels, zoomManagement]);

  // 获取当前选择的 groupBy 选项的 label（用于侧边栏展示）
  const currentGroupByLabel = useMemo(() => {
    if (!groupByOptions || !groupByManagement.currentGroupBy) return undefined;

    const currentOption = groupByOptions.find(
      (option) => option.field === groupByManagement.currentGroupBy
    );
    return currentOption?.label;
  }, [groupByOptions, groupByManagement.currentGroupBy]);

  // 添加侧边栏状态和处理程序
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimelineItemType<T> | null>(null);

  const handleItemClick = useCallback((item: TimelineItemType<T>) => {
    // 调用外部回调（如果有）
    if (onItemClick) onItemClick(item);
    setSelectedItem(item);
    setSidebarOpen(true);
  }, [onItemClick]);

  // Early return if no items to display
  if (allItems.length === 0) {
    return (
      <div className={styles["timeline-ruler-container"]}>
        <div>No timeline items to display</div>
      </div>
    );
  }

  // Pre-calculate placements for each group separately
  const groupPlacements: GroupPlacement<T>[] = filteredData.data.map((group) => {
    const sortedGroupItems = sortTimelineItemsByStartDate(
      group.groupItems as TimelineItemType<T>[]
    );
    const placements: PlacementResult[] = [];

    sortedGroupItems.forEach((item) => {
      const startDate = new Date(
        item.startDate ||
          item[BaseTimelineItemKeys.START_DATE as keyof typeof item]
      );
      const endDate = new Date(
        item.endDate || item[BaseTimelineItemKeys.END_DATE as keyof typeof item]
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const column = findPlacement(placements, item as any, startDate, endDate);

      placements.push({
        column,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item: item as any,
        startDate,
        endDate,
      });
    });

    return {
      groupTitle: group.groupTitle,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groupItems: group.groupItems as any,
      placements,
    };
  });

  // 添加一个空的占位分组，确保垂直滚动到底部时有足够的空白区域
  groupPlacements.push({
    groupTitle: "", // 空标题
    groupItems: [], // 空项目列表
    placements: [], // 空放置结果
    isEndSpacer: true, // 标识这是最后的占位分组
  });

  return (
    <React.Fragment>
      <div className={styles["timeline-container"]}>
        {/* 独立的 GroupBy 选择器覆盖层 */}
        {hasGrouping && (
          <GroupBySelector
            groupBy={currentGroupByLabel}
            groupByOptions={groupByOptions?.map(option => ({
              key: String(option.field),
              label: option.label,
              value: String(option.field)
            }))}
            onGroupByChange={(value) => {
              const option = groupByOptions?.find(opt => String(opt.field) === value);
              if (option && groupByManagement) {
                groupByManagement.setCurrentGroupBy(option.field);
              }
            }}
          />
        )}

        <div className={styles["timeline-body"]}>
          {/* 主滚动容器 - 处理横向滚动，ruler 和 content 都在其中 */}
          <div
            ref={(el) => {
              mainScrollRef.current = el;
              zoomContainerRef.current = el;
              gestureDisableRef.current = el;
            }}
            className={styles["timeline-main-scroll"]}
          >
            {/* 时间线尺子组件 - sticky 定位在顶部 */}
            <div
              className={styles["timeline-ruler-sticky"]}
              style={{ width: `${timelineWidth}px` }}
            >
              {/* 左侧边栏的尺子占位区域 */}
              {hasGrouping && (
                <div className={styles["timeline-sidebar-ruler-placeholder"]}>
                  <TimelineSidebar
                    groupPlacements={groupPlacements}
                    cellHeight={cellHeight}
                    groupGap={groupGapForTesting}
                    isRulerMode={true}
                    sidebarProperties={sidebarProperties}
                  />
                </div>
              )}

              {/* 右侧时间线尺子 */}
              <div className={styles["timeline-ruler-content"]}>
                <TimelineRuler
                  yearList={yearList}
                  startMonth={startMonth}
                  dayWidth={dayWidth}
                />
              </div>
            </div>

            {/* 时间线内容区域 */}
            <div
              className={styles["timeline-content-inner"]}
              style={{ width: `${timelineWidth}px` }}
            >
              {/* 左侧可调整大小的侧边栏 */}
              {hasGrouping && (
                <div className={styles["timeline-sidebar"]}>
                  <TimelineSidebar
                    groupPlacements={groupPlacements}
                    cellHeight={cellHeight}
                    groupGap={groupGapForTesting}
                    sidebarProperties={sidebarProperties}
                  />
                </div>
              )}

              {/* 时间线项目容器 */}
              <div className={styles["timeline-items-container"]}>
                                {/* Group Dividers 覆盖层 - 当有分组时显示 */}
                {hasGrouping && (
                  <TimelineGroupDividers
                    groupPlacements={groupPlacements}
                    cellHeight={cellHeight}
                    groupGap={groupGapForTesting}
                    timelineWidth={timelineWidth}
                  />
                )}

                {/* 时间线项目容器 */}
                <TimelineItems
                  yearList={yearList}
                  startMonth={startMonth}
                  dayWidth={dayWidth}
                  cellHeight={cellHeight}
                  groupGap={groupGapForTesting}
                  groupPlacements={groupPlacements}
                  displayConfig={init as TimelineItemDisplayConfig}
                  onIssueClick={handleItemClick as unknown as (issue: TimelineItemType) => void}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 渲染控制面板（zoom controls） */}
      <FloatingButtonGroup
        itemGroups={[
          [
            // Added fullscreen toggle button
            <Button
              key="fullscreen-toggle"
              icon={isFullscreen ? "fullscreen_exit" : "fullscreen"}
              variant="ghost"
              onClick={toggleFullscreen}
            />
          ],
          [
            <TodayButton
              key="today"
              scrollContainerRef={mainScrollRef}
              yearList={yearList}
              startMonth={startMonth}
              dayWidth={dayWidth}
              hasGrouping={hasGrouping}
              variant="ghost"
            />,
          ],
          ...(zoomControls ? [[zoomControls]] : []),
        ].filter(group => group.length > 0)}
        position="bottom-right"
      />

      {/* 渲染右侧边栏 */}
      <RightSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        width={400}
        title={issueDetailsConfig?.title}
      >
        {selectedItem && (
          <IssueDetails
            item={selectedItem}
            config={issueDetailsConfig}
          />
        )}
      </RightSidebar>
    </React.Fragment>
  );
}

// 导出 useTimelineZoom hook 供外部使用
export { useTimelineZoom };

// 默认导出Timeline组件
export { Timeline as default };
