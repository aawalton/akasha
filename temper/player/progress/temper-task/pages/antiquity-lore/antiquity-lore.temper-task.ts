import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const antiquityLore = {
  id: "019db533-f381-762c-874e-b381b6005239",
  type: "page-type/temper-task",
  slug: "antiquity-lore",
  title: "Antiquity Lore",
  displayOrder: 0,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/account-antiquity-lore",
  dueDate: "2026-09-29",
  rruleRule: "FREQ=WEEKLY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-22T16:34:45.000Z",
  progress: "jsonl",
  progressCurrent: 0,
  progressTotal: 1765,
} as const satisfies TemperTask
