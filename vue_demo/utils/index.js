export * from './lang.js';

export { isObject } from '../shared/util.js'

/**
 * Check if val is a valid array index.
 */
 export function isValidArrayIndex (val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}