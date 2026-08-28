import type { BadgeToggleGroupItem } from "@shared/design-system"
import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import {
  type TargetArmorId,
  targetArmor,
} from "@temper/game-characters-character/target-armor-data"
import { companionBaseRoles } from "@temper/game-companions-core/companion-base-roles-data"
import { type CompanionId, companions } from "@temper/game-companions-core/companions-data"
import { type CompanionEquipmentQualityId } from "@temper/game-companions-core/equipment/companion-equipment-quality-data"
import { companionEquipmentQualities } from "@temper/game-companions-core/generated/temper-companion-equipment-quality.generated"
import type { SortField } from "@/components/companions/companions-filter-bar"

export type TabValue = "plan" | "build" | "browse" | "leaderboard"

export function isValidGearOwnership(value: unknown): value is "owned" | "unowned" {
  return value === "owned" || value === "unowned"
}

export function isValidTab(value: unknown): value is TabValue {
  return value === "plan" || value === "build" || value === "browse" || value === "leaderboard"
}

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

export function isValidSortDirection(value: unknown): value is SortDirection {
  return value === "asc" || value === "desc"
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

export function isValidGearQualities(
  value: unknown
): readonly CompanionEquipmentQualityId[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const arr = value
      .split(",")
      .filter(companionEquipmentQualities.has.bind(companionEquipmentQualities))
      .filter((q) => q !== "no-quality")
    return arr.length > 0 ? arr : undefined
  }
  if (Array.isArray(value)) {
    if (
      value.every(
        (v) => typeof v === "string" && companionEquipmentQualities.has(v) && v !== "no-quality"
      )
    )
      return value
    return undefined
  }
  return undefined
}
