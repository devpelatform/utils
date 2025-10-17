/**
 * Localhost Constants
 * Provides default geolocation and IP data for local development environments
 */

/**
 * Default geolocation data for localhost/development environments
 * Used when actual geolocation data is unavailable or for testing location-based features
 *
 * @example
 * ```ts
 * import { LOCALHOST_GEO_DATA } from '@pelatform/utils';
 *
 * // Use default geo data when in development environment
 * const geoData = isDevelopment ? LOCALHOST_GEO_DATA : userGeoData;
 *
 * // Testing location-based features
 * function getNearbyStores(userLocation = LOCALHOST_GEO_DATA) {
 *   const { latitude, longitude } = userLocation;
 *   // Implementation to find nearby stores
 * }
 * ```
 */
export const LOCALHOST_GEO_DATA = {
  continent: 'NA',
  country: 'US',
  city: 'San Francisco',
  region: 'CA',
  latitude: '37.7695',
  longitude: '-122.385',
};

/**
 * Default IP address for localhost/development environments
 * Used when actual IP data is unavailable or for testing IP-based features
 *
 * @example
 * ```ts
 * import { LOCALHOST_IP } from '@pelatform/utils';
 *
 * // Use default IP when in development environment
 * const ipAddress = isDevelopment ? LOCALHOST_IP : userIpAddress;
 *
 * // Testing IP-based features
 * function getLocationFromIp(ip = LOCALHOST_IP) {
 *   // Implementation to get location from IP
 * }
 * ```
 */
export const LOCALHOST_IP = '63.141.57.109';
