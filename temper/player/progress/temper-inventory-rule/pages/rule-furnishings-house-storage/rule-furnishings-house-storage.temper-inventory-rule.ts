import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFurnishingsHouseStorage = {
  id: "01a0728b-4fba-79ed-83d3-049e2f247e58",
  type: "page-type/temper-inventory-rule",
  slug: "rule-furnishings-house-storage",
  title: "Store furniture in housing",
  description:
    "Moves furnishings to the furniture vault (house storage) when visiting the bank. Keeps your backpack clear of bulky furniture items.",
  goal: "temper-rule-goal/hoard",
  destination: "furniture-vault",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/furnishings",
  displayOrder: 38,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/furnishings-house-storage",
} as const satisfies TemperInventoryRule
