import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTrophiesBank = {
  id: "01a0728b-8ec1-75fa-80ed-81a19e273ed8",
  type: "page-type/temper-inventory-rule",
  slug: "rule-trophies-bank",
  title: "Bank trophies",
  description:
    "Deposits miscellaneous trophies (keys, key fragments, toys, dungeon buff ingredients, material upgraders) in the bank for safekeeping.",
  goal: "temper-rule-goal/hoard",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/trophies",
  displayOrder: 65,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/trophies-bank",
} as const satisfies TemperInventoryRule
