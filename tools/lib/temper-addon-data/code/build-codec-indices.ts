import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  AFFIX_SCRIPT_BITS: number
  ALLIANCE_BITS: number
  ARMOR_ENCHANT_BITS: number
  ARMOR_TRAIT_BITS: number
  ARMOR_WEIGHT_BITS: number
  ATTRIBUTE_BITS: number
  CHAMPION_POINT_BITS: number
  CLASS_BITS: number
  CURSE_BITS: number
  ESO_PLUS_BITS: number
  FOCUS_SCRIPT_BITS: number
  FOOD_OR_DRINK_BITS: number
  GRIMOIRE_BITS: number
  JEWELRY_ENCHANT_BITS: number
  JEWELRY_TRAIT_BITS: number
  MUNDUS_BITS: number
  PASSIVE_SKILL_COUNT: number
  POISON_BITS: number
  POTION_BITS: number
  QUALITY_BITS: number
  RACE_BITS: number
  SCRIBED_SKILL_BITS: number
  SET_BITS: number
  SIGNATURE_SCRIPT_BITS: number
  SKILL_BITS: number
  SKILL_LINE_BITS: number
  VAMPIRE_STAGE_BITS: number
  WEAPON_ENCHANT_BITS: number
  WEAPON_TRAIT_BITS: number
  WEAPON_TYPE_BITS: number
  passiveSkillIds: readonly string[]
}>("@temper/game-codec/character/build-codec-indices")

export const AFFIX_SCRIPT_BITS = held.AFFIX_SCRIPT_BITS
export const ALLIANCE_BITS = held.ALLIANCE_BITS
export const ARMOR_ENCHANT_BITS = held.ARMOR_ENCHANT_BITS
export const ARMOR_TRAIT_BITS = held.ARMOR_TRAIT_BITS
export const ARMOR_WEIGHT_BITS = held.ARMOR_WEIGHT_BITS
export const ATTRIBUTE_BITS = held.ATTRIBUTE_BITS
export const CHAMPION_POINT_BITS = held.CHAMPION_POINT_BITS
export const CLASS_BITS = held.CLASS_BITS
export const CURSE_BITS = held.CURSE_BITS
export const ESO_PLUS_BITS = held.ESO_PLUS_BITS
export const FOCUS_SCRIPT_BITS = held.FOCUS_SCRIPT_BITS
export const FOOD_OR_DRINK_BITS = held.FOOD_OR_DRINK_BITS
export const GRIMOIRE_BITS = held.GRIMOIRE_BITS
export const JEWELRY_ENCHANT_BITS = held.JEWELRY_ENCHANT_BITS
export const JEWELRY_TRAIT_BITS = held.JEWELRY_TRAIT_BITS
export const MUNDUS_BITS = held.MUNDUS_BITS
export const PASSIVE_SKILL_COUNT = held.PASSIVE_SKILL_COUNT
export const POISON_BITS = held.POISON_BITS
export const POTION_BITS = held.POTION_BITS
export const QUALITY_BITS = held.QUALITY_BITS
export const RACE_BITS = held.RACE_BITS
export const SCRIBED_SKILL_BITS = held.SCRIBED_SKILL_BITS
export const SET_BITS = held.SET_BITS
export const SIGNATURE_SCRIPT_BITS = held.SIGNATURE_SCRIPT_BITS
export const SKILL_BITS = held.SKILL_BITS
export const SKILL_LINE_BITS = held.SKILL_LINE_BITS
export const VAMPIRE_STAGE_BITS = held.VAMPIRE_STAGE_BITS
export const WEAPON_ENCHANT_BITS = held.WEAPON_ENCHANT_BITS
export const WEAPON_TRAIT_BITS = held.WEAPON_TRAIT_BITS
export const WEAPON_TYPE_BITS = held.WEAPON_TYPE_BITS
export const passiveSkillIds = held.passiveSkillIds
