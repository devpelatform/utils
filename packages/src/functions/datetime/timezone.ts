/**
 * Timezone utilities for datetime operations
 * Provides functions for working with timezones and timezone data
 */

/**
 * Retrieves a list of supported time zones with their labels and values
 * This function fetches the available time zones from the environment,
 * formats their offsets (e.g., "GMT+2"), and returns them in a sorted array.
 * Useful for timezone selection dropdowns and user preferences.
 *
 * @returns An array of time zone objects with label and value properties, sorted by offset
 *
 * @example
 * ```ts
 * import { getTimeZones } from '@/utils/functions';
 *
 * // Get all available timezones
 * const timezones = getTimeZones();
 * // Returns: [
 * //   { label: "(GMT-12) Etc/GMT+12", value: "Etc/GMT+12" },
 * //   { label: "(GMT-11) Pacific/Midway", value: "Pacific/Midway" },
 * //   { label: "(GMT+0) Europe/London", value: "Europe/London" },
 * //   { label: "(GMT+1) Europe/Paris", value: "Europe/Paris" },
 * //   ...
 * // ]
 *
 * // Use in a select dropdown
 * const TimezoneSelect = () => (
 *   <select>
 *     {getTimeZones().map(tz => (
 *       <option key={tz.value} value={tz.value}>
 *         {tz.label}
 *       </option>
 *     ))}
 *   </select>
 * );
 *
 * // Find specific timezone
 * const userTimezone = getTimeZones().find(tz =>
 *   tz.value === 'America/New_York'
 * );
 * ```
 */
export const getTimeZones = (): { label: string; value: string }[] => {
  // Fetch supported timezones
  const timezones = Intl.supportedValuesOf('timeZone');

  return timezones
    .map((timezone) => {
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: timezone,
        timeZoneName: 'shortOffset',
      });
      const parts = formatter.formatToParts(new Date());
      const offset = parts.find((part) => part.type === 'timeZoneName')?.value || '';
      const formattedOffset = offset === 'GMT' ? 'GMT+0' : offset;

      return {
        value: timezone,
        label: `(${formattedOffset}) ${timezone.replace(/_/g, ' ')}`,
        numericOffset: parseInt(formattedOffset.replace('GMT', '').replace('+', '') || '0'),
      };
    })
    .sort((a, b) => a.numericOffset - b.numericOffset);
};
