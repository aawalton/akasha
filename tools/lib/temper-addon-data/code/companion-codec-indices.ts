import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  COMPANION_ARMOR_WEIGHT_BITS: number
  COMPANION_BITS: number
  COMPANION_QUALITY_BITS: number
  COMPANION_SKILL_BITS: number
  COMPANION_TRAIT_BITS: number
  COMPANION_WEAPON_TYPE_BITS: number
  companionArmorWeightIds: readonly string[]
  companionIds: readonly string[]
  companionQualityIds: readonly string[]
  companionSkillIds: readonly string[]
  companionTraitIds: readonly string[]
  companionWeaponTypeIds: readonly string[]
}>("@temper/game-codec/companions/companion-codec-indices")

export const COMPANION_ARMOR_WEIGHT_BITS = held.COMPANION_ARMOR_WEIGHT_BITS
export const COMPANION_BITS = held.COMPANION_BITS
export const COMPANION_QUALITY_BITS = held.COMPANION_QUALITY_BITS
export const COMPANION_SKILL_BITS = held.COMPANION_SKILL_BITS
export const COMPANION_TRAIT_BITS = held.COMPANION_TRAIT_BITS
export const COMPANION_WEAPON_TYPE_BITS = held.COMPANION_WEAPON_TYPE_BITS
export const companionArmorWeightIds = held.companionArmorWeightIds
export const companionIds = held.companionIds
export const companionQualityIds = held.companionQualityIds
export const companionSkillIds = held.companionSkillIds
export const companionTraitIds = held.companionTraitIds
export const companionWeaponTypeIds = held.companionWeaponTypeIds
