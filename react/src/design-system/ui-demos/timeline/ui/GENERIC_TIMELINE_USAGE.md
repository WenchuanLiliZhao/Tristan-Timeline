# 通用Timeline组件使用指南

## 概述

Timeline组件现已重构为通用化的设计系统组件，支持任意数据类型的时间线展示。只需要四个基础字段：`id`、`name`、`startDate`、`endDate`，其余字段可由用户自定义。

## 基础用法

### 1. 最简单的使用方式

```tsx
import { Timeline, groupTimelineItemsByField } from '@/design-system';
import type { BaseTimelineItem } from '@/data-layer';

// 基础数据 - 只需要四个字段
const basicData: BaseTimelineItem[] = [
  {
    id: "1",
    name: "Project Alpha",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
  },
  {
    id: "2",
    name: "Project Beta", 
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-15"),
  }
];

// 按name分组（默认分组方式）
const groupedData = groupTimelineItemsByField(basicData, 'name');

function MyTimeline() {
  return (
    <Timeline
      inputData={groupedData}
    />
  );
}
```

### 2. 自定义数据类型

```tsx
import { Timeline, groupTimelineItemsByField } from '@/design-system';
import type { TimelineItem } from '@/data-layer';

// 定义自定义数据类型
interface ProjectData {
  status: 'Planning' | 'InProgress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  budget: number;
}

// 创建带自定义字段的数据
const projectData: TimelineItem<ProjectData>[] = [
  {
    id: "proj-1",
    name: "Marketing Campaign",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    // 自定义字段
    status: 'InProgress',
    priority: 'High',
    department: 'Marketing',
    budget: 50000
  },
  {
    id: "proj-2", 
    name: "Product Launch",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-04-15"),
    status: 'Planning',
    priority: 'High',
    department: 'Product',
    budget: 100000
  }
];

function CustomTimeline() {
  const [groupBy, setGroupBy] = useState<keyof TimelineItem<ProjectData>>('department');
  
  const groupedData = groupTimelineItemsByField(projectData, groupBy);
  
  return (
    <Timeline<ProjectData>
      inputData={groupedData}
      groupBy={groupBy}
    />
  );
}
```

## 高级用法

### 3. 动态分组切换功能

Timeline 现在支持通过内置的按钮组动态切换分组方式，无需外部状态管理：

```tsx
import { Timeline, createFieldConfig } from '@/design-system';
import type { TimelineItem, GroupByOption } from '@/design-system';

interface ProjectData {
  status: 'Planning' | 'InProgress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  team: string;
}

const projectData: TimelineItem<ProjectData>[] = [
  // 你的数据...
];

// 定义分组选项配置
const groupByOptions: GroupByOption<ProjectData>[] = [
  { label: "Category", field: "category", setAsDefault: true }, // 默认分组
  { label: "Team", field: "team" },
  { label: "Priority", field: "priority" },
];

function DynamicGroupTimeline() {
  return (
    <Timeline<ProjectData>
      inputData={projectData}
      groupByOptions={groupByOptions} // 🎯 Timeline 内部管理分组切换
      init={displayConfig}
    />
  );
}
```

Timeline 会自动在右下角显示分组切换按钮组，用户可以点击切换分组方式。

### 4. 传统方式（手动管理分组状态）

根据用户需求，可以这样使用：

```tsx
// 定义团队数据类型
interface TeamData {
  status: string;
  progress: number;
  category: string;
  team: {
    name: string;
    color: string;
  };
  priority: 'High' | 'Medium' | 'Low';
}

// 示例数据
const teamProjects: TimelineItem<TeamData>[] = [
  {
    id: "team-1",
    name: "Interactive Calculus Workshop",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    status: "High Risks",
    progress: 50,
    category: "Advance Solutions",
    team: {
      name: "Function",
      color: "#4CAF50"
    },
    priority: "High"
  }
];

function TeamTimeline() {
  const [groupBy, setGroupBy] = useState<keyof TimelineItem<TeamData>>('category');
  
  const groupedData = groupTimelineItemsByField(teamProjects, groupBy);
  
  return (
    <Timeline<TeamData>
      inputData={groupedData}
      groupBy={groupBy}
    />
  );
}
```

## API参考

### Timeline Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `init` | `TimelineItemDisplayConfig<T>` | 可选 | 项目显示配置，直接传递无需包装 |
| `inputData` | `SortedTimelineData<T>` | 必需 | 已分组的时间线数据 |
| `groupBy` | `keyof (BaseTimelineItem & T)` | 可选 | 分组字段（当 inputData 是原始数据数组时使用） |
| `groupByOptions` | `GroupByOption<T>[]` | 可选 | 分组选项配置，支持用户通过按钮组动态切换分组方式 |
| `zoomLevels` | `ZoomLevelType[]` | 可选 | 缩放级别配置 |
| `defaultDayWidth` | `number` | 可选 | 默认日宽度（未启用缩放时）|

### BaseTimelineItem

```tsx
interface BaseTimelineItem {
  id: string;        // 唯一标识符
  name: string;      // 显示名称
  startDate: Date;   // 开始日期
  endDate: Date;     // 结束日期
}
```

### GroupByOption

```tsx
interface GroupByOption<T = Record<string, unknown>> {
  label: string;                               // 显示标签
  field: keyof (BaseTimelineItem & T);        // 分组字段
  setAsDefault?: boolean;                      // 是否为默认选项
}
```

### ZoomLevelType

```tsx
interface ZoomLevelType {
  label: string;        // 显示标签
  dayWidth: number;     // 每日宽度（像素）
  setAsDefault?: boolean; // 是否为默认缩放级别
}
```

## 数据处理工具

### groupTimelineItemsByField

通用分组函数，支持任意数据类型：

```tsx
function groupTimelineItemsByField<T>(
  items: TimelineItem<T>[],
  groupBy: keyof (BaseTimelineItem & T)
): SortedTimelineData<T>
```

### 示例

```tsx
// 按部门分组
const byDepartment = groupTimelineItemsByField(data, 'department');

// 按优先级分组
const byPriority = groupTimelineItemsByField(data, 'priority');

// 按名称分组（默认）
const byName = groupTimelineItemsByField(data, 'name');
```

## 最佳实践

1. **类型定义**：为自定义数据定义明确的TypeScript接口
2. **分组字段**：确保分组字段在所有数据项中都存在
3. **日期格式**：始终使用Date对象，不要使用字符串
4. **默认值**：在`init.dataType`中提供合理的默认值
5. **性能考虑**：对于大量数据，考虑分页或虚拟滚动 