/**
 * URL search parameters utilities
 * Provides functions for extracting and manipulating URL search parameters
 */

/**
 * Extracts search parameters from a URL as a simple object
 * Converts URLSearchParams to a plain JavaScript object
 *
 * @param url - The URL to extract search parameters from
 * @returns An object with search parameters as key-value pairs
 *
 * @example
 * ```typescript
 * import { getSearchParams } from '@pelatform/utils';
 *
 * // Basic usage
 * getSearchParams('https://example.com?name=John&age=30');
 * // Returns { name: 'John', age: '30' }
 *
 * // With multiple parameters
 * getSearchParams('https://example.com/search?q=test&page=2&limit=10');
 * // Returns { q: 'test', page: '2', limit: '10' }
 *
 * // Note: If the same parameter appears multiple times, only the last value is kept
 * getSearchParams('https://example.com?tag=js&tag=react');
 * // Returns { tag: 'react' }
 *
 * // Use in form initialization
 * const urlParams = getSearchParams(window.location.href);
 * const initialFormData = {
 *   search: urlParams.q || '',
 *   category: urlParams.category || 'all'
 * };
 *
 * // Use in API calls
 * const params = getSearchParams(requestUrl);
 * const response = await api.search(params);
 * ```
 */
export const getSearchParams = (url: string): Record<string, string> => {
  // Create a params object
  const params = {} as Record<string, string>;

  new URL(url).searchParams.forEach((val, key) => {
    params[key] = val;
  });

  return params;
};

/**
 * Extracts search parameters from a URL, handling multiple values as arrays
 * Similar to getSearchParams but preserves multiple occurrences of the same parameter
 *
 * @param url - The URL to extract search parameters from
 * @returns An object with search parameters as key-value pairs, with arrays for repeated parameters
 *
 * @example
 * ```typescript
 * import { getSearchParamsWithArray } from '@pelatform/utils';
 *
 * // With single parameters
 * getSearchParamsWithArray('https://example.com?name=John&age=30');
 * // Returns { name: 'John', age: '30' }
 *
 * // With repeated parameters
 * getSearchParamsWithArray('https://example.com?tag=js&tag=react&tag=typescript');
 * // Returns { tag: ['js', 'react', 'typescript'] }
 *
 * // Mixed single and repeated parameters
 * getSearchParamsWithArray('https://example.com/search?q=test&filter=name&filter=date');
 * // Returns { q: 'test', filter: ['name', 'date'] }
 *
 * // Use in filtering systems
 * const params = getSearchParamsWithArray(window.location.href);
 * const filters = Array.isArray(params.filter) ? params.filter : [params.filter].filter(Boolean);
 * const results = data.filter(item =>
 *   filters.every(filter => item.tags.includes(filter))
 * );
 *
 * // Use in multi-select forms
 * const urlParams = getSearchParamsWithArray(url);
 * const selectedCategories = Array.isArray(urlParams.category)
 *   ? urlParams.category
 *   : urlParams.category ? [urlParams.category] : [];
 * ```
 */
export const getSearchParamsWithArray = (url: string): Record<string, string | string[]> => {
  const params = {} as Record<string, string | string[]>;

  new URL(url).searchParams.forEach((val, key) => {
    if (key in params) {
      const param = params[key];
      if (Array.isArray(param)) {
        param.push(val);
      } else {
        params[key] = [param as string, val];
      }
    } else {
      params[key] = val;
    }
  });

  return params;
};

/**
 * Extracts non-empty search parameters from a URL
 * Similar to getSearchParams but filters out empty values
 *
 * @param url - The URL to extract search parameters from
 * @returns An object with non-empty search parameters as key-value pairs
 *
 * @example
 * ```typescript
 * import { getParamsFromURL } from '@pelatform/utils';
 *
 * // Basic usage
 * getParamsFromURL('https://example.com?name=John&age=30');
 * // Returns { name: 'John', age: '30' }
 *
 * // With empty parameters (these are filtered out)
 * getParamsFromURL('https://example.com?name=John&empty=&blank=');
 * // Returns { name: 'John' }
 *
 * // With invalid URL
 * getParamsFromURL('not-a-url');
 * // Returns {}
 *
 * // With empty URL
 * getParamsFromURL('');
 * // Returns {}
 *
 * // Use in form validation
 * const params = getParamsFromURL(window.location.href);
 * const hasRequiredParams = 'id' in params && 'token' in params;
 * if (!hasRequiredParams) {
 *   throw new Error('Missing required parameters');
 * }
 *
 * // Use in analytics
 * const trackingParams = getParamsFromURL(referrerUrl);
 * if (Object.keys(trackingParams).length > 0) {
 *   analytics.track('page_view_with_params', trackingParams);
 * }
 * ```
 */
export const getParamsFromURL = (url: string): Record<string, string> => {
  if (!url) return {};
  try {
    const params = new URL(url).searchParams;
    const paramsObj: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      if (value && value !== '') {
        paramsObj[key] = value;
      }
    }
    return paramsObj;
  } catch (_) {
    return {};
  }
};
