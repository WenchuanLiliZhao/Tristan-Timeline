/**
 * 🔍 useZoomLevelMonitor - Zoom Level State Monitor Hook
 * 
 * 这个hook实现方案A：通过监听dayWidth状态变化来判断当前活跃的缩放级别。
 * 
 * 🎯 核心功能：
 * - 监听dayWidth变化，自动识别当前活跃的zoom level
 * - 提供当前活跃级别的完整信息
 * - 支持自定义回调函数，当zoom level变化时执行特定逻辑
 * - 兼容URL状态管理等多种dayWidth来源
 * 
 * 💡 应用场景：
 * - Today按钮根据当前zoom level调整行为
 * - Analytics追踪用户的缩放偏好
 * - 其他功能根据缩放级别做出响应
 * 
 * 🔗 兼容性：
 * - 完全兼容URL状态管理
 * - 不依赖状态来源（用户点击、URL、程序设置等）
 * - 可与任何dayWidth状态管理方案配合使用
 */

import { useEffect, useState, useCallback } from 'react';
import type { ZoomLevelType } from '../types';

export interface ZoomLevelMonitorCallbacks {
  /** 当zoom level变化时的回调函数 */
  onZoomLevelChanged?: (newLevel: ZoomLevelType, previousLevel: ZoomLevelType | null) => void;
  /** 当zoom level变为特定级别时的回调函数 */
  onSpecificLevelActivated?: {
    onDaysActivated?: (level: ZoomLevelType) => void;
    onMonthsActivated?: (level: ZoomLevelType) => void;
    onQuartersActivated?: (level: ZoomLevelType) => void;
    [key: string]: ((level: ZoomLevelType) => void) | undefined;
  };
}

export interface ZoomLevelMonitorResult {
  /** 当前活跃的zoom level，如果没有匹配则为null */
  activeLevel: ZoomLevelType | null;
  /** 判断特定level是否为当前活跃状态 */
  isLevelActive: (targetLevel: ZoomLevelType) => boolean;
  /** 判断特定dayWidth是否为当前活跃状态 */
  isDayWidthActive: (targetDayWidth: number) => boolean;
  /** 获取当前活跃level的标签，如果没有则返回空字符串 */
  getActiveLevelLabel: () => string;
  /** 获取所有可用的zoom levels */
  getAllLevels: () => ZoomLevelType[];
}

/**
 * Zoom Level Monitor Hook
 * 
 * @param dayWidth 当前的dayWidth值
 * @param zoomLevels 可用的zoom levels配置
 * @param callbacks 可选的回调函数配置
 * @returns 监控结果和工具函数
 */
export const useZoomLevelMonitor = (
  dayWidth: number,
  zoomLevels: ZoomLevelType[] = [],
  callbacks: ZoomLevelMonitorCallbacks = {}
): ZoomLevelMonitorResult => {
  const [activeLevel, setActiveLevel] = useState<ZoomLevelType | null>(null);

  // 🔍 主要监听逻辑：监听dayWidth变化，识别当前活跃的zoom level
  useEffect(() => {
    const newActiveLevel = zoomLevels.find(level => level.dayWidth === dayWidth) || null;
    
    // 只有当active level真正改变时才触发更新
    if (newActiveLevel !== activeLevel) {
      const oldLevel = activeLevel;
      
      // 更新状态
      setActiveLevel(newActiveLevel);
      
      // 触发通用回调
      if (callbacks.onZoomLevelChanged && newActiveLevel) {
        callbacks.onZoomLevelChanged(newActiveLevel, oldLevel);
      }
      
      // 触发特定级别的回调
      if (callbacks.onSpecificLevelActivated && newActiveLevel) {
        const levelKey = `on${newActiveLevel.label}Activated`;
        const specificCallback = callbacks.onSpecificLevelActivated[levelKey];
        if (specificCallback) {
          specificCallback(newActiveLevel);
        }
      }
    }
  }, [dayWidth, zoomLevels, activeLevel, callbacks]);

  // 🛠️ 工具函数：判断特定level是否为活跃状态
  const isLevelActive = useCallback((targetLevel: ZoomLevelType): boolean => {
    return activeLevel !== null && activeLevel.dayWidth === targetLevel.dayWidth;
  }, [activeLevel]);

  // 🛠️ 工具函数：判断特定dayWidth是否为活跃状态
  const isDayWidthActive = useCallback((targetDayWidth: number): boolean => {
    return activeLevel !== null && activeLevel.dayWidth === targetDayWidth;
  }, [activeLevel]);

  // 🛠️ 工具函数：获取当前活跃level的标签
  const getActiveLevelLabel = useCallback((): string => {
    return activeLevel?.label || '';
  }, [activeLevel]);

  // 🛠️ 工具函数：获取所有可用的zoom levels
  const getAllLevels = useCallback((): ZoomLevelType[] => {
    return [...zoomLevels];
  }, [zoomLevels]);

  return {
    activeLevel,
    isLevelActive,
    isDayWidthActive,
    getActiveLevelLabel,
    getAllLevels
  };
};

/**
 * 🎯 便利Hook：专门用于Today按钮的zoom level响应
 * 
 * 这个hook封装了Today按钮最常见的使用场景，
 * 根据不同的zoom level提供不同的Today按钮行为策略。
 */
export const useTodayButtonZoomResponse = (
  dayWidth: number,
  zoomLevels: ZoomLevelType[] = []
) => {
  const { activeLevel, getActiveLevelLabel } = useZoomLevelMonitor(
    dayWidth,
    zoomLevels,
    {
      onZoomLevelChanged: () => {
        // console.log(`📅 Today button strategy updated for: ${newLevel.label}`);
      }
    }
  );

  // 🎯 根据当前zoom level返回Today按钮的行为策略
  const getTodayButtonStrategy = useCallback(() => {
    const level = getActiveLevelLabel().toLowerCase();
    
    switch (level) {
      case 'days':
        return {
          precision: 'day' as const,
          description: 'Scroll to exact today date',
          scrollBehavior: 'precise' as const
        };
      case 'months':
        return {
          precision: 'month' as const,
          description: 'Scroll to current month',
          scrollBehavior: 'smooth' as const
        };
      case 'quarters':
        return {
          precision: 'quarter' as const,
          description: 'Scroll to current quarter',
          scrollBehavior: 'smooth' as const
        };
      default:
        return {
          precision: 'auto' as const,
          description: 'Smart scroll based on zoom level',
          scrollBehavior: 'auto' as const
        };
    }
  }, [getActiveLevelLabel]);

  return {
    activeLevel,
    getTodayButtonStrategy
  };
}; 