import * as React from 'react';
import {
  getSelectSizeStyles,
  getSelectTriggerStyles,
  getSelectFocusStyles,
  getSelectDropdownStyles,
  getSelectOptionStyles,
  getSelectSearchStyles,
  getSelectPlaceholderStyles,
  getSelectClearButtonStyles,
  getSelectErrorTextStyles,
  getSelectNoOptionsStyles,
  getSelectSearchContainerStyles,
} from '../../utils/tokens';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectSize = 'sm' | 'default' | 'lg';
export type SelectVariant = 'default' | 'cnc' | 'minimal';

export interface SelectProps {
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string | number;
  defaultValue?: string | number;
  onValueChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ 
    options = [],
    groups = [],
    value: controlledValue,
    defaultValue,
    onValueChange,
    placeholder = 'Select an option...',
    disabled = false,
    error,
    size = 'default',
    variant = 'default',
    searchable = false,
    clearable = false,
    multiple = false,
    className,
    style,
    maxHeight = '300px',
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string | number | (string | number)[]>(
      multiple 
        ? (defaultValue ? [defaultValue] : []) 
        : (defaultValue || controlledValue || '')
    );
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const selectRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    // Merge options and groups into a flat list for easier handling
    const allOptions = React.useMemo(() => {
      if (groups.length > 0) {
        return groups.flatMap(group => 
          group.options.map(option => ({ ...option, group: group.label }))
        );
      }
      return options;
    }, [options, groups]);

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return allOptions;
      return allOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [allOptions, searchQuery]);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const config = getSelectSizeStyles(size);

    // Get selected option(s) for display
    const getSelectedOptions = () => {
      if (multiple && Array.isArray(value)) {
        return allOptions.filter(option => value.includes(option.value));
      }
      return allOptions.filter(option => option.value === value);
    };

    const selectedOptions = getSelectedOptions();

    const handleValueChange = (optionValue: string | number) => {
      let newValue: string | number | (string | number)[];

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        if (currentValues.includes(optionValue)) {
          newValue = currentValues.filter(v => v !== optionValue);
        } else {
          newValue = [...currentValues, optionValue];
        }
      } else {
        newValue = optionValue;
        setIsOpen(false);
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = multiple ? [] : '';
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            handleValueChange(filteredOptions[focusedIndex].value);
          }
          e.preventDefault();
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          e.preventDefault();
          break;
        case 'ArrowUp':
          if (isOpen) {
            setFocusedIndex(prev => 
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }
          e.preventDefault();
          break;
      }
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll focused option into view
    React.useEffect(() => {
      if (focusedIndex >= 0 && listRef.current) {
        const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex]);

    const getTriggerStyles = (): React.CSSProperties => {
      return {
        ...getSelectTriggerStyles(variant, !!error, disabled),
        height: config.height,
        padding: config.padding,
        fontSize: config.fontSize,
        ...style,
      };
    };

    const focusStyles = getSelectFocusStyles(variant, !!error, isOpen);

    const dropdownStyles = getSelectDropdownStyles(maxHeight);

    const getOptionStyles = (option: SelectOption, index: number): React.CSSProperties => {
      const isSelected = multiple 
        ? Array.isArray(value) && value.includes(option.value)
        : option.value === value;
      const isFocused = index === focusedIndex;

      return {
        ...getSelectOptionStyles(isSelected, isFocused, !!option.disabled, variant),
        padding: config.padding,
        fontSize: config.fontSize,
        paddingLeft: isSelected && variant === 'cnc' ? 'calc(' + config.padding.split(' ')[1] + ' - 3px)' : config.padding.split(' ')[1],
      };
    };

    // Icons
    const ChevronIcon = () => (
      <svg 
        width={config.iconSize} 
        height={config.iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    );

    const ClearIcon = () => (
      <svg 
        width={config.iconSize} 
        height={config.iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const CheckIcon = () => (
      <svg 
        width={config.iconSize} 
        height={config.iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <polyline points="20,6 9,17 4,12" />
      </svg>
    );

    // Display value
    const getDisplayValue = () => {
      if (selectedOptions.length === 0) {
        return (
          <span style={getSelectPlaceholderStyles()}>
            {placeholder}
          </span>
        );
      }

      if (multiple && selectedOptions.length > 1) {
        return `${selectedOptions.length} items selected`;
      }

      return selectedOptions[0]?.label || placeholder;
    };

    return (
      <div ref={ref} style={{ position: 'relative', width: '100%' }} className={className} {...props}>
        <div
          ref={selectRef}
          style={{ ...getTriggerStyles(), ...focusStyles }}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flex: 1, 
            minWidth: 0,
            gap: '0.5rem'
          }}>
            {selectedOptions.length > 0 && selectedOptions[0]?.icon && (
              <span style={{ flexShrink: 0 }}>
                {selectedOptions[0].icon}
              </span>
            )}
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              {getDisplayValue()}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {clearable && selectedOptions.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                style={getSelectClearButtonStyles()}
              >
                <ClearIcon />
              </button>
            )}
            <ChevronIcon />
          </div>
        </div>

        {isOpen && (
          <div ref={listRef} style={dropdownStyles} role="listbox">
            {searchable && (
              <div style={{ 
                ...getSelectSearchContainerStyles(),
                padding: config.padding,
              }}>
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    ...getSelectSearchStyles(),
                    fontSize: config.fontSize,
                  }}
                  autoFocus
                />
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div style={{
                ...getSelectNoOptionsStyles(),
                padding: config.padding,
              }}>
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={`${option.value}-${index}`}
                  style={getOptionStyles(option, index)}
                  onClick={() => !option.disabled && handleValueChange(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={multiple 
                    ? Array.isArray(value) && value.includes(option.value)
                    : option.value === value
                  }
                >
                  {multiple && (
                    <div style={{
                      width: config.iconSize,
                      height: config.iconSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {Array.isArray(value) && value.includes(option.value) && <CheckIcon />}
                    </div>
                  )}
                  
                  {option.icon && (
                    <span style={{ flexShrink: 0 }}>
                      {option.icon}
                    </span>
                  )}
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div style={{
                        fontSize: '0.875em',
                        color: getSelectPlaceholderStyles().color,
                        marginTop: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {option.description}
                      </div>
                    )}
                  </div>

                  {!multiple && option.value === value && <CheckIcon />}
                </div>
              ))
            )}
          </div>
        )}

        {error && (
          <div style={getSelectErrorTextStyles()}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';