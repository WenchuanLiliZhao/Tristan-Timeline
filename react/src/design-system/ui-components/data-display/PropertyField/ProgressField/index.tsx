import { ProgressBar } from "../../ProgressBar";
import { PropertyFieldColumn } from "../shared";

export interface ProgressFieldProps {
  label: string;
  value: number;
  color?: string;
}

export const ProgressField: React.FC<ProgressFieldProps> = ({ label, value, color}) => {
  return (
    <PropertyFieldColumn {...{ label, content: (
      <ProgressBar value={value} color={color} />
    ), color }} />
  )
}