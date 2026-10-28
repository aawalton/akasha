import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleMythicHouseStorageBank = {
  id: "01a183f5-2a75-7f92-a95d-61da05eb6192",
  type: "page-type/temper-inventory-rule",
  slug: "rule-mythic-house-storage-bank",
  title: "Bank mythic gear from house storage",
  description:
    "Moves mythic equipment held in a housing storage container, such as the Wealth chest, to the bank. Sits above the uncollected bind rule and the legendary gear protection, so a mythic in house storage reaches the bank first. Mythics a character carries or wears are left where they are.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 15.4,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T19:20:28.000Z",
  createdAt: "2026-10-28T19:20:44.916Z",
  updatedAt: "2026-10-28T19:20:44.916Z",
} as const satisfies TemperInventoryRule
