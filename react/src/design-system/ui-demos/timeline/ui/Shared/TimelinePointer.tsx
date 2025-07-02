import React from "react";
import styles from "./TimelinePointer.module.scss";
import { 
  RichTooltip, 
  RichTooltipItem, 
  formatDate, 
  type Position 
} from "../../../../ui-components";

interface TimelinePointerProps {
  year?: number;
  month?: number;
  day?: number;
  showTooltip?: boolean;
  position?: Position;
}

export const TimelinePointer: React.FC<TimelinePointerProps> = ({
  year,
  month,
  day,
  showTooltip = true,
  position = 'right-middle',
}) => {
  // 如果没有传递参数，使用今天的日期
  const currentDate = new Date();
  const displayYear = year ?? currentDate.getFullYear();
  const displayMonth = month ?? currentDate.getMonth();
  const displayDay = day ?? currentDate.getDate();

  const pointerElement = (
    <div className={styles["timeline-pointer"]}>
      <div className={styles["line"]}></div>
      <div className={styles["bullet"]}>
        <div className={styles["bullet-inner"]}></div>
      </div>
    </div>
  );

  if (!showTooltip) {
    return pointerElement;
  }

  return (
    <RichTooltip
      trigger={pointerElement}
      position={position}
      offset={8}
      autoWidth={true}
    >
      {[
        <RichTooltipItem
          key="date"
          label={formatDate(displayYear, displayMonth, displayDay)}
        />
      ]}
    </RichTooltip>
  );
};
