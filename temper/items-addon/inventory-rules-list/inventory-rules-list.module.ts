import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesList = {
  id: "01a06258-b533-7b03-9ccc-7c38e13144d0",
  type: "module",
  slug: "inventory-rules-list",
  definition: "listing items at the guild trader by rule, and reading the posting response",
  code: "ts",
} as const satisfies Module
