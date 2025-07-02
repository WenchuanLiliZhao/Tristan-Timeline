import { type TimelineItemType } from "../../types";

interface OutPutTermsType {
  [key: string]: number;
}



// 通用的属性统计函数 - 支持任意属性名和类型
export function getPropertyStats<T extends Record<string, unknown>>(
  groupItems: TimelineItemType<T>[],
  propertyKey: keyof (TimelineItemType<T>)
): OutPutTermsType {
  const stats: OutPutTermsType = {};

  groupItems.forEach(item => {
    const value = item[propertyKey];
    // 将值转换为字符串作为统计的键
    const key = value !== undefined && value !== null ? String(value) : 'Unknown';

    if (stats[key]) {
      stats[key]++;
    } else {
      stats[key] = 1;
    }
  });

  return stats;
}

// 通用的数值范围统计函数
export function getNumericRangeStats<T extends Record<string, unknown>>(
  groupItems: TimelineItemType<T>[],
  propertyKey: keyof (TimelineItemType<T>),
  ranges: Array<{ label: string; min: number; max: number }>
): OutPutTermsType {
  const stats: OutPutTermsType = {};
  
  // 初始化所有范围的计数
  ranges.forEach(range => {
    stats[range.label] = 0;
  });

  groupItems.forEach(item => {
    const value = item[propertyKey];
    const numericValue = typeof value === 'number' ? value : 0;

    // 找到匹配的范围
    const matchedRange = ranges.find(range => 
      numericValue >= range.min && numericValue < range.max
    );

    if (matchedRange) {
      stats[matchedRange.label]++;
    } else {
      // 如果没有匹配的范围，归类为"未知"
      if (!stats['Unknown']) {
        stats['Unknown'] = 0;
      }
      stats['Unknown']++;
    }
  });

  return stats;
}


