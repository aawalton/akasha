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
  dueDate: "2026-10-19",
  rruleRule: "FREQ=WEEKLY;BYDAY=MO",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-10-12T13:49:43.496Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-12T13:49:44.110Z",
} as const satisfies TemperTask
