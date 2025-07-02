# Property Fields

Property Fields 是专门为 Issue Details 设计的一套标准化字段显示组件。它们提供了统一的样式和配置选项，让你可以轻松地自定义不同数据类型的显示方式。

## 目录结构

```
PropertyFields/
├── DataField/          # 统一的数据字段组件 (文本和日期)
│   ├── index.tsx
│   └── styles.module.scss
├── PropertyField/      # 属性显示组件 (进度条)
│   ├── index.tsx
│   └── styles.module.scss
├── TagField/          # 标签字段组件
│   ├── index.tsx
│   └── styles.module.scss
├── index.ts           # 统一导出
└── README.md
```

## 可用组件

### DataField
统一的数据字段组件，支持文本和日期类型的自动识别。

```tsx
// 文本数据
<DataField 
  label="Name" 
  value="Project Alpha"
  color="var(--color--semantic-active)"
  fontWeight="medium"
  fontSize="lg"
/>

// 日期数据 (自动检测)
<DataField 
  label="Start Date" 
  value={new Date('2024-01-15')}
  format="medium"
/>
```

### TextField
单独的文本字段组件。

```tsx
<TextField 
  label="Description" 
  value="This is a sample description"
  fontWeight="normal"
  fontSize="base"
/>
```

**属性:**
- `label: string` - 字段标签
- `value: React.ReactNode` - 显示值
- `color?: string` - 文本颜色（支持CSS颜色值和CSS变量）
- `fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'` - 字体粗细
- `fontSize?: 'sm' | 'base' | 'lg' | 'xl'` - 字体大小
- `className?: string` - 自定义CSS类名

### DateField
单独的日期字段组件。

```tsx
<DateField 
  label="Deadline" 
  value={new Date('2024-12-31')}
  format="long"
  locale="en-US"
/>
```

**属性:**
- `label: string` - 字段标签
- `value: Date` - 日期值
- `format?: 'short' | 'medium' | 'long' | 'full'` - 日期格式
- `locale?: string` - 地区设置
- `color?: string` - 文本颜色

### PropertyField
用于显示属性进度，支持自定义颜色和样式。

```tsx
<PropertyField 
  label="Completion" 
  value={75}
  color="var(--color--semantic-success)"
  height="lg"
  variant="rounded"
  showText={true}
/>
```

**属性:**
- `label: string` - 字段标签
- `value: number` - 进度值（0-100）
- `color?: string` - 进度条颜色
- `showText?: boolean` - 是否显示百分比文本
- `height?: 'sm' | 'md' | 'lg'` - 进度条高度
- `variant?: 'default' | 'rounded' | 'square'` - 进度条样式

### TagField
用于显示标签，支持图标和不同变体。

```tsx
<TagField 
  label="Status" 
  name="In Progress"
  color="var(--color--semantic-active)"
  icon="play_arrow"
  variant="contained"
/>
```

**属性:**
- `label: string` - 字段标签
- `name: string` - 标签文本
- `color: string` - 标签颜色
- `icon?: string` - 图标名称（Material Icons）
- `variant?: 'contained' | 'outlined'` - 标签变体

## 向后兼容性

为了确保现有代码的兼容性，我们保留了以下别名：

```tsx
// ProgressField 是 PropertyField 的别名
export const ProgressField = PropertyField;
export type ProgressFieldProps = PropertyFieldProps;
```

## 在 Issue Details 中使用

### 简化语法

你可以在一个地方定义所有字段的配置：

```tsx
import { IssueDetailsConfigBuilder } from '@/design-system/ui-demos/timeline';

const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
  .setPropertyOrder([
    { property: "name", displayType: "data" },  // 使用 DataField
    { 
      property: "status", 
      displayType: "tag", 
      valueMapping: statusMapping,
      label: "Project Status"
    },
    { 
      property: "progress", 
      displayType: "property",  // 使用 PropertyField
      displayOptions: { 
        color: "var(--color--semantic-success)",
        height: "lg"
      }
    },
    { 
      property: "team", 
      displayType: "data", 
      displayOptions: { 
        color: "var(--color--semantic-active)",
        fontWeight: "medium" 
      }
    },
    { 
      property: "startDate", 
      displayType: "data",  // DataField 自动检测日期类型
      displayOptions: { format: "long" }
    }
  ])
  .build();
```

### 可选的 Issue Details

如果你不想显示 Issue Details，只需要将 `issueDetailsConfig` 设置为 `undefined` 或不传递该属性：

```tsx
// 不显示 Issue Details
<TimelineView 
  inputData={data}
  // issueDetailsConfig={undefined} // 或者直接不传递
/>
```

这样点击时间线项目时不会打开右侧边栏。

## 自定义样式

所有组件都使用统一的 CSS 变量系统，每个子目录都有自己的样式文件，你可以通过修改相应的 `styles.module.scss` 来自定义样式，或者通过 `displayOptions` 来设置单个字段的样式。

### 支持的显示选项 (displayOptions)

```tsx
displayOptions: {
  // 数据字段 (DataField/TextField)
  color?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontSize?: 'sm' | 'base' | 'lg' | 'xl';
  
  // 日期字段 (DataField/DateField)
  format?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
  
  // 属性字段 (PropertyField)
  color?: string;
  showText?: boolean;
  height?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'rounded' | 'square';
  
  // 标签字段 (TagField)
  variant?: 'contained' | 'outlined';
}
```

## 扩展性

如果需要添加新的显示类型，只需要：

1. 在 `PropertyFields` 文件夹中创建新的子目录和组件
2. 在主 `index.ts` 中导出
3. 在 `PropertyMappingConfig` 中添加相应的 `displayType` 和 `displayOptions`
4. 在 `IssueDetails/index.tsx` 的 `renderField` 函数中添加渲染逻辑

这个设计使得添加新的字段类型变得非常简单和一致。 