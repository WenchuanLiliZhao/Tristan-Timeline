import React from "react";
import styles from "./Column.module.scss";

interface ColumnProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Column: React.FC<ColumnProps> = ({
  className,
  children,
  style,
}) => {
  return (
    <div className={`${styles["column"]} ${className || ""}`} style={style}>
      {children}
    </div>
  );
}; 