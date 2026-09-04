import type { TemperTask } from "../../temper-task.page-type.ts"

export const dragonguardDailyQuests = {
  id: "019db533-f381-75c3-9780-5890e62c0c88",
  pageTypeSlug: "temper-task",
  slug: "dragonguard-daily-quests",
  title: "Dragonguard Daily Quests",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "lyonette-du-marquin",
  effectiveCharacter: "archmage-amerys",
  scope: "all_characters",
  priority: "p3",
  dueDate: "2026-08-19",
  displayOrder: 7,
  completionCardId: "character-achievements",
  completionItemPath: ["Dragonhold", "Quests", "2612"],
  lastCompletedAt: "2026-08-19T12:16:26.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 600,
  progressCurrent: 327,
  progress: "jsonl",
} as const satisfies TemperTask
