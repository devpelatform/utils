/**
 * Browser storage utilities for React applications
 * Provides type-safe localStorage and sessionStorage operations
 * with SSR compatibility and error handling
 */

import { logger } from '../logging';

/**
 * Type representing browser storage options
 * Either localStorage (persists across sessions) or sessionStorage (cleared on tab close)
 */
type StorageType = 'localStorage' | 'sessionStorage';

/**
 * Gets the appropriate Storage object based on the requested type
 *
 * @param storageType - Which storage type to use
 * @returns The Storage object or null if running in a non-browser environment
 */
const getStorageObject = (storageType: StorageType): Storage | null => {
  if (typeof window === 'undefined') return null;
  return storageType === 'localStorage' ? localStorage : sessionStorage;
};

/**
 * Retrieves data from browser storage with type safety
 *
 * @template T - The expected type of the stored data
 * @param key - The storage key to retrieve
 * @param storageType - Which storage to use (defaults to localStorage)
 * @param defaultValue - Value to return if key doesn't exist or on error
 * @returns The parsed data with type T, defaultValue, or undefined
 *
 * @example
 * ```typescript
 * // Get with type safety
 * const user = getStorageItem<User>('user');
 *
 * // With default value
 * const theme = getStorageItem<'light' | 'dark'>('theme', 'localStorage', 'light');
 *
 * // From session storage
 * const tempData = getStorageItem('tempData', 'sessionStorage');
 * ```
 */
const getStorageItem = <T = unknown>(
  key: string,
  storageType: StorageType = 'localStorage',
  defaultValue?: T,
): T | undefined => {
  try {
    const storage = getStorageObject(storageType);
    if (!storage) return defaultValue;

    const data = storage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return defaultValue;
  } catch (error) {
    logger.error(`Read from ${storageType}`, error);
    return defaultValue;
  }
};

/**
 * Saves data to browser storage
 *
 * @param key - The storage key to set
 * @param value - The value to store (will be JSON stringified)
 * @param storageType - Which storage to use (defaults to localStorage)
 *
 * @example
 * ```typescript
 * // Save to localStorage
 * setStorageItem('user', { id: 1, name: 'John' });
 *
 * // Save to sessionStorage
 * setStorageItem('tempData', data, 'sessionStorage');
 * ```
 */
const setStorageItem = (
  key: string,
  value: unknown,
  storageType: StorageType = 'localStorage',
): void => {
  try {
    const storage = getStorageObject(storageType);
    if (!storage) return;

    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(`Save in ${storageType}`, error);
  }
};

/**
 * Removes data from browser storage
 *
 * @param key - The storage key to remove
 * @param storageType - Which storage to use (defaults to localStorage)
 *
 * @example
 * ```typescript
 * // Remove from localStorage
 * removeStorageItem('user');
 *
 * // Remove from sessionStorage
 * removeStorageItem('tempData', 'sessionStorage');
 * ```
 */
const removeStorageItem = (key: string, storageType: StorageType = 'localStorage'): void => {
  try {
    const storage = getStorageObject(storageType);
    if (!storage) return;

    storage.removeItem(key);
  } catch (error) {
    logger.error(`Remove from ${storageType}`, error);
  }
};

/**
 * Clears all data from the specified storage
 *
 * @param storageType - Which storage to clear (defaults to localStorage)
 *
 * @example
 * ```typescript
 * // Clear all localStorage
 * clearStorage();
 *
 * // Clear all sessionStorage
 * clearStorage('sessionStorage');
 * ```
 */
const clearStorage = (storageType: StorageType = 'localStorage'): void => {
  try {
    const storage = getStorageObject(storageType);
    if (!storage) return;

    storage.clear();
  } catch (error) {
    logger.error(`Clear ${storageType}`, error);
  }
};

/**
 * Checks if a key exists in browser storage
 *
 * @param key - The storage key to check
 * @param storageType - Which storage to use (defaults to localStorage)
 * @returns Boolean indicating if the key exists
 *
 * @example
 * ```typescript
 * if (hasStorageItem('user')) {
 *   // User data exists in localStorage
 * }
 *
 * if (hasStorageItem('session', 'sessionStorage')) {
 *   // Session data exists in sessionStorage
 * }
 * ```
 */
const hasStorageItem = (key: string, storageType: StorageType = 'localStorage'): boolean => {
  try {
    const storage = getStorageObject(storageType);
    if (!storage) return false;

    return storage.getItem(key) !== null;
  } catch (error) {
    logger.error(`Check ${storageType}`, error);
    return false;
  }
};

export {
  // Enhanced functions
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  hasStorageItem,
  // Types
  type StorageType,
};
