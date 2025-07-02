import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '../Input';
import { Cascader } from '../../navigation/Cascader';
import type { BaseComponentProps, Size } from '../../types';
import styles from './styles.module.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseComponentProps {
  /** Available options */
  options: SelectOption[];
  /** Current selected value */
  value?: string | number;
  /** Placeholder text */
  placeholder?: string;
  /** Size of the select */
  size?: Size;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether to show clear button when there's a selected value */
  showClearButton?: boolean;
  /** Whether to allow searching/filtering options */
  searchable?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
  
  // Event handlers
  /** Called when an option is selected */
  onSelect?: (value: string | number, option: SelectOption) => void;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Called when dropdown visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = 'Select an option...',
  size = 'medium',
  disabled = false,
  showClearButton = true,
  searchable = false,
  style,
  onSelect,
  onClear,
  onVisibilityChange,
  className = '',
  'data-testid': dataTestId,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search value
  const filteredOptions = searchable && searchValue
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : options;

  // Convert options to cascader format
  const cascaderGroups = [{
    items: filteredOptions.map(option => ({
      key: String(option.value),
      content: option.label,
      value: option.value,
      disabled: option.disabled,
    }))
  }];

  const handleSelect = useCallback((selectedValue: string | number | object | undefined) => {
    if (typeof selectedValue === 'string' || typeof selectedValue === 'number') {
      const option = options.find(opt => opt.value === selectedValue);
      if (option) {
        onSelect?.(selectedValue, option);
        setIsOpen(false);
        setSearchValue('');
      }
    }
  }, [options, onSelect]);

  const handleClear = useCallback(() => {
    onClear?.();
    setSearchValue('');
  }, [onClear]);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsOpen(visible);
    onVisibilityChange?.(visible);
    if (!visible) {
      setSearchValue('');
    }
  }, [onVisibilityChange]);

  const handleSearchChange = useCallback((newValue: string) => {
    setSearchValue(newValue);
  }, []);

  const triggerRef = useRef<HTMLDivElement>(null);
  const cascaderRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        cascaderRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !cascaderRef.current.contains(event.target as Node)
      ) {
        handleVisibilityChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleVisibilityChange]);

  const handleTriggerClick = () => {
    if (!disabled) {
      handleVisibilityChange(!isOpen);
    }
  };

  return (
    <div className={styles['tristan-select']} style={{ position: 'relative' }} data-testid={dataTestId}>
      <div ref={triggerRef} onClick={handleTriggerClick}>
        <Input
          value={searchable && isOpen ? searchValue : selectedOption?.label || ''}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          useAsButton={!searchable}
          showClearButton={showClearButton && !!selectedOption && !isOpen}
          suffixIcon={searchable ? (isOpen ? 'arrow_drop_up' : 'arrow_drop_down') : undefined}
          buttonIndicatorIcon={!searchable ? (isOpen ? 'arrow_drop_up' : 'arrow_drop_down') : undefined}
          onChange={searchable ? handleSearchChange : undefined}
          onClear={handleClear}
          style={style}
          className={className}
          {...rest}
        />
      </div>
      {isOpen && !disabled && (
        <div
          ref={cascaderRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            marginTop: '4px',
          }}
        >
          <Cascader
            groups={cascaderGroups}
            onItemClick={handleSelect}
            maxHeight={300}
            width={200}
          />
        </div>
      )}
    </div>
  );
}; 