"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import {
  heldKeyedTitles,
  titleIn,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  GOAL_NONE_ID,
  inventoryRuleGoals,
} from "akasha/temper/items/rules/core/modules/inventory-rule-goals/inventory-rule-goals.module.code.ts"
import {
  heldWebPhrases,
  phraseIn,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryRulesFilterItemsAction } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-action.temper-web-phrase.ts"
import { inventoryRulesFilterItemsCategory } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-category.temper-web-phrase.ts"
import { inventoryRulesFilterItemsGoal } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-goal.temper-web-phrase.ts"
import { inventoryRulesFilterItemsLocation } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-location.temper-web-phrase.ts"
import { inventoryRulesFilterItemsProtection } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-protection.temper-web-phrase.ts"
import { inventoryRulesFilterItemsStatus } from "akasha/temper/web/phrase/pages/inventory-rules-filter-items-status.temper-web-phrase.ts"
import {
  type ActiveStatusFilter,
  isActiveStatusFilter,
  isLockStatusFilter,
  type LockStatusFilter,
  type RuleFilterDef,
  type RuleFilterPopoverProps,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-filter-types/inventory-filter-types.module.code.ts"
import { RuleActionFilterSelect } from "akasha/temper/web/player-inventory-management-ui/modules/rule-action-filter-select/rule-action-filter-select.module.code.tsx"
import { RuleCategoryFilterSelect } from "akasha/temper/web/player-inventory-management-ui/modules/rule-category-filter-select/rule-category-filter-select.module.code.tsx"
import { RuleLocationFilterSelect } from "akasha/temper/web/player-inventory-management-ui/modules/rule-location-filter-select/rule-location-filter-select.module.code.tsx"
import {
  goalTitleIn,
  heldRuleGoalTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-goal-titles/use-rule-goal-titles.module.code.tsx"
import { noGoal } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/no-goal.temper-rule-card-phrase.ts"
import { ruleActive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-active.temper-rule-card-phrase.ts"
import { ruleDuplicate } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-duplicate.temper-rule-card-phrase.ts"
import { ruleInactive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-inactive.temper-rule-card-phrase.ts"
import { ruleLocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-locked.temper-rule-card-phrase.ts"
import { ruleUnlocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-unlocked.temper-rule-card-phrase.ts"
import { temperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.ts"

const NULL_SENTINEL_VALUES = new Set(["none", "nothing"])

interface StatusValue {
  readonly value: string
  readonly phraseKey: string
}

function heldPhrase(slug: string): string {
  return phraseIn(heldWebPhrases(), slug)
}

function sortFilterItems(items: readonly BadgeToggleGroupItem[]): readonly BadgeToggleGroupItem[] {
  return [...items].sort((a, b) => {
    const aNull = NULL_SENTINEL_VALUES.has(a.value)
    const bNull = NULL_SENTINEL_VALUES.has(b.value)
    if (aNull && !bNull) return -1
    if (!aNull && bNull) return 1
    return a.label.localeCompare(b.label)
  })
}

export const ACTIVE_STATUS_ITEMS: readonly StatusValue[] = [
  { value: "active", phraseKey: ruleActive.key },
  { value: "inactive", phraseKey: ruleInactive.key },
  { value: "duplicate", phraseKey: ruleDuplicate.key },
]

export const LOCK_STATUS_ITEMS: readonly StatusValue[] = [
  { value: "locked", phraseKey: ruleLocked.key },
  { value: "unlocked", phraseKey: ruleUnlocked.key },
]

function labelled(values: readonly StatusValue[]): readonly BadgeToggleGroupItem[] {
  const statuses = heldKeyedTitles(temperRuleCardPhrase.slug)
  return sortFilterItems(
    values.map((one) => ({ value: one.value, label: titleIn(statuses, one.phraseKey) }))
  )
}

export const GOAL_FILTER_ITEMS: readonly string[] = inventoryRuleGoals.list.map((g) => g.id)

function labelledGoals(): readonly BadgeToggleGroupItem[] {
  const goals = heldRuleGoalTitles()
  const statuses = heldKeyedTitles(temperRuleCardPhrase.slug)
  return sortFilterItems(
    GOAL_FILTER_ITEMS.map((id) => ({
      value: id,
      label: id === GOAL_NONE_ID ? titleIn(statuses, noGoal.key) : goalTitleIn(goals, id),
    }))
  )
}

export const RULE_VIEW_FILTERS: RuleFilterDef[] = [
  {
    id: "status",
    get label() {
      return heldPhrase(inventoryRulesFilterItemsStatus.slug)
    },
    hasValue: ({ ruleStatus }) => ruleStatus.length > 0,
    renderGroup: ({ ruleStatus, hasDuplicates, onRuleStatusChange }: RuleFilterPopoverProps) => {
      const activeStatusItems = labelled(
        hasDuplicates
          ? ACTIVE_STATUS_ITEMS
          : ACTIVE_STATUS_ITEMS.filter((s) => s.value !== "duplicate")
      )
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
    get label() {
      return heldPhrase(inventoryRulesFilterItemsProtection.slug)
    },
    hasValue: ({ ruleLock }) => ruleLock.length > 0,
    renderGroup: ({ ruleLock, onRuleLockChange }: RuleFilterPopoverProps) => {
      const lockStatusItems = labelled(LOCK_STATUS_ITEMS)
      const selectedLockStatus = lockStatusItems.filter(
        (s): s is BadgeToggleGroupItem & { value: LockStatusFilter } =>
          isLockStatusFilter(s.value) && ruleLock.includes(s.value)
      )
      return (
        <BadgeToggleGroup
          items={lockStatusItems}
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
    get label() {
      return heldPhrase(inventoryRulesFilterItemsGoal.slug)
    },
    hasValue: ({ ruleGoal }) => ruleGoal.length > 0,
    renderGroup: ({ ruleGoal, onRuleGoalChange }: RuleFilterPopoverProps) => {
      const goalItems = labelledGoals()
      const selectedGoals = goalItems.filter((g) => ruleGoal.includes(g.value))
      return (
        <BadgeToggleGroup
          items={goalItems}
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
    get label() {
      return heldPhrase(inventoryRulesFilterItemsAction.slug)
    },
    hasValue: ({ ruleAction }) => ruleAction !== null,
    renderGroup: ({ ruleAction, onRuleActionChange }: RuleFilterPopoverProps) => (
      <RuleActionFilterSelect ruleAction={ruleAction} onRuleActionChange={onRuleActionChange} />
    ),
  },
  {
    id: "category",
    get label() {
      return heldPhrase(inventoryRulesFilterItemsCategory.slug)
    },
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
    get label() {
      return heldPhrase(inventoryRulesFilterItemsLocation.slug)
    },
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
