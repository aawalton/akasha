import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionArmorWeight } from "../companion-armor-weights/companion-armor-weights.module.code.ts"
import type { CompanionRoleId } from "../companion-roles/companion-roles.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponRoleId } from "../companion-weapon-roles/companion-weapon-roles.module.code.ts"

export interface CompanionBaseRoleTemplate {
  id: string
  name: string
  abbreviation: string
  description: string
  validWeaponRoleIds: readonly CompanionWeaponRoleId[]
  validTraitIds: readonly CompanionTraitId[]
  validArmorWeights: readonly CompanionArmorWeight[]
}

const COMPANION_BASE_ROLE_DATA = {
  "dps": {
    id: "dps" as const,
    name: "DPS",
    abbreviation: "D",
    description: "Focused on dealing damage",
    validWeaponRoleIds: [
      "dual-wield",
      "two-handed",
      "bow",
      "inferno-staff",
      "ice-staff",
      "lightning-staff",
    ] as readonly CompanionWeaponRoleId[],
    validTraitIds: [
      "aggressive",
      "shattering",
      "quickened",
      "focused",
    ] as readonly CompanionTraitId[],
    validArmorWeights: ["medium"] as readonly CompanionArmorWeight[],
  },
  "tank": {
    id: "tank" as const,
    name: "Tank",
    abbreviation: "T",
    description: "Focused on absorbing damage and controlling enemies",
    validWeaponRoleIds: [
      "one-hand-and-shield",
      "ice-staff",
      "restoration-staff",
    ] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["vigorous", "soothing", "quickened", "focused"] as readonly CompanionTraitId[],
    validArmorWeights: ["heavy"] as readonly CompanionArmorWeight[],
  },
  "healer": {
    id: "healer" as const,
    name: "Healer",
    abbreviation: "H",
    description: "Focused on healing and supporting allies",
    validWeaponRoleIds: ["restoration-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["soothing", "quickened", "focused"] as readonly CompanionTraitId[],
    validArmorWeights: ["light"] as readonly CompanionArmorWeight[],
  },
  "support": {
    id: "support" as const,
    name: "Support",
    abbreviation: "S",
    description: "Focused on buffing allies through offensive and defensive buffs and debuffs",
    validWeaponRoleIds: ["restoration-staff"] as readonly CompanionWeaponRoleId[],
    validTraitIds: ["quickened"] as readonly CompanionTraitId[],
    validArmorWeights: ["light"] as readonly CompanionArmorWeight[],
  },
} as const satisfies Record<string, CompanionBaseRoleTemplate>

export const companionBaseRoles =
  createDataFile<CompanionBaseRoleTemplate>()(COMPANION_BASE_ROLE_DATA)

export type CompanionBaseRoleId = (typeof companionBaseRoles.ids)[number]

export function getValidWeaponRoleIdsForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionWeaponRoleId[] {
  const set = new Set<CompanionWeaponRoleId>()
  for (const roleId of roles) {
    for (const id of companionBaseRoles.data[roleId].validWeaponRoleIds) {
      set.add(id)
    }
  }
  return [...set]
}

export function getValidTraitIdsForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionTraitId[] {
  const set = new Set<CompanionTraitId>()
  for (const roleId of roles) {
    for (const id of companionBaseRoles.data[roleId].validTraitIds) {
      set.add(id)
    }
  }
  return [...set]
}

export function getArmorWeightForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): Exclude<CompanionArmorWeight, "no-weight"> {
  for (const roleId of roles) {
    if (roleId === "tank") return "heavy"
  }
  for (const roleId of roles) {
    if (roleId === "dps") return "medium"
  }
  return "light"
}

const BASE_ROLE_NAME_ORDER = ["DPS", "Healer", "Support", "Tank"]

export function getBaseRoleName(roles: readonly CompanionBaseRoleId[]): string {
  if (roles.length === 0) return "No Role"
  const names = [...new Set(roles.map((id) => companionBaseRoles.data[id].name))]
  names.sort((a, b) => BASE_ROLE_NAME_ORDER.indexOf(a) - BASE_ROLE_NAME_ORDER.indexOf(b))
  return names.join(" + ")
}

export function compareRoleIds(a: CompanionRoleId, b: CompanionRoleId): number {
  const partsA = a.split("+")
  const partsB = b.split("+")

  if (partsA.length !== partsB.length) return partsA.length - partsB.length

  for (const [i, partA] of partsA.entries()) {
    const partB = partsB[i]
    if (partB === undefined) break
    const indexA = getRolePartSortIndex(partA)
    const indexB = getRolePartSortIndex(partB)
    if (indexA !== indexB) return indexA - indexB
  }
  return 0
}

const ROLE_SORT_ORDER: CompanionBaseRoleId[] = ["tank", "healer", "support", "dps"]
const roleIdToIndex = new Map<string, number>(ROLE_SORT_ORDER.map((id, i) => [id, i * 3]))

function getRolePartSortIndex(part: string): number {
  const exact = roleIdToIndex.get(part)
  if (exact !== undefined) return exact

  const base = part.split("-")[0]
  if (base === undefined) return Number.MAX_SAFE_INTEGER
  const baseIndex = roleIdToIndex.get(base)
  if (baseIndex !== undefined) return baseIndex + 1

  return Number.MAX_SAFE_INTEGER
}
