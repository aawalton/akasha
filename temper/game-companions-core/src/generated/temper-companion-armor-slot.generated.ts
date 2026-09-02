/**
 * Temper Companion Armor Slots (Generated)
 *
 * The 7 body positions where companion armor can be equipped, sourced
 * from the universal pages table (page type:
 * temper-companion-armor-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionArmorSlotTemplate } from "@akasha/temper-companions-core/companion-armor-slots"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `companionArmorSlots.ids` so `(typeof companionArmorSlots.ids)[number]`
 * stays a literal-union typed for callers (codec v48/v49, schema,
 * optimizer, UI, inventory signature compiler, companion gear diff).
 */
export const TEMPER_COMPANION_ARMOR_SLOTS_BY_ID = {
  "head": { id: "head" as const, name: "Head", equipType: 1 },
  "shoulders": { id: "shoulders" as const, name: "Shoulders", equipType: 4 },
  "chest": { id: "chest" as const, name: "Chest", equipType: 3 },
  "hands": { id: "hands" as const, name: "Hands", equipType: 13 },
  "waist": { id: "waist" as const, name: "Waist", equipType: 8 },
  "legs": { id: "legs" as const, name: "Legs", equipType: 9 },
  "feet": { id: "feet" as const, name: "Feet", equipType: 10 },
} as const satisfies Record<string, CompanionArmorSlotTemplate>
