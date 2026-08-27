/**
 * Companion Mappings (Generated)
 *
 * Maps ESO companion IDs to temper indices.
 * Source: engine/companions/companions-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const COMPANION_ID_TO_INDEX: Record<number, number> = {
  [1]: 1, // Bastian Hallix
  [2]: 2, // Mirri Elendis
  [5]: 3, // Ember
  [6]: 4, // Isobel Veloise
  [8]: 5, // Sharp-as-Night
  [9]: 6, // Azandar
  [12]: 7, // Tanlorin
  [13]: 8, // Zerith-var
}

/** All ESO companion IDs, sorted alphabetically by name. */
export const ALL_COMPANION_IDS: number[] = [9, 1, 5, 6, 2, 8, 12, 13]

export function getCompanionIndex(companionId: number): number {
  return COMPANION_ID_TO_INDEX[companionId] ?? 0
}
