/**
 * Temper Jewelry Slots (Generated)
 *
 * The 3 jewelry-equipment slot positions (necklace, ring-1, ring-2),
 * sourced from the universal pages table (page type: temper-jewelry-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelrySlotTemplate } from "../jewelry-slots-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `jewelrySlots.ids` so `(typeof jewelrySlots.ids)[number]` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_JEWELRY_SLOTS_BY_ID = {
  "necklace": { id: "necklace" as const, name: "Necklace", typeId: "necklace" as const, icon: "/resources/gearslot_neck.png" },
  "ring-1": { id: "ring-1" as const, name: "Ring 1", typeId: "ring" as const, icon: "/resources/gearslot_ring.png" },
  "ring-2": { id: "ring-2" as const, name: "Ring 2", typeId: "ring" as const, icon: "/resources/gearslot_ring.png" },
} as const satisfies Record<string, JewelrySlotTemplate>
