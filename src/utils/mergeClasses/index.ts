import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges and deduplicates Tailwind CSS class names, resolving conflicts.
 *
 * @param inputs Class values to merge (strings, arrays, objects, etc.).
 * @returns A single string of merger, conflict-free class names.
 * @example
 * ```ts
 * mergeClasses('px-2 py-1', 'px-4')
 * // 'py-1 px-4'
 *
 * mergeClasses('text-red-500', isActive && 'text-blue-500')
 * // 'text-blue-500' (when isActive is true)
 * ```
 */
export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
