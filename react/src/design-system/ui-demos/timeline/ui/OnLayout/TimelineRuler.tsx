/**
 * 📏 TimelineRuler时间线标尺组件
 *
 * 这是Timeline组件的时间标尺部分，显示年、月、日的刻度信息。
 * 就像一把尺子一样，帮助用户了解时间线的时间范围和当前位置。
 *
 * 🎯 主要功能：
 * - 多层级时间显示：年份 → 月份 → 日期，层次清晰
 * - 智能缩放：根据缩放级别显示不同详细程度的信息
 * - 今日高亮：自动高亮显示今天的日期
 * - 响应式宽度：根据dayWidth参数调整每日的显示宽度
 *
 * 🗓️ 时间结构：
 * ┌─ 2024年 ────────────────────┐
 * ├─ Jan 2024 ─┬─ Feb 2024 ─┬...│
 * ├─ 1,2,3...31 ├─ 1,2,3...29 ├...│
 * └─────────────┴─────────────┴...┘
 *
 * 🔍 缩放逻辑：
 * - dayWidth > zoomThreshold：显示详细的日期标签
 * - dayWidth ≤ zoomThreshold：显示简化的日期标签
 *
 * 💡 参数说明：
 * - yearList：要显示的年份列表
 * - startMonth：起始月份（0-11）
 * - dayWidth：每天的像素宽度
 * - zoomThreshold：缩放阈值，决定显示详细程度
 */

import React from "react";
import { monthNames, getDaysInMonth } from "../../utils/time";
import { TimelineConst } from "../_constants";
import { Column } from "../Shared/Column";
import { TimelinePointer } from "../Shared/TimelinePointer";
import styles from "./TimelineRuler.module.scss";

interface TimelineRulerProps {
  yearList: number[];
  startMonth: number;
  dayWidth: number;
  style?: React.CSSProperties;
}

// 判断指定日期是否为今天的函数
const isToday = (
  year: number,
  monthIndex: number,
  dayIndex: number
): boolean => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based (0 = January)
  const currentDay = today.getDate(); // 1-based (1-31)

  return (
    year === currentYear &&
    monthIndex === currentMonth &&
    dayIndex + 1 === currentDay
  );
};

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  yearList,
  startMonth,
  dayWidth,
  style,
}) => {
  return (
    <Column className={styles["timeline-ruler-column"]} style={style}>
      {yearList.map((year, yearIndex) => (
        <div key={year} className={styles["timeline-ruler-year"]}>
          {/* 年份标签 - 只在每年的第一个月显示 */}
          <div
            className={styles["timeline-ruler-year-label"]}
            style={{ height: `${TimelineConst.yearLabelHeight}px` }}
          >
            {year}
          </div>
          <Column className={styles["timeline-ruler-column"]}>
            {Array.from(
              { length: yearIndex === 0 ? 12 - startMonth : 12 },
              (_, i) => (yearIndex === 0 ? i + startMonth : i)
            ).map((monthIndex) => (
              <div key={monthIndex} className={styles["timeline-ruler-month"]}>
                <div
                  className={styles["timeline-ruler-month-label"]}
                  style={{ height: `${TimelineConst.monthLabelHeight}px` }}
                >
                  {monthNames[monthIndex]}
                  <span className={styles["year-for-month"]}>{year}</span>
                </div>
                <Column
                  className={`${styles["timeline-ruler-column"]} ${styles["timeline-ruler-month-grid"]}`}
                >
                  {Array.from(
                    { length: getDaysInMonth(year, monthIndex) },
                    (_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`${styles["timeline-ruler-day"]}`}
                        style={{ width: `${dayWidth}px` }}
                      >
                        {isToday(year, monthIndex, dayIndex) ? (
                          <TimelinePointer 
                            year={year}
                            month={monthIndex}
                            day={dayIndex + 1}
                            position="right-middle"
                          />
                        ) : (
                          <div
                            className={`${styles["timeline-ruler-day-label"]} ${
                              isToday(year, monthIndex, dayIndex)
                                ? styles["today"]
                                : ""
                            }`}
                            style={{
                              height: `${TimelineConst.dayLabelHeight}px`,
                            }}
                          >
                            {dayWidth >= TimelineConst.zoomThreshold && (
                              <div
                                className={`${styles["timeline-ruler-day-label-text"]}`}
                              >
                                {dayIndex + 1}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </Column>
              </div>
            ))}
          </Column>
        </div>
      ))}
    </Column>
  );
};
