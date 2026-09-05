import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rulePoisonsNormalSell = {
  id: "01a0728b-6d6d-78ad-89e0-d935fa86f48a",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-poisons-normal-sell",
  title: "Sell basic poisons",
  description:
    "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "poisons",
  displayOrder: 71,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  goal: "sell",
  locked: true,
  fromTemplate: "poisons-normal-sell",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
