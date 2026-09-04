"use client"

import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import { compileCategoryRuleToOrdered } from "@akasha/temper-items-rules-core/inventory-rule-compiler"
import type {
  AffectedItem,
  ClassifiedInventoryItem,
} from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import {
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { computeAllRuleAffectedItems } from "@akasha/temper-items-rules-matcher/inventory-rule-matcher"
import {
  type AllRuleAffectedItemsCache,
  createAllRuleAffectedItemsCache,
} from "@akasha/temper-items-rules-matcher/inventory-rule-matcher-cache"
import { buildManagementPlan } from "@akasha/temper-items-rules-routing/inventory-management-plan"
import { applyDestinationCapacityFilter } from "@akasha/temper-items-rules-routing/inventory-management-plan-capacity-filter"
import type { ManagementPlan } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import { useMemo, useRef } from "react"

export interface InventoryRulesTabAffectedItems {
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  unmappedItems: readonly AffectedItem[]
  capacityFilteredMap: Map<string, readonly AffectedItem[]> | null
  managementPlan: ManagementPlan
}

interface UseInventoryRulesTabAffectedItemsArgs {
  inventory: InventoryDatabase | null
  classifiedItems: readonly ClassifiedInventoryItem[] | null
  matcherContext: RuleMatcherContext | null
  deferredAllRulesForMatching: readonly CategoryRule[]
  deferredItemRules: readonly ItemRule[] | undefined
  bufferSlots: number | undefined
  buyRules: readonly BuyRule[] | undefined
}

export function useInventoryRulesTabAffectedItems({
  inventory,
  classifiedItems,
  matcherContext,
  deferredAllRulesForMatching,
  deferredItemRules,
  bufferSlots,
  buyRules,
}: UseInventoryRulesTabAffectedItemsArgs): InventoryRulesTabAffectedItems {
  const affectedItemsCacheRef = useRef<AllRuleAffectedItemsCache>(createAllRuleAffectedItemsCache())
  const prevClassifiedItemsRef = useRef(classifiedItems)
  const prevMatcherContextRef = useRef(matcherContext)
  if (
    classifiedItems !== prevClassifiedItemsRef.current ||
    matcherContext !== prevMatcherContextRef.current
  ) {
    prevClassifiedItemsRef.current = classifiedItems
    prevMatcherContextRef.current = matcherContext
    affectedItemsCacheRef.current = createAllRuleAffectedItemsCache()
  }

  const deferredCompiledRules = useMemo(
    () => deferredAllRulesForMatching.map(compileCategoryRuleToOrdered),
    [deferredAllRulesForMatching]
  )

  const { ruleMap: affectedItemsMap, unmapped: unmappedItems } = useMemo(() => {
    const empty: AffectedItem[] = []
    if (!classifiedItems) return { ruleMap: null, unmapped: empty }
    const result = computeAllRuleAffectedItems(
      deferredCompiledRules,
      classifiedItems,
      matcherContext ?? undefined,
      deferredItemRules ?? [],
      affectedItemsCacheRef.current
    )
    return {
      ruleMap: result.ruleMap,
      unmapped: result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? [],
    }
  }, [classifiedItems, deferredCompiledRules, matcherContext, deferredItemRules])

  const capacityFilteredMap = useMemo(
    () =>
      affectedItemsMap
        ? applyDestinationCapacityFilter(
            deferredCompiledRules,
            deferredItemRules ?? [],
            affectedItemsMap,
            inventory
          )
        : null,
    [deferredCompiledRules, deferredItemRules, affectedItemsMap, inventory]
  )

  const managementPlan = useMemo(
    () =>
      buildManagementPlan(
        deferredCompiledRules,
        deferredItemRules ?? [],
        capacityFilteredMap,
        inventory,
        matcherContext ?? undefined,
        bufferSlots,
        buyRules
      ),
    [
      deferredCompiledRules,
      deferredItemRules,
      capacityFilteredMap,
      inventory,
      matcherContext,
      bufferSlots,
      buyRules,
    ]
  )

  return {
    affectedItemsMap,
    unmappedItems,
    capacityFilteredMap,
    managementPlan,
  }
}
