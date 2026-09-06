import type { TemperTask } from "../../temper-task.page-type.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  pageTypeSlug: "temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p2",
  dueDate: "2026-09-07",
  displayOrder: 1,
  completionCardId: "daily-writs",
  lastCompletedAt: "2026-09-06T16:07:47.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 140,
  progressCurrent: 98,
  progress: "jsonl",
} as const satisfies TemperTask
