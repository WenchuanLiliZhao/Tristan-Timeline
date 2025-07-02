# Timeline Component System

A comprehensive React timeline component system designed for displaying chronological data with advanced features like grouping, zooming, and responsive layouts.

## 🎯 Core Features

- **Fully Independent**: No external data layer dependencies, ready to copy to other projects
- **Advanced Timeline**: Powerful timeline display component with grouping, zooming, and responsive layout
- **Data Management**: Built-in data layer with TypeScript support
- **Modular Architecture**: Import only what you need
- **Responsive Design**: Adapts to different screen sizes and orientations

## 📁 Project Structure

```
timeline/
├── data/                          # Data layer and utilities
│   ├── types.ts                   # TypeScript type definitions
│   ├── utils.ts                   # Utility functions for data processing
│   ├── hooks.ts                   # React hooks for timeline functionality
│   └── index.ts                   # Data layer exports
├── ui/                            # UI components
│   ├── Timeline.tsx               # Main timeline component
│   ├── Timeline.module.scss       # Main timeline styles
│   ├── _constants.ts              # Component constants
│   ├── OnLayout/                  # Layout-related components
│   │   ├── TimelineItems.tsx      # Timeline item layout
│   │   ├── TimelineRuler.tsx      # Timeline ruler/scale
│   │   └── *.module.scss          # Layout styles
│   ├── OnTimeline/                # Timeline item components
│   │   ├── Item.tsx               # Individual timeline item
│   │   ├── Group.tsx              # Timeline group container
│   │   └── *.module.scss          # Item styles
│   ├── Sidebar/                   # Sidebar components
│   │   ├── TimelineSidebar.tsx    # Main sidebar
│   │   ├── GroupProgressBar.tsx   # Progress visualization
│   │   ├── sidebarFunctions.ts    # Sidebar utilities
│   │   └── *.module.scss          # Sidebar styles
│   ├── Shared/                    # Shared components
│   │   ├── Column.tsx             # Column layout component
│   │   └── *.module.scss          # Shared styles
│   ├── README.md                  # UI components documentation
│   └── GENERIC_TIMELINE_USAGE.md  # Usage guide
└── index.ts                       # Main exports
```

## 🚀 Quick Start

### Installation

Copy the timeline directory to your project:

```bash
# Copy the entire timeline folder to your design system
cp -r /path/to/timeline ./src/design-system/ui-demos/
```

### Basic Usage

```tsx
import { Timeline } from './design-system/ui-demos/timeline';
import type { SortedTimelineData } from './design-system/ui-demos/timeline';

// Define your timeline data
const timelineData: SortedTimelineData = {
  meta: { sortBy: 'name' },
  data: [
    {
      groupTitle: "Development Team",
      groupItems: [
        {
          id: "1",
          name: "Project Alpha",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-02-01")
        }
      ]
    }
  ]
};

function App() {
  return (
    <div>
      <Timeline inputData={timelineData} />
    </div>
  );
}
```

## 📊 Timeline Component API

### Props

```tsx
interface TimelineProps<T = {}> {
  inputData: SortedTimelineData<T>;
  onItemClick?: (item: TimelineItem<T>) => void;
  onGroupClick?: (group: TimelineGroup<T>) => void;
  // Additional configuration options...
}
```

### Data Structure

The timeline requires data in the following format:

```tsx
interface BaseTimelineItem {
  id: string;        // Unique identifier
  name: string;      // Display name
  startDate: Date;   // Start date
  endDate: Date;     // End date
}

interface TimelineGroup<T = {}> {
  groupTitle: string;
  groupItems: Array<TimelineItem<T>>;
}

interface SortedTimelineData<T = {}> {
  meta: { sortBy: string };
  data: Array<TimelineGroup<T>>;
}
```

### Custom Data Types

You can extend the base timeline item with custom fields:

```tsx
interface ProjectData {
  priority: 'High' | 'Medium' | 'Low';
  team: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  budget?: number;
}

// Use with Timeline
<Timeline<ProjectData> inputData={customData} />
```

## 🎨 Styling and Theming

The timeline uses CSS modules for styling. You can customize the appearance by:

1. **CSS Variables**: Override CSS custom properties
2. **SCSS Modules**: Modify the `.module.scss` files
3. **Component Props**: Use built-in styling props

```scss
/* Custom styling example */
:root {
  --timeline-primary-color: #007bff;
  --timeline-background: #ffffff;
  --timeline-border-color: #e0e0e0;
  --timeline-text-color: #333333;
}
```

## 📋 Component Architecture

### Core Components

- **`Timeline`** - Main container component that orchestrates all other components
- **`TimelineItems`** - Handles the layout and positioning of timeline items
- **`TimelineRuler`** - Displays the time scale and navigation controls
- **`TimelineSidebar`** - Shows group information and progress indicators

### Sub-components

- **`Item`** - Individual timeline item representation
- **`Group`** - Groups related timeline items together
- **`GroupProgressBar`** - Visual progress indicator for groups
- **`Column`** - Shared layout component for consistent spacing

## 🔧 Data Utilities

### Available Hooks

```tsx
import { useCenterBasedZoom, useTimelineData } from './timeline';

// Zoom functionality
const { zoomLevel, zoomIn, zoomOut, resetZoom } = useCenterBasedZoom();

// Data processing
const processedData = useTimelineData(rawData);
```

### Utility Functions

```tsx
import { 
  sortTimelineItemsByStartDate,
  findPlacement,
  TimelineItemInterval 
} from './timeline';

// Sort items by date
const sortedItems = sortTimelineItemsByStartDate(items);

// Calculate time intervals
const interval = new TimelineItemInterval(startDate, endDate);

// Find optimal placement
const placement = findPlacement(items, constraints);
```

## 📚 Documentation

- **`ui/README.md`** - Detailed UI component documentation
- **`ui/GENERIC_TIMELINE_USAGE.md`** - Comprehensive usage guide with examples

## 🛠 Development Requirements

- React 18+
- TypeScript 4.5+
- SCSS support
- CSS Modules support

## 🎯 Use Cases

Perfect for:
- Project timeline visualization
- Gantt chart-style displays
- Event chronology
- Resource scheduling
- Progress tracking
- Timeline-based data visualization

## 🤝 Contributing

This timeline system is designed to be self-contained and easily customizable. Feel free to modify and extend it according to your project needs.

## 📄 License

Use according to your project's license requirements.

## 🔧 核心功能特性

### 禁用浏览器滑动手势 🚫👆
Timeline 组件现在自动禁用浏览器的左右滑动导航手势，避免在横向滚动时意外触发：
- 右滑返回上一页
- 左滑前进到下一页
- 触摸板横向滑动导航
- 鼠标滚轮横向滚动导航

这个功能通过多重防护机制实现：
- **CSS 防护**：使用 `overscroll-behavior: none` 禁用浏览器原生滑动行为
- **JavaScript 防护**：`useDisableBrowserGestures` hook 拦截各种滑动事件
- **智能检测**：只在鼠标进入 Timeline 区域时激活，避免影响其他页面元素

```typescript
// Hook 自动集成在 Timeline 组件中，无需额外配置
import { Timeline } from '@/design-system/ui-demos/timeline';

// 使用时会自动禁用浏览器手势
<Timeline inputData={data} />
```

如果需要在其他组件中使用这个功能：

```typescript
import { useDisableBrowserGestures } from '@/design-system/ui-demos/timeline/data';

function MyComponent() {
  const containerRef = useDisableBrowserGestures();
  
  return (
    <div ref={containerRef}>
      {/* 当鼠标进入此区域时，浏览器滑动手势被禁用 */}
      <div style={{ overflowX: 'scroll' }}>
        横向滚动内容...
      </div>
    </div>
  );
}
```

## 🎨 新的颜色系统用法

从版本 X.X.X 开始，我们引入了新的颜色函数，提供更灵活和一致的颜色管理：

### 彩虹颜色 (Rainbow Colors)

使用 `getRainbowColor()` 函数获取完整的 CSS 变量名：

```typescript
import { getRainbowColor } from "tristan-ui/colors";

// ✅ 新方式：使用函数
export const status = {
  high: {
    name: "High",
    color: getRainbowColor('rose')  // 输出: --color-chart--rainbow-rose
  },
  medium: {
    name: "Medium", 
    color: getRainbowColor('amber') // 输出: --color-chart--rainbow-amber
  },
  low: {
    name: "Low",
    color: getRainbowColor('emerald') // 输出: --color-chart--rainbow-emerald
  }
}

// ❌ 旧方式：直接使用颜色名称
export const statusOld = {
  high: {
    name: "High",
    color: rainbowColorNames.rose    // 输出: rose
  }
}
```

### 语义颜色 (Semantic Colors)

使用 `getSemanticColor()` 函数获取语义颜色的 CSS 变量名：

```typescript
import { getSemanticColor } from "tristan-ui/colors";

// 基础语义颜色
const activeColor = getSemanticColor('active');        // --color--semantic-active
const successColor = getSemanticColor('success');     // --color--semantic-success
const warningColor = getSemanticColor('warning');     // --color--semantic-warning
const errorColor = getSemanticColor('error');         // --color--semantic-error

// 带变体的语义颜色
const activeDark = getSemanticColor('active', 'dark'); // --color--semantic-active-dark
const successHalf = getSemanticColor('success', 'half'); // --color--semantic-success-half
const warningPale = getSemanticColor('warning', 'pale'); // --color--semantic-warning-pale
```

### 实际使用示例

在 Timeline 数据配置中：

```typescript
import { getRainbowColor, getSemanticColor } from "tristan-ui/colors";

export const priority = {
  urgent: {
    name: "Urgent",
    color: getSemanticColor('error'),     // 紧急使用错误色
    icon: "priority_high"
  },
  high: {
    name: "High",
    color: getRainbowColor('rose'),       // 高优先级使用玫瑰色
    icon: "stat_2"
  },
  medium: {
    name: "Medium",
    color: getRainbowColor('amber'),      // 中等优先级使用琥珀色
    icon: "stat_1"
  },
  low: {
    name: "Low",
    color: getRainbowColor('emerald'),    // 低优先级使用翡翠色
    icon: "stat_minus_1"
  }
}
```

### 优势

1. **类型安全**：函数提供更好的 TypeScript 支持
2. **一致性**：输出标准的 CSS 变量名，确保样式一致
3. **可维护性**：集中管理颜色变量，便于修改和维护
4. **智能处理**：组件会自动处理 CSS 变量名和颜色名称的转换

### 迁移指南

替换现有代码：

```typescript
// 将这个：
color: rainbowColorNames.rose

// 改为：
color: getRainbowColor('rose')
```

系统会自动处理新旧格式的兼容性，确保平滑过渡。

# Timeline Components

## DayWidthSlider

### 功能
一个可以动态调节时间轴中每天宽度的滑块组件。

### Props
- `dayWidth: number` - 当前天的宽度（像素）
- `onDayWidthChange: (newWidth: number) => void` - 当宽度改变时的回调函数
- `minWidth?: number` - 最小宽度，默认 12px
- `maxWidth?: number` - 最大宽度，默认 60px

### 使用示例
```tsx
import { DayWidthSlider } from './DayWidthSlider';

const [dayWidth, setDayWidth] = useState(24);

<DayWidthSlider 
  dayWidth={dayWidth} 
  onDayWidthChange={setDayWidth}
  minWidth={12}
  maxWidth={60}
/>
```

### 集成到Timeline
DayWidthSlider 已经集成到 Timeline 组件中，位于时间轴上方。可以通过拖动滑块来实时调节每天的宽度，从而改变时间轴的视觉密度。

### 样式自定义
组件使用CSS变量进行样式设置，支持明暗主题切换：
- `--color-bg-sec` - 背景色
- `--color-border-main` - 边框色
- `--color-text-main` - 主文本色
- `--color-text-sec` - 次文本色
- `--color-accent` - 强调色（滑块颜色） 

# Timeline 中心缩放功能 ✅

## 概述

这个模块实现了从画面正中间开始的缩放体验。当用户调整缩放级别时，视图会以当前可见区域的中心点为基准进行缩放，保持中心位置不变，类似于GarageBand的缩放体验。

**功能状态：✅ 已完成实现**

## 核心文件

### `useCenterBasedZoom.ts`
自定义 React Hook，封装了中心缩放的核心逻辑。完整实现了缩放因子计算、视图中心点定位和滚动位置调整。

### `Timeline.tsx`
使用了 `useCenterBasedZoom` hook 的时间轴组件，通过传递 `dayWidth` 参数实现最小化集成。

### `centerZoomCalculator.ts` ✨ 新增工具
**独立的中心缩放计算器**，包含纯数学计算逻辑，可复用于其他组件和场景。

## 中心缩放计算器 🎯

### 功能特性

- **🎯 精确计算**：考虑侧边栏宽度的精确中心点计算
- **🔧 纯函数设计**：无副作用，易于测试和复用
- **🛡️ 安全检查**：包含输入验证和结果验证
- **📊 边界处理**：自动处理滚动边界约束
- **📝 详细文档**：完整的类型定义和使用示例

### 核心函数

#### `calculateCenterZoomPosition(input)`
计算中心缩放的新滚动位置

```typescript
import { calculateCenterZoomPosition } from './utils';

const result = calculateCenterZoomPosition({
  currentScrollLeft: 1000,
  containerWidth: 1200,
  sidebarWidth: 240,
  scaleFactor: 2.0, // 放大2倍
  maxScrollWidth: 5000
});

// 应用新的滚动位置
container.scrollLeft = result.newScrollLeft;
```

#### `calculateScaleFactor(newLevel, oldLevel)`
安全计算缩放因子

```typescript
const factor = calculateScaleFactor(24, 12); // 返回 2.0
const factor = calculateScaleFactor(12, 24); // 返回 0.5
```

#### `validateCenterZoomResult(result, input)`
验证计算结果的合理性

```typescript
const isValid = validateCenterZoomResult(result, input);
if (!isValid) {
  console.warn('计算结果异常');
}
```

### 适用场景

- ✅ **Timeline 时间轴缩放** - 已实现
- ✅ **图表缩放** - 提供完整示例
- ✅ **代码编辑器缩放** - 提供示例配置
- ✅ **任何带侧边栏的滚动容器缩放**

### 数学原理

```
1. 内容区域宽度 = 容器宽度 - 侧边栏宽度
2. 当前中心点 = 滚动位置 + 内容区域宽度 / 2
3. 缩放后中心点 = 当前中心点 × 缩放因子
4. 新滚动位置 = 缩放后中心点 - 内容区域宽度 / 2
5. 边界约束 = Math.max(0, Math.min(新位置, 最大滚动))
```

### 测试示例

计算器内置了多种场景的测试示例：

```typescript
import { CenterZoomExamples } from './utils';

// Timeline 场景
const timelineExample = CenterZoomExamples.timelineMonthToDay;

// 图表场景
const chartExample = CenterZoomExamples.chartZoomIn;

// 编辑器场景  
const editorExample = CenterZoomExamples.editorZoomOut;
```

## 使用方法

### 基本用法

```tsx
import { useCenterBasedZoom } from './useCenterBasedZoom';

const MyComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(24);
  const { containerRef } = useCenterBasedZoom(zoomLevel);

  return (
    <div>
      <input 
        type="range" 
        value={zoomLevel} 
        onChange={(e) => setZoomLevel(Number(e.target.value))}
      />
      <div ref={containerRef} className="scrollable-container">
        {/* 可缩放的内容 */}
      </div>
    </div>
  );
};
```

### 在 Timeline 中的应用

```tsx
export const Timeline: React.FC<TimelineProps> = ({ inputData }) => {
  const [dayWidth, setDayWidth] = useState(24);
  
  // 使用自定义hook实现中心缩放功能
  const { containerRef } = useCenterBasedZoom(dayWidth);

  return (
    <div className={styles["timeline-container"]}>
      <DayWidthSlider 
        dayWidth={dayWidth} 
        onDayWidthChange={setDayWidth}
      />
      <div 
        ref={containerRef}
        className={styles["timeline-ruler-container"]}
      >
        {/* 时间轴内容 */}
      </div>
    </div>
  );
};
```

### 直接使用计算器

```tsx
import { calculateCenterZoomPosition, calculateScaleFactor } from './utils';

const handleZoom = (newZoomLevel: number) => {
  const container = containerRef.current;
  if (!container) return;
  
  const scaleFactor = calculateScaleFactor(newZoomLevel, currentZoomLevel);
  
  const result = calculateCenterZoomPosition({
    currentScrollLeft: container.scrollLeft,
    containerWidth: container.clientWidth,
    sidebarWidth: 240,
    scaleFactor,
    maxScrollWidth: container.scrollWidth
  });
  
  container.scrollLeft = result.newScrollLeft;
};
```

## 工作原理

### 1. 缩放因子计算
```
缩放因子 = 新缩放级别 / 旧缩放级别
```

### 2. 中心点定位
```
视图中心点 = 当前滚动位置 + 内容区域宽度 / 2
```

### 3. 新位置计算
```
新中心点位置 = 原中心点位置 × 缩放因子
新滚动位置 = 新中心点位置 - 内容区域宽度 / 2
```

### 4. 边界处理
确保新的滚动位置在有效范围内：
```
最终滚动位置 = Math.max(0, Math.min(新滚动位置, 最大滚动距离))
```

## 优势

1. **直观的用户体验**：缩放时保持用户当前视图的中心点位置不变，提供类似GarageBand的缩放体验
2. **代码复用性**：封装为独立的计算器，可在其他组件中使用
3. **性能优化**：使用 `useRef` 避免不必要的重新渲染
4. **边界安全**：自动处理滚动边界，防止异常情况
5. **✨ 模块化设计**：计算逻辑与DOM操作分离，便于测试和维护
6. **✨ 类型安全**：完整的TypeScript类型定义
7. **✨ 开发友好**：内置验证和调试信息

## 参数说明

### `useCenterBasedZoom(zoomLevel: number)`

**参数：**
- `zoomLevel`: 当前的缩放级别（数字类型）

**返回值：**
- `containerRef`: 需要绑定到可滚动容器的 React ref

### `calculateCenterZoomPosition(input: CenterZoomCalculationInput)`

**输入参数：**
- `currentScrollLeft`: 当前滚动位置
- `containerWidth`: 容器总宽度
- `sidebarWidth`: 侧边栏宽度
- `scaleFactor`: 缩放因子
- `maxScrollWidth`: 最大滚动宽度

**返回结果：**
- `newScrollLeft`: 新的滚动位置
- `contentAreaWidth`: 内容区域宽度
- `originalCenterPoint`: 原始中心点
- `newCenterPoint`: 新中心点
- `isAtLeftBoundary`: 是否触及左边界
- `isAtRightBoundary`: 是否触及右边界

## 注意事项

1. **容器要求**：使用此 hook 的容器必须是可水平滚动的
2. **CSS 设置**：确保容器有 `overflow-x: auto` 或 `overflow-x: scroll`
3. **内容缩放**：内容的实际缩放需要通过 CSS 或内联样式实现，工具只处理滚动位置
4. **✨ 侧边栏宽度**：计算器需要准确的侧边栏宽度以确保精确计算

## 扩展性

这个工具集可以轻松扩展以支持：
- 垂直缩放
- 双向缩放
- 自定义缩放基准点
- 缩放动画效果
- 多种容器布局

## 文件结构

```
timeline/
├── hooks/
│   └── useCenterBasedZoom.ts     # React Hook (DOM操作)
├── utils/
│   ├── centerZoomCalculator.ts   # 计算器 (纯数学逻辑) ✨
│   └── index.ts                  # 导出所有工具
└── ui/
    └── Timeline.tsx              # 使用示例
```

## 示例场景

- 时间轴视图缩放 ✅
- 图表缩放 ✅
- 代码编辑器缩放 ✅
- 任何需要保持中心对齐的缩放场景 ✅ 