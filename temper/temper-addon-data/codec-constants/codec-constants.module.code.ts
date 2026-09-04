import {
  AFFIX_SCRIPT_BITS,
  ALLIANCE_BITS,
  ARMOR_ENCHANT_BITS,
  ARMOR_TRAIT_BITS,
  ARMOR_WEIGHT_BITS,
  ATTRIBUTE_BITS,
  CHAMPION_POINT_BITS,
  CLASS_BITS,
  CURSE_BITS,
  ESO_PLUS_BITS,
  FOCUS_SCRIPT_BITS,
  FOOD_OR_DRINK_BITS,
  GRIMOIRE_BITS,
  JEWELRY_ENCHANT_BITS,
  JEWELRY_TRAIT_BITS,
  MUNDUS_BITS,
  POISON_BITS,
  POTION_BITS,
  QUALITY_BITS,
  RACE_BITS,
  SCRIBED_SKILL_BITS,
  SET_BITS,
  SIGNATURE_SCRIPT_BITS,
  SKILL_BITS,
  SKILL_LINE_BITS,
  VAMPIRE_STAGE_BITS,
  WEAPON_ENCHANT_BITS,
  WEAPON_TRAIT_BITS,
  WEAPON_TYPE_BITS,
} from "@akasha/temper-build-codec/build-codec-indices"
import { CHARACTER_BUILD_TYPE } from "@akasha/temper-build-codec/build-codec-v48"
import {
  COMPANION_ARMOR_WEIGHT_BITS,
  COMPANION_ARMOR_WEIGHT_IDS,
  COMPANION_BITS,
  COMPANION_QUALITY_BITS,
  COMPANION_SKILL_BITS,
  COMPANION_TRAIT_BITS,
  COMPANION_WEAPON_TYPE_BITS,
  companionIds,
  companionQualityIds,
  companionSkillIds,
  companionTraitIds,
  companionWeaponTypeIds,
} from "@akasha/temper-companion-codec/companion-codec-indices"
import {
  COMPANION_BUILD_TYPE,
  ESO_VERSION_48,
} from "@akasha/temper-companion-codec/companion-codec-v48"
import {
  CHARACTER_CODEC_MINOR_VERSION,
  COMPANION_CODEC_MINOR_VERSION,
  ROLE_BITS,
  TARGET_ARMOR_BITS,
  TARGET_HEALTH_BITS,
} from "../codec-widths/codec-widths.module.code.ts"

export function generateCodecConstants(): string {
  return `\
/**
 * Codec Constants (Generated)
 *
 * Binary codec constants that must match temper's codec implementations.
 * Source: engine/companions/codec/companion-build-codec-v48.ts
 *         engine/companions/codec/companion-build-codec-indices.ts
 *         engine/character/codec/build-codec-v48.ts
 *         engine/character/codec/build-codec-indices.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

// =========================================================================
// Companion Build Codec
// =========================================================================

// Header constants
export const COMPANION_BUILD_TYPE = ${COMPANION_BUILD_TYPE}
export const ESO_VERSION = ${ESO_VERSION_48}
export const CODEC_MINOR_VERSION = ${COMPANION_CODEC_MINOR_VERSION}

// Bit widths (computed from data file lengths)
export const COMPANION_BITS = ${COMPANION_BITS} // ${companionIds.length} companions
export const ROLE_BITS = ${ROLE_BITS}
export const ARMOR_WEIGHT_BITS = ${COMPANION_ARMOR_WEIGHT_BITS} // ${COMPANION_ARMOR_WEIGHT_IDS.length} weights
export const TRAIT_BITS = ${COMPANION_TRAIT_BITS} // ${companionTraitIds.length} traits
export const QUALITY_BITS = ${COMPANION_QUALITY_BITS} // ${companionQualityIds.length} qualities
export const WEAPON_TYPE_BITS = ${COMPANION_WEAPON_TYPE_BITS} // ${companionWeaponTypeIds.length} types
export const SKILL_BITS = ${COMPANION_SKILL_BITS} // ${companionSkillIds.length} skills
export const TARGET_ARMOR_BITS = ${TARGET_ARMOR_BITS}
export const TARGET_HEALTH_BITS = ${TARGET_HEALTH_BITS}

// =========================================================================
// Character Build Codec
// =========================================================================

// Header constants
export const CHARACTER_BUILD_TYPE = ${CHARACTER_BUILD_TYPE}
export const CHARACTER_CODEC_MINOR_VERSION = ${CHARACTER_CODEC_MINOR_VERSION}

// Character bits
export const CHARACTER_CLASS_BITS = ${CLASS_BITS}
export const CHARACTER_RACE_BITS = ${RACE_BITS}
export const CHARACTER_ALLIANCE_BITS = ${ALLIANCE_BITS}
export const CHARACTER_VAMPIRE_STAGE_BITS = ${VAMPIRE_STAGE_BITS}
export const CHARACTER_CURSE_BITS = ${CURSE_BITS}
export const CHARACTER_MUNDUS_BITS = ${MUNDUS_BITS}
export const CHARACTER_SKILL_LINE_BITS = ${SKILL_LINE_BITS}
export const CHARACTER_ATTRIBUTE_BITS = ${ATTRIBUTE_BITS}
export const CHARACTER_ROLE_BITMASK_BITS = 8

// Equipment bits
export const CHARACTER_ARMOR_WEIGHT_BITS = ${ARMOR_WEIGHT_BITS}
export const CHARACTER_ARMOR_TRAIT_BITS = ${ARMOR_TRAIT_BITS}
export const CHARACTER_ARMOR_ENCHANT_BITS = ${ARMOR_ENCHANT_BITS}
export const CHARACTER_JEWELRY_TRAIT_BITS = ${JEWELRY_TRAIT_BITS}
export const CHARACTER_JEWELRY_ENCHANT_BITS = ${JEWELRY_ENCHANT_BITS}
export const CHARACTER_WEAPON_TYPE_BITS = ${WEAPON_TYPE_BITS}
export const CHARACTER_WEAPON_TRAIT_BITS = ${WEAPON_TRAIT_BITS}
export const CHARACTER_WEAPON_ENCHANT_BITS = ${WEAPON_ENCHANT_BITS}
export const CHARACTER_POISON_BITS = ${POISON_BITS}
export const CHARACTER_QUALITY_BITS = ${QUALITY_BITS}
export const CHARACTER_SET_BITS = ${SET_BITS}

// Skill bits
export const CHARACTER_SKILL_BITS = ${SKILL_BITS}
export const CHARACTER_SCRIBED_SKILL_BITS = ${SCRIBED_SKILL_BITS}

// Scribing bits
export const CHARACTER_GRIMOIRE_BITS = ${GRIMOIRE_BITS}
export const CHARACTER_FOCUS_SCRIPT_BITS = ${FOCUS_SCRIPT_BITS}
export const CHARACTER_SIGNATURE_SCRIPT_BITS = ${SIGNATURE_SCRIPT_BITS}
export const CHARACTER_AFFIX_SCRIPT_BITS = ${AFFIX_SCRIPT_BITS}

// Champion point bits
export const CHARACTER_CHAMPION_POINT_BITS = ${CHAMPION_POINT_BITS}

// Consumable bits
export const CHARACTER_FOOD_OR_DRINK_BITS = ${FOOD_OR_DRINK_BITS}
export const CHARACTER_POTION_BITS = ${POTION_BITS}

// Account bits
export const CHARACTER_ESO_PLUS_BITS = ${ESO_PLUS_BITS}

// Count/structural bits (fixed, not data-derived)
export const CHARACTER_SKILL_LINE_COUNT_BITS = 4
export const CHARACTER_SCRIBING_COUNT_BITS = 4
export const CHARACTER_CP_PASSIVE_COUNT_BITS = 7
export const CHARACTER_TARGET_ARMOR_BITS = 1
export const CHARACTER_TARGET_HEALTH_BITS = 7
`
}
