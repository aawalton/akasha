import type { companionEquipmentQualities } from "../generated/temper-companion-equipment-quality.generated"


export interface CompanionEquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

export type CompanionEquipmentQualityId = (typeof companionEquipmentQualities.ids)[number]
