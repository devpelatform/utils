/**
 * Utility functions for data fetching
 * Provides enhanced fetch implementation with error handling for SWR
 */

/**
 * Extended Error interface for SWR compatibility
 * Includes additional properties for error information and HTTP status
 */
interface SWRError extends Error {
  info: string | Record<string, unknown>;
  status: number;
}

/**
 * Fetches data from an API endpoint with proper error handling
 * Designed to work seamlessly with SWR data fetching library
 *
 * @param input - The resource URL or Request object to fetch
 * @param init - Optional fetch initialization options with typed headers
 * @returns A Promise that resolves to the JSON response data
 * @throws SWRError with status code and error information on failure
 *
 * @example
 * ```ts
 * import { fetcher } from '@/utils/functions';
 * import useSWR from 'swr';
 *
 * // Basic usage with SWR
 * const { data, error } = useSWR('/api/user', fetcher);
 *
 * // With custom headers
 * const { data } = useSWR('/api/protected', url =>
 *   fetcher(url, {
 *     headers: {
 *       Authorization: `Bearer ${token}`
 *     }
 *   })
 * );
 *
 * // Direct usage without SWR
 * try {
 *   const data = await fetcher('/api/data');
 *   console.log(data);
 * } catch (error) {
 *   // Error will include status code and error info
 *   console.error(`Error ${error.status}: ${error.info}`);
 * }
 * ```
 */
export async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit & { headers?: Record<string, string> },
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    ...(init?.headers && { headers: init.headers }),
  });

  if (!res.ok) {
    const message =
      (await res.json())?.error?.message || 'An error occurred while fetching the data.';
    const error = new Error(message) as SWRError;
    error.info = message;
    error.status = res.status;

    throw error;
  }

  return res.json();
}
