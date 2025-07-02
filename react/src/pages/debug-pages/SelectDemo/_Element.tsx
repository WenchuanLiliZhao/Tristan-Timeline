import React, { useState } from 'react';
import { Select, type SelectOption } from '../../../design-system/ui-components/data-entry';

export const Element: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string>();
  const [searchableValue, setSearchableValue] = useState<string>();
  const [controlledValue, setControlledValue] = useState<string>();
  const [sizeValue, setSizeValue] = useState<string>();

  // Sample data
  const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'raspberry', label: 'Raspberry' },
    { value: 'blackberry', label: 'Blackberry' },
  ];

  const frameworkOptions: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid.js' },
    { value: 'preact', label: 'Preact' },
    { value: 'ember', label: 'Ember.js' },
    { value: 'backbone', label: 'Backbone.js' },
  ];

  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'au', label: 'Australia' },
  ];

  const handleBasicSelect = (value: string | number, option: SelectOption) => {
    console.log('Basic select:', value, option);
    setBasicValue(value as string);
  };

  const handleSearchableSelect = (value: string | number, option: SelectOption) => {
    console.log('Searchable select:', value, option);
    setSearchableValue(value as string);
  };

  const handleControlledSelect = (value: string | number, option: SelectOption) => {
    console.log('Controlled select:', value, option);
    setControlledValue(value as string);
  };

  const handleSizeSelect = (value: string | number, option: SelectOption) => {
    console.log('Size select:', value, option);
    setSizeValue(value as string);
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    return () => {
      setter(undefined);
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Select Component Demo</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Basic Usage</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Simple select dropdown with predefined options
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Basic Select</h4>
            <Select
              options={fruitOptions}
              value={basicValue}
              placeholder="Choose a fruit..."
              onSelect={handleBasicSelect}
              onClear={handleClear(setBasicValue)}
            />
            {basicValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color--text-tertiary)' }}>
                Selected: {fruitOptions.find(opt => opt.value === basicValue)?.label}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Searchable Select */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Searchable Select</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select with search functionality to filter options
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Searchable Framework Select</h4>
            <Select
              options={frameworkOptions}
              value={searchableValue}
              searchable={true}
              placeholder="Search frameworks..."
              onSelect={handleSearchableSelect}
              onClear={handleClear(setSearchableValue)}
            />
            {searchableValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color--text-tertiary)' }}>
                Selected: {frameworkOptions.find(opt => opt.value === searchableValue)?.label}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Controlled vs Uncontrolled */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Controlled vs Uncontrolled</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Uncontrolled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Component manages its own state
            </p>
            <Select
              options={countryOptions}
              placeholder="Select a country..."
              onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Controlled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Value: "{controlledValue || 'None'}"
            </p>
            <Select
              options={countryOptions}
              value={controlledValue}
              onSelect={handleControlledSelect}
              onClear={handleClear(setControlledValue)}
              placeholder="Controlled select"
            />
          </div>
        </div>
      </section>

      {/* Different Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Different Sizes</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select component supports all Input component sizes
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Tiny</h4>
            <Select size="tiny" options={fruitOptions} placeholder="Tiny select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Small</h4>
            <Select size="small" options={fruitOptions} placeholder="Small select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Medium (Default)</h4>
            <Select size="medium" options={fruitOptions} placeholder="Medium select" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Large</h4>
            <Select size="large" options={fruitOptions} placeholder="Large select" />
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Disabled State</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select component can be disabled
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled Select</h4>
            <Select
              options={fruitOptions}
              disabled={true}
              placeholder="This select is disabled"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled with Value</h4>
            <Select
              options={fruitOptions}
              value="apple"
              disabled={true}
              placeholder="Disabled with selected value"
            />
          </div>
        </div>
      </section>

      {/* Options with Disabled Items */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Options with Disabled Items</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Individual options can be disabled
        </p>
        
        <Select
          options={[
            { value: 'active1', label: 'Active Option 1' },
            { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
            { value: 'active2', label: 'Active Option 2' },
            { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
            { value: 'active3', label: 'Active Option 3' },
          ]}
          placeholder="Select an option (some are disabled)..."
          onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
        />
      </section>

      {/* Clear Button Behavior */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Clear Button Behavior</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Different clear button configurations
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>With Clear Button (Default)</h4>
            <Select
              options={fruitOptions}
              value={sizeValue}
              onSelect={handleSizeSelect}
              onClear={handleClear(setSizeValue)}
              placeholder="With clear button"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Without Clear Button</h4>
            <Select
              options={fruitOptions}
              value={sizeValue}
              onSelect={handleSizeSelect}
              showClearButton={false}
              placeholder="Without clear button"
            />
          </div>
        </div>
      </section>

      {/* Event Handling */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Event Handling</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Demonstrating various event handlers
        </p>
        
        <Select
          options={frameworkOptions}
          placeholder="Select to see events in console..."
          onSelect={(_value, option) => {
            console.log('onSelect event:', { value: _value, option });
            alert(`Selected: ${option.label}`);
          }}
          onClear={() => {
            console.log('onClear event');
            alert('Selection cleared');
          }}
          onVisibilityChange={(visible) => {
            console.log('onVisibilityChange event:', visible);
          }}
        />
      </section>

      {/* Custom Styling */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Custom Styling</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Select with custom inline styles
        </p>
        
        <Select
          options={fruitOptions}
          placeholder="Custom styled select..."
          style={{
            border: '2px solid var(--color--accent-prime)',
            borderRadius: '12px',
            backgroundColor: 'var(--color--bg-tertiary)',
          }}
          onSelect={(_value, option) => alert(`Selected: ${option.label}`)}
        />
      </section>
    </div>
  );
}; 