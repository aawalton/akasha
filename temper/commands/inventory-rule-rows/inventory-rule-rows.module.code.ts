import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"

export const ITEM_RULE_COLUMNS = [
  "id",
  "itemId",
  "itemName",
  "action",
  "active",
  "locked",
  "stockQuantity",
  "destination",
] as const

export const BUY_RULE_COLUMNS = [
  "id",
  "itemId",
  "itemName",
  "targetQuantity",
  "source",
  "active",
  "locked",
] as const

export const RULE_SHOW_COLUMNS = [
  "id",
  "categoryId",
  "action",
  "active",
  "locked",
  "destination",
] as const

export function itemRuleRow(rule: ItemRule): Record<string, unknown> {
  return {
    id: rule.id,
    itemId: rule.itemId,
    itemName: rule.itemName,
    action: rule.action,
    active: rule.active,
    locked: rule.locked,
    stockQuantity: rule.stockQuantity,
    destination: rule.destination,
  }
}
