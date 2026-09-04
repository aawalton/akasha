"use client"

import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { INVENTORY_RULE_FILTERS } from "@akasha/temper-items-rules-core/rule-filter-registry"
import type { FilterId } from "@akasha/temper-items-rules-core/rule-filter-types"
import { getTraitFamily } from "@akasha/temper-items-rules-core/traits-filter"
import type React from "react"
import type { RuleCardOnUpdate } from "../use-rule-card/use-rule-card.module.code.ts"

export function buildCategorySelectHandler(
  rule: CategoryRule,
  addedFilters: readonly FilterId[],
  setAddedFilters: React.Dispatch<React.SetStateAction<FilterId[]>>,
  onUpdate: RuleCardOnUpdate
): (categoryId: string) => void {
  return function handleCategorySelect(categoryId: string) {
    const prevCategoryId = rule.categoryId

    const newEligibility = new Map<FilterId, boolean>()
    for (const filter of INVENTORY_RULE_FILTERS) {
      newEligibility.set(filter.id, filter.isEligible(categoryId, ITEM_CATEGORY_TREE))
    }
    const newTraitFamily =
      categoryId === ALL_CATEGORIES_ID ? "all" : getTraitFamily(categoryId, ITEM_CATEGORY_TREE)
    newEligibility.set("traits", newTraitFamily !== null)

    const merged: Partial<NonNullable<CategoryRule["conditions"]>> = {}
    let needsConditionUpdate = false
    const survivingFilterIds = new Set<FilterId>()

    for (const filter of INVENTORY_RULE_FILTERS) {
      const wasPresent = filter.isPresent(rule.conditions)
      const eligible = newEligibility.get(filter.id) ?? false

      if (!eligible) {
        if (wasPresent) needsConditionUpdate = true
        continue
      }

      if (!wasPresent) continue

      const carried = filter.transferToCategory(
        rule.conditions,
        prevCategoryId,
        categoryId,
        ITEM_CATEGORY_TREE
      )
      if (Object.keys(carried).length === 0) {
        needsConditionUpdate = true
        continue
      }
      Object.assign(merged, carried)
      survivingFilterIds.add(filter.id)
    }

    const anyAddedFilterInvalid = addedFilters.some((id) => {
      const eligible = newEligibility.get(id) ?? false
      if (!eligible) return true
      const filter = INVENTORY_RULE_FILTERS.find((f) => f.id === id)
      if (!filter) return true
      if (filter.isPresent(rule.conditions) && !survivingFilterIds.has(id)) return true
      return false
    })

    if (anyAddedFilterInvalid) {
      setAddedFilters((prev) =>
        prev.filter((id) => {
          const eligible = newEligibility.get(id) ?? false
          if (!eligible) return false
          const filter = INVENTORY_RULE_FILTERS.find((f) => f.id === id)
          if (!filter) return false
          if (filter.isPresent(rule.conditions) && !survivingFilterIds.has(id)) return false
          return true
        })
      )
    }

    if (!needsConditionUpdate) {
      onUpdate(rule.id, { categoryId })
      return
    }

    onUpdate(rule.id, {
      categoryId,
      conditions: Object.keys(merged).length > 0 ? merged : undefined,
    })
  }
}
