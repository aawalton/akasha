import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import type { ArmorTypeId } from "@akasha/temper-equipment-kinds/armor-types"
import type { StandardArmorWeightId } from "../armor/armor-weights-data"
import type { JewelryTypeId } from "@akasha/temper-equipment-kinds/jewelry-types"
import type { WeaponTypeId } from "../weapons/weapon-types-data"
import { setsFromPages } from "./generated/temper-set.generated"
import type { SetCategoryId } from "./set-categories-data"

export type EquipmentPattern =
  | WeaponTypeId
  | JewelryTypeId
  | "shield"
  | `${Exclude<ArmorTypeId, "shield">}:${StandardArmorWeightId}`
  | `${Exclude<ArmorTypeId, "shield">}:*`
  | "armor:*"
  | `armor:${StandardArmorWeightId}`
  | "monster"
  | "weapon:*"
  | "jewelry:*"
  | "*"
  | `*:${StandardArmorWeightId}`

type SetBonusStatus = "supported" | "partially-supported" | "unsupported"

interface SetBonus {
  count: number
  description: string

  effects: readonly Effect[]

  status: SetBonusStatus
}

export interface SetsAllTemplate {
  id: SetsAllId
  name: string
  subcategoryId: SetCategoryId
  valid: readonly EquipmentPattern[]
  bonuses: readonly SetBonus[]
  icons?: Partial<Record<EquipmentPattern, string>>
  classId?: ClassId
  esoSetId: number
}

const SETS_ALL_DATA = {
  ...setsFromPages.data,
} satisfies Record<string, SetsAllTemplate>

export const setsAll: DataFile<SetsAllId, SetsAllTemplate, SetCategoryId> =
  createDataFile<SetsAllTemplate>()(SETS_ALL_DATA)

export type SetsAllId = SetId

export type SetsAll = SetsAllTemplate & { id: SetsAllId }

export function isSetsAllId(value: string): value is SetsAllId {
  return setsAll.has(value)
}
