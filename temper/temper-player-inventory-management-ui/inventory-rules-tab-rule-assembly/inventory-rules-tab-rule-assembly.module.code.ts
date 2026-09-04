"use client"

import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import { classifyRule } from "@akasha/temper-items-rules-core/inventory-rule-classify"
import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import { buildAllControlledRules } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ruleFingerprint } from "@akasha/temper-items-rules-core/rule-fingerprint"
import { useDeferredValue, useMemo } from "react"

export interface AssembledInventoryRules {
  controlledCharacterRules: readonly ControlledRule[]
  controlledCompanionRules: readonly ControlledRule[]
  controlledRulesCount: number
  allRulesForMatching: readonly CategoryRule[]
  globalPriorityMap: Map<string, number>
  deferredItemRules: readonly ItemRule[] | undefined
  deferredBuyRules: readonly BuyRule[] | undefined
  deferredAllRulesForMatching: readonly CategoryRule[]
  duplicateRuleIds: Set<string>
  itemRules: readonly ItemRule[]
  characterRules: readonly CategoryRule[]
  companionRules: readonly CategoryRule[]
  categoryRules: readonly CategoryRule[]
}

export function useAssembledInventoryRules(
  localSettings: InventoryRuleSettings,
  stableAutomationSettings: AutomationSettings
): AssembledInventoryRules {
  const { characterRules: controlledCharacterRules, companionRules: controlledCompanionRules } =
    useMemo(() => buildAllControlledRules(stableAutomationSettings), [stableAutomationSettings])

  const controlledRulesCount = controlledCharacterRules.length + controlledCompanionRules.length

  const allRulesForMatching = useMemo(
    () => [...controlledCharacterRules, ...controlledCompanionRules, ...localSettings.rules],
    [controlledCharacterRules, controlledCompanionRules, localSettings.rules]
  )

  const globalPriorityMap = useMemo(() => {
    const map = new Map<string, number>()
    allRulesForMatching.forEach((rule, i) => map.set(rule.id, i + 1))
    return map
  }, [allRulesForMatching])

  const deferredRules = useDeferredValue(localSettings.rules)
  const deferredItemRules = useDeferredValue(localSettings.itemRules)
  const deferredBuyRules = useDeferredValue(localSettings.buyRules)
  const deferredAllRulesForMatching = useMemo(
    () => [...controlledCharacterRules, ...controlledCompanionRules, ...deferredRules],
    [controlledCharacterRules, controlledCompanionRules, deferredRules]
  )

  const duplicateRuleIds = useMemo(() => {
    const seen = new Set<string>()
    const dupes = new Set<string>()
    for (const rule of localSettings.rules) {
      if (rule.categoryId === "") continue
      const fp = ruleFingerprint(rule)
      if (seen.has(fp)) dupes.add(rule.id)
      else seen.add(fp)
    }
    return dupes
  }, [localSettings.rules])

  const itemRules = localSettings.itemRules ?? []

  const { characterRules, companionRules, categoryRules } = useMemo(() => {
    const character: CategoryRule[] = []
    const companion: CategoryRule[] = []
    const category: CategoryRule[] = []
    for (const rule of localSettings.rules) {
      const type = classifyRule(rule)
      if (type === "character") character.push(rule)
      else if (type === "companion") companion.push(rule)
      else category.push(rule)
    }
    return {
      characterRules: character,
      companionRules: companion,
      categoryRules: category,
    }
  }, [localSettings.rules])

  return {
    controlledCharacterRules,
    controlledCompanionRules,
    controlledRulesCount,
    allRulesForMatching,
    globalPriorityMap,
    deferredItemRules,
    deferredBuyRules,
    deferredAllRulesForMatching,
    duplicateRuleIds,
    itemRules,
    characterRules,
    companionRules,
    categoryRules,
  }
}
