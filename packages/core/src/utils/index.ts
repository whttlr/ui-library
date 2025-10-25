// Import cn from theme package
export { cn } from '@whttlr/ui-theme';

// Export legacy tokens for backward compatibility with CNC components
export { tokens as legacyTokens } from './tokens';

// Export design token utilities (excluding tokens object to avoid conflict with new tokens from src/tokens)
export {
  // Button styles
  getButtonVariantStyles,
  getButtonSizeStyles,
  getButtonBaseStyles,
  getInteractiveStates,
  // Card styles
  getCardVariantStyles,
  getCardSizeStyles,
  getCardBaseStyles,
  // Input styles
  getInputVariantStyles,
  getInputSizeStyles,
  getInputBaseStyles,
  getInputFocusStyles,
  getInputDisabledStyles,
  // Badge styles
  getBadgeVariantStyles,
  getBadgeSizeStyles,
  getBadgeBaseStyles,
  getBadgeIndicatorColor,
  // Layout styles
  getGridGapStyles,
  getFlexGapStyles,
  getContainerSizeStyles,
  getContainerPaddingStyles,
  getStackSpacingStyles,
  // Typography styles
  getTypographyColorStyles,
  getTypographyVariantStyles,
  getTypographyGradientStyles,
  // Progress styles
  getProgressVariantStyles,
  getProgressSizeStyles,
  getProgressTrackStyles,
  getProgressFillStyles,
  // Skeleton styles
  getSkeletonVariantStyles,
  getSkeletonSizeStyles,
  // Alert styles
  getAlertVariantStyles,
  getAlertSizeStyles,
  getAlertLayoutStyles,
  getAlertBaseStyles,
  // Tooltip styles
  getTooltipVariantStyles,
  getTooltipSizeStyles,
  getTooltipBaseStyles,
  getTooltipPositionStyles,
  // Modal styles
  getModalSizeStyles,
  getModalBaseStyles,
  getModalOverlayStyles,
  getModalHeaderStyles,
  getModalContentStyles,
  // Slider styles
  getSliderVariantStyles,
  getSliderTrackStyles,
  getSliderThumbStyles,
  getSliderFillStyles,
  // CNC-specific colors and styles
  getCNCAxisColor,
  getCNCAxisColorSleek,
  getCNCStatusColor,
  getCNCPrecisionBadgeStyles,
  getCoordinateDisplayVariantStyles,
  getCoordinateInputSizeStyles,
  getCNCInputBaseStyles,
  getCNCLockedInputStyles,
  getJogControlsVariantStyles,
  getEmergencyStopSizeStyles,
  getEmergencyStopStateStyles,
  getEmergencyStopBaseStyles,
  // Status indicator styles
  getStatusIndicatorStatusColor,
  getStatusIndicatorBackgroundColor,
  getStatusIndicatorBorderColor,
  getStatusIndicatorSizeStyles,
  getStatusIndicatorVariantStyles,
  getStatusIndicatorDotStyles,
  getStatusIndicatorGroupStyles,
  getStatusIndicatorCardStyles,
  getStatusIndicatorCardTitleStyles,
  // Monospace text styles
  getMonospaceTextSizeStyles,
  getMonospaceTextVariantStyles,
  getMonospaceTextBaseStyles,
  getMonospaceTextUnitStyles,
  // Tabs styles
  getTabsSizeStyles,
  getTabsListStyles,
  getTabsButtonStyles,
  getTabsBadgeStyles,
  getTabsContentStyles,
  // Toggle styles
  getToggleSizeStyles,
  getToggleColorStyles,
  getToggleButtonStyles,
  getToggleTrackStyles,
  getToggleThumbStyles,
  getToggleLabelStyles,
  getToggleDescriptionStyles,
  // Accordion styles
  getAccordionItemStyles,
  getAccordionHeaderStyles,
  getAccordionTitleStyles,
  getAccordionIconStyles,
  getAccordionContentStyles,
  // Collapse styles
  getCollapseHeaderStyles,
  getCollapseContentStyles,
  getCollapseIconStyles,
  getCollapseTitleStyles,
  // Form field styles
  getFormFieldLabelStyles,
  getFormFieldHelpTextStyles,
  getFormFieldRequiredStyles,
  // Select styles
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
  // Drawer styles
  getDrawerBaseStyles,
  getDrawerOverlayStyles,
  getDrawerSizeStyles,
  getDrawerPositionStyles,
  getDrawerHeaderStyles,
  getDrawerTitleStyles,
  getDrawerCloseButtonStyles,
  getDrawerContentStyles,
  // Notification styles
  getNotificationTypeColor,
  getNotificationItemStyles,
  getNotificationTextStyles,
  // Skeleton advanced styles
  getSkeletonCardStyles,
  getSkeletonTableStyles,
  getSkeletonTableHeaderStyles,
  getSkeletonTableRowStyles,
  getSkeletonShimmerGradient,
  getProgressStripedPattern,
  getSliderThumbHoverShadow,
  getSliderThumbActiveShadow,
  // Popover styles
  getPopoverBaseStyles,
  getPopoverArrowColors,
  // Upload styles
  getUploadDropzoneStyles,
  getUploadIconStyles,
  getUploadTitleStyles,
  getUploadDescriptionStyles,
  getUploadFileItemStyles,
  getUploadFileInfoStyles,
  getUploadFileNameStyles,
  getUploadFileSizeStyles,
  getUploadProgressBarStyles,
  getUploadProgressBarColor,
  getUploadStatusIconColor,
  getUploadInfoTextStyles,
  // CNC canvas styles
  getCNCMinorGridColor,
  getCNCMajorGridColor,
  getCNCWorkAreaBoundaryColor,
  getCNCCoordinateAxisColor,
  getCNCOriginMarkerColor,
  getCNCToolTrailColor,
  getCNCCurrentToolColor,
  getCNCPositionLabelColor,
  getCNCAxisLabelColor,
  getCNCCanvasBackgroundColor,
  getCNCMeshColors,
  getCNCCanvasFontStyles,
  getCNCCheckboxStyles,
  getCNCSliderStyles,
  // Chart styles
  getChartLoadingStyles,
  getChartLoadingSpinnerStyles,
  getChartLoadingTextStyles,
  getChartErrorContainerStyles,
  getChartErrorIconStyles,
  getChartErrorTitleStyles,
  getChartErrorTextStyles,
  getChartEmptyStateContainerStyles,
  getChartEmptyStateIconStyles,
  getChartEmptyStateTextStyles,
  getChartTitleStyles,
  getChartSubtitleStyles,
  getChartTooltipStyles,
  getChartGridColor,
  getChartAxisColor,
  getChartPrimaryColor,
  getChartFontSize,
  // Misc utility styles
  getPlaceholderComponentStyles,
  getPlaceholderComponentTextStyles,
  getDebugBadgeStyles,
  // DataTable styles
  getDataTableBaseStyles,
  getDataTableHeaderCellStyles,
  getDataTableCellStyles,
  getDataTableRowStyles,
  getDataTableRowHoverStyles,
  getDataTableSearchInputStyles,
  getDataTableSearchInputFocusStyles,
  getDataTableSearchIconStyles,
  getDataTableCheckboxStyles,
  getDataTableCheckboxHoverStyles,
  getSortIconStyles,
  getDataTableEmptyStateStyles,
  getDataTablePaginationInfoStyles,
  getDataTableFilterContainerStyles,
  getDataTableSearchContainerStyles,
  getDataTableSearchIconContainerStyles,
  getDataTableActionsCellStyles,
  getDataTableHeaderContainerStyles,
  getDataTableSortContainerStyles,
  getDataTablePaginationContainerStyles,
  getDataTablePaginationButtonGroupStyles,
  // Animated component styles
  getAnimatedCardShadowStyles,
  getAnimatedCardGlowKeyframes,
  getAnimatedCardContainerStyles,
  // FAB styles
  getFABSizeStyles,
  getFABColorStyles,
  getFABPositionStyles,
  getFABShadowStyles,
  getFABBaseStyles,
  getFABBadgeStyles,
} from './tokens';

// Utility functions
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};