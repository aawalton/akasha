import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const infiniteArchiveWeeklyLeaderboard = {
  id: "019db533-f381-75b1-ae47-75a551046ec2",
  type: "temper-task",
  slug: "infinite-archive-weekly-leaderboard",
  title: "Infinite Archive Weekly Leaderboard",
  displayOrder: 14,
  esoCharacterId: "8796093022338107",
  character: "erin-solstice",
  dueDate: "2026-09-15",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "erin-solstice",
  lastCompletedAt: "2026-09-10T20:54:05.421Z",
} as const satisfies TemperTask
