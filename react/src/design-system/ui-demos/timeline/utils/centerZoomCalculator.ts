/**
 * 🎯 中心缩放计算器
 * 
 * 提供精确的中心点缩放计算功能，适用于有固定侧边栏的滚动容器。
 * 核心思想是在缩放时保持内容区域中心点的时间轴位置不变。
 * 
 * 📐 数学原理：
 * 1. 计算当前内容区域的中心点在时间轴上的位置
 * 2. 应用缩放因子到该位置
 * 3. 重新计算滚动位置，使该点回到内容区域中心
 * 
 * 🔄 适用场景：
 * - Timeline 时间轴缩放
 * - 图表缩放
 * - 代码编辑器缩放
 * - 任何需要"原地"中心缩放的场景
 * 
 * @author Tristan-UI Team
 * @created 2024-06-27
 */

/**
 * 中心缩放计算的输入参数
 */
export interface CenterZoomCalculationInput {
  /** 当前滚动位置 */
  currentScrollLeft: number;
  /** 容器总宽度 */
  containerWidth: number;
  /** 侧边栏宽度（如果没有侧边栏，传入 0） */
  sidebarWidth: number;
  /** 缩放因子（新缩放级别 / 旧缩放级别） */
  scaleFactor: number;
  /** 容器的最大滚动宽度 */
  maxScrollWidth: number;
}

/**
 * 中心缩放计算的输出结果
 */
export interface CenterZoomCalculationResult {
  /** 计算出的新滚动位置 */
  newScrollLeft: number;
  /** 内容区域宽度 */
  contentAreaWidth: number;
  /** 缩放前的内容中心点位置 */
  originalCenterPoint: number;
  /** 缩放后的内容中心点位置 */
  newCenterPoint: number;
  /** 是否触及左边界 */
  isAtLeftBoundary: boolean;
  /** 是否触及右边界 */
  isAtRightBoundary: boolean;
}

/**
 * 🎯 核心函数：计算中心缩放的新滚动位置
 * 
 * 这个函数实现了精确的中心点缩放算法，确保在缩放时用户当前关注的
 * 内容区域中心点保持在相同的视觉位置。
 * 
 * 📊 计算步骤：
 * 1. 计算实际内容区域宽度（排除侧边栏）
 * 2. 找到当前内容区域的中心点在时间轴上的位置
 * 3. 应用缩放因子计算该点的新位置
 * 4. 计算新的滚动位置，使该点重新位于内容区域中心
 * 5. 应用边界约束，确保滚动位置有效
 * 
 * @param input 缩放计算的输入参数
 * @returns 包含新滚动位置和相关信息的计算结果
 * 
 * @example
 * ```typescript
 * const result = calculateCenterZoomPosition({
 *   currentScrollLeft: 1000,
 *   containerWidth: 1200,
 *   sidebarWidth: 240,
 *   scaleFactor: 2.0, // 放大2倍
 *   maxScrollWidth: 5000
 * });
 * 
 * // 应用新的滚动位置
 * container.scrollLeft = result.newScrollLeft;
 * ```
 */
export function calculateCenterZoomPosition(
  input: CenterZoomCalculationInput
): CenterZoomCalculationResult {
  const {
    currentScrollLeft,
    containerWidth,
    sidebarWidth,
    scaleFactor,
    maxScrollWidth
  } = input;

  // 🎯 步骤1: 计算实际内容区域宽度
  // 内容区域 = 容器总宽度 - 固定侧边栏宽度
  const contentAreaWidth = containerWidth - sidebarWidth;

  // 🎯 步骤2: 计算内容区域中心点在时间轴上的当前位置
  // 中心点位置 = 当前滚动位置 + 内容区域宽度的一半
  const originalCenterPoint = currentScrollLeft + contentAreaWidth / 2;

  // 🎯 步骤3: 应用缩放因子计算该点的新位置
  // 新位置 = 原位置 × 缩放因子
  const newCenterPoint = originalCenterPoint * scaleFactor;

  // 🎯 步骤4: 计算新的滚动位置
  // 新滚动位置 = 新中心点位置 - 内容区域宽度的一半
  const targetScrollLeft = newCenterPoint - contentAreaWidth / 2;

  // 🎯 步骤5: 应用边界约束
  const maxScrollLeft = maxScrollWidth - containerWidth;
  const newScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));

  // 🔍 边界检测
  const isAtLeftBoundary = newScrollLeft <= 0;
  const isAtRightBoundary = newScrollLeft >= maxScrollLeft;

  return {
    newScrollLeft,
    contentAreaWidth,
    originalCenterPoint,
    newCenterPoint,
    isAtLeftBoundary,
    isAtRightBoundary
  };
}

/**
 * 🎯 辅助函数：计算缩放因子
 * 
 * 根据新旧缩放级别计算缩放因子，包含安全检查。
 * 
 * @param newZoomLevel 新的缩放级别
 * @param oldZoomLevel 旧的缩放级别
 * @returns 缩放因子，如果输入无效则返回 1
 * 
 * @example
 * ```typescript
 * const factor = calculateScaleFactor(24, 12); // 返回 2.0
 * const factor = calculateScaleFactor(12, 24); // 返回 0.5
 * ```
 */
export function calculateScaleFactor(
  newZoomLevel: number,
  oldZoomLevel: number
): number {
  // 安全检查：避免除零和无效值
  if (!oldZoomLevel || oldZoomLevel <= 0 || !newZoomLevel || newZoomLevel <= 0) {
    console.warn('Invalid zoom levels provided to calculateScaleFactor', {
      newZoomLevel,
      oldZoomLevel
    });
    return 1;
  }

  return newZoomLevel / oldZoomLevel;
}

/**
 * 🎯 验证函数：检查计算结果的合理性
 * 
 * 用于调试和验证缩放计算是否正确。
 * 
 * @param result 计算结果
 * @param input 原始输入
 * @returns 验证通过返回 true，否则返回 false
 */
export function validateCenterZoomResult(
  result: CenterZoomCalculationResult,
  input: CenterZoomCalculationInput
): boolean {
  const { newScrollLeft, contentAreaWidth } = result;
  const { containerWidth, maxScrollWidth } = input;

  // 检查滚动位置是否在有效范围内
  const maxScrollLeft = maxScrollWidth - containerWidth;
  const isScrollPositionValid = newScrollLeft >= 0 && newScrollLeft <= maxScrollLeft;

  // 检查内容区域宽度是否合理
  const isContentWidthValid = contentAreaWidth > 0 && contentAreaWidth <= containerWidth;

  if (!isScrollPositionValid) {
    console.warn('Invalid scroll position calculated', { newScrollLeft, maxScrollLeft });
  }

  if (!isContentWidthValid) {
    console.warn('Invalid content area width calculated', { contentAreaWidth, containerWidth });
  }

  return isScrollPositionValid && isContentWidthValid;
}

/**
 * 🎯 示例用法和测试数据
 * 
 * 提供一些常见场景的示例计算，方便测试和理解。
 */
export const CenterZoomExamples = {
  /** Timeline 场景：从月视图切换到日视图 */
  timelineMonthToDay: {
    input: {
      currentScrollLeft: 1000,
      containerWidth: 1200,
      sidebarWidth: 240,
      scaleFactor: 3, // 日视图通常比月视图精细3倍
      maxScrollWidth: 10000
    }
  },

  /** 图表场景：2倍放大 */
  chartZoomIn: {
    input: {
      currentScrollLeft: 500,
      containerWidth: 800,
      sidebarWidth: 0, // 图表通常没有侧边栏
      scaleFactor: 2,
      maxScrollWidth: 4000
    }
  },

  /** 编辑器场景：缩小到50% */
  editorZoomOut: {
    input: {
      currentScrollLeft: 2000,
      containerWidth: 1000,
      sidebarWidth: 200, // 文件树侧边栏
      scaleFactor: 0.5,
      maxScrollWidth: 8000
    }
  }
} as const; 