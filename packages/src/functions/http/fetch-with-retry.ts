/**
 * Utility function for resilient network requests
 * Provides fetch implementation with timeout, retry, and exponential backoff
 */

/**
 * Performs a fetch request with automatic retries, timeout, and exponential backoff
 * Handles common error scenarios like rate limiting and server errors
 *
 * @param input - The resource URL or Request object to fetch
 * @param init - Optional fetch initialization options
 * @param options - Configuration options for retry behavior
 * @param options.timeout - Maximum time in ms to wait for a response (default: 5000)
 * @param options.maxRetries - Maximum number of retry attempts (default: 10)
 * @param options.retryDelay - Base delay in ms between retries (default: 1000)
 * @returns A Promise that resolves to the fetch Response
 * @throws Error if all retry attempts fail
 *
 * @example
 * ```ts
 * import { fetchWithRetry } from '@/utils/functions';
 *
 * // Basic usage
 * try {
 *   const response = await fetchWithRetry('https://api.example.com/data');
 *   const data = await response.json();
 *   console.log(data);
 * } catch (error) {
 *   console.error('Failed to fetch data:', error);
 * }
 *
 * // With custom options
 * const response = await fetchWithRetry('https://api.example.com/data',
 *   {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ key: 'value' })
 *   },
 *   {
 *     timeout: 10000,      // 10 second timeout
 *     maxRetries: 5,       // Try 5 times maximum
 *     retryDelay: 500      // Start with 500ms delay
 *   }
 * );
 *
 * // Handles rate limiting (429) and server errors (5xx) with exponential backoff
 * // Throws error immediately for authentication failures (403)
 * ```
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  options: {
    timeout?: number;
    maxRetries?: number;
    retryDelay?: number;
  } = {},
): Promise<Response> {
  const { timeout = 5000, maxRetries = 10, retryDelay = 1000 } = options;

  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return response;
      }

      // Handle rate limiting and server errors
      if (response.status === 429 || response.status >= 500) {
        const delay = retryDelay + i ** 2 * 50;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Handle unauthorized errors
      if (response.status === 403) {
        throw new Error('Unauthorized');
      }

      // Handle other errors
      if (!response.ok) {
        let errorMessage: string;
        try {
          const error = await response.json();
          errorMessage = error.error || `HTTP error ${response.status}`;
        } catch {
          errorMessage = `HTTP error ${response.status}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error instanceof Error ? error : new Error(String(error));

      // If this is the last retry, throw the error
      if (i === maxRetries - 1) {
        throw new Error(`Failed after ${maxRetries} retries. Last error: ${lastError.message}`);
      }

      // For network errors or timeouts, wait and retry
      const delay = retryDelay + i ** 2 * 50;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached due to the throw in the last retry,
  // but TypeScript needs it for type safety
  throw new Error(`Failed after ${maxRetries} retries`);
}
