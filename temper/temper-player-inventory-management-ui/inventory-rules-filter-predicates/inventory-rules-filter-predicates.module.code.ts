import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import { type LocationTypeId, locationTypes } from "@akasha/temper-items-core/location-type-data"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
  type CategoryRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  getCategoryDescendantIds,
  getNodePath,
} from "@akasha/temper-items-rules-core/item-category-tree-utils"
import { getActionLabel, SELL_ACTIONS } from "../action-options/action-options.module.code.ts"

const SELL_ACTION_VALUES: ReadonlySet<string> = SELL_ACTIONS

import { parseActionFilter } from "../action-filter-utils/action-filter-utils.module.code.ts"

const LOCATION_TYPE_SET = new Set<string>(locationTypes.ids)

function isLocationTypeId(value: string): value is LocationTypeId {
  return LOCATION_TYPE_SET.has(value)
}

type ActionFilterPredicate = (
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

export function matchesCategoryFilter(
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
