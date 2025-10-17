/**
 * Constants for Framer Motion animations
 * Provides reusable animation presets for consistent UI motion
 */

/**
 * Animation variants for list items
 * Creates a scale and fade effect for list items
 *
 * @example
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from '@pelatform/utils';
 *
 * // In a component
 * <motion.li
 *   variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
 *   initial="hidden"
 *   animate="show"
 * >
 *   List item content
 * </motion.li>
 * ```
 */
export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring' } },
};

/**
 * Animation variants for staggered children elements
 * Creates a fade-in and slide-up effect with spring physics
 *
 * @example
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { STAGGER_CHILD_VARIANTS } from '@pelatform/utils';
 *
 * // In a parent component
 * <motion.ul
 *   initial="hidden"
 *   animate="show"
 *   variants={{
 *     show: {
 *       transition: {
 *         staggerChildren: 0.1
 *       }
 *     }
 *   }}
 * >
 *   {items.map(item => (
 *     <motion.li key={item.id} variants={STAGGER_CHILD_VARIANTS}>
 *       {item.content}
 *     </motion.li>
 *   ))}
 * </motion.ul>
 * ```
 */
export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring' } },
};

/**
 * Animation settings for tab items
 * Creates a smooth transition effect for tab switching
 *
 * @example
 * ```tsx
 * import { motion, AnimatePresence } from 'framer-motion';
 * import { TAB_ITEM_ANIMATION_SETTINGS } from '@pelatform/utils';
 *
 * // In a component
 * <AnimatePresence mode="wait">
 *   <motion.div
 *     key={activeTab}
 *     {...TAB_ITEM_ANIMATION_SETTINGS}
 *   >
 *     {tabContent}
 *   </motion.div>
 * </AnimatePresence>
 * ```
 */
export const TAB_ITEM_ANIMATION_SETTINGS = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2, type: 'easeInOut' },
};
