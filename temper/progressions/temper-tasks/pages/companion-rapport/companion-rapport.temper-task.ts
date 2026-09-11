import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const companionRapport = {
  id: "019e6eb9-14ae-747b-a209-26f7966ab741",
  type: "temper-task",
  slug: "companion-rapport",
  title: "Companion Rapport",
  icon: "file-text",
  character: "maviola-el",
  completionCardId: "companion-rapport-character",
  dueDate: "2026-09-11",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-09-10T20:54:06.482Z",
  progress: "jsonl",
  progressTotal: 640000,
  progressCurrent: 79614,
} as const satisfies TemperTask
