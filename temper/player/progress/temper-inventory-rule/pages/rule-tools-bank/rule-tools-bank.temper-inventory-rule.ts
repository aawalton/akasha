import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleToolsBank = {
  id: "01a0728b-6d6f-721e-a2cd-e61cc89fdac5",
  type: "page-type/temper-inventory-rule",
  slug: "rule-tools-bank",
  title: "Stock tools",
  description: "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
  goal: "temper-rule-goal/hoard",
  stockScope: "any-character",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/tools",
  displayOrder: 62,
  action: "temper-item-action/stock",
  active: true,
  updatedAt: "2026-07-05T13:20:53.393Z",
  locked: true,
  fromTemplate: "temper-rule-template/tools-bank",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
