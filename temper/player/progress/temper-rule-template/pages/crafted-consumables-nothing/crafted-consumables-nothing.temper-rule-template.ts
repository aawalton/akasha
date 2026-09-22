import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const craftedConsumablesNothing = {
  id: "019e3104-260c-727e-bb79-241dd40a8002",
  type: "page-type/temper-rule-template",
  slug: "crafted-consumables-nothing",
  title: "Protect crafted consumables",
  key: "crafted-consumables-nothing",
  description:
    "Prevents crafted food, drink, potions, poisons, and glyphs from being affected by lower-priority rules. Crafted consumables take ingredients and time to make — this keeps them safe from accidental sell or destroy rules.",
  categoryId: "temper-item-category-tree/consumables",
  displayOrder: 7,
  action: "temper-item-action/nothing",
  active: false,
  goal: "temper-rule-goal/use",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
