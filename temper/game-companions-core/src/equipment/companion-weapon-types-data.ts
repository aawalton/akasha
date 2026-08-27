import type { companionWeaponTypes } from "../generated/temper-companion-weapon-type.generated"


export interface CompanionWeaponTypeTemplate {
  id: string
  name: string
  isTwoHanded: boolean
  isOffHandOnly?: boolean
}

export type CompanionWeaponTypeId = (typeof companionWeaponTypes.ids)[number]

export const ONE_HANDED_MELEE_WEAPONS: CompanionWeaponTypeId[] = ["sword", "axe", "mace", "dagger"]

export const TWO_HANDED_MELEE_WEAPONS: CompanionWeaponTypeId[] = ["greatsword", "battleaxe", "maul"]

export const DESTRUCTION_STAFF_WEAPONS: CompanionWeaponTypeId[] = [
  "inferno-staff",
  "ice-staff",
  "lightning-staff",
]
