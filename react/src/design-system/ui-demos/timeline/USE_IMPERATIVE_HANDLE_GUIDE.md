# useImperativeHandle 完整使用教程

## 📚 概述

`useImperativeHandle` 是 React 提供的一个 Hook，用于在使用 `forwardRef` 时自定义暴露给父组件的实例值。它打破了 React 的单向数据流，允许父组件直接调用子组件的方法。

## 🎯 核心概念

### 什么时候使用？

- ✅ **命令式操作**：滚动、聚焦、播放/暂停、缩放等
- ✅ **触发内部行为**：表单提交、数据刷新、动画触发等  
- ✅ **第三方库集成**：地图控制、图表操作等
- ❌ **数据获取**：应该用 props 回调
- ❌ **状态共享**：应该用状态提升

### 基本语法

```typescript
// 1. 定义接口
interface ComponentRef {
  methodName: () => void;
  methodWithParams: (param: string) => number;
}

// 2. 使用 forwardRef
const Component = forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  // 3. 使用 useImperativeHandle
  useImperativeHandle(ref, () => ({
    methodName: () => {
      // 实现逻辑
    },
    methodWithParams: (param: string) => {
      // 实现逻辑
      return 42;
    },
  }), [dependencies]);

  return <div>Component Content</div>;
});

// 4. 父组件使用
const Parent = () => {
  const componentRef = useRef<ComponentRef>(null);
  
  const handleClick = () => {
    componentRef.current?.methodName();
  };

  return (
    <div>
      <Component ref={componentRef} />
      <button onClick={handleClick}>调用子组件方法</button>
    </div>
  );
};
```

## 🛠️ Timeline 项目中的实际应用

### 1. 基础示例：SimpleCounter 组件

```typescript
// types/SimpleCounterTypes.ts
export interface SimpleCounterRef {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  getValue: () => number;
}

export interface SimpleCounterProps {
  initialValue?: number;
  step?: number;
}

// components/SimpleCounter.tsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { SimpleCounterRef, SimpleCounterProps } from '../types/SimpleCounterTypes';

export const SimpleCounter = forwardRef<SimpleCounterRef, SimpleCounterProps>(
  ({ initialValue = 0, step = 1 }, ref) => {
    const [count, setCount] = useState(initialValue);

    // 🎯 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      increment: () => setCount(prev => prev + step),
      decrement: () => setCount(prev => prev - step), 
      reset: () => setCount(initialValue),
      getValue: () => count,
    }), [step, initialValue, count]);

    return (
      <div style={{ padding: '16px', border: '1px solid #ccc' }}>
        <h3>计数器: {count}</h3>
      </div>
    );
  }
);

// 使用示例
const CounterDemo = () => {
  const counterRef = useRef<SimpleCounterRef>(null);

  return (
    <div>
      <SimpleCounter ref={counterRef} initialValue={10} step={5} />
      <div>
        <button onClick={() => counterRef.current?.increment()}>+5</button>
        <button onClick={() => counterRef.current?.decrement()}>-5</button>
        <button onClick={() => counterRef.current?.reset()}>重置</button>
        <button onClick={() => alert(`当前值: ${counterRef.current?.getValue()}`)}>
          获取值
        </button>
      </div>
    </div>
  );
};
```

### 2. 中级示例：VideoPlayer 组件

```typescript
// types/VideoPlayerTypes.ts
export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  isPlaying: () => boolean;
}

export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
}

// components/VideoPlayer.tsx
import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { VideoPlayerRef, VideoPlayerProps } from '../types/VideoPlayerTypes';

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, autoPlay = false, onTimeUpdate, onDurationChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // 🎯 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
      },
      pause: () => {
        videoRef.current?.pause();
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setVolume: (volume: number) => {
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, Math.min(1, volume));
        }
      },
      getCurrentTime: () => {
        return videoRef.current?.currentTime || 0;
      },
      getDuration: () => {
        return videoRef.current?.duration || 0;
      },
      isPlaying: () => {
        return !!(videoRef.current && !videoRef.current.paused);
      },
    }), []);

    // 事件处理
    const handleTimeUpdate = useCallback(() => {
      if (onTimeUpdate && videoRef.current) {
        onTimeUpdate(videoRef.current.currentTime);
      }
    }, [onTimeUpdate]);

    const handleDurationChange = useCallback(() => {
      if (onDurationChange && videoRef.current) {
        onDurationChange(videoRef.current.duration);
      }
    }, [onDurationChange]);

    return (
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        style={{ width: '100%', maxWidth: '600px' }}
        controls
      />
    );
  }
);

// 使用示例
const VideoPlayerDemo = () => {
  const playerRef = useRef<VideoPlayerRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSkipTo = (time: number) => {
    playerRef.current?.seek(time);
  };

  const handleVolumeChange = (volume: number) => {
    playerRef.current?.setVolume(volume);
  };

  return (
    <div>
      <VideoPlayer
        ref={playerRef}
        src="/sample-video.mp4"
        onTimeUpdate={setCurrentTime}
        onDurationChange={setDuration}
      />
      
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => playerRef.current?.play()}>播放</button>
        <button onClick={() => playerRef.current?.pause()}>暂停</button>
        <button onClick={() => handleSkipTo(30)}>跳转到30秒</button>
        <button onClick={() => handleVolumeChange(0.5)}>音量50%</button>
      </div>
      
      <div>
        进度: {Math.round(currentTime)}s / {Math.round(duration)}s
      </div>
    </div>
  );
};
```

### 3. 高级示例：我们的 TimelineView 组件

```typescript
// 这是我们项目中的实际实现

// ui/TimelineView.tsx
export interface TimelineViewRef {
  scrollToDate: (date: Date) => void;
  zoomToLevel: (level: string) => void;
  exportAsImage: () => Promise<string>;
  getVisibleDateRange: () => [Date, Date];
  refreshData: () => void;
}

export const TimelineView = forwardRef<TimelineViewRef, TimelineProps<any>>(
  function TimelineView<T = Record<string, unknown>>(
    props: TimelineProps<T>, 
    ref: React.Ref<TimelineViewRef>
  ) {
    const timelineRef = useRef<TimelineRef>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 🎯 暴露给父组件的高级方法
    useImperativeHandle(ref, () => ({
      // 滚动到指定日期
      scrollToDate: (date: Date) => {
        timelineRef.current?.scrollToDate(date);
      },
      
      // 缩放到指定级别
      zoomToLevel: (level: string) => {
        // 实现缩放逻辑
        console.log(`缩放到级别: ${level}`);
      },
      
      // 导出为图片
      exportAsImage: async () => {
        // 实现截图逻辑
        return new Promise((resolve) => {
          // 模拟异步操作
          setTimeout(() => {
            resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
          }, 1000);
        });
      },
      
      // 获取当前可见的日期范围
      getVisibleDateRange: () => {
        // 实现获取可见范围的逻辑
        const start = new Date('2024-01-01');
        const end = new Date('2024-12-31');
        return [start, end];
      },
      
      // 刷新数据
      refreshData: async () => {
        setIsRefreshing(true);
        try {
          // 实现数据刷新逻辑
          await new Promise(resolve => setTimeout(resolve, 1000));
        } finally {
          setIsRefreshing(false);
        }
      },
    }), []);

    // ... 组件的其余实现
    return (
      <div>
        {isRefreshing && <div>正在刷新...</div>}
        <Timeline ref={timelineRef} {...props} />
      </div>
    );
  }
);
```

### 4. 实际使用示例

```typescript
// pages/TimelineDemo.tsx
import React, { useRef, useState } from 'react';
import { TimelineView, type TimelineViewRef } from '../timeline';

export const TimelineDemo = () => {
  const timelineRef = useRef<TimelineViewRef>(null);
  const [exportedImage, setExportedImage] = useState<string>('');

  // 🎯 各种控制函数
  const handleScrollToToday = () => {
    timelineRef.current?.scrollToDate(new Date());
  };

  const handleScrollToNewYear = () => {
    timelineRef.current?.scrollToDate(new Date('2025-01-01'));
  };

  const handleZoomToQuarters = () => {
    timelineRef.current?.zoomToLevel('quarters');
  };

  const handleExportImage = async () => {
    const imageData = await timelineRef.current?.exportAsImage();
    if (imageData) {
      setExportedImage(imageData);
    }
  };

  const handleGetVisibleRange = () => {
    const range = timelineRef.current?.getVisibleDateRange();
    if (range) {
      alert(`可见范围: ${range[0].toDateString()} 到 ${range[1].toDateString()}`);
    }
  };

  const handleRefreshData = () => {
    timelineRef.current?.refreshData();
  };

  return (
    <div>
      {/* 控制面板 */}
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <h3>Timeline 控制面板</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={handleScrollToToday}>滚动到今天</button>
          <button onClick={handleScrollToNewYear}>滚动到2025年</button>
          <button onClick={handleZoomToQuarters}>缩放到季度视图</button>
          <button onClick={handleExportImage}>导出图片</button>
          <button onClick={handleGetVisibleRange}>获取可见范围</button>
          <button onClick={handleRefreshData}>刷新数据</button>
        </div>
      </div>

      {/* Timeline 组件 */}
      <TimelineView
        ref={timelineRef}
        inputData={/* your data */}
        // ... 其他 props
      />

      {/* 导出的图片预览 */}
      {exportedImage && (
        <div style={{ padding: '16px' }}>
          <h4>导出的图片:</h4>
          <img src={exportedImage} alt="Exported timeline" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};
```

## 🎨 设计模式和最佳实践

### 1. 接口设计原则

```typescript
// ✅ 好的接口设计
interface GoodComponentRef {
  // 动词开头，清晰表达意图
  scrollTo: (position: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  
  // 返回值有意义
  getCurrentPosition: () => number;
  
  // 异步操作返回 Promise
  saveData: () => Promise<void>;
  
  // 布尔查询用 is/has 开头
  isLoading: () => boolean;
  hasUnsavedChanges: () => boolean;
}

// ❌ 不好的接口设计
interface BadComponentRef {
  // 语义不清
  doSomething: () => void;
  
  // 返回值模糊
  getData: () => any;
  
  // 缺少错误处理
  riskyOperation: () => void;
}
```

### 2. 错误处理

```typescript
interface SafeComponentRef {
  performAction: () => { success: boolean; error?: string };
  asyncAction: () => Promise<{ success: boolean; data?: any; error?: string }>;
}

const SafeComponent = forwardRef<SafeComponentRef, {}>((props, ref) => {
  useImperativeHandle(ref, () => ({
    performAction: () => {
      try {
        // 执行操作
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    
    asyncAction: async () => {
      try {
        const data = await someAsyncOperation();
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  }), []);

  return <div>Safe Component</div>;
});
```

### 3. 依赖管理

```typescript
const Component = forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  const [internalState, setInternalState] = useState(0);
  
  useImperativeHandle(ref, () => ({
    // ✅ 正确：包含所有依赖
    updateWithState: () => {
      console.log(internalState);
      setInternalState(prev => prev + 1);
    },
    
    // ✅ 正确：无依赖的纯函数
    pureAction: () => {
      console.log('执行纯操作');
    },
  }), [internalState]); // 🎯 重要：包含 internalState 依赖

  return <div>{internalState}</div>;
});
```

## ⚠️ 注意事项和陷阱

### 1. 避免过度使用

```typescript
// ❌ 错误：用 useImperativeHandle 做数据获取
interface BadRef {
  getName: () => string;
  getAge: () => number;
  getStatus: () => string;
}

// ✅ 正确：用 props 和回调
interface GoodProps {
  name: string;
  age: number;
  status: string;
  onNameChange: (name: string) => void;
  onAgeChange: (age: number) => void;
}
```

### 2. 避免破坏封装

```typescript
// ❌ 错误：暴露内部实现细节
interface BadRef {
  getInternalState: () => any;
  setInternalVariable: (value: any) => void;
  accessPrivateMethod: () => void;
}

// ✅ 正确：只暴露有意义的行为
interface GoodRef {
  performBusinessAction: () => void;
  validateInput: () => boolean;
  resetToDefault: () => void;
}
```

### 3. 确保类型安全

```typescript
// ✅ 完整的类型定义
interface TypeSafeRef {
  updateItem: (id: string, data: ItemData) => Promise<UpdateResult>;
  deleteItem: (id: string) => Promise<DeleteResult>;
  getItems: () => readonly ItemData[];
}

// 相关类型定义
interface ItemData {
  id: string;
  name: string;
  createdAt: Date;
}

interface UpdateResult {
  success: boolean;
  updatedItem?: ItemData;
  error?: string;
}

interface DeleteResult {
  success: boolean;
  deletedId?: string;
  error?: string;
}
```

## 🧪 测试策略

### 1. 单元测试

```typescript
// __tests__/SimpleCounter.test.tsx
import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SimpleCounter, SimpleCounterRef } from '../SimpleCounter';

describe('SimpleCounter useImperativeHandle', () => {
  it('应该正确暴露方法', () => {
    let counterRef: React.RefObject<SimpleCounterRef>;
    
    const TestComponent = () => {
      counterRef = useRef<SimpleCounterRef>(null);
      return <SimpleCounter ref={counterRef} initialValue={10} />;
    };

    render(<TestComponent />);

    // 测试方法是否存在
    expect(counterRef.current?.increment).toBeDefined();
    expect(counterRef.current?.decrement).toBeDefined();
    expect(counterRef.current?.reset).toBeDefined();
    expect(counterRef.current?.getValue).toBeDefined();

    // 测试方法功能
    expect(counterRef.current?.getValue()).toBe(10);
    
    counterRef.current?.increment();
    expect(counterRef.current?.getValue()).toBe(11);
    
    counterRef.current?.reset();
    expect(counterRef.current?.getValue()).toBe(10);
  });
});
```

### 2. 集成测试

```typescript
// __tests__/TimelineView.integration.test.tsx
describe('TimelineView 集成测试', () => {
  it('应该能正确控制滚动', async () => {
    let timelineRef: React.RefObject<TimelineViewRef>;
    
    const TestApp = () => {
      timelineRef = useRef<TimelineViewRef>(null);
      return (
        <div>
          <TimelineView ref={timelineRef} inputData={mockData} />
          <button 
            onClick={() => timelineRef.current?.scrollToDate(new Date('2025-01-01'))}
            data-testid="scroll-button"
          >
            滚动
          </button>
        </div>
      );
    };

    const { getByTestId } = render(<TestApp />);
    
    // 模拟点击
    fireEvent.click(getByTestId('scroll-button'));
    
    // 验证滚动行为
    // (这里需要根据实际实现来验证)
  });
});
```

## 📋 总结检查清单

### 设计阶段
- [ ] 确认这个操作真的需要命令式调用
- [ ] 设计清晰的接口，方法名语义明确
- [ ] 考虑错误处理和边界情况
- [ ] 定义完整的 TypeScript 类型

### 实现阶段
- [ ] 使用 `forwardRef` 包装组件
- [ ] 正确使用 `useImperativeHandle` 
- [ ] 包含所有必要的依赖项
- [ ] 实现错误处理

### 测试阶段
- [ ] 编写单元测试验证方法功能
- [ ] 编写集成测试验证完整流程
- [ ] 测试错误情况和边界条件

### 文档阶段
- [ ] 编写清晰的接口文档
- [ ] 提供使用示例
- [ ] 说明注意事项和最佳实践

---

这个教程涵盖了 `useImperativeHandle` 在我们 timeline 项目中的各种应用场景，从简单到复杂，从理论到实践。希望能帮助你更好地理解和使用这个强大的 Hook！ 