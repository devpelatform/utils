/**
 * Utility function for regular expression handling
 * Provides safe string escaping for use in regular expressions
 */

/**
 * Escapes special characters in a string for use in a regular expression
 * Ensures that special regex characters are treated as literals
 * Based on: https://stackoverflow.com/a/6969486
 *
 * @param str - The string to escape for regex use
 * @returns A string with all regex special characters escaped
 *
 * @example
 * ```ts
 * import { regexEscape } from '@/utils/functions';
 *
 * // Basic usage
 * regexEscape('hello.world')
 * // Returns "hello\.world"
 *
 * // Escaping special characters
 * regexEscape('(test)[123]+?')
 * // Returns "\(test\)\[123\]\+\?"
 *
 * // Creating a safe regex from user input
 * const userInput = 'user.input+';
 * const safeRegex = new RegExp(regexEscape(userInput));
 * // Creates a regex that matches the literal string "user.input+"
 *
 * // Using in string replacement
 * const text = "Hello (world)";
 * const searchTerm = "(world)";
 * text.replace(new RegExp(regexEscape(searchTerm)), "everyone");
 * // Returns "Hello everyone"
 * ```
 */
export function regexEscape(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
