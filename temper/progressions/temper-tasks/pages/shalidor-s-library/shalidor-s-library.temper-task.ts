import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const shalidorSLibrary = {
  id: "019e6a7d-5015-7d30-9bd6-ce0f15540ea0",
  type: "temper-task",
  slug: "shalidor-s-library",
  title: "Shalidor's Library",
  icon: "file-text",
  displayOrder: 15,
  character: "nirayicel",
  completionCardId: "lore-library-character",
  completionItemPath: ["1"],
  dueDate: "2026-09-13",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-09-12T12:34:22.290Z",
  progress: "jsonl",
  progressTotal: 580,
  progressCurrent: 394,
} as const satisfies TemperTask
