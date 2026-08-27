/**
 * Temper Player ESO Trait Map (Generated)
 *
 * Per-family forward maps from temper trait id (kebab-case) to the
 * numeric ESO ItemTraitType constant for player equipment, sourced
 * from the universal pages table (page type: temper-eso-trait-map).
 *
 * Reverse maps (ESO number → temper trait id) are reconstructed at
 * module load by the facade via the typed-ids `invertViaIds` helper.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTraitId } from "../armor-traits-data"
import type { JewelryTraitId } from "../jewelry-traits-data"
import type { WeaponTraitId } from "../weapon-traits-data"

/** Player weapon trait temper ID → ESO ITEM_TRAIT_TYPE_WEAPON_* number. */
export const TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO = {
  "no-trait": 0,
  "powered": 1,
  "charged": 2,
  "precise": 3,
  "infused": 4,
  "defending": 5,
  "training": 6,
  "sharpened": 7,
  "decisive": 8,
  "intricate": 9,
  "ornate": 10,
  "nirnhoned": 26,
} as const satisfies Record<WeaponTraitId, number>

/** Player armor trait temper ID → ESO ITEM_TRAIT_TYPE_ARMOR_* number. */
export const TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO = {
  "no-trait": 0,
  "sturdy": 11,
  "impenetrable": 12,
  "reinforced": 13,
  "well-fitted": 14,
  "training": 15,
  "infused": 16,
  "invigorating": 17,
  "divines": 18,
  "ornate": 19,
  "intricate": 20,
  "nirnhoned": 25,
} as const satisfies Record<ArmorTraitId, number>

/** Player jewelry trait temper ID → ESO ITEM_TRAIT_TYPE_JEWELRY_* number. */
export const TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO = {
  "no-trait": 0,
  "healthy": 21,
  "arcane": 22,
  "robust": 23,
  "ornate": 24,
  "intricate": 27,
  "swift": 28,
  "harmony": 29,
  "triune": 30,
  "bloodthirsty": 31,
  "protective": 32,
  "infused": 33,
} as const satisfies Record<JewelryTraitId, number>
