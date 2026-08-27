/**
 * Temper Armor Slots (Generated)
 *
 * The 7 body positions where armor can be equipped, sourced from the
 * universal pages table (page type: temper-armor-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorSlotTemplate } from "../armor-slots-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `armorSlots.ids` so `(typeof armorSlots.ids)[number]` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_ARMOR_SLOTS_BY_ID = {
  "head": { id: "head" as const, name: "Head", icon: "/resources/gearslot_head.png" },
  "shoulders": { id: "shoulders" as const, name: "Shoulders", icon: "/resources/gearslot_shoulders.png" },
  "chest": { id: "chest" as const, name: "Chest", icon: "/resources/gearslot_chest.png" },
  "hands": { id: "hands" as const, name: "Hands", icon: "/resources/gearslot_hands.png" },
  "waist": { id: "waist" as const, name: "Waist", icon: "/resources/gearslot_belt.png" },
  "legs": { id: "legs" as const, name: "Legs", icon: "/resources/gearslot_legs.png" },
  "feet": { id: "feet" as const, name: "Feet", icon: "/resources/gearslot_feet.png" },
} as const satisfies Record<string, ArmorSlotTemplate>
