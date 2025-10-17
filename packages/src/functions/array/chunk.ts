/**
 * Utility function for array manipulation
 * Provides a way to split arrays into smaller chunks of specified size
 */

/**
 * Splits an array into smaller chunks of a specified size
 * Useful for pagination, batch processing, or creating grid layouts
 *
 * @param array - The array to be chunked
 * @param chunk_size - The size of each chunk
 * @returns A new array containing chunks of the original array
 *
 * @example
 * ```ts
 * // Basic usage
 * chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)
 * // Returns [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * // With string array
 * chunk(['a', 'b', 'c', 'd', 'e'], 2)
 * // Returns [['a', 'b'], ['c', 'd'], ['e']]
 *
 * // With objects
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' },
 *   { id: 4, name: 'Dave' }
 * ];
 * chunk(users, 2)
 * // Returns [
 * //   [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
 * //   [{ id: 3, name: 'Charlie' }, { id: 4, name: 'Dave' }]
 * // ]
 *
 * // Empty array returns empty array
 * chunk([], 3)
 * // Returns []
 * ```
 */
export const chunk = <T>(array: T[], chunk_size: number): T[][] => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunk_size);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, [] as T[][]);
};
