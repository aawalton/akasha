import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_JEWELRY_TYPES_BY_ID } from "./generated/temper-jewelry-type.generated"

export interface JewelryTypeTemplate {
  id: string
  name: string
  validSlots: readonly string[]
}

export const jewelryTypes = createDataFile<JewelryTypeTemplate>()(TEMPER_JEWELRY_TYPES_BY_ID)

export type JewelryTypeId = (typeof jewelryTypes.ids)[number]
