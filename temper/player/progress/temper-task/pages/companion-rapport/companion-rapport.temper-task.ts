import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const companionRapport = {
  id: "019e6eb9-14ae-747b-a209-26f7966ab741",
  type: "page-type/temper-task",
  slug: "companion-rapport",
  title: "Companion Rapport",
  icon: "file-text",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/characters-companion-rapport-character",
  dueDate: "2026-09-22",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-09-21T19:48:27.210Z",
  progress: "jsonl",
  progressTotal: 640000,
  progressCurrent: 56898,
  effectiveCharacter: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
