import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const lorebooks = {
  id: "019e2215-efc0-78bd-8676-b89e52598dd4",
  type: "page-type/temper-task",
  slug: "lorebooks",
  title: "Lorebooks",
  icon: "file-text",
  displayOrder: 15,
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/characters-lore-library-character",
  dueDate: "2026-10-08",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p4",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-27T14:23:14.418Z",
  progress: "jsonl",
  progressTotal: 4220,
  progressCurrent: 576,
} as const satisfies TemperTask
