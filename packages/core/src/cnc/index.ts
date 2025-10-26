/**
 * CNC-Specific Components
 * Components designed specifically for CNC machine control interfaces
 */

export { JogControls } from './JogControls';
export { JogSpeedControl, JogDistanceControl } from './JogSpeedControl';
export { SafetyControlPanel } from './EmergencyStop';
export { CoordinateDisplay, CompactCoordinateDisplay } from './CoordinateDisplay';
export { StatusIndicator, ConnectionStatus, StatusDashboard } from './StatusIndicators';
export { default as MachineDisplay2D } from './MachineDisplay2D';
// export { default as WorkingAreaPreview } from './WorkingAreaPreview'; // Disabled - causes React reconciler issues

export type { JogControlsProps } from './JogControls';
export type { SafetyControlPanelProps } from './EmergencyStop';
export type { Coordinate, CoordinateDisplayProps, CompactCoordinateDisplayProps } from './CoordinateDisplay';
export type { MachineStatus, StatusIndicatorProps, ConnectionStatusProps, StatusDashboardProps } from './StatusIndicators';