/**
 * 🔗 Timeline URL 参数管理 Hook
 * 
 * 这个 Hook 管理 Timeline 组件的 URL 参数状态，提供：
 * - URL 参数的读取和写入
 * - 状态与 URL 的双向同步
 * - 默认值处理
 * 
 * 🎯 主要功能：
 * - 初始化时从 URL 读取参数
 * - 状态变化时更新 URL
 * - 处理默认跳转到今天的逻辑
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { TimelineUrlParamsConfig } from '../types';
import {
  parseTimelineUrlParams,
  updateTimelineUrlParams,
  getDefaultDate,
} from '../utils/urlParams';

export interface UseTimelineUrlParamsReturn {
  /** 当前的分组字段 */
  urlGroupBy: string | null;
  /** 当前的日期 */
  urlCurrentDate: Date | null;
  /** 更新分组字段 */
  setUrlGroupBy: (groupBy: string | null) => void;
  /** 更新当前日期 */
  setUrlCurrentDate: (date: Date | null) => void;
  /** 初始化默认日期（用于 defaultToday 功能） */
  initializeDefaultDate: () => void;
  /** 内部状态更新（不触发 URL 更新） */
  setStateFromUrl: (params: {
    groupBy?: string | null;
    currentDate?: Date | null;
  }) => void;
  /** 检查是否是页面刷新时的初始状态 */
  isInitialLoad: boolean;
}

/**
 * Timeline URL 参数管理 Hook
 * @param config URL 参数配置
 * @returns URL 参数状态和更新函数
 */
export function useTimelineUrlParams(
  config: TimelineUrlParamsConfig = {}
): UseTimelineUrlParamsReturn {
  // 立即从 URL 读取初始参数，确保组件初始化时就有正确的值
  const getInitialParams = useCallback(() => {
    return parseTimelineUrlParams();
  }, []);

  const initialParams = getInitialParams();

  // 状态管理 - 使用 URL 中的值作为初始状态
  const [urlGroupBy, setUrlGroupByState] = useState<string | null>(initialParams.groupBy || null);
  const [urlCurrentDate, setUrlCurrentDateState] = useState<Date | null>(initialParams.currentDate || null);
  
  const configRef = useRef(config);
  configRef.current = config;

  // 防止循环更新的标志
  const updatingFromUrlRef = useRef(false);
  
  // 跟踪是否是初始加载（页面刷新）
  const isInitialLoadRef = useRef(true);

  // 更新分组字段
  const setUrlGroupBy = useCallback((groupBy: string | null) => {
    if (updatingFromUrlRef.current) return; // 防止循环更新
    setUrlGroupByState(groupBy);
    updateTimelineUrlParams(configRef.current, { groupBy });
  }, []);

  // 更新当前日期
  const setUrlCurrentDate = useCallback((date: Date | null) => {
    if (updatingFromUrlRef.current) return; // 防止循环更新
    setUrlCurrentDateState(date);
    updateTimelineUrlParams(configRef.current, { currentDate: date });
  }, []);

  // 内部更新状态（不触发 URL 更新）
  const setStateFromUrl = useCallback((params: {
    groupBy?: string | null;
    currentDate?: Date | null;
  }) => {
    updatingFromUrlRef.current = true;
    if (params.groupBy !== undefined) {
      setUrlGroupByState(params.groupBy);
    }
    if (params.currentDate !== undefined) {
      setUrlCurrentDateState(params.currentDate);
    }
    // 下一个 tick 重置标志
    setTimeout(() => {
      updatingFromUrlRef.current = false;
    }, 0);
  }, []);

  // 初始化默认日期（用于 defaultToday 功能）
  const initializeDefaultDate = useCallback(() => {
    if (!configRef.current.defaultToday) {
      return;
    }

    const parsedParams = parseTimelineUrlParams();
    const defaultDate = getDefaultDate(configRef.current, parsedParams);
    
    if (defaultDate && !urlCurrentDate) {
      setUrlCurrentDateState(defaultDate);
      // 只有在配置了 recordCurrentDate 时才写入 URL
      if (configRef.current.recordCurrentDate) {
        updateTimelineUrlParams(configRef.current, { currentDate: defaultDate });
      }
    }
  }, [urlCurrentDate]);

  // 在组件挂载后标记初始加载完成
  useEffect(() => {
    // 使用 setTimeout 确保在下一个 tick 执行，此时所有初始状态都已设置
    const timer = setTimeout(() => {
      isInitialLoadRef.current = false;
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    urlGroupBy,
    urlCurrentDate,
    setUrlGroupBy,
    setUrlCurrentDate,
    initializeDefaultDate,
    setStateFromUrl, // 内部使用的状态更新函数
    isInitialLoad: isInitialLoadRef.current,
  };
} 