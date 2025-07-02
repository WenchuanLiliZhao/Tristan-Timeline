# 🎨 Tristan Design System

[![npm version](https://badge.fury.io/js/tristan-ui.svg)](https://badge.fury.io/js/tristan-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Tristan UI Timeline

一个基于 Tristan UI 构建的现代 React 时间线组件库。

## 特性

🎯 **易于使用** - 简单的 API 设计，快速上手  
⚡ **高性能** - 支持大量数据的虚拟化渲染  
🎨 **高度可定制** - 灵活的配置选项和样式定制  
📱 **响应式** - 完美适配桌面和移动设备  
🔧 **TypeScript** - 完整的类型支持  

## 安装

```bash
# 首先安装 tristan-ui（必需依赖）
npm install tristan-ui

# 然后安装 tristan-timeline
npm install tristan-timeline
```

## 快速开始

```typescript
import React from 'react';
import { Timeline, TimelineConfigBuilder } from 'tristan-timeline';
import 'tristan-ui/style.css';

// 示例数据
const timelineData = [
  {
    id: '1',
    name: '项目启动',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-15'),
    status: 'completed',
    priority: 'high'
  },
  {
    id: '2', 
    name: '开发阶段',
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-03-01'),
    status: 'in-progress',
    priority: 'medium'
  }
];

// 配置时间线显示
const config = new TimelineConfigBuilder()
  .addTag('status', {
    'completed': { name: '已完成', color: 'success' },
    'in-progress': { name: '进行中', color: 'warning' }
  })
  .addTag('priority', {
    'high': { name: '高优先级', color: 'error' },
    'medium': { name: '中优先级', color: 'info' }
  })
  .build();

function App() {
  return (
    <Timeline
      inputData={timelineData}
      init={config}
      groupBy="status"
    />
  );
}
```

## 主要组件

### Timeline

主要的时间线组件，支持以下功能：

- 数据分组和排序
- 缩放和滚动
- 自定义字段显示
- URL 参数同步
- 点击事件处理

### TimelineConfigBuilder

配置构建器，用于定义时间线项目的显示方式：

```typescript
const config = new TimelineConfigBuilder()
  .addProgress('completion', {
    showText: true,
    progressColors: [
      { upto: 30, color: 'error' },
      { upto: 70, color: 'warning' }, 
      { upto: 100, color: 'success' }
    ]
  })
  .addIcon('type', {
    'task': { icon: 'task', color: 'primary' },
    'milestone': { icon: 'flag', color: 'success' }
  })
  .build();
```

## API 文档

### Timeline Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `inputData` | `TimelineItemType[]` \| `SortedTimelineDataType` | 时间线数据 |
| `init` | `TimelineItemDisplayConfig` | 显示配置 |
| `groupBy` | `keyof BaseTimelineItemType` | 分组字段 |
| `groupByOptions` | `GroupByOption[]` | 分组选项 |
| `zoomLevels` | `ZoomLevelType[]` | 缩放级别 |
| `onItemClick` | `(item) => void` | 点击事件处理 |

### 基础数据类型

```typescript
interface BaseTimelineItemType {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

// 您可以扩展这个基础类型
interface MyTimelineItem extends BaseTimelineItemType {
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}
```

## Hooks

该库还导出了一些有用的 Hooks：

- `useTimelineUrlParams` - URL 参数同步
- `useZoomLevelMonitor` - 缩放级别监听
- `useVirtualizedTimeline` - 虚拟化支持
- `useCenterBasedZoom` - 中心缩放

## 样式定制

由于该库基于 Tristan UI 构建，您可以通过 Tristan UI 的主题系统来定制样式。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 相关链接

- [Tristan UI](https://github.com/wenchuanlilizhao/tristan-ui) - 基础 UI 组件库
- [GitHub 仓库](https://github.com/wenchuanlilizhao/tristan-timeline) 
- [问题反馈](https://github.com/wenchuanlilizhao/tristan-timeline/issues)

