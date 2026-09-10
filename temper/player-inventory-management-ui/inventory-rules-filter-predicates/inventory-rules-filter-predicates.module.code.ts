import { ITEM_CATEGORY_TREE } from "akasha/temper/items-core/item-category-tree-data/item-category-tree-data.module.code.ts"
import { classifyLocation } from "akasha/temper/items-core/location-classify/location-classify.module.code.ts"
import {
  type LocationTypeId,
  locationTypes,
} from "akasha/temper/items-core/location-type-data/location-type-data.module.code.ts"
import { GOAL_NONE_ID } from "akasha/temper/temper-items-rules-core/inventory-rule-goals/inventory-rule-goals.module.code.ts"
import type { AffectedItem } from "akasha/temper/temper-items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
  type CategoryRule,
  type ItemRule,
} from "akasha/temper/temper-items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  getCategoryDescendantIds,
  getNodePath,
} from "akasha/temper/temper-items-rules-core/item-category-tree-utils/item-category-tree-utils.module.code.ts"
import { getActionLabel, SELL_ACTIONS } from "../action-options/action-options.module.code.ts"

const SELL_ACTION_VALUES: ReadonlySet<string> = SELL_ACTIONS

import { parseActionFilter } from "../action-filter-utils/action-filter-utils.module.code.ts"

const LOCATION_TYPE_SET = new Set<string>(locationTypes.ids)

function isLocationTypeId(value: string): value is LocationTypeId {
  return LOCATION_TYPE_SET.has(value)
}

export type ActionFilterPredicate = (
  ruleAction: string,
  destination?: string,
  stockScope?: string,
  canInspire?: string
) => boolean

export function buildActionFilterPredicate(
  ruleAction: string | null
): ActionFilterPredicate | null {
  const { action, sub, sub2 } = parseActionFilter(ruleAction)
  if (action == null) return null

  return (
    ruleActionVal: string,
    destination?: string,
    stockScope?: string,
    canInspire?: string
  ): boolean => {
    const normalised = SELL_ACTION_VALUES.has(ruleActionVal) ? "sell" : ruleActionVal

    if (normalised !== action) return false
    if (sub == null) return true

    if (action === "move-to") {
      const dest = destination ?? "bank"
      if (sub === "bank") return dest === "bank"
      if (sub === "craft-bag") return dest === "craft-bag"
      if (sub === "character") {
        if (!dest.startsWith("character:")) return false
        if (sub2 == null) return true
        return dest === sub2
      }
      if (sub === "guild-bank") {
        const matchesCategory = dest === "guild-bank" || dest.startsWith("guild-bank:")
        if (!matchesCategory) return false
        if (sub2 == null) return true
        return dest === sub2
      }
      if (sub === "housing-storage") {
        const matchesCategory =
          dest === "house-storage" ||
          dest.startsWith("house-storage:") ||
          dest === "furniture-vault"
        if (!matchesCategory) return false
        if (sub2 == null) return true
        return dest === sub2
      }
      return false
    }

    if (action === "sell") {
      return ruleActionVal === sub
    }

    if (action === "stock") {
      if (sub === "bank") return stockScope === "current-character"
      if (sub === "character") {
        const matchesScope = stockScope == null || stockScope === "any-character"
        if (!matchesScope) return false
        if (sub2 == null) return true
        return (
          (destination ?? "") === sub2 ||
          (sub2 === "all" && (destination == null || destination === "bank"))
        )
      }
      return false
    }

    if (action === "deconstruct") {
      const mode = canInspire === "can-inspire" ? "for-inspiration" : "for-materials"
      if (mode !== sub) return false
      if (sub2 == null) return true
      return (destination ?? "") === sub2
    }

    if (action === "character-equip" || action === "use" || action === "research") {
      if (sub === "") return true
      return (destination ?? "") === sub
    }

    if (action === "companion-equip") {
      if (sub === "") return true
      return (destination ?? "") === sub
    }

    return false
  }
}

export function buildCategorySearchText(r: CategoryRule): string {
  const parts: string[] = []
  if (r.title != null) parts.push(r.title.toLowerCase())
  if (r.notes != null) parts.push(r.notes.toLowerCase())
  if (r.categoryId === ALL_CATEGORIES_ID) {
    parts.push(ALL_CATEGORIES_NODE.name.toLowerCase())
  } else {
    const path = getNodePath(r.categoryId, ITEM_CATEGORY_TREE)
    if (path.length > 0) {
      parts.push(
        path
          .map((p) => p.name)
          .join(" ")
          .toLowerCase()
      )
    }
  }
  parts.push(getActionLabel(r.action).toLowerCase())
  return parts.join(" ")
}

export function buildCategoryMatchIds(ruleCategory: string): Set<string> | null {
  if (ruleCategory === "") return null
  return getCategoryDescendantIds(ruleCategory, ITEM_CATEGORY_TREE)
}

function matchesCategoryFilter(
  ruleCategoryId: string,
  categoryMatchIds: ReadonlySet<string> | null
): boolean {
  if (categoryMatchIds === null) return true
  return ruleCategoryId === ALL_CATEGORIES_ID || categoryMatchIds.has(ruleCategoryId)
}

export function matchItemLocation(locationKey: string, locationFilter: string | null): boolean {
  if (locationFilter == null) return true
  if (isLocationTypeId(locationFilter)) {
    return classifyLocation(locationKey) === locationFilter
  }
  return locationKey === locationFilter
}

export function partitionRules(
  filtered: readonly CategoryRule[],
  duplicateRuleIds: Set<string>
): {
  active: readonly string[]
  inactive: readonly string[]
  duplicate: readonly string[]
  locked: readonly string[]
  unlocked: readonly string[]
} {
  const active = filtered
    .filter((r) => r.active !== false && !duplicateRuleIds.has(r.id))
    .map((r) => r.id)
  const inactive = filtered
    .filter((r) => r.active === false && !duplicateRuleIds.has(r.id))
    .map((r) => r.id)
  const duplicate = filtered.filter((r) => duplicateRuleIds.has(r.id)).map((r) => r.id)
  const locked = filtered.filter((r) => r.locked === true).map((r) => r.id)
  const unlocked = filtered.filter((r) => !r.locked).map((r) => r.id)
  return { active, inactive, duplicate, locked, unlocked }
}

export type RuleFilterDeps = {
  readonly hasGoalFilter: boolean
  readonly hasStatusFilter: boolean
  readonly hasLockFilter: boolean
  readonly hasActionFilter: boolean
  readonly hasSearchFilter: boolean
  readonly hasLocationFilter: boolean
  readonly showActive: boolean
  readonly showInactive: boolean
  readonly showDuplicate: boolean
  readonly showLocked: boolean
  readonly showUnlocked: boolean
  readonly goalFilterValues: ReadonlySet<string>
  readonly actionFilterPredicate: ActionFilterPredicate | null
  readonly searchLower: string
  readonly categoryMatchIds: ReadonlySet<string> | null
  readonly duplicateRuleIds: ReadonlySet<string>
  readonly affectedItemsMap: ReadonlyMap<string, readonly AffectedItem[]> | null | undefined
  readonly matchItemLocation: (locationKey: string) => boolean
  readonly getCategoryRuleSearchText: (r: CategoryRule) => string
}

function matchesLocationFilter(ruleId: string, fd: RuleFilterDeps): boolean {
  if (!fd.hasLocationFilter) return true
  return (fd.affectedItemsMap?.get(ruleId) ?? []).some((item) =>
    fd.matchItemLocation(item.locationKey)
  )
}

function matchesGoalFilter(goal: string | null | undefined, fd: RuleFilterDeps): boolean {
  return !fd.hasGoalFilter || fd.goalFilterValues.has(goal ?? GOAL_NONE_ID)
}

function matchesLockFilter(locked: boolean | undefined, fd: RuleFilterDeps): boolean {
  return !fd.hasLockFilter || (fd.showLocked && locked === true) || (fd.showUnlocked && !locked)
}

export function matchesCategoryRule(r: CategoryRule, fd: RuleFilterDeps): boolean {
  const matchesStatus =
    !fd.hasStatusFilter ||
    (fd.showActive && r.active !== false) ||
    (fd.showInactive && r.active === false) ||
    (fd.showDuplicate && fd.duplicateRuleIds.has(r.id))
  const matchesAction =
    !fd.hasActionFilter ||
    (fd.actionFilterPredicate?.(r.action, r.destination, r.stockScope, r.conditions?.canInspire) ??
      false)
  const matchesSearch =
    !fd.hasSearchFilter || fd.getCategoryRuleSearchText(r).includes(fd.searchLower)
  return (
    matchesGoalFilter(r.goal, fd) &&
    matchesStatus &&
    matchesLockFilter(r.locked, fd) &&
    matchesAction &&
    matchesSearch &&
    matchesCategoryFilter(r.categoryId, fd.categoryMatchIds) &&
    matchesLocationFilter(r.id, fd)
  )
}

export function matchesItemRule(r: ItemRule, fd: RuleFilterDeps): boolean {
  const matchesStatus =
    !fd.hasStatusFilter ||
    (fd.showActive && r.active !== false) ||
    (fd.showInactive && r.active === false)
  const matchesAction =
    !fd.hasActionFilter || (fd.actionFilterPredicate?.(r.action, r.destination) ?? false)
  const matchesSearch =
    !fd.hasSearchFilter ||
    (r.title ?? r.itemName).toLowerCase().includes(fd.searchLower) ||
    (r.notes ?? "").toLowerCase().includes(fd.searchLower) ||
    getActionLabel(r.action).toLowerCase().includes(fd.searchLower)
  return (
    matchesGoalFilter(r.goal, fd) &&
    matchesStatus &&
    matchesLockFilter(r.locked, fd) &&
    matchesAction &&
    matchesSearch &&
    matchesLocationFilter(r.id, fd)
  )
}
