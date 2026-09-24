import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const infiniteArchiveWeeklyLeaderboard = {
  id: "019db533-f381-75b1-ae47-75a551046ec2",
  type: "page-type/temper-task",
  slug: "infinite-archive-weekly-leaderboard",
  title: "Infinite Archive Weekly Leaderboard",
  displayOrder: 14,
  esoCharacterId: "8796093022338107",
  character: "temper-account-character/erin-solstice",
  dueDate: "2026-09-29",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/erin-solstice",
  lastCompletedAt: "2026-09-22T13:34:18.331Z",
} as const satisfies TemperTask
