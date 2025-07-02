import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Color, Size } from "../../types";
import { type RainbowColorName } from "../../../../styles/color";

export interface TagProps extends BaseComponentProps {
  children?: React.ReactNode;
  variant?: "contained" | "outlined";
  size?: Size;
  color?: Color | RainbowColorName | string;
  closable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  closable = false,
  onClose,
  disabled = false,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  // 定义预定义颜色列表（只保留核心语义颜色）
  const predefinedColors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  const isPredefinedColor = predefinedColors.includes(color as string);

  const baseClass = "lili-tag";
  
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    // 只有预定义颜色才使用颜色类
    isPredefinedColor && styles[`${baseClass}--${color}`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 构建动态样式对象
  const componentStyle = !isPredefinedColor && color ? {
    '--element-color': (color as string).startsWith('--') ? `var(${color})` : color,
    '--element-color-pale': generatePaleColor(color as string),
  } as React.CSSProperties : {};

  // 生成浅色版本的颜色（兼容 Chrome < 111）
  function generatePaleColor(color: string): string {
    // 如果是 CSS 变量，尝试添加 -pale 后缀
    if (color.startsWith('--')) {
      return `var(${color}-pale)`;
    }
    
    // 如果是已经包装的 CSS 变量，提取并添加 -pale 后缀
    const varMatch = color.match(/^var\((--[^)]+)\)$/);
    if (varMatch) {
      return `var(${varMatch[1]}-pale)`;
    }
    
    // 如果是十六进制颜色，添加透明度
    if (color.match(/^#[0-9a-fA-F]{6}$/)) {
      return color + '26'; // 添加 15% 透明度 (0.15 * 255 = 38.25 ≈ 26 in hex)
    }
    
    // 如果是十六进制短格式
    if (color.match(/^#[0-9a-fA-F]{3}$/)) {
      // 扩展为完整格式再添加透明度
      const expanded = color.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/, '#$1$1$2$2$3$3');
      return expanded + '26';
    }
    
    // 如果是 rgba/rgb 颜色，降低透明度
    if (color.startsWith('rgb')) {
      if (color.includes('rgba')) {
        // 如果已经是 rgba，将 alpha 值设为 0.15
        return color.replace(/,\s*[\d.]+\)$/, ', 0.15)');
      } else {
        // rgb 转换为 rgba
        return color.replace('rgb(', 'rgba(').replace(')', ', 0.15)');
      }
    }
    
    // 如果是 HSL 颜色
    if (color.startsWith('hsl')) {
      if (color.includes('hsla')) {
        return color.replace(/,\s*[\d.]+\)$/, ', 0.15)');
      } else {
        return color.replace('hsl(', 'hsla(').replace(')', ', 0.15)');
      }
    }
    
    // 对于其他格式，使用 rgba 作为 fallback
    return `rgba(128, 128, 128, 0.15)`;
  }

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  return (
    <span
      className={classes}
      style={componentStyle}
      data-testid={dataTestId}
      {...rest}
    >
      <span className={styles[`${baseClass}__content`]}>{children}</span>
      {closable && (
        <button
          type="button"
          className={styles[`${baseClass}__close`]}
          onClick={handleClose}
          disabled={disabled}
          aria-label="删除标签"
        >
          ×
        </button>
      )}
    </span>
  );
}; 