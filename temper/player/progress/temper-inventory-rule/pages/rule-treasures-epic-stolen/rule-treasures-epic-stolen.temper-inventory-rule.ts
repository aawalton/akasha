import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTreasuresEpicStolen = {
  id: "01a0728b-8ec0-725b-bf83-228a199a5876",
  type: "page-type/temper-inventory-rule",
  slug: "rule-treasures-epic-stolen",
  title: "Launder epic+ treasures",
  description:
    "Launders stolen treasures of epic quality or higher. These are worth keeping — sell them legitimately or bank for later.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/treasures",
  displayOrder: 61,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
} as const satisfies TemperInventoryRule
