import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  type: "page-type/temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  displayOrder: 1,
  completionCard: "temper-completion-category/characters-daily-writs",
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p2",
  lastCompletedAt: "2026-09-24T16:49:04.000Z",
  progress: "jsonl",
  progressTotal: 140,
  progressCurrent: 112,
  character: "temper-account-character/erin-solstice",
  effectiveCharacter: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
