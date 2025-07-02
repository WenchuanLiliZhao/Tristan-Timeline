import React, { useState } from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Size } from "../../types";
import { Icon } from "../Icon";

export interface SwitchProps extends BaseComponentProps {
  /** Whether the switch is checked/on */
  checked?: boolean;
  /** Default checked state (for uncontrolled component) */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: Size;
  /** Switch variant - toggle for on/off states, mode for neutral mode switching */
  variant?: "toggle" | "mode";
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Name attribute for the input */
  name?: string;
  /** Value attribute for the input */
  value?: string;
  /** Icon to display in thumb when checked */
  checkedIcon?: string;
  /** Icon to display in thumb when unchecked */
  uncheckedIcon?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  size = "medium",
  variant = "toggle",
  onChange,
  name,
  value,
  checkedIcon,
  uncheckedIcon,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked, event);
  };

  const baseClass = "tristan-switch";
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${variant}`],
    isChecked && styles[`${baseClass}--checked`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} data-testid={dataTestId} {...rest}>
      <input
        type="checkbox"
        className={styles[`${baseClass}__input`]}
        checked={isChecked}
        disabled={disabled}
        aria-label="Toggle switch"
        onChange={handleChange}
        name={name}
        value={value}
      />
      <span className={styles[`${baseClass}__track`]}>
        <span className={styles[`${baseClass}__thumb`]}>
          {(checkedIcon || uncheckedIcon) && (
            <Icon 
              name={(isChecked ? checkedIcon : uncheckedIcon) || ""} 
              className={styles[`${baseClass}__icon`]}
            />
          )}
        </span>
      </span>
    </label>
  );
}; 