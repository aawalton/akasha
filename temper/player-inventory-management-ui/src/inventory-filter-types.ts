import type { BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import type { SortDirection, SortOption } from "@shared/design-patterns/utils/sort-types"
import type { ReactNode } from "react"

export type SortField = "name" | "quality" | "count" | "value"

export type RuleSortField = "priority" | "name" | "action" | "goal" | "updated"

export const RULE_SORT_OPTIONS: SortOption<RuleSortField>[] = [
  { value: "priority", label: "Priority", defaultDirection: "asc" },
  { value: "name", label: "Name", defaultDirection: "asc" },
  { value: "action", label: "Action", defaultDirection: "asc" },
  { value: "goal", label: "Goal", defaultDirection: "asc" },
  { value: "updated", label: "Updated", defaultDirection: "desc" },
]

export function isValidRuleSortField(value: unknown): value is RuleSortField {
  return (
    value === "priority" ||
    value === "name" ||
    value === "action" ||
    value === "goal" ||
    value === "updated"
  )
}

export type FilterValues = {
  search: string
  sortBy: SortField
  sortDirection: SortDirection
  qualities: readonly number[]
  armorTraits: readonly string[]
  weaponTraits: readonly string[]
  jewelryTraits: readonly string[]
  companionTraits: readonly string[]
}

export const SORT_OPTIONS: SortOption<SortField>[] = [
  { value: "name", label: "Name", defaultDirection: "asc" },
  { value: "quality", label: "Quality", defaultDirection: "desc" },
  { value: "count", label: "Count", defaultDirection: "desc" },
  { value: "value", label: "Value", defaultDirection: "desc" },
]

export const QUALITY_FILTER_ITEMS: BadgeToggleGroupItem[] = [
  { value: "1", label: "Normal", variant: "normal" },
  { value: "2", label: "Fine", variant: "fine" },
  { value: "3", label: "Superior", variant: "superior" },
  { value: "4", label: "Epic", variant: "epic" },
  { value: "5", label: "Legendary", variant: "legendary" },
]

export function isValidSortField(value: unknown): value is SortField {
  return value === "name" || value === "quality" || value === "count" || value === "value"
}

export function isValidSortDirection(value: unknown): value is SortDirection {
  return value === "asc" || value === "desc"
}

export function isValidQualities(value: unknown): readonly number[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const nums = value.split(",").map(Number)
    if (nums.every((n) => n >= 1 && n <= 5)) return nums
    return undefined
  }
  if (Array.isArray(value)) {
    const nums = value.map(Number)
    if (nums.every((n) => n >= 1 && n <= 5)) return nums
    return undefined
  }
  return undefined
}

function isValidTraitArray(value: unknown): readonly string[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const parts = value.split(",")
    if (parts.every((p) => p.length > 0)) return parts
    return undefined
  }
  return undefined
}

export const isValidArmorTraits = isValidTraitArray
export const isValidWeaponTraits = isValidTraitArray
export const isValidJewelryTraits = isValidTraitArray
export const isValidCompanionTraits = isValidTraitArray

export type ActiveStatusFilter = "active" | "inactive" | "duplicate"
export type LockStatusFilter = "locked" | "unlocked"

const VALID_STATUS_VALUES = new Set<string>(["active", "inactive", "duplicate"])
const VALID_LOCK_VALUES = new Set<string>(["locked", "unlocked"])

export function isActiveStatusFilter(value: string): value is ActiveStatusFilter {
  return VALID_STATUS_VALUES.has(value)
}

export function isLockStatusFilter(value: string): value is LockStatusFilter {
  return VALID_LOCK_VALUES.has(value)
}

export function isValidRuleStatus(value: unknown): readonly ActiveStatusFilter[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const parts = value.split(",")
    if (parts.every(isActiveStatusFilter)) return parts
    return undefined
  }
  return undefined
}

export function isValidRuleLock(value: unknown): readonly LockStatusFilter[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const parts = value.split(",")
    if (parts.every(isLockStatusFilter)) return parts
    return undefined
  }
  return undefined
}

const VALID_GOAL_VALUES = new Set<string>([
  "none",
  "equip",
  "unlock",
  "progress",
  "use",
  "task",
  "hoard",
  "sell",
])

export function isValidRuleGoal(value: unknown): readonly string[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const parts = value.split(",")
    if (parts.every((p) => VALID_GOAL_VALUES.has(p))) return parts
    return undefined
  }
  return undefined
}

const VALID_ACTION_VALUES = new Set<string>([
  "nothing",
  "lock",
  "unlock",
  "deconstruct",
  "refine",
  "destroy",
  "research",
  "fence-launder",
  "fence-sell",
  "list",
  "character-equip",
  "companion-equip",
  "mail",
  "move-to",
  "stock",
  "sell",
  "use",
  "open",
])

export function isValidRuleCategory(value: unknown): string | undefined {
  if (typeof value === "string") return value
  return undefined
}

const VALID_ACTION_SUB_VALUES: Record<string, Set<string>> = {
  "move-to": new Set(["bank", "craft-bag", "character", "guild-bank", "housing-storage"]),
  sell: new Set(["sell", "fence-sell", "list"]),
  stock: new Set(["bank", "character"]),
  deconstruct: new Set(["for-inspiration", "for-materials"]),
}

const ACTIONS_WITH_FREE_SUB2 = new Set([
  "move-to",
  "stock",
  "deconstruct",
  "character-equip",
  "use",
  "research",
  "companion-equip",
])

export function isValidRuleAction(value: unknown): string | null | undefined {
  if (typeof value === "string") {
    if (value === "") return null
    if (VALID_ACTION_VALUES.has(value)) return value
    const firstColon = value.indexOf(":")
    if (firstColon !== -1) {
      const action = value.slice(0, firstColon)
      const rest = value.slice(firstColon + 1)
      if (!VALID_ACTION_VALUES.has(action)) return undefined
      if (VALID_ACTION_SUB_VALUES[action]) {
        const secondColon = rest.indexOf(":")
        const sub = secondColon === -1 ? rest : rest.slice(0, secondColon)
        if (!VALID_ACTION_SUB_VALUES[action].has(sub)) return undefined
        if (secondColon !== -1) {
          const sub2 = rest.slice(secondColon + 1)
          if (sub2.length === 0) return undefined
        }
        return value
      }
      if (ACTIONS_WITH_FREE_SUB2.has(action) && rest.length > 0) {
        return value
      }
    }
    return undefined
  }
  return undefined
}

export type ViewFilterId =
  | "quality"
  | "armor-traits"
  | "weapon-traits"
  | "jewelry-traits"
  | "companion-traits"

export type ViewFilterPopoverProps = {
  qualities: readonly number[]
  armorTraits: readonly string[]
  weaponTraits: readonly string[]
  jewelryTraits: readonly string[]
  companionTraits: readonly string[]
  onQualitiesChange: (qualities: readonly number[]) => void
  onArmorTraitsChange: (traits: readonly string[]) => void
  onWeaponTraitsChange: (traits: readonly string[]) => void
  onJewelryTraitsChange: (traits: readonly string[]) => void
  onCompanionTraitsChange: (traits: readonly string[]) => void
}

export type InventoryViewFilterDef = {
  id: ViewFilterId
  label: string
  hasValue: (props: ViewFilterPopoverProps) => boolean
  renderGroup: (props: ViewFilterPopoverProps) => ReactNode
}

export type RuleFilterId = "status" | "protection" | "goal" | "action" | "category" | "location"

export type RuleFilterPopoverProps = {
  ruleStatus: readonly ActiveStatusFilter[]
  ruleLock: readonly LockStatusFilter[]
  ruleGoal: readonly string[]
  ruleAction: string | null
  ruleCategory: string
  ruleLocation: string | null
  hasDuplicates: boolean
  inventory: import("@temper/game-items-core/inventory-types").InventoryDatabase | null
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  onRuleGoalChange: (goals: readonly string[]) => void
  onRuleActionChange: (action: string | null) => void
  onRuleCategoryChange: (id: string) => void
  onRuleLocationChange: (location: string | null) => void
}

export type RuleFilterDef = {
  id: RuleFilterId
  label: string
  hasValue: (props: RuleFilterPopoverProps) => boolean
  renderGroup: (props: RuleFilterPopoverProps) => ReactNode
}
