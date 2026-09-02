/**
 * Temper Companion Weapon Slots (Generated)
 *
 * The 2 companion weapon-equipment slot kinds -- main-hand, off-hand --
 * sourced from the universal pages table (page type:
 * temper-companion-weapon-slot). Companions have one weapon bar with
 * two slots; no poison.
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_COMPANION_WEAPON_SLOTS["main-hand"]` is well-typed and feeds
 * the `companionWeaponSlots` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionWeaponSlotTemplate } from "@akasha/temper-companions-core/companion-weapon-slots"

export const TEMPER_COMPANION_WEAPON_SLOTS = {
  "main-hand": { id: "main-hand", name: "Main Hand" },
  "off-hand": { id: "off-hand", name: "Off Hand" },
} as const satisfies Record<string, CompanionWeaponSlotTemplate>
