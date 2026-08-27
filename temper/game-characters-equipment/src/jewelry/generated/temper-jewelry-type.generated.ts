/**
 * Temper Jewelry Types (Generated)
 *
 * ESO equipment types that use jewelry traits and enchantments — the 2
 * jewelry pieces (necklace, ring), sourced from the universal pages table
 * (page type: temper-jewelry-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelryTypeTemplate } from "../jewelry-types-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `jewelryTypes.ids` so `(typeof jewelryTypes.ids)[number]` stays a
 * literal-union typed for callers.
 */
export const TEMPER_JEWELRY_TYPES_BY_ID = {
  "necklace": { id: "necklace" as const, name: "Necklace", validSlots: ["necklace"] as const },
  "ring": { id: "ring" as const, name: "Ring", validSlots: ["ring-1", "ring-2"] as const },
} as const satisfies Record<string, JewelryTypeTemplate>
