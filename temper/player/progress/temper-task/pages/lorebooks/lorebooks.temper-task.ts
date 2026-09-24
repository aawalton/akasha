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
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p4",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-24T15:12:33.000Z",
  progress: "jsonl",
  progressTotal: 4220,
  progressCurrent: 571,
} as const satisfies TemperTask
