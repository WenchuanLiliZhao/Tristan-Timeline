import type { ReactNode } from "react";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import type { BaseComponentProps } from "../../types";

interface TristanLayoutContentProps extends BaseComponentProps {
  left?: ReactNode;
  right?: ReactNode;
  main: ReactNode;
}

export const TristanLayoutContent: React.FC<TristanLayoutContentProps> = ({
  left,
  right,
  main,
  className = "",
  "data-testid": dataTestId,
}) => {
  return (
    <div className={`${styles["tristan-layout__content"]} ${className}`} data-testid={dataTestId}>
      {left && (
        <div
          className={`${styles["tristan-layout__left"]} ${styles["auto-scroll-y"]}`}
        >
          {left}
        </div>
      )}
      <div
        className={`${styles["tristan-layout__main"]} ${styles["auto-scroll-y"]}`}
      >
        {main}
      </div>
      {right && (
        <div
          className={styles["tristan-layout__right"]}
        >
          {right}
        </div>
      )}
    </div>
  );
};

interface PageLayoutProps extends BaseComponentProps {
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  main: ReactNode;
}

export const TristanLayout: React.FC<PageLayoutProps> = ({
  top,
  left,
  right,
  main,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  useEffect(() => {
    // 保存原始的 overflow 值
    const originalOverflow = document.body.style.overflow;

    // 禁用 body 滚动
    document.body.style.overflow = "hidden";

    // 清理函数：组件卸载时恢复原始滚动
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className={`${styles["tristan-layout"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      {top && <div className={styles["tristan-layout__top"]}>{top}</div>}
      <TristanLayoutContent
        left={left}
        right={right}
        main={main}
        className={className}
        data-testid={dataTestId ? `${dataTestId}__content` : undefined}
      />
    </div>
  );
};
