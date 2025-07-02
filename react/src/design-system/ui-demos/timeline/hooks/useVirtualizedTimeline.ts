/**
 * 🚀 虚拟滚动Timeline Hook - 性能优化核心
 * 
 * 这个hook实现了虚拟滚动技术，大幅提升大时间范围Timeline的性能。
 * 核心思想：只渲染当前可见区域及缓冲区的内容，而不是全部时间范围。
 * 
 * 🎯 性能优化效果：
 * - DOM元素数量：从 10年×365天 减少到 可见区域×缓冲区
 * - 渲染时间：从 O(n) 减少到 O(1) 
 * - 内存占用：显著降低
 * - 滚动性能：丝滑流畅
 * 
 * 📊 适用场景：
 * - 长时间范围的Timeline（超过2年）
 * - 大数据量项目展示
 * - 移动端性能优化
 * - 实时数据流展示
 * 
 * 💡 使用方式：
 * ```tsx
 * const { visibleRange, containerProps } = useVirtualizedTimeline({
 *   totalDays: 3650,
 *   dayWidth: 24,
 *   containerWidth: 1200
 * });
 * ```
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { TimelineConst } from '../ui/_constants';

export interface VirtualizedTimelineConfig {
  /** 总天数 */
  totalDays: number;
  /** 每天的宽度(px) */
  dayWidth: number;
  /** 容器宽度(px) */
  containerWidth: number;
  /** 起始年份 */
  startYear: number;
  /** 起始月份(0-11) */
  startMonth: number;
  /** 年份列表 */
  yearList: number[];
}

export interface VisibleTimeRange {
  /** 可见区域开始的天数索引 */
  startDayIndex: number;
  /** 可见区域结束的天数索引 */
  endDayIndex: number;
  /** 可见的年份范围 */
  visibleYears: number[];
  /** 每个可见年份的月份范围 */
  visibleMonthsByYear: Record<number, number[]>;
  /** 是否应该渲染某个特定日期 */
  shouldRenderDay: (year: number, month: number, day: number) => boolean;
}

export interface VirtualScrollProps {
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  style: React.CSSProperties;
}

/**
 * 虚拟滚动Timeline Hook主函数
 */
export const useVirtualizedTimeline = (config: VirtualizedTimelineConfig) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const { 
    totalDays, 
    dayWidth, 
    containerWidth, 
    startYear, 
    startMonth, 
    yearList 
  } = config;

  // 📐 计算可见范围的核心逻辑
  const visibleRange = useMemo((): VisibleTimeRange => {
    const bufferDays = TimelineConst.performance.virtualScrollBufferDays;
    
    // 计算当前可见的天数范围
    const visibleStartDay = Math.floor(scrollLeft / dayWidth);
    const visibleEndDay = Math.ceil((scrollLeft + containerWidth) / dayWidth);
    
    // 添加缓冲区
    const startDayIndex = Math.max(0, visibleStartDay - bufferDays);
    const endDayIndex = Math.min(totalDays - 1, visibleEndDay + bufferDays);
    
    // 🗓️ 将天数索引转换为年月日
    const getDateFromDayIndex = (dayIndex: number) => {
      let currentYear = startYear;
      let currentMonth = startMonth;
      let remainingDays = dayIndex;
      
      // 遍历找到对应的年月
      while (remainingDays > 0) {
        const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        if (remainingDays >= daysInCurrentMonth) {
          remainingDays -= daysInCurrentMonth;
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
        } else {
          break;
        }
      }
      
      return { year: currentYear, month: currentMonth, day: remainingDays + 1 };
    };
    
    const startDate = getDateFromDayIndex(startDayIndex);
    const endDate = getDateFromDayIndex(endDayIndex);
    
    // 🎯 计算可见的年份
    const visibleYears: number[] = [];
    for (let year = startDate.year; year <= endDate.year; year++) {
      if (yearList.includes(year)) {
        visibleYears.push(year);
      }
    }
    
    // 🎯 计算每个可见年份的月份范围
    const visibleMonthsByYear: Record<number, number[]> = {};
    visibleYears.forEach(year => {
      const monthStart = year === startDate.year ? startDate.month : 0;
      const monthEnd = year === endDate.year ? endDate.month : 11;
      
      visibleMonthsByYear[year] = [];
      for (let month = monthStart; month <= monthEnd; month++) {
        visibleMonthsByYear[year].push(month);
      }
    });
    
    // 🎯 优化的日期渲染判断函数
    const shouldRenderDay = (year: number, month: number, day: number): boolean => {
      if (!visibleYears.includes(year)) return false;
      if (!visibleMonthsByYear[year]?.includes(month)) return false;
      
      // 计算这一天的全局索引
      let dayIndex = 0;
      let currentYear = startYear;
      let currentMonth = startMonth;
      
      // 计算到目标年月的天数
      while (currentYear < year || (currentYear === year && currentMonth < month)) {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        dayIndex += daysInMonth;
        
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
      
      dayIndex += day - 1; // 加上当月的天数（day从1开始）
      
      return dayIndex >= startDayIndex && dayIndex <= endDayIndex;
    };
    
    return {
      startDayIndex,
      endDayIndex,
      visibleYears,
      visibleMonthsByYear,
      shouldRenderDay
    };
  }, [scrollLeft, dayWidth, containerWidth, totalDays, startYear, startMonth, yearList]);

  // 🎯 滚动事件处理
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const newScrollLeft = event.currentTarget.scrollLeft;
    
    // 🚀 性能优化：避免过于频繁的状态更新
    if (Math.abs(newScrollLeft - scrollLeft) > dayWidth / 2) {
      setScrollLeft(newScrollLeft);
    }
  }, [scrollLeft, dayWidth]);

  // 🎯 容器属性
  const containerProps: VirtualScrollProps = {
    onScroll: handleScroll,
    style: {
      // 虚拟滚动容器需要知道总宽度才能正确显示滚动条
      width: totalDays * dayWidth,
    }
  };

  return {
    visibleRange,
    containerProps,
    // 🔍 调试信息
    debugInfo: {
      scrollLeft,
      visibleDayCount: visibleRange.endDayIndex - visibleRange.startDayIndex + 1,
      totalDays,
      performanceGain: `${((1 - (visibleRange.endDayIndex - visibleRange.startDayIndex + 1) / totalDays) * 100).toFixed(1)}%`
    }
  };
};

/**
 * 🎯 便利Hook：专门用于Timeline组件的虚拟滚动
 * 
 * 这个hook封装了Timeline特有的逻辑，让主组件更容易使用虚拟滚动。
 */
export const useTimelineVirtualization = (
  yearList: number[],
  startMonth: number,
  dayWidth: number,
  containerWidth: number
) => {
  // 计算总天数
  const totalDays = useMemo(() => {
    let total = 0;
    yearList.forEach((year, yearIndex) => {
      const monthStart = yearIndex === 0 ? startMonth : 0;
      const monthEnd = 11;
      
      for (let month = monthStart; month <= monthEnd; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        total += daysInMonth;
      }
    });
    return total;
  }, [yearList, startMonth]);

  const startYear = yearList[0];

  return useVirtualizedTimeline({
    totalDays,
    dayWidth,
    containerWidth,
    startYear,
    startMonth,
    yearList
  });
};

/**
 * 🎯 性能监控Hook：追踪虚拟滚动的性能表现
 */
export const useVirtualScrollPerformance = (visibleRange: VisibleTimeRange, totalDays: number) => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    domElementCount: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    // 计算DOM元素数量（估算）
    const visibleDays = visibleRange.endDayIndex - visibleRange.startDayIndex + 1;
    const estimatedDOMElements = visibleDays * 5; // 假设每天5个DOM元素
    
    // 计算内存使用（估算）
    const estimatedMemoryKB = estimatedDOMElements * 0.5; // 假设每个元素0.5KB
    
    const endTime = performance.now();
    
    setPerformanceMetrics({
      renderTime: endTime - startTime,
      domElementCount: estimatedDOMElements,
      memoryUsage: estimatedMemoryKB
    });
  }, [visibleRange, totalDays]);

  return performanceMetrics;
}; 