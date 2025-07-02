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

## 工作原理

### 1. 缩放因子计算
```
缩放因子 = 新缩放级别 / 旧缩放级别
```

### 2. 中心点定位
```
视图中心点 = 当前滚动位置 + 容器宽度 / 2
```

### 3. 新位置计算
```
新中心点位置 = 原中心点位置 × 缩放因子
新滚动位置 = 新中心点位置 - 容器宽度 / 2
```

### 4. 边界处理
确保新的滚动位置在有效范围内：
```
最终滚动位置 = Math.max(0, Math.min(新滚动位置, 最大滚动距离))
```

## 优势

1. **直观的用户体验**：缩放时保持用户当前视图的中心点位置不变，提供类似GarageBand的缩放体验
2. **代码复用性**：封装为独立的 hook，可在其他组件中使用
3. **性能优化**：使用 `useRef` 避免不必要的重新渲染
4. **边界安全**：自动处理滚动边界，防止异常情况

## 参数说明

### `useCenterBasedZoom(zoomLevel: number)`

**参数：**
- `zoomLevel`: 当前的缩放级别（数字类型）

**返回值：**
- `containerRef`: 需要绑定到可滚动容器的 React ref

## 注意事项

1. **容器要求**：使用此 hook 的容器必须是可水平滚动的
2. **CSS 设置**：确保容器有 `overflow-x: auto` 或 `overflow-x: scroll`
3. **内容缩放**：内容的实际缩放需要通过 CSS 或内联样式实现，hook 只处理滚动位置

## 扩展性

这个 hook 可以轻松扩展以支持：
- 垂直缩放
- 双向缩放
- 自定义缩放基准点
- 缩放动画效果

## 示例场景

- 时间轴视图缩放
- 图表缩放
- 代码编辑器缩放
- 任何需要保持中心对齐的缩放场景 