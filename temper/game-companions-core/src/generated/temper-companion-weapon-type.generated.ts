/**
 * Temper Companion Weapon Types (Generated)
 *
 * All weapon types companions can equip — one-handed melee, two-handed
 * melee, bow, destruction staves, restoration staff, and shield — plus
 * the `no-type` empty-state sentinel. Sourced from the universal pages
 * table (page type: temper-companion-weapon-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"

interface CompanionWeaponTypeTemplate {
  id: string
  name: string
  isTwoHanded: boolean
  /** If true, can only be equipped in off-hand slot */
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
