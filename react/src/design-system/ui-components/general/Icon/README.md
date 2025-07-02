# Icon Component

基于 Material Symbols 字体的图标组件，支持自定义尺寸和样式。

## 特性

- ✅ 基于 Material Symbols 字体（200字重）
- ✅ 支持预定义尺寸（small、medium、large）
- ✅ 支持自定义数字尺寸
- ✅ 当不设置尺寸时，自动继承父元素的 font-size
- ✅ 完全可定制的样式
- ✅ TypeScript 支持

## 基本用法

```tsx
import { Icon } from '@/design-system/ui-components';

// 基本用法 - 继承父元素尺寸
<Icon name="home" />

// 预定义尺寸
<Icon name="home" size="small" />   // 16px
<Icon name="home" size="medium" />  // 24px
<Icon name="home" size="large" />   // 32px

// 自定义数字尺寸
<Icon name="home" size={20} />
<Icon name="home" size={28} />

// 自定义样式
<Icon name="home" size="large" style={{ color: 'red' }} />
```

## 继承父元素尺寸

当不设置 `size` 属性时，图标会继承父元素的 `font-size`：

```tsx
<div style={{ fontSize: '18px' }}>
  <Icon name="info" /> {/* 图标尺寸为 18px */}
  <span>文本内容</span>
</div>

<h1 style={{ fontSize: '32px' }}>
  <Icon name="star" /> {/* 图标尺寸为 32px */}
  标题内容
</h1>
```

## 与其他组件结合

```tsx
// 在按钮中使用
<Button icon="home" size="medium">
  首页
</Button>

// 在通知消息中使用
<div className="notification">
  <Icon name="check_circle" size="small" style={{ color: 'green' }} />
  <span>操作成功</span>
</div>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| `name` | `string` | - | **必需** Material Symbols 图标名称 |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `undefined` | 图标尺寸，为空时继承父元素 font-size |
| `style` | `React.CSSProperties` | `undefined` | 自定义样式 |
| `className` | `string` | `''` | 自定义 CSS 类名 |
| `data-testid` | `string` | `undefined` | 测试 ID |

## 预定义尺寸映射

| 尺寸名称 | 像素值 |
|---------|--------|
| `small` | 16px |
| `medium` | 24px |
| `large` | 32px |

## 常用图标名称

```tsx
// 导航类
<Icon name="home" />
<Icon name="menu" />
<Icon name="search" />
<Icon name="settings" />

// 操作类
<Icon name="add" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="close" />

// 状态类
<Icon name="check" />
<Icon name="error" />
<Icon name="info" />
<Icon name="warning" />

// 可见性
<Icon name="visibility" />
<Icon name="visibility_off" />

// 文件操作
<Icon name="download" />
<Icon name="upload" />
<Icon name="share" />
<Icon name="copy" />
```

## 注意事项

1. 图标名称必须是有效的 Material Symbols 名称
2. 自定义数字尺寸使用像素值
3. 当 size 为 `undefined` 时，图标会完全继承父元素的 font-size
4. 推荐在需要统一尺寸时使用预定义尺寸，在需要精确控制时使用数字尺寸
5. 图标颜色可以通过 CSS 的 `color` 属性或 `style.color` 控制

## Files

- `index.tsx` - Main icon component implementation
- `styles.module.scss` - Icon styling and sizing utilities
- `fonts/` - Font files and Material Icons integration
- `MATERIAL_ICONS_INTEGRATION.md` - Detailed guide for icon usage

## Usage

```typescript
import { Icon } from '@/ui-components';

<Icon name="home" size={24} color="primary" />
<Icon name="search" size="small" />
```

## Documentation

See `MATERIAL_ICONS_INTEGRATION.md` for comprehensive documentation on available icons and integration patterns. 