/**
 * Utility function for iframe embedding validation
 * Checks if a URL can be embedded in an iframe based on security headers
 */

/**
 * Determines if a URL can be displayed in an iframe by checking security headers
 * Examines Content-Security-Policy and X-Frame-Options headers to verify embedding permissions
 *
 * @param options - The options for the check
 * @param options.url - The URL to check for iframe embedding capability
 * @param options.requestDomain - The domain that will be embedding the iframe
 * @returns A Promise that resolves to true if the URL can be embedded, false otherwise
 *
 * @example
 * ```ts
 * import { isIframeable } from '@/utils/functions';
 *
 * // Check if a URL can be embedded in an iframe
 * const canEmbed = await isIframeable({
 *   url: 'https://example.com',
 *   requestDomain: 'https://myapp.com'
 * });
 *
 * if (canEmbed) {
 *   console.log('URL can be embedded in an iframe');
 * } else {
 *   console.log('URL cannot be embedded due to security restrictions');
 * }
 *
 * // In a React component
 * function EmbedPreview({ url }) {
 *   const [canEmbed, setCanEmbed] = useState<boolean | null>(null);
 *
 *   useEffect(() => {
 *     async function checkEmbedding() {
 *       const result = await isIframeable({
 *         url,
 *         requestDomain: window.location.origin
 *       });
 *       setCanEmbed(result);
 *     }
 *     checkEmbedding();
 *   }, [url]);
 *
 *   if (canEmbed === null) return <div>Checking...</div>;
 *   if (canEmbed === false) return <div>Cannot embed this URL</div>;
 *
 *   return <iframe src={url} />;
 * }
 * ```
 */
export const isIframeable = async ({
  url,
  requestDomain,
}: {
  url: string;
  requestDomain: string;
}): Promise<boolean> => {
  const res = await fetch(url);

  const cspHeader = res.headers.get('content-security-policy');
  if (cspHeader) {
    const frameAncestorsMatch = cspHeader.match(/frame-ancestors\s+([\s\S]+?)(?=;|$)/i);
    if (frameAncestorsMatch) {
      if (frameAncestorsMatch[1] === '*') {
        return true;
      }
      const allowedOrigins = frameAncestorsMatch[1].split(/\s+/);
      if (allowedOrigins.includes(requestDomain)) {
        return true;
      }
    }
  }

  const xFrameOptions = res.headers.get('X-Frame-Options');
  if (xFrameOptions === 'DENY' || xFrameOptions === 'SAMEORIGIN') {
    return false;
  }

  return true;
};
