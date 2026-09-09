import type { CompiledRuleConfig } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  type ItemRuleVerdictMutation,
  selectConfirmedVerdictItemIds,
  selectEffectiveAction,
} from "../inventory-item-rule-verdict-core/inventory-item-rule-verdict-core.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
export function setItemRuleVerdict(
  itemId: number,
  itemName: string,
  action: "sell" | "nothing"
): undefined {
  const sv = getSavedVariables()
  const outbox = sv.pendingSettingsMutations ?? []
  const next: ItemRuleVerdictMutation[] = outbox.filter((e) => e.itemId !== itemId)
  next.push({ kind: "item-rule-verdict", itemId, itemName, action })
  sv.pendingSettingsMutations = next
}

export function getItemRuleVerdictAction(itemId: number): ItemAction | undefined {
  const outbox = getSavedVariables().pendingSettingsMutations
  if (outbox === undefined) return undefined
  for (const entry of outbox) {
    if (entry.itemId === itemId) return entry.action
  }
  return undefined
}

export function getEffectiveItemRuleAction(
  itemId: number,
  compiled: CompiledRuleConfig
): ItemAction | undefined {
  return selectEffectiveAction(getItemRuleVerdictAction(itemId), compiled.itemRules[itemId]?.action)
}

export function pruneConfirmedVerdicts(compiled: CompiledRuleConfig): number {
  const sv = getSavedVariables()
  const outbox = sv.pendingSettingsMutations
  if (outbox === undefined) return 0

  const compiledIds = new Set<number>()
  for (const key of Object.keys(compiled.itemRules)) compiledIds.add(Number(key))

  const confirmed = new Set(
    selectConfirmedVerdictItemIds(
      outbox.map((e) => e.itemId),
      compiledIds
    )
  )
  if (confirmed.size === 0) return 0

  const remaining = outbox.filter((e) => !confirmed.has(e.itemId))
  sv.pendingSettingsMutations = remaining.length === 0 ? undefined : remaining
  return confirmed.size
}
