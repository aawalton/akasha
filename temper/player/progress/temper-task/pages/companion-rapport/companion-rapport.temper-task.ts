import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const companionRapport = {
  id: "019e6eb9-14ae-747b-a209-26f7966ab741",
  type: "page-type/temper-task",
  slug: "companion-rapport",
  title: "Companion Rapport",
  icon: "file-text",
  character: "temper-account-character/maviola-el",
  completionCard: "temper-completion-category/characters-companion-rapport-character",
  dueDate: "2026-09-23",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p3",
  effectiveCharacter: "temper-account-character/maviola-el",
  lastCompletedAt: "2026-09-22T16:25:46.000Z",
  progress: "jsonl",
  progressTotal: 640000,
  progressCurrent: 81427,
} as const satisfies TemperTask
