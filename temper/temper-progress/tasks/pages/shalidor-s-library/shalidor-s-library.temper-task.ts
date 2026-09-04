import type { TemperTask } from "../../temper-task.page-type.ts"

export const shalidorSLibrary = {
  id: "019e6a7d-5015-7d30-9bd6-ce0f15540ea0",
  pageTypeSlug: "temper-task",
  slug: "shalidor-s-library",
  title: "Shalidor's Library",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "nirayicel",
  scope: "next_character",
  priority: "p3",
  dueDate: "2026-08-20",
  displayOrder: 15,
  completionCardId: "lore-library-character",
  completionItemPath: ["1"],
  lastCompletedAt: "2026-08-19T15:25:03.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 580,
  progressCurrent: 385,
  progress: "jsonl",
} as const satisfies TemperTask
