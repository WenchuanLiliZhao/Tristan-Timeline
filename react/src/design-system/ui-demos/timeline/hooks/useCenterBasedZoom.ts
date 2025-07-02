/**
 * 中心缩放Hook - 实现Timeline的"原地"中心点缩放功能
 * 
 * 这个Hook封装了中心缩放的DOM操作逻辑，使用独立的计算器进行数学计算。
 * 主要负责监听缩放级别变化、调用计算器、应用结果到DOM。
 * 
 * 🎯 职责分离：
 * - Hook：处理React生命周期、DOM操作、滚动行为控制
 * - Calculator：纯数学计算，可复用于其他场景
 * 
 * 📐 使用的计算器：
 * - calculateCenterZoomPosition: 核心缩放位置计算
 * - calculateScaleFactor: 缩放因子计算
 * - validateCenterZoomResult: 结果验证（开发模式）
 */

import { useRef, useEffect } from 'react';
import { 
  calculateCenterZoomPosition, 
  calculateScaleFactor,
  validateCenterZoomResult,
  type CenterZoomCalculationInput
} from '../utils/centerZoomCalculator';

// Timeline sidebar 宽度常量
const SIDEBAR_WIDTH = 240;

export const useCenterBasedZoom = (zoomLevel: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevZoomLevelRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 第一次初始化，只记录缩放级别
    if (!isInitializedRef.current) {
      prevZoomLevelRef.current = zoomLevel;
      isInitializedRef.current = true;
      return;
    }

    const prevZoomLevel = prevZoomLevelRef.current;
    
    // 缩放级别没有变化，直接返回
    if (prevZoomLevel === null || prevZoomLevel === zoomLevel) return;

    // 🎯 使用封装的计算器计算缩放因子
    const scaleFactor = calculateScaleFactor(zoomLevel, prevZoomLevel);
    
    // 如果缩放因子无效（比如为1），跳过处理
    if (scaleFactor === 1) return;
    
  
    
    // 🔍 计算期望的Timeline宽度变化
    
    
    
    // 🎯 准备计算器输入参数
    const calculationInput: CenterZoomCalculationInput = {
      currentScrollLeft: container.scrollLeft,
      containerWidth: container.clientWidth,
      sidebarWidth: SIDEBAR_WIDTH,
      scaleFactor: scaleFactor,
      maxScrollWidth: container.scrollWidth
    };
    
    
    
    
    
    // 暂时禁用滚动动画
    const originalScrollBehavior = container.style.scrollBehavior;
    container.style.scrollBehavior = 'auto';
    
    // 等待DOM更新后执行缩放调整 - 额外延迟以确保Timeline DOM完全更新
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 🔍 记录DOM更新后的状态
          const afterState = {
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            scrollWidth: container.scrollWidth
          };
          
          // 更新计算输入的maxScrollWidth
          calculationInput.maxScrollWidth = afterState.scrollWidth;
          
          // 🎯 使用封装的计算器计算新位置
          const result = calculateCenterZoomPosition(calculationInput);
          
          // 🔍 开发模式下验证结果
          validateCenterZoomResult(result, calculationInput);
          
          // 🎯 应用计算结果到DOM
          container.scrollLeft = result.newScrollLeft;
          
          // 恢复滚动行为
          requestAnimationFrame(() => {
            container.style.scrollBehavior = originalScrollBehavior;
          });
        });
      });
    });
    
    // 更新记录的缩放级别
    prevZoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);

  return {
    containerRef
  };
}; 