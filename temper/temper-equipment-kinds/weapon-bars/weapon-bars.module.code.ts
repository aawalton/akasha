import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface WeaponBarTemplate {
  id: string
  name: string
}

export const TEMPER_WEAPON_BARS = {
  "primary-weapon-bar": { id: "primary-weapon-bar", name: "Primary Bar" },
  "backup-weapon-bar": { id: "backup-weapon-bar", name: "Backup Bar" },
} as const satisfies Record<string, WeaponBarTemplate>

export const weaponBars = createDataFile<WeaponBarTemplate>()(TEMPER_WEAPON_BARS)

export type WeaponBar = (typeof weaponBars.ids)[number]
