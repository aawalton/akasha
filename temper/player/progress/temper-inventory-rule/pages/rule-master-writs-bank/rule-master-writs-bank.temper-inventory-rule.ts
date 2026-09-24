import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleMasterWritsBank = {
  id: "01a0728b-4fbd-7216-a904-e163cc67b526",
  type: "page-type/temper-inventory-rule",
  slug: "rule-master-writs-bank",
  title: "Bank master writs",
  description:
    "Stashes master writs in the bank. Master writs reward writ vouchers for high-end crafting station furnishings.",
  goal: "temper-rule-goal/task",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/master-writs",
  displayOrder: 49,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/master-writs-bank",
} as const satisfies TemperInventoryRule
