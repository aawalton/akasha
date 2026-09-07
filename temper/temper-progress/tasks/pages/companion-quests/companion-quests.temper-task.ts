import type { TemperTask } from "../../temper-task.page-type.ts"

export const companionQuests = {
  id: "019e0394-18d8-7034-bda0-e7cc372eb80d",
  pageTypeSlug: "temper-task",
  slug: "companion-quests",
  title: "Companion Quests",
  icon: "file-text",
  displayOrder: 14,
  character: "maviola-el",
  completionCardId: "companion-quests",
  dueDate: "2026-09-08",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-09-07T16:27:37.845Z",
  progress: "jsonl",
  progressTotal: 600,
  progressCurrent: 218,
} as const satisfies TemperTask
