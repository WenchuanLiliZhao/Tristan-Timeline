# 📋 Timeline URL 参数管理指南

Timeline 组件现在支持 URL 参数管理功能，允许用户通过浏览器 URL 来控制 Timeline 的状态，并实现状态的持久化和分享。

## 🎯 功能概述

URL 参数管理功能提供以下能力：

1. **defaultToday** - 当浏览器中不存在任何参数时，是否默认跳转到今天
2. **recordGroupby** - 浏览器 URL 是否记录当前 groupBy 的参数
3. **recordCurrentDate** - 浏览器 URL 是否记录中轴线所对准的日期

## 📖 基本使用

### 1. 启用 URL 参数管理

```tsx
import { TimelineView } from '../design-system/ui-demos/timeline';

<TimelineView
  inputData={data}
  groupByOptions={groupByOptions}
  urlParams={{
    defaultToday: true,
    recordGroupby: true,
    recordCurrentDate: true,
  }}
/>
```

### 2. 部分功能启用

```tsx
// 只启用分组的 URL 记录
<TimelineView
  inputData={data}
  urlParams={{
    recordGroupby: true,
  }}
/>
```

### 3. 禁用所有 URL 参数管理

```tsx
// 不传递 urlParams 或传递空对象
<TimelineView
  inputData={data}
  // urlParams 未设置，所有功能默认为 false
/>
```

## 🔧 配置选项详解

### defaultToday

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 当浏览器 URL 中没有任何 Timeline 相关参数时，是否自动跳转到今天的日期
- **行为**: 
  - `true`: 首次访问页面时会自动定位到今天
  - `false`: 保持 Timeline 的默认行为

```tsx
urlParams={{
  defaultToday: true, // 首次访问自动跳转到今天
}}
```

### recordGroupby

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在 URL 中记录当前的分组方式
- **URL 参数名**: `timeline_groupby`
- **示例**: `?timeline_groupby=team`

```tsx
urlParams={{
  recordGroupby: true, // URL 会记录如: ?timeline_groupby=category
}}
```

### recordCurrentDate

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在 URL 中记录中轴线所对准的日期
- **URL 参数名**: `timeline_date`
- **格式**: `YYYY-MM-DD`
- **示例**: `?timeline_date=2024-03-15`

```tsx
urlParams={{
  recordCurrentDate: true, // URL 会记录如: ?timeline_date=2024-03-15
}}
```

## 📝 实际应用场景

### 1. 完整的状态持久化

适用于需要用户能够分享特定视图的场景：

```tsx
<TimelineView
  inputData={projectData}
  groupByOptions={[
    { label: "团队", field: "team" },
    { label: "优先级", field: "priority" },
  ]}
  urlParams={{
    defaultToday: true,
    recordGroupby: true,
    recordCurrentDate: true,
  }}
/>
```

生成的 URL 示例：
```
https://example.com/timeline?timeline_groupby=team&timeline_date=2024-03-15
```

### 2. 仅记录用户偏好

适用于只需要记住用户设置偏好的场景：

```tsx
<TimelineView
  inputData={projectData}
  urlParams={{
    recordGroupby: true,
    // 不记录当前日期，保持动态性
  }}
/>
```

### 3. 演示模式

适用于演示或展示场景，始终显示最新内容：

```tsx
<TimelineView
  inputData={projectData}
  urlParams={{
    defaultToday: true,
    // 其他参数不记录，保持简洁
  }}
/>
```

## 🔍 URL 参数验证

系统会自动验证 URL 中的参数：

- **groupBy**: 必须在 `groupByOptions` 中存在对应的字段
- **currentDate**: 必须是有效的日期格式

无效的参数会被忽略，使用组件的默认值。

## 🛠️ 高级用法

### 程序化控制

如果需要在代码中控制 URL 参数，可以使用底层的工具函数：

```tsx
import { 
  updateTimelineUrlParams, 
  parseTimelineUrlParams 
} from '../design-system/ui-demos/timeline/utils/urlParams';

// 读取当前 URL 参数
const currentParams = parseTimelineUrlParams();

// 更新 URL 参数
updateTimelineUrlParams(
  { recordGroupby: true, recordCurrentDate: true },
  { groupBy: 'team', currentDate: new Date() }
);
```

### 自定义 Hook

也可以直接使用 URL 参数管理的 Hook：

```tsx
import { useTimelineUrlParams } from '../design-system/ui-demos/timeline/hooks/useTimelineUrlParams';

function MyTimelineComponent() {
  const urlParams = useTimelineUrlParams({
    recordGroupby: true,
    recordCurrentDate: true,
  });

  // 使用 urlParams.urlGroupBy, urlParams.setUrlGroupBy 等
}
```

## 📚 相关文件

- **类型定义**: `src/design-system/ui-demos/timeline/types.ts`
- **URL 工具函数**: `src/design-system/ui-demos/timeline/utils/urlParams.ts`
- **React Hook**: `src/design-system/ui-demos/timeline/hooks/useTimelineUrlParams.ts`
- **组件集成**: `src/design-system/ui-demos/timeline/ui/TimelineView.tsx`

## 🐛 注意事项

1. **服务端渲染**: URL 参数功能在服务端渲染环境中会被安全地跳过
2. **浏览器兼容性**: 使用了 `URLSearchParams` 和 `window.history.replaceState`，需要现代浏览器支持
3. **性能**: URL 更新使用了 `replaceState`，不会触发页面刷新，性能友好
4. **状态同步**: URL 参数与组件状态保持双向同步，但组件的 props 优先级更高 