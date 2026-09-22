import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const antiquityLeadsLegendary = {
  id: "019db533-f381-7525-a49a-ec655c3426c7",
  type: "page-type/temper-task",
  slug: "antiquity-leads-legendary",
  title: "Antiquity Leads Legendary",
  displayOrder: 0,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/account-antiquity-leads-legendary",
  dueDate: "2026-09-27",
  rruleRule: "FREQ=WEEKLY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "erin-solstice",
  lastCompletedAt: "2026-09-21T19:35:34.000Z",
} as const satisfies TemperTask
