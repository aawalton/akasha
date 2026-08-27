import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { CompanionRoleId } from "./companion-roles"
import type { CompanionArmorWeight, CompanionState } from "./companion-types"
import { setAllArmorWeights } from "./equipment/companion-armor-slots-data"
import type { CompanionTraitId } from "./equipment/companion-traits-data"
import type { CompanionWeaponRoleId } from "./equipment/companion-weapon-roles-data"
import { TEMPER_COMPANION_BASE_ROLES_BY_ID } from "./generated/temper-companion-base-role.generated"

export interface CompanionBaseRoleTemplate {
  id: string
  name: string
  abbreviation: string
  description: string
  validWeaponRoleIds: readonly CompanionWeaponRoleId[]
  validTraitIds: readonly CompanionTraitId[]
  validArmorWeights: readonly CompanionArmorWeight[]
}

export const companionBaseRoles = createDataFile<CompanionBaseRoleTemplate>()(
  TEMPER_COMPANION_BASE_ROLES_BY_ID
)

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

export function setBaseRoles(
  build: CompanionState,
  roles: readonly CompanionBaseRoleId[]
): CompanionState {
  const withRoles = {
    ...build,
    companion: {
      ...build.companion,
      baseRoles: roles,
    },
  }
  return setAllArmorWeights(withRoles, getArmorWeightForBaseRoles(roles))
}
