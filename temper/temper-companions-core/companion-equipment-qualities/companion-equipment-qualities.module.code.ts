import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionEquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

const COMPANION_EQUIPMENT_QUALITY_DATA = {
  "no-quality": {
    id: "no-quality" as const,
    name: "No Quality",
    available: true,
  },
  "normal": {
    id: "normal" as const,
    name: "Normal",
    available: true,
  },
  "fine": {
    id: "fine" as const,
    name: "Fine",
    available: true,
  },
  "superior": {
    id: "superior" as const,
    name: "Superior",
    available: true,
  },
  "epic": {
    id: "epic" as const,
    name: "Epic",
    available: true,
  },
  "legendary": {
    id: "legendary" as const,
    name: "Legendary",
    available: false,
  },
} satisfies Record<string, CompanionEquipmentQualityTemplate>

export const companionEquipmentQualities = createDataFile<CompanionEquipmentQualityTemplate>()(
  COMPANION_EQUIPMENT_QUALITY_DATA
)

export type CompanionEquipmentQualityId = (typeof companionEquipmentQualities.ids)[number]
