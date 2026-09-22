import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleTasksStolen = {
  id: "01a0728b-6d6f-72d7-9a3d-426fdaf75e61",
  type: "page-type/temper-inventory-rule",
  slug: "rule-tasks-stolen",
  title: "Launder stolen task items",
  description:
    "Launders stolen task-type items (writs, maps, etc.) so they can be completed or banked.",
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/tasks",
  displayOrder: 46,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/tasks-stolen",
} as const satisfies TemperInventoryRule
