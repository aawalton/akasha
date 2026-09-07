import type { TemperTask } from "../../temper-task.page-type.ts"

export const manageGuildSales = {
  id: "019db533-f381-758e-8b24-0a120b8857e8",
  pageTypeSlug: "temper-task",
  slug: "manage-guild-sales",
  title: "Manage Guild Sales",
  displayOrder: 12,
  esoCharacterId: "8796093022338107",
  character: "erin-solstice",
  completionCardId: "guild-sales",
  dueDate: "2026-09-07",
  rruleRule: "FREQ=WEEKLY;BYDAY=MO",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "erin-solstice",
  lastCompletedAt: "2026-09-07T02:44:30.176Z",
} as const satisfies TemperTask
