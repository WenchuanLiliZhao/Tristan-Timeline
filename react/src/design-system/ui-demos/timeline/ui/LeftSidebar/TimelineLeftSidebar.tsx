import {} from "react";
import styles from "./TimelineLeftSidebar.module.scss";
import { TimelineConst, TimelineConstCalc } from "../_constants";
import { type TimelineItemType, type SidebarPropertyConfig, type ProgressTooltipInterval } from "../../types";
import { type PlacementResult } from "../../utils/placement";
import {
  RichTooltip,
  RichTooltipItem,
  PropertyDistributionBar,
} from "../../../../ui-components";

export interface GroupPlacement<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItemType<T>[];
  placements: PlacementResult[];
  isEndSpacer?: boolean; // 标识是否为最后的占位分组
}

interface TimelineSidebarProps<T = Record<string, unknown>> {
  groupPlacements: GroupPlacement<T>[];
  cellHeight: number;
  groupGap: number;
  isRulerMode?: boolean;
  sidebarProperties?: SidebarPropertyConfig<T>[];
}

/**
 * 将进度值转换为对应的区间标签
 */
const getProgressLabel = (value: number, intervals: ProgressTooltipInterval[], maxValue: number): string => {
  // 将进度值标准化为百分比
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  // 查找匹配的区间
  for (const intervalConfig of intervals) {
    const [leftType, startValue, endValue, rightType] = intervalConfig.interval;
    
    // 检查左边界条件
    const leftCondition = leftType === "closed" 
      ? percentage >= startValue 
      : percentage > startValue;
    
    // 检查右边界条件
    const rightCondition = rightType === "closed" 
      ? percentage <= endValue 
      : percentage < endValue;
    
    if (leftCondition && rightCondition) {
      return intervalConfig.label;
    }
  }
  
  // 如果没有匹配的区间，返回默认标签
  return "unknown";
};

/**
 * 将进度配置转换为PropertyDistributionBar可用的mapping
 */
const convertProgressConfigToMapping = (
  data: Array<Record<string, unknown>>,
  field: string,
  progressConfig: NonNullable<SidebarPropertyConfig['progressConfig']>
): Record<string, { name: string; color: string }> => {
  const mapping: Record<string, { name: string; color: string }> = {};
  
  // 为每个唯一的标签创建mapping
  data.forEach(item => {
    const rawValue = Number(item[field] || 0);
    const label = getProgressLabel(rawValue, progressConfig.tooltip, progressConfig.maxValueOfEachItem);
    
    if (!mapping[label]) {
      // 查找对应的颜色配置
      const matchedInterval = progressConfig.tooltip.find(intervalConfig => {
        const percentage = Math.min(100, Math.max(0, (rawValue / progressConfig.maxValueOfEachItem) * 100));
        const [leftType, startValue, endValue, rightType] = intervalConfig.interval;
        
        // 检查左边界条件
        const leftCondition = leftType === "closed" 
          ? percentage >= startValue 
          : percentage > startValue;
        
        // 检查右边界条件
        const rightCondition = rightType === "closed" 
          ? percentage <= endValue 
          : percentage < endValue;
        
        return leftCondition && rightCondition;
      });
      
      mapping[label] = {
        name: label,
        color: matchedInterval?.color || '--color-chart--gray-5',
      };
    }
  });
  
  return mapping;
};

/**
 * 将进度数据转换为带标签的数据
 */
const transformProgressData = (
  data: Array<Record<string, unknown>>,
  field: string,
  progressConfig: NonNullable<SidebarPropertyConfig['progressConfig']>
): Array<Record<string, unknown>> => {
  return data.map(item => ({
    ...item,
    [field]: getProgressLabel(
      Number(item[field] || 0),
      progressConfig.tooltip,
      progressConfig.maxValueOfEachItem
    ),
  }));
};

export const TimelineSidebar = <T = Record<string, unknown>,>({
  groupPlacements,
  cellHeight,
  groupGap,
  isRulerMode = false,
  sidebarProperties = [],
}: TimelineSidebarProps<T>) => {
  // 计算每个组的高度和位置
  const getGroupHeight = (placements: PlacementResult[]) => {
    if (placements.length === 0) return cellHeight;
    const maxColumn = Math.max(...placements.map((p) => p.column));
    return (maxColumn + 1) * cellHeight;
  };

  // GroupBy 相关逻辑现在由独立的 GroupBySelector 组件处理

  // 如果是 ruler 模式，只返回空的占位区域（GroupBy 现在由独立组件处理）
  if (isRulerMode) {
    return (
      <div
        className={styles["timeline-sidebar"]}
        style={{ width: TimelineConst.sidebarWidth }}
      >
        <div
          className={styles["timeline-sidebar-ruler-space"]}
          style={{
            height:
              TimelineConst.yearLabelHeight +
              TimelineConst.monthLabelHeight +
              TimelineConst.dayLabelHeight,
          }}
        >
          {/* GroupBy 选择器现在由独立的 GroupBySelector 组件处理 */}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles["timeline-sidebar"]}
      style={{ width: TimelineConst.sidebarWidth }}
    >
      <div className={styles["timeline-sidebar-content"]}>
        {/* 与时间线尺子对齐的占位区域 */}

        {/* 组标题列表 */}
        <div className={styles["timeline-sidebar-groups"]}>
          {groupPlacements.map((group, index) => {
            const groupHeight = getGroupHeight(group.placements);
            const marginBottom =
              index < groupPlacements.length - 1 ? groupGap : 0;

            // 如果是最后的占位分组，使用 groupsEndHeight
            const finalHeight = group.isEndSpacer
              ? TimelineConstCalc.groupsEndHeight
              : groupHeight;
            const finalMinHeight = group.isEndSpacer
              ? TimelineConstCalc.groupsEndHeight
              : TimelineConstCalc.groupMinHeight;

            return (
              <div
                key={group.groupTitle || `spacer-${index}`}
                className={styles["timeline-sidebar-group"]}
                style={{
                  height: finalHeight,
                  minHeight: finalMinHeight,
                  marginBottom: marginBottom,
                }}
              >
                <div
                  className={styles["timeline-sidebar-group-title-container"]}
                  style={{
                    position: "sticky",
                    top: TimelineConstCalc.rulerHeight,
                    bottom: 0,
                  }}
                >
                  <div>
                    <RichTooltip
                      trigger={
                        <span
                          className={styles["timeline-sidebar-group-title"]}
                        >
                          {group.groupTitle}
                        </span>
                      }
                      position="right-start"
                    >
                      {[
                        <RichTooltipItem
                          key="group-title"
                          label={group.groupTitle}
                        />,
                      ]}
                    </RichTooltip>
                  </div>

                  {/* 属性分布可视化 */}
                  {sidebarProperties.length > 0 && !group.isEndSpacer && (
                    <div
                      className={styles["timeline-sidebar-group-properties"]}
                    >
                      {sidebarProperties.map((propertyConfig) => {
                        // 判断是映射类型还是进度类型配置
                        if (propertyConfig.progressConfig) {
                          // 进度类型配置
                          const transformedData = transformProgressData(
                            group.groupItems as Array<Record<string, unknown>>,
                            String(propertyConfig.field),
                            propertyConfig.progressConfig
                          );
                          const progressMapping = convertProgressConfigToMapping(
                            group.groupItems as Array<Record<string, unknown>>,
                            String(propertyConfig.field),
                            propertyConfig.progressConfig
                          );
                          
                          return (
                            <PropertyDistributionBar
                              key={String(propertyConfig.field)}
                              data={transformedData}
                              field={String(propertyConfig.field)}
                              mapping={progressMapping}
                              label={propertyConfig.label}
                              showLegend={true}
                              legendMode="hover"
                              tooltipPosition="right-start"
                              percentageDecimalPlaces={0}
                              flexLabelSize={TimelineConst.propertyDistributionBarFlexLabelSize}
                            />
                          );
                        } else {
                          // 映射类型配置
                          return (
                            <PropertyDistributionBar
                              key={String(propertyConfig.field)}
                              data={
                                group.groupItems as Array<Record<string, unknown>>
                              }
                              field={String(propertyConfig.field)}
                              mapping={propertyConfig.mapping || {}}
                              label={propertyConfig.label}
                              showLegend={true}
                              legendMode="hover"
                              tooltipPosition="right-start"
                              percentageDecimalPlaces={0}
                              flexLabelSize={TimelineConst.propertyDistributionBarFlexLabelSize}
                            />
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
