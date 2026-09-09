import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleAcb23368 = {
  id: "01a0728b-10d0-7661-8d28-70724b837b31",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-acb23368",
  title: "Sell Psijic Ambrosia recipe fragments",
  description:
    "Sells Psijic Ambrosia recipe fragments (Fragment I–IV) regardless of quality. Item: 64702–64705.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "recipe-fragments",
  displayOrder: 27,
  action: "sell",
  active: true,
  updatedAt: "2026-05-07T22:10:37.410Z",
} as const satisfies TemperInventoryRule
