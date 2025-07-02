/**
 * 🏷️ Timeline组件的数据类型定义
 * 
 * 这个文件定义了Timeline组件使用的所有数据类型和接口。
 * 使用TypeScript类型可以确保数据的正确性，避免运行时错误。
 * 
 * 🎯 核心概念：
 * - BaseTimelineItem：最基本的时间线项目，只需要4个字段
 * - TimelineItem<T>：可扩展的时间线项目，支持自定义字段
 * - SortedTimelineData：分组后的时间线数据结构
 * 
 * 💡 使用示例：
 * interface MyProject extends BaseTimelineItem {
 *   priority: 'High' | 'Medium' | 'Low';
 *   team: string;
 * }
 * 
 * const project: MyProject = {
 *   id: "1",
 *   name: "网站重构", 
 *   startDate: new Date("2024-01-01"),
 *   endDate: new Date("2024-03-01"),
 *   priority: "High",
 *   team: "前端团队"
 * };
 */

import React from "react";
import type { RainbowColorVar, SemanticColorVar } from "../../../styles/color";
import { getSemanticColor, grayColors } from "../../../styles/color";

/**
 * Timeline 颜色类型 - 支持以下三种颜色使用方式：
 * 
 * ✅ 支持的使用方式:
 * 1. getRainbowColor('rose') → 返回 '--color-chart--rainbow-rose' (设计系统 Rainbow 颜色)
 * 2. getSemanticColor('success') → 返回 '--color--semantic-success' (设计系统 Semantic 颜色)
 * 3. 直接 CSS 颜色值，包括：
 *    - '#fafafa' (十六进制颜色)
 *    - 'var(--my-custom-var)' (CSS 变量函数)
 *    - 'rgba(255, 255, 255, 0.5)' (其他 CSS 颜色格式)
 * 
 * 📝 示例用法:
 * ```typescript
 * const colorMap = {
 *   high: { name: "High", color: getRainbowColor('rose') },
 *   medium: { name: "Medium", color: getSemanticColor('warning') },
 *   custom: { name: "Custom", color: '#ff6b6b' }
 * };
 * ```
 */
export type TimelineColorType = RainbowColorVar | SemanticColorVar | string;

/**
 * 进度条颜色配置
 * @property {number} upto - 进度上限 (0-100]
 * @property {TimelineColorType} color - 颜色
 */
export interface ProgressColorStop {
  upto: number;
  color: TimelineColorType;
}

// 基础时间线项目接口 - 只包含四个必需字段
export interface BaseTimelineItemType {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

// 基础字段键
export const BaseTimelineItemKeys = {
  ID: 'id',
  NAME: 'name',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const;

// 通用时间线项目类型 - 支持泛型扩展
export type TimelineItemType<T = Record<string, unknown>> = BaseTimelineItemType & T;

// 字段显示类型枚举
export type FieldDisplayType = 'icon' | 'progress' | 'tag';

// 字段显示配置接口
export interface FieldDisplayConfig<T = Record<string, unknown>> {
  /** 数据字段名 */
  field: keyof T;
  /** 显示类型 */
  displayType: FieldDisplayType;
  /** 
   * 字段值到显示属性的映射函数或对象
   * - 对于 icon: 返回 { iconName: string, color?: string }
   * - 对于 progress: 返回 { value: number, color?: string }
   * - 对于 tag: 返回 { text: string, color?: string, variant?: 'contained' | 'outlined' }
   */
  mapping?: 
    | ((value: unknown, item?: TimelineItemType<T>) => Record<string, unknown>)
    | Record<string, Record<string, unknown>>;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示（可以是函数动态判断） */
  visible?: boolean | ((item: TimelineItemType<T>) => boolean);
}

// Timeline 项目显示配置
export interface TimelineItemDisplayConfig<T = Record<string, unknown>> {
  /** 图形信息区域的字段配置 */
  graphicFields?: FieldDisplayConfig<T>[];
  /** 标签区域的字段配置 */
  tagFields?: FieldDisplayConfig<T>[];
}

// 分组数据结构 - 通用化
export interface TimelineGroupType<T = Record<string, unknown>> {
  groupTitle: string;
  groupItems: TimelineItemType<T>[];
}

// 排序后的时间线数据结构 - 通用化
export interface SortedTimelineDataType<T = Record<string, unknown>> {
  meta: {
    sortBy: keyof (BaseTimelineItemType & T);
  };
  data: TimelineGroupType<T>[];
}

export interface ZoomLevelType {
  label: string;
  dayWidth: number;
  setAsDefault?: boolean;
}

// 分组选项配置
export interface GroupByOption<T = Record<string, unknown>> {
  /** 显示标签 */
  label: string;
  /** 分组字段 */
  field: keyof (BaseTimelineItemType & T);
  /** 是否为默认选项 */
  setAsDefault?: boolean;
}

/**
 * 进度条 tooltip 区间配置
 */
export interface ProgressTooltipInterval {
  /** 区间范围定义 [左边界, 起始值, 结束值, 右边界] */
  interval: ["open" | "closed", number, number, "open" | "closed"];
  /** 区间显示标签 */
  label: string;
  /** 区间颜色 */
  color: TimelineColorType;
}

/**
 * 侧边栏属性分布配置
 */
export interface SidebarPropertyConfig<T = Record<string, unknown>> {
  /** 要显示分布的字段 */
  field: keyof T;
  /** 字段值到颜色和名称的映射（用于映射类型字段） */
  mapping?: Record<string, { name: string; color: TimelineColorType }>;
  /** 进度字段配置（用于数值类型字段） */
  progressConfig?: {
    /** 每个 item 的最大值，用于计算百分比 */
    maxValueOfEachItem: number;
    /** tooltip 区间配置 */
    tooltip: ProgressTooltipInterval[];
  };
  /** 显示标签（可选，默认使用字段名） */
  label?: string;
  /** 是否显示数量标签 */
  showCount?: boolean;
}

// Timeline 组件 Props 接口
export interface TimelineProps<T = Record<string, unknown>> {
  /** 项目显示配置 */
  init?: TimelineItemDisplayConfig<T>;
  /** 输入数据 - 可以是原始数据数组或已分组的数据 */
  inputData: SortedTimelineDataType<T> | TimelineItemType<T>[];
  /** 分组字段（当 inputData 是原始数据数组时使用） */
  groupBy?: keyof (BaseTimelineItemType & T);
  /** 分组选项配置 - 支持用户动态切换分组方式 */
  groupByOptions?: GroupByOption<T>[];
  /** 侧边栏属性分布配置 */
  groupTitleProperties?: SidebarPropertyConfig<T>[];
  zoomLevels?: ZoomLevelType[];
  fetchByTimeInterval?: [Date, Date];
  onItemClick?: (item: TimelineItemType<T>) => void;
  /** Current zoom level (optional - managed internally if not provided) */
  currentZoom?: string;
  /**
   * 当未启用缩放功能时，设置每天的默认宽度（单位：像素）。
   * 如果提供了 `zoomLevels`，此属性将被忽略。
   * @default 12
   */
  defaultDayWidth?: number;
  /** Configuration for IssueDetails component shown in right sidebar */
  issueDetailsConfig?: import('./issueDetailsConfig').IssueDetailsConfig<T>;
  /** URL 参数管理配置 */
  urlParams?: TimelineUrlParamsConfig;
}

// URL 参数管理配置接口
export interface TimelineUrlParamsConfig {
  /** 当浏览器中不存在任何参数时，是否要默认跳转到今天 */
  defaultToday?: boolean;
  /** 浏览器 URL 是否要记录当前 groupBy 的参数 */
  recordGroupby?: boolean;
  /** 浏览器 URL 是否要记录当前的 zoomLevel */
  recordZoomLevel?: boolean;
  /** 浏览器 URL 是否要记录中轴线所对准的日期 */
  recordCurrentDate?: boolean;
}

// 预定义的常用映射函数
export const CommonFieldMappings = {
  /** 进度值映射 (0-100) */
  progress: (value: number) => ({
    value: Math.max(0, Math.min(100, value)),
    showText: true,
  }),
  
  /** 状态到颜色的映射 */
  statusColor: (colorMap: Record<string, { name: string; color: TimelineColorType; icon?: string }>) => 
    (value: string) => colorMap[value] || { name: value, color: 'gray' },
    
  /** 简单的文本标签映射 */
  textTag: (value: unknown) => ({
    text: String(value),
    variant: 'contained' as const,
  }),
};

// 🚀 新的改进版映射函数库
export const FieldMappers = {
  /** 从对象映射生成标签 */
  fromMap: (map: Record<string, { name: string; color: TimelineColorType; icon?: string }>) => {
    const fn = (value: unknown) => ({
      text: map[String(value)]?.name || String(value),
      color: map[String(value)]?.color || 'gray',
    });
    // attach source map for retrieval
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fn._sourceMap = map;
    return fn;
  },
  
  /** 进度条映射 */
  progress: <T = Record<string, unknown>>(options?: { 
    showText?: boolean; 
    progressColors?: ProgressColorStop[];
    inprogressColor?: string | ((item: TimelineItemType<T>) => string);
    doneColor?: string | ((item: TimelineItemType<T>) => string);
  }) => 
    (value: unknown, item?: TimelineItemType<T>) => {
      const progressValue = Math.max(0, Math.min(100, Number(value) || 0));
      let progressColor: TimelineColorType | undefined = undefined;

      // 优先使用 progressColors 配置
      if (options?.progressColors && options.progressColors.length > 0) {
        // 从小到大排序，确保先匹配到最小的 upto
        const sortedColors = [...options.progressColors].sort((a, b) => a.upto - b.upto);
        const matchedColor = sortedColors.find(stop => progressValue <= stop.upto);
        if (matchedColor) {
          // 如果颜色值是 CSS 变量名（以 '--' 开头），则用 var() 包裹
          progressColor = matchedColor.color.startsWith('--') 
            ? `var(${matchedColor.color})` 
            : matchedColor.color;
        }
      }
      // 其次使用简化的 inprogressColor 和 doneColor 配置
      else if (options?.inprogressColor || options?.doneColor) {
        if (progressValue < 100 && options.inprogressColor) {
          const colorValue = typeof options.inprogressColor === 'function' 
            ? options.inprogressColor(item!)
            : options.inprogressColor;
          progressColor = colorValue.startsWith('--') 
            ? `var(${colorValue})` 
            : colorValue;
        } else if (progressValue >= 100 && options.doneColor) {
          const colorValue = typeof options.doneColor === 'function' 
            ? options.doneColor(item!)
            : options.doneColor;
          progressColor = colorValue.startsWith('--') 
            ? `var(${colorValue})` 
            : colorValue;
        }
      }

      // 如果没有匹配到自定义颜色，使用默认逻辑
      if (!progressColor) {
        if (progressValue < 100) {
          progressColor = `var(${getSemanticColor('active')})`;
        } else {
          progressColor = `var(${getSemanticColor('success')})`;
        }
      }

      return {
        value: progressValue,
        showText: options?.showText ?? true,
        color: progressColor,
      };
    },
  
  /** 图标映射 */
  iconFromMap: (map: Record<string, { icon?: string; color: TimelineColorType; name?: string }>) => {
    const fn = (value: unknown) => {
      const mapValue = map[String(value)];
      return {
        iconName: mapValue?.icon || 'help',
        color: mapValue?.color || 'gray',
      };
    };
    // Attach original map for external access
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fn._sourceMap = map;
    return fn;
  },
  
  /** 简单文本映射 */
  text: (options?: { color?: TimelineColorType; variant?: 'contained' | 'outlined' }) => {
    const fn = (value: unknown) => ({
      text: String(value),
      ...(options?.color && { color: options.color }),
      ...(options?.variant && { variant: options.variant }),
    });
    return fn;
  },
};

// 🎯 简化配置对象创建函数
export const createFieldConfig = {
  /** 创建进度条字段配置 */
  progress: <T>(field: keyof T, options?: { 
    showText?: boolean; 
    progressColors?: ProgressColorStop[];
    inprogressColor?: string | ((item: TimelineItemType<T>) => string);
    doneColor?: string | ((item: TimelineItemType<T>) => string);
  }) => ({
    field,
    displayType: 'progress' as const,
    mapping: FieldMappers.progress<T>(options),
    visible: true,
  }),
  
  /** 创建图标字段配置 */
  iconFromMap: <T>(field: keyof T, map: Record<string, { icon?: string; color: TimelineColorType }>) => ({
    field,
    displayType: 'icon' as const,
    mapping: FieldMappers.iconFromMap(map),
    visible: true,
  }),
  
  /** 创建标签字段配置 */
  tagFromMap: <T>(field: keyof T, map: Record<string, { name: string; color: TimelineColorType }>, options?: {
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
  }) => ({
    field,
    displayType: 'tag' as const,
    mapping: FieldMappers.fromMap(map),
    visible: options?.hideValue !== undefined ? 
      (item: TimelineItemType<T>) => item[field] !== options.hideValue : 
      true,
    ...(options?.variant && { variant: options.variant }),
  }),
  
  /** 创建简单文本标签配置 */
  simpleTag: <T>(field: keyof T, options?: { 
    color?: TimelineColorType; 
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
  }) => ({
    field,
    displayType: 'tag' as const,
    mapping: FieldMappers.text(options),
    visible: options?.hideValue !== undefined ? 
      (item: TimelineItemType<T>) => item[field] !== options.hideValue : 
      true,
  }),
};

// 🎯 Sidebar属性配置简化创建函数
export const createSidebarProperty = {
  /** 从映射创建sidebar属性配置 */
  fromMap: <T>(
    field: keyof T, 
    map: Record<string, { name: string; color: TimelineColorType }>, 
    options?: { 
      label?: string; 
      showCount?: boolean; 
    }
  ): SidebarPropertyConfig<T> => ({
    field,
    mapping: map,
    label: options?.label,
    showCount: options?.showCount ?? false,
  }),

  /** 从进度字段创建sidebar属性配置 */
  fromProgressField: <T>(
    field: keyof T,
    options?: {
      label?: string;
      showCount?: boolean;
      maxValueOfEachItem?: number;
      tooltip?: ProgressTooltipInterval[];
    }
  ): SidebarPropertyConfig<T> => {
    // 默认的 tooltip 配置
    const defaultTooltip: ProgressTooltipInterval[] = [
      {
        interval: ["closed", 0, 0, "closed"],
        label: "not started",
        color: grayColors.gray5,
      },
      {
        interval: ["open", 0, 100, "open"],
        label: "in progress", 
        color: getSemanticColor("active"),
      },
      {
        interval: ["closed", 100, 100, "closed"],
        label: "done",
        color: getSemanticColor("success"),
      },
    ];

    return {
      field,
      progressConfig: {
        maxValueOfEachItem: options?.maxValueOfEachItem ?? 100,
        tooltip: options?.tooltip ?? defaultTooltip,
      },
      label: options?.label,
      showCount: options?.showCount ?? false,
    };
  },
};

// 🏗️ Timeline配置构建器类
export class TimelineConfigBuilder<T = Record<string, unknown>> {
  private config: TimelineItemDisplayConfig<T> = { 
    graphicFields: [], 
    tagFields: [] 
  };

  addProgress(field: keyof T, options?: { 
    showText?: boolean; 
    progressColors?: ProgressColorStop[];
    inprogressColor?: string | ((item: TimelineItemType<T>) => string);
    doneColor?: string | ((item: TimelineItemType<T>) => string);
  }) {
    this.config.graphicFields?.push(createFieldConfig.progress(field, options));
    return this;
  }

  addIcon(field: keyof T, map: Record<string, { icon?: string; color: TimelineColorType }>) {
    this.config.graphicFields?.push(createFieldConfig.iconFromMap(field, map));
    return this;
  }

  addTag(
    field: keyof T, 
    map: Record<string, { name: string; color: TimelineColorType }>, 
    options?: {
      variant?: 'contained' | 'outlined';
      hideValue?: unknown;
    }
  ) {
    this.config.tagFields?.push(createFieldConfig.tagFromMap(field, map, options));
    return this;
  }

  addSimpleTag(field: keyof T, options?: { 
    color?: TimelineColorType; 
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
  }) {
    this.config.tagFields?.push(createFieldConfig.simpleTag(field, options));
    return this;
  }

  build(): TimelineItemDisplayConfig<T> {
    return this.config;
  }
} 