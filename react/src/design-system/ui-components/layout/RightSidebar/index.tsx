import React from "react";
import styles from "./styles.module.scss";
import type { BaseComponentProps } from "../../types";
import { Button } from "../../general/Button";

interface RightSidebarProps extends BaseComponentProps {
  /** Whether the sidebar is open */
  isOpen: boolean;
  /** Function to close the sidebar */
  onClose: () => void;
  /** Title of the sidebar */
  title?: string;
  /** Content to display in the sidebar */
  children: React.ReactNode;
  /** Width of the sidebar */
  width?: number | string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 400,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  return (
    <div
      className={`${styles["right-sidebar"]} ${className}`}
      data-testid={dataTestId}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        display: isOpen ? "flex" : "none",
        height: "100vh",
      }}
      {...rest}
    >
      {/* Header */}
      <div className={styles["header"]}>
        <h3 className={styles["title"]}>{title || "Details"}</h3>
        <Button
          icon="close"
          variant="ghost"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      </div>

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
