import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import { setsFromPages } from "./generated/temper-set.generated"

export type { EquipmentPattern } from "@akasha/temper-equipment/set-patterns"

export type SetsAllId = SetId

export type SetsAllTemplate = SetTemplate

export type SetsAll = SetTemplate

const SETS_ALL_DATA = {
  ...setsFromPages.data,
} satisfies Record<string, SetTemplate>

export const setsAll: DataFile<SetId, SetTemplate, SetCategoryId> =
  createDataFile<SetTemplate>()(SETS_ALL_DATA)

export function isSetsAllId(value: string): value is SetId {
  return setsAll.has(value)
}
