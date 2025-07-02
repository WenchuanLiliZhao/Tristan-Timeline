import React, { useRef } from "react";
import styles from "./Item.module.scss";
import {
  type TimelineItemType,
  type TimelineItemDisplayConfig,
  type FieldDisplayConfig,
} from "../../types";
import { TimelineConst } from "../_constants";
import { Icon, ProgressCircle, Tag } from "../../../../ui-components";
import type { Color } from "../../../../ui-components/types";

interface TimelineItemProps {
  item: TimelineItemType;
  durationInDays: number;
  dayWidth: number;
  cellHeight: number;
  column: number;
  onIssueClick?: (issue: TimelineItemType) => void;
  displayConfig?: TimelineItemDisplayConfig;
}

// 渲染图形信息区域的字段 - 使用CSS变量优化
const renderGraphicField = (
  item: TimelineItemType,
  config: FieldDisplayConfig,
  index: number
) => {
  if (
    config.visible === false ||
    (typeof config.visible === "function" && !config.visible(item))
  ) {
    return null;
  }

  const fieldValue = item[config.field as keyof typeof item];
  let displayProps: Record<string, unknown> = {};

  if (config.mapping) {
    if (typeof config.mapping === "function") {
      displayProps = config.mapping(fieldValue, item);
    } else if (typeof fieldValue === "string" && config.mapping[fieldValue]) {
      displayProps = config.mapping[fieldValue];
    }
  }

  const key = `${item.id}-${String(config.field)}-${index}`;

  switch (config.displayType) {
    case "icon": {
      return (
        <div 
          key={key} 
          className={styles["timeline-item-icon"]}
          style={{
            // 正确处理 CSS 变量：如果是变量名则用 var() 包装，否则直接使用
            color: displayProps.color ? 
              (displayProps.color as string).startsWith('--') ? 
                `var(${displayProps.color})` : 
                (displayProps.color as string) 
              : undefined
          }}
        >
          <Icon
            name={
              (displayProps.iconName as string) ||
              (displayProps.icon as string) ||
              "help"
            }
          />
        </div>
      );
    }
    case "progress":
      return (
        <div className={styles["timeline-item-progress-container"]} key={key}>
          <ProgressCircle
            progress={
              (displayProps.value as number) || (fieldValue as number) || 0
            }
            size={"tiny"}
            // 如果提供了颜色，直接传递，否则让 ProgressCircle 使用其默认颜色
            color={displayProps.color as Color | string}
          />
        </div>
      );
    default:
      return null;
  }
};

// 渲染标签区域的字段
const renderTagField = (
  item: TimelineItemType,
  config: FieldDisplayConfig,
  index: number
) => {
  if (
    config.visible === false ||
    (typeof config.visible === "function" && !config.visible(item))
  ) {
    return null;
  }

  const fieldValue = item[config.field as keyof typeof item];
  let displayProps: Record<string, unknown> = {};

  if (config.mapping) {
    if (typeof config.mapping === "function") {
      displayProps = config.mapping(fieldValue, item);
    } else if (typeof fieldValue === "string" && config.mapping[fieldValue]) {
      displayProps = config.mapping[fieldValue];
    }
  }

  const tagText =
    (displayProps.text as string) ||
    (displayProps.name as string) ||
    String(fieldValue);
  const key = `${item.id}-${String(config.field)}-${index}`;

  // 处理颜色 - 统一使用 color 属性，支持预定义颜色和自定义颜色
  const colorValue = displayProps.color as string;
  
  return (
    <Tag
      key={key}
      variant={
        (displayProps.variant as "contained" | "outlined") || "contained"
      }
      size="small"
      color={colorValue || "primary"}
    >
      {tagText}
    </Tag>
  );
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  durationInDays,
  dayWidth,
  cellHeight,
  column,
  onIssueClick,
  displayConfig,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 注意：对于简单的颜色应用（如图标），直接使用颜色值比 CSS 变量更直接
  // CSS 变量优化适用于复杂的主题切换场景
  
  // 计算issue跨越的月数
  const calculateSpannedMonths = (startDate: Date, endDate: Date): number => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  };

  const spannedMonths = calculateSpannedMonths(item.startDate, item.endDate);

  return (
    <div className={styles["timeline-item"]}>
      <div
        ref={containerRef}
        className={styles["timeline-item-container"]}
        style={{
          height: cellHeight - TimelineConst.itemVPadding * 2,
          width:
            durationInDays * dayWidth -
            TimelineConst.itemHPadding * 2 +
            (spannedMonths - 1),
          position: "absolute",
          top: `${
            column * cellHeight +
            TimelineConst.groupGap / 2 +
            TimelineConst.itemVPadding
          }px`,
          left: `${TimelineConst.itemHPadding}px`,
          cursor: onIssueClick ? "pointer" : "default",
        }}
        role={onIssueClick ? "button" : undefined}
        tabIndex={onIssueClick ? 0 : undefined}
        onClick={() => onIssueClick?.(item)}
        onKeyDown={(e) => {
          if (onIssueClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onIssueClick(item);
          }
        }}
      >
        <div className={styles["timeline-item-graphic-info"]}>
          {displayConfig?.graphicFields?.map((config, index) =>
            renderGraphicField(item, config, index)
          )}
        </div>
        <div className={styles["timeline-item-text-info"]}>
          <div className={styles["timeline-item-name"]}>{item.name}</div>
          <div className={styles["timeline-item-tags"]}>
            {displayConfig?.tagFields?.map((config, index) =>
              renderTagField(item, config, index)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
