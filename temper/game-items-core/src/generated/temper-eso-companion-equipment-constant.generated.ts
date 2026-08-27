/**
 * Temper ESO Companion Equipment Constants (Generated)
 *
 * Three numeric mappings between ESO runtime equip-type / quality
 * values and Temper companion-equipment ids. Sourced from the
 * universal pages table (page type:
 * temper-eso-companion-equipment-constant).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"

/**
 * ESO equip-type name → ESO numeric constant. `as const` preserves
 * the literal number values so consumers using member access
 * (`ESO_EQUIP_TYPES_GENERATED.EQUIP_TYPE_HEAD`) see the literal
 * `1`, not a widened `number`.
 */
export const ESO_EQUIP_TYPES_GENERATED = {
  EQUIP_TYPE_HEAD: 1,
  EQUIP_TYPE_NECK: 2,
  EQUIP_TYPE_CHEST: 3,
  EQUIP_TYPE_SHOULDERS: 4,
  EQUIP_TYPE_ONE_HAND: 5,
  EQUIP_TYPE_TWO_HAND: 6,
  EQUIP_TYPE_OFF_HAND: 7,
  EQUIP_TYPE_WAIST: 8,
  EQUIP_TYPE_LEGS: 9,
  EQUIP_TYPE_FEET: 10,
  EQUIP_TYPE_RING: 12,
  EQUIP_TYPE_HAND: 13,
  EQUIP_TYPE_MAIN_HAND: 14,
} as const

/**
 * ESO display quality number → companion-equipment-quality temper id.
 * Typed with `CompanionEquipmentQualityId` directly so the facade can
 * re-export without a runtime cast.
 */
export const ESO_QUALITY_TO_COMPANION_QUALITY_GENERATED: Record<
  number,
  CompanionEquipmentQualityId
> = {
  1: "normal",
  2: "fine",
  3: "superior",
  4: "epic",
  5: "legendary",
}

/**
 * Companion-equipment-quality temper id → ESO display quality number.
 * Includes the `no-quality` sentinel mapping to 5 (legendary)
 * because the codec defaults unset quality to legendary.
 */
export const COMPANION_QUALITY_TO_ESO_GENERATED: Record<string, number> = {
  "no-quality": 5,
  "normal": 1,
  "fine": 2,
  "superior": 3,
  "epic": 4,
  "legendary": 5,
}
