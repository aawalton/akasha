import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesDispatchEquip = {
  id: "01a06258-b531-7702-b482-69e71fa67e0e",
  type: "module",
  slug: "inventory-rules-dispatch-equip",
  definition: "equipping items by rule, one per frame, into the slot the rule resolves",
  code: "ts",
} as const satisfies Module
