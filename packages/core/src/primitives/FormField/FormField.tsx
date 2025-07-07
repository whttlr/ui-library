import * as React from 'react';
import {
  getFormFieldLabelStyles,
  getFormFieldHelpTextStyles,
  getFormFieldRequiredStyles,
} from '../../utils/tokens';

export interface FormFieldProps {
  label?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  layout?: 'vertical' | 'horizontal';
  labelWidth?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({
  label,
  helpText,
  error,
  required = false,
  children,
  layout = 'vertical',
  labelWidth = '120px',
  className,
  style,
  disabled = false,
  ...props
}, ref) => {
  const fieldId = React.useId();
  
  // Clone children to add id and aria attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        id: fieldId,
        'aria-describedby': helpText || error ? `${fieldId}-help` : undefined,
        'aria-invalid': error ? 'true' : undefined,
        error: error,
        disabled: disabled || (child.props as any)?.disabled,
      });
    }
    return child;
  });

  const containerStyle: React.CSSProperties = {
    width: '100%',
    display: layout === 'horizontal' ? 'flex' : 'block',
    alignItems: layout === 'horizontal' ? 'flex-start' : undefined,
    gap: layout === 'horizontal' ? '1rem' : undefined,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const labelStyle = getFormFieldLabelStyles(!!error, layout, labelWidth);

  const fieldContainerStyle: React.CSSProperties = {
    flex: layout === 'horizontal' ? 1 : undefined,
    minWidth: 0,
  };

  const helpTextStyle = getFormFieldHelpTextStyles(!!error);
  const requiredStyle = getFormFieldRequiredStyles();

  return (
    <div ref={ref} style={containerStyle} className={className} {...props}>
      {label && (
        <label htmlFor={fieldId} style={labelStyle}>
          {label}
          {required && (
            <span style={requiredStyle}>
              *
            </span>
          )}
        </label>
      )}
      
      <div style={fieldContainerStyle}>
        {enhancedChildren}
        
        {(helpText || error) && (
          <div id={`${fieldId}-help`} style={helpTextStyle}>
            {error || helpText}
          </div>
        )}
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';