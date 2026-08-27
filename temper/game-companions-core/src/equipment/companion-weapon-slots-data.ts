import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_COMPANION_WEAPON_SLOTS } from "../generated/temper-companion-weapon-slot.generated"

export interface CompanionWeaponSlotTemplate {
  id: string
  name: string
}

export const companionWeaponSlots = createDataFile<CompanionWeaponSlotTemplate>()(
  TEMPER_COMPANION_WEAPON_SLOTS
)

export type CompanionWeaponSlotId = (typeof companionWeaponSlots.ids)[number]
