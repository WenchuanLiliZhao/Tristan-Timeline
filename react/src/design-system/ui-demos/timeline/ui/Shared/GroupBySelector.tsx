import React from "react";
import { Dropdown, Button, Icon } from "../../../../ui-components";
import { type CascaderGroupProps } from "../../../../ui-components";
import styles from "./GroupBySelector.module.scss";

interface GroupBySelectorProps {
  groupBy?: string;
  groupByOptions?: { key: string; label: string; value: string }[];
  onGroupByChange?: (value: string) => void;
}

export const GroupBySelector: React.FC<GroupBySelectorProps> = ({
  groupBy,
  groupByOptions = [],
  onGroupByChange,
}) => {
  // 创建 groupBy 选项的 cascader 数据
  const createGroupByOptions = (): CascaderGroupProps[] => {
    if (groupByOptions.length === 0) return [];

    return [
      {
        items: groupByOptions.map((option) => ({
          key: option.key,
          content: (
            <Button
              size="medium"
              widthMode="full width"
              decoIcon={option.label === groupBy ? "check" : undefined}
              variant={option.label === groupBy ? "filled" : "ghost"}
              semantic={option.label === groupBy ? "active" : "default"}
            >
              {option.label}
            </Button>
          ),
          value: option.value,
        })),
      },
    ];
  };

  const handleGroupByChange = (value: string | number | object | undefined) => {
    if (typeof value === "string" && onGroupByChange) {
      onGroupByChange(value);
    }
  };

  if (groupByOptions.length === 0) {
    return null;
  }

  return (
    <div className={styles["group-by-selector"]}>
      <div className={styles["group-by-container"]}>
        <div className={styles["group-by-label"]}>Group By</div>

        <Dropdown
          className={styles["group-by-dropdown"]}
          trigger={
            <div className={styles["group-by-value-container"]}>
              <div className={styles["group-by-value"]}>{groupBy}</div>
              <Icon
                className={styles["group-by-value-icon"]}
                name="chevron_right"
              />
            </div>
          }
          groups={createGroupByOptions()}
          position="right-start"
          onItemClick={handleGroupByChange}
          width={160}
        />
      </div>
    </div>
  );
}; 