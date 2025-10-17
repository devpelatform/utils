/**
 * Performance throttling utilities
 * Provides functions for limiting function execution frequency to improve performance
 */

/**
 * Throttles a function to limit its execution to once every specified duration
 * Throttling ensures that a function is called at most once in a specified time period.
 * This is useful for performance optimization, especially for events that fire frequently
 * like scroll, resize, or mousemove events.
 *
 * @param func - The function to throttle
 * @param limit - The minimum delay in milliseconds between calls
 * @returns A throttled version of the provided function
 *
 * @example
 * ```ts
 * import { throttle } from '@/utils/functions';
 *
 * // Throttle scroll event handler
 * const handleScroll = throttle(() => {
 *   console.log('Scroll event fired');
 *   updateScrollPosition();
 * }, 100);
 *
 * window.addEventListener('scroll', handleScroll);
 *
 * // Throttle API calls
 * const throttledSearch = throttle((query: string) => {
 *   searchAPI(query);
 * }, 300);
 *
 * // Throttle resize handler
 * const handleResize = throttle(() => {
 *   console.log('Window resized');
 *   recalculateLayout();
 * }, 250);
 *
 * window.addEventListener('resize', handleResize);
 *
 * // Throttle button clicks
 * const throttledSubmit = throttle(() => {
 *   submitForm();
 * }, 1000);
 * ```
 */
export const throttle = (
  func: (...args: unknown[]) => void,
  limit: number,
): ((...args: unknown[]) => void) => {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;

  return function (this: unknown, ...args: unknown[]) {
    if (lastRan === null) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (lastFunc !== null) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(
        () => {
          if (Date.now() - (lastRan as number) >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - (lastRan as number)),
      );
    }
  };
};
