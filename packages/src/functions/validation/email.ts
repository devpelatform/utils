/**
 * Email validation and formatting utilities for SaaS applications
 * Provides comprehensive email validation, normalization, and domain checking
 * Includes support for disposable email detection and business email validation
 */

/**
 * Interface for email validation result
 */
interface EmailValidationResult {
  /** Whether the email is valid */
  isValid: boolean;
  /** Normalized email address */
  normalized?: string;
  /** Error message if validation failed */
  error?: string;
  /** Additional validation details */
  details?: {
    /** Whether the domain appears to be disposable */
    isDisposable?: boolean;
    /** Whether the email appears to be a business email */
    isBusiness?: boolean;
    /** The domain part of the email */
    domain?: string;
  };
}

/**
 * Common disposable email domains
 * Used to detect temporary/throwaway email addresses
 */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.org',
  'yopmail.com',
  'temp-mail.org',
  'throwaway.email',
  'getnada.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'bccto.me',
  'chacuo.net',
  'dispostable.com',
  'fakeinbox.com',
  'hide.biz.st',
  'mytrashmail.com',
  'nobulk.com',
  'sogetthis.com',
  'spamherelots.com',
  'spamhereplease.com',
  'spamthisplease.com',
  'superrito.com',
  'tempemail.com',
  'thankyou2010.com',
  'trash2009.com',
  'trashymail.com',
  'tyldd.com',
]);

/**
 * Free email providers
 * Used to distinguish between free and business email addresses
 */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
  'yandex.com',
  'zoho.com',
  'fastmail.com',
  'tutanota.com',
]);

/**
 * Validates an email address with comprehensive checks
 *
 * @param email - The email address to validate
 * @param options - Validation options
 * @returns Validation result with details
 *
 * @example
 * ```typescript
 * import { validateEmail } from '@pelatform/utils';
 *
 * // Basic validation
 * const result = validateEmail('user@example.com');
 * if (result.isValid) {
 *   console.log('Valid email:', result.normalized);
 * }
 *
 * // Check for disposable emails
 * const result = validateEmail('test@10minutemail.com');
 * if (result.details?.isDisposable) {
 *   throw new Error('Disposable emails are not allowed');
 * }
 *
 * // Business email validation
 * const result = validateEmail('john@company.com');
 * if (result.details?.isBusiness) {
 *   // Apply business-specific logic
 *   await createBusinessAccount(result.normalized);
 * }
 *
 * // In user registration
 * async function registerUser(email: string, password: string) {
 *   const emailResult = validateEmail(email);
 *   if (!emailResult.isValid) {
 *     throw new Error(emailResult.error || 'Invalid email');
 *   }
 *
 *   if (emailResult.details?.isDisposable) {
 *     throw new Error('Please use a permanent email address');
 *   }
 *
 *   await createUser({
 *     email: emailResult.normalized,
 *     password: await hashPassword(password)
 *   });
 * }
 * ```
 */
export function validateEmail(
  email: string,
  options: {
    /** Whether to allow disposable emails (default: true) */
    allowDisposable?: boolean;
    /** Whether to require business emails (default: false) */
    requireBusiness?: boolean;
  } = {},
): EmailValidationResult {
  const { allowDisposable = true, requireBusiness = false } = options;

  // Basic validation
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'Email must be a non-empty string',
    };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length === 0) {
    return {
      isValid: false,
      error: 'Email cannot be empty',
    };
  }

  // RFC 5322 compliant email regex (simplified but robust)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Invalid email format',
    };
  }

  // Extract domain
  const domain = trimmedEmail.split('@')[1];
  if (!domain) {
    return {
      isValid: false,
      error: 'Invalid email format - missing domain',
    };
  }

  // Check for disposable email
  const isDisposable = DISPOSABLE_EMAIL_DOMAINS.has(domain);
  if (!allowDisposable && isDisposable) {
    return {
      isValid: false,
      error: 'Disposable email addresses are not allowed',
      details: { isDisposable: true, domain },
    };
  }

  // Check for business email
  const isFreeEmail = FREE_EMAIL_DOMAINS.has(domain);
  const isBusiness = !isFreeEmail && !isDisposable;

  if (requireBusiness && !isBusiness) {
    return {
      isValid: false,
      error: 'Business email address is required',
      details: { isBusiness: false, domain },
    };
  }

  return {
    isValid: true,
    normalized: trimmedEmail,
    details: {
      isDisposable,
      isBusiness,
      domain,
    },
  };
}

/**
 * Normalizes an email address for consistent storage and comparison
 *
 * @param email - The email address to normalize
 * @returns Normalized email address or null if invalid
 *
 * @example
 * ```typescript
 * import { normalizeEmail } from '@pelatform/utils';
 *
 * // Basic normalization
 * const normalized = normalizeEmail('  USER@EXAMPLE.COM  ');
 * // Returns: 'user@example.com'
 *
 * // Gmail-specific normalization
 * const normalized = normalizeEmail('user.name+tag@gmail.com');
 * // Returns: 'username@gmail.com'
 *
 * // In user lookup
 * async function findUserByEmail(email: string) {
 *   const normalizedEmail = normalizeEmail(email);
 *   if (!normalizedEmail) {
 *     throw new Error('Invalid email format');
 *   }
 *
 *   return await User.findOne({ email: normalizedEmail });
 * }
 * ```
 */
export function normalizeEmail(email: string): string | null {
  const result = validateEmail(email);
  if (!result.isValid || !result.normalized) {
    return null;
  }

  let normalized = result.normalized;
  const [localPart, domain] = normalized.split('@');

  // Gmail-specific normalization
  if (domain === 'gmail.com') {
    // Remove dots and everything after +
    const cleanLocal = localPart.replace(/\./g, '').split('+')[0];
    normalized = `${cleanLocal}@${domain}`;
  }

  // Outlook/Hotmail-specific normalization
  if (['outlook.com', 'hotmail.com', 'live.com'].includes(domain)) {
    // Remove everything after +
    const cleanLocal = localPart.split('+')[0];
    normalized = `${cleanLocal}@${domain}`;
  }

  return normalized;
}

/**
 * Checks if an email domain is disposable/temporary
 *
 * @param email - The email address to check
 * @returns True if the domain is disposable
 *
 * @example
 * ```typescript
 * import { isDisposableEmail } from '@pelatform/utils';
 *
 * // Check for disposable email
 * if (isDisposableEmail('test@10minutemail.com')) {
 *   throw new Error('Please use a permanent email address');
 * }
 *
 * // In email validation middleware
 * function validateUserEmail(email: string) {
 *   if (isDisposableEmail(email)) {
 *     return {
 *       valid: false,
 *       error: 'Temporary email addresses are not allowed'
 *     };
 *   }
 *   return { valid: true };
 * }
 * ```
 */
export function isDisposableEmail(email: string): boolean {
  const result = validateEmail(email);
  return result.details?.isDisposable || false;
}

/**
 * Checks if an email appears to be a business email
 *
 * @param email - The email address to check
 * @returns True if the email appears to be business-related
 *
 * @example
 * ```typescript
 * import { isBusinessEmail } from '@pelatform/utils';
 *
 * // Check for business email
 * if (isBusinessEmail('john@company.com')) {
 *   // Apply business account features
 *   await enableBusinessFeatures(user);
 * }
 *
 * // In pricing logic
 * function getAccountType(email: string) {
 *   return isBusinessEmail(email) ? 'business' : 'personal';
 * }
 * ```
 */
export function isBusinessEmail(email: string): boolean {
  const result = validateEmail(email);
  return result.details?.isBusiness || false;
}

/**
 * Extracts the domain from an email address
 *
 * @param email - The email address
 * @returns The domain part or null if invalid
 *
 * @example
 * ```typescript
 * import { getEmailDomain } from '@pelatform/utils';
 *
 * // Extract domain
 * const domain = getEmailDomain('user@example.com');
 * // Returns: 'example.com'
 *
 * // Domain-based logic
 * function getCompanyFromEmail(email: string) {
 *   const domain = getEmailDomain(email);
 *   if (domain) {
 *     return domain.split('.')[0]; // 'example' from 'example.com'
 *   }
 *   return null;
 * }
 * ```
 */
export function getEmailDomain(email: string): string | null {
  const result = validateEmail(email);
  return result.details?.domain || null;
}
