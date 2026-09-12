import type { BadgeToggleGroupItem } from "akasha/design/interfaces/badges/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type { SortDirection } from "akasha/design/interfaces/patterns/sort-types/sort-types.module.code.ts"
import {
  type TargetArmorId,
  targetArmor,
} from "akasha/temper/character-sources/target-armors/target-armors.module.code.ts"
import { companionBaseRoles } from "akasha/temper/companions-core/companion-base-roles/companion-base-roles.module.code.ts"
import {
  type CompanionId,
  companions,
} from "akasha/temper/companions-core/companions/companions.module.code.ts"
import type { TabValue } from "akasha/temper/web/build-page-tab/build-page-tab.module.code.ts"
import type { SortField } from "akasha/temper/web/companions-filter-bar/companions-filter-bar.module.code.tsx"

export const BASE_ROLES = companionBaseRoles.ids

export const LEADERBOARD_TARGET_ARMOR_ITEMS: BadgeToggleGroupItem[] = targetArmor.list.map(
  (ta) => ({
    value: ta.id,
    label: ta.name,
  })
)

export const LEADERBOARD_TARGET_COUNT_ITEMS: BadgeToggleGroupItem[] = [
  { value: "1", label: "Single Target" },
  { value: "3", label: "AOE" },
]

export const LEADERBOARD_TARGET_HEALTH_ITEMS: BadgeToggleGroupItem[] = [
  { value: "full", label: "Full" },
  { value: "execute", label: "Execute" },
]

export type FilterValues = {
  tab: TabValue
  search: string
  roles: readonly string[]
  companion: string | null
  targetArmor: string | null
  targetCount: string | null
  targetHealth: string | null
  sortBy: SortField
  sortDirection: SortDirection
  leaderboardTargetArmor: string | null
  leaderboardTargetCount: string | null
  leaderboardTargetHealth: string | null
}

export function isValidSortField(value: unknown): value is SortField {
  return value === "updated" || value === "name" || value === "score"
}

export function isValidRoles(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((r) => BASE_ROLES.some((role) => role === r))
}

export function isValidCompanion(value: unknown): value is CompanionId {
  return typeof value === "string" && value in companions.data && value !== "no-companion"
}

export function isValidTargetArmor(value: unknown): value is TargetArmorId {
  return typeof value === "string" && targetArmor.has(value)
}

export function isValidTargetCount(value: unknown): value is string {
  return value === "1" || value === "3"
}

export function isValidTargetHealth(value: unknown): value is string {
  return value === "full" || value === "execute"
}
