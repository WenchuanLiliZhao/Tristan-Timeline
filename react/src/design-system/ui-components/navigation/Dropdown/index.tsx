import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { Cascader, type CascaderGroupProps, type CascaderItemProps } from "../Cascader";
import { type BaseComponentProps } from "../../types";

// ========== Dropdown Types ==========

type Position =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface DropdownProps extends BaseComponentProps {
  trigger: ReactNode;
  groups: CascaderGroupProps[];
  position?: Position;
  offset?: number;
  disabled?: boolean;
  onItemClick?: (value: string | number | object | undefined, item: CascaderItemProps) => void;
  onVisibilityChange?: (visible: boolean) => void;
  maxHeight?: number;
  width?: number;
}

// ========== Dropdown Component ==========

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  groups,
  position = "bottom-start",
  offset = 0,
  disabled = false,
  onItemClick,
  onVisibilityChange,
  maxHeight = 300,
  width = 200,
  className,
  'data-testid': dataTestId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    if (disabled) return;
    setIsVisible(visible);
    onVisibilityChange?.(visible);
  }, [disabled, onVisibilityChange]);

  const handleItemClick = useCallback((value: string | number | object | undefined, item: CascaderItemProps) => {
    onItemClick?.(value, item);
    // Close dropdown after selection
    handleVisibilityChange(false);
  }, [onItemClick, handleVisibilityChange]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible &&
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleVisibilityChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible, handleVisibilityChange]);

  // Create trigger wrapper with event handlers
  const triggerProps = disabled ? {} : {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleVisibilityChange(!isVisible);
    },
  };

  return (
    <div className={`${styles["dropdown-container"]} ${className || ""}`} data-testid={dataTestId}>
      <div
        ref={triggerRef}
        className={`${styles["dropdown-trigger"]} ${disabled ? styles["disabled"] : ""}`}
        {...triggerProps}
      >
        {trigger}
      </div>
      {isVisible && !disabled && (
        <DropdownPortal
          triggerRef={triggerRef}
          dropdownRef={dropdownRef}
          position={position}
          offset={offset}
        >
          <Cascader
            groups={groups}
            onItemClick={handleItemClick}
            maxHeight={maxHeight}
            width={width}
          />
        </DropdownPortal>
      )}
    </div>
  );
};

// ========== Portal for Positioning ==========

interface DropdownPortalProps {
  children: ReactNode;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  position: Position;
  offset: number;
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({
  children,
  triggerRef,
  dropdownRef,
  position,
  offset,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const {
        top: triggerTop,
        left: triggerLeft,
        width: triggerWidth,
        height: triggerHeight,
      } = triggerRect;
      const { width: dropdownWidth, height: dropdownHeight } = dropdownRect;

      switch (position) {
        case "bottom-start":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft;
          break;
        case "bottom-end":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft + triggerWidth - dropdownWidth;
          break;
        case "top-start":
          top = triggerTop - dropdownHeight - offset;
          left = triggerLeft;
          break;
        case "top-end":
          top = triggerTop - dropdownHeight - offset;
          left = triggerLeft + triggerWidth - dropdownWidth;
          break;
        case "right-start":
          top = triggerTop;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "right-end":
          top = triggerTop + triggerHeight - dropdownHeight;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "left-start":
          top = triggerTop;
          left = triggerLeft - dropdownWidth - offset;
          break;
        case "left-end":
          top = triggerTop + triggerHeight - dropdownHeight;
          left = triggerLeft - dropdownWidth - offset;
          break;
      }

      // Ensure dropdown stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 8;
      }
      if (left < 8) {
        left = 8;
      }
      if (top + dropdownHeight > viewportHeight) {
        top = viewportHeight - dropdownHeight - 8;
      }
      if (top < 8) {
        top = 8;
      }

      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [triggerRef, dropdownRef, position, offset]);

  return createPortal(
    <div
      ref={dropdownRef}
      className={styles["dropdown-portal"]}
      style={{ top: coords.top, left: coords.left }}
    >
      {children}
    </div>,
    document.body
  );
}; 