import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const vateshranHollowsWeeklyLeaderboard = {
  id: "019db533-f381-7537-ae93-c60ca6656758",
  type: "page-type/temper-task",
  slug: "vateshran-hollows-weekly-leaderboard",
  title: "Vateshran Hollows Weekly Leaderboard",
  displayOrder: 15,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  dueDate: "2026-10-22",
  rruleRule: "FREQ=WEEKLY;INTERVAL=2",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p3",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-10-08T14:32:34.017Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-08T14:32:35.000Z",
} as const satisfies TemperTask
