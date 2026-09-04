import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
export interface ItemRuleVerdictMutation {
  kind: "item-rule-verdict"
  itemId: number
  itemName: string
  action: "sell" | "nothing"
}

export type PendingSettingsMutation = ItemRuleVerdictMutation

export function verdictActionForJunk(willBeJunk: boolean): "sell" | "nothing" {
  return willBeJunk ? "sell" : "nothing"
}

export function selectEffectiveAction(
  outboxAction: ItemAction | undefined,
  compiledAction: ItemAction | undefined
): ItemAction | undefined {
  return outboxAction ?? compiledAction
}

export function selectConfirmedVerdictItemIds(
  outboxItemIds: readonly number[],
  compiledItemIds: ReadonlySet<number>
): number[] {
  const confirmed: number[] = []
  for (const id of outboxItemIds) {
    if (compiledItemIds.has(id)) confirmed.push(id)
  }
  return confirmed
}
