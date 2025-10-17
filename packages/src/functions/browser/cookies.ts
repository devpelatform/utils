/**
 * Browser cookies utilities
 * Provides safe cookie operations with error handling and type safety
 * Works in both client-side and server-side environments
 */

import { logger } from '../logging';

/**
 * Interface for cookie options
 */
interface CookieOptions {
  /** Expiration time in days */
  expires?: number;
  /** Cookie path */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Secure flag (HTTPS only) */
  secure?: boolean;
  /** SameSite attribute */
  sameSite?: 'strict' | 'lax' | 'none';
  /** HttpOnly flag (server-side only) */
  httpOnly?: boolean;
}

/**
 * Interface for cookie value with metadata
 */
interface CookieValue<T = unknown> {
  /** The actual value */
  value: T;
  /** Timestamp when the cookie was set */
  timestamp: number;
  /** Optional version for data migration */
  version?: string;
}

/**
 * Sets a cookie with the specified name, value, and options
 * Automatically handles JSON serialization and error cases
 *
 * @param name - The name of the cookie
 * @param value - The value to store (will be JSON stringified)
 * @param options - Cookie options like expiration, path, domain, etc.
 * @returns True if the cookie was set successfully, false otherwise
 *
 * @example
 * ```typescript
 * import { setCookie } from '@pelatform/utils';
 *
 * // Basic usage
 * setCookie('username', 'john_doe');
 *
 * // With expiration (7 days)
 * setCookie('auth_token', 'abc123', { expires: 7 });
 *
 * // With full options
 * setCookie('user_preferences', { theme: 'dark', lang: 'en' }, {
 *   expires: 30,
 *   path: '/',
 *   secure: true,
 *   sameSite: 'strict'
 * });
 *
 * // Store complex objects
 * setCookie('cart_items', [
 *   { id: 1, name: 'Product A', quantity: 2 },
 *   { id: 2, name: 'Product B', quantity: 1 }
 * ], { expires: 1 });
 *
 * // Session cookie (expires when browser closes)
 * setCookie('session_id', 'sess_123456');
 *
 * // Secure cookie for sensitive data
 * setCookie('csrf_token', 'token_abc', {
 *   secure: true,
 *   sameSite: 'strict',
 *   httpOnly: true // Server-side only
 * });
 * ```
 */
export const setCookie = <T>(name: string, value: T, options: CookieOptions = {}): boolean => {
  if (typeof document === 'undefined') {
    logger.warn('setCookie: Document is not available (SSR environment)');
    return false;
  }

  try {
    const cookieValue: CookieValue<T> = {
      value,
      timestamp: Date.now(),
      version: '1.0',
    };

    const serializedValue = JSON.stringify(cookieValue);
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(serializedValue)}`;

    // Add expiration
    if (options.expires) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }

    // Add path
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    // Add domain
    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    // Add secure flag
    if (options.secure) {
      cookieString += '; secure';
    }

    // Add SameSite
    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    // Add HttpOnly (note: this won't work in client-side JS, only server-side)
    if (options.httpOnly) {
      cookieString += '; httponly';
    }

    // biome-ignore lint/suspicious/noDocumentCookie: Legacy cookie API needed for broader browser compatibility
    document.cookie = cookieString;

    logger.debug('Cookie set successfully', { name, options });
    return true;
  } catch (error) {
    logger.error('Failed to set cookie', { name, error });
    return false;
  }
};

/**
 * Gets a cookie value by name with automatic JSON parsing
 * Returns null if the cookie doesn't exist or cannot be parsed
 *
 * @param name - The name of the cookie to retrieve
 * @returns The parsed cookie value or null if not found/invalid
 *
 * @example
 * ```typescript
 * import { getCookie } from '@pelatform/utils';
 *
 * // Get simple value
 * const username = getCookie<string>('username');
 * if (username) {
 *   console.log('Welcome back,', username);
 * }
 *
 * // Get complex object
 * const preferences = getCookie<{ theme: string; lang: string }>('user_preferences');
 * if (preferences) {
 *   applyTheme(preferences.theme);
 *   setLanguage(preferences.lang);
 * }
 *
 * // Get array data
 * const cartItems = getCookie<CartItem[]>('cart_items');
 * if (cartItems) {
 *   updateCartDisplay(cartItems);
 * }
 *
 * // With default value
 * const theme = getCookie<string>('theme') || 'light';
 *
 * // Check if user is authenticated
 * const authToken = getCookie<string>('auth_token');
 * const isAuthenticated = !!authToken;
 *
 * // Get with type safety
 * interface UserSession {
 *   userId: string;
 *   role: string;
 *   expiresAt: number;
 * }
 * const session = getCookie<UserSession>('user_session');
 * if (session && session.expiresAt > Date.now()) {
 *   // Session is valid
 *   authenticateUser(session);
 * }
 * ```
 */
export const getCookie = <T = unknown>(name: string): T | null => {
  if (typeof document === 'undefined') {
    logger.warn('getCookie: Document is not available (SSR environment)');
    return null;
  }

  try {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        const cookieValue = decodeURIComponent(cookie.substring(nameEQ.length));

        try {
          const parsed: CookieValue<T> = JSON.parse(cookieValue);
          logger.debug('Cookie retrieved successfully', {
            name,
            timestamp: parsed.timestamp,
            version: parsed.version,
          });
          return parsed.value;
        } catch (_parseError) {
          // Fallback for cookies set without our wrapper
          logger.debug('Cookie found but not in expected format, returning raw value', {
            name,
          });
          return cookieValue as T;
        }
      }
    }

    logger.debug('Cookie not found', { name });
    return null;
  } catch (error) {
    logger.error('Failed to get cookie', { name, error });
    return null;
  }
};

/**
 * Removes a cookie by setting its expiration date to the past
 * Optionally specify path and domain to ensure proper removal
 *
 * @param name - The name of the cookie to remove
 * @param options - Options for path and domain (should match the original cookie)
 * @returns True if the removal was attempted successfully, false otherwise
 *
 * @example
 * ```typescript
 * import { removeCookie } from '@pelatform/utils';
 *
 * // Remove simple cookie
 * removeCookie('username');
 *
 * // Remove cookie with specific path
 * removeCookie('auth_token', { path: '/admin' });
 *
 * // Remove cookie with domain
 * removeCookie('session_id', {
 *   path: '/',
 *   domain: '.example.com'
 * });
 *
 * // Logout function
 * function logout() {
 *   removeCookie('auth_token');
 *   removeCookie('user_session');
 *   removeCookie('csrf_token');
 *   redirectToLogin();
 * }
 *
 * // Clear user preferences
 * function resetPreferences() {
 *   removeCookie('user_preferences');
 *   removeCookie('theme');
 *   removeCookie('language');
 *   applyDefaultSettings();
 * }
 *
 * // Clear shopping cart
 * function clearCart() {
 *   removeCookie('cart_items');
 *   removeCookie('cart_total');
 *   updateCartDisplay([]);
 * }
 * ```
 */
export const removeCookie = (
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): boolean => {
  if (typeof document === 'undefined') {
    logger.warn('removeCookie: Document is not available (SSR environment)');
    return false;
  }

  try {
    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    // biome-ignore lint/suspicious/noDocumentCookie: Legacy cookie API needed for broader browser compatibility
    document.cookie = cookieString;

    logger.debug('Cookie removed successfully', { name, options });
    return true;
  } catch (error) {
    logger.error('Failed to remove cookie', { name, error });
    return false;
  }
};

/**
 * Checks if a cookie exists
 * More efficient than getCookie when you only need to check existence
 *
 * @param name - The name of the cookie to check
 * @returns True if the cookie exists, false otherwise
 *
 * @example
 * ```typescript
 * import { hasCookie } from '@pelatform/utils';
 *
 * // Check if user is logged in
 * if (hasCookie('auth_token')) {
 *   showDashboard();
 * } else {
 *   showLoginForm();
 * }
 *
 * // Check for user preferences
 * if (hasCookie('user_preferences')) {
 *   const prefs = getCookie('user_preferences');
 *   applyPreferences(prefs);
 * } else {
 *   showPreferencesSetup();
 * }
 *
 * // Conditional cookie setting
 * if (!hasCookie('visitor_id')) {
 *   setCookie('visitor_id', generateVisitorId(), { expires: 365 });
 * }
 *
 * // Feature flag check
 * const hasFeatureFlag = hasCookie('feature_beta_enabled');
 * if (hasFeatureFlag) {
 *   enableBetaFeatures();
 * }
 * ```
 */
export const hasCookie = (name: string): boolean => {
  if (typeof document === 'undefined') {
    logger.warn('hasCookie: Document is not available (SSR environment)');
    return false;
  }

  try {
    const nameEQ = `${encodeURIComponent(name)}=`;
    return document.cookie.split(';').some((cookie) => {
      return cookie.trim().indexOf(nameEQ) === 0;
    });
  } catch (error) {
    logger.error('Failed to check cookie existence', { name, error });
    return false;
  }
};

/**
 * Gets all cookies as an object
 * Useful for debugging or bulk operations
 *
 * @returns Object containing all cookies with their parsed values
 *
 * @example
 * ```typescript
 * import { getAllCookies } from '@pelatform/utils';
 *
 * // Get all cookies for debugging
 * const allCookies = getAllCookies();
 * console.log('Current cookies:', allCookies);
 *
 * // Check cookie count
 * const cookieCount = Object.keys(getAllCookies()).length;
 * if (cookieCount > 50) {
 *   logger.warn('Too many cookies detected', { count: cookieCount });
 * }
 *
 * // Export user data
 * function exportUserData() {
 *   const cookies = getAllCookies();
 *   const userData = {
 *     preferences: cookies.user_preferences,
 *     settings: cookies.user_settings,
 *     theme: cookies.theme
 *   };
 *   return userData;
 * }
 *
 * // Cookie audit
 * function auditCookies() {
 *   const cookies = getAllCookies();
 *   const report = {
 *     total: Object.keys(cookies).length,
 *     authRelated: Object.keys(cookies).filter(name =>
 *       name.includes('auth') || name.includes('session')
 *     ).length,
 *     preferences: Object.keys(cookies).filter(name =>
 *       name.includes('pref') || name.includes('setting')
 *     ).length
 *   };
 *   return report;
 * }
 * ```
 */
export const getAllCookies = (): Record<string, unknown> => {
  if (typeof document === 'undefined') {
    logger.warn('getAllCookies: Document is not available (SSR environment)');
    return {};
  }

  try {
    const cookies: Record<string, unknown> = {};
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      const [name, ...valueParts] = cookie.split('=');

      if (name && valueParts.length > 0) {
        const value = valueParts.join('=');
        const decodedName = decodeURIComponent(name);
        const decodedValue = decodeURIComponent(value);

        try {
          const parsed: CookieValue = JSON.parse(decodedValue);
          cookies[decodedName] = parsed.value;
        } catch {
          // Fallback for cookies not set with our wrapper
          cookies[decodedName] = decodedValue;
        }
      }
    }

    logger.debug('Retrieved all cookies', {
      count: Object.keys(cookies).length,
    });
    return cookies;
  } catch (error) {
    logger.error('Failed to get all cookies', { error });
    return {};
  }
};

/**
 * Clears all cookies for the current domain
 * Useful for logout or reset functionality
 *
 * @param options - Options for path and domain
 * @returns Number of cookies that were attempted to be removed
 *
 * @example
 * ```typescript
 * import { clearAllCookies } from '@pelatform/utils';
 *
 * // Clear all cookies
 * const removedCount = clearAllCookies();
 * console.log(`Removed ${removedCount} cookies`);
 *
 * // Clear cookies for specific path
 * clearAllCookies({ path: '/admin' });
 *
 * // Complete logout function
 * function completeLogout() {
 *   clearAllCookies();
 *   localStorage.clear();
 *   sessionStorage.clear();
 *   redirectToLogin();
 * }
 *
 * // Reset application state
 * function resetApp() {
 *   const cookieCount = clearAllCookies();
 *   logger.info('Application reset', { cookiesRemoved: cookieCount });
 *   window.location.reload();
 * }
 *
 * // Privacy compliance - clear tracking cookies
 * function clearTrackingCookies() {
 *   const allCookies = getAllCookies();
 *   const trackingCookies = Object.keys(allCookies).filter(name =>
 *     name.includes('_ga') || name.includes('_gid') || name.includes('_fbp')
 *   );
 *
 *   trackingCookies.forEach(name => removeCookie(name));
 *   return trackingCookies.length;
 * }
 * ```
 */
export const clearAllCookies = (options: Pick<CookieOptions, 'path' | 'domain'> = {}): number => {
  if (typeof document === 'undefined') {
    logger.warn('clearAllCookies: Document is not available (SSR environment)');
    return 0;
  }

  try {
    const cookies = getAllCookies();
    const cookieNames = Object.keys(cookies);

    cookieNames.forEach((name) => {
      removeCookie(name, options);
    });

    logger.info('Cleared all cookies', {
      count: cookieNames.length,
      options,
    });
    return cookieNames.length;
  } catch (error) {
    logger.error('Failed to clear all cookies', { error });
    return 0;
  }
};
