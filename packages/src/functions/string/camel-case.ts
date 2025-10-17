/**
 * Utility function for string case conversion
 * Provides conversion from snake_case to camelCase format
 */

/**
 * Converts a string from snake_case to camelCase format
 * If the string is already in camelCase, it will be returned unchanged
 *
 * @param str - The string to convert to camelCase
 * @returns The camelCase version of the input string
 *
 * @example
 * ```ts
 * // Convert snake_case to camelCase
 * toCamelCase('user_name')
 * // Returns "userName"
 *
 * // Already camelCase strings remain unchanged
 * toCamelCase('userName')
 * // Returns "userName"
 *
 * // Multi-word snake_case strings
 * toCamelCase('first_name_last_name')
 * // Returns "firstNameLastName"
 *
 * // Handles single-word strings
 * toCamelCase('user')
 * // Returns "user"
 * ```
 */
export const toCamelCase = (str: string): string => {
  // If already camelCase, return as is
  if (/^[a-z][a-zA-Z0-9]*$/.test(str)) {
    return str;
  }

  // Convert snake_case to camelCase
  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
