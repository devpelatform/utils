/**
 * Utility function for formatting numbers with abbreviations
 * Provides human-readable number formatting for large values
 */

/**
 * Formats a number with abbreviations (K, M, G, T, etc.) or as a full number
 *
 * @param num - The number to format
 * @param opts - Formatting options
 * @param opts.digits - Number of decimal places to show (default: 1)
 * @param opts.full - Whether to show the full number without abbreviation (default: false)
 * @param locale - Optional locale string for full number formatting (defaults to 'en-US')
 * @returns A formatted number string
 *
 * @example
 * ```ts
 * // Basic usage
 * nFormatter(1500)
 * // Returns "1.5K"
 *
 * // With custom decimal places
 * nFormatter(1500, { digits: 2 })
 * // Returns "1.50K"
 *
 * // Full number formatting
 * nFormatter(1500, { full: true })
 * // Returns "1,500"
 *
 * // Small numbers
 * nFormatter(0.75, { digits: 2 })
 * // Returns "0.75"
 *
 * // Large numbers with abbreviations
 * nFormatter(1500000)
 * // Returns "1.5M"
 *
 * // With custom locale
 * nFormatter(1500000, { full: true }, 'de-DE')
 * // Returns "1.500.000"
 *
 * // Zero or undefined
 * nFormatter(0)
 * // Returns "0"
 * nFormatter(undefined)
 * // Returns "0"
 * ```
 */
export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean } = {
    digits: 1,
  },
  locale: string = 'en-US',
): string {
  if (!num) return '0';
  if (opts.full) {
    return Intl.NumberFormat(locale).format(num);
  }

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  if (num < 1) {
    return num.toFixed(opts.digits).replace(rx, '$1');
  }

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item ? (num / item.value).toFixed(opts.digits).replace(rx, '$1') + item.symbol : '0';
}
