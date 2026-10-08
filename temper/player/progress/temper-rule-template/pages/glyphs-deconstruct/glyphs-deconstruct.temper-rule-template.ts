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
  createdAt: "2026-05-16T13:40:16.028Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
