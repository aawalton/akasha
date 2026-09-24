import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const dragonguardDailyQuests = {
  id: "019db533-f381-75c3-9780-5890e62c0c88",
  type: "page-type/temper-task",
  slug: "dragonguard-daily-quests",
  title: "Dragonguard Daily Quests",
  displayOrder: 7,
  character: "temper-account-character/ceria-springwater",
  completionCard: "temper-completion-category/characters-character-achievements",
  completionItemPath: ["Dragonhold", "Quests", "2612"],
  dueDate: "2026-09-23",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
  effectiveCharacter: "temper-account-character/ceria-springwater",
  lastCompletedAt: "2026-09-22T16:23:31.000Z",
  progress: "jsonl",
  progressTotal: 600,
  progressCurrent: 585,
} as const satisfies TemperTask
