import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleContainersStackableBank = {
  id: "01a0728b-10d1-77a7-85d4-209b05b2a2af",
  type: "page-type/temper-inventory-rule",
  slug: "rule-containers-stackable-bank",
  title: "Bank stackable containers",
  description:
    "Deposits stackable containers (reward coffers, event boxes, etc.) in the bank. Open them later in bulk or save for events.",
  goal: "temper-rule-goal/hoard",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/container-stackable",
  displayOrder: 9,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/containers-stackable-bank",
} as const satisfies TemperInventoryRule
