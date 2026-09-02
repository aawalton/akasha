import type { companionEquipmentQualities } from "@akasha/temper-companions-core/companion-equipment-qualities"


export interface CompanionEquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

export type CompanionEquipmentQualityId = (typeof companionEquipmentQualities.ids)[number]
