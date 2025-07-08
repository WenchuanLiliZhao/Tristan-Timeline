import React, { useRef } from "react";
import {
  TimelineView,
  type TimelineViewRef,
} from "../../../design-system/ui-demos/timeline";
import {
  ExampleData,
} from "../example-data";
import { Button } from "tristan-ui";
import { NavTitle, TopNav, TristanLayout, TristanLogo } from "tristan-ui";
import {
  zoomLevels,
  groupByOptions,
  itemDisplayConfigSimple,
  sidebarProperties,
  issueDetailsConfig,
} from "../example-data/setting";

export function Element(): React.ReactElement {
  // 创建 TimelineView 的引用
  const timelineRef = useRef<TimelineViewRef>(null);

  // 滚动到指定日期的处理函数
  const handleScrollToDate = (dateString: string) => {
    const targetDate = new Date(dateString);
    timelineRef.current?.scrollToDate(targetDate);
  };

  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <TristanLogo width={32} height={32} />,
            <NavTitle title="Roadmap of lululemon Initiatives" />,
          ]}
          right={[
            <Button onClick={() => handleScrollToDate("2025-08-30")}>
              Scroll to 2025-08-30
            </Button>,
            <Button onClick={() => window.location.href = "/issues-table"}>
              View Issues Table
            </Button>,
          ]}
        />
      }
      main={
        <TimelineView
          ref={timelineRef}
          // fetchByTimeInterval={[
          //   new Date("2025-01-01"),
          //   new Date("2025-12-30")
          // ]}
          init={itemDisplayConfigSimple}
          inputData={ExampleData}
          groupByOptions={groupByOptions}
          groupTitleProperties={sidebarProperties}
          defaultDayWidth={24} // 直接使用dayWidth状态
          zoomLevels={zoomLevels}
          issueDetailsConfig={issueDetailsConfig}
          urlParams={{
            defaultToday: true,
            recordGroupby: true,
            recordCurrentDate: true,
          }}
        />
      }
    />
  );
}
