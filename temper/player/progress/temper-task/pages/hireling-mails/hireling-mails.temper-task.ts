import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const hirelingMails = {
  id: "019db533-f381-75d4-901d-3a5d3de946dd",
  type: "page-type/temper-task",
  slug: "hireling-mails",
  title: "Hireling Mails",
  displayOrder: 4,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/tasks-hireling-mails",
  dueDate: "2026-09-23",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p3",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-22T16:34:49.000Z",
} as const satisfies TemperTask
