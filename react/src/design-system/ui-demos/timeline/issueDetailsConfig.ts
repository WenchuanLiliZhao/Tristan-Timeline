

export interface ValueMappingEntry {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

export interface PropertyMappingConfig {
  /** Custom label in the UI (optional) */
  label?: string;
  /** Explicit display type override */
  displayType?: 'text' | 'date' | 'progress' | 'tag';
  /** Mapping from raw field value to display metadata */
  valueMapping?: Record<string, ValueMappingEntry>;
  /** Additional display options for different field types */
  displayOptions?: {
    // Text field options
    color?: string;
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    fontSize?: 'sm' | 'base' | 'lg' | 'xl';
    // Date field options
    dateFormat?: 'short' | 'medium' | 'long' | 'full';
    locale?: string;
    // Progress field options
    progressColor?: string;
    showProgressText?: boolean;
    progressHeight?: 'sm' | 'md' | 'lg';
    progressVariant?: 'default' | 'rounded' | 'square';
    // Tag field options
    tagVariant?: 'contained' | 'outlined';
  };
}

// Simplified property configuration interface
export interface PropertyConfig {
  property: string;
  displayType?: 'text' | 'date' | 'progress' | 'tag';
  label?: string;
  valueMapping?: Record<string, ValueMappingEntry>;
  displayOptions?: {
    // Text field options
    color?: string;
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    fontSize?: 'sm' | 'base' | 'lg' | 'xl';
    // Date field options
    dateFormat?: 'short' | 'medium' | 'long' | 'full';
    locale?: string;
    // Progress field options
    progressColor?: string;
    showProgressText?: boolean;
    progressHeight?: 'sm' | 'md' | 'lg';
    progressVariant?: 'default' | 'rounded' | 'square';
    // Tag field options
    tagVariant?: 'contained' | 'outlined';
  };
}

/**
 * Configuration object for IssueDetails component.
 */
export interface IssueDetailsConfig<T = Record<string, unknown>> {
  /** Custom title for the sidebar (optional, defaults to "Details") */
  title?: string;
  /** Mapping configuration for each field */
  propertyMappings?: Record<keyof T | string, PropertyMappingConfig>;
  /** Order of properties shown in the UI */
  propertyOrder?: (keyof T | string)[];
  /** Optional sections to group properties visually */
  sections?: Array<{
    title: string;
    properties: (keyof T | string)[];
    collapsible?: boolean;
  }>;
}

/**
 * Builder class that provides a fluent API for constructing IssueDetailsConfig objects.
 */
export class IssueDetailsConfigBuilder<T = Record<string, unknown>> {
  private readonly config: IssueDetailsConfig<T> = {};

  static create<T = Record<string, unknown>>(): IssueDetailsConfigBuilder<T> {
    return new IssueDetailsConfigBuilder<T>();
  }

  /** Define the overall display order and configuration of properties */
  setPropertyOrder(propertyConfigs: PropertyConfig[]): this {
    this.config.propertyOrder = propertyConfigs.map(config => config.property);
    
    // Process each property config and add to property mappings
    const mappings: Record<string, PropertyMappingConfig> = {};
    
    propertyConfigs.forEach(config => {
      if (config.displayType || config.label || config.valueMapping || config.displayOptions) {
        mappings[config.property] = {
          label: config.label,
          displayType: config.displayType,
          valueMapping: config.valueMapping,
          displayOptions: config.displayOptions
        };
      }
    });
    
    this.config.propertyMappings = mappings as Record<keyof T | string, PropertyMappingConfig>;
    
    return this;
  }

  /** Set the sidebar title */
  setTitle(title: string): this {
    this.config.title = title;
    return this;
  }

  /** Add a logical section grouping */
  addSection(title: string, properties: (keyof T | string)[], collapsible = false): this {
    if (!this.config.sections) this.config.sections = [];
    this.config.sections.push({ title, properties, collapsible });
    return this;
  }

  /** Finalise and obtain the configuration object */
  build(): IssueDetailsConfig<T> {
    return { ...this.config };
  }
} 