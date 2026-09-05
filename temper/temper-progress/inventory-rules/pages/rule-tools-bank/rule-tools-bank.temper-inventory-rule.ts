import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleToolsBank = {
  id: "01a0728b-6d6f-721e-a2cd-e61cc89fdac5",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-tools-bank",
  title: "Stock tools",
  description: "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
  goal: "hoard",
  destination: "bank",
  stockScope: "any-character",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "tools",
  displayOrder: 59,
  action: "stock",
  active: true,
  updatedAt: "2026-07-05T13:20:53.393Z",
  locked: true,
  fromTemplate: "tools-bank",
  destinationChain: "jsonl",
} as const satisfies TemperInventoryRule
