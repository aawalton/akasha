import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const glyphsDeconstruct = {
  id: "019e3104-261c-7f8f-9381-55d36b62a9c8",
  type: "page-type/temper-rule-template",
  slug: "glyphs-deconstruct",
  title: "Deconstruct glyphs",
  key: "glyphs-deconstruct",
  description:
    "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
  categoryId: "temper-item-category-tree/glyphs",
  displayOrder: 28,
  action: "temper-item-action/deconstruct",
  active: false,
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
