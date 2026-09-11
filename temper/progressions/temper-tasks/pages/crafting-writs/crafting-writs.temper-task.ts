import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  pageTypeSlug: "temper-task",
  type: "temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p2",
  dueDate: "2026-09-11",
  displayOrder: 1,
  completionCardId: "daily-writs",
  lastCompletedAt: "2026-09-10T16:01:00.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 140,
  progressCurrent: 56,
  progress: "jsonl",
} as const satisfies TemperTask
