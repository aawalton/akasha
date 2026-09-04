import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionArmorSlotTemplate {
  id: string
  name: string
  equipType: number
}

const COMPANION_ARMOR_SLOT_DATA = {
  "head": { id: "head" as const, name: "Head", equipType: 1 },
  "shoulders": { id: "shoulders" as const, name: "Shoulders", equipType: 4 },
  "chest": { id: "chest" as const, name: "Chest", equipType: 3 },
  "hands": { id: "hands" as const, name: "Hands", equipType: 13 },
  "waist": { id: "waist" as const, name: "Waist", equipType: 8 },
  "legs": { id: "legs" as const, name: "Legs", equipType: 9 },
  "feet": { id: "feet" as const, name: "Feet", equipType: 10 },
} as const satisfies Record<string, CompanionArmorSlotTemplate>

export const companionArmorSlots =
  createDataFile<CompanionArmorSlotTemplate>()(COMPANION_ARMOR_SLOT_DATA)

export type CompanionArmorSlotId = (typeof companionArmorSlots.ids)[number]
