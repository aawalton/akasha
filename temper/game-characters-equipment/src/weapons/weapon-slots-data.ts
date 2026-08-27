import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_WEAPON_SLOTS_BY_ID } from "./generated/temper-weapon-slot.generated"

export interface WeaponSlotTemplate {
  id: string
  name: string
  icon?: string
}

export const weaponSlots = createDataFile<WeaponSlotTemplate>()(TEMPER_WEAPON_SLOTS_BY_ID)

export type WeaponSlot = (typeof weaponSlots.ids)[number]
