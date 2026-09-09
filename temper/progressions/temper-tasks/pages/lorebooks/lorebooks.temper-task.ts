import type { TemperTask } from "../../temper-task.page-type.ts"

export const lorebooks = {
  id: "019e2215-efc0-78bd-8676-b89e52598dd4",
  pageTypeSlug: "temper-task",
  type: "temper-task",
  slug: "lorebooks",
  title: "Lorebooks",
  icon: "file-text",
  displayOrder: 15,
  character: "erin-solstice",
  completionCardId: "lore-library-character",
  dueDate: "2026-09-09",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-09-08T10:11:43.000Z",
  progressTotal: 4220,
  progressCurrent: 569,
  progress: "jsonl",
} as const satisfies TemperTask
