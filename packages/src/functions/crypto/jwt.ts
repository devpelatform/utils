/**
 * JWT (JSON Web Token) utilities for SaaS applications
 * Provides secure token generation, verification, and management
 * Includes validation and error handling for production use
 */

import jwt from 'jsonwebtoken';

import { logger } from '../logging';

export { jwt };

/**
 * Interface for JWT payload data
 */
interface JWTPayload {
  /** User ID */
  userId: string;
  /** User email */
  email: string;
  /** User role */
  role?: string;
  /** Workspace ID */
  workspaceId?: string;
  /** Token expiration time (Unix timestamp) */
  exp?: number;
  /** Token issued at time (Unix timestamp) */
  iat?: number;
  /** Additional custom claims */
  [key: string]: unknown;
  /** For Supabase */
  aud?: string;
  sub?: string;
}

/**
 * Interface for JWT options
 */
interface JWTOptions {
  /** Token expiration time (default: '7d') */
  expiresIn?: string;
  /** Token issuer */
  issuer?: string;
  /** Token audience */
  audience?: string;
}

/**
 * Interface for JWT verification result
 */
interface JWTVerificationResult {
  /** Whether the token is valid */
  isValid: boolean;
  /** Decoded payload if valid */
  payload?: JWTPayload;
  /** Error message if verification failed */
  error?: string;
}

/**
 * Generates a JWT token with the provided payload
 *
 * @param payload - The data to encode in the token
 * @param secret - The secret key for signing the token
 * @param options - Token generation options
 * @returns The generated JWT token or null if failed
 *
 * @example
 * ```typescript
 * import { generateJWT } from '@pelatform/utils';
 *
 * // Basic usage
 * const token = generateJWT(
 *   { userId: '123', email: 'user@example.com' },
 *   process.env.JWT_SECRET
 * );
 *
 * // With custom expiration
 * const token = generateJWT(
 *   { userId: '123', email: 'user@example.com', role: 'admin' },
 *   process.env.JWT_SECRET,
 *   { expiresIn: '1h' }
 * );
 *
 * // For API authentication
 * const authToken = generateJWT(
 *   { userId: user.id, email: user.email, workspaceId: workspace.id },
 *   process.env.JWT_SECRET,
 *   { expiresIn: '24h', issuer: 'myapp.com' }
 * );
 * ```
 */
export function generateJWT(
  payload: JWTPayload,
  secret: string,
  options: JWTOptions = {},
): string | null {
  // Validate inputs
  if (!payload || typeof payload !== 'object') {
    logger.warn('JWT generation: Payload must be a valid object');
    return null;
  }

  if (!payload.userId || typeof payload.userId !== 'string') {
    logger.warn('JWT generation: userId is required in payload');
    return null;
  }

  if (!payload.email || typeof payload.email !== 'string') {
    logger.warn('JWT generation: email is required in payload');
    return null;
  }

  if (!secret || typeof secret !== 'string') {
    logger.warn('JWT generation: Secret must be a non-empty string');
    return null;
  }

  const { expiresIn = '7d', issuer, audience } = options;

  const { exp, ...cleanPayload } = payload;

  try {
    const signOptions = {
      ...(typeof exp === 'undefined' ? { expiresIn } : {}),
      ...(issuer && { issuer }),
      ...(audience && { audience }),
    } as jwt.SignOptions;

    const token = jwt.sign(cleanPayload, secret, signOptions);

    return token;
  } catch (error) {
    logger.error('JWT generation: Failed to generate token', { error });
    return null;
  }
}

/**
 * Verifies and decodes a JWT token
 *
 * @param token - The JWT token to verify
 * @param secret - The secret key used to sign the token
 * @param options - Verification options
 * @returns Verification result with payload if valid
 *
 * @example
 * ```typescript
 * import { verifyJWT } from '@pelatform/utils';
 *
 * // Basic usage
 * const result = verifyJWT(token, process.env.JWT_SECRET);
 * if (result.isValid && result.payload) {
 *   const { userId, email } = result.payload;
 *   // Proceed with authenticated user
 * }
 *
 * // With issuer verification
 * const result = verifyJWT(token, process.env.JWT_SECRET, {
 *   issuer: 'myapp.com'
 * });
 *
 * // In authentication middleware
 * async function authenticateRequest(req, res, next) {
 *   const token = req.headers.authorization?.replace('Bearer ', '');
 *   const result = verifyJWT(token, process.env.JWT_SECRET);
 *
 *   if (!result.isValid) {
 *     return res.status(401).json({ error: 'Invalid token' });
 *   }
 *
 *   req.user = result.payload;
 *   next();
 * }
 * ```
 */
export function verifyJWT(
  token: string,
  secret: string,
  options: { issuer?: string; audience?: string } = {},
): JWTVerificationResult {
  // Validate inputs
  if (!token || typeof token !== 'string') {
    return {
      isValid: false,
      error: 'Token must be a non-empty string',
    };
  }

  if (!secret || typeof secret !== 'string') {
    return {
      isValid: false,
      error: 'Secret must be a non-empty string',
    };
  }

  const { issuer, audience } = options;

  try {
    const decoded = jwt.verify(token, secret, {
      ...(issuer && { issuer }),
      ...(audience && { audience }),
    }) as JWTPayload;

    return {
      isValid: true,
      payload: decoded,
    };
  } catch (error) {
    logger.warn('JWT verification: Token verification failed', { error });

    if (error instanceof jwt.TokenExpiredError) {
      return {
        isValid: false,
        error: 'Token has expired',
      };
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return {
        isValid: false,
        error: 'Invalid token format',
      };
    }

    return {
      isValid: false,
      error: 'Token verification failed',
    };
  }
}

/**
 * Decodes a JWT token without verification (for debugging/inspection)
 *
 * @param token - The JWT token to decode
 * @returns Decoded payload or null if failed
 *
 * @example
 * ```typescript
 * import { decodeJWT } from '@pelatform/utils';
 *
 * // Inspect token contents without verification
 * const payload = decodeJWT(token);
 * if (payload) {
 *   console.log('Token expires at:', new Date(payload.exp * 1000));
 *   console.log('User ID:', payload.userId);
 * }
 *
 * // For debugging purposes
 * function debugToken(token: string) {
 *   const payload = decodeJWT(token);
 *   if (payload) {
 *     console.log('Token payload:', payload);
 *   } else {
 *     console.log('Invalid token format');
 *   }
 * }
 * ```
 */
export function decodeJWT(token: string): JWTPayload | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch (error) {
    logger.warn('JWT decode: Failed to decode token', { error });
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 *
 * @param token - The JWT token to check
 * @returns True if token is expired, false otherwise
 *
 * @example
 * ```typescript
 * import { isJWTExpired } from '@pelatform/utils';
 *
 * // Check if token needs refresh
 * if (isJWTExpired(userToken)) {
 *   // Redirect to login or refresh token
 *   await refreshUserToken();
 * }
 *
 * // In token refresh logic
 * function shouldRefreshToken(token: string): boolean {
 *   return isJWTExpired(token);
 * }
 * ```
 */
export function isJWTExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true; // Consider invalid tokens as expired
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Gets the remaining time until token expiration
 *
 * @param token - The JWT token to check
 * @returns Remaining time in seconds, or 0 if expired/invalid
 *
 * @example
 * ```typescript
 * import { getJWTTimeRemaining } from '@pelatform/utils';
 *
 * // Check how much time is left
 * const timeLeft = getJWTTimeRemaining(userToken);
 * if (timeLeft < 300) { // Less than 5 minutes
 *   // Show warning about token expiration
 *   showTokenExpirationWarning();
 * }
 *
 * // Format time remaining for display
 * function formatTimeRemaining(token: string): string {
 *   const seconds = getJWTTimeRemaining(token);
 *   const minutes = Math.floor(seconds / 60);
 *   const hours = Math.floor(minutes / 60);
 *
 *   if (hours > 0) return `${hours}h ${minutes % 60}m`;
 *   if (minutes > 0) return `${minutes}m`;
 *   return `${seconds}s`;
 * }
 * ```
 */
export function getJWTTimeRemaining(token: string): number {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = payload.exp - currentTime;

  return Math.max(0, timeRemaining);
}
