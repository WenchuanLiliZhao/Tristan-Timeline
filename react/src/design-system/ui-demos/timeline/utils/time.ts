/**
 * 时间和日期处理相关的工具函数
 */

import { type TimelineItemType } from "../types";
import { TimelineConst } from "../ui/_constants";

/**
 * Month names mapping for timeline display
 */
export const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Calculate the number of days in a specific month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculate duration in days between two dates (inclusive of both start and end dates)
 */
export const calculateDurationInDays = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Timeline interval calculation
 */
interface TimelineItemIntervalProps {
  inputData: TimelineItemType[];
}

export interface TimelineInterval {
  years: number[];
  startMonth: number;
}

export function TimelineItemInterval({ inputData }: TimelineItemIntervalProps): TimelineInterval {
  // Filter out items without valid dates
  const validItems = inputData.filter(item => item.startDate && item.endDate);
  
  if (validItems.length === 0) {
    const currentYear = new Date().getFullYear();
    return {
      years: [currentYear],
      startMonth: 0
    };
  }

  const earliestStartDate = validItems.reduce((earliest, item) => {
    return item.startDate! < earliest ? item.startDate! : earliest;
  }, validItems[0].startDate!);

  const latestEndDate = validItems.reduce((latest, item) => {
    return item.endDate! > latest ? item.endDate! : latest;
  }, validItems[0].endDate!);

  const startYear = earliestStartDate.getFullYear();
  const startMonth = earliestStartDate.getMonth();
  const endYear = latestEndDate.getFullYear() + TimelineConst.additionalYearsAfterLatest;

  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return {
    years,
    startMonth
  };
} 