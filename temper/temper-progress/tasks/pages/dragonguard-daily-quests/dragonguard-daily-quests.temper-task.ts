import type { TemperTask } from "../../temper-task.page-type.ts"

export const dragonguardDailyQuests = {
  id: "019db533-f381-75c3-9780-5890e62c0c88",
  pageTypeSlug: "temper-task",
  slug: "dragonguard-daily-quests",
  title: "Dragonguard Daily Quests",
  displayOrder: 7,
  character: "lyonette-du-marquin",
  completionCardId: "character-achievements",
  completionItemPath: ["Dragonhold", "Quests", "2612"],
  dueDate: "2026-09-09",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
  effectiveCharacter: "archmage-amerys",
  lastCompletedAt: "2026-09-08T13:12:09.000Z",
  progress: "jsonl",
  progressTotal: 600,
  progressCurrent: 327,
} as const satisfies TemperTask
