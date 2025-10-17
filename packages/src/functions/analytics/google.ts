/**
 * Google Analytics tracking utilities for React applications
 * Provides comprehensive event tracking with validation and error handling
 * Supports GA4 event structure and CRUD operations tracking
 *
 * DIFFERENCE FROM HOOKS/USE-ANALYTICS:
 * - This lib provides standalone utility functions for direct event tracking
 * - use-analytics hook provides React-specific state management and lifecycle integration
 * - This lib is for simple, direct GA tracking without React context
 * - use-analytics hook is for complex SaaS module tracking with React integration
 *
 * USE CASES:
 * - Use this lib for: Simple event tracking, non-React contexts, utility functions
 * - Use hooks for: Complex SaaS tracking, React components, state-dependent tracking
 */

import { logger } from '../logging';

/**
 * Interface for event tracking parameters
 * Defines the structure for tracking events in Google Analytics
 */
interface EventProps {
  /** Event name to be tracked (required, non-empty string) */
  name: string;
  /** Optional properties/attributes for the event */
  properties?: Record<string, string | number | boolean>;
}

/**
 * Global declaration for Google Analytics gtag function
 * This extends the Window interface to include the gtag function
 * that's injected by the Google Analytics script
 */
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, string | number | boolean | object | null | undefined>,
    ) => void;
  }
}

/**
 * Tracks an event in Google Analytics with proper error handling and validation.
 *
 * @param params - Event parameters
 * @param params.name - Event name (required, non-empty string)
 * @param params.properties - Optional event properties
 */
export const googleTrackEvent = ({ name, properties }: EventProps) => {
  // Validate required parameters
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    logger.warn('Analytics: Event name is required and must be a non-empty string');
    return;
  }

  // Validate properties if provided
  if (properties && typeof properties !== 'object') {
    logger.warn('Analytics: Properties must be an object');
    return;
  }

  try {
    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      // GA4 recommended event structure
      window.gtag('event', name.trim(), {
        ...properties,
        // GA4 recommended parameters
        event_category: properties?.category || 'engagement',
        event_label: properties?.label,
        value: properties?.value,
      });
    }
  } catch (error) {
    logger.error('Analytics: Failed to track event', { name, error });
  }
};

/**
 * Helper function to safely get component name from path.
 *
 * @param componentPath - Component path string
 * @returns Component name or original path if invalid
 */
const getComponentName = (componentPath: string): string => {
  if (!componentPath || typeof componentPath !== 'string') {
    return 'unknown';
  }

  const parts = componentPath.trim().split('/');
  return parts.length > 1 ? parts[0] : componentPath.trim();
};

/**
 * Tracks code copy events with validation.
 *
 * @param componentPath - Path of the component where code was copied
 */
export const googleTrackCodeCopy = (componentPath: string) => {
  if (!componentPath || typeof componentPath !== 'string') {
    logger.warn('Analytics: componentPath is required for trackCodeCopy');
    return;
  }

  const componentName = getComponentName(componentPath);
  googleTrackEvent({
    name: 'doc_copy',
    properties: {
      component_name: componentName,
      content_type: 'code',
      category: 'engagement',
      label: `Code Copy - ${componentPath.trim()}`,
    },
  });
};

/**
 * Tracks theme mode changes with validation.
 *
 * @param componentPath - Path of the component where theme was changed
 * @param newTheme - New theme mode ('dark' or 'light')
 */
export const googleTrackThemeChange = (componentPath: string, newTheme: 'dark' | 'light') => {
  if (!componentPath || typeof componentPath !== 'string') {
    logger.warn('Analytics: componentPath is required for trackThemeChange');
    return;
  }

  if (!newTheme || !['dark', 'light'].includes(newTheme)) {
    logger.warn('Analytics: newTheme must be either "dark" or "light"');
    return;
  }

  const componentName = getComponentName(componentPath);
  googleTrackEvent({
    name: 'doc_select_theme',
    properties: {
      component_name: componentName,
      theme_mode: newTheme,
      category: 'engagement',
      label: `Theme Change - ${componentPath.trim()}`,
    },
  });
};

/**
 * Tracks text direction changes with validation.
 *
 * @param componentPath - Path of the component where direction was changed
 * @param newDirection - New text direction ('rtl' or 'ltr')
 */
export const googleTrackDirectionChange = (componentPath: string, newDirection: 'rtl' | 'ltr') => {
  if (!componentPath || typeof componentPath !== 'string') {
    logger.warn('Analytics: componentPath is required for trackDirectionChange');
    return;
  }

  if (!newDirection || !['rtl', 'ltr'].includes(newDirection)) {
    logger.warn('Analytics: newDirection must be either "rtl" or "ltr"');
    return;
  }

  const componentName = getComponentName(componentPath);
  googleTrackEvent({
    name: 'doc_select_direction',
    properties: {
      component_name: componentName,
      text_direction: newDirection,
      category: 'engagement',
      label: `Direction Change - ${componentPath.trim()}`,
    },
  });
};

/**
 * Tracks view mode changes with validation.
 *
 * @param componentPath - Path of the component where view was changed
 * @param newView - New view mode ('preview' or 'code')
 */
export const googleTrackViewChange = (componentPath: string, newView: 'preview' | 'code') => {
  if (!componentPath || typeof componentPath !== 'string') {
    logger.warn('Analytics: componentPath is required for trackViewChange');
    return;
  }

  if (!newView || !['preview', 'code'].includes(newView)) {
    logger.warn('Analytics: newView must be either "preview" or "code"');
    return;
  }

  const componentName = getComponentName(componentPath);
  googleTrackEvent({
    name: 'doc_select_view',
    properties: {
      component_name: componentName,
      view_mode: newView,
      category: 'engagement',
      label: `View Change - ${componentPath.trim()}`,
    },
  });
};

/**
 * Tracks item creation events with validation.
 *
 * @param module - Module name where item was created
 * @param itemType - Type of item created
 * @param itemId - Optional ID of the created item
 */
export const googleTrackItemCreate = (
  module: string,
  itemType: string,
  itemId?: string | number,
) => {
  if (!module || typeof module !== 'string' || module.trim().length === 0) {
    logger.warn('Analytics: module is required for trackItemCreate');
    return;
  }

  if (!itemType || typeof itemType !== 'string' || itemType.trim().length === 0) {
    logger.warn('Analytics: itemType is required for trackItemCreate');
    return;
  }

  googleTrackEvent({
    name: 'crud_create',
    properties: {
      module: module.trim(),
      item_type: itemType.trim(),
      ...(itemId && { item_id: itemId.toString() }),
      category: 'crud',
      label: `Create ${itemType.trim()} - ${module.trim()}`,
    },
  });
};

/**
 * Tracks item view/read events with validation.
 *
 * @param module - Module name where item was viewed
 * @param itemType - Type of item viewed
 * @param itemId - ID of the viewed item
 */
export const googleTrackItemView = (module: string, itemType: string, itemId: string | number) => {
  if (!module || typeof module !== 'string' || module.trim().length === 0) {
    logger.warn('Analytics: module is required for trackItemView');
    return;
  }

  if (!itemType || typeof itemType !== 'string' || itemType.trim().length === 0) {
    logger.warn('Analytics: itemType is required for trackItemView');
    return;
  }

  if (itemId === undefined || itemId === null || itemId === '') {
    logger.warn('Analytics: itemId is required for trackItemView');
    return;
  }

  googleTrackEvent({
    name: 'crud_view',
    properties: {
      module: module.trim(),
      item_type: itemType.trim(),
      item_id: itemId.toString(),
      category: 'crud',
      label: `View ${itemType.trim()} - ${module.trim()}`,
    },
  });
};

/**
 * Tracks item update events with validation.
 *
 * @param module - Module name where item was updated
 * @param itemType - Type of item updated
 * @param itemId - ID of the updated item
 */
export const googleTrackItemUpdate = (
  module: string,
  itemType: string,
  itemId: string | number,
) => {
  if (!module || typeof module !== 'string' || module.trim().length === 0) {
    logger.warn('Analytics: module is required for trackItemUpdate');
    return;
  }

  if (!itemType || typeof itemType !== 'string' || itemType.trim().length === 0) {
    logger.warn('Analytics: itemType is required for trackItemUpdate');
    return;
  }

  if (itemId === undefined || itemId === null || itemId === '') {
    logger.warn('Analytics: itemId is required for trackItemUpdate');
    return;
  }

  googleTrackEvent({
    name: 'crud_update',
    properties: {
      module: module.trim(),
      item_type: itemType.trim(),
      item_id: itemId.toString(),
      category: 'crud',
      label: `Update ${itemType.trim()} - ${module.trim()}`,
    },
  });
};

/**
 * Tracks item delete events with validation.
 *
 * @param module - Module name where item was deleted
 * @param itemType - Type of item deleted
 * @param itemId - ID of the deleted item
 * @param isHardDelete - Whether this is a hard delete (permanent) or soft delete
 */
export const googleTrackItemDelete = (
  module: string,
  itemType: string,
  itemId: string | number,
  isHardDelete: boolean = false,
) => {
  if (!module || typeof module !== 'string' || module.trim().length === 0) {
    logger.warn('Analytics: module is required for trackItemDelete');
    return;
  }

  if (!itemType || typeof itemType !== 'string' || itemType.trim().length === 0) {
    logger.warn('Analytics: itemType is required for trackItemDelete');
    return;
  }

  if (itemId === undefined || itemId === null || itemId === '') {
    logger.warn('Analytics: itemId is required for trackItemDelete');
    return;
  }

  googleTrackEvent({
    name: 'crud_delete',
    properties: {
      module: module.trim(),
      item_type: itemType.trim(),
      item_id: itemId.toString(),
      delete_type: isHardDelete ? 'hard' : 'soft',
      category: 'crud',
      label: `Delete ${itemType.trim()} - ${module.trim()}`,
    },
  });
};

/**
 * Tracks item restore events with validation.
 *
 * @param module - Module name where item was restored
 * @param itemType - Type of item restored
 * @param itemId - ID of the restored item
 */
export const googleTrackItemRestore = (
  module: string,
  itemType: string,
  itemId: string | number,
) => {
  if (!module || typeof module !== 'string' || module.trim().length === 0) {
    logger.warn('Analytics: module is required for trackItemRestore');
    return;
  }

  if (!itemType || typeof itemType !== 'string' || itemType.trim().length === 0) {
    logger.warn('Analytics: itemType is required for trackItemRestore');
    return;
  }

  if (itemId === undefined || itemId === null || itemId === '') {
    logger.warn('Analytics: itemId is required for trackItemRestore');
    return;
  }

  googleTrackEvent({
    name: 'crud_restore',
    properties: {
      module: module.trim(),
      item_type: itemType.trim(),
      item_id: itemId.toString(),
      category: 'crud',
      label: `Restore ${itemType.trim()} - ${module.trim()}`,
    },
  });
};
