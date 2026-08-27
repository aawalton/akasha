import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_ARMOR_TYPES_BY_ID } from "./generated/temper-armor-type.generated"

export interface ArmorTypeTemplate {
  id: string
  name: string
  armorMultiplier: number
  isLargeEnchantSlot: boolean
  validSlots: readonly string[]
}

export const armorTypes = createDataFile<ArmorTypeTemplate>()(TEMPER_ARMOR_TYPES_BY_ID)

export type ArmorTypeId = (typeof armorTypes.ids)[number]

export type StandardArmorType = Exclude<ArmorTypeId, "shield">

export function isLargeArmorEnchantSlot(slot: ArmorTypeId): boolean {
  return armorTypes.data[slot].isLargeEnchantSlot
}

export function getArmorMultiplier(slot: ArmorTypeId): number {
  return armorTypes.data[slot].armorMultiplier
}
