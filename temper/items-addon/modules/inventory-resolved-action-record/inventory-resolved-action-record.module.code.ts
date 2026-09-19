import { getLocationKeyForBag } from "akasha/temper/items-addon/modules/inventory-location-keys/inventory-location-keys.module.code.ts"
import { getDatabase } from "akasha/temper/items-addon/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type {
  InventoryItemData,
  ResolvedActionSource,
} from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"

interface ResolvedActionValues {
  action: string
  destination?: string
  ruleSource: ResolvedActionSource
  ruleIndex?: number
}

export function recordResolvedAction(
  bagId: number,
  slotIndex: number,
  resolved: ResolvedActionValues
): undefined {
  const key = getLocationKeyForBag(bagId)
  if (key === undefined) return
  const location = getDatabase().locations[key]
  if (location === undefined) return
  const item = location.bags[bagId]?.[slotIndex]
  if (item === undefined) return
  item.resolvedAction = resolved.action
  item.resolvedDestination = resolved.destination
  item.resolvedBy = resolved.ruleSource
  item.resolvedRuleIndex = resolved.ruleIndex
  item.resolvedAt = GetTimeStamp()
}

export function carryResolvedActionsForward(
  previous: Record<number, InventoryItemData> | undefined,
  next: Record<number, InventoryItemData>
): undefined {
  if (previous === undefined) return
  for (const [slotIndexStr, priorItem] of Object.entries(previous)) {
    if (priorItem.resolvedAction === undefined) continue
    const slotIndex = tonumber(slotIndexStr)
    if (slotIndex === undefined) continue
    const item = next[slotIndex]
    if (item === undefined) continue
    if (item.itemLink !== priorItem.itemLink) continue
    if (item.stackCount !== priorItem.stackCount) continue
    item.resolvedAction = priorItem.resolvedAction
    item.resolvedDestination = priorItem.resolvedDestination
    item.resolvedBy = priorItem.resolvedBy
    item.resolvedRuleIndex = priorItem.resolvedRuleIndex
    item.resolvedAt = priorItem.resolvedAt
  }
}
