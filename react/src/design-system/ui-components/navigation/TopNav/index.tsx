import React from 'react';
import styles from './styles.module.scss';
import type { BaseComponentProps } from '../../types';
export interface NavigationProps extends BaseComponentProps {
  left: React.ReactNode[];
  right: React.ReactNode[];
}

export const TopNav: React.FC<NavigationProps> = ({
  left,
  right,
  className = "",
  'data-testid': dataTestId,
  ...rest
}) => {
  return (
    <nav 
      className={`${styles["nav"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      <div className={styles["left"]}>
        {left.map((item, index) => (
          <div key={index} className={styles["item"]}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles["right"]}>
        {right.map((item, index) => (
          <div key={index} className={styles["item"]}>
            {item}
          </div>
        ))}
      </div>
    </nav>
  );
}; 

export interface NavTitleProps extends BaseComponentProps {
  title: string;
}

export const NavTitle: React.FC<NavTitleProps> = ({
  title,
  className = "",
  'data-testid': dataTestId,
  ...rest
}) => {
  return <div className={`${styles["nav-title"]} ${className}`} data-testid={dataTestId} {...rest}>{title}</div>;
};