import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface EquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

const EQUIPMENT_QUALITY_DATA = {
  "no-quality": { id: "no-quality" as const, name: "No Quality", available: true },
  "normal": { id: "normal" as const, name: "Normal", available: true },
  "fine": { id: "fine" as const, name: "Fine", available: true },
  "superior": { id: "superior" as const, name: "Superior", available: true },
  "epic": { id: "epic" as const, name: "Epic", available: true },
  "legendary": { id: "legendary" as const, name: "Legendary", available: true },
  "mythic": { id: "mythic" as const, name: "Mythic", available: false },
} satisfies Record<string, EquipmentQualityTemplate>

export const equipmentQualities = createDataFile<EquipmentQualityTemplate>()(EQUIPMENT_QUALITY_DATA)

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
