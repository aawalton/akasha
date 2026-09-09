import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleCraftedConsumablesNothing = {
  id: "01a0728b-10d1-7ba5-a83a-c81be228c4b8",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-crafted-consumables-nothing",
  title: "Protect crafted consumables",
  description:
    "Prevents crafted food, drink, potions, poisons, and glyphs from being affected by lower-priority rules. Crafted consumables take ingredients and time to make — this keeps them safe from accidental sell or destroy rules.",
  goal: "use",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "consumables",
  displayOrder: 23,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "crafted-consumables-nothing",
} as const satisfies TemperInventoryRule
