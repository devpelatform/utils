/**
 * Utility function for client-side image resizing
 * Provides browser-based image resizing with aspect ratio handling
 */

/**
 * Resizes an image file to specified dimensions while maintaining aspect ratio
 * Uses canvas to perform the resize operation in the browser
 *
 * @param file - The image File object to resize
 * @param opts - Resize options
 * @param opts.width - Target width in pixels (default: 1200)
 * @param opts.height - Target height in pixels (default: 630)
 * @param opts.quality - JPEG quality from 0.0 to 1.0 (default: 1.0)
 * @returns A Promise that resolves to a base64-encoded data URL of the resized image
 *
 * @example
 * ```ts
 * import { resizeImage } from '@/utils/functions';
 *
 * // Basic usage with a file from input
 * const fileInput = document.querySelector('input[type="file"]');
 * fileInput.addEventListener('change', async (e) => {
 *   const file = e.target.files[0];
 *   if (file) {
 *     try {
 *       // Resize to default dimensions (1200x630)
 *       const resizedImage = await resizeImage(file);
 *
 *       // Display the resized image
 *       const img = document.createElement('img');
 *       img.src = resizedImage;
 *       document.body.appendChild(img);
 *     } catch (error) {
 *       console.error('Image resize failed:', error);
 *     }
 *   }
 * });
 *
 * // With custom dimensions and quality
 * const thumbnail = await resizeImage(file, {
 *   width: 300,
 *   height: 200,
 *   quality: 0.8
 * });
 *
 * // Use the resized image in an upload
 * const formData = new FormData();
 * formData.append('image', thumbnail);
 * await fetch('/api/upload', { method: 'POST', body: formData });
 * ```
 */
export const resizeImage = (
  file: File,
  opts: {
    width: number;
    height: number;
    quality?: number;
  } = {
    width: 1200, // Desired output width
    height: 630, // Desired output height
    quality: 1.0, // Set quality to maximum
  },
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const targetWidth = opts.width;
        const targetHeight = opts.height;
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.imageSmoothingQuality = 'high'; // Set image smoothing quality to high

        // Calculating the aspect ratio
        const sourceWidth = img.width;
        const sourceHeight = img.height;
        const sourceAspectRatio = sourceWidth / sourceHeight;
        const targetAspectRatio = targetWidth / targetHeight;

        let drawWidth: number;
        let drawHeight: number;
        let offsetX = 0;
        let offsetY = 0;

        // Adjust drawing sizes based on the aspect ratio
        if (sourceAspectRatio > targetAspectRatio) {
          // Source is wider
          drawHeight = sourceHeight;
          drawWidth = sourceHeight * targetAspectRatio;
          offsetX = (sourceWidth - drawWidth) / 2;
        } else {
          // Source is taller or has the same aspect ratio
          drawWidth = sourceWidth;
          drawHeight = sourceWidth / targetAspectRatio;
          offsetY = (sourceHeight - drawHeight) / 2;
        }

        // Draw the image onto the canvas
        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          drawWidth,
          drawHeight,
          0,
          0,
          targetWidth,
          targetHeight,
        );

        // Convert the canvas to a base64 string
        const base64Image = canvas.toDataURL('image/jpeg', opts.quality);
        resolve(base64Image);
      };
      img.onerror = (error) => reject(new Error(`Image loading error: ${error}`));
    };
    reader.onerror = (error) => reject(new Error(`FileReader error: ${error}`));
    reader.readAsDataURL(file);
  });
};
