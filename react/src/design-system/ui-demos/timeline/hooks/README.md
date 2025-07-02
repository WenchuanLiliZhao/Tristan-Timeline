# Timeline Hooks Documentation

## useZoomLevelMonitor ✨

**方案A实施** - Zoom Level State Monitor Hook

这个hook实现了通过监听dayWidth状态变化来判断当前活跃的缩放级别，完美支持button的filled+active状态判断。

### 🎯 核心功能

- **智能监听**：自动监听dayWidth变化，识别当前活跃的zoom level
- **状态无关**：不依赖状态来源（用户点击、URL、程序设置等）
- **URL兼容**：完全支持URL状态管理场景
- **回调支持**：提供灵活的回调机制，支持自定义响应逻辑

### 📋 使用示例

#### 基础用法
```tsx
import { useZoomLevelMonitor } from '@/timeline';

const { activeLevel, isLevelActive, getActiveLevelLabel } = useZoomLevelMonitor(
  dayWidth, 
  zoomLevels
);

// 判断button是否应该显示为filled状态
const isButtonFilled = isLevelActive(targetLevel);
```

#### 带回调的高级用法
```tsx
const { activeLevel } = useZoomLevelMonitor(
  dayWidth,
  zoomLevels,
  {
    onZoomLevelChanged: (newLevel, previousLevel) => {
      console.log(`Zoom changed: ${previousLevel?.label} → ${newLevel.label}`);
    },
    onSpecificLevelActivated: {
      onDaysActivated: (level) => {
        console.log('Days view activated!');
      },
      onMonthsActivated: (level) => {
        console.log('Months view activated!');
      }
    }
  }
);
```

### 🔗 URL状态管理兼容性

完全支持URL状态管理场景：

```tsx
// 从URL初始化dayWidth
const [dayWidth, setDayWidth] = useState(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlDayWidth = urlParams.get('dayWidth');
  return urlDayWidth ? parseInt(urlDayWidth) : 8;
});

// 监听器依然正常工作
const { activeLevel } = useZoomLevelMonitor(dayWidth, zoomLevels);

// button状态判断不受影响
<Button variant={isLevelActive(level) ? "filled" : "ghost"}>
  {level.label}
</Button>
```

### 🎛️ Button状态判断

通过监听器可以完美判断zoom button的状态：

```tsx
const createZoomButtons = () => {
  return zoomLevels.map((level) => {
    const isActive = isLevelActive(level); // ✅ 来自监听器
    
    return (
      <Button
        key={level.label}
        variant={isActive ? "filled" : "ghost"} // ✅ filled表示active
        onClick={() => setDayWidth(level.dayWidth)}
      >
        {level.label}
      </Button>
    );
  });
};
```

## useTodayButtonZoomResponse 🎯

专门用于Today按钮的便利Hook，自动根据当前zoom level调整Today按钮的行为策略。

### 使用示例

```tsx
const { activeLevel, getTodayButtonStrategy } = useTodayButtonZoomResponse(
  dayWidth,
  zoomLevels
);

const handleTodayClick = () => {
  const strategy = getTodayButtonStrategy();
  
  switch (strategy.precision) {
    case 'day':
      scrollToExactDate(today);
      break;
    case 'month':
      scrollToMonth(today);
      break;
    case 'quarter':
      scrollToQuarter(today);
      break;
  }
};
```

### 策略类型

- **Days view**: 精确滚动到今天的具体日期
- **Months view**: 滚动到今天所在的月份  
- **Quarters view**: 滚动到今天所在的季度

## 📊 实际应用

### 在Timeline组件中的集成

Timeline组件已经集成了这个监听器：

```tsx
// Timeline.tsx 中的实施
const { activeLevel, getActiveLevelLabel } = useZoomLevelMonitor(
  dayWidth,
  zoomLevels || [],
  {
    onZoomLevelChanged: (newLevel, previousLevel) => {
      console.log('🎯 Timeline zoom level changed:', {
        from: previousLevel?.label || 'none',
        to: newLevel.label,
        dayWidth: newLevel.dayWidth
      });
    }
  }
);

// Today按钮显示当前zoom level
<Button onClick={handleTodayClick}>
  {`Today${activeLevel ? ` (${activeLevel.label})` : ''}`}
</Button>
```

### 优势总结

1. **解耦设计**：Today按钮逻辑不直接依赖zoom button状态
2. **URL兼容**：支持通过URL分享特定zoom level的链接
3. **扩展友好**：可轻松添加新的zoom level响应逻辑
4. **调试友好**：详细的日志输出，便于追踪状态变化
5. **类型安全**：完整的TypeScript类型定义 