import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const inventoryManagement = {
  id: "01a0dee8-dad3-775f-95be-5085d404880b",
  type: "page-type/temper-task",
  slug: "inventory-management",
  title: "Inventory Management",
  displayOrder: 13,
  completionCard: "temper-completion-category/tasks-inventory-management",
  dueDate: "2026-10-31",
  rruleRule: "FREQ=WEEKLY;BYDAY=SA",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p2",
  progress: "jsonl",
  progressCurrent: 3,
  progressTotal: 20,
  lastCompletedAt: "2026-10-24T16:06:39.399Z",
  character: "temper-account-character/erin-solstice",
  createdAt: "2026-09-26T18:09:57.459Z",
  updatedAt: "2026-10-25T19:26:33.147Z",
  effectiveCharacter: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
