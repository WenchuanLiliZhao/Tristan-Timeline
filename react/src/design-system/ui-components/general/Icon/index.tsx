import React from 'react';
import './fonts/material-icons.scss';
import type { BaseComponentProps } from '../../types';

export interface IconProps extends BaseComponentProps {
  /** 图标名称 - 使用 Material Symbols 的官方名称 */
  name: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否使用填充（填充）模式 */
  filled?: boolean;
}

/**
 * Icon 组件 - 基于 Material Symbols 字体的图标系统（200字重）
 * 
 * @example
 * ```tsx
 * <Icon name="home" />
 * <Icon name="person" filled />
 * <Icon name="settings" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style,
  filled = false,
  'data-testid': dataTestId,
  ...rest
}) => {
  // 当 filled 为 true 时，覆盖字体的 FILL 轴为 1，实现填充效果
  const fillStyle: React.CSSProperties | undefined = filled
    ? { fontVariationSettings: "'FILL' 1" }
    : undefined;

  return (
    <span
      className={`${className} material-icons`}
      style={{ ...style, ...fillStyle }}
      data-testid={dataTestId}
      {...rest}
    >
      {name}
    </span>
  );
}; 