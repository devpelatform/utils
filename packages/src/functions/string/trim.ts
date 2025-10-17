/**
 * Utility function for safe string trimming
 * Provides type-safe trimming that handles non-string inputs gracefully
 */

/**
 * Safely trims a string value, returning non-string values unchanged
 * Useful for processing user input or data from external sources
 *
 * @param u - The value to trim, can be any type
 * @returns The trimmed string if input is a string, otherwise the original value
 *
 * @example
 * ```ts
 * import { trim } from '@/utils/functions';
 *
 * // With string input
 * trim('  hello world  ')
 * // Returns "hello world"
 *
 * // With non-string input
 * trim(123)
 * // Returns 123 (unchanged)
 *
 * trim(null)
 * // Returns null (unchanged)
 *
 * // Useful for processing form data
 * const processFormData = (data: Record<string, unknown>) => {
 *   return Object.fromEntries(
 *     Object.entries(data).map(([key, value]) => [key, trim(value)])
 *   );
 * };
 * ```
 */
export const trim = (u: unknown): unknown => (typeof u === 'string' ? u.trim() : u);
