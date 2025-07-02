import { semanticActiveColors, semanticSuccessColors } from "../../../../styles";
import styles from "./styles.module.scss";

export interface ProgressBarProps {
  value: number;
  /** Progress bar color */
  color?: string;
  /** Show percentage text */
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color }) => {
  const progressValue = Math.max(0, Math.min(100, value));
  const fillColor =
    color ||
    (progressValue >= 100
      ? `var(${semanticSuccessColors.default})`
      : `var(${semanticActiveColors.default})`);

  return (
    <div className={styles["progress-container"]}>
      <div
        className={styles["progress-fill"]}
        style={{ width: `${progressValue}%`, backgroundColor: fillColor }}
      />
    </div>
  );
};
