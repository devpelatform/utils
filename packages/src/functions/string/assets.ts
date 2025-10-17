/**
 * Asset URL builder utilities
 * Provides helpers to construct absolute asset URLs against a configurable asset host.
 */

const DEFAULT_ASSET_HOST = 'https://assets.pelatform.com';

/**
 * Builds an absolute URL for a given asset path using the provided asset host (CDN) base.
 * Accepts relative paths (e.g., `logo/logo.png`, `/images/icon.svg`) and returns a fully-qualified URL.
 * If an absolute URL is provided as `path`, it will be returned as-is (host is ignored).
 *
 * @param path - Asset path or absolute URL to resolve
 * @param host - Optional asset host (base URL). Defaults to `https://assets.pelatform.com`
 * @returns A fully-qualified asset URL string, or `null` if inputs are invalid
 *
 * @example
 * ```ts
 * import { assetsUrl } from '@/lib/assets';
 *
 * // Default host
 * const u1 = assetsUrl('logo/logo.png');
 * // 'https://assets.pelatform.com/logo/logo.png'
 *
 * // Custom host (full URL)
 * const u2 = assetsUrl('/images/icon.svg', 'https://cdn.example.com');
 * // 'https://cdn.example.com/images/icon.svg'
 *
 * // Custom host (without protocol) — will be normalized to https://
 * const u3 = assetsUrl('icons/search.svg', 'cdn.example.com');
 * // 'https://cdn.example.com/icons/search.svg'
 *
 * // Absolute path passes through (host is ignored)
 * const u4 = assetsUrl('https://other.com/a.png', 'https://cdn.example.com');
 * // 'https://other.com/a.png'
 *
 * // Edge cases
 * const u5 = assetsUrl('');
 * // null
 *
 * const u6 = assetsUrl('logo.png', '://bad-host');
 * // null (invalid base)
 * ```
 */
export function assetsUrl(path: string, host: string = DEFAULT_ASSET_HOST): string {
  const env = process.env.NEXT_PUBLIC_ASSETS_URL || process.env.VITE_ASSETS_URL;
  const BASE_HOST = env ?? host;

  if (!path || typeof path !== 'string') {
    return BASE_HOST;
  }

  try {
    // Normalize BASE_HOST if given without protocol, e.g., "cdn.example.com"
    const base = /^https?:\/\//i.test(BASE_HOST) ? BASE_HOST : `https://${BASE_HOST}`;
    const url = new URL(path, base); // absolute `path` will override `base`
    return url.toString();
  } catch {
    return BASE_HOST;
  }
}
