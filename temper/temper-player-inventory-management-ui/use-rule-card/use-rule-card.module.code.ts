"use client"

import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
  type CategoryRule,
  CURRENCY_CATEGORY_PREFIX,
  type DestinationChain,
  type ItemAction,
  type MoveToDestination,
  type StockScope,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  getNodeChildren,
  getNodePath,
} from "@akasha/temper-items-rules-core/item-category-tree-utils"
import { LOCATION_OPTIONS } from "@akasha/temper-items-rules-core/location-filter"
import { INVENTORY_RULE_FILTERS } from "@akasha/temper-items-rules-core/rule-filter-registry"
import type { FilterId } from "@akasha/temper-items-rules-core/rule-filter-types"
import { SET_SOURCE_TYPE_OPTIONS } from "@akasha/temper-items-rules-core/set-sources-filter"
import {
  getTraitFamily,
  TRAIT_OPTIONS_BY_FAMILY,
} from "@akasha/temper-items-rules-core/traits-filter"
import { useMemo, useState } from "react"
import {
  ACTION_OPTIONS,
  NOTHING_ACTION,
  SELL_ACTIONS,
} from "../action-options/action-options.module.code.ts"
import { deriveConditionValues } from "../rule-card-conditions-derive/rule-card-conditions-derive.module.code.ts"
import { patchConditions } from "../rule-card-conditions-patch/rule-card-conditions-patch.module.code.ts"
import { buildActionChangeHandler } from "../use-rule-card-action-handler/use-rule-card-action-handler.module.code.ts"
import { buildCategorySelectHandler } from "../use-rule-card-category-handler/use-rule-card-category-handler.module.code.ts"
import { useConditionHandlers } from "../use-rule-card-condition-handlers/use-rule-card-condition-handlers.module.code.ts"

export type RuleCardOnUpdate = (
  ruleId: string,
  patch: Partial<
    Pick<
      CategoryRule,
      | "categoryId"
      | "action"
      | "conditions"
      | "destination"
      | "stockScope"
      | "destinationChain"
      | "active"
      | "goal"
      | "title"
      | "notes"
    >
  >
) => void

export function useRuleCard(rule: CategoryRule, onUpdate: RuleCardOnUpdate) {
  const path = useMemo(
    () =>
      rule.categoryId === ALL_CATEGORIES_ID
        ? [ALL_CATEGORIES_NODE]
        : rule.categoryId !== ""
          ? getNodePath(rule.categoryId, ITEM_CATEGORY_TREE)
          : [],
    [rule.categoryId]
  )

  const deepestChildren = useMemo(
    () =>
      rule.categoryId === ALL_CATEGORIES_ID
        ? getNodeChildren(undefined, ITEM_CATEGORY_TREE)
        : getNodeChildren(rule.categoryId !== "" ? rule.categoryId : undefined, ITEM_CATEGORY_TREE),
    [rule.categoryId]
  )

  const traitFamily = useMemo(
    () =>
      rule.categoryId === ALL_CATEGORIES_ID
        ? "all"
        : rule.categoryId !== ""
          ? getTraitFamily(rule.categoryId, ITEM_CATEGORY_TREE)
          : "all",
    [rule.categoryId]
  )

  const traitOptions = useMemo(
    () => (traitFamily != null ? (TRAIT_OPTIONS_BY_FAMILY[traitFamily] ?? []) : []),
    [traitFamily]
  )

  const selectedTraitItems = useMemo(() => {
    const traits = rule.conditions?.traits
    if (!traits || traits.length === 0) return []
    return traitOptions.filter((opt) => traits.includes(opt.value))
  }, [rule.conditions?.traits, traitOptions])

  const selectedSetSourceItems = useMemo(() => {
    const types = rule.conditions?.setSourceTypes
    if (!types || types.length === 0) return []
    return SET_SOURCE_TYPE_OPTIONS.filter((opt) => types.includes(opt.value))
  }, [rule.conditions?.setSourceTypes])

  const selectedLocationItems = useMemo(() => {
    const location = rule.conditions?.location
    if (!location || location.length === 0) return []
    const selected = new Set<string>(location)
    return LOCATION_OPTIONS.filter((opt) => selected.has(opt.value))
  }, [rule.conditions?.location])

  const [addedFilters, setAddedFilters] = useState<FilterId[]>(() => {
    const initial: FilterId[] = []
    for (const filter of INVENTORY_RULE_FILTERS) {
      if (filter.isPresent(rule.conditions)) initial.push(filter.id)
    }
    return initial
  })

  const eligibilityMap = useMemo(() => {
    const map = new Map<FilterId, boolean>()
    for (const filter of INVENTORY_RULE_FILTERS) {
      const categoryEligible =
        rule.categoryId === "" || filter.isEligible(rule.categoryId, ITEM_CATEGORY_TREE)
      const actionEligible = !filter.isEligibleForAction || filter.isEligibleForAction(rule.action)
      map.set(filter.id, categoryEligible && actionEligible)
    }
    map.set("traits", traitFamily !== null)
    return map
  }, [rule.categoryId, rule.action, traitFamily])

  const showFilter = useMemo(() => {
    const map = new Map<FilterId, boolean>()
    for (const filter of INVENTORY_RULE_FILTERS) {
      const eligible = eligibilityMap.get(filter.id) ?? false
      const hasCondition = filter.isPresent(rule.conditions)
      map.set(filter.id, eligible && (addedFilters.includes(filter.id) || hasCondition))
    }
    return map
  }, [eligibilityMap, addedFilters, rule.conditions])

  const availableFilters = useMemo(() => {
    const filters: { id: FilterId; label: string }[] = []
    for (const filter of INVENTORY_RULE_FILTERS) {
      const eligible = eligibilityMap.get(filter.id) ?? false
      const shown = showFilter.get(filter.id) ?? false
      if (!eligible || shown) continue
      const blocked = filter.mutuallyExclusive.some((id) => showFilter.get(id))
      if (blocked) continue
      filters.push({ id: filter.id, label: filter.label })
    }
    return filters
  }, [eligibilityMap, showFilter])

  const conditionValues = deriveConditionValues(rule.conditions)

  const isCurrency =
    rule.categoryId === "currency" || rule.categoryId.startsWith(CURRENCY_CATEGORY_PREFIX)

  const displayAction = SELL_ACTIONS.has(rule.action) ? "sell" : rule.action
  const actionOption = ACTION_OPTIONS.find((o) => o.value === displayAction) ?? NOTHING_ACTION

  const lockedFilterIds = useMemo(() => {
    const ids = new Set<FilterId>()
    if (displayAction === "fence-launder") ids.add("stolen")
    if (displayAction === "unlock" || displayAction === "lock") ids.add("locked")
    if (displayAction === "deconstruct") ids.add("can-inspire")
    if (displayAction === "research") ids.add("can-research")
    if (displayAction === "use") ids.add("can-unlock")
    if (displayAction === "open") ids.add("can-open")
    if (displayAction === "sell") {
      ids.add("can-sell")
      ids.add("can-list-at-guild-trader")
    }
    if (displayAction === "companion-equip") {
      ids.add("can-companion-equip")
      ids.add("needed-for-target-companion-build")
    }
    if (displayAction === "character-equip") ids.add("needed-for-target-character-build")
    return ids
  }, [displayAction])

  const handleCategorySelect = buildCategorySelectHandler(
    rule,
    addedFilters,
    setAddedFilters,
    onUpdate
  )
  const handleActionChange = buildActionChangeHandler(rule, addedFilters, setAddedFilters, onUpdate)

  function handleDestinationChange(value: MoveToDestination) {
    if (value === "character-worn:by-priority") {
      const equipPatch = patchConditions(rule.conditions, {
        isTargetEquip: "is-target-equip",
      })
      setAddedFilters((prev) =>
        prev.includes("needed-for-target-character-build")
          ? prev
          : [...prev, "needed-for-target-character-build"]
      )
      onUpdate(rule.id, { destination: value, conditions: equipPatch })
      return
    }
    if (value === "companion-worn:by-priority") {
      const equipPatch = patchConditions(rule.conditions, {
        isTargetCompanionEquip: "is-target-companion-equip",
      })
      setAddedFilters((prev) =>
        prev.includes("needed-for-target-companion-build")
          ? prev
          : [...prev, "needed-for-target-companion-build"]
      )
      onUpdate(rule.id, { destination: value, conditions: equipPatch })
      return
    }
    if (value === "character:by-priority") {
      onUpdate(rule.id, { destination: value })
      return
    }
    onUpdate(rule.id, { destination: value })
  }

  function handleDeconstructModeChange(mode: "for-inspiration" | "for-materials") {
    if (mode === "for-inspiration") {
      const inspirePatch = patchConditions(rule.conditions, {
        canInspire: "can-inspire",
      })
      setAddedFilters((prev) => (prev.includes("can-inspire") ? prev : [...prev, "can-inspire"]))
      onUpdate(rule.id, {
        destination: "character:by-priority",
        conditions: inspirePatch,
      })
    } else {
      const clearPatch = patchConditions(rule.conditions, {
        canInspire: undefined,
      })
      setAddedFilters((prev) => prev.filter((id) => id !== "can-inspire"))
      onUpdate(rule.id, {
        destination: undefined,
        conditions: clearPatch,
      })
    }
  }

  function handleSellDestinationChange(value: ItemAction) {
    const stolenFilter: FilterId = "stolen"
    const canSellFilter: FilterId = "can-sell"
    const canListFilter: FilterId = "can-list-at-guild-trader"
    if (value === "fence-sell") {
      const fencePatch = patchConditions(rule.conditions, {
        stolen: "stolen",
        canSell: "can-sell",
        canListAtGuildTrader: undefined,
      })
      setAddedFilters((prev) =>
        (prev.includes(stolenFilter) ? prev : [...prev, stolenFilter])
          .filter((id) => id !== canListFilter)
          .concat(prev.includes(canSellFilter) ? [] : [canSellFilter])
      )
      onUpdate(rule.id, { action: value, conditions: fencePatch })
      return
    }
    if (value === "sell") {
      const sellPatch = patchConditions(rule.conditions, {
        canSell: "can-sell",
        canListAtGuildTrader: undefined,
      })
      setAddedFilters((prev) =>
        (prev.includes(canSellFilter) ? prev : [...prev, canSellFilter]).filter(
          (id) => id !== canListFilter
        )
      )
      onUpdate(rule.id, { action: value, conditions: sellPatch })
      return
    }
    if (value === "list") {
      const listPatch = patchConditions(rule.conditions, {
        canListAtGuildTrader: "can-list-at-guild-trader",
        canSell: undefined,
      })
      setAddedFilters((prev) =>
        (prev.includes(canListFilter) ? prev : [...prev, canListFilter]).filter(
          (id) => id !== canSellFilter
        )
      )
      onUpdate(rule.id, { action: value, conditions: listPatch })
      return
    }
    onUpdate(rule.id, { action: value })
  }

  function handleStockQuantityChange(value: number) {
    onUpdate(rule.id, { conditions: patchConditions(rule.conditions, { targetQuantity: value }) })
  }

  function handleStockScopeChange(patch: {
    stockScope: StockScope
    destination: MoveToDestination
  }) {
    onUpdate(rule.id, patch)
  }

  function handleDestinationChainChange(next: DestinationChain | undefined) {
    if (next === undefined) {
      onUpdate(rule.id, { destinationChain: undefined })
      return
    }
    onUpdate(rule.id, {
      destinationChain: next,
      destination: undefined,
      stockScope: undefined,
    })
  }

  function handleToggleDestinationChain(useChain: boolean) {
    if (useChain) {
      const initialTier = {
        destination: rule.destination ?? "bank",
        targetQuantity: rule.conditions?.targetQuantity ?? 200,
      }
      onUpdate(rule.id, {
        destinationChain: [initialTier],
        destination: undefined,
        stockScope: undefined,
      })
      return
    }
    onUpdate(rule.id, {
      destinationChain: undefined,
      destination: rule.destination ?? "bank",
      stockScope: rule.stockScope ?? "any-character",
    })
  }

  const sortedFilterOrder = useMemo(() => {
    const locked: FilterId[] = []
    const unlocked: FilterId[] = []
    for (const id of addedFilters) {
      if (lockedFilterIds.has(id)) {
        locked.push(id)
      } else {
        unlocked.push(id)
      }
    }
    return [...locked, ...unlocked]
  }, [addedFilters, lockedFilterIds])

  const conditionHandlers = useConditionHandlers(rule.id, rule.conditions, onUpdate)

  function handleAddFilter(filterId: FilterId) {
    setAddedFilters((prev) => (prev.includes(filterId) ? prev : [...prev, filterId]))
    const filter = INVENTORY_RULE_FILTERS.find((f) => f.id === filterId)
    if (filter) {
      const patch = filter.applyDefault()
      if (Object.keys(patch).length > 0) {
        onUpdate(rule.id, { conditions: patchConditions(rule.conditions, patch) })
      }
    }
  }

  function handleRemoveFilter(filterId: FilterId) {
    setAddedFilters((prev) => prev.filter((id) => id !== filterId))
    const filter = INVENTORY_RULE_FILTERS.find((f) => f.id === filterId)
    if (filter) {
      onUpdate(rule.id, { conditions: patchConditions(rule.conditions, filter.clear()) })
    }
  }

  return {
    path,
    deepestChildren,
    traitOptions,
    selectedTraitItems,
    selectedSetSourceItems,
    selectedLocationItems,
    showFilter,
    filterOrder: sortedFilterOrder,
    availableFilters,
    isCurrency,
    ...conditionValues,
    action: rule.action,
    displayAction,
    actionOption,
    handleCategorySelect,
    handleActionChange,
    handleDestinationChange,
    handleDeconstructModeChange,
    handleSellDestinationChange,
    handleStockQuantityChange,
    handleStockScopeChange,
    handleDestinationChainChange,
    handleToggleDestinationChain,
    ...conditionHandlers,
    handleAddFilter,
    handleRemoveFilter,
  }
}
