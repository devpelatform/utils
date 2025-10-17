/**
 * Performance debouncing utilities
 * Provides functions for delaying function execution until after a specified delay
 */

/**
 * Debounces a function to delay its execution until after a specified delay
 * Debouncing delays the execution of a function until after a specified time
 * has passed since the last time it was invoked. This is useful for scenarios
 * like search input where you want to wait for the user to stop typing.
 *
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 * @returns A debounced version of the provided function
 *
 * @example
 * ```ts
 * import { debounce } from '@/utils/functions';
 *
 * // Debounce search input
 * const debouncedSearch = debounce((query: string) => {
 *   performSearch(query);
 * }, 500);
 *
 * // Use in input handler
 * const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
 *   debouncedSearch(e.target.value);
 * };
 *
 * // Debounce window resize
 * const debouncedResize = debounce(() => {
 *   handleWindowResize();
 *   recalculateLayout();
 * }, 250);
 *
 * window.addEventListener('resize', debouncedResize);
 *
 * // Debounce form validation
 * const debouncedValidate = debounce((formData: FormData) => {
 *   validateForm(formData);
 * }, 300);
 *
 * // Debounce auto-save
 * const debouncedSave = debounce(() => {
 *   saveDocument();
 * }, 2000);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
