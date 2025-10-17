/**
 * Environment variables used throughout the application
 * Centralizes all environment variable access for easier management and documentation.
 */

/**
 * Recaptcha site key for client-side verification.
 * Used for Google reCAPTCHA integration in forms and authentication.
 *
 * @example
 * <Recaptcha siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
 */
export const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Slack webhook URLs for different log types.
 * Used for sending log messages to specific Slack channels based on log category.
 *
 * @property {string | undefined} ALERTS - Webhook for alert notifications
 * @property {string | undefined} CRON - Webhook for cron job logs
 * @property {string | undefined} LINKS - Webhook for link-related logs
 * @property {string | undefined} SUBSCRIBERS - Webhook for subscriber events
 * @property {string | undefined} ERRORS - Webhook for error logs
 *
 * @example
 * fetch(SLACK_WEBHOOKS.ALERTS, { method: 'POST', body: ... })
 */
export const SLACK_WEBHOOKS = {
  ALERTS: process.env.SLACK_WEBHOOKS_HOOK_ALERTS,
  CRON: process.env.SLACK_WEBHOOKS_HOOK_CRON,
  LINKS: process.env.SLACK_WEBHOOKS_HOOK_LINKS,
  SUBSCRIBERS: process.env.SLACK_WEBHOOKS_HOOK_SUBSCRIBERS,
  ERRORS: process.env.SLACK_WEBHOOKS_HOOK_ERRORS,
};

/**
 * Default URL for Open Graph avatar images.
 * Used for generating user or entity avatars in OG images.
 *
 * @example
 * <img src={OG_AVATAR_URL + userId} />
 */
export const OG_AVATAR_URL = 'https://api.pelatform.com/og/avatar/';

/**
 * Default pagination limit for API responses and UI lists.
 *
 * @example
 * const items = data.slice(0, PAGINATION_LIMIT);
 */
export const PAGINATION_LIMIT = 100;

/**
 * Number of seconds in two weeks.
 * Useful for cookie expiration, session timeouts, etc.
 *
 * @example
 * cookie.set('token', value, { maxAge: TWO_WEEKS_IN_SECONDS });
 */
export const TWO_WEEKS_IN_SECONDS = 60 * 60 * 24 * 14;

/**
 * The beginning of time for the application (arbitrary early date).
 * Used as a default value for date comparisons or migrations.
 *
 * @example
 * if (createdAt < THE_BEGINNING_OF_TIME) { ... }
 */
export const THE_BEGINNING_OF_TIME = new Date('2010-01-01T00:00:00.000Z');

/**
 * A large number used as a practical infinity in calculations.
 *
 * @example
 * if (count > INFINITY_NUMBER) { ... }
 */
export const INFINITY_NUMBER = 1000000000;

/**
 * Query parameter name for redirection URLs.
 * Used to pass redirect destinations in authentication or navigation flows.
 *
 * @example
 * const url = `/login?${REDIRECTION_QUERY_PARAM}=/dashboard`;
 */
export const REDIRECT_QUERY_PARAM = 'redirectTo';
