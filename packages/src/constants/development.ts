/**
 * Development and environment constants
 * Provides environment detection and development-specific configuration values
 */

/**
 * Node environment variable
 * Indicates the current environment in which the application is running (e.g., 'development', 'production', 'staging').
 *
 * @example
 * ```ts
 * import { NODE_ENV } from '@/utils/constants';
 *
 * if (NODE_ENV === 'development') {
 *   // Enable dev-only features
 *   console.log('Development mode enabled');
 * }
 *
 * // Environment-specific configuration
 * const apiUrl = NODE_ENV === 'production'
 *   ? 'https://api.pelatform.com'
 *   : 'http://localhost:3001';
 * ```
 */
export const NODE_ENV = process.env.NODE_ENV;

/**
 * Checks if the application is running in development mode
 * Useful for enabling development-specific features and debugging.
 *
 * @returns True if NODE_ENV is 'development', false otherwise
 *
 * @example
 * ```ts
 * import { isDevelopment } from '@/utils/constants';
 *
 * if (isDevelopment) {
 *   // Enable hot reloading and dev tools
 *   console.log('Development mode enabled');
 *   enableDevTools();
 * }
 *
 * // Conditional imports
 * if (isDevelopment) {
 *   import('./dev-utils').then(devUtils => {
 *     devUtils.setupDevEnvironment();
 *   });
 * }
 * ```
 */
export const isDevelopment = NODE_ENV === 'development';

/**
 * Checks if the application is running in staging mode
 * Used for testing production-like environments before deployment.
 *
 * @returns True if NODE_ENV is 'test', false otherwise
 *
 * @example
 * ```ts
 * import { isStaging } from '@/utils/constants';
 *
 * if (isStaging) {
 *   // Use staging API endpoints
 *   apiUrl = 'https://staging-api.pelatform.com';
 * }
 *
 * // Staging-specific analytics
 * const analyticsConfig = {
 *   enabled: isStaging || isProduction,
 *   debug: isStaging
 * };
 * ```
 */
export const isStaging = NODE_ENV === 'test';

/**
 * Checks if the application is running in production mode
 * Used for enabling production optimizations and features.
 *
 * @returns True if NODE_ENV is 'production', false otherwise
 *
 * @example
 * ```ts
 * import { isProduction } from '@/utils/constants';
 *
 * if (isProduction) {
 *   // Enable analytics and error tracking
 *   enableAnalytics();
 *   enableErrorTracking();
 * }
 *
 * // Performance optimizations
 * const shouldMinify = isProduction;
 * const shouldCompress = isProduction;
 * ```
 */
export const isProduction = NODE_ENV === 'production';

/**
 * The port number on which the application server runs.
 * Defaults to '3000' if the PORT environment variable is not set.
 *
 * @example
 * app.listen(PORT, () => {
 *   console.log(`Server running on port ${PORT}`);
 * });
 */
export const PORT = process.env.PORT || '3000';

/**
 * The port number on which the api application server runs.
 * Defaults to '3001' if the API_PORT environment variable is not set.
 *
 * @example
 * app.listen(API_PORT, () => {
 *   console.log(`Server running on port ${API_PORT}`);
 * });
 */
export const API_PORT = process.env.API_PORT || '3001';

/**
 * Indicates whether debug mode is enabled (true in development mode).
 *
 * @example
 * if (DEBUG) {
 *   console.log('Debugging enabled');
 * }
 */
export const DEBUG = !!isDevelopment;

/**
 * Log level for Consola or other logging libraries.
 * Controls the verbosity of logs output to the console.
 *
 * @example
 * if (LOG_LEVEL === 'debug') {
 *   consola.debug('Debugging enabled');
 * }
 */
export const LOG_LEVEL = process.env.LOG_LEVEL;
