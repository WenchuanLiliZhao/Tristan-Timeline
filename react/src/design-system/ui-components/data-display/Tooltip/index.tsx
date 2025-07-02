import React, {
  useState,
  useRef,
  useLayoutEffect,
  type ReactNode,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { Icon, type IconProps } from "../../general/Icon";
import { type Position } from "../../types";

// Re-export Position type for convenience
export type { Position };

// ========== Tooltip Item ==========

export interface TooltipItemProps {
  icon?: IconProps["name"];
  symbol?: ReactNode;
  iconColor?: string;
  label: ReactNode;
  value?: ReactNode;
  autoWidth?: boolean;
}

export const RichTooltipItem: React.FC<TooltipItemProps> = ({
  icon,
  iconColor,
  label,
  value,
  autoWidth = false,
}) => {
  return (
    <div
      className={`${styles["item"]} ${autoWidth ? styles["auto-width"] : ""}`}
    >
      <div className={styles["label"]}>
        {icon && (
          <Icon
            className={styles["icon"]}
            name={icon}
            style={{ color: iconColor }}
            filled
          />
        )}
        <span className={styles["label-text"]}>{label}</span>
      </div>
      {value && <div className={styles["value"]}>{value}</div>}
    </div>
  );
};

// ========== Tooltip Container ==========

interface TooltipProps {
  children: ReactElement<TooltipItemProps>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: ReactElement<any>;
  position?: Position;
  offset?: number;
  alwaysVisible?: boolean;
  autoWidth?: boolean;
}

export const RichTooltip: React.FC<TooltipProps> = ({
  children,
  trigger,
  position = "bottom-start",
  offset = 8,
  alwaysVisible = false,
  autoWidth = false,
}) => {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const triggerElement = React.cloneElement(trigger, {
    ref: triggerRef,
    ...(alwaysVisible
      ? {}
      : {
          onMouseEnter: () => setIsVisible(true),
          onMouseLeave: () => setIsVisible(false),
        }),
  });

  React.useEffect(() => {
    if (alwaysVisible) {
      setIsVisible(true);
    }
  }, [alwaysVisible]);

  // Clone children and pass autoWidth to each TooltipItem
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<TooltipItemProps>(child)) {
      return React.cloneElement(child, {
        ...child.props,
        autoWidth: autoWidth,
      });
    }
    return child;
  });

  return (
    <>
      {triggerElement}
      {isVisible && (
        <TooltipPortal
          triggerRef={triggerRef}
          tooltipRef={tooltipRef}
          position={position}
          offset={offset}
        >
          <div className={styles["container"]}>{enhancedChildren}</div>
        </TooltipPortal>
      )}
    </>
  );
};

// ========== Portal for Positioning ==========

interface TooltipPortalProps {
  children: ReactNode;
  triggerRef: React.RefObject<HTMLElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  position: Position;
  offset: number;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({
  children,
  triggerRef,
  tooltipRef,
  position,
  offset,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const {
        top: triggerTop,
        left: triggerLeft,
        width: triggerWidth,
        height: triggerHeight,
      } = triggerRect;
      const { width: tooltipWidth, height: tooltipHeight } = tooltipRect;

      switch (position) {
        case "bottom-start":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft;
          break;
        case "bottom-middle":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft + (triggerWidth - tooltipWidth) / 2;
          break;
        case "bottom-end":
          top = triggerTop + triggerHeight + offset;
          left = triggerLeft + triggerWidth - tooltipWidth;
          break;
        case "top-start":
          top = triggerTop - tooltipHeight - offset;
          left = triggerLeft;
          break;
        case "top-middle":
          top = triggerTop - tooltipHeight - offset;
          left = triggerLeft + (triggerWidth - tooltipWidth) / 2;
          break;
        case "top-end":
          top = triggerTop - tooltipHeight - offset;
          left = triggerLeft + triggerWidth - tooltipWidth;
          break;
        case "right-start":
          top = triggerTop;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "right-middle":
          top = triggerTop + (triggerHeight - tooltipHeight) / 2;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "right-end":
          top = triggerTop + triggerHeight - tooltipHeight;
          left = triggerLeft + triggerWidth + offset;
          break;
        case "left-start":
          top = triggerTop;
          left = triggerLeft - tooltipWidth - offset;
          break;
        case "left-middle":
          top = triggerTop + (triggerHeight - tooltipHeight) / 2;
          left = triggerLeft - tooltipWidth - offset;
          break;
        case "left-end":
          top = triggerTop + triggerHeight - tooltipHeight;
          left = triggerLeft - tooltipWidth - offset;
          break;
      }

      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [triggerRef, tooltipRef, position, offset]);

  return createPortal(
    <div
      ref={tooltipRef}
      className={styles.portal}
      style={{ top: coords.top, left: coords.left }}
    >
      {children}
    </div>,
    document.body
  );
};
