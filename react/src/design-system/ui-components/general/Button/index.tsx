import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Size } from "../../types";
import { Icon } from "../Icon";
import { HoverBox } from "../../shared/HoverBox";

export interface ButtonProps extends BaseComponentProps {
  children?: React.ReactNode;
  /** Button mode/variant - matches Figma "mode" property */
  variant?: "filled" | "outlined" | "ghost";
  /** Button size */
  size?: Size;
  /** Semantic color variant - matches Figma "semantic" property */
  semantic?: "default" | "success" | "active" | "warning" | "error";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Icon to display (when showIcon is true) */
  icon?: string;
  /** Decorative icon to display (when showDecoIcon is true) */
  decoIcon?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Width mode of button */
  widthMode?: "auto width" | "full width";
  /** Whether the button should be focusable via keyboard and show focus outline */
  focusable?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outlined",
  size = "medium",
  semantic = "default",
  disabled = false,
  icon,
  decoIcon,
  onClick,
  type = "button",
  className = "",
  "data-testid": dataTestId,
  widthMode = "auto width",
  focusable = false,
  ...rest
}) => {
  const baseClass = "tristan-button";
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${semantic}`],
    widthMode === "full width" && styles[`${baseClass}--full-width`],
    disabled && styles[`${baseClass}--disabled`],
    focusable && styles[`${baseClass}--focusable`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      tabIndex={focusable ? 0 : -1}
      data-testid={dataTestId}
      {...rest}
    >
      <div className={styles[`${baseClass}__content-container`]}>
        {icon && (
          <span className={styles[`${baseClass}__icon`]}>
            <Icon name={icon} />
          </span>
        )}
        {children && (
          <span className={styles[`${baseClass}__content`]}>{children}</span>
        )}
      </div>
      {decoIcon && (
        <span className={styles[`${baseClass}__icon`]}>
          <Icon name={decoIcon} />
        </span>
      )}
      <HoverBox className={styles["hover-box"]} />
    </button>
  );
};

interface ButtonGroupDeviderProps {
  size?: Size;
}

export const ButtonGroupDevider: React.FC<ButtonGroupDeviderProps> = ({
  size = "medium",
}) => {
  const baseClass = "tristan-button-group-devider";
  const classes = [styles[baseClass], styles[`${baseClass}--${size}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={styles[`line`]} />
    </div>
  );
};
