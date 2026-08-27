/**
 * Temper Weapon Slots (Generated)
 *
 * The 3 weapon-equipment slot types (main-hand, off-hand, poison),
 * sourced from the universal pages table (page type: temper-weapon-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponSlotTemplate } from "../weapon-slots-data"

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `weaponSlots.ids` so `(typeof weaponSlots.ids)[number]` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_WEAPON_SLOTS_BY_ID = {
  "main-hand": { id: "main-hand" as const, name: "Main Hand", icon: "/resources/gearslot_mainhand.png" },
  "off-hand": { id: "off-hand" as const, name: "Off Hand", icon: "/resources/gearslot_offhand.png" },
  "poison": { id: "poison" as const, name: "Poison" },
} as const satisfies Record<string, WeaponSlotTemplate>
