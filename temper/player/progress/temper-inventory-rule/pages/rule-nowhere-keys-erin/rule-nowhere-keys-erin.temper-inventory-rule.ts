import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleNowhereKeysErin = {
  id: "01a12629-c3b5-754a-bb8c-10de6e738e56",
  type: "page-type/temper-inventory-rule",
  slug: "rule-nowhere-keys-erin",
  title: "Stock Wondrous Nowhere Keys on Erin (200, rest banked)",
  description:
    "Alan keeps Wondrous Nowhere Keys on Erin rather than selling them. Runs before rule-valuable-nothing, which would list them.",
  conditions: "jsonl",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/trophy-keys",
  displayOrder: 18.5,
  action: "temper-item-action/stock",
  active: true,
  ruleChangedAt: "2026-10-10T15:00:00.000Z",
  destinationChain: "jsonl",
  createdAt: "2026-10-10T14:13:53.716Z",
  updatedAt: "2026-10-10T14:13:53.716Z",
} as const satisfies TemperInventoryRule
