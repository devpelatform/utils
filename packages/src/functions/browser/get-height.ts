/**
 * Browser element height calculation utilities
 * Provides functions for measuring HTML element dimensions including margins
 */

/**
 * Calculates the total height of an HTML element including its margins
 * This function computes the complete height of an element by combining:
 * - The element's content height (from getBoundingClientRect)
 * - Top margin
 * - Bottom margin
 *
 * This is useful for layout calculations where you need to know the total
 * space an element occupies, including its margins.
 *
 * @param element - The HTML element to measure
 * @returns The total height in pixels including margins, or 0 if element is null/undefined
 *
 * @example
 * ```ts
 * import { getHeight } from '@/utils/functions';
 *
 * // Basic usage
 * const button = document.querySelector('button');
 * const totalHeight = getHeight(button);
 * console.log(`Button takes up ${totalHeight}px of vertical space`);
 *
 * // Use in layout calculations
 * function calculateTotalHeight(elements: HTMLElement[]) {
 *   return elements.reduce((total, element) => {
 *     return total + getHeight(element);
 *   }, 0);
 * }
 *
 * // Dynamic spacing for sticky headers
 * function adjustLayout() {
 *   const header = document.querySelector('header') as HTMLElement;
 *   const headerHeight = getHeight(header);
 *   document.body.style.paddingTop = `${headerHeight}px`;
 * }
 *
 * // Responsive layout adjustments
 * function handleResize() {
 *   const sidebar = document.querySelector('.sidebar') as HTMLElement;
 *   const sidebarHeight = getHeight(sidebar);
 *
 *   if (sidebarHeight > window.innerHeight) {
 *     sidebar.style.overflowY = 'scroll';
 *   }
 * }
 *
 * // Animation calculations
 * function animateCollapse(element: HTMLElement) {
 *   const fullHeight = getHeight(element);
 *   element.style.height = `${fullHeight}px`;
 *   element.style.transition = 'height 0.3s ease';
 *   element.style.height = '0px';
 * }
 * ```
 */
export function getHeight(element: HTMLElement): number {
  if (!element) return 0;

  const styles = window.getComputedStyle(element);

  const height = element.getBoundingClientRect().height;
  const marginTop = parseFloat(styles.marginTop);
  const marginBottom = parseFloat(styles.marginBottom);

  const totalHeight = height + marginTop + marginBottom;

  return totalHeight;
}
