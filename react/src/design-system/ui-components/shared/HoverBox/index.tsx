import styles from "./styles.module.scss";

export const HoverBox: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`${styles.hoverBox} ${className}`} />;
};