import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const inventoryManagement = {
  id: "01a0dee8-dad3-775f-95be-5085d404880b",
  type: "page-type/temper-task",
  slug: "inventory-management",
  title: "Inventory Management",
  displayOrder: 13,
  completionCard: "temper-completion-category/tasks-inventory-management",
  dueDate: "2026-10-08",
  rruleRule: "FREQ=WEEKLY;BYDAY=SA",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p2",
  progress: "jsonl",
  progressCurrent: 0,
  progressTotal: 20,
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-27T01:11:17.438Z",
  character: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
