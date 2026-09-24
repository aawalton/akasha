import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresEpicBank = {
  id: "01a0728b-8ec0-751b-8b72-78d2913de4d2",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-epic-bank",
  title: "Bank epic+ treasures",
  description: "Banks epic quality or higher treasures for safekeeping or later sale.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 63,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/treasures-epic-bank",
} as const satisfies TemperInventoryRule
