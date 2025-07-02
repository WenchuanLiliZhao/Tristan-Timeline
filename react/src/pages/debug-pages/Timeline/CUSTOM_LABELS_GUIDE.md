# IssueDetails 自定义标签指南

## 概述

在 Tristan UI 的 Timeline 组件中，你可以为 IssueDetails 侧边栏中的每个属性定义自定义标签（label），这样可以让用户界面更加友好和本地化。

## 基本用法

### 1. 为单个属性定义自定义标签

```tsx
const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
  .setPropertyOrder([
    { 
      property: "name", 
      displayType: "text",
      label: "项目名称" // 自定义中文标签
    },
    { 
      property: "status", 
      displayType: "tag", 
      valueMapping: status,
      label: "项目状态" // 自定义中文标签
    },
  ])
  .build();
```

### 2. 完整的配置示例

```tsx
const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
  .setTitle("项目详情") // 自定义侧边栏标题
  .setPropertyOrder([
    { 
      property: "projectKey", 
      displayType: "text",
      label: "项目编号"
    },
    { 
      property: "name", 
      displayType: "text",
      label: "项目名称"
    },
    { 
      property: "riskLevel", 
      displayType: "tag", 
      valueMapping: riskLevel,
      label: "风险等级"
    },
    { 
      property: "status", 
      displayType: "tag", 
      valueMapping: status,
      label: "项目状态"
    },
    { 
      property: "priority", 
      displayType: "tag", 
      valueMapping: priority,
      label: "优先级"
    },
    { 
      property: "progress", 
      displayType: "progress",
      label: "完成进度"
    },
    { 
      property: "team", 
      displayType: "text", 
      label: "负责团队",
      displayOptions: { 
        color: "var(--color--semantic-active)",
        fontWeight: "medium" 
      }
    },
    { 
      property: "category", 
      displayType: "text",
      label: "项目类别"
    },
    { 
      property: "startDate", 
      displayType: "date",
      label: "开始日期",
      displayOptions: { dateFormat: "medium" }
    },
    { 
      property: "endDate", 
      displayType: "date",
      label: "结束日期",
      displayOptions: { dateFormat: "medium" }
    },
  ])
  .build();
```

## 标签优先级

当为属性定义标签时，系统会按以下优先级显示：

1. **自定义标签** (`label` 属性) - 最高优先级
2. **默认标签** (系统预定义的英文标签) - 中等优先级
3. **属性名** (作为后备) - 最低优先级

### 默认标签映射

系统为常见属性提供了默认的英文标签：

```tsx
const DEFAULT_PROPERTY_LABELS: Record<string, string> = {
  id: "ID",
  name: "Name",
  startDate: "Start Date",
  endDate: "End Date",
  status: "Status",
  priority: "Priority",
  team: "Team",
  progress: "Progress",
  category: "Category",
  riskLevel: "Risk Level",
  projectKey: "Project Key",
};
```

## 支持的显示类型

每种显示类型都支持自定义标签：

### 文本字段 (text)
```tsx
{ 
  property: "description", 
  displayType: "text",
  label: "项目描述"
}
```

### 标签字段 (tag)
```tsx
{ 
  property: "status", 
  displayType: "tag", 
  valueMapping: status,
  label: "项目状态"
}
```

### 进度字段 (progress)
```tsx
{ 
  property: "completion", 
  displayType: "progress",
  label: "完成度"
}
```

### 日期字段 (date)
```tsx
{ 
  property: "deadline", 
  displayType: "date",
  label: "截止日期",
  displayOptions: { dateFormat: "long" }
}
```

## 国际化支持

你可以根据不同的语言环境定义不同的标签：

```tsx
// 中文环境
const chineseLabels = {
  name: "项目名称",
  status: "项目状态",
  priority: "优先级",
  progress: "完成进度"
};

// 英文环境
const englishLabels = {
  name: "Project Name",
  status: "Project Status", 
  priority: "Priority",
  progress: "Progress"
};

// 根据当前语言环境选择标签
const currentLabels = isChinese ? chineseLabels : englishLabels;

const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
  .setPropertyOrder([
    { 
      property: "name", 
      displayType: "text",
      label: currentLabels.name
    },
    { 
      property: "status", 
      displayType: "tag", 
      valueMapping: status,
      label: currentLabels.status
    },
    // ... 其他属性
  ])
  .build();
```

## 最佳实践

### 1. 保持标签简洁明了
```tsx
// ✅ 好的做法
label: "项目名称"

// ❌ 避免过长
label: "这是项目的完整名称，用于在系统中标识项目"
```

### 2. 保持一致性
```tsx
// ✅ 保持命名风格一致
label: "项目编号"
label: "项目名称" 
label: "项目状态"

// ❌ 避免混用不同风格
label: "Project ID"
label: "项目名称"
label: "Status"
```

### 3. 考虑用户习惯
```tsx
// ✅ 使用用户熟悉的术语
label: "负责人"  // 而不是 "Owner"
label: "截止日期" // 而不是 "Due Date"

// ❌ 避免技术术语
label: "Entity Identifier"
label: "Temporal Boundary"
```

## 注意事项

1. **标签是可选的**：如果不提供 `label`，系统会使用默认标签或属性名
2. **标签不影响数据**：自定义标签只影响显示，不会改变底层数据结构
3. **支持所有字符**：标签支持中文、英文、特殊字符等
4. **长度限制**：建议标签长度不超过 20 个字符，以确保良好的显示效果

## 示例：完整的时间线配置

```tsx
import { TimelineView, IssueDetailsConfigBuilder } from "../../../design-system/ui-demos/timeline";

export function MyTimeline() {
  const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
    .setTitle("项目详情")
    .setPropertyOrder([
      { property: "projectKey", displayType: "text", label: "项目编号" },
      { property: "name", displayType: "text", label: "项目名称" },
      { property: "status", displayType: "tag", valueMapping: status, label: "项目状态" },
      { property: "priority", displayType: "tag", valueMapping: priority, label: "优先级" },
      { property: "progress", displayType: "progress", label: "完成进度" },
      { property: "team", displayType: "text", label: "负责团队" },
      { property: "startDate", displayType: "date", label: "开始日期" },
      { property: "endDate", displayType: "date", label: "结束日期" },
    ])
    .build();

  return (
    <TimelineView<ProjectDataType>
      inputData={projectData}
      issueDetailsConfig={issueDetailsConfig}
      // ... 其他配置
    />
  );
}
```

通过这种方式，你可以为每个属性定义用户友好的自定义标签，让界面更加直观和易用。 