import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_WEAPON_BARS } from "./generated/temper-weapon-bar.generated"

export interface WeaponBarTemplate {
  id: string
  name: string
}

export const weaponBars = createDataFile<WeaponBarTemplate>()(TEMPER_WEAPON_BARS)

export type WeaponBar = (typeof weaponBars.ids)[number]
