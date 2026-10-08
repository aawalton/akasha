import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const tasksStolen = {
  id: "019e3104-2615-7cda-ba54-233e6c758ff2",
  type: "page-type/temper-rule-template",
  slug: "tasks-stolen",
  title: "Launder stolen task items",
  key: "tasks-stolen",
  description:
    "Launders stolen task-type items (writs, maps, etc.) so they can be completed or banked.",
  categoryId: "temper-item-category-tree/tasks",
  displayOrder: 18,
  action: "temper-item-action/fence-launder",
  active: false,
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.021Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
