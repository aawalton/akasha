import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const lorebooks = {
  id: "019e2215-efc0-78bd-8676-b89e52598dd4",
  type: "temper-task",
  slug: "lorebooks",
  title: "Lorebooks",
  icon: "file-text",
  displayOrder: 15,
  character: "erin-solstice",
  completionCardId: "lore-library-character",
  dueDate: "2026-09-12",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-09-12T01:02:31.353Z",
  progress: "jsonl",
  progressTotal: 4220,
  progressCurrent: 569,
} as const satisfies TemperTask
