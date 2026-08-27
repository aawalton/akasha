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
export const COMPANION_BUILD_TYPE = 2
export const ESO_VERSION = 48
export const CODEC_MINOR_VERSION = 8

// Bit widths (computed from data file lengths)
export const COMPANION_BITS = 4 // 9 companions
export const ROLE_BITS = 8
export const ARMOR_WEIGHT_BITS = 2 // 4 weights
export const TRAIT_BITS = 4 // 10 traits
export const QUALITY_BITS = 3 // 6 qualities
export const WEAPON_TYPE_BITS = 4 // 14 types
export const SKILL_BITS = 7 // 122 skills
export const TARGET_ARMOR_BITS = 1
export const TARGET_HEALTH_BITS = 1

// =========================================================================
// Character Build Codec
// =========================================================================

// Header constants
export const CHARACTER_BUILD_TYPE = 1
export const CHARACTER_CODEC_MINOR_VERSION = 7

// Character bits
export const CHARACTER_CLASS_BITS = 3
export const CHARACTER_RACE_BITS = 4
export const CHARACTER_ALLIANCE_BITS = 2
export const CHARACTER_VAMPIRE_STAGE_BITS = 3
export const CHARACTER_CURSE_BITS = 2
export const CHARACTER_MUNDUS_BITS = 4
export const CHARACTER_SKILL_LINE_BITS = 7
export const CHARACTER_ATTRIBUTE_BITS = 7
export const CHARACTER_ROLE_BITMASK_BITS = 8

// Equipment bits
export const CHARACTER_ARMOR_WEIGHT_BITS = 2
export const CHARACTER_ARMOR_TRAIT_BITS = 4
export const CHARACTER_ARMOR_ENCHANT_BITS = 3
export const CHARACTER_JEWELRY_TRAIT_BITS = 4
export const CHARACTER_JEWELRY_ENCHANT_BITS = 5
export const CHARACTER_WEAPON_TYPE_BITS = 4
export const CHARACTER_WEAPON_TRAIT_BITS = 4
export const CHARACTER_WEAPON_ENCHANT_BITS = 4
export const CHARACTER_POISON_BITS = 1
export const CHARACTER_QUALITY_BITS = 3
export const CHARACTER_SET_BITS = 10

// Skill bits
export const CHARACTER_SKILL_BITS = 11
export const CHARACTER_SCRIBED_SKILL_BITS = 7

// Scribing bits
export const CHARACTER_GRIMOIRE_BITS = 4
export const CHARACTER_FOCUS_SCRIPT_BITS = 5
export const CHARACTER_SIGNATURE_SCRIPT_BITS = 5
export const CHARACTER_AFFIX_SCRIPT_BITS = 5

// Champion point bits
export const CHARACTER_CHAMPION_POINT_BITS = 7

// Consumable bits
export const CHARACTER_FOOD_OR_DRINK_BITS = 6
export const CHARACTER_POTION_BITS = 6

// Account bits
export const CHARACTER_ESO_PLUS_BITS = 1

// Count/structural bits (fixed, not data-derived)
export const CHARACTER_SKILL_LINE_COUNT_BITS = 4
export const CHARACTER_SCRIBING_COUNT_BITS = 4
export const CHARACTER_CP_PASSIVE_COUNT_BITS = 7
export const CHARACTER_TARGET_ARMOR_BITS = 1
export const CHARACTER_TARGET_HEALTH_BITS = 7
