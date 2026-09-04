"use client"

import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { useMemo, useState } from "react"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
  RuleFilterId,
  RuleFilterPopoverProps,
  RuleSortField,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import { RULE_SORT_OPTIONS } from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import {
  ACTIVE_STATUS_ITEMS,
  GOAL_FILTER_ITEMS,
  LOCK_STATUS_ITEMS,
  RULE_VIEW_FILTERS,
} from "../inventory-rules-filter-items/inventory-rules-filter-items.module.code.tsx"

interface InventoryRulesFilterBarProps {
  ruleStatus: readonly ActiveStatusFilter[]
  ruleLock: readonly LockStatusFilter[]
  ruleGoal: readonly string[]
  ruleAction: string | null
  ruleCategory: string
  ruleLocation: string | null
  ruleSearch: string
  ruleSortBy: RuleSortField
  ruleSortDir: SortDirection
  hasDuplicates: boolean
  inventory: import("@akasha/temper-items-core/inventory-types").InventoryDatabase | null
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  onRuleGoalChange: (goals: readonly string[]) => void
  onRuleActionChange: (action: string | null) => void
  onRuleCategoryChange: (id: string) => void
  onRuleLocationChange: (location: string | null) => void
  onRuleSearchChange: (search: string) => void
  onRuleSortChange: (sortBy: RuleSortField, sortDir: SortDirection) => void
}

export function InventoryRulesFilterBar({
  ruleStatus,
  ruleLock,
  ruleGoal,
  ruleAction,
  ruleCategory,
  ruleLocation,
  ruleSearch,
  ruleSortBy,
  ruleSortDir,
  hasDuplicates,
  inventory,
  onRuleStatusChange,
  onRuleLockChange,
  onRuleGoalChange,
  onRuleActionChange,
  onRuleCategoryChange,
  onRuleLocationChange,
  onRuleSearchChange,
  onRuleSortChange,
}: InventoryRulesFilterBarProps) {
  const popoverProps: RuleFilterPopoverProps = {
    ruleStatus,
    ruleLock,
    ruleGoal,
    ruleAction,
    ruleCategory,
    ruleLocation,
    hasDuplicates,
    inventory,
    onRuleStatusChange,
    onRuleLockChange,
    onRuleGoalChange,
    onRuleActionChange,
    onRuleCategoryChange,
    onRuleLocationChange,
  }

  const activeStatusItems = useMemo(
    () =>
      hasDuplicates
        ? ACTIVE_STATUS_ITEMS
        : ACTIVE_STATUS_ITEMS.filter((s) => s.value !== "duplicate"),
    [hasDuplicates]
  )

  const availableFilters = RULE_VIEW_FILTERS

  const [addedFilters, setAddedFilters] = useState<Set<RuleFilterId>>(() => {
    const initial = new Set<RuleFilterId>()
    for (const f of availableFilters) {
      if (f.hasValue(popoverProps)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = availableFilters.filter(
    (f) => addedFilters.has(f.id) || f.hasValue(popoverProps)
  )

  const addableFilters = availableFilters.filter(
    (f) => !addedFilters.has(f.id) && !f.hasValue(popoverProps)
  )

  function handleAdd(id: string) {
    const filter = availableFilters.find((f) => f.id === id)
    if (!filter) return
    setAddedFilters((prev) => new Set(prev).add(filter.id))
  }

  function handleRemove(id: RuleFilterId) {
    if (id === "status") onRuleStatusChange([])
    else if (id === "protection") onRuleLockChange([])
    else if (id === "goal") onRuleGoalChange([])
    else if (id === "action") onRuleActionChange(null)
    else if (id === "category") onRuleCategoryChange("")
    else if (id === "location") onRuleLocationChange(null)
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const hasActiveFilters =
    ruleSearch.length > 0 ||
    ruleSortBy !== "priority" ||
    ruleSortDir !== "asc" ||
    ruleCategory.length > 0 ||
    ruleLocation !== null ||
    ruleAction !== null ||
    (ruleStatus.length > 0 && ruleStatus.length < activeStatusItems.length) ||
    (ruleLock.length > 0 && ruleLock.length < LOCK_STATUS_ITEMS.length) ||
    (ruleGoal.length > 0 && ruleGoal.length < GOAL_FILTER_ITEMS.length)

  const hasActiveFilterValues =
    ruleStatus.length > 0 ||
    ruleLock.length > 0 ||
    ruleGoal.length > 0 ||
    ruleAction !== null ||
    ruleCategory.length > 0 ||
    ruleLocation !== null

  return (
    <PageTabHeader title="Rules">
      <SearchSortFilterRow
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          onRuleSearchChange("")
          onRuleSortChange("priority", "asc")
          onRuleStatusChange([])
          onRuleLockChange([])
          onRuleGoalChange([])
          onRuleActionChange(null)
          onRuleCategoryChange("")
          onRuleLocationChange(null)
        }}
      >
        <SearchButton
          value={ruleSearch}
          onChange={onRuleSearchChange}
          placeholder="Search rules..."
        />

        <SortButton
          options={RULE_SORT_OPTIONS}
          sorts={[{ field: ruleSortBy, direction: ruleSortDir }]}
          onSortsChange={(sorts) => {
            const first = sorts[0]
            if (first) onRuleSortChange(first.field, first.direction)
          }}
          defaultSort={{ field: "priority", direction: "asc" }}
        />

        <FilterButton
          hasActiveFilters={hasActiveFilterValues || addedFilters.size > 0}
          emptySelectOptions={addableFilters
            .map((f) => ({ id: f.id, label: f.label }))
            .sort((a, b) => a.label.localeCompare(b.label))}
          onEmptySelect={handleAdd}
        >
          <div className="flex flex-col gap-3">
            {visibleFilters.map((filterDef) => (
              <FilterGroup
                key={filterDef.id}
                label={filterDef.label}
                onRemove={() => handleRemove(filterDef.id)}
              >
                {filterDef.renderGroup(popoverProps)}
              </FilterGroup>
            ))}
            <AddFilterButton
              options={addableFilters
                .map((f) => ({ id: f.id, label: f.label }))
                .sort((a, b) => a.label.localeCompare(b.label))}
              onAdd={handleAdd}
            />
          </div>
        </FilterButton>
      </SearchSortFilterRow>
    </PageTabHeader>
  )
}
