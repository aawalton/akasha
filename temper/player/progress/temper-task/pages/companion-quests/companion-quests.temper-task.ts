import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const companionQuests = {
  id: "019e0394-18d8-7034-bda0-e7cc372eb80d",
  type: "page-type/temper-task",
  slug: "companion-quests",
  title: "Companion Quests",
  icon: "file-text",
  displayOrder: 14,
  character: "temper-account-character/maviola-el",
  completionCard: "temper-completion-category/characters-companion-quests",
  dueDate: "2026-09-23",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  effectiveCharacter: "temper-account-character/maviola-el",
  lastCompletedAt: "2026-09-22T17:23:26.000Z",
  progress: "jsonl",
  progressTotal: 600,
  progressCurrent: 219,
} as const satisfies TemperTask
