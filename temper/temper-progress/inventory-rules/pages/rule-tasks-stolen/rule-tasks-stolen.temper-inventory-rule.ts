import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTasksStolen = {
  id: "01a0728b-6d6f-72d7-9a3d-426fdaf75e61",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-tasks-stolen",
  title: "Launder stolen task items",
  description:
    "Launders stolen task-type items (writs, maps, etc.) so they can be completed or banked.",
  goal: "task",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "tasks",
  displayOrder: 45,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "tasks-stolen",
} as const satisfies TemperInventoryRule
