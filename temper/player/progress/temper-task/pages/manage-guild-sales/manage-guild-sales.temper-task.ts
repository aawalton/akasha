import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const manageGuildSales = {
  id: "019db533-f381-758e-8b24-0a120b8857e8",
  type: "page-type/temper-task",
  slug: "manage-guild-sales",
  title: "Manage Guild Sales",
  displayOrder: 12,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/tasks-guild-sales",
  dueDate: "2026-09-28",
  rruleRule: "FREQ=WEEKLY;BYDAY=MO",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "erin-solstice",
  lastCompletedAt: "2026-09-21T19:39:05.851Z",
} as const satisfies TemperTask
