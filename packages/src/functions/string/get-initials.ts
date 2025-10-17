/**
 * String initials extraction utilities
 * Provides functions for extracting initials from names for avatars and displays
 */

/**
 * Extracts initials from a given name with customizable count
 * Takes a full name and extracts the first letter of each word to create initials.
 * Useful for avatar placeholders, user displays, and profile components.
 *
 * @param name - The full name to extract initials from
 * @param count - The number of initials to return (defaults to all initials)
 * @returns A string of initials from the name
 *
 * @example
 * ```ts
 * import { getInitials } from '@/utils/functions';
 *
 * // Basic usage
 * const initials1 = getInitials('John Doe');
 * // Returns: 'JD'
 *
 * const initials2 = getInitials('John Michael Doe');
 * // Returns: 'JMD'
 *
 * // Limit number of initials
 * const initials3 = getInitials('John Michael Doe', 2);
 * // Returns: 'JM'
 *
 * const initials4 = getInitials('John Doe', 1);
 * // Returns: 'J'
 *
 * // Handle edge cases
 * const empty1 = getInitials('');
 * // Returns: ''
 *
 * const empty2 = getInitials(null);
 * // Returns: ''
 *
 * const single = getInitials('John');
 * // Returns: 'J'
 *
 * // Use in avatar component
 * const Avatar = ({ name }: { name: string }) => (
 *   <div className="avatar">
 *     {getInitials(name, 2)}
 *   </div>
 * );
 * ```
 */
export const getInitials = (name: string | null | undefined, count?: number): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase());

  return count && count > 0 ? initials.slice(0, count).join('') : initials.join('');
};
