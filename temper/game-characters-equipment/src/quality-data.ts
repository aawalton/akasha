import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_EQUIPMENT_QUALITIES_BY_ID } from "./generated/temper-quality.generated"

export interface EquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

export const equipmentQualities = createDataFile<EquipmentQualityTemplate>()(
  TEMPER_EQUIPMENT_QUALITIES_BY_ID
)

export type EquipmentQualityOptionId = (typeof equipmentQualities.ids)[number]

export type EquipmentQualityId = "normal" | "fine" | "superior" | "epic" | "legendary"

export function resolveQuality(quality: EquipmentQualityOptionId | undefined): EquipmentQualityId {
  if (quality == null || quality === "no-quality") return "legendary"
  if (quality === "mythic") return "legendary"
  return quality
}

const QUALITY_RANK: Record<EquipmentQualityId, number> = {
  normal: 0,
  fine: 1,
  superior: 2,
  epic: 3,
  legendary: 4,
}

export function minQuality(a: EquipmentQualityId, b: EquipmentQualityId): EquipmentQualityId {
  return QUALITY_RANK[a] <= QUALITY_RANK[b] ? a : b
}
