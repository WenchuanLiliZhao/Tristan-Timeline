import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../../../ui-components/general/Button/index";
import { TimelineConst } from "../_constants";

interface TodayButtonProps {
  /** 滚动容器的引用 */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  /** 年份列表，用于计算时间轴范围 */
  yearList: number[];
  /** 起始月份（0-11） */
  startMonth: number;
  /** 每天的宽度（像素） */
  dayWidth: number;
  /** 是否有分组（影响侧边栏宽度） */
  hasGrouping: boolean;
  /** 按钮变体 */
  variant?: "filled" | "ghost" | "outlined";
  /** 按钮文本 */
  children?: React.ReactNode;
}

/**
 * 今天按钮组件
 * 
 * 点击后会滚动到今天在时间轴上的位置，并将今天的中心点对准时间轴的中轴线
 */
export function TodayButton({
  scrollContainerRef,
  yearList,
  startMonth,
  dayWidth,
  hasGrouping,
  variant = "ghost",
  children = "Today",
}: TodayButtonProps) {
  // 状态：今天是否在可视区域内
  const [isTodayVisible, setIsTodayVisible] = useState(false);

  // 计算今天在时间轴上的位置（复用逻辑）
  const calculateTodayPosition = useCallback(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth(); // 0-11
    const todayDate = today.getDate(); // 1-31

    // 检查今天是否在时间轴范围内
    const firstYear = yearList[0];
    const lastYear = yearList[yearList.length - 1];
    
    if (todayYear < firstYear || todayYear > lastYear) {
      return null; // 今天不在时间轴范围内
    }

    // 计算从时间轴开始到今天的总天数
    let totalDaysToToday = 0;

    // 遍历到今天所在年份之前的所有年份
    for (let year = firstYear; year < todayYear; year++) {
      const yearIndex = year - firstYear;
      const monthStart = yearIndex === 0 ? startMonth : 0;
      const monthEnd = 11;

      for (let month = monthStart; month <= monthEnd; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        totalDaysToToday += daysInMonth;
      }
    }

    // 添加今天所在年份从开始到今天所在月份前的天数
    const todayYearIndex = todayYear - firstYear;
    const todayYearMonthStart = todayYearIndex === 0 ? startMonth : 0;
    
    for (let month = todayYearMonthStart; month < todayMonth; month++) {
      const daysInMonth = new Date(todayYear, month + 1, 0).getDate();
      totalDaysToToday += daysInMonth;
    }

    // 添加今天所在月份到今天的天数
    totalDaysToToday += todayDate - 1; // 减1因为日期是从1开始的

    // 计算今天在时间轴上的像素位置
    const todayPositionInTimeline = totalDaysToToday * dayWidth;
    
    return {
      left: todayPositionInTimeline,
      right: todayPositionInTimeline + dayWidth,
      center: todayPositionInTimeline + dayWidth / 2,
    };
  }, [yearList, startMonth, dayWidth]);

  // 检查今天是否在可视区域内
  const checkTodayVisibility = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const todayPosition = calculateTodayPosition();
    if (!todayPosition) {
      setIsTodayVisible(false);
      return;
    }

    const container = scrollContainerRef.current;
    const containerScrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const sidebarWidth = hasGrouping ? TimelineConst.sidebarWidth : 0;
    
    // 可视区域的左右边界（考虑侧边栏）
    const visibleLeft = containerScrollLeft + sidebarWidth;
    const visibleRight = containerScrollLeft + containerWidth;

    // 判断今天的格子是否与可视区域有交集
    const isVisible = todayPosition.right > visibleLeft && todayPosition.left < visibleRight;
    setIsTodayVisible(isVisible);
  }, [scrollContainerRef, calculateTodayPosition, hasGrouping]);

  // 监听滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 初始检查
    checkTodayVisibility();

    // 添加滚动监听
    const handleScroll = () => {
      checkTodayVisibility();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef, checkTodayVisibility]);

  // 当相关依赖变化时重新检查可见性
  useEffect(() => {
    checkTodayVisibility();
  }, [yearList, startMonth, dayWidth, hasGrouping, checkTodayVisibility]);

  // 🎯 Today按钮的智能行为 - 滚动到今天并居中
  const handleTodayClick = useCallback(() => {
    if (!scrollContainerRef.current) {
      console.warn('📅 Today button: scroll container not found');
      return;
    }

    const todayPosition = calculateTodayPosition();
    if (!todayPosition) {
      console.warn('📅 Today is outside the timeline range');
      return;
    }

    // 获取滚动容器的信息
    const container = scrollContainerRef.current;
    const containerWidth = container.clientWidth;
    const maxScrollWidth = container.scrollWidth;
    const sidebarWidth = hasGrouping ? TimelineConst.sidebarWidth : 0;

    // 执行滚动，使今天的中心点位于中轴线
    const targetScrollLeft = todayPosition.center - (containerWidth - sidebarWidth) / 2;
    const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollWidth - containerWidth));

    container.scrollTo({
      left: finalScrollLeft,
      behavior: 'smooth'
    });

  }, [scrollContainerRef, calculateTodayPosition, hasGrouping]);

  return (
    <Button 
      variant={variant}
      semantic={isTodayVisible ? "success" : "default"}
      onClick={handleTodayClick}
    >
      {children}
    </Button>
  );
} 