/**
 * 📍 Timeline 日期位置计算工具
 * 
 * 提供日期和时间轴位置之间的双向转换功能，用于：
 * - 根据日期计算在时间轴上的像素位置
 * - 根据时间轴位置反向计算对应的日期
 * - 支持滚动定位和 URL 参数同步
 */

/**
 * 计算指定日期在时间轴上的位置信息
 */
export function calculateDatePosition(
  targetDate: Date,
  yearList: number[],
  startMonth: number,
  dayWidth: number
): { left: number; right: number; center: number } | null {
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth(); // 0-11
  const targetDay = targetDate.getDate(); // 1-31

  // 检查目标日期是否在时间轴范围内
  const firstYear = yearList[0];
  const lastYear = yearList[yearList.length - 1];
  
  if (targetYear < firstYear || targetYear > lastYear) {
    return null; // 目标日期不在时间轴范围内
  }

  // 计算从时间轴开始到目标日期的总天数
  let totalDaysToTarget = 0;

  // 遍历到目标日期所在年份之前的所有年份
  for (let year = firstYear; year < targetYear; year++) {
    const yearIndex = year - firstYear;
    const monthStart = yearIndex === 0 ? startMonth : 0;
    const monthEnd = 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      totalDaysToTarget += daysInMonth;
    }
  }

  // 添加目标日期所在年份从开始到目标日期所在月份前的天数
  const targetYearIndex = targetYear - firstYear;
  const targetYearMonthStart = targetYearIndex === 0 ? startMonth : 0;
  
  for (let month = targetYearMonthStart; month < targetMonth; month++) {
    const daysInMonth = new Date(targetYear, month + 1, 0).getDate();
    totalDaysToTarget += daysInMonth;
  }

  // 添加目标日期所在月份到目标日期的天数
  totalDaysToTarget += targetDay - 1; // 减1因为日期是从1开始的

  // 计算目标日期在时间轴上的像素位置
  const targetPositionInTimeline = totalDaysToTarget * dayWidth;
  
  return {
    left: targetPositionInTimeline,
    right: targetPositionInTimeline + dayWidth,
    center: targetPositionInTimeline + dayWidth / 2,
  };
}

/**
 * 根据滚动位置反向计算当前中轴线对应的日期
 */
export function calculateDateFromScrollPosition(
  scrollLeft: number,
  containerWidth: number,
  sidebarWidth: number,
  yearList: number[],
  startMonth: number,
  dayWidth: number
): Date | null {
  if (yearList.length === 0 || dayWidth <= 0) {
    return null;
  }

  // 计算内容区域的中心点在时间轴上的位置
  const contentAreaWidth = containerWidth - sidebarWidth;
  const centerPositionInTimeline = scrollLeft + contentAreaWidth / 2;

  // 将像素位置转换为天数
  const totalDaysFromStart = Math.floor(centerPositionInTimeline / dayWidth);

  // 从天数反推日期
  let remainingDays = totalDaysFromStart;

  for (let yearIndex = 0; yearIndex < yearList.length; yearIndex++) {
    const year = yearList[yearIndex];
    const monthStart = yearIndex === 0 ? startMonth : 0;
    const monthEnd = 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      if (remainingDays < daysInMonth) {
        // 找到了对应的月份，计算具体日期
        const day = remainingDays + 1; // 加1因为日期从1开始
        return new Date(year, month, Math.min(day, daysInMonth));
      }
      
      remainingDays -= daysInMonth;
    }
  }

  // 如果计算超出范围，返回最后一个有效日期
  const lastYear = yearList[yearList.length - 1];
  return new Date(lastYear, 11, 31); // 12月31日
}

/**
 * 滚动到指定日期位置
 */
export function scrollToDate(
  scrollContainer: HTMLDivElement,
  targetDate: Date,
  yearList: number[],
  startMonth: number,
  dayWidth: number,
  sidebarWidth: number,
  smooth: boolean = true
): boolean {
  const datePosition = calculateDatePosition(targetDate, yearList, startMonth, dayWidth);
  if (!datePosition) {
    return false; // 日期不在范围内
  }

  const containerWidth = scrollContainer.clientWidth;
  const maxScrollWidth = scrollContainer.scrollWidth;
  const contentAreaWidth = containerWidth - sidebarWidth;

  // 计算滚动位置，使目标日期的中心点位于内容区域中轴线
  const targetScrollLeft = datePosition.center - contentAreaWidth / 2;
  const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollWidth - containerWidth));

  scrollContainer.scrollTo({
    left: finalScrollLeft,
    behavior: smooth ? 'smooth' : 'auto'
  });

  return true;
}

/**
 * 检查日期是否在时间轴范围内
 */
export function isDateInTimelineRange(
  date: Date,
  yearList: number[]
): boolean {
  if (yearList.length === 0) {
    return false;
  }

  const year = date.getFullYear();
  const firstYear = yearList[0];
  const lastYear = yearList[yearList.length - 1];

  return year >= firstYear && year <= lastYear;
} 