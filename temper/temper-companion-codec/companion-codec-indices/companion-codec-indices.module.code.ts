import type { CompanionArmorWeight } from "@akasha/temper-companions-core/companion-armor-weights"
import { companionEquipmentQualities } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { companionSkills } from "@akasha/temper-companions-core/companion-skills"
import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import { companions } from "@akasha/temper-companions-core/companions"
import { requireFirst } from "@akasha/utils-narrow/require-first"

export const companionIds = companions.ids

export const companionTraitIds = companionTraits.ids
export const companionQualityIds = companionEquipmentQualities.ids
export const companionWeaponTypeIds = companionWeaponTypes.ids

export const companionSkillIds = companionSkills.ids

export const COMPANION_ARMOR_WEIGHT_IDS = [
  "no-weight",
  "light",
  "medium",
  "heavy",
] as const satisfies readonly CompanionArmorWeight[]

function bitsNeeded(count: number): number {
  if (count <= 1) return 1
  return Math.ceil(Math.log2(count))
}

export const COMPANION_BITS = bitsNeeded(companionIds.length)

export const COMPANION_ARMOR_WEIGHT_BITS = bitsNeeded(COMPANION_ARMOR_WEIGHT_IDS.length)
export const COMPANION_TRAIT_BITS = bitsNeeded(companionTraitIds.length)
export const COMPANION_QUALITY_BITS = bitsNeeded(companionQualityIds.length)
export const COMPANION_WEAPON_TYPE_BITS = bitsNeeded(companionWeaponTypeIds.length)

export const COMPANION_SKILL_BITS = bitsNeeded(companionSkillIds.length)

function createIndexMap(ids: readonly string[]): Map<string, number> {
  const map = new Map<string, number>()
  for (const [i, id] of ids.entries()) {
    map.set(id, i)
  }
  return map
}

const companionIndexMap = createIndexMap(companionIds)

const companionArmorWeightIndexMap = createIndexMap(COMPANION_ARMOR_WEIGHT_IDS)
const companionTraitIndexMap = createIndexMap(companionTraitIds)
const companionQualityIndexMap = createIndexMap(companionQualityIds)
const companionWeaponTypeIndexMap = createIndexMap(companionWeaponTypeIds)

const companionSkillIndexMap = createIndexMap(companionSkillIds)

export function getCompanionIndex(id: string): number {
  return companionIndexMap.get(id) ?? 0
}

export function getCompanionArmorWeightIndex(id: string): number {
  return companionArmorWeightIndexMap.get(id) ?? 0
}

export function getCompanionTraitIndex(id: string): number {
  return companionTraitIndexMap.get(id) ?? 0
}

export function getCompanionQualityIndex(id: string): number {
  return companionQualityIndexMap.get(id) ?? 0
}

export function getCompanionWeaponTypeIndex(id: string): number {
  return companionWeaponTypeIndexMap.get(id) ?? 0
}

export function getCompanionSkillIndex(id: string): number {
  return companionSkillIndexMap.get(id) ?? 0
}

export function getCompanionId(index: number): (typeof companionIds)[number] {
  return companionIds[index] ?? requireFirst(companionIds)
}

export function getCompanionArmorWeightId(
  index: number
): (typeof COMPANION_ARMOR_WEIGHT_IDS)[number] {
  return COMPANION_ARMOR_WEIGHT_IDS[index] ?? requireFirst(COMPANION_ARMOR_WEIGHT_IDS)
}

export function getCompanionTraitId(index: number): (typeof companionTraitIds)[number] {
  return companionTraitIds[index] ?? requireFirst(companionTraitIds)
}

export function getCompanionQualityId(index: number): (typeof companionQualityIds)[number] {
  return companionQualityIds[index] ?? requireFirst(companionQualityIds)
}

export function getCompanionWeaponTypeId(index: number): (typeof companionWeaponTypeIds)[number] {
  return companionWeaponTypeIds[index] ?? requireFirst(companionWeaponTypeIds)
}

export function getCompanionSkillId(index: number): (typeof companionSkillIds)[number] {
  return companionSkillIds[index] ?? requireFirst(companionSkillIds)
}
