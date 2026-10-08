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
  displayOrder: 71,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:09:03.809Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
