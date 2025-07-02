# Tristan UI Styles

这个目录包含了 Tristan UI 设计系统的所有样式文件。

## 使用方法

### 1. 导入完整样式系统

```scss
// 导入所有样式
@import 'tristan-ui/styles';
```

### 2. 导入特定样式文件

```scss
// 只导入颜色系统
@import 'tristan-ui/styles/color.scss';

// 只导入字体样式
@import 'tristan-ui/styles/font.scss';

// 只导入间距系统
@import 'tristan-ui/styles/spacing.scss';
```

### 3. 在 CSS 中使用 CSS 变量

```css
.my-component {
  background-color: var(--background-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}
```

## 文件说明

- `_app.scss` - 主样式文件，包含所有其他样式
- `color.scss` - Moon Design System 灰度色阶和语义化颜色
- `font.scss` - 字体系统和排版样式
- `spacing.scss` - 间距和布局相关变量
- `z-index.scss` - Z-index 层级管理
- `shadow.scss` - 阴影效果
- `0_reset.scss` - CSS 重置样式

## 主题支持

样式系统支持明暗主题自动切换：

```html
<!-- 强制使用暗色主题 -->
<html data-theme="dark">
  <!-- 你的内容 -->
</html>
```

## CSS 变量

### 灰度色阶
- `--gray-50` 到 `--gray-900` (10个层级)

### 语义化颜色
- `--background-primary/secondary/tertiary`
- `--text-primary/secondary/tertiary/disabled`
- `--border-light/medium/strong`
- `--surface-primary/secondary/tertiary`

所有变量都支持明暗主题自动切换。 