/**
 * Country Constants
 * Provides comprehensive mappings for country codes and names
 */

/**
 * Object mapping ISO 3166-1 alpha-2 country codes to their full names
 * Contains all recognized countries and territories worldwide
 *
 * @example
 * ```ts
 * import { COUNTRIES } from '@pelatform/utils';
 *
 * // Get country name from code
 * const countryName = COUNTRIES['US']; // 'United States'
 *
 * // Check if a code is a valid country
 * const isValidCountry = 'FR' in COUNTRIES; // true
 *
 * // Display all countries in a dropdown
 * const countryOptions = Object.entries(COUNTRIES).map(([code, name]) => ({
 *   value: code,
 *   label: name
 * }));
 * ```
 */
export const COUNTRIES: { [key: string]: string } = {
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo (Republic)',
  CD: 'Congo (Democratic Republic)',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Ivory Coast',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island and McDonald Islands',
  VA: 'Vatican City',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran',
  IQ: 'Iraq',
  IE: 'Ireland',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: 'North Korea',
  KR: 'South Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Laos',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MK: 'Macedonia',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russia',
  RW: 'Rwanda',
  SH: 'Saint Helena',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome and Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SZ: 'Eswatini',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Minor Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Vietnam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
  AX: 'Åland Islands',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  CW: 'Curaçao',
  GG: 'Guernsey',
  IM: 'Isle of Man',
  JE: 'Jersey',
  ME: 'Montenegro',
  BL: 'Saint Barthélemy',
  MF: 'Saint Martin (French part)',
  RS: 'Serbia',
  SX: 'Sint Maarten (Dutch part)',
  SS: 'South Sudan',
  XK: 'Kosovo',
};

/**
 * Array of all ISO 3166-1 alpha-2 country codes
 * Useful for iteration, validation, and type checking
 *
 * @example
 * ```ts
 * import { COUNTRY_CODES } from '@pelatform/utils';
 *
 * // Validate user input
 * const isValidCountryCode = (code: string) => COUNTRY_CODES.includes(code);
 *
 * // Create a filter for countries
 * const countryFilters = COUNTRY_CODES.map(code => ({
 *   id: code,
 *   name: COUNTRIES[code],
 *   selected: false
 * }));
 *
 * // Type safety for country code parameters
 * function getCountryData(countryCode: typeof COUNTRY_CODES[number]) {
 *   // Function implementation...
 * }
 * ```
 */
export const COUNTRY_CODES = Object.keys(COUNTRIES) as [string, ...string[]];

/**
 * Array of ISO 3166-1 alpha-2 country codes for European Union member states
 * Used for EU-specific functionality like GDPR compliance, VAT calculations, etc.
 *
 * @example
 * ```ts
 * import { EU_COUNTRY_CODES, COUNTRIES } from '@pelatform/utils';
 *
 * // Check if a country is in the EU
 * const isEUCountry = (countryCode: string) => EU_COUNTRY_CODES.includes(countryCode);
 *
 * // Get list of EU country names
 * const euCountryNames = EU_COUNTRY_CODES.map(code => COUNTRIES[code]);
 *
 * // Filter users from EU countries
 * const euUsers = users.filter(user => EU_COUNTRY_CODES.includes(user.countryCode));
 *
 * // Apply EU-specific logic
 * function applyVAT(price: number, countryCode: string) {
 *   if (EU_COUNTRY_CODES.includes(countryCode)) {
 *     // Apply EU VAT rules
 *     return price * 1.2; // Example VAT rate
 *   }
 *   return price;
 * }
 * ```
 */
export const EU_COUNTRY_CODES = [
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GR',
  'HR',
  'HU',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
];
