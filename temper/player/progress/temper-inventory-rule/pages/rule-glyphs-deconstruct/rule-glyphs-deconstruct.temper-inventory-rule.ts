import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleGlyphsDeconstruct = {
  id: "01a0728b-4fbc-77ff-8a3c-78b19009ed0e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-glyphs-deconstruct",
  title: "Deconstruct glyphs",
  description:
    "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/glyphs",
  displayOrder: 58,
  action: "temper-item-action/deconstruct",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
