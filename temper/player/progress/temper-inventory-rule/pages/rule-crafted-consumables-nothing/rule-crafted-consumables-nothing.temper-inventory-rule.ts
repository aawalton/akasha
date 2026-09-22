import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftedConsumablesNothing = {
  id: "01a0728b-10d1-7ba5-a83a-c81be228c4b8",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafted-consumables-nothing",
  title: "Protect crafted consumables",
  description:
    "Prevents crafted food, drink, potions, poisons, and glyphs from being affected by lower-priority rules. Crafted consumables take ingredients and time to make — this keeps them safe from accidental sell or destroy rules.",
  goal: "temper-rule-goal/use",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/consumables",
  displayOrder: 23,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/crafted-consumables-nothing",
} as const satisfies TemperInventoryRule
