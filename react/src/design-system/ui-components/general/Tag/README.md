# Tag 组件

标签组件用于显示分类、状态或其他标记信息。

## 基本用法

```tsx
import { Tag } from '@/design-system';

<Tag>默认标签</Tag>
<Tag variant="outlined">轮廓标签</Tag>
<Tag closable onClose={() => console.log('关闭')}>可关闭标签</Tag>
```

## 颜色系统

### 预定义颜色
组件支持 6 种语义颜色：

```tsx
<Tag color="primary">主要</Tag>
<Tag color="secondary">次要</Tag>
<Tag color="success">成功</Tag>
<Tag color="warning">警告</Tag>
<Tag color="error">错误</Tag>
<Tag color="info">信息</Tag>
```

### 自定义颜色
直接传入任何有效的 CSS 颜色值：

```tsx
<Tag color="#ff6b6b">十六进制颜色</Tag>
<Tag color="rgb(255, 107, 107)">RGB 颜色</Tag>
<Tag color="var(--my-custom-color)">CSS 变量</Tag>
<Tag color="hsl(0, 100%, 70%)">HSL 颜色</Tag>
```

## 变体

- `contained`（默认）：填充样式，背景色为颜色的浅色版本
- `outlined`：轮廓样式，透明背景，彩色边框

## 尺寸

- `small`：小尺寸，适用于紧凑布局
- `medium`（默认）：中等尺寸，常规使用
- `large`：大尺寸，突出显示

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| `children` | `React.ReactNode` | - | 标签内容 |
| `variant` | `"contained" \| "outlined"` | `"contained"` | 外观变体 |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | 尺寸 |
| `color` | `string` | `"primary"` | 颜色，支持预定义颜色和自定义颜色 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |
| `onClose` | `() => void` | - | 关闭回调函数 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `className` | `string` | `""` | 自定义类名 |
| `data-testid` | `string` | - | 测试标识符 |

## 特性

- **简洁的颜色系统**：预定义颜色与自定义颜色统一处理
- **现代 CSS 功能**：使用 `color-mix()` 函数自动生成浅色背景
- **灵活的颜色支持**：支持所有 CSS 颜色格式
- **响应式设计**：适配不同尺寸需求
- **无障碍支持**：关闭按钮包含适当的 aria-label

## Files

- `index.tsx` - Main tag component implementation with custom color support
- `styles.module.scss` - Comprehensive styling using CSS variables for easy customization

## Usage

```typescript
import { Tag } from '@/ui-components';

// 基础用法
<Tag variant="contained">Default Tag</Tag>

// 预定义颜色
<Tag color="success" variant="outlined">Success</Tag>

// 自定义颜色 (Timeline 场景)
<Tag customColor="#8b5cf6" variant="contained">Custom Purple</Tag>
```

Perfect for status badges, category labels, timeline items, and any scenario requiring clear, concise labeling with flexible color customization. 