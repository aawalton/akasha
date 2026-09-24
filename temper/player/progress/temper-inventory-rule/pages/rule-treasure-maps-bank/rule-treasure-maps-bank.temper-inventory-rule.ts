import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasureMapsBank = {
  id: "01a0728b-8ebf-7ddd-8ba9-20cfde237207",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasure-maps-bank",
  title: "Bank treasure maps",
  description:
    "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
  goal: "temper-rule-goal/task",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasure-maps",
  displayOrder: 52,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/treasure-maps-bank",
} as const satisfies TemperInventoryRule
