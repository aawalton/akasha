import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleGlyphsDeconstruct = {
  id: "01a0728b-4fbc-77ff-8a3c-78b19009ed0e",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-glyphs-deconstruct",
  title: "Deconstruct glyphs",
  description:
    "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
  goal: "hoard",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "glyphs",
  displayOrder: 55,
  action: "deconstruct",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "glyphs-deconstruct",
} as const satisfies TemperInventoryRule
