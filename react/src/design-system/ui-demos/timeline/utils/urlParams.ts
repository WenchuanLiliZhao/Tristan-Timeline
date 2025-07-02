/**
 * 📋 Timeline URL 参数管理工具
 * 
 * 这个文件提供了 Timeline 组件的 URL 参数管理功能，包括：
 * - 读取和写入 URL 参数
 * - 默认跳转到今天
 * - 记录分组、缩放级别和当前日期
 * 
 * 🎯 主要功能：
 * - parseTimelineUrlParams: 解析 URL 中的 Timeline 参数
 * - updateTimelineUrlParams: 更新 URL 中的 Timeline 参数
 * - getDefaultDate: 获取默认日期（今天或从URL中读取）
 */

import type { TimelineUrlParamsConfig } from '../types';

// URL 参数的键名常量
export const URL_PARAM_KEYS = {
  GROUP_BY: 'timeline_groupby',
  CURRENT_DATE: 'timeline_date',
} as const;

// 从 URL 解析出的参数类型
export interface ParsedUrlParams {
  groupBy?: string;
  currentDate?: Date;
}

/**
 * 从 URL 中解析 Timeline 相关的参数
 */
export function parseTimelineUrlParams(): ParsedUrlParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const result: ParsedUrlParams = {};

  // 解析分组参数
  const groupBy = urlParams.get(URL_PARAM_KEYS.GROUP_BY);
  if (groupBy) {
    result.groupBy = groupBy;
  }

  // 解析当前日期参数
  const currentDateStr = urlParams.get(URL_PARAM_KEYS.CURRENT_DATE);
  if (currentDateStr) {
    const date = new Date(currentDateStr);
    if (!isNaN(date.getTime())) {
      result.currentDate = date;
    }
  }

  return result;
}

/**
 * 更新 URL 中的 Timeline 参数
 */
export function updateTimelineUrlParams(
  config: TimelineUrlParamsConfig,
  updates: Partial<{
    groupBy: string | null;
    currentDate: Date | null;
  }>
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  // 更新分组参数
  if (config.recordGroupby && updates.groupBy !== undefined) {
    if (updates.groupBy === null) {
      urlParams.delete(URL_PARAM_KEYS.GROUP_BY);
    } else {
      urlParams.set(URL_PARAM_KEYS.GROUP_BY, updates.groupBy);
    }
  }

  // 更新当前日期参数
  if (config.recordCurrentDate && updates.currentDate !== undefined) {
    if (updates.currentDate === null) {
      urlParams.delete(URL_PARAM_KEYS.CURRENT_DATE);
    } else {
      urlParams.set(URL_PARAM_KEYS.CURRENT_DATE, updates.currentDate.toISOString().split('T')[0]);
    }
  }

  // 更新浏览器 URL（不触发页面刷新）
  const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
  window.history.replaceState({}, '', newUrl);
}

/**
 * 获取默认日期
 * @param config URL 参数配置
 * @param parsedParams 已解析的 URL 参数
 * @returns 默认日期，如果配置了 defaultToday 且没有 URL 参数则返回今天
 */
export function getDefaultDate(
  config: TimelineUrlParamsConfig,
  parsedParams: ParsedUrlParams
): Date | null {
  // 如果 URL 中有日期参数，优先使用
  if (parsedParams.currentDate) {
    return parsedParams.currentDate;
  }

  // 如果配置了 defaultToday 且没有任何 Timeline URL 参数，返回今天
  if (config.defaultToday) {
    const hasAnyTimelineParams = parsedParams.groupBy || parsedParams.currentDate;
    if (!hasAnyTimelineParams) {
      return new Date();
    }
  }

  return null;
}

/**
 * 检查是否存在任何 Timeline 相关的 URL 参数
 */
export function hasAnyTimelineUrlParams(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return Object.values(URL_PARAM_KEYS).some(key => urlParams.has(key));
}

/**
 * 清除所有 Timeline 相关的 URL 参数
 */
export function clearTimelineUrlParams(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  Object.values(URL_PARAM_KEYS).forEach(key => {
    urlParams.delete(key);
  });

  const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
  window.history.replaceState({}, '', newUrl);
} 