import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const shalidorSLibrary = {
  id: "019e6a7d-5015-7d30-9bd6-ce0f15540ea0",
  type: "page-type/temper-task",
  slug: "shalidor-s-library",
  title: "Shalidor's Library",
  icon: "file-text",
  displayOrder: 15,
  character: "temper-account-character/nirayicel",
  completionCard: "temper-completion-category/characters-lore-library-character",
  completionItemPath: ["1"],
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p4",
  effectiveCharacter: "temper-account-character/nirayicel",
  lastCompletedAt: "2026-09-24T21:50:56.284Z",
  progress: "jsonl",
  progressTotal: 580,
  progressCurrent: 394,
} as const satisfies TemperTask
