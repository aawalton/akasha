import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionWeaponTypeTemplate {
  id: string
  name: string
  isTwoHanded: boolean
  isOffHandOnly?: boolean
}

const COMPANION_WEAPON_TYPE_DATA = {
  "no-type": {
    id: "no-type" as const,
    name: "No Weapon",
    isTwoHanded: false,
  },
  "sword": {
    id: "sword" as const,
    name: "Sword",
    isTwoHanded: false,
  },
  "axe": {
    id: "axe" as const,
    name: "Axe",
    isTwoHanded: false,
  },
  "mace": {
    id: "mace" as const,
    name: "Mace",
    isTwoHanded: false,
  },
  "dagger": {
    id: "dagger" as const,
    name: "Dagger",
    isTwoHanded: false,
  },
  "greatsword": {
    id: "greatsword" as const,
    name: "Greatsword",
    isTwoHanded: true,
  },
  "battleaxe": {
    id: "battleaxe" as const,
    name: "Battleaxe",
    isTwoHanded: true,
  },
  "maul": {
    id: "maul" as const,
    name: "Maul",
    isTwoHanded: true,
  },
  "bow": {
    id: "bow" as const,
    name: "Bow",
    isTwoHanded: true,
  },
  "inferno-staff": {
    id: "inferno-staff" as const,
    name: "Inferno Staff",
    isTwoHanded: true,
  },
  "ice-staff": {
    id: "ice-staff" as const,
    name: "Ice Staff",
    isTwoHanded: true,
  },
  "lightning-staff": {
    id: "lightning-staff" as const,
    name: "Lightning Staff",
    isTwoHanded: true,
  },
  "restoration-staff": {
    id: "restoration-staff" as const,
    name: "Restoration Staff",
    isTwoHanded: true,
  },
  "shield": {
    id: "shield" as const,
    name: "Shield",
    isTwoHanded: false,
    isOffHandOnly: true,
  },
} satisfies Record<string, CompanionWeaponTypeTemplate>

export const companionWeaponTypes = createDataFile<CompanionWeaponTypeTemplate>()(
  COMPANION_WEAPON_TYPE_DATA
)

export type CompanionWeaponTypeId = (typeof companionWeaponTypes.ids)[number]

export const ONE_HANDED_MELEE_WEAPONS: CompanionWeaponTypeId[] = ["sword", "axe", "mace", "dagger"]

export const TWO_HANDED_MELEE_WEAPONS: CompanionWeaponTypeId[] = ["greatsword", "battleaxe", "maul"]

export const DESTRUCTION_STAFF_WEAPONS: CompanionWeaponTypeId[] = [
  "inferno-staff",
  "ice-staff",
  "lightning-staff",
]
