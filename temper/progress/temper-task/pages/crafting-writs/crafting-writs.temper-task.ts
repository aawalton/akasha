import type { TemperTask } from "akasha/temper/progress/temper-task/temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  type: "page-type/temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  displayOrder: 1,
  completionCardId: "daily-writs",
  dueDate: "2026-09-16",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p2",
  lastCompletedAt: "2026-09-15T14:43:26.000Z",
  progress: "jsonl",
  progressTotal: 140,
  progressCurrent: 56,
} as const satisfies TemperTask
