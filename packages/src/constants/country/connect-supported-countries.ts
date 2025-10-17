/**
 * Connect Supported Countries
 * Provides a list of country codes supported by the Connect API/service
 */

/**
 * Array of ISO 3166-1 alpha-2 country codes supported by the Connect service
 * Each code is accompanied by a comment with the country name for reference
 *
 * @example
 * ```ts
 * import { CONNECT_SUPPORTED_COUNTRIES } from '@pelatform/utils';
 *
 * // Check if a country is supported
 * const isSupported = CONNECT_SUPPORTED_COUNTRIES.includes('US'); // true
 *
 * // Filter users by supported countries
 * const users = [
 *   { name: 'John', country: 'US' },
 *   { name: 'Alice', country: 'FR' },
 *   { name: 'Bob', country: 'ZZ' } // Not supported
 * ];
 * const supportedUsers = users.filter(user =>
 *   CONNECT_SUPPORTED_COUNTRIES.includes(user.country)
 * ); // Returns users from US and FR
 *
 * // Display supported countries in a dropdown
 * const countryOptions = CONNECT_SUPPORTED_COUNTRIES.map(code => ({
 *   value: code,
 *   label: new Intl.DisplayNames(['en'], { type: 'region' }).of(code)
 * }));
 * ```
 */
export const CONNECT_SUPPORTED_COUNTRIES = [
  'AL', // Albania
  'DZ', // Algeria
  'AO', // Angola
  'AG', // Antigua & Barbuda
  'AR', // Argentina
  'AM', // Armenia
  'AU', // Australia
  'AT', // Austria
  'AZ', // Azerbaijan
  'BS', // Bahamas
  'BH', // Bahrain
  'BD', // Bangladesh
  'BE', // Belgium
  'BJ', // Benin
  'BT', // Bhutan
  'BO', // Bolivia
  'BA', // Bosnia & Herzegovina
  'BW', // Botswana
  'BN', // Brunei
  'BG', // Bulgaria
  'KH', // Cambodia
  'CA', // Canada
  'CL', // Chile
  'CO', // Colombia
  'CR', // Costa Rica
  'CI', // Côte d'Ivoire
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'DO', // Dominican Republic
  'EC', // Ecuador
  'EG', // Egypt
  'SV', // El Salvador
  'EE', // Estonia
  'ET', // Ethiopia
  'FI', // Finland
  'FR', // France
  'GA', // Gabon
  'GM', // Gambia
  'DE', // Germany
  'GH', // Ghana
  'GR', // Greece
  'GT', // Guatemala
  'GY', // Guyana
  'HK', // Hong Kong
  'HU', // Hungary
  'IS', // Iceland
  'IN', // India
  'ID', // Indonesia
  'IE', // Ireland
  'IL', // Israel
  'IT', // Italy
  'JM', // Jamaica
  'JP', // Japan
  'JO', // Jordan
  'KZ', // Kazakhstan
  'KE', // Kenya
  'KW', // Kuwait
  'LA', // Laos
  'LV', // Latvia
  'LI', // Liechtenstein
  'LT', // Lithuania
  'LU', // Luxembourg
  'MO', // Macao SAR China
  'MG', // Madagascar
  'MY', // Malaysia
  'MT', // Malta
  'MU', // Mauritius
  'MX', // Mexico
  'MD', // Moldova
  'MC', // Monaco
  'MN', // Mongolia
  'MA', // Morocco
  'MZ', // Mozambique
  'NA', // Namibia
  'NL', // Netherlands
  'NZ', // New Zealand
  'NE', // Niger
  'NG', // Nigeria
  'MK', // North Macedonia
  'NO', // Norway
  'OM', // Oman
  'PK', // Pakistan
  'PA', // Panama
  'PY', // Paraguay
  'PE', // Peru
  'PH', // Philippines
  'PL', // Poland
  'PT', // Portugal
  'QA', // Qatar
  'RO', // Romania
  'RW', // Rwanda
  'SM', // San Marino
  'SA', // Saudi Arabia
  'SN', // Senegal
  'RS', // Serbia
  'SG', // Singapore
  'SK', // Slovakia
  'SI', // Slovenia
  'ZA', // South Africa
  'KR', // South Korea
  'ES', // Spain
  'LK', // Sri Lanka
  'LC', // St. Lucia
  'SE', // Sweden
  'CH', // Switzerland
  'TW', // Taiwan
  'TZ', // Tanzania
  'TH', // Thailand
  'TT', // Trinidad & Tobago
  'TN', // Tunisia
  'TR', // Turkey
  'AE', // United Arab Emirates
  'GB', // United Kingdom
  'US', // United States
  'UY', // Uruguay
  'UZ', // Uzbekistan
  'VN', // Vietnam
];
