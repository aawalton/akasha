import {
  heldKeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ItemAction } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  ActionGroup,
  PlanItem,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { ITEM_ACTION_PAGES } from "akasha/temper/player/progress/temper-item-action/modules/item-action-pages/item-action-pages.module.code.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

function actionTitle(action: ItemAction): string {
  const held = heldKeyedTitles(temperItemAction.slug)
  if (held !== null) return titleOf(held, action)
  return ITEM_ACTION_PAGES.find((one) => one.slug === action)?.title ?? action
}

function getGroupLabel(action: ItemAction): string {
  return actionTitle(action === "fence-sell" ? "sell" : action)
}

export function buildActionGroups(items: readonly PlanItem[]): readonly ActionGroup[] {
  const groupMap = new Map<string, PlanItem[]>()
  for (const item of items) {
    const key = item.note ?? getGroupLabel(item.action)
    let group = groupMap.get(key)
    if (!group) {
      group = []
      groupMap.set(key, group)
    }
    group.push(item)
  }
  const groups: ActionGroup[] = []
  for (const [label, groupItems] of groupMap) {
    const mergedItems = mergeDisplayItems(groupItems).toSorted((a, b) =>
      a.itemName.localeCompare(b.itemName)
    )
    const totalValue = sumItemValues(mergedItems)
    groups.push({ label, items: mergedItems, slotCount: mergedItems.length, totalValue })
  }
  return groups
}

function sumItemValues(items: readonly PlanItem[]): number | undefined {
  let total = 0
  let any = false
  for (const item of items) {
    if (item.value !== undefined) {
      total += item.value * item.stackCount
      any = true
    }
  }
  return any ? total : undefined
}

export function sumTotalValues(values: readonly (number | undefined)[]): number | undefined {
  let total = 0
  let any = false
  for (const v of values) {
    if (v !== undefined) {
      total += v
      any = true
    }
  }
  return any ? total : undefined
}

function mergeDisplayItems(items: readonly PlanItem[]): readonly PlanItem[] {
  const mergeMap = new Map<string, PlanItem>()
  const result: PlanItem[] = []
  for (const item of items) {
    const key = `${item.itemId}\0${item.quality}\0${item.note ?? ""}`
    const existing = mergeMap.get(key)
    if (existing) {
      existing.stackCount += item.stackCount
    } else {
      const copy = { ...item }
      mergeMap.set(key, copy)
      result.push(copy)
    }
  }
  return result
}
