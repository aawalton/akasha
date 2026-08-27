/**
 * Temper Player ESO Equipment Constants (Generated)
 *
 * Per-family forward maps from temper id (kebab-case) to the numeric ESO
 * WeaponType / ArmorType / DisplayQuality constant for player equipment,
 * sourced from the universal pages table (page type:
 * temper-eso-player-equipment-constant).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorWeightId } from "@temper/game-characters-equipment/armor/armor-weights-data"
import type { WeaponTypeId } from "@temper/game-characters-equipment/weapons/weapon-types-data"

/** Player weapon type temper ID → ESO WEAPONTYPE_* number. */
export const TEMPER_PLAYER_WEAPON_TYPE_TO_ESO = {
  "no-type": 0,
  "axe": 1,
  "mace": 2,
  "sword": 3,
  "greatsword": 4,
  "battleaxe": 5,
  "maul": 6,
  "bow": 8,
  "restoration-staff": 9,
  "dagger": 11,
  "inferno-staff": 12,
  "ice-staff": 13,
  "lightning-staff": 15,
} as const satisfies Record<WeaponTypeId, number>

/** Player armor weight temper ID → ESO ARMORTYPE_* number. */
export const TEMPER_PLAYER_ARMOR_TYPE_TO_ESO = {
  "no-weight": 0,
  "light": 1,
  "medium": 2,
  "heavy": 3,
  "shield": 0,
} as const satisfies Record<ArmorWeightId, number>

/** Player equipment quality temper ID → ESO ITEM_DISPLAY_QUALITY_* number (1-5). */
export const TEMPER_PLAYER_QUALITY_TO_ESO = {
  "normal": 1,
  "fine": 2,
  "superior": 3,
  "epic": 4,
  "legendary": 5,
  "mythic": 5,
} as const satisfies Record<string, number>
