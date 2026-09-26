import { bitsNeeded } from "akasha/code/type/narrowing/modules/bits-needed/bits-needed.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualities,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"

function companionIds(): readonly string[] {
  return companions().ids
}

function companionTraitIds(): readonly string[] {
  return companionTraits().ids
}

function companionQualityIds(): readonly CompanionEquipmentQualityId[] {
  return companionEquipmentQualities().map((quality) => quality.id)
}

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

export function companionBits(): number {
  return bitsNeeded(companionIds().length)
}

export const COMPANION_ARMOR_WEIGHT_BITS = bitsNeeded(COMPANION_ARMOR_WEIGHT_IDS.length)
export function companionQualityBits(): number {
  return bitsNeeded(companionQualityIds().length)
}

export const COMPANION_WEAPON_TYPE_BITS = bitsNeeded(companionWeaponTypeIds.length)

export function companionTraitBits(): number {
  return bitsNeeded(companionTraitIds().length)
}

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


const companionArmorWeightIndexMap = createIndexMap(COMPANION_ARMOR_WEIGHT_IDS)


const companionWeaponTypeIndexMap = createIndexMap(companionWeaponTypeIds)


export function getCompanionIndex(id: string): number {
  return createIndexMap(companionIds()).get(id) ?? 0
}

export function getCompanionArmorWeightIndex(id: string): number {
  return companionArmorWeightIndexMap.get(id) ?? 0
}

export function getCompanionTraitIndex(id: string): number {
  return createIndexMap(companionTraitIds()).get(id) ?? 0
}

export function getCompanionQualityIndex(id: string): number {
  return createIndexMap(companionQualityIds()).get(id) ?? 0
}

export function getCompanionWeaponTypeIndex(id: string): number {
  return companionWeaponTypeIndexMap.get(id) ?? 0
}

export function getCompanionSkillIndex(id: string): number {
  return createIndexMap(companionSkillIds()).get(id) ?? 0
}

export function getCompanionId(index: number): string {
  const ids = companionIds()
  return ids[index] ?? requireFirst(ids)
}

export function getCompanionArmorWeightId(
  index: number
): (typeof COMPANION_ARMOR_WEIGHT_IDS)[number] {
  return COMPANION_ARMOR_WEIGHT_IDS[index] ?? requireFirst(COMPANION_ARMOR_WEIGHT_IDS)
}

export function getCompanionTraitId(index: number): string {
  const ids = companionTraitIds()
  return ids[index] ?? requireFirst(ids)
}

export function getCompanionQualityId(index: number): CompanionEquipmentQualityId {
  const ids = companionQualityIds()
  return ids[index] ?? requireFirst(ids)
}

export function getCompanionWeaponTypeId(index: number): (typeof companionWeaponTypeIds)[number] {
  return companionWeaponTypeIds[index] ?? requireFirst(companionWeaponTypeIds)
}

export function getCompanionSkillId(index: number): string {
  const ids = companionSkillIds()
  return ids[index] ?? requireFirst(ids)
}
