import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const antiquityLeadsMotifs = {
  id: "019db533-f381-7514-8ad7-fedbef9c1ee0",
  type: "page-type/temper-task",
  slug: "antiquity-leads-motifs",
  title: "Antiquity Leads Motifs",
  accountPage: "temper-account/alanarre",
  character: "temper-account-character/erin-solstice",
  effectiveCharacter: "temper-account-character/erin-solstice",
  esoCharacterId: "8796093022338107",
  scope: "character",
  priority: "p2",
  dueDate: "2026-09-29",
  displayOrder: 0,
  completionCard: "temper-completion-category/account-antiquity-leads-motifs",
  lastCompletedAt: "2026-09-22T13:06:49.000Z",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
} as const satisfies TemperTask
