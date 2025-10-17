/**
 * Google reCAPTCHA server-side verification utilities
 * Provides secure token verification for reCAPTCHA v2 and v3
 * Integrates with Google's verification API for bot protection
 */

import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '../../constants';
import { logger } from '../logging';

/**
 * Response interface from Google reCAPTCHA verification API
 * Defines the structure of the response from Google's verification endpoint
 *
 * @property success - Whether the verification was successful
 * @property challenge_ts - Timestamp of the challenge (ISO format)
 * @property hostname - Hostname of the site where the challenge was solved
 * @property error-codes - Array of error codes if verification failed
 */
interface ReCaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verifies a reCAPTCHA token with Google's verification API
 *
 * This function sends the token and secret key to Google's reCAPTCHA
 * verification endpoint and returns whether the verification was successful.
 *
 * @param token - The reCAPTCHA token from the client-side
 * @returns Promise resolving to a boolean indicating verification success
 *
 * @example
 * ```typescript
 * // In a server action or API route
 * const isValid = await verifyRecaptchaToken(token);
 *
 * if (!isValid) {
 *   throw new Error('reCAPTCHA verification failed');
 * }
 * ```
 */
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const secretKey = NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!secretKey) {
      logger.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data: ReCaptchaVerifyResponse = await response.json();

    if (!data.success) {
      logger.error('reCAPTCHA verification failed:', data['error-codes']);
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error verifying reCAPTCHA token:', error);
    return false;
  }
}
