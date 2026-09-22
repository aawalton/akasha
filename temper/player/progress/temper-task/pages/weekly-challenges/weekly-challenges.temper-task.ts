import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const weeklyChallenges = {
  id: "019f9420-7fe5-7a60-8791-99f0d72cd040",
  type: "page-type/temper-task",
  slug: "weekly-challenges",
  title: "Weekly Challenges",
  icon: "file-text",
  character: "temper-account-character/erin-solstice",
  dueDate: "2026-09-29",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-09-22T13:34:22.260Z",
} as const satisfies TemperTask
