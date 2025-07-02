import React from "react";
import type { TimelineItemType } from "../../types";
import type {
  IssueDetailsConfig,
  PropertyMappingConfig,
} from "../../issueDetailsConfig";
import {
  TextField,
  DateField,
  ProgressField,
  TagField,
  PropertyFieldsTable,
} from "../../../../ui-components/data-display";


interface IssueDetailsProps<T = Record<string, unknown>> {
  /** The issue/item to display */
  item: TimelineItemType<T>;
  /** Configuration object controlling how properties are displayed */
  config?: IssueDetailsConfig<T>;
}

// Default property order for timeline items
const DEFAULT_PROPERTY_ORDER = [
  "id",
  "name",
  "startDate",
  "endDate",
  "status",
  "priority",
  "team",
  "progress",
  "category",
  "riskLevel",
  "projectKey",
];

// Default property labels
const DEFAULT_PROPERTY_LABELS: Record<string, string> = {
  id: "ID",
  name: "Name",
  startDate: "Start Date",
  endDate: "End Date",
  status: "Status",
  priority: "Priority",
  team: "Team",
  progress: "Progress",
  category: "Category",
  riskLevel: "Risk Level",
  projectKey: "Project Key",
};

export function IssueDetails<T = Record<string, unknown>>({
  item,
  config = {},
}: IssueDetailsProps<T>): React.ReactElement {
  // Determine the final property order
  const finalOrder =
    config.propertyOrder && config.propertyOrder.length > 0
      ? (config.propertyOrder as string[])
      : DEFAULT_PROPERTY_ORDER;

  // Filter only existing properties
  const availableProperties = finalOrder.filter(
    (key) =>
      key in item &&
      item[key as keyof typeof item] !== undefined &&
      item[key as keyof typeof item] !== null
  );

  // Decide which specialized field component to render
  const renderField = (key: string, value: unknown): React.ReactNode => {
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as
      | PropertyMappingConfig
      | undefined;
    const displayOptions = mappingConfig?.displayOptions || {};
    const displayType = mappingConfig?.displayType;

    if (
      displayType === "tag" ||
      (mappingConfig?.valueMapping && typeof value === "string")
    ) {
      // Tag mapping
      const mapping = mappingConfig?.valueMapping;
      if (mapping && typeof value === "string" && mapping[value]) {
        const mapped = mapping[value];
        return (
          <TagField
            key={key}
            label={getLabel(key)}
            name={mapped.name}
            color={mapped.color}
            icon={mapped.icon}
            variant={displayOptions.tagVariant}
          />
        );
      } else if (displayType === "tag") {
        // Fallback for tag displayType without mapping
        return (
          <TagField
            key={key}
            label={getLabel(key)}
            name={String(value)}
            color={displayOptions.color || "primary"}
            variant={displayOptions.tagVariant}
          />
        );
      }
    }

    if (displayType === "progress" && typeof value === "number") {
      return (
        <ProgressField
          key={key}
          label={getLabel(key)}
          value={Number(value)}
          color={displayOptions.progressColor}
        />
      );
    }

    if (
      displayType === "date" &&
      (value instanceof Date || typeof value === "string")
    ) {
      const dateValue = value instanceof Date ? value : new Date(value);
      return (
        <DateField
          key={key}
          label={getLabel(key)}
          value={dateValue}
          format={displayOptions.dateFormat}
          locale={displayOptions.locale}
          color={displayOptions.color}
        />
      );
    }

    if (displayType === "text") {
      return (
        <TextField
          key={key}
          label={getLabel(key)}
          value={String(value)}
          color={displayOptions.color}
        />
      );
    }

    // Auto-detect based on value type
    if (value instanceof Date) {
      return (
        <DateField
          key={key}
          label={getLabel(key)}
          value={value}
          format={displayOptions.dateFormat}
          locale={displayOptions.locale}
          color={displayOptions.color}
        />
      );
    }

    // default text
    return (
      <TextField
        key={key}
        label={getLabel(key)}
        value={String(value)}
        color={displayOptions.color}
      />
    );
  };

  const getLabel = (key: string): string => {
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as
      | PropertyMappingConfig
      | undefined;
    return mappingConfig?.label || DEFAULT_PROPERTY_LABELS[key] || key;
  };

  return (
    <PropertyFieldsTable>
      {availableProperties.map((key) => {
        const value = item[key as keyof typeof item];
        return renderField(key, value);
      })}
    </PropertyFieldsTable>
  );
}
