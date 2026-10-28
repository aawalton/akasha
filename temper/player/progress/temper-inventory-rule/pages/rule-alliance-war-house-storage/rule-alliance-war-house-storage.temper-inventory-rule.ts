import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleAllianceWarHouseStorage = {
  id: "01a0728b-10d0-7dba-bd15-daddc405eed9",
  type: "page-type/temper-inventory-rule",
  slug: "rule-alliance-war-house-storage",
  title: "Store Alliance War items",
  description:
    "Stores Alliance War items (siege equipment, forward camps, repair kits, etc.) in the house storage chest named Alliance War.",
  goal: "temper-rule-goal/hoard",
  destination: "house-storage:Alliance War",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/alliance-war",
  displayOrder: 72,
  action: "temper-item-action/move-to",
  active: true,
  ruleChangedAt: "2026-10-28T18:40:00.000Z",
  locked: true,
  createdAt: "2026-09-05T17:08:31.568Z",
  updatedAt: "2026-10-28T18:26:36.422Z",
} as const satisfies TemperInventoryRule
