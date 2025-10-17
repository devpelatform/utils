// /**
//  * Main application constants and configuration
//  * Centralizes core application settings, domains, and environment-specific values
//  */

// import { isDevelopment, isStaging, PORT } from './development';

// /**
//  * The application name, taken from environment variable or defaults to 'Pelatform'
//  * Used throughout the application for branding and display purposes.
//  *
//  * @example
//  * ```ts
//  * import { APP_NAME } from '@/utils/constants';
//  *
//  * // Set document title
//  * document.title = APP_NAME;
//  *
//  * // Use in components
//  * const Header = () => <h1>{APP_NAME}</h1>;
//  * ```
//  */
// export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Pelatform';

// /**
//  * The app domain for the application, from environment variable
//  * Used for constructing application-specific URLs and routing.
//  *
//  * @example
//  * ```ts
//  * import { ENV_APP_DOMAIN } from '@/utils/constants';
//  *
//  * // Construct app URLs
//  * const appUrl = `https://${ENV_APP_DOMAIN}`;
//  * const dashboardUrl = `https://${ENV_APP_DOMAIN}/dashboard`;
//  * ```
//  */
// export const ENV_APP_DOMAIN =
//   process.env.NEXT_PUBLIC_APP_DOMAIN || (isDevelopment ? 'star.local' : '');

// /**
//  * The main domain for the application, from environment variable
//  * Used for constructing main website URLs and canonical links.
//  *
//  * @example
//  * ```ts
//  * import { ENV_MAIN_DOMAIN } from '@/utils/constants';
//  *
//  * // Construct main website URLs
//  * const mainUrl = `https://${ENV_MAIN_DOMAIN}`;
//  * const homeUrl = `https://${ENV_MAIN_DOMAIN}/home`;
//  * ```
//  */
// export const ENV_MAIN_DOMAIN =
//   process.env.NEXT_PUBLIC_MAIN_DOMAIN || ENV_APP_DOMAIN;

// export const NGROK_URL = process.env.NEXT_PUBLIC_NGROK_URL;

// export const LOCALHOST = `localhost:${PORT}`;
// export const APPHOST = ENV_APP_DOMAIN
//   ? isDevelopment
//     ? `${ENV_APP_DOMAIN}:${PORT}`
//     : ENV_APP_DOMAIN
//   : LOCALHOST;
// export const MAINHOST = ENV_MAIN_DOMAIN
//   ? isDevelopment
//     ? `${ENV_MAIN_DOMAIN}:${PORT}`
//     : ENV_MAIN_DOMAIN
//   : LOCALHOST;
// export const HTTP = isDevelopment ? 'http://' : 'https://';

// /**
//  * Hostnames considered as Pelatform App.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (MAIN_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const MAIN_HOSTNAMES = new Set([MAINHOST]);

// /**
//  * The base URL for the Pelatform App, depending on environment.
//  *
//  * @example
//  * fetch(`${MAIN_DOMAIN_ENV}/endpoint`)
//  */
// export const MAIN_DOMAIN = `${HTTP}${MAINHOST}`;

// /**
//  * Hostnames considered as Pelatform App.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (APP_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const APP_HOSTNAMES = new Set([
//   `app.${APPHOST}`,
//   `preview-app.${APPHOST}`,
// ]);

// /**
//  * The base URL for the Pelatform App, depending on environment.
//  *
//  * @example
//  * fetch(`${APP_DOMAIN}/endpoint`)
//  */
// export const APP_DOMAIN = isStaging
//   ? `${HTTP}preview-app.${APPHOST}`
//   : `${HTTP}app.${APPHOST}`;

// /**
//  * The base URL for the Pelatform App, using ngrok in development if available.
//  *
//  * @example
//  * fetch(`${APP_DOMAIN_WITH_NGROK}/endpoint`)
//  */
// export const APP_DOMAIN_WITH_NGROK = isStaging
//   ? `${HTTP}preview-app.${APPHOST}`
//   : NGROK_URL || `${HTTP}app.${APPHOST}`;

// /**
//  * Hostnames considered as Pelatform Portal.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (PORTAL_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const PORTAL_HOSTNAMES = new Set([
//   `portal.${APPHOST}`,
//   `preview-portal.${APPHOST}`,
// ]);

// /**
//  * The base URL for the Pelatform Portal, depending on environment.
//  *
//  * @example
//  * fetch(`${PORTAL_DOMAIN}/endpoint`)
//  */
// export const PORTAL_DOMAIN = isStaging
//   ? `${HTTP}preview-portal.${APPHOST}`
//   : `${HTTP}portal.${APPHOST}`;

// /**
//  * The base URL for the Pelatform Portal, using ngrok in development if available.
//  *
//  * @example
//  * fetch(`${PORTAL_DOMAIN_WITH_NGROK}/endpoint`)
//  */
// export const PORTAL_DOMAIN_WITH_NGROK = isStaging
//   ? `${HTTP}preview-portal.${APPHOST}`
//   : NGROK_URL || `${HTTP}portal.${APPHOST}`;

// /**
//  * Hostnames considered as Pelatform API.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (API_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const API_HOSTNAMES = new Set([
//   `api.${APPHOST}`,
//   `api-staging.${APPHOST}`,
// ]);

// /**
//  * The base URL for the Pelatform API, depending on environment.
//  *
//  * @example
//  * fetch(`${API_DOMAIN}/v1/resource`)
//  */
// export const MAIN_API_DOMAIN = isStaging
//   ? `${HTTP}api-staging.${APPHOST}`
//   : `${HTTP}api.${APPHOST}`;

// export const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL || MAIN_API_DOMAIN;

// /**
//  * Hostnames considered as Pelatform Admin.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (ADMIN_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const ADMIN_HOSTNAMES = new Set([`admin.${APPHOST}`]);

// /**
//  * The base URL for the Pelatform Admin, depending on environment.
//  *
//  * @example
//  * fetch(`${ADMIN_DOMAIN}/endpoint`)
//  */
// export const ADMIN_DOMAIN = `${HTTP}admin.${APPHOST}`;

// /**
//  * Hostnames considered as Pelatform Docs.
//  * Used for routing and multi-tenant logic.
//  *
//  * @example
//  * if (ADMIN_HOSTNAMES.has(window.location.hostname)) { ... }
//  */
// export const DOCS_HOSTNAMES = new Set([`docs.${APPHOST}`]);

// /**
//  * The base URL for the Pelatform Docs, depending on environment.
//  *
//  * @example
//  * fetch(`${DOCS_DOMAIN}/endpoint`)
//  */
// export const DOCS_DOMAIN = `${HTTP}docs.${APPHOST}`;
