import { useState, useEffect, useRef } from 'react';
import { type Position } from '../types';

interface UseSmartPositionOptions {
  preferredPosition: Position;
  fallbackPosition: Position;
  offset?: number;
}

/**
 * Smart positioning hook that automatically switches position when content would overflow viewport
 * 
 * @param options Configuration object
 * @returns Current position and ref to attach to the trigger element
 */
export const useSmartPosition = ({
  preferredPosition,
  fallbackPosition,
  offset = 8
}: UseSmartPositionOptions) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(preferredPosition);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Estimate tooltip dimensions (approximate)
      const estimatedTooltipWidth = 200; // Reasonable estimate
      const estimatedTooltipHeight = 60;

      let shouldUseFallback = false;

      // Check if preferred position would overflow
      switch (preferredPosition) {
        case 'right-middle':
        case 'right-start':
        case 'right-end':
          // Check right overflow
          if (triggerRect.right + offset + estimatedTooltipWidth > viewportWidth) {
            shouldUseFallback = true;
          }
          break;
          
        case 'left-middle':
        case 'left-start':
        case 'left-end':
          // Check left overflow
          if (triggerRect.left - offset - estimatedTooltipWidth < 0) {
            shouldUseFallback = true;
          }
          break;
          
        case 'top-middle':
        case 'top-start':
        case 'top-end':
          // Check top overflow
          if (triggerRect.top - offset - estimatedTooltipHeight < 0) {
            shouldUseFallback = true;
          }
          break;
          
        case 'bottom-middle':
        case 'bottom-start':
        case 'bottom-end':
          // Check bottom overflow
          if (triggerRect.bottom + offset + estimatedTooltipHeight > viewportHeight) {
            shouldUseFallback = true;
          }
          break;
      }

      setCurrentPosition(shouldUseFallback ? fallbackPosition : preferredPosition);
    };

    // Check position on mount and scroll/resize
    checkPosition();
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [preferredPosition, fallbackPosition, offset]);

  return {
    position: currentPosition,
    triggerRef
  };
}; 