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
  dueDate: "2026-09-27",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p3",
  lastCompletedAt: "2026-09-27T13:30:41.526Z",
  progress: "jsonl",
  progressTotal: 600,
  progressCurrent: 600,
  completedAt: "2026-09-27T13:30:41.526Z",
} as const satisfies TemperTask
