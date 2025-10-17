/**
 * Utility function for formatting file sizes in a human-readable way
 * Converts raw byte values to appropriate size units (KB, MB, GB, etc.)
 */

/**
 * Formats a file size in bytes to a human-readable string with appropriate units
 *
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @param base - Base for conversion (default: 1024 for binary/IEC, could use 1000 for decimal/SI)
 * @returns A formatted file size string with appropriate unit
 *
 * @example
 * ```ts
 * // Basic usage
 * formatFileSize(1024)
 * // Returns "1 KB"
 *
 * // Larger file size
 * formatFileSize(1536)
 * // Returns "1.5 KB"
 *
 * // With custom decimal places
 * formatFileSize(1536, 0)
 * // Returns "2 KB"
 *
 * // Larger sizes automatically use appropriate units
 * formatFileSize(1048576)
 * // Returns "1 MB"
 *
 * // Very large sizes
 * formatFileSize(1073741824)
 * // Returns "1 GB"
 *
 * // Using decimal base (1000) instead of binary (1024)
 * formatFileSize(1000000, 2, 1000)
 * // Returns "1 MB"
 *
 * // Zero bytes
 * formatFileSize(0)
 * // Returns "0 Bytes"
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2, base: number = 1024): string {
  if (bytes === 0) return '0 Bytes';

  const k = base;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`;
}
