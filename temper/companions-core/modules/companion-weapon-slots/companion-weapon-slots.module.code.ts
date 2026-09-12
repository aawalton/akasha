import { createDataFile } from "akasha/utils/narrow/modules/create-data-file/create-data-file.module.code.ts"

export interface CompanionWeaponSlotTemplate {
  id: string
  name: string
}

const COMPANION_WEAPON_SLOT_DATA = {
  "main-hand": { id: "main-hand", name: "Main Hand" },
  "off-hand": { id: "off-hand", name: "Off Hand" },
} as const satisfies Record<string, CompanionWeaponSlotTemplate>

export const companionWeaponSlots = createDataFile<CompanionWeaponSlotTemplate>()(
  COMPANION_WEAPON_SLOT_DATA
)

export type CompanionWeaponSlotId = (typeof companionWeaponSlots.ids)[number]
