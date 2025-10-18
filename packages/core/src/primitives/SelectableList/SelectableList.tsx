import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { tokens } from '../../utils/tokens';
import { Check } from 'lucide-react';

const selectableListVariants = cva(
  'w-full border rounded-md bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SelectableListOption {
  id: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectableListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof selectableListVariants> {
  label?: string;
  options: SelectableListOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  multiSelect?: boolean;
  maxHeight?: string;
  searchable?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  emptyMessage?: string;
}

// Get variant color styles using tokens
const getSelectableListVariantStyles = (variant: string = 'default') => {
  const variantColors = {
    default: tokens.colors.primary.main,
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    error: tokens.colors.status.error,
    info: tokens.colors.status.info,
  };
  
  return variantColors[variant as keyof typeof variantColors] || variantColors.default;
};

// Get size-based styles using tokens
const getSelectableListSizeStyles = (size: string = 'md') => {
  const styles = {
    sm: {
      padding: tokens.spacing.sm,
      fontSize: tokens.text.size.sm[0],
      itemPadding: tokens.spacing.xs,
      checkboxSize: '14px',
    },
    md: {
      padding: tokens.spacing.md,
      fontSize: tokens.text.size.base[0],
      itemPadding: tokens.spacing.sm,
      checkboxSize: '16px',
    },
    lg: {
      padding: tokens.spacing.lg,
      fontSize: tokens.text.size.lg[0],
      itemPadding: tokens.spacing.md,
      checkboxSize: '18px',
    },
  };
  
  return styles[size as keyof typeof styles] || styles.md;
};

// Label styles
const getLabelStyles = (): React.CSSProperties => ({
  display: 'block',
  fontSize: tokens.text.size.sm[0],
  fontWeight: tokens.text.weight.medium,
  color: tokens.colors.text.primary,
  marginBottom: tokens.spacing.sm,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Container styles
const getContainerStyles = (maxHeight?: string): React.CSSProperties => ({
  border: `1px solid ${tokens.colors.border.primary}`,
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.colors.bg.primary,
  maxHeight: maxHeight || '200px',
  overflowY: 'auto',
  position: 'relative',
});

// Search input styles
const getSearchInputStyles = (): React.CSSProperties => ({
  width: '100%',
  padding: tokens.spacing.sm,
  border: 'none',
  borderBottom: `1px solid ${tokens.colors.border.primary}`,
  backgroundColor: 'transparent',
  color: tokens.colors.text.primary,
  fontSize: tokens.text.size.sm[0],
  fontFamily: tokens.text.family.sans.join(', '),
  outline: 'none',
});

// Option item styles
const getOptionItemStyles = (
  size: string = 'md',
  isSelected: boolean = false,
  isDisabled: boolean = false,
  isHovered: boolean = false
): React.CSSProperties => {
  const sizeStyles = getSelectableListSizeStyles(size);
  
  return {
    padding: sizeStyles.itemPadding,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
    backgroundColor: isHovered && !isDisabled ? tokens.colors.interactive.hover : 'transparent',
    borderBottom: `1px solid ${tokens.colors.border.primary}`,
    transition: tokens.transition.default,
    ':last-child': {
      borderBottom: 'none',
    },
  };
};

// Checkbox styles
const getCheckboxStyles = (
  size: string = 'md',
  isSelected: boolean = false,
  activeColor: string,
  isDisabled: boolean = false
): React.CSSProperties => {
  const sizeStyles = getSelectableListSizeStyles(size);
  
  return {
    width: sizeStyles.checkboxSize,
    height: sizeStyles.checkboxSize,
    borderRadius: tokens.radius.sm,
    border: `2px solid ${isSelected ? activeColor : tokens.colors.border.primary}`,
    backgroundColor: isSelected ? activeColor : 'transparent',
    borderColor: isSelected ? activeColor : tokens.colors.border.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: tokens.transition.default,
    marginTop: '2px',
    flexShrink: 0,
    opacity: isDisabled ? 0.5 : 1,
  };
};

// Option label styles
const getOptionLabelStyles = (size: string = 'md', isDisabled: boolean = false): React.CSSProperties => {
  const sizeStyles = getSelectableListSizeStyles(size);
  
  return {
    fontSize: sizeStyles.fontSize,
    color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.primary,
    fontWeight: tokens.text.weight.medium,
    fontFamily: tokens.text.family.sans.join(', '),
  };
};

// Option description styles
const getOptionDescriptionStyles = (isDisabled: boolean = false): React.CSSProperties => ({
  fontSize: tokens.text.size.sm[0],
  color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
  marginTop: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
  lineHeight: '1.4',
});

// Error message styles
const getErrorStyles = (): React.CSSProperties => ({
  fontSize: tokens.text.size.xs[0],
  color: tokens.colors.status.error,
  marginTop: tokens.spacing.xs,
  fontFamily: tokens.text.family.sans.join(', '),
});

// Empty message styles
const getEmptyMessageStyles = (): React.CSSProperties => ({
  padding: tokens.spacing.md,
  textAlign: 'center',
  color: tokens.colors.text.secondary,
  fontSize: tokens.text.size.sm[0],
  fontFamily: tokens.text.family.sans.join(', '),
});

const SelectableList = React.forwardRef<HTMLDivElement, SelectableListProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    style,
    label,
    options,
    value = [],
    onChange,
    multiSelect = false,
    maxHeight,
    searchable = false,
    placeholder = 'Search...',
    error,
    disabled,
    emptyMessage = 'No options available',
    ...props 
  }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);
    
    const activeColor = getSelectableListVariantStyles(variant);
    
    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      return options.filter(option => 
        option.label?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);
    
    const handleSelect = (id: string) => {
      if (disabled) return;
      
      const option = options.find(opt => opt.id === id);
      if (option?.disabled) return;
      
      if (multiSelect) {
        const newValue = value.includes(id) 
          ? value.filter(v => v !== id)
          : [...value, id];
        onChange?.(newValue);
      } else {
        onChange?.(value.includes(id) ? [] : [id]);
      }
    };
    
    const isSelected = (id: string) => value.includes(id);
    
    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label style={getLabelStyles()}>
            {label}
          </label>
        )}
        
        <div 
          ref={ref}
          className={cn(selectableListVariants({ variant, size }), className)}
          style={{
            ...getContainerStyles(maxHeight),
            ...style,
          }}
          {...props}
        >
          {searchable && (
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={getSearchInputStyles()}
              disabled={disabled}
            />
          )}
          
          {filteredOptions.length === 0 ? (
            <div style={getEmptyMessageStyles()}>
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option) => {
              const selected = isSelected(option.id);
              const isDisabled = disabled || option.disabled;
              const isHovered = hoveredOption === option.id;
              
              return (
                <div
                  key={option.id}
                  style={getOptionItemStyles(size, selected, isDisabled, isHovered)}
                  onClick={() => handleSelect(option.id)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={isDisabled}
                >
                  {/* Checkbox */}
                  <div style={getCheckboxStyles(size, selected, activeColor, isDisabled)}>
                    {selected && (
                      <Check 
                        size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} 
                        style={{ color: 'white' }} 
                      />
                    )}
                  </div>
                  
                  {/* Icon */}
                  {option.icon && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
                      marginTop: '2px',
                    }}>
                      {option.icon}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={getOptionLabelStyles(size, isDisabled)}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div style={getOptionDescriptionStyles(isDisabled)}>
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {error && (
          <p style={getErrorStyles()}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectableList.displayName = 'SelectableList';

export { SelectableList, selectableListVariants };