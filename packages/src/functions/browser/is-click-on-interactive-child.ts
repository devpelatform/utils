// /**
//  * Utility function for React event handling
//  * Helps prevent event propagation conflicts in nested interactive elements
//  */

// import { MouseEvent } from 'react';

// /**
//  * Determines if a click event occurred on an interactive child element
//  * Useful for preventing parent click handlers from firing when clicking on child interactive elements
//  *
//  * @param e - The React mouse event to check
//  * @returns True if the click was on an interactive element, false otherwise
//  *
//  * @example
//  * ```tsx
//  * import { isClickOnInteractiveChild } from '@/utils/functions';
//  *
//  * // In a React component
//  * function Card({ onClick, children }) {
//  *   const handleClick = (e: React.MouseEvent) => {
//  *     // Don't trigger card click if a button inside was clicked
//  *     if (isClickOnInteractiveChild(e)) {
//  *       return;
//  *     }
//  *
//  *     // Otherwise, handle the card click
//  *     onClick();
//  *   };
//  *
//  *   return (
//  *     <div className="card" onClick={handleClick}>
//  *       {children}
//  *       <button>This button's click won't trigger the card click</button>
//  *     </div>
//  *   );
//  * }
//  * ```
//  */
// export function isClickOnInteractiveChild(e: MouseEvent): boolean {
//   // Traverse up the DOM tree to see if there's a clickable element between this card and the click
//   for (
//     let target = e.target as HTMLElement, i = 0;
//     target && target !== e.currentTarget && i < 50; // Only go 50 levels deep
//     target = target.parentElement as HTMLElement, i++
//   ) {
//     // Don't trigger onClick if a clickable element inside the card was clicked
//     if (
//       ['button', 'a', 'input', 'textarea'].includes(
//         target.tagName.toLowerCase(),
//       ) ||
//       target.getAttribute('role') === 'dialog' ||
//       target.id === 'modal-backdrop' ||
//       [
//         'data-radix-popper-content-wrapper',
//         'data-vaul-overlay',
//         'data-vaul-drawer',
//       ].some((attr) => target.getAttribute(attr) !== null)
//     )
//       return true;
//   }

//   return false;
// }
