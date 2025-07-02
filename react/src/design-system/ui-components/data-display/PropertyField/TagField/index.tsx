import React from "react";
import { Tag, type TagProps } from "../../../general";
import { PropertyFieldColumn } from "../shared";

export interface TagFieldProps {
  label: string;
  name: string;
  color: string;
  icon?: string;
  /** Tag variant */
  variant?: TagProps['variant']
}

export const TagField: React.FC<TagFieldProps> = ({
  label,
  name,
  color,
  variant = "contained",
}) => (
  <PropertyFieldColumn
    {...{ label }}
    content={
      <Tag color={color} variant={variant} size="small">
        {name}
      </Tag>
    }
  />
);
