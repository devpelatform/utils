/**
 * Utility function for fetch requests with timeout capability
 * Provides a way to abort fetch requests that take too long to complete
 */

/**
 * Performs a fetch request with a specified timeout
 * Automatically aborts the request if it exceeds the timeout duration
 *
 * @param input - The resource URL or Request object to fetch
 * @param init - Optional fetch initialization options
 * @param timeout - Maximum time in ms to wait for a response (default: 5000)
 * @returns A Promise that resolves to the fetch Response or rejects on timeout
 * @throws Error if the request times out or fails
 *
 * @example
 * ```ts
 * import { fetchWithTimeout } from '@/utils/functions';
 *
 * // Basic usage with default timeout (5 seconds)
 * try {
 *   const response = await fetchWithTimeout('https://api.example.com/data');
 *   const data = await response.json();
 *   console.log(data);
 * } catch (error) {
 *   console.error('Request failed or timed out:', error);
 * }
 *
 * // With custom timeout (2 seconds)
 * const response = await fetchWithTimeout(
 *   'https://api.example.com/data',
 *   {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ key: 'value' })
 *   },
 *   2000
 * );
 *
 * // Will throw an error after 2 seconds if the request hasn't completed
 * ```
 */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  timeout: number = 5000,
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);
    fetch(input, { ...init, signal: controller.signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}
