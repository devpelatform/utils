/**
 * CUID (Collision-resistant Unique IDentifier) generation utilities
 * Provides functions for generating unique identifiers using @paralleldrive/cuid2
 */

import { createId, init } from '@paralleldrive/cuid2';

export { createId, init as initCuid };

/**
 * Generates a CUID (Collision-resistant Unique IDentifier)
 * CUIDs are designed to be globally unique, even in distributed systems.
 * They are based on the current time, a random component, and a counter.
 * Perfect for database IDs, session tokens, and any scenario requiring unique identifiers.
 *
 * @returns A CUID string
 *
 * @example
 * ```ts
 * import { cuid } from '@/utils/functions';
 *
 * // Generate a CUID
 * const id = cuid();
 * // Returns: 'clhqxr8kj0000qzrmn5t8b123'
 *
 * // Use as unique identifiers
 * const userId = cuid();
 * const sessionId = cuid();
 * const transactionId = cuid();
 *
 * // Use in database models
 * const user = {
 *   id: cuid(),
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * };
 *
 * // Use for temporary files
 * const tempFileName = `temp_${cuid()}.json`;
 * ```
 */
export function cuid() {
  return createId();
}

/**
 * Generates a custom ID with an optional prefix and configurable length
 * This function uses `@paralleldrive/cuid2` to create unique identifiers
 * with an optional prefix. Useful for creating IDs with specific patterns
 * like `user_abc123` or `order_987xyz`.
 *
 * @param prefix - Optional prefix to prepend to the ID
 * @param length - The length of the generated ID (default is 12)
 * @returns A unique custom ID string
 *
 * @example
 * ```ts
 * import { customeId } from '@/utils/functions';
 *
 * // Generate ID with prefix
 * const userId = customeId('user_');
 * // Returns: 'user_l5r8xn2gzqnb'
 *
 * // Generate ID with custom length
 * const orderId = customeId('order_', 16);
 * // Returns: 'order_l5r8xn2gzqnbf4r2'
 *
 * // Generate ID without prefix
 * const randomId = customeId();
 * // Returns: 'l5r8xn2gzqnb'
 *
 * // Use for different entity types
 * const productId = customeId('prod_', 8);
 * const invoiceId = customeId('inv_', 10);
 * const sessionId = customeId('sess_', 20);
 *
 * // Use in API responses
 * const apiResponse = {
 *   id: customeId('api_'),
 *   timestamp: Date.now(),
 *   data: {...}
 * };
 * ```
 */
export function customeId(prefix?: string, length: number = 12) {
  const generateId = init({
    random: Math.random,
    length,
  });

  return `${prefix || ''}${generateId()}`;
}
