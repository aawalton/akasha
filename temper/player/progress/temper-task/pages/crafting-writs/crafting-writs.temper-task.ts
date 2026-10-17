import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  type: "page-type/temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  displayOrder: 1,
  completionCard: "temper-completion-category/characters-daily-writs",
  dueDate: "2026-10-17",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p2",
  lastCompletedAt: "2026-10-16T12:09:40.000Z",
  progress: "jsonl",
  progressTotal: 140,
  progressCurrent: 119,
  character: "temper-account-character/erin-solstice",
  updatedAt: "2026-10-17T14:19:49.625Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  effectiveCharacter: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
