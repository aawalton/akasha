import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleAllianceWarBank = {
  id: "01a0728b-10d0-7dba-bd15-daddc405eed9",
  type: "page-type/temper-inventory-rule",
  slug: "rule-alliance-war-bank",
  title: "Bank Alliance War items",
  description:
    "Deposits Alliance War items (siege equipment, forward camps, repair kits, etc.) in the bank for safekeeping.",
  goal: "temper-rule-goal/hoard",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/alliance-war",
  displayOrder: 72,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:31.568Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
