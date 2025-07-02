# Icon 使用指南

## 🎯 概述

Tristan UI 的 Icon 组件现在基于 **Material Icons 字体**，提供了轻量级、高性能的图标解决方案。

### ✨ 主要特性

- 🚀 **轻量级**：零外部依赖，包体积极小（~40KB vs 之前的 476KB）
- 🎨 **2000+ 图标**：支持几乎所有 Material Icons
- 🔧 **易于使用**：通过简单的 `name` 属性使用图标
- 🎯 **完全兼容**：保持向后兼容的 API
- ⚡ **性能优异**：基于字体的快速渲染

## 📦 安装

```bash
npm install tristan-ui
```

**无需额外依赖！** 所有图标资源都已内置。

## 🚀 基础使用

```tsx
import { Icon } from 'tristan-ui';
import 'tristan-ui/dist/tristan-ui.css'; // 引入样式

function App() {
  return (
    <div>
      {/* 基础图标 */}
      <Icon name="home" />
      
      {/* 设置尺寸 */}
      <Icon name="person" size="large" />
      <Icon name="settings" size={32} />
      
      {/* 设置颜色 */}
      <Icon name="favorite" color="#ff4757" />
      
      {/* 可点击图标 */}
      <Icon 
        name="add" 
        onClick={() => alert('添加')}
        size="large"
      />
      
      {/* 旋转图标 */}
      <Icon name="refresh" rotate={45} />
    </div>
  );
}
```

## 📖 API 参考

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `name` | `string` | **必需** | 图标名称 |
| `size` | `number \| 'small' \| 'medium' \| 'large'` | `'medium'` | 图标大小 |
| `color` | `string` | `'inherit'` | 图标颜色 |
| `onClick` | `() => void` | - | 点击事件处理器 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `rotate` | `number` | `0` | 旋转角度（度） |
| `className` | `string` | - | 自定义类名 |

### 尺寸预设

- `small`: 16px
- `medium`: 24px (默认)
- `large`: 32px
- 自定义数值: 任意像素值

## 🎨 图标名称

直接使用 [Material Icons](https://fonts.google.com/icons) 的官方名称：

### 常用示例
```tsx
{/* 基础图标 */}
<Icon name="home" />
<Icon name="person" />
<Icon name="settings" />
<Icon name="search" />
<Icon name="menu" />

{/* 操作图标 */}
<Icon name="add" />
<Icon name="remove" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="close" />

{/* 导航图标 */}
<Icon name="chevron_left" />
<Icon name="chevron_right" />
<Icon name="expand_less" />
<Icon name="expand_more" />
<Icon name="arrow_upward" />
<Icon name="arrow_downward" />

{/* 状态图标 */}
<Icon name="check_circle" />
<Icon name="error" />
<Icon name="warning" />
<Icon name="info" />

{/* 媒体控制 */}
<Icon name="play_arrow" />
<Icon name="pause" />
<Icon name="stop" />
<Icon name="volume_up" />
<Icon name="volume_off" />
```

### 📋 完整图标列表

请访问 [Google Material Icons](https://fonts.google.com/icons) 查看所有可用图标名称

## 💡 高级用法

### 自定义样式

```tsx
<Icon 
  name="home" 
  className="my-custom-icon"
  style={{
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    transition: 'all 0.3s ease'
  }}
/>
```

### 响应式图标

```tsx
function ResponsiveIcon() {
  const iconSize = window.innerWidth < 768 ? 'small' : 'large';
  
  return <Icon name="menu" size={iconSize} />;
}
```

### 动态颜色

```tsx
function StatusIcon({ status }: { status: 'success' | 'warning' | 'error' }) {
  const colorMap = {
    success: '#4caf50',
    warning: '#ff9800', 
    error: '#f44336'
  };
  
  const iconMap = {
    success: 'check-circle',
    warning: 'warning',
    error: 'error'
  };
  
  return (
    <Icon 
      name={iconMap[status]} 
      color={colorMap[status]}
      size="large"
    />
  );
}
```

## 🐛 故障排除

### 图标不显示
1. 确保已导入 CSS: `import 'tristan-ui/dist/tristan-ui.css'`
2. 检查图标名称是否正确（参考 Material Icons 官网）
3. 确保网络连接正常（字体通过 CDN 加载）

### 找不到图标
- 使用正确的 Material Icons 官方名称
- 注意下划线格式：`chevron_left` 而不是 `chevron-left`
- 参考 [Material Icons](https://fonts.google.com/icons) 官网

### 性能优化
- Material Icons 字体会在首次使用时加载并缓存
- 考虑在应用启动时预加载字体以获得最佳体验

## 📈 版本更新

### v0.3.0 (当前版本)
- 🎉 **重大简化**：直接使用 Material Icons 官方名称
- 📦 **体积优化**：包大小从 476KB 减少到 40KB (91% 减少)
- 🚀 **性能提升**：字体渲染比 SVG 更快
- 🎯 **向后兼容**：保持相同的 API
- 🔧 **零依赖**：无需额外安装任何依赖

### 从 v0.2.x 迁移
图标名称需要更新为 Material Icons 官方格式：
- `chevron-left` → `chevron_left`
- `check-circle` → `check_circle`
- `more-vert` → `more_vert`

## 🤝 贡献

如需添加新图标或报告问题，请在 GitHub 仓库提交 Issue 或 PR。

---

**快乐编码！** 🚀 