/**
 * Continent Constants
 * Provides mapping between continent codes and names
 */

/**
 * Object mapping continent codes to their full names
 * Uses standard continent codes as keys
 *
 * @example
 * ```ts
 * import { CONTINENTS } from '@pelatform/utils';
 *
 * // Get continent name from code
 * const continentName = CONTINENTS['EU']; // 'Europe'
 *
 * // Check if a code is a valid continent
 * const isValidContinent = 'AS' in CONTINENTS; // true
 *
 * // Display all continents in a dropdown
 * const continentOptions = Object.entries(CONTINENTS).map(([code, name]) => ({
 *   value: code,
 *   label: name
 * }));
 * ```
 */
export const CONTINENTS: { [key: string]: string } = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America',
};

/**
 * Array of all continent codes
 * Useful for iteration, validation, and type checking
 *
 * @example
 * ```ts
 * import { CONTINENT_CODES } from '@pelatform/utils';
 *
 * // Validate user input
 * const isValidContinentCode = (code: string) => CONTINENT_CODES.includes(code);
 *
 * // Create a filter for continents
 * const continentFilters = CONTINENT_CODES.map(code => ({
 *   id: code,
 *   name: CONTINENTS[code],
 *   selected: false
 * }));
 * ```
 */
export const CONTINENT_CODES = Object.keys(CONTINENTS) as [string, ...string[]];
