import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleFoodNormalSell = {
  id: "01a0728b-2e7d-7562-9c53-0b79515d7535",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-food-normal-sell",
  title: "Sell basic food",
  description:
    "Sells normal (white) quality non-crafted food. Crafted and higher-quality food is kept.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "food",
  displayOrder: 72,
  action: "sell",
  active: true,
  updatedAt: "2026-07-05T12:23:57.288Z",
  locked: true,
  fromTemplate: "food-normal-sell",
} as const satisfies TemperInventoryRule
