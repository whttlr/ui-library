// UI Controls Module - Public API

// Jog Controls
export * from './JogControls';

// Coordinate Display
export * from './CoordinateDisplay';

// Status Indicators
export * from './StatusIndicators';

// Emergency Stop
export * from './EmergencyStop';

// Spindle Speed Control
export * from './SpindleSpeedControl';

// Feed Rate Override
export * from './FeedRateOverride';

// Tool Selector
export * from './ToolSelector';

// G-Code Viewer
export * from './GCodeViewer';

// Machine Coordinate System
export * from './MachineCoordinateSystem';

// Program Control
export * from './ProgramControl';

// Alarm Display
export * from './AlarmDisplay';

// Macro Buttons
export * from './MacroButtons';

// Probe Control
export * from './ProbeControl';

// Re-export commonly used types
export type { JogControlsProps, JogSpeedControlProps, JogDistanceControlProps } from './JogControls';
export type {
  CoordinateDisplayProps, Coordinate, CompactCoordinateDisplayProps, LiveCoordinateDisplayProps,
} from './CoordinateDisplay';
export type {
  MachineStatus, StatusIndicatorProps, ConnectionStatusProps, StatusDashboardProps, AlertBannerProps,
} from './StatusIndicators';
export type { EmergencyStopProps, CompactEmergencyStopProps, SafetyControlPanelProps } from './EmergencyStop';
export type { SpindleSpeedControlProps, CompactSpindleControlProps } from './SpindleSpeedControl';
export type { FeedRateOverrideProps, CompactFeedRateOverrideProps } from './FeedRateOverride';
export type { ToolSelectorProps, CompactToolSelectorProps, Tool } from './ToolSelector';
export type { GCodeViewerProps, CompactGCodeViewerProps, GCodeLine } from './GCodeViewer';
export type { MachineCoordinateSystemProps, CompactCoordinateSystemProps, WorkOffset } from './MachineCoordinateSystem';
export type { ProgramControlProps, CompactProgramControlProps, ProgramState } from './ProgramControl';
export type { AlarmDisplayProps, CompactAlarmDisplayProps, Alarm } from './AlarmDisplay';
export type { MacroButtonsProps, CompactMacroButtonsProps, MacroButton } from './MacroButtons';
export type { ProbeControlProps, CompactProbeControlProps, ProbeSettings, ProbeResult } from './ProbeControl';
