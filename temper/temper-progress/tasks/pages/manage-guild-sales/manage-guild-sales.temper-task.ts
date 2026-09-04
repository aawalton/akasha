import type { TemperTask } from "../../temper-task.page-type.ts"

export const manageGuildSales = {
  id: "019db533-f381-758e-8b24-0a120b8857e8",
  pageTypeSlug: "temper-task",
  slug: "manage-guild-sales",
  title: "Manage Guild Sales",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "erin-solstice",
  effectiveCharacter: "erin-solstice",
  esoCharacterId: "8796093022338107",
  scope: "character",
  priority: "p2",
  dueDate: "2026-08-24",
  displayOrder: 12,
  completionCardId: "guild-sales",
  lastCompletedAt: "2026-08-17T13:47:29.084Z",
  rruleRule: "FREQ=WEEKLY;BYDAY=MO",
  rruleAnchorFromCompletion: false,
} as const satisfies TemperTask
