import { bitsNeeded } from "akasha/code/type/narrowing/modules/bits-needed/bits-needed.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import { companionEquipmentQualities } from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"

const companionIds = companions.ids

const companionTraitIds = companionTraits.ids
const companionQualityIds = companionEquipmentQualities.ids
const companionWeaponTypeIds = companionWeaponTypes.ids

function companionSkillIds(): readonly string[] {
  return companionCatalog().skillIds
}

const COMPANION_ARMOR_WEIGHT_IDS = [
  "no-weight",
  "light",
  "medium",
  "heavy",
] as const satisfies readonly CompanionArmorWeight[]

export const COMPANION_BITS = bitsNeeded(companionIds.length)

export const COMPANION_ARMOR_WEIGHT_BITS = bitsNeeded(COMPANION_ARMOR_WEIGHT_IDS.length)
export const COMPANION_TRAIT_BITS = bitsNeeded(companionTraitIds.length)
export const COMPANION_QUALITY_BITS = bitsNeeded(companionQualityIds.length)
export const COMPANION_WEAPON_TYPE_BITS = bitsNeeded(companionWeaponTypeIds.length)

export function companionSkillBits(): number {
  return bitsNeeded(companionSkillIds().length)
}

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
  return createIndexMap(companionSkillIds()).get(id) ?? 0
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

export function getCompanionSkillId(index: number): string {
  const ids = companionSkillIds()
  return ids[index] ?? requireFirst(ids)
}
