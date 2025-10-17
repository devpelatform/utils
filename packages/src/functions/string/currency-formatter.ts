/**
 * Utility function for formatting numbers as currency
 * Provides consistent currency formatting with customizable options
 */

/**
 * Formats a number as a currency string using Intl.NumberFormat
 *
 * @param value - The numeric value to format as currency
 * @param options - Optional Intl.NumberFormat options to customize formatting
 * @param locale - Optional locale string (defaults to 'en-US')
 * @param currencyCode - Optional currency code (defaults to 'USD')
 * @returns A formatted currency string
 *
 * @example
 * ```ts
 * // Basic usage with defaults (USD)
 * currencyFormatter(1000)
 * // Returns "$1,000"
 *
 * // With custom currency
 * currencyFormatter(1000, {}, 'en-US', 'EUR')
 * // Returns "€1,000"
 *
 * // With custom locale
 * currencyFormatter(1000, {}, 'de-DE', 'EUR')
 * // Returns "1.000 €"
 *
 * // With custom options
 * currencyFormatter(1234.56, { maximumFractionDigits: 2 })
 * // Returns "$1,234.56"
 *
 * // Combining custom options, locale and currency
 * currencyFormatter(1234.56, { maximumFractionDigits: 2 }, 'ja-JP', 'JPY')
 * // Returns "￥1,235" (rounded to 0 decimal placeas by default for JPY)
 * ```
 */
export const currencyFormatter = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale: string = 'en-US',
  currencyCode: string = 'USD',
): string =>
  Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
