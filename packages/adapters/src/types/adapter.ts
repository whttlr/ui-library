/**
 * Adapter Type Definitions
 * 
 * Comprehensive TypeScript types for the adapter system
 */

import React from 'react';

// ============================================================================
// BASE ADAPTER TYPES
// ============================================================================

/**
 * Available adapter libraries
 */
export type AdapterLibrary = 'ant-design' | 'headless-ui' | 'custom';

/**
 * Base adapter props that all components should extend
 */
export interface AdapterProps {
  /** Which adapter library to use */
  adapter?: AdapterLibrary;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Component children */
  children?: React.ReactNode;
}

/**
 * Adapter component interface
 */
export interface AdapterComponent<T extends AdapterProps = AdapterProps> 
  extends React.FC<T> {
  /** Available adapters for this component */
  adapters?: Record<string, React.ComponentType<T>>;
  /** Display name for debugging */
  displayName?: string;
}

// ============================================================================
// COMPONENT-SPECIFIC ADAPTER PROPS
// ============================================================================

/**
 * Button adapter props
 */
export interface ButtonAdapterProps extends AdapterProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * Input adapter props
 */
export interface InputAdapterProps extends AdapterProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'borderless';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Card adapter props
 */
export interface CardAdapterProps extends AdapterProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}

/**
 * Modal adapter props
 */
export interface ModalAdapterProps extends AdapterProps {
  open?: boolean;
  title?: React.ReactNode;
  width?: string | number;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}

/**
 * Table adapter props
 */
export interface TableAdapterProps extends AdapterProps {
  dataSource?: any[];
  columns?: any[];
  loading?: boolean;
  pagination?: any;
  rowKey?: string | ((record: any) => string);
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  onRow?: (record: any, index?: number) => any;
}

/**
 * Form adapter props
 */
export interface FormAdapterProps extends AdapterProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: any;
  wrapperCol?: any;
  validateTrigger?: string | string[];
  preserve?: boolean;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
}

/**
 * Badge adapter props
 */
export interface BadgeAdapterProps extends AdapterProps {
  count?: React.ReactNode;
  dot?: boolean;
  showZero?: boolean;
  overflowCount?: number;
  offset?: [number, number];
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: React.ReactNode;
  color?: string;
}

/**
 * Alert adapter props
 */
export interface AlertAdapterProps extends AdapterProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message?: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  closeText?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  showIcon?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Select adapter props
 */
export interface SelectAdapterProps extends AdapterProps {
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  loading?: boolean;
  mode?: 'multiple' | 'tags';
  options?: { label: React.ReactNode; value: any; disabled?: boolean }[];
  onChange?: (value: any, option: any) => void;
  onSelect?: (value: any, option: any) => void;
  onDeselect?: (value: any, option: any) => void;
  onSearch?: (value: string) => void;
}

// ============================================================================
// CNC-SPECIFIC ADAPTER PROPS
// ============================================================================

/**
 * Emergency button adapter props
 */
export interface EmergencyButtonAdapterProps extends ButtonAdapterProps {
  emergency?: boolean;
  confirmRequired?: boolean;
  onEmergencyStop?: () => void;
}

/**
 * Status indicator adapter props
 */
export interface StatusIndicatorAdapterProps extends AdapterProps {
  status: 'connected' | 'disconnected' | 'error' | 'warning' | 'idle' | 'running';
  label?: string;
  showPulse?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Coordinate display adapter props
 */
export interface CoordinateDisplayAdapterProps extends AdapterProps {
  x?: number;
  y?: number;
  z?: number;
  precision?: number;
  units?: 'mm' | 'inch';
  label?: string;
  editable?: boolean;
  onCoordinateChange?: (axis: 'x' | 'y' | 'z', value: number) => void;
}

/**
 * Jog controls adapter props
 */
export interface JogControlsAdapterProps extends AdapterProps {
  disabled?: boolean;
  jogDistance?: number;
  feedRate?: number;
  onJog?: (axis: 'x' | 'y' | 'z', direction: 1 | -1, distance: number) => void;
  onJogDistanceChange?: (distance: number) => void;
  onFeedRateChange?: (feedRate: number) => void;
}

// ============================================================================
// ADAPTER CONFIGURATION TYPES
// ============================================================================

/**
 * Adapter configuration
 */
export interface AdapterConfig {
  /** Default adapter library to use */
  defaultLibrary: AdapterLibrary;
  /** Library-specific configurations */
  libraries: {
    [K in AdapterLibrary]?: {
      /** Whether this library is enabled */
      enabled: boolean;
      /** Library-specific theme overrides */
      theme?: Record<string, any>;
      /** Custom component overrides */
      overrides?: Record<string, React.ComponentType<any>>;
    };
  };
  /** Component-specific adapter preferences */
  components?: Record<string, {
    /** Preferred library for this component */
    preferredLibrary?: AdapterLibrary;
    /** Component-specific props */
    defaultProps?: Record<string, any>;
  }>;
}

/**
 * Adapter context type
 */
export interface AdapterContextType {
  /** Current adapter configuration */
  config: AdapterConfig;
  /** Update adapter configuration */
  updateConfig: (config: Partial<AdapterConfig>) => void;
  /** Get component with preferred adapter */
  getComponent: <T extends AdapterProps>(
    name: string,
    props?: T
  ) => React.ComponentType<T> | null;
  /** Check if adapter library is available */
  isLibraryAvailable: (library: AdapterLibrary) => boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Extract adapter props from a component type
 */
export type ExtractAdapterProps<T> = T extends AdapterComponent<infer P> ? P : never;

/**
 * Make adapter props optional
 */
export type OptionalAdapterProps<T extends AdapterProps> = Omit<T, 'adapter'> & {
  adapter?: AdapterLibrary;
};

/**
 * Adapter component factory type
 */
export type AdapterComponentFactory<T extends AdapterProps> = (
  adapters: Partial<Record<AdapterLibrary, React.ComponentType<T>>>
) => AdapterComponent<T>;

/**
 * Adapter middleware function type
 */
export type AdapterMiddleware<T extends AdapterProps = AdapterProps> = (
  props: T,
  library: AdapterLibrary,
  next: (props: T) => React.ReactElement
) => React.ReactElement;