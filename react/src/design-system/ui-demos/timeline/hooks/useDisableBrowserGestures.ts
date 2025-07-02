/**
 * 禁用浏览器左右滑动手势的Hook
 * 
 * 当用户鼠标进入Timeline区域时，禁用Chrome等浏览器的：
 * - 右滑返回上一页
 * - 左滑前进到下一页
 * - 触摸板横向滑动导航
 * - 鼠标滚轮横向滚动导航
 * 
 * 这个实现结合了CSS overscroll-behavior和JavaScript事件处理，
 * 提供最全面的浏览器手势禁用支持。
 * 
 * @returns {React.RefObject<HTMLDivElement>} 需要附加到Timeline容器的ref
 * 
 * 💡 使用示例：
 * ```typescript
 * const timelineRef = useDisableBrowserGestures();
 * 
 * return (
 *   <div ref={timelineRef}>
 *     Timeline内容
 *   </div>
 * );
 * ```
 */

import { useRef, useEffect } from 'react';

export const useDisableBrowserGestures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 设置CSS属性以禁用overscroll行为
    container.style.overscrollBehaviorX = 'none';
    container.style.overscrollBehavior = 'none';

    let isMouseInside = false;

    // 阻止横向滚动触发浏览器导航
    const preventHorizontalNavigation = (e: WheelEvent) => {
      if (!isMouseInside) return;
      
      // 检查是否是横向滚动
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // 如果是横向滚动且滚动到边界，阻止默认行为
        const element = container;
        const atLeftEdge = element.scrollLeft <= 0 && e.deltaX < 0;
        const atRightEdge = element.scrollLeft >= element.scrollWidth - element.clientWidth && e.deltaX > 0;
        
        if (atLeftEdge || atRightEdge) {
          e.preventDefault();
        }
      }
    };

    // 防止触摸滑动触发浏览器导航
    const preventTouchNavigation = (e: TouchEvent) => {
      if (!isMouseInside) return;
      
      // 对于触摸事件，更保守地阻止默认行为
      if (e.touches.length === 1) {
        const target = e.target as Element;
        if (container.contains(target)) {
          // 只有当触摸在容器边缘时才阻止
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          const isNearEdge = touch.clientX < rect.left + 50 || touch.clientX > rect.right - 50;
          
          if (isNearEdge) {
            e.preventDefault();
          }
        }
      }
    };

    // 阻止指针事件导航（触摸板手势）
    const preventPointerNavigation = (e: PointerEvent) => {
      if (!isMouseInside) return;
      
      // 阻止触摸板的横向手势
      if (e.pointerType === 'touch' && Math.abs(e.movementX) > Math.abs(e.movementY)) {
        e.preventDefault();
      }
    };

    // 鼠标进入事件处理
    const handleMouseEnter = () => {
      isMouseInside = true;
      
      // 添加各种事件监听器
      document.addEventListener('wheel', preventHorizontalNavigation, { passive: false });
      document.addEventListener('touchstart', preventTouchNavigation, { passive: false });
      document.addEventListener('touchmove', preventTouchNavigation, { passive: false });
      document.addEventListener('pointermove', preventPointerNavigation, { passive: false });
    };

    // 鼠标离开事件处理
    const handleMouseLeave = () => {
      isMouseInside = false;
      
      // 移除事件监听器
      document.removeEventListener('wheel', preventHorizontalNavigation);
      document.removeEventListener('touchstart', preventTouchNavigation);
      document.removeEventListener('touchmove', preventTouchNavigation);
      document.removeEventListener('pointermove', preventPointerNavigation);
    };

    // 添加鼠标事件监听器
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 清理函数
    return () => {
      // 重置CSS属性
      container.style.overscrollBehaviorX = '';
      container.style.overscrollBehavior = '';
      
      // 移除事件监听器
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('wheel', preventHorizontalNavigation);
      document.removeEventListener('touchstart', preventTouchNavigation);
      document.removeEventListener('touchmove', preventTouchNavigation);
      document.removeEventListener('pointermove', preventPointerNavigation);
    };
  }, []);

  return containerRef;
}; 