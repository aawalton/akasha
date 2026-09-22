import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const vateshranHollowsWeeklyLeaderboard = {
  id: "019db533-f381-7537-ae93-c60ca6656758",
  type: "page-type/temper-task",
  slug: "vateshran-hollows-weekly-leaderboard",
  title: "Vateshran Hollows Weekly Leaderboard",
  displayOrder: 15,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  dueDate: "2026-10-04",
  rruleRule: "FREQ=WEEKLY;INTERVAL=2",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-21T19:39:01.507Z",
} as const satisfies TemperTask
