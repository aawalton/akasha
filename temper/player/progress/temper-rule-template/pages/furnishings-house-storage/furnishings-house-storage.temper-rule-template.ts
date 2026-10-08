import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const furnishingsHouseStorage = {
  id: "019e3104-2623-7821-a2ec-6231f73b4a1b",
  type: "page-type/temper-rule-template",
  slug: "furnishings-house-storage",
  title: "Store furniture in housing",
  key: "furnishings-house-storage",
  description:
    "Moves furnishings to the furniture vault (house storage) when visiting the bank. Keeps your backpack clear of bulky furniture items.",
  categoryId: "temper-item-category-tree/furnishings",
  displayOrder: 36,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "furniture-vault",
  createdAt: "2026-05-16T13:40:16.035Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
