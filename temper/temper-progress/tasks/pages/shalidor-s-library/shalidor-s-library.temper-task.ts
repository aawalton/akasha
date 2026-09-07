import type { TemperTask } from "../../temper-task.page-type.ts"

export const shalidorSLibrary = {
  id: "019e6a7d-5015-7d30-9bd6-ce0f15540ea0",
  pageTypeSlug: "temper-task",
  slug: "shalidor-s-library",
  title: "Shalidor's Library",
  icon: "file-text",
  displayOrder: 15,
  character: "nirayicel",
  completionCardId: "lore-library-character",
  completionItemPath: ["1"],
  dueDate: "2026-09-06",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-08-19T15:25:03.000Z",
  progress: "jsonl",
  progressTotal: 580,
  progressCurrent: 385,
} as const satisfies TemperTask
