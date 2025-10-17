/**
 * API utilities for Next.js applications
 * Provides helper functions for handling API requests, extracting client information,
 * and managing request/response data in Next.js API routes and middleware
 */

/**
 * Extracts the client IP address from a Next.js request with comprehensive fallback logic
 *
 * This function attempts to get the real client IP address by checking multiple headers
 * in order of preference. It handles various proxy configurations and CDN setups.
 *
 * Header priority:
 * 1. x-forwarded-for (most common, supports proxy chains)
 * 2. x-real-ip (nginx proxy)
 * 3. x-client-ip (Apache proxy)
 * 4. cf-connecting-ip (Cloudflare)
 * 5. x-cluster-client-ip (cluster environments)
 * 6. forwarded (RFC 7239 standard)
 * 7. request.ip (Next.js fallback)
 *
 * @param request - The Next.js request object
 * @returns The client IP address string, or 'unknown' if not found
 *
 * @example
 * ```typescript
 * // In a Next.js API route
 * import { NextRequest, NextResponse } from 'next/server';
 * import { getClientIP } from '@/lib/api';
 *
 * export async function GET(request: NextRequest) {
 *   const clientIP = getClientIP(request);
 *   console.log(`Request from IP: ${clientIP}`);
 *
 *   return NextResponse.json({
 *     message: 'Success',
 *     clientIP
 *   });
 * }
 *
 * // In middleware
 * import { NextRequest, NextResponse } from 'next/server';
 * import { getClientIP } from '@/lib/api';
 *
 * export function middleware(request: NextRequest) {
 *   const clientIP = getClientIP(request);
 *
 *   // Log or rate limit based on IP
 *   console.log(`Middleware: Request from ${clientIP}`);
 *
 *   return NextResponse.next();
 * }
 * ```
 */
export function getClientIP(request: {
  headers: { get(name: string): string | null };
  ip?: string;
}): string {
  // Try x-forwarded-for first (most common, handles proxy chains)
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one (original client)
    const ips = xForwardedFor.split(',').map((ip) => ip.trim());
    const clientIP = ips[0];
    if (clientIP && clientIP !== 'unknown') {
      return clientIP;
    }
  }

  // Try other common headers
  const headers = [
    'x-real-ip', // Nginx proxy
    'x-client-ip', // Apache proxy
    'cf-connecting-ip', // Cloudflare
    'x-cluster-client-ip', // Cluster environments
  ];

  for (const header of headers) {
    const ip = request.headers.get(header);
    if (ip && ip !== 'unknown' && ip.trim() !== '') {
      return ip.trim();
    }
  }

  // Try RFC 7239 Forwarded header
  const forwarded = request.headers.get('forwarded');
  if (forwarded) {
    const forMatch = forwarded.match(/for=([^;,\s]+)/i);
    if (forMatch?.[1]) {
      // Remove quotes and brackets if present
      const ip = forMatch[1].replace(/["[\]]/g, '');
      if (ip && ip !== 'unknown') {
        return ip;
      }
    }
  }

  // Try Next.js request.ip as fallback
  const requestIP = request.ip;
  if (requestIP && requestIP !== 'unknown') {
    return requestIP;
  }

  // Final fallback
  return 'unknown';
}

/**
 * Validates if a string is a valid IP address (IPv4 or IPv6)
 *
 * @param ip - The IP address string to validate
 * @returns True if the IP is valid, false otherwise
 *
 * @example
 * ```typescript
 * const ip = getClientIP(request);
 * if (isValidIP(ip)) {
 *   console.log('Valid IP:', ip);
 * } else {
 *   console.log('Invalid or unknown IP');
 * }
 * ```
 */
export function isValidIP(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;

  // IPv4 regex
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Gets user agent information from the request
 *
 * @param request - The Next.js request object
 * @returns User agent string or 'unknown' if not found
 *
 * @example
 * ```typescript
 * const userAgent = getUserAgent(request);
 * console.log('User Agent:', userAgent);
 * ```
 */
export function getUserAgent(request: { headers: { get(name: string): string | null } }): string {
  return request.headers.get('user-agent') || 'unknown';
}

/**
 * Gets the request origin/referer information
 *
 * @param request - The Next.js request object
 * @returns Origin information object
 *
 * @example
 * ```typescript
 * const origin = getRequestOrigin(request);
 * console.log('Origin:', origin.origin);
 * console.log('Referer:', origin.referer);
 * ```
 */
export function getRequestOrigin(request: { headers: { get(name: string): string | null } }): {
  origin: string;
  referer: string;
  host: string;
} {
  return {
    origin: request.headers.get('origin') || 'unknown',
    referer: request.headers.get('referer') || 'unknown',
    host: request.headers.get('host') || 'unknown',
  };
}

/**
 * Extracts the client IP address from a generic headers object (Node.js, Express, etc)
 *
 * This function is similar to getClientIP, but works with any headers object.
 *
 * @param headers - An object containing HTTP headers (key: string, value: string | string[] | undefined)
 * @returns The client IP address string, or 'unknown' if not found
 *
 * @example
 * ```typescript
 * // In Express.js
 * app.use((req, res, next) => {
 *   const clientIP = getClientIPFromHeaders(req.headers);
 *   console.log('Request from IP:', clientIP);
 *   next();
 * });
 * ```
 */
export function getClientIPFromHeaders(
  headers: Record<string, string | string[] | undefined>,
): string {
  // Helper to get header value (case-insensitive)
  const getHeader = (name: string): string | undefined => {
    const value = headers[name] ?? headers[name.toLowerCase()];
    if (Array.isArray(value)) return value[0];
    return value;
  };

  // Try x-forwarded-for first (most common, handles proxy chains)
  const xForwardedFor = getHeader('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map((ip) => ip.trim());
    const clientIP = ips[0];
    if (clientIP && clientIP !== 'unknown') {
      return clientIP;
    }
  }

  // Try other common headers
  const headerNames = ['x-real-ip', 'x-client-ip', 'cf-connecting-ip', 'x-cluster-client-ip'];
  for (const header of headerNames) {
    const ip = getHeader(header);
    if (ip && ip !== 'unknown' && ip.trim() !== '') {
      return ip.trim();
    }
  }

  // Try RFC 7239 Forwarded header
  const forwarded = getHeader('forwarded');
  if (forwarded) {
    const forMatch = forwarded.match(/for=([^;,"]+)/i);
    if (forMatch?.[1]) {
      const ipClean = forMatch[1].replace(/["[\]]/g, '');
      if (ipClean && ipClean !== 'unknown') {
        return ipClean;
      }
    }
  }

  // Final fallback
  return 'unknown';
}

/**
 * Gets user agent information from a generic headers object (Node.js, Express, etc)
 *
 * @param headers - An object containing HTTP headers (key: string, value: string | string[] | undefined)
 * @returns User agent string or 'unknown' if not found
 *
 * @example
 * ```typescript
 * // In Express.js
 * app.use((req, res, next) => {
 *   const userAgent = getUserAgentFromHeaders(req.headers);
 *   console.log('User Agent:', userAgent);
 *   next();
 * });
 * ```
 */
export function getUserAgentFromHeaders(
  headers: Record<string, string | string[] | undefined>,
): string {
  const value = headers['user-agent'] ?? headers['User-Agent'];
  if (Array.isArray(value)) return value[0] || 'unknown';
  return value || 'unknown';
}
