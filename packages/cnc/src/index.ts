/**
 * CNC Components Library
 * 
 * Industrial-grade CNC control components for machine operation and monitoring
 */

// Control Components
export * from './controls';

// Form Components  
export * from './forms';

// Visualization Components
// export * from './visualization'; // Temporarily disabled - causes React reconciler issues

// Mobile Components
export * from './mobile';

// Validation Utilities
export * from './validation';

// Re-export main components for convenience
export {
  JogControls,
  CoordinateDisplay,
  EmergencyStop,
  ConnectionStatus
} from './controls';

export {
  MachineSetupForm,
  JobSetupForm,
  QuickJogForm
} from './forms';

// export {
//   MachineDisplay2D,
//   WorkingAreaPreview
// } from './visualization'; // Temporarily disabled - causes React reconciler issues

export {
  MobileControlsView
} from './mobile';