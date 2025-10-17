/**
 * Utility functions for CSS class name management
 * Provides optimized class name merging with Tailwind CSS conflict resolution
 * Essential for component styling and conditional class application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving any conflicts.
 * This utility combines clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind CSS class conflicts.
 *
 * @param inputs - An array of class names, objects, or arrays to merge
 * @returns A string of merged and optimized class names
 *
 * @example
 * ```tsx
 * // Basic usage
 * <div className={cn("px-4 py-2", "bg-blue-500", "text-white")}>
 *   Button
 * </div>
 *
 * // With conditional classes
 * <div className={cn(
 *   "px-4 py-2",
 *   isActive && "bg-blue-500",
 *   !isActive && "bg-gray-200",
 *   isDisabled && "opacity-50 cursor-not-allowed"
 * )}>
 *   Button
 * </div>
 *
 * // Resolving conflicts (last one wins)
 * <div className={cn("px-2", "px-4")}>
 *   // Results in "px-4", not "px-2 px-4"
 * </div>
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
