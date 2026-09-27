"use client"

import type {
  CategoryRule,
  ItemRule,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"
import { useItemCategories } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import {
  getCategoryRuleDescriptions,
  getItemRuleDescriptions,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-descriptions/inventory-rules-descriptions.module.code.ts"
import { useMemo } from "react"

interface RulePartition {
  active: readonly string[]
  inactive: readonly string[]
  duplicate: readonly string[]
  locked: readonly string[]
  unlocked: readonly string[]
}

interface InventoryRulesTabDescriptions {
  characterActiveDescriptions: readonly string[]
  characterInactiveDescriptions: readonly string[]
  characterDuplicateDescriptions: readonly string[]
  characterUnlockedDescriptions: readonly string[]
  companionActiveDescriptions: readonly string[]
  companionInactiveDescriptions: readonly string[]
  companionDuplicateDescriptions: readonly string[]
  companionUnlockedDescriptions: readonly string[]
  categoryActiveDescriptions: readonly string[]
  categoryInactiveDescriptions: readonly string[]
  categoryDuplicateDescriptions: readonly string[]
  categoryUnlockedDescriptions: readonly string[]
  itemActiveDescriptions: readonly string[]
  itemInactiveDescriptions: readonly string[]
  itemUnlockedDescriptions: readonly string[]
}

interface UseInventoryRulesTabDescriptionsArgs {
  rules: readonly CategoryRule[]
  itemRules: readonly ItemRule[]
  characterPartition: RulePartition
  companionPartition: RulePartition
  categoryPartition: RulePartition
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
}

export function useInventoryRulesTabDescriptions({
  rules,
  itemRules,
  characterPartition,
  companionPartition,
  categoryPartition,
  activeItemRuleIds,
  inactiveItemRuleIds,
  unlockedItemRuleIds,
}: UseInventoryRulesTabDescriptionsArgs): InventoryRulesTabDescriptions {
  const categories = useItemCategories().keyed
  const actionTitles = useKeyedTitles(temperItemAction.slug)
  const characterActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.active, categories),
    [rules, characterPartition.active, categories, actionTitles]
  )
  const characterInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.inactive, categories),
    [rules, characterPartition.inactive, categories, actionTitles]
  )
  const characterDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.duplicate, categories),
    [rules, characterPartition.duplicate, categories, actionTitles]
  )
  const characterUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.unlocked, categories),
    [rules, characterPartition.unlocked, categories, actionTitles]
  )
  const companionActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.active, categories),
    [rules, companionPartition.active, categories, actionTitles]
  )
  const companionInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.inactive, categories),
    [rules, companionPartition.inactive, categories, actionTitles]
  )
  const companionDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.duplicate, categories),
    [rules, companionPartition.duplicate, categories, actionTitles]
  )
  const companionUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.unlocked, categories),
    [rules, companionPartition.unlocked, categories, actionTitles]
  )
  const categoryActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.active, categories),
    [rules, categoryPartition.active, categories, actionTitles]
  )
  const categoryInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.inactive, categories),
    [rules, categoryPartition.inactive, categories, actionTitles]
  )
  const categoryDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.duplicate, categories),
    [rules, categoryPartition.duplicate, categories, actionTitles]
  )
  const categoryUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.unlocked, categories),
    [rules, categoryPartition.unlocked, categories, actionTitles]
  )
  const itemActiveDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, activeItemRuleIds),
    [itemRules, activeItemRuleIds, actionTitles]
  )
  const itemInactiveDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, inactiveItemRuleIds),
    [itemRules, inactiveItemRuleIds, actionTitles]
  )
  const itemUnlockedDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, unlockedItemRuleIds),
    [itemRules, unlockedItemRuleIds, actionTitles]
  )

  return {
    characterActiveDescriptions,
    characterInactiveDescriptions,
    characterDuplicateDescriptions,
    characterUnlockedDescriptions,
    companionActiveDescriptions,
    companionInactiveDescriptions,
    companionDuplicateDescriptions,
    companionUnlockedDescriptions,
    categoryActiveDescriptions,
    categoryInactiveDescriptions,
    categoryDuplicateDescriptions,
    categoryUnlockedDescriptions,
    itemActiveDescriptions,
    itemInactiveDescriptions,
    itemUnlockedDescriptions,
  }
}
