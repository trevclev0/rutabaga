import { atom } from 'jotai'

/**
 * Example Jotai atoms.
 * Add your global state atoms here.
 *
 * @see https://jotai.org/docs/introduction
 */

// Example: a simple counter atom
export const counterAtom = atom(0)

// Example: a derived (read-only) atom
export const doubleCounterAtom = atom((get) => get(counterAtom) * 2)
