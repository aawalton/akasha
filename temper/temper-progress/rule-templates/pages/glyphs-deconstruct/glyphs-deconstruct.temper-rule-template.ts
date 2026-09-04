import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const glyphsDeconstruct = {
  id: "019e3104-261c-7f8f-9381-55d36b62a9c8",
  pageTypeSlug: "temper-rule-template",
  slug: "glyphs-deconstruct",
  title: "Deconstruct glyphs",
  key: "glyphs-deconstruct",
  description:
    "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
  categoryId: "glyphs",
  displayOrder: 27,
  action: "deconstruct",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
