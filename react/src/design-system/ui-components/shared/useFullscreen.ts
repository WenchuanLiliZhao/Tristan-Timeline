import { useCallback, useEffect, useState } from 'react';

/**
 * useFullscreen – Hook to toggle an element into/out of the browser Fullscreen API.
 *
 * Usage:
 * ```tsx
 * const { ref, isFullscreen, toggleFullscreen } = useFullscreen();
 *
 * return (
 *   <div ref={ref}>
 *     <button onClick={toggleFullscreen}>Toggle FS</button>
 *   </div>
 * );
 * ```
 */
export function useFullscreen<T extends HTMLElement = HTMLElement>() {
  const [element, setElement] = useState<T | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const request = useCallback(() => {
    if (!element) return;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    // @ts-expect-error Safari prefix
    } else if (element.webkitRequestFullscreen) {
      // Safari
      // @ts-expect-error Safari prefix
      element.webkitRequestFullscreen();
    // @ts-expect-error Firefox prefix
    } else if (element.mozRequestFullScreen) {
      // Firefox
      // @ts-expect-error Firefox prefix
      element.mozRequestFullScreen();
    // @ts-expect-error IE/Edge prefix
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      // @ts-expect-error IE/Edge prefix
      element.msRequestFullscreen();
    }
  }, [element]);

  const exit = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    // @ts-expect-error Safari prefix
    } else if (document.webkitExitFullscreen) {
      // Safari
      // @ts-expect-error Safari prefix
      document.webkitExitFullscreen();
    // @ts-expect-error Firefox prefix
    } else if (document.mozCancelFullScreen) {
      // Firefox
      // @ts-expect-error Firefox prefix
      document.mozCancelFullScreen();
    // @ts-expect-error IE/Edge prefix
    } else if (document.msExitFullscreen) {
      // IE/Edge
      // @ts-expect-error IE/Edge prefix
      document.msExitFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exit();
    } else {
      request();
    }
  }, [isFullscreen, request, exit]);

  // Track fullscreenchange events so that `isFullscreen` stays accurate even
  // when the user presses ESC or toggles via browser UI.
  useEffect(() => {
    function handleChange() {
      const fsElement =
        document.fullscreenElement ||
        // @ts-expect-error prefixed property
        document.webkitFullscreenElement ||
        // @ts-expect-error prefixed property
        document.mozFullScreenElement ||
        // @ts-expect-error prefixed property
        document.msFullscreenElement;
      setIsFullscreen(!!fsElement);
    }

    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('mozfullscreenchange', handleChange);
    document.addEventListener('MSFullscreenChange', handleChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('mozfullscreenchange', handleChange);
      document.removeEventListener('MSFullscreenChange', handleChange);
    };
  }, []);

  // Provide a stable ref callback to attach to the target element.
  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  return { ref, isFullscreen, enterFullscreen: request, exitFullscreen: exit, toggleFullscreen };
} 