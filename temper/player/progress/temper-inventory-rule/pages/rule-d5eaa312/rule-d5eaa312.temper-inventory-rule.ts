import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleD5eaa312 = {
  id: "01a0728b-2e7c-76da-9bb6-376fb646b10a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-d5eaa312",
  title: "Destroy unsellable low drinks",
  description:
    "Spine step 6: below-superior drink with no merchant value (event drinks) cannot fall to the sell rules - destroy. Companion to the raised drink sell floor (A5).",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/drink",
  displayOrder: 83,
  action: "temper-item-action/destroy",
  active: true,
  updatedAt: "2026-07-05T13:32:43.468Z",
} as const satisfies TemperInventoryRule
