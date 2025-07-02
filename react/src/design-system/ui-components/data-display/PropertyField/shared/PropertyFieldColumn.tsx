import styles from "./PropertyFieldColumn.module.scss";

interface PropertyFieldColumnProps {
  label?: React.ReactNode;
  content: React.ReactNode;
  color?: string;
}

export const PropertyFieldColumn = ({
  label,
  content,
  color,
}: PropertyFieldColumnProps) => {
  return (
    <div className={styles["property-field-column"]}>
      {label && <div className={styles["property-field-column-label"]}>{label}</div>}
      <div className={styles["property-field-column-content"]} style={{ color }}>
        {content}
      </div>
    </div>
  );
};
