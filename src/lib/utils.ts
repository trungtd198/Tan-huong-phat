import type { ArgumentArray } from 'classnames';
import classnames from 'classnames';

/**
 * Utility to conditionally join class names.
 * Wraps `classnames` for consistent usage across the project.
 *
 * @example
 * cn('base-class', isActive && 'active', variant === 'dark' && 'bg-espresso-900')
 */
export const cn = (...args: ArgumentArray): string => classnames(...args);
