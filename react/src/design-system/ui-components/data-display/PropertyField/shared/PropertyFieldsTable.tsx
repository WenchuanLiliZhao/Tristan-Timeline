import styles from "./PropertyFieldsTable.module.scss";

interface PropertyFieldsLayoutProps {
  children: React.ReactNode;
}

export const PropertyFieldsTable = ({ children }: PropertyFieldsLayoutProps) => {
  return <main className={styles["property-fields-table"]}>{children}</main>;
};