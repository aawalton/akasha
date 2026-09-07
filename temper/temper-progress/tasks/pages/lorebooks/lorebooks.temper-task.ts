import type { TemperTask } from "../../temper-task.page-type.ts"

export const lorebooks = {
  id: "019e2215-efc0-78bd-8676-b89e52598dd4",
  pageTypeSlug: "temper-task",
  slug: "lorebooks",
  title: "Lorebooks",
  icon: "file-text",
  displayOrder: 15,
  character: "erin-solstice",
  completionCardId: "lore-library-character",
  dueDate: "2026-09-08",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-09-07T16:27:38.658Z",
  progressTotal: 211,
  progressCurrent: 146,
} as const satisfies TemperTask
