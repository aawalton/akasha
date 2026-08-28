"use client"

import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { inventoryRuleGoals } from "@temper/game-items-rules-core/inventory-rule-goals"
import {
  type ActiveStatusFilter,
  isActiveStatusFilter,
  isLockStatusFilter,
  type LockStatusFilter,
  type RuleFilterDef,
  type RuleFilterPopoverProps,
} from "./inventory-filter-types"
import { RuleActionFilterSelect } from "./rule-action-filter-select"
import { RuleCategoryFilterSelect } from "./rule-category-filter-select"
import { RuleLocationFilterSelect } from "./rule-location-filter-select"

const NULL_SENTINEL_VALUES = new Set(["none", "nothing"])

function sortFilterItems(items: readonly BadgeToggleGroupItem[]): readonly BadgeToggleGroupItem[] {
  return [...items].sort((a, b) => {
    const aNull = NULL_SENTINEL_VALUES.has(a.value)
    const bNull = NULL_SENTINEL_VALUES.has(b.value)
    if (aNull && !bNull) return -1
    if (!aNull && bNull) return 1
    return a.label.localeCompare(b.label)
  })
}

export const ACTIVE_STATUS_ITEMS: readonly BadgeToggleGroupItem[] = sortFilterItems([
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "duplicate", label: "Duplicate" },
])

export const LOCK_STATUS_ITEMS: readonly BadgeToggleGroupItem[] = sortFilterItems([
  { value: "locked", label: "Locked" },
  { value: "unlocked", label: "Unlocked" },
])

export const GOAL_FILTER_ITEMS: readonly BadgeToggleGroupItem[] = sortFilterItems(
  inventoryRuleGoals.list.map((g) => ({ value: g.id, label: g.name }))
)

export const RULE_VIEW_FILTERS: RuleFilterDef[] = [
  {
    id: "status",
    label: "Status",
    hasValue: ({ ruleStatus }) => ruleStatus.length > 0,
    renderGroup: ({ ruleStatus, hasDuplicates, onRuleStatusChange }: RuleFilterPopoverProps) => {
      const activeStatusItems = hasDuplicates
        ? ACTIVE_STATUS_ITEMS
        : ACTIVE_STATUS_ITEMS.filter((s) => s.value !== "duplicate")
      const selectedActiveStatus = activeStatusItems.filter(
        (s): s is BadgeToggleGroupItem & { value: ActiveStatusFilter } =>
          isActiveStatusFilter(s.value) && ruleStatus.includes(s.value)
      )
      return (
        <BadgeToggleGroup
          items={activeStatusItems}
          value={selectedActiveStatus}
          onSelect={(items) =>
            onRuleStatusChange(items.map((i) => i.value).filter(isActiveStatusFilter))
          }
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
  {
    id: "protection",
    label: "Protection",
    hasValue: ({ ruleLock }) => ruleLock.length > 0,
    renderGroup: ({ ruleLock, onRuleLockChange }: RuleFilterPopoverProps) => {
      const selectedLockStatus = LOCK_STATUS_ITEMS.filter(
        (s): s is BadgeToggleGroupItem & { value: LockStatusFilter } =>
          isLockStatusFilter(s.value) && ruleLock.includes(s.value)
      )
      return (
        <BadgeToggleGroup
          items={LOCK_STATUS_ITEMS}
          value={selectedLockStatus}
          onSelect={(items) =>
            onRuleLockChange(items.map((i) => i.value).filter(isLockStatusFilter))
          }
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
  {
    id: "goal",
    label: "Goal",
    hasValue: ({ ruleGoal }) => ruleGoal.length > 0,
    renderGroup: ({ ruleGoal, onRuleGoalChange }: RuleFilterPopoverProps) => {
      const selectedGoals = GOAL_FILTER_ITEMS.filter((g) => ruleGoal.includes(g.value))
      return (
        <BadgeToggleGroup
          items={GOAL_FILTER_ITEMS}
          value={selectedGoals}
          onSelect={(items) => onRuleGoalChange(items.map((i) => i.value))}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
  {
    id: "action",
    label: "Action",
    hasValue: ({ ruleAction }) => ruleAction !== null,
    renderGroup: ({ ruleAction, onRuleActionChange }: RuleFilterPopoverProps) => (
      <RuleActionFilterSelect ruleAction={ruleAction} onRuleActionChange={onRuleActionChange} />
    ),
  },
  {
    id: "category",
    label: "Category",
    hasValue: ({ ruleCategory }) => ruleCategory.length > 0,
    renderGroup: ({ ruleCategory, onRuleCategoryChange }: RuleFilterPopoverProps) => (
      <RuleCategoryFilterSelect
        ruleCategory={ruleCategory}
        onRuleCategoryChange={onRuleCategoryChange}
      />
    ),
  },
  {
    id: "location",
    label: "Location",
    hasValue: ({ ruleLocation }) => ruleLocation !== null,
    renderGroup: ({ ruleLocation, inventory, onRuleLocationChange }: RuleFilterPopoverProps) => (
      <RuleLocationFilterSelect
        ruleLocation={ruleLocation}
        inventory={inventory}
        onRuleLocationChange={onRuleLocationChange}
      />
    ),
  },
]
