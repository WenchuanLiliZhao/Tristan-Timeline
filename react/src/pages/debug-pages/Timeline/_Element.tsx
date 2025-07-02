import React from "react";
import {
  TimelineView,
  createFieldConfig,
  createSidebarProperty,
} from "../../../design-system/ui-demos/timeline";
import {
  ExampleData,
  priority,
  team,
  status,
  type ProjectDataType,
  riskLevel,
} from "./example-data";
import { getRainbowColor } from "../../../styles";
import {
  NavTitle,
  TopNav,
  TristanLayout,
  TristanLogo,
} from "../../../design-system/ui-components";
import { IssueDetailsConfigBuilder } from "../../../design-system/ui-demos/timeline/issueDetailsConfig";
import { Input } from "../../../design-system/ui-components/data-entry";

export function Element(): React.ReactElement {
  // 🎯 定义缩放级别配置
  const zoomLevels = [
    // { label: "Days", dayWidth: 32 },
    { label: "Months", dayWidth: 24 },
    { label: "Quarters", dayWidth: 8, setAsDefault: true },
    { label: "Years", dayWidth: 4.5 },
  ];

  // 🎯 定义分组选项配置
  const groupByOptions = [
    { label: "Category", field: "category" as const, setAsDefault: true },
    { label: "Team", field: "team" as const },
    { label: "Priority", field: "priority" as const },
  ];

  // 🎯 Method 1: Use createFieldConfig to simplify configuration
  const itemDisplayConfigSimple = {
    graphicFields: [
      // 1. Progress: Default color behavior.
      // - If progress < 100, color is 'active'.
      // - If progress = 100, color is 'success'.
      // createFieldConfig.progress<ProjectDataType>("progress"),

      // 2. Progress (Custom Colors): Three ways to define custom colors.
      // You will need to import `getRainbowColor` from "../../../styles/color".
      //
      // Method A: Static colors
      //   inprogressColor: getRainbowColor("amber"),
      //   doneColor: getRainbowColor("emerald"),
      //
      // Method B: Dynamic colors based on item properties (current example)
      //   inprogressColor: (item) => riskLevel[item.riskLevel].color,
      //
      // Method C: Complex color ranges with multiple stops
      //   progressColors: [
      //     { upto: 30, color: getRainbowColor("amber") },
      //     { upto: 70, color: getRainbowColor("blue") },
      //     { upto: 100, color: getRainbowColor("emerald") },
      //   ]
      //
      createFieldConfig.progress<ProjectDataType>("progress", {
        inprogressColor: (item) => riskLevel[item.riskLevel].color,
        doneColor: getRainbowColor("emerald"),
      }),

      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    tagFields: [createFieldConfig.tagFromMap<ProjectDataType>("team", team)],
  };

  // 🎯 配置sidebar属性分布可视化
  const sidebarProperties = [
    createSidebarProperty.fromMap<ProjectDataType>("team", team, {
      label: "Teams",
      showCount: false,
    }),
    createSidebarProperty.fromProgressField<ProjectDataType>("progress", {
      label: "Progress",
      maxValueOfEachItem: 100, // 设置每个 issue 的满分
      // 如果不指定 tooltip，则使用默认配置：
      // tooltip: [
      //   {
      //     interval: ["closed", 0, 0, "closed"],
      //     label: "not started",
      //     color: grayColors.gray5,
      //   },
      //   {
      //     interval: ["open", 0, 100, "open"],
      //     label: "in progress",
      //     color: getSemanticColor("active"),
      //   },
      //   {
      //     interval: ["closed", 100, 100, "closed"],
      //     label: "done",
      //     color: getSemanticColor("success"),
      //   },
      // ]
      
      // 🎨 自定义 tooltip 配置示例（取消注释以使用）：
      // tooltip: [
      //   {
      //     interval: ["closed", 0, 0, "closed"],
      //     label: "not started",
      //     color: grayColors.gray5,
      //   },
      //   {
      //     interval: ["open", 0, 50, "closed"],
      //     label: "in progress",
      //     color: getRainbowColor("emerald"),
      //   },
      //   {
      //     interval: ["open", 50, 100, "open"],
      //     label: "reviewing",
      //     color: getRainbowColor("amber"),
      //   },
      //   {
      //     interval: ["closed", 100, 100, "closed"],
      //     label: "done",
      //     color: getRainbowColor("emerald"),
      //   },
      // ]
    }),
  ];


  {/* 🎯 IssueDetails 详情配置示例:
      你可以为每个属性定义自定义标签 (label)，让界面更加友好和本地化。
      标签优先级：自定义标签 > 默认标签 > 属性名
      详细说明请参考：CUSTOM_LABELS_GUIDE.md
  */}
  const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
    .setTitle("Project Details") // 自定义sidebar标题
    .setPropertyOrder([
      { 
        property: "projectKey", 
        displayType: "text",
        label: "项目编号" // 🏷️ 自定义标签：在UI中显示为"项目编号"而不是"Project Key"
      },
      { 
        property: "name", 
        displayType: "text",
        label: "项目名称" // 🏷️ 自定义标签：在UI中显示为"项目名称"而不是"Name"
      },
      { 
        property: "riskLevel", 
        displayType: "tag", 
        valueMapping: riskLevel,
        label: "风险等级" // 🏷️ 自定义标签：在UI中显示为"风险等级"而不是"Risk Level"
      },
      
      { 
        property: "status", 
        displayType: "tag", 
        valueMapping: status,
        label: "项目状态" // 🏷️ 自定义标签：在UI中显示为"项目状态"而不是"Status"
      },
      { 
        property: "priority", 
        displayType: "tag", 
        valueMapping: priority,
        label: "优先级" // 🏷️ 自定义标签：在UI中显示为"优先级"而不是"Priority"
      },
      { 
        property: "progress", 
        displayType: "progress",
        label: "完成进度" // 🏷️ 自定义标签：在UI中显示为"完成进度"而不是"Progress"
      },
      { 
        property: "team", 
        displayType: "text", 
        label: "负责团队", // 🏷️ 自定义标签：在UI中显示为"负责团队"而不是"Team"
        displayOptions: { 
          color: "var(--color--semantic-active)",
          fontWeight: "medium" 
        }
      },
      { 
        property: "category", 
        displayType: "text",
        label: "项目类别" // 🏷️ 自定义标签：在UI中显示为"项目类别"而不是"Category"
      },
      { 
        property: "startDate", 
        displayType: "date",
        label: "开始日期", // 🏷️ 自定义标签：在UI中显示为"开始日期"而不是"Start Date"
        displayOptions: { dateFormat: "medium" }
      },
      { 
        property: "endDate", 
        displayType: "date",
        label: "结束日期", // 🏷️ 自定义标签：在UI中显示为"结束日期"而不是"End Date"
        displayOptions: { dateFormat: "medium" }
      },
    ])
    .build();

  {/* 🎯 可选配置示例：注释掉上面的配置，取消注释下面这行，体验无 issue details 的效果 */}
  // const issueDetailsConfig = undefined;

  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <TristanLogo width={32} height={32} />,
            <NavTitle title="Roadmap of lululemon Initiatives" />,
          ]}
          right={[
            <Input />
          ]}
        />
      }
      main={
        <TimelineView<ProjectDataType>
          // fetchByTimeInterval={[new Date("2025-01-01"), new Date("2025-12-30")]}
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
