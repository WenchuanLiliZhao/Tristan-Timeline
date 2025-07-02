import React, { type ReactNode } from "react";
import styles from "./styles.module.scss";
import { type BaseComponentProps } from "../../types";
import { Button } from "../../general/Button";

// ========== Cascader Item Types ==========

export interface CascaderItemProps extends BaseComponentProps {
  key: string;
  content: ReactNode;
  value?: string | number | object;
  disabled?: boolean;
  onClick?: (value: string | number | object | undefined, item: CascaderItemProps) => void;
}

export interface CascaderGroupProps {
  groupTitle?: ReactNode;
  items: CascaderItemProps[];
}

// ========== Cascader Item Component ==========

export const CascaderItem: React.FC<CascaderItemProps> = ({
  content,
  value,
  disabled = false,
  onClick,
  className,
  'data-testid': dataTestId,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && onClick) {
      onClick(value, { key: '', content, value, disabled, onClick });
    }
  };

  return (
    <Button
      variant="ghost"
      size="medium"
      disabled={disabled}
      onClick={handleClick}
      className={`${styles["cascader-item"]} ${className || ""}`}
      data-testid={dataTestId}
      widthMode="full width"
    >
      {content}
    </Button>
  );
};

// ========== Cascader Component ==========

interface CascaderProps extends BaseComponentProps {
  groups: CascaderGroupProps[];
  onItemClick?: (value: string | number | object | undefined, item: CascaderItemProps) => void;
  maxHeight?: number;
  width?: number;
}

export const Cascader: React.FC<CascaderProps> = ({
  groups,
  onItemClick,
  maxHeight = 300,
  width = 200,
  className,
  'data-testid': dataTestId,
}) => {
  const handleItemClick = (value: string | number | object | undefined, item: CascaderItemProps) => {
    if (onItemClick) {
      onItemClick(value, item);
    }
  };

  return (
    <div
      className={`${styles["cascader"]} ${className || ""}`}
      style={{ maxHeight, width }}
      data-testid={dataTestId}
    >
      <div className={styles["cascader-content"]}>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles["cascader-group"]}>
            {group.groupTitle && (
              <div className={styles["cascader-group-title"]}>
                {group.groupTitle}
              </div>
            )}
            <div className={styles["cascader-group-items"]}>
              {group.items.map((item) => (
                <CascaderItem
                  key={item.key}
                  content={item.content}
                  value={item.value}
                  disabled={item.disabled}
                  onClick={handleItemClick}
                  className={item.className}
                  data-testid={item['data-testid']}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 