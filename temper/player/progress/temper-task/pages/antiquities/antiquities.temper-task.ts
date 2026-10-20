import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const antiquities = {
  id: "019db533-f381-7514-8ad7-fedbef9c1ee0",
  type: "page-type/temper-task",
  slug: "antiquities",
  title: "Antiquities",
  accountPage: "temper-account/alanarre",
  character: "temper-account-character/erin-solstice",
  effectiveCharacter: "temper-account-character/erin-solstice",
  esoCharacterId: "8796093022338107",
  scope: "character",
  priority: "p2",
  dueDate: "2026-10-20",
  displayOrder: 0,
  completionCard: "temper-completion-category/account-antiquity-leads",
  lastCompletedAt: "2026-10-20T18:31:11.000Z",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-20T18:46:19.181Z",
} as const satisfies TemperTask
