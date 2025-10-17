/**
 * Utility function for generating unique IDs
 * Provides a wrapper around nanoid for consistent ID generation
 */

import { customAlphabet } from 'nanoid';

/**
 * Generates a random alphanumeric ID of specified length
 * Uses a custom alphabet of numbers and letters (both cases)
 *
 * @param chars - The length of the ID to generate (default: 7)
 * @returns A random alphanumeric string of the specified length
 *
 * @example
 * ```ts
 * import { nanoid } from '@/utils/functions';
 *
 * // Generate default 7-character ID
 * const id = nanoid();
 * // Example output: "a1B2c3D"
 *
 * // Generate custom length ID
 * const longerId = nanoid(12);
 * // Example output: "a1B2c3D4e5F6"
 *
 * // Use as unique identifiers
 * const userId = nanoid();
 * const sessionId = nanoid(10);
 * ```
 */
export const nanoid = (chars?: number): string => {
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    chars || 7, // 7-character random string by default
  )();
};

/**
 * Generates a unique identifier using the current timestamp and a random number
 *
 * This function creates a simple unique ID by combining the current timestamp
 * with a random number. While not cryptographically secure, it's suitable for
 * most UI purposes like generating keys for React components.
 *
 * @returns A string representing the unique ID
 *
 * @example
 * ```typescript
 * // Generate unique IDs for React keys
 * const items = data.map(item => ({
 *   ...item,
 *   id: uid()
 * }));
 *
 * // Generate unique form field IDs
 * const fieldId = uid();
 * <input id={fieldId} />
 * <label htmlFor={fieldId}>Label</label>
 *
 * // Generate unique component keys
 * {items.map(item => (
 *   <Component key={uid()} {...item} />
 * ))}
 * ```
 */
export function uid(): string {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString();
}
