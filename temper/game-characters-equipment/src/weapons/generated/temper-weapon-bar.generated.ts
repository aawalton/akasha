/**
 * Temper Weapon Bars (Generated)
 *
 * Two weapon bars (primary and backup) available to players, sourced
 * from the universal pages table (page type: temper-weapon-bar).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * ("primary-weapon-bar" / "backup-weapon-bar") and the same string is
 * used as the record key, so `TEMPER_WEAPON_BARS["primary-weapon-bar"]`
 * is well-typed and feeds the `WeaponBar` union and the
 * `weaponBars.data` lookup in @temper/game-characters-equipment.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponBarTemplate } from "../weapon-bars-data"

export const TEMPER_WEAPON_BARS = {
  "primary-weapon-bar": { id: "primary-weapon-bar", name: "Primary Bar" },
  "backup-weapon-bar": { id: "backup-weapon-bar", name: "Backup Bar" },
} as const satisfies Record<string, WeaponBarTemplate>
